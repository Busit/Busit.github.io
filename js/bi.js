"use strict";

var bi = 
{
	all: function(search, element)
	{
		if( search instanceof HTMLElement ) return search;
		if( !search || search.length == 0 ) return [];
		if( !element ) element = document;
		if( typeof element == 'string' ) element = bi.first(element);
		return element.querySelectorAll(search);
	},
	first: function(search, element)
	{
		if( search instanceof HTMLElement ) return search;
		if( !search || search.length == 0 ) return null;
		if( !element ) element = document;
		if( typeof element == 'string' ) element = bi.first(element);
		var n = element.querySelectorAll(search);
		return ( n && n.length > 0 ? n[0] : null);
	},
	last: function(search, element)
	{
		if( search instanceof HTMLElement ) return search;
		if( !search || search.length == 0 ) return null;
		if( !element ) element = document;
		if( typeof element == 'string' ) element = bi.first(element);
		var n = element.querySelectorAll(search);
		return ( n && n.length > 0 ? n[n.length-1] : null);
	},
	$: function(id) { if( id instanceof HTMLElement ) return id; return document.getElementById(id); },
	fire: function(element, event, params, async)
	{
		if( async === true )
		{
			bi.fire.later(bi, [element, event, params]);
			return;
		}
		
		if( typeof element == "string" )
			element = bi.all(element);
		if( Array.isArray(element) )
		{
			element.forEach(function(v, i, e){ bi.fire(v, event, params); });
			return;
		}
		
		if( typeof event == 'string' && typeof element[event] != 'function' )
			event = event.toLowerCase().replace(/^on/, '');
			
		if( typeof element[event] == 'function' )
		{
			if( params && !Array.isArray(params) ) params = [params];
			try { element[event].apply(element, params); }
			catch(e) { console.error(e); }
			return;
		}
		
		if( element instanceof EventTarget || typeof element.dispatchEvent == 'function' )
		{
			if( typeof event == 'string' )
			{
				if( event[0] == '@' ) event = event.substring(1);
				var e = document.createEvent("HTMLEvents");
				e.initEvent(event, true, true);
				event = e;
				e.import({data: params});
			}
			if( event instanceof Event )
				element.dispatchEvent(event);
		}
		
		// last option : onEvent function
		if( typeof event == 'string' )
		{
			event = 'on' + event.charAt(0).toUpperCase() + event.slice(1);
			if( typeof element[event] == 'function' )
			{
				if( params && !Array.isArray(params) ) params = [params];
				try { element[event].apply(element, params); }
				catch(e) { console.error(e); }
				return;
			}
		}
	},
	on: function(element, event, handler){ return bi.connect(element, event, handler); },
	once: function(element, event, handler){ return bi.connectOnce(element, event, handler); },
	release: function(element, event, handler){ return bi.disconnect(element, event, handler); },
	connect: function(element, event, handler)
	{
		if( !element || !event || !handler ) return null;
		if( typeof element == "string" )
			element = bi.all(element);
		if( Array.isArray(element) )
		{
			var ids = [];
			element.forEach(function(v, i, e){ ids.push(bi.connect(v, event, handler)); });
			return ids;
		}
		
		// targets an event but there is a function with same name.
		// then force to addEventListener (specialCase = true)
		// otherwise it defaults to replacing the function and may break stuff in some cases
		var specialCase = (element instanceof HTMLElement && ['click','blur','focus'].contains(event)) || 
			(element instanceof HTMLFormElement && ['submit','reset'].contains(event));
		if( event.startsWith('@') )
		{
			event = event.substr(1);
			specialCase = true;
		}
		
		if( typeof element[event] != 'function' && !specialCase )
			event = event.toLowerCase().replace(/^on/, '');
		
		if( typeof element[event] == 'function' && !specialCase )
		{
			if( !element.hasOwnProperty('__calloriginal_' + event) )
			{
				element['__calloriginal_' + event] = element[event];
				element['__callstack_' + event] = [];
				element[event] = function()
				{
					// WARNING : the callbacks may disconnect while we itterate so this causes problems with the loop.
					// Hence, we consider that callbacks are allowed to disconnect after ALL have been processed only.
					// Therefore, create a shallow copy of the callbacks array using slice(0)
					var cs = element['__callstack_' + event].slice(0);
					try { element['__calloriginal_' + event].apply(element, arguments); }
					finally
					{
						for( var i = 0; i < cs.length; i++ )
						{
							try { cs[i].apply(element, arguments); }
							catch(e) { console.error(e); }
						}
					}
				};
			}
			
			if( !bi._hooks ) bi._hooks = {};
			var id;
			do { id = '_'+Math.random(); } while( bi._hooks.hasOwnProperty(id) );
			
			if( element['__callstack_' + event].contains(handler) )
			{
				for( id in bi._hooks )
					if( bi._hooks[id].handler === handler )
						return id;
				return null; // already registered but cannot retrieve original ID
			}
			
			element['__callstack_' + event].push(handler);
			bi._hooks[id] = {'element':element, 'event':event, 'handler':handler};
			return id;
		}
		else if( element instanceof EventTarget || typeof element.addEventListener == 'function' )
		{
			if( !bi._hooks ) bi._hooks = {};
			var id;
			do { id = '_'+Math.random(); } while( bi._hooks.hasOwnProperty(id) );
			bi._hooks[id] = {'element':element, 'event':event, 'handler':handler};
			element.addEventListener(event, handler);
			return id;
		}
		else
		{
			// last option : onEvent function
			if( typeof event == 'string' )
			{
				event = 'on' + event.charAt(0).toUpperCase() + event.slice(1);
				if( typeof element[event] == 'function' )
					return bi.connect(element, event, handler);
			}
			else
				return null;
		}
	},
	connectOnce: function(element, event, handler)
	{
		if( typeof handler != 'function' || typeof event != 'string' || !element )
			return null;
		
		var hook = bi.connect(element, event, function()
		{
			bi.disconnect(hook);
			try { handler.apply(element, arguments); } catch(e) { console.error(e); }
		});
		
		return hook;
	},
	disconnect: function(element, event, handler)
	{
		if( !element ) return;
		if( !event && !handler )
		{
			if( Array.isArray(element) )
			{
				element.forEach(function(v, i, e){ bi.disconnect(v); });
				return;
			}
			
			if( typeof element != 'string' || element.length == 0 || element.charAt(0) != '_' ) return;
			if( !bi._hooks ) bi._hooks = {};
			if( !bi._hooks.hasOwnProperty(element) ) return;
			var h = bi._hooks[element];
			delete bi._hooks[element];
			return bi.disconnect(h.element, h.event, h.handler);
		}
		else
		{
			if( typeof element == "string" )
				element = bi.all(element);
			if( Array.isArray(element) )
			{
				element.forEach(function(v, i, e){ bi.disconnect(v, event, handler); });
				return;
			}
			
			if( typeof element[event] != 'function' )
				event = event.toLowerCase().replace(/^on/, '');
		
			if( typeof element[event] == 'function' && element.hasOwnProperty('__callstack_' + event) )
			{
				element['__callstack_' + event].remove(handler);
			}
			else
			{
				if( element.removeEventListener )
					element.removeEventListener(event, handler);
			}
		}
	},
	onLoad: function(callback)
	{
		if( !callback ) return;
		if( bi._loaded || document.readyState == 'complete' )
		{
			try { callback.apply(bi, null); }
			catch(e) { console.error(e); }
		}
		else
		{
			if( !bi._onload_stack ) bi._onload_stack = [];
			bi._onload_stack.push(callback);
		}
	},
	node: function(tag, attributes, content)
	{
		var n = document.createElement(tag);
		
		// reorder attributes and content
		if( typeof attributes == 'string' || attributes instanceof HTMLElement || Array.isArray(attributes) )
		{
			var c = content;
			content = attributes;
			attributes = c; 
		}
		
		if( !Array.isArray(content) ) content = [content];
		for( var i = 0; i < content.length; i++ )
		{
			if( typeof content[i] == 'string' )
				n.innerHTML = content[i];
			else if( content[i] instanceof HTMLElement )
				n.appendChild(content[i]);
			else if( content[i] )
				n.innerHTML = '' + content[i];
		}
		
		if( attributes )
		{
			for( var property in attributes )
			{
				if( typeof attributes[property] == 'function' )
					bi.on(n, property, attributes[property]);
				else
				{
					if( property.startsWith('data-') )
						n.dataset[property.substring(5)] = attributes[property];
					else if( property.startsWith('data') )
						n.dataset[property.substring(4).charAt(0).toLowerCase() + property.slice(5)] = attributes[property];
					if( property.startsWith('style-') )
						n.style[property.substring(6)] = attributes[property];
					else if( property.startsWith('style') )
						n.style[property.substring(5).charAt(0).toLowerCase() + property.slice(6)] = attributes[property];
					else
						n[property] = attributes[property];
				}
			}
		}
		
		return n;
	},
	provide: function(name) { if( !bi.__required ) bi.__required = {}; bi.__required[name] = true; },
	require: function(name, successCallback)
	{
		if( Array.isArray(name) )
		{
			if( name.length == 0 ) { successCallback.call(); return; }
			
			var loading = name.length;
			for( var i = 0; i < name.length; i++ )
				bi.require(name[i], function() { loading--; if( loading <= 0 ) successCallback.call(); });
		}
		else
		{
			if( !name ) return;
			if( name.matches(/^(https?)?\/\/.+/i) ) // external script
			{
				var s = bi.node('SCRIPT', {type: 'text/javascript', src: name});
				bi.first("head").appendChild(s);
				var done = false;
				s.onload = s.onreadystatechange = function()
				{
					if( !done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") )
					{
						done = true;
						s.onload = s.onreadystatechange = null;
						successCallback.call();
					}
				};
				return;
			}
			if( !bi.__required ) bi.__required = {};
			if( bi.__required[name] ) { successCallback.call(); return; }
			
			if( !bi.__required.hasOwnProperty(name) )
			{
				bi.__required[name] = false;
			
				var s = bi.node('SCRIPT',
				{
					type: 'text/javascript', 
					src: (bi.$root||'') + '/js/' + name + '.js' + (bi.$rev ? '?_rev=' + bi.$rev : '')
				});
				
				bi.first("head").appendChild(s);
			}
			
			// has been inserted but did not load yet
			var hook = bi.on(bi, 'provide', function(n)
			{
				if( n == name )
				{
					successCallback.call();
					bi.disconnect(hook);
				}
			});
		}
	},
	define: function(ctor, members, statics, inherit)
	{
		if( typeof ctor == 'object' && !members && !statics && !inherit )
		{
			inherit = ctor.parent || ctor.inherit;
			statics = ctor.static || ctor.statics;
			members = ctor.members;
			ctor = ctor.ctor;
		}
		if( !members ) members = {};
		if( !statics ) statics = {};
		if( !ctor ) ctor = function(){};
		if( typeof inherit == 'function' )
		{
			var subctor = ctor;
			var superctor = inherit;
			ctor = function()
			{
				var t = superctor.apply(this, arguments) || this;
				t = subctor.apply(t, arguments) || t;
				return t; // in case the return value of the constructor is changed
			};
			inherit = inherit.prototype;
		}
		if( !inherit ) inherit = Object.prototype;
		
		// normalize members
		for( var k in members )
		{
			if( members[k] !== null && typeof members[k] == 'object' && 
				(members[k].hasOwnProperty('value') || members[k].hasOwnProperty('get') || members[k].hasOwnProperty('set')) )
				continue;
			
			if( typeof members[k] == 'function' )
				members[k] = { value: members[k], configurable: false, enumerable: false, writable: true }; // writable to allow .on()
			else
				members[k] = { value: members[k], configurable: true, enumerable: true, writable: true };
		}
		// normalize statics
		for( var k in statics )
		{
			if( statics[k] !== null && typeof statics[k] == 'object' && statics[k].hasOwnProperty('value') )
				continue;
			
			if( typeof statics[k] == 'function' )
				statics[k] = { value: statics[k], configurable: false, enumerable: false, writable: false };
			else
				statics[k] = { value: statics[k], configurable: true, enumerable: true, writable: true };
		}
		
		var c = ctor;
		c.prototype = Object.create(inherit, members);
		c.prototype.constructor = c;
		for( var k in statics ) Object.defineProperty(c, k, statics[k]);
		return c;
	},
	instance: function(definition)
	{
		return new (bi.define(definition))();
	},
	importCss: function(name)
	{
		if( Array.isArray(name) )
		{
			if( name.length == 0 ) return;
			for( var i = 0; i < name.length; i++ )
				bi.importCss(name[i]);
		}
		else
		{
			// check if that stylesheet was already included
			var styleSheets = document.styleSheets;
			for( var i = 0; i < styleSheets.length; i++ )
				if( styleSheets[i].ownerNode.name == name )
					return;

			var s = bi.node('LINK', {rel: 'stylesheet'});
			if( name.matches(/^(https?)?\/\/.+/i) ) // external css
				s.href = name;
			else
				s.href = (bi.$root||'') + '/css/' + name + '.css' + (bi.$rev ? '?_rev=' + bi.$rev : '');
			s.name = name; // store the name for double inclusion check
				
			bi.first("head").appendChild(s);
		}
	}
};

bi.cookie = 
{
	get: function(key)
	{
		if( !key ) return null;
		var value = document.cookie.match(new RegExp("(?:^|;)\\s*" + RegExp.escape(encodeURIComponent(key)) + "\\s*=\\s*([^\\s;]*)"));
		if( value && value[1] )
			return decodeURIComponent(value[1]);
		else
			return null;
	},
	set: function(key, value, sessionOnly, secure, domain, path)
	{
		document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + 
			(sessionOnly?'':';max-age=315360000;expires=' + new Date(Date.now() + 315360000).toUTCString()) + 
			(secure?';secure':'') + 
			(domain?';domain='+domain:'') +
			(path?';path='+path:'');
	},
	remove: function(key, secure, domain, path)
	{
		document.cookie = encodeURIComponent(key) + '=;max-age=0;expires=' + new Date(0).toUTCString() + 
			(secure?';secure':'') + 
			(domain?';domain='+domain:'') +
			(path?';path='+path:'');
	},
	has: function(key)
	{
		return (bi.cookie.get(key) != null);
	},
	all: function()
	{
		var matches = /(?:^|;)\s*([^\s=]+)\s*=\s*([^\s;]*)/g.all(document.cookie);
		var r = {};
		for( var i = 0; i < matches.length; i++ )
			r[decodeURIComponent(matches[i][0])] = decodeURIComponent(matches[i][1]);
		return r;
	},
	clear: function()
	{
		for( var key in bi.cookie.all() )
			bi.cookie.remove(key);
	}
};

bi.ajax = function(url, properties, successCallback, errorCallback)
{
	// CAUTION : sync XHR is officially deprecated so force all to be async
	
	if( !(this instanceof bi.ajax) ) return new bi.ajax(url, properties, successCallback, errorCallback);
	
	var self = this;
	this.on = function(event, callback) { return bi.once(this, event, callback); };
	
	this.onSuccess = function()
	{
		if( this._sc )
		{
			try { this._sc.apply(this, arguments); }
			catch(e) { this.onError(e); }
		}
	};
	
	this.onError = function()
	{
		if( this._ec )
		{
			try { this._ec.apply(this, arguments); }
			catch(e) { console.error(e); }
		}
	};
	
	this.init = function(url, properties, successCallback, errorCallback)
	{
		this._sc = successCallback;
		this._ec = errorCallback;
		
		if( !url || url.length == 0 )
		{
			this.onError(new RangeError('url parameter is null or empty'));
			return;
		}
		
		this._xhr = new XMLHttpRequest();
		
		if( !properties ) properties = {};
		properties.async = true; // force async because sync is deprecated
		
		if( !properties.method ) properties.method = 'GET';
		if( properties.timeout ) this._xhr.timeout = properties.timeout;
		if( properties.cookie || properties.withCredentials ) this._xhr.withCredentials = true;
		if( properties.mime ) this._xhr.overrideMimeType(properties.mime);
		if( properties.nocache && properties.method == 'GET' ) url += (url.contains('?') ? '&' : '?') + "_t" + Date.now();
		if( properties.handleAs ) properties.as = properties.handleAs;
		if( properties.dataType ) properties.as = properties.dataType;
		if( properties.data ) properties.params = properties.data;
		
		var he = bi.once(this._xhr, 'error', function(event)
		{
			bi.release(ht);
			bi.release(hl);
			
			try { event.status = self._xhr.status; } catch(e) {}
			try { event.response = self._xhr.response; } catch(e) {}
			try
			{
				var harray = self._xhr.getAllResponseHeaders().split("\r\n");
				event.headers = {};
				var line = null;
				while( (line = harray.shift()) != null )
				{
					var i = line.indexOf(': ');
					if( i > 0 )
						event.headers[line.substring(0, i)] = line.substring(i + 2);
				}
			} catch(e) {}
			
			self.onError(event);
		});
		var ht = bi.once(this._xhr, 'timeout', function(event)
		{
			bi.release(he);
			bi.release(hl);
			
			event.status = 504;
			event.response = null;
			event.headers = {};
			self.onError(event);
		});
		var hl = bi.once(this._xhr, 'load', function(event)
		{
			bi.release(ht);
			bi.release(he);
			
			try { event.status = self._xhr.status; } catch(e) {}
			try
			{
				if( properties.as == 'json' && typeof self._xhr.response != 'object' )
					event.response = JSON.parse(self._xhr.response);
				else
					event.response = self._xhr.response;
			} catch(e) {}
			try
			{
				var harray = self._xhr.getAllResponseHeaders().split("\r\n");
				event.headers = {};
				var line = null;
				while( (line = harray.shift()) != null )
				{
					var i = line.indexOf(': ');
					if( i > 0 )
						event.headers[line.substring(0, i)] = line.substring(i + 2);
				}
			} catch(e) {}
			
			if( event.status > 299 ) self.onError(event);
			else self.onSuccess(event);
		});
		
		// params in GET should be in the query string
		if( properties.params && properties.method == 'GET' )
		{
			var qs = "";
			for( var k in properties.params )
				qs += encodeURIComponent(k) + "=" + encodeURIComponent(properties.params[k]) + "&";
			
			url += (url.contains('?')?'&':'?') + qs.trim('&');
		}
		
		this._xhr.open(properties.method, url, properties.async);
		if( properties.as ) this._xhr.responseType = properties.as;
		
		if( properties.user && properties.password )
		{
			// compute Authorization Basic header
			if( !properties.headers ) properties.headers = {};
			if( properties.headers.hasOwnProperty("Authorization") ) throw new Error("Authorization header is already set. Incompatible with provided user and password.");
			properties.headers.Authorization = "Basic " + Base64.encode(properties.user + ":" + properties.password);
		}
		
		if( properties.headers )
			for( var h in properties.headers )
				this._xhr.setRequestHeader(h, properties.headers[h]);
		
		if( !properties.params || properties.method == 'GET' ) this._xhr.send();
		else
		{
			if( typeof properties.params == 'string' || properties.params instanceof FormData )
				this._xhr.send(properties.params);
			else if( properties.params instanceof HTMLFormElement )
				this._xhr.send(new FormData(properties.params));
			else
			{
				var f = new FormData();
				for( var name in properties.params )
					f.append(name, properties.params[name]);
				this._xhr.send(f);
			}
		}
	};
	
	this.init(url, properties, successCallback, errorCallback);
};

bi.EventTarget = bi.define(
{
	ctor: function()
	{
		this.listeners = {};
	},
	members:
	{
		listeners: null,
		addEventListener: function(type, callback)
		{
			if( !this.listeners[type] ) this.listeners[type] = [];
			this.listeners[type].push(callback);
		},
		removeEventListener: function(type, callback)
		{
			if( !this.listeners[type] ) return;
			this.listeners[type].remove(callback);
		},
		dispatchEvent: function(event)
		{
			if( !this.listeners[event.type] ) return true;
			var stack = this.listeners[event.type];
			for( var i = 0; i < stack.length; i++)
			{
				try { stack[i].call(this, event); }
				catch(e) { console.log(e); }
				if( event.immediatePropagationStopped ) break;
			}
			return !event.defaultPrevented;
		}
	}
});

// ====================================
// UTILS
// ====================================

if( !window.EventTarget ) window.EventTarget = window.HTMLElement
if( !console ) { var console = { error: function(){}, warn: function(){}, info: function(){}, log: function(){} }; }
if( typeof RegExp.escape != 'function' ) { Object.defineProperty(RegExp, 'escape', { value: function(s) { return (s||'').replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); } }); }
if( typeof RegExp.prototype.all != 'function' ) { Object.defineProperty(RegExp.prototype, 'all', { value: function(txt) { var m; var r = []; while((m = this.exec(txt)) !== null) { m.shift(); r.push(m); if( !this.global ) break; } return r; } }); }
if( typeof Function.prototype.later != 'function' ) { Object.defineProperty(Function.prototype, 'later', { value: function(t, a) { if( a && !Array.isArray(a) ) a = [a]; var self = this; requestAnimationFrame(function() { self.apply(t, a); }); } }); }
if( typeof Function.prototype.delay != 'function' ) { Object.defineProperty(Function.prototype, 'delay', { value: function(d, t, a) { if( a && !Array.isArray(a) ) a = [a]; var self = this; setTimeout(function() { self.apply(t, a); }, d); } }); }
if( typeof Date.prototype.addSeconds != 'function' ) { Object.defineProperty(Date.prototype, 'addSeconds', { value: function(n) { this.setSeconds(this.getSeconds() + n); return this; } }); }
if( typeof Date.prototype.addMinutes != 'function' ) { Object.defineProperty(Date.prototype, 'addMinutes', { value: function(n) { this.setMinutes(this.getMinutes() + n); return this; } }); }
if( typeof Date.prototype.addHours != 'function' ) {   Object.defineProperty(Date.prototype, 'addHours',   { value: function(n) { this.setHours(this.getHours() + n); return this; } }); }
if( typeof Date.prototype.addDays != 'function' ) {    Object.defineProperty(Date.prototype, 'addDays',    { value: function(n) { this.setDate(this.getDate() + n); return this; } }); }
if( typeof Date.prototype.addMonths != 'function' ) {  Object.defineProperty(Date.prototype, 'addMonths',  { value: function(n) { this.setMonth(this.getMonth() + n); return this; } }); }
if( typeof Date.prototype.addYears != 'function' ) {   Object.defineProperty(Date.prototype, 'addYears',   { value: function(n) { this.setFullYear(this.getFullYear() + n); return this; } }); }
if( typeof Date.prototype.addWeeks != 'function' ) {   Object.defineProperty(Date.prototype, 'addWeeks',   { value: function(n) { this.setDate(this.getDate() + (7*n)); return this; } }); }
if( typeof Date.prototype.getWeek != 'function' ) {    Object.defineProperty(Date.prototype, 'getWeek',    { value: function()  { var date = new Date(this.getTime()); date.setHours(0, 0, 0, 0); date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7); var week1 = new Date(date.getFullYear(), 0, 4); return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7); }}); }
if( typeof Array.prototype.clear != 'function' ) { Object.defineProperty(Array.prototype, 'clear', { value: function() { this.length = 0; } }); }
if( typeof Array.prototype.first != 'function' ) { Object.defineProperty(Array.prototype, 'first', { get: function() { return (this.length > 0 ? this[0] : null); } }); }
if( typeof Array.prototype.last != 'function' ) { Object.defineProperty(Array.prototype, 'last', { get: function() { return (this.length > 0 ? this[this.length-1] : null); } }); }
if( typeof Array.prototype.remove != 'function' ) { Object.defineProperty(Array.prototype, 'remove', { value: function(v) { var i = this.indexOf(v); if( i >= 0 ) { var r = this.splice(i, 1); return r[0]; } else return null; } }); }
if( typeof Array.prototype.contains != 'function' ) { Object.defineProperty(Array.prototype, 'contains', { value: function(v) { return this.indexOf(v) >= 0; } }); }
if( typeof Array.prototype.containsAny != 'function' ) { Object.defineProperty(Array.prototype, 'containsAny', { value: function(v) { if( !Array.isArray(v) ) return this.contains(v); for(var i = 0; i < v.length; i++) if( this.indexOf(v[i]) >= 0) return true; return false; } }); }
if( typeof Array.prototype.containsAll != 'function' ) { Object.defineProperty(Array.prototype, 'containsAll', { value: function(v) { if( !Array.isArray(v) ) return this.contains(v); for(var i = 0; i < v.length; i++) if( this.indexOf(v[i]) < 0) return false; return true; } }); }
if( typeof Array.prototype.pushUnique != 'function' ) { Object.defineProperty(Array.prototype, 'pushUnique', { value: function(v) { return (this.contains(v)?this.length:this.push(v)); } }); }
if( typeof Array.prototype.aggregate != 'function' ) { Object.defineProperty(Array.prototype, 'aggregate', { value: function(f, reverse) { var result = undefined, length = this.length; if (length == 0) return result; if( reverse ) { for( var i = length-1; i >= 0; i-- ) result = f(result, this[i]); return result; } for( var i = 0; i < length; i++ ) result = f(result, this[i]); return result; } }); }
if( typeof Array.prototype.random != 'function' ) { Object.defineProperty(Array.prototype, 'random', { value: function() { return this[Math.floor(Math.random()*this.length)]; } }); }
if( typeof String.prototype.escape != 'function' ) { Object.defineProperty(String.prototype, 'escape', { value: function (skip_quotes) { var r = this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); if( !skip_quotes ) r = r.replace(/"/g, '&quot;'); return r; } }); }
if( typeof String.prototype.nobbcode != 'function' ) { Object.defineProperty(String.prototype, 'nobbcode', { value: function () { return this.replace(/\[[^\]]*\]/g, ''); } }); }
if( typeof String.prototype.contains != 'function') { Object.defineProperty(String.prototype, 'contains', { value: function (arg) { return this.indexOf(arg) >= 0; } }); }
if( typeof String.prototype.startsWith != 'function' ) { Object.defineProperty(String.prototype, 'startsWith', { value: function (str) { return this.slice(0, str.length) == str; } }); }
if( typeof String.prototype.endsWith != 'function' ) { Object.defineProperty(String.prototype, 'endsWith', { value: function (str) { return this.slice(-str.length) == str; } }); }
if( typeof String.prototype.matches != 'function' ) { Object.defineProperty(String.prototype, 'matches', { value: function (regex) { if( !regex ) return false; if( typeof regex == 'string' ) regex = new RegExp(regex); return regex.test(this); } }); }
Object.defineProperty(String.prototype, 'trim', { value: function(chars) { if( typeof chars != 'string' || chars.length == 0 ) chars = "\\s"; else chars = RegExp.escape(chars.split('').join('###')).replace('###', '|'); return this.replace(new RegExp("^(" + chars + ")+"), '').replace(new RegExp("(" + chars + ")+$"), ''); } });
if( typeof Object.prototype.import != 'function' ) { Object.defineProperty(Object.prototype, 'import', { value: function(o, deep){ for( var k in o ) { if( deep && typeof o[k] == "object" && !Array.isArray(o[k]) && (typeof this[k] == "object" || !this.hasOwnProperty(k)) ) this[k] = (this[k]||{}).import(o[k], deep); else this[k] = o[k]; } return this; } }); }
if( typeof Object.prototype.exec != 'function' ) { Object.defineProperty(Object.prototype, 'exec', { value: function(f, args) { if( typeof f == 'function' ) return f.apply(this, args); else return null; } }); }
if( typeof Object.values != 'function' ) { Object.defineProperty(Object, 'values', { value: function(obj) { var a = []; for( var key in obj ) a.push(obj[key]); return a; } }); }
if( typeof Object.keys != 'function' ) { Object.defineProperty(Object, 'keys', { value: function(obj) { var a = []; for( var key in obj ) a.push(key); return a; } }); }
if( !Base64 ) { var Base64 = { decode: function(i) { return decodeURIComponent(escape(atob(i))); }, encode: function(i) { return btoa(unescape(encodeURIComponent(i))); } }; }
if( typeof HTMLFormElement.prototype.export != 'function' ) { Object.defineProperty(HTMLFormElement.prototype, 'export', { value: function() { var o = {}; for( var i = 0; i < this.length; i++ ) if( !this.elements[i].disabled && this.elements[i].name ) o[this.elements[i].name] = (this.elements[i].hasOwnProperty("checked") && !this.elements[i].checked ? '' : this.elements[i].value); return o; } }); }
if( typeof HTMLElement.prototype.remove != 'function' ) { Object.defineProperty(HTMLElement.prototype, 'remove', { value: function() { if( this.parentNode ) this.parentNode.removeChild(this); return this; } }); }
if( typeof HTMLElement.prototype.clear != 'function' ) { Object.defineProperty(HTMLElement.prototype, 'clear', { value: function() { while( this.firstChild ) this.removeChild(this.firstChild); } }); }
if( typeof HTMLElement.prototype.draw != 'function' ) { Object.defineProperty(HTMLElement.prototype, 'draw', { value: function() { var x = this.offsetHeight; this.className = this.className; } }); }
if( typeof HTMLElement.prototype.index != 'function' ) { Object.defineProperty(HTMLElement.prototype, 'index', { value: function() { var i = 0, n = this; while (n = n.previousElementSibling) ++i; return (this.parentNode && this.parentNode.children[i] === this ? i : -1); } }); }
if( typeof HTMLElement.prototype.elsewhere != 'function' ) { Object.defineProperty(HTMLElement.prototype, 'elsewhere', { value: function(callback, strict) { if( typeof callback != 'function' ) return; var h = bi.on(document, 'click', function(e) { if( (strict && e.target !== this) || (!strict && e.target !== this && !this.contains(e.target)) ) bi.disconnect(h), h = null, callback(); }); } }); }
if( typeof HTMLElement.prototype.insertAfter != 'function' ) { Object.defineProperty(HTMLElement.prototype, 'insertAfter', { value: function(node, reference) { return this.insertBefore(node, (reference?reference.nextSibling:null)); } }); }
Object.defineProperty(HTMLElement.prototype, 'appendSingleChild', { value: HTMLElement.prototype.appendChild });
Object.defineProperty(HTMLElement.prototype, 'appendChild', { value: function(child) { if( Array.isArray(child) ) for(var i=0; i < child.length; i++) this.appendSingleChild(child[i]); else this.appendSingleChild(child); return child; } });
Object.defineProperty(HTMLElement.prototype, 'singleInsertBefore', { value: HTMLElement.prototype.insertBefore });
Object.defineProperty(HTMLElement.prototype, 'insertBefore', { value: function(child, reference) { if( Array.isArray(child) ) for(var i=0; i < child.length; i++) this.singleInsertBefore(child[i], reference); else this.singleInsertBefore(child, reference); return child; } });
if( typeof Event.prototype.stop != 'function' ) { Object.defineProperty(Event.prototype, 'stop', { value: function() { this.preventDefault(); this.stopImmediatePropagation(); } }); }
Object.defineProperty(Event.prototype, '_stopImmediatePropagation', { value: Event.prototype.stopImmediatePropagation });
Object.defineProperty(Event.prototype, '_stopPropagation', { value: Event.prototype.stopPropagation });
Object.defineProperty(Event.prototype, 'stopImmediatePropagation', { value: function() { this.immediatePropagationStopped = true; this._stopImmediatePropagation(); } });
Object.defineProperty(Event.prototype, 'stopPropagation', { value: function() { this.propagationStopped = true; this._stopPropagation(); } });
if( typeof EventTarget.prototype.on != 'function' ) { Object.defineProperty(EventTarget.prototype, 'on', { configurable: true, value: function(event, handler) { return bi.on(this, event, handler); } }); }
if( typeof EventTarget.prototype.once != 'function' ) { Object.defineProperty(EventTarget.prototype, 'once', { value: function(event, handler) { return bi.once(this, event, handler); } }); }
if( typeof EventTarget.prototype.fire != 'function' ) { Object.defineProperty(EventTarget.prototype, 'fire', { value: function(event, params, async) { return bi.fire(this, event, params, async); } }); }
if( !(document instanceof EventTarget) ) { document.on = EventTarget.prototype.on; document.once = EventTarget.prototype.once; document.fire = EventTarget.prototype.fire; }
if( !(window instanceof EventTarget) ) { window.on = EventTarget.prototype.on; window.once = EventTarget.prototype.once; window.fire = EventTarget.prototype.fire; }
bi.on(document, 'keyup', function(e) { if( e.keyCode == 13 ) this.fire('enter'); else if( e.keyCode == 27 ) this.fire('escape'); else if( e.keyCode == 46 ) this.fire('delete'); });
document.disableBackspace = function(callback) { if( !document.__back_hook ) { document.__back_hook = [bi.on(document, 'keydown', function(e) { if( e.keyCode == 8 && e.target.tagName != 'INPUT' ) { e.stop(); if(callback) callback(); } }), bi.on(document, 'keypress', function(e) { if( e.keyCode == 8 && e.target.tagName != 'INPUT' ) e.stop(); })]; }};
document.enableBackspace = function() { if( document.__back_hook ) { bi.disconnect(document.__back_hook[0]); bi.disconnect(document.__back_hook[1]); document.__back_hook = null; } };

// IE
if (!Object.entries) {Object.entries = function( obj ){var ownProps = Object.keys( obj ),i = ownProps.length,resArray = new Array(i); while (i--) {resArray[i] = [ownProps[i], obj[ownProps[i]]];} return resArray;};}

location.parameters = (function()
{
	var b, cv, e, k, ma, sk, v, r = {},
		d = function (v) { return decodeURIComponent(v).replace(/\+/g, " "); },
		q = window.location.search.substring(1),
		s = /([^&=]+)=?([^&]*)/g;
		
	ma = function(v)
	{
		if( typeof v != "object" )
		{
			cv = v;
			v = {};
			v.length = 0;
			if( cv ) { Array.prototype.push.call(v, cv); }
		}
		return v;
	};

	while( (e = s.exec(q)) !== null )
	{
		b = e[1].indexOf("[");
		v = d(e[2]);
		if( b < 0 )
		{
			k = d(e[1]);
			if( r[k] )
			{
				r[k] = ma(r[k]);
				Array.prototype.push.call(r[k], v);
			}
			else r[k] = v;
		}
		else
		{
			k = d(e[1].slice(0, b));
			sk = d(e[1].slice(b + 1, e[1].indexOf("]", b)));
			r[k] = ma(r[k]);
			if (sk) r[k][sk] = v;
			else Array.prototype.push.call(r[k], v);
		}
	}
	return r;
})();

// ====================================
// INITIALIZER
// ====================================

bi.on(window, 'load', function()
{
	bi._loaded = true;
	if( !bi._onload_stack ) return;
	var c = null;
	while( (c = bi._onload_stack.shift()) != null )
	{
		try { c.apply(bi, null); }
		catch(e) { console.error(e); }
	}
	bi.onLoad();
});

bi.core = {version: '1.0'};
bi.fire(bi, 'provide', ['bi.core']);