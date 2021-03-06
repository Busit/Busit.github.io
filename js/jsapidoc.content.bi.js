jsapidoc.content[' bi'] = 
{
	'bi':
	{
		title: 'bi',
		description: 'This is the base object required to operate the Busit Javascript API. It is created upon inclusion of the file in the DOM.<br />The <code>bi</code> object also acts as the global namespace for the entire API. The basic methods are defined directly on the root namespace described hereafter while other high level classes or functionnalities are created as packages registered as sub-properties of this object.' +
			'<br /><br />The Busit Javascript API is built using split modules and dependencies that can be managed using <code>bi.require()</code> and <code>bi.provide()</code> below.' +
			'<br /><br />Although it is not required, we stongly encourage to use the <strong>Single Page Application</strong> concepts to construct the page and handle the user interactions directly in javascript.',
		sample: ['&lt;!doctype html&gt;<br />&lt;html&gt;<br />&lt;head&gt;<br />&nbsp;&nbsp;&nbsp;&nbsp;&lt;script type="text/javascript" src="/js/bi.js"&gt;&lt;/script&gt;<br />&nbsp;&nbsp;&nbsp;&nbsp;&lt;script type="text/javascript&gt;<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bi.onLoad(function() { console.log("Ready!"); });<br />&nbsp;&nbsp;&nbsp;&nbsp;&lt;/script&gt;<br />&lt;/head&gt;<br />&lt;body&gt;&lt;body&gt;<br />&lt;html&gt;',
			'// ==============<br />// Sample module in file /js/my_module.js<br />// ==============<br />"use strict";<br /><br />bi.require(["my_dependency1"], function()<br />{<br />&nbsp;&nbsp;&nbsp;&nbsp;// this code portion is guaranteed to be executed only when the dependent modules are loaded<br />&nbsp;&nbsp;&nbsp;&nbsp;window.my_module = { foo: "bar" };<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;// notify the framework that the module is ready<br />&nbsp;&nbsp;&nbsp;&nbsp;bi.fire(bi, "provide", ["my_module"]);<br />});'],
		properties:
		{
			'$rev': {type: 'String', description: 'If set, this property designates the code revision identifier.<br />When requiring js files or css files, the revision identifier is appended as query string to manage the browser cache.<br />If you set the revision identifier to a variable number then this has the effect to prevent the browser cache.<pre>bi.$rev = "v1.0.42-beta"; // fixed version<br />bi.$rev = new Date().getTime(); // always different to disable the browser cache</pre>'},
			'$root': {type: 'String', description: 'If set, this property designates the root directory for js and css file inclusion. It should not include a trailing slash.<pre>bi.$root = "/web/app/project";</pre>'}
		},
		methods:
		{
			'all':
			{
				signature: 'all(search, element?)', 
				returns: 'HTMLElement[]', 
				description: 'Alias to <code>element.querySelectorAll(search)</code>.<pre>bi.all("div");<br />bi.all("ul &gt; li span.title", "section.content");</pre>',
				parameters:
				{
					'search': 'A valid CSS selector String.',
					'element': 'The root HTMLElement to search against. If a String is provided, it is matched using <code>bi.first(element)</code>. If omitted, the <code>document</code> is used instead.'
				}
			},
			'first':
			{
				signature: 'first(search, element?)',
				returns: 'HTMLElement',
				description: 'Returns the first element that matches the provided CSS selector. If no element matches, then <code>null</code> is returned.',
				parameters:
				{
					'search': 'A valid CSS selector String.',
					'element': 'The root HTMLElement to search against. If a String is provided, it is matched using <code>bi.first(element)</code>. If omitted, the <code>document</code> is used instead.'
				}
			},
			'last':
			{
				signature: 'last(search, element?)',
				returns: 'HTMLElement',
				description: 'Returns the last element that matches the provided CSS selector. If no element matches, then <code>null</code> is returned.',
				parameters:
				{
					'search': 'A valid CSS selector String',
					'element': 'The root HTMLElement to search against. If a String is provided, it is matched using <code>bi.first(element)</code>. If omitted, the <code>document</code> is used instead.'
				}
			},
			'$':
			{
				signature: '$(id)',
				returns: 'HTMLElement',
				description: 'Alias of <code>document.getElementById(id)</code>.',
				parameters:
				{
					'id': 'The id of the element to find.'
				}
			},
			'fire':
			{
				signature: 'fire(element, event, params?, async?)',
				returns: '',
				description: 'Triggers the specified event on the target element.<pre>// use fire as a function call<br />bi.fire(console, "log", ["foo"]); // -> console.log("foo") -> "foo"<br /><br />// use fire as an event<br />bi.fire(document.body, "click");<br /><br />// conflicting function name<br />document.body.click = function(txt1, txt2) { console.log(txt1 + " " + txt2); };<br />bi.fire(document.body, "click", ["hello", "world"]); // -> "hello world"<br />bi.fire(document.body, "@click", ["hello", "world"]); // -> event.data = ["hello", "world"]</pre>',
				parameters:
				{
					'element': 'The target element. If an Element is passed as argument, it is used directly. If a String is passed as argument, the element is resolved using <code>bi.all(element)</code>. If an Array is passed as argument, then the event is dispatched on all provided elements.',
					'event': 'The name of the event. If the event starts with <code>"on"</code> and a matching function exists on the element, that function is called. If the element is an EventTarget, then the event is dispatched on that element. If the element is an EventTarget and also contains a function with a matching name, the function is called in priority, except if the event name is prefixed with the <code>"@"</code> symbol.',
					'params': 'The parameters of the event. If the event resolves as a function, those are the function parameters as of <code>function.apply()</code>. Otherwise the properties will be set in the <code>data</code> variable of the event.',
					'async': 'If true, the <code>fire</code> function is processed in a later point in time, allowing the screen to eventually refresh. Default is false.'
				}
			},
			'on':
			{
				signature: 'on(element, event, handler)',
				returns: 'Object',
				description: 'Attaches an event handler to the specified element. Alias of <code>bi.connect(element, event, handler)</code>.',
				parameters:
				{
					'element': 'The element of reference.',
					'event': 'The name of the event.',
					'handler': 'The callback function.'
				}
			},
			'once':
			{
				signature: 'once(element, event, handler)',
				returns: 'Object',
				description: 'Attaches an event handler to the specified element and detaches it after the first execution. Alias of <code>bi.connectOnce(element, event, handler)</code>.',
				parameters:
				{
					'element': 'The element of reference.',
					'event': 'The name of the event.',
					'handler': 'The callback function.'
				}
			},
			'release':
			{
				signature: 'release(element, event?, handler?)',
				returns: '',
				description: 'Detaches the specified event handler from the target element. Alias of <code>bi.disconnect(element, event, handler)</code>.',
				parameters:
				{
					'element': 'The element of reference or the attach hook.',
					'event': 'The name of the event.',
					'handler': 'The callback function.'
				}
			},
			'connect':
			{
				signature: 'connect(element, event, handler)',
				returns: 'Object',
				description: 'Attaches an event handler to the specified element. The return value is a special hook object that can be used to uniquely identify this handler and later detach it using <code>bi.disconnect(hook)</code>.<br />This method has the ability to attach to either an event or a regular function. When a function and an event share the same name, prefix the event name with an "@".<br />Note that in case of a function, the handler is executed after the original function.<pre>bi.connect(document.body, "click", function(e) { console.log(e); });<br /><br />var foo = "bar";<br />bi.connect(foo, "substring", function() { console.log("moo"); });<br />foo.substring(1); // -> "moo"</pre>',
				parameters:
				{
					'element': 'The element of reference. If a string is provided, it is matched using <code>bi.all(element)</code>. If an array is provided, the handler is attached to all elements.',
					'event': 'The name of the event or function to attach to.',
					'handler': 'The callback function.'
				}
			},
			'connectOnce':
			{
				signature: 'connectOnce(element, event, handler)',
				returns: 'Object',
				description: 'Attaches an event handler to the specified element and detaches it after the first execution.',
				parameters:
				{
					'element': 'The element of reference.',
					'event': 'The name of the event.',
					'handler': 'The callback function.'
				}
			},
			'disconnect':
			{
				signature: 'disconnect(element, event?, handler?)',
				returns: '',
				description: 'Detaches the specified event handler from the target element. If only the first argument is provided, it can be the specific hook object returned from a previous <code>bi.connect(element, event, handler)</code> call.',
				parameters:
				{
					'element': 'The element of reference or the attach hook.',
					'event': 'The name of the event.',
					'handler': 'The callback function.'
				}
			},
			'onLoad':
			{
				signature: 'onLoad(callback)',
				returns: '',
				description: 'Executes the callback function once the window has loaded. If the window was already loaded, the callback is called immediately.',
				parameters:
				{
					'callback': 'The callback function.'
				}
			},
			'node':
			{
				signature: 'node(tag, attributes?, content?)',
				returns: 'HTMLElement',
				description: 'Creates an HTMLElement allowing to build the page. The attributes and content arguments can be inverted.<pre>bi.node("div", <br />{<br />&nbsp;&nbsp;&nbsp;&nbsp;id: "myDiv",<br />&nbsp;&nbsp;&nbsp;&nbsp;styleBackgroundColor: "#ff0000",<br />&nbsp;&nbsp;&nbsp;&nbsp;click: function() { console.log("foo"); }<br />}, "my content");<br /><br />// leads to the following HTML content<br />&lt;div id="myDiv" style="background-color: #ff0000" click="console.log(\'foo\')"&gt;my content&lt/div&gt;</pre>',
				parameters:
				{
					'tag': 'The HTML tag name.',
					'attributes': 'The additionnal tag attributes, handlers, style and dataset in the form of a key/value object. If the key starts with "style" then the matching style property will be set. If the key starts with "data", the matching dataset property will be set. If the value is a function, an event handler is created for an event of that key name.',
					'content': 'The element content. If a string is provided, it is interpreted as the innerHTML. If an element or array of elements is provided, it is appended as a child of this element.'
				}
			},
			'provide':
			{
				signature: 'provide(name)',
				returns: '',
				description: 'This is the notification callback from required javascript files included with <code>bi.require()</code>.<pre>// file /js/foo/bar.js<br />"use strict";<br />bi.fire(bi, "provide", ["foo/bar"]);</pre>',
				parameters:
				{
					'name': 'The module name'
				}
			},
			'require':
			{
				signature: 'require(name, successCallback)',
				returns: '',
				description: 'Imports the provided Javascript file in the page and calls the successCallback when the import is complete. If an array of names is provided, each of them is required and the successCallback is called only when all are complete. The name can be an absolute file name including the ".js" file extension, or a relative path excluding the ".js" file extension. Relative files are loaded from the <code>/bi.$root/js/</code> directory. Each file is imported only once in the page to ensure unicity. This function should be used to manage dependencies of the encapsulated code.<pre>bi.require(["bi.modal", "bi.translate"], function()<br />{<br />&nbsp;&nbsp;&nbsp;&nbsp;// bi.modal and bi.translate are now available<br />}</pre>',
				parameters:
				{
					'name': 'The name of the Javascript file to import.'
				}
			},
			'define':
			{
				signature: 'define(ctor, members, statics, inherit)',
				returns: 'Object',
				description: 'Defines a new class. The four parameters can be grouped into a single object if desired.<pre>var my_class = bi.define(<br />{<br />&nbsp;&nbsp;&nbsp;&nbsp;inherit: bi.EventTarget,<br />&nbsp;&nbsp;&nbsp;&nbsp;ctor: function() { /* constructor */ },<br />&nbsp;&nbsp;&nbsp;&nbsp;statics:<br />&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;foo: function() { console.log("foo"); }<br />&nbsp;&nbsp;&nbsp;&nbsp;},<br />&nbsp;&nbsp;&nbsp;&nbsp;members:<br />&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bar: function() { console.log("bar"); }<br />&nbsp;&nbsp;&nbsp;&nbsp;}<br />});<br /><br />var a = new my_class();<br />a.bar(); // -> "bar"<br />my_class.foo(); // -> "foo"</pre>',
				parameters:
				{
					'ctor': 'The constructor function.',
					'members': 'All member variables and functions in the form of a key/value pair object. Note that you should initialize the member properties in the constructor to avoid duplicated references amongst class instances. The value of the member can be a function, a getter/setter or any regular object.',
					'statics': 'All static variables and functions in the form of a key/value pair object.',
					'inherit': 'The parent class to inherit from.'
				}
			},
			'instance':
			{
				signature: 'instance(definition)',
				returns: 'Object',
				description: 'Creates a new class definition using <code>bi.define(definition)</code> and returns an instance of that new class. The constructor is called without arguments.',
				parameters:
				{
					'definition': 'The class definition as per <code>bi.define</code>'
				}
			},
			'importCss':
			{
				signature: 'importCss(name)',
				returns: '',
				description: 'Imports the provided CSS file in the page. The name can be an absolute file name including the ".css" file extension, or a relative path excluding the ".css" file extension. Relative files are loaded from the <code>/bi.$root/css/</code> directory.<pre>bi.importCss("custom/main"); // relative path to /css/custom/main.css<br />bi.importCss("/css/custom/main.css"); // absolute path</pre>',
				parameters:
				{
					'name': 'The name of the CSS file to import. If an array is provided, all files are imported.'
				}
			},
			'_':
			{
				signature: '_(key, ...)',
				returns: 'String',
				description: 'Get the localized translation of the key. Alias of <code>bi.tanslate.get(key, ...)</code>.',
				parameters:
				{
					'key': 'The translation key',
					'...': 'Any number of substitution elements'
				}
			}
		}
	},
	'ajax':
	{
		title: 'bi.ajax',
		description: 'This function represents a wrapper around the builtin XMLHttpRequest object. It accepts both success and error callbacks but also returns a Promise object to allow both paradigms to be used.',
		sample: 'var request = bi.ajax("https://endpoint", {method: "POST", params: {foo: 42, bar: "moo"}});<br />request.then(function(response)<br />{<br />&nbsp;&nbsp;&nbsp;&nbsp;console.log(response.status); // -> 200<br />&nbsp;&nbsp;&nbsp;&nbsp;console.log(response.headers); // -> {"Content-Type": "text/plain"}<br />&nbsp;&nbsp;&nbsp;&nbsp;console.log(response.response); // -> "Hello World!"<br />});',
		ctor:
		{
			signature: 'bi.ajax(url, properties?, successCallback?, errorCallback?)',
			description: 'Both the successCallback and errorCallback arguments are optional if using the Promise paradigm.<br />The properties object supports the following elements: <br /><ul><li><em>method</em>: The HTTP request method to use in upper case (default "GET").</li><li><em>timeout</em>: The timeout of the request in milliseconds (default 0 for no timeout).</li><li><em>cookie</em>: Whether or not to send cookie information (default false).</li><li><em>mime</em>: Override the response mime type with the one provided (default null).</li><li><em>nocache</em>: If true and the method is "GET", a random query string parameter "_t" is appended to the request (default false).</li><li><em>as</em>: The responseType of the XMLHttpRequest: how to interpret the result (default "text").</li><li><em>headers</em>: A key/value pair of request headers (default {}).</li><li><em>user</em> and <em>password</em>: The Basic authorization header user and password (default null).</li><li><em>params</em>: The request parameters in the form of a key/value pair object, a FormData object or a HTMLFormElement (default null).</li></ul>' +
				'<br /><br />Both the successCallback and errorCallback (or Promise resolve and reject functions) will be passed an object with the following properties set : <ul><li><em>status</em>: the HTTP response code.</li><li><em>headers</em>: the HTTP response headers in the form of a key/value pair object.</li><li><em>response</em>: the response body interpreted according to the "as" request parameter.</li></ul>'
		}
	},
	'cookie':
	{
		title: 'bi.cookie',
		description: 'This class acts as a proxy to the cookie values with helper methods to manage the values with ease.',
		sample: 'bi.cookie.set("foo", "42");<br />console.log(bi.cookie.get("foo")); // -> "42"<br />bi.cookie.remove("foo");<br />console.log(bi.cookie.get("foo")); // -> null',
		methods:
		{
			'get':
			{
				signature: 'get(key)', 
				returns: 'String', 
				description: 'Returns the value of the cookie parameter associated with the provided key or null if the key is not found or not available as per the "secure", "domain" and "path" components.',
				parameters:
				{
					'key': 'The name of the cookie element to return.'
				}
			},
			'set':
			{
				signature: 'set(key, value, sessionOnly?, secure?, domain?, path?)',
				returns: '',
				description: 'Sets the specified cookie value.',
				parameters:
				{
					'key': 'The name of the cookie element.',
					'value': 'The value of the cookie element.',
					'sessionOnly': 'Whether or not the cookie is destroyed after the browser is closed. If false, then the value is preserved for 1 year maximum. (Default true)',
					'secure': 'Whether or not to force a HTTPS connection to retrieve the value later on. (Default false)',
					'domain': 'The domain for which the cookie is valid. If the root domain is specified, it is valid for all subdomains. (Default to the current subdomain)',
					'path': 'The path (URI) for which the cookie is value. If the root "/" is specified, it is valid for all URIs. (Default to the current path)'
				}
			},
			'remove':
			{
				signature: 'remove(key, secure?, domain?, path?)',
				returns: '',
				description: 'Removes the specified cookie value. All parameters must match the ones used in <code>bi.cookie.set()</code>.',
				parameters:
				{
					'key': 'The name of the cookie element.',
					'secure': 'Whether or not to force a HTTPS connection to retrieve the value later on. (Default false)',
					'domain': 'The domain for which the cookie is valid. If the root domain is specified, it is valid for all subdomains. (Default to the current subdomain)',
					'path': 'The path (URI) for which the cookie is value. If the root "/" is specified, it is valid for all URIs. (Default to the current path)'
				}
			},
			'has':
			{
				signature: 'has(key)', 
				returns: 'Boolean', 
				description: 'Returns whether or not the given key is available as per the "secure", "domain" and "path" components.',
				parameters:
				{
					'key': 'The name of the cookie element to return.'
				}
			},
			'all':
			{
				signature: 'all()', 
				returns: 'Object', 
				description: 'Returns all cookie elements in the form of a key/value pair object.',
				parameters:
				{
				}
			},
			'clear':
			{
				signature: 'clear()', 
				returns: '', 
				description: 'Removes all cookie elements using <code>bi.cookie.remove()</code> with default "secure", "domain" and "path" values. Thus, some cookie elements may not be cleared of they were set with non-default parameters.',
				parameters:
				{
				}
			}
		}
	},
	'EventTarget': 
	{
		title: 'bi.EventTarget',
		description: 'This is a base class to be inherited. It provides the ability to register event listeners and dispatch events. The methods of this class conform to the EventTarget object model but it is preferable to use the <code>bi.on()</code> and <code>bi.fire()</code> shortcuts to handle the events.',
		sample: 'var my_class = bi.define(<br />{<br />&nbsp;&nbsp;&nbsp;&nbsp;inherit: bi.EventTarget<br />});<br /><br />var a = new my_class();<br />bi.on(a, "foo", function(e) { console.log(e.data); });<br />bi.fire(a, "foo", "bar"); // -> shows "bar" in the console from the event handler',
		methods:
		{
			'addEventListener':
			{
				signature: 'addEventListener(type, callback)', 
				returns: '', 
				description: 'Registers an event listener on this object instance.',
				parameters:
				{
					'type': 'The event name.',
					'callback': 'The callback function to dispatch when the event happens'
				}
			},
			'removeEventListener':
			{
				signature: 'removeEventListener(type, callback)', 
				returns: '', 
				description: 'Removes an event listener from this object instance.',
				parameters:
				{
					'type': 'The event name.',
					'callback': 'The registered callback function'
				}
			},
			'dispatchEvent':
			{
				signature: 'dispatchEvent(event)', 
				returns: '', 
				description: 'Dispatches an event on this object instance.',
				parameters:
				{
					'event': 'The Event to dispatch'
				}
			},
			'on':
			{
				signature: 'on(event, handler)',
				returns: 'Object',
				description: 'Registers and event handler. Alias of <code>bi.on(this, event, handler)</code>.<br />Note: this is known to cause incompatibilities with the Dojo framework.',
				parameters:
				{
					'event': 'The event name',
					'handler': 'The event handler'
				}
			},
			'once':
			{
				signature: 'once(event, handler)',
				returns: 'Object',
				description: 'Registers and event handler to execute only once. Alias of <code>bi.once(this, event, handler)</code>.',
				parameters:
				{
					'event': 'The event name',
					'handler': 'The event handler'
				}
			},
			'fire':
			{
				signature: 'fire(event, params, async)',
				returns: '',
				description: 'Dispatches an event. Alias of <code>bi.fire(this, event, params, async)</code>.',
				parameters:
				{
					'event': 'The event name',
					'params': 'The event parameters',
					'async': 'Whether or not the event is triggered asynchronousely'
				}
			}
		}
	},
	'env':
	{
		title: 'bi.env',
		description: 'This object contains environment variables and global configuration parameters. It is the place to add such configurations such that they are available throughout the application.',
		properties:
		{
			'DOMAIN': {type: 'String', description: 'This is the main hostname of the application. Default is <code>window.location.host</code>.'},
			'LOCALES': {type: 'Array', description: 'This is the list of supported locales by <code>bi.translate</code>. The locales should be the lower-case two letter code of the language. The first locale in that list will be used by default when the user locale is not found or not supported.'}
		}
	},
	'translate': 
	{
		title: 'bi.translate',
		description: 'Manages the text translations. The alias method <code>bi._()</code> is a shorthand for <code>bi.translate.get()</code>. The translation files are loaded from the <code>bi.$root/js/locale</code> directory with the file name matching the specified locale.<br />The translation text can contain any number of substitution parameters in the form of <code>{0}</code> with the digit being the argument number starting at zero.<pre>"use strict";<br />// Sample translation file<br /><br />if( !bi.translate.cache.en ) bi.translate.cache.en = {};<br />bi.translate.cache.en.import(<br />{<br />&nbsp;&nbsp;&nbsp;&nbsp;"yes": "Yes",<br />&nbsp;&nbsp;&nbsp;&nbsp;"no": "No",<br />&nbsp;&nbsp;&nbsp;&nbsp;"ok": "OK",<br />&nbsp;&nbsp;&nbsp;&nbsp;"cancel": "Cancel",<br />&nbsp;&nbsp;&nbsp;&nbsp;"hello": "Hello {0} {1}!"<br />});<br /><br />bi.fire(bi, "provide", ["locale/en"]);',
		sample: 'bi.require("bi.translate", function()<br />{<br />&nbsp;&nbsp;&nbsp;&nbsp;// the default locale is loaded<br />&nbsp;&nbsp;&nbsp;&nbsp;var txt = bi._("yes"); // -> "Yes"<br />&nbsp;&nbsp;&nbsp;&nbsp;bi.translate.switch("fr", function()<br />&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// the "fr" locale is now loaded<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;txt = bi._("yes"); // -> "Oui"<br />&nbsp;&nbsp;&nbsp;&nbsp;});<br />});',
		properties:
		{
			'locale': {type: 'String', description: 'The current user locale as a two lower case language code. Defaults in order to the language set in the cookie, or as detected by the browser.'},
			'cache': {type: 'Object', description: 'This is the translation store. At first level, the object keys are the locales, and at second level, a key/value pair object containing the translation key and the localised translation.'}
		},
		methods:
		{
			'init':
			{
				signature: 'init()',
				returns: '',
				description: 'This method is invoked upon file inclusion and loads the translation file matching the <code>bi.translate.locale</code>. Only then, the module fires the <code>bi.provide</code> event.',
				parameters:
				{
				}
			},
			'get':
			{
				signature: 'get(key, ...)',
				returns: 'String',
				description: 'Returns the translation of the specified key in the current locale. If additionnal parameters are provided, they are used as substitution for the translated text.<pre>var firstname = "foo";<br />var lastname = "bar";<br />bi._("hello", firstname, lastname); // "Hello {0} {1}" -> "Hello foo bar"</pre>If the current locale does not exist or the key does not exist, then an empty string is returned.',
				parameters:
				{
					'key': 'The translation key.',
					'...': 'Any additionnal substitution parameters'
				}
			},
			'load':
			{
				signature: 'load(locale)',
				returns: '',
				description: 'If the specified locale is different from the <code>bi.translate.locale</code>, then the cookie is set with that locale and the page is reloaded entirely to apply the change.',
				parameters:
				{
					'locale': 'The two lower case language code.'
				}
			},
			'switch':
			{
				signature: 'switch(locale, callback)',
				returns: '',
				description: 'Switches the current locale without reloading the page. If the <code>bi.env.LOCALES</code> does not contain the specified locale, the frist one of that list is loaded instead.',
				parameters:
				{
					'locale': 'The two lower case language code.',
					'callback': 'The callback function passed to <code>bi.require()</code> to load the translation file.'
				}
			}
		}
	},
	'rest':
	{
		title: 'bi.rest',
		description: 'This object is a wrapper around bi.ajax that will handle the Busit REST API response and errors. It provides a login mechanism to acquire credentials beforehand.<br />Note that the constants bi.env.API_HOST (the base url of the Busit REST API) and bi.env.DOMAIN (domain name to set the login cookie) are strongly recommended.',
		sample: 'try<br />{<br />&nbsp;&nbsp;&nbsp;&nbsp;bi.rest.login(); // will load credentials from the cookie<br />&nbsp;&nbsp;&nbsp;&nbsp;bi.rest.get("/self/system/user/select").then(function(response)<br />&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(response.user_id);<br />&nbsp;&nbsp;&nbsp;&nbsp;});<br />}<br />catch(Exception e)<br />{<br />&nbsp;&nbsp;&nbsp;&nbsp;// user not logged in<br />}',
		properties:
		{
			'REST_API': {type: 'String', description: 'The base URL of the Busit REST API. It is initialized with bi.env.API_HOST'},
			'USER': {type: 'String', description: 'The currently logged user id'},
			'TOKEN': {type: 'String', description: 'The currently logged user access token'}
		},
		methods:
		{
			'login':
			{
				signature: '[static] login(user?, pass?, remember?, successCallback?, errorCallback?)',
				returns: 'Promise',
				description: 'Attempts to retrieve the user credentials to use the Busit REST API. If the user and password parameters are omitted, the cookie values are used if available. The promise returns the user id upon resolution.',
				parameters:
				{
					'user': 'The user name, email or id. If omitted as well as the password, the cookie values will be used',
					'pass': 'The user password or token. If omitted as well as the user, the cookie values will be used',
					'remember': 'Whether or not to store the retrieved credentials in the cookie. Default false',
					'successCallback': 'The function to call with the user id as parameter when the credentials have been retrieved',
					'errorCallback': 'The function to call of the authentication fails'
				}
			},
			'logout':
			{
				signature: '[static] logout()',
				returns: '',
				description: 'Removes the cookie and sets the USER and TOKEN properties to null'
			},
			'isAuthenticated':
			{
				signature: '[static] isAuthenticated()',
				returns: 'Boolean',
				description: 'Returns whether or not the USER and TOKEN properties are populated and can be used'
			},
			'get':
			{
				signature: '[static] get(path, props?, successCallback?, errorCallback?)',
				returns: 'Promise',
				description: 'Performs the specified Busit REST API call and returns the response',
				parameters:
				{
					'path': 'The target endpoint. If a full URL is provided, it is used as is. Otherwise, the path is appended to the REST_API property',
					'props': 'The ajax request parameters (see bi.ajax). If props.headers.Authorization is specified, it will override the USER and TOKEN credentials',
					'successCallback': 'The successCallback to handle the response. The callback will be called with the parsed JSON response from the Busit REST API',
					'errorCallback': 'The errorCallback to handle the error. The callback will be called with the parsed JSON error from the Busit REST API'
				}
			}
		}
	}, 
	'modal':
	{
		title: 'bi.modal',
		description: 'Provides convenience methods to replace the browser native alert, prompt and confirm methods.',
		sample: 'bi.modal.alert("Hello World!");<br /><br />bi.modal.confirm("Are you sure ?", function(choice)<br />{<br />&nbsp;&nbsp;&nbsp;&nbsp;if( choice === 0 ) console.log("yes");<br />&nbsp;&nbsp;&nbsp;&nbsp;else console.log("no");<br />});<br /><br />bi.modal.prompt("Enter your name", function(value)<br />{<br />&nbsp;&nbsp;&nbsp;&nbsp;console.log(value);<br />});<br /><br />bi.modal.modal(bi.node("p", "Hello World!"), true);',
		methods:
		{
			'alert':
			{
				signature: '[static] alert(message, callback?)',
				returns: '',
				description: 'Displays a foremost element with the specified message and a single OK button. When the OK button is pressed, the element is removed from the DOM and the callback function is called.',
				parameters:
				{
					'message': 'The message to display. The message is used as the content to bi.node() and can be an innerHTML or a node',
					'callback': 'The callback function to call once the user has pressed the OK button'
				}
			},
			'confirm':
			{
				signature: '[static] confirm(message, callback?, buttons?)',
				returns: '',
				description: 'Displays a foremost element with the specified message and multiple buttons. When any button is pressed, the element is removed from the DOM and the callback function is called with the index of the pressed button.',
				parameters:
				{
					'message': 'The message to display. The message is used as the content to bi.node() and can be an innerHTML or a node',
					'callback': 'The callback function to call once the user has pressed any button',
					'buttons': 'An ordered array of button labels. If not provided, "OK" and "Cancel" are used'
				}
			},
			'prompt':
			{
				signature: '[static] prompt(message, callback?, value?, type?)',
				returns: '',
				description: 'Displays a foremost element with the specified message and input. When the OK button is pressed, the element is removed from the DOM and the callback function is called with the input value. If the Cancel button is pressed, the callback function is called with a null value.',
				parameters:
				{
					'message': 'The message to display. The message is used as the content to bi.node() and can be an innerHTML or a node',
					'callback': 'The callback function to call once the user has pressed any button. The value of the input is passed as argument',
					'value': 'The initial value of the input',
					'type': 'If the type is a HTMLElement that contains a "value" property, it is used as input. If the type is "textarea", a textarea field is used as input. Else an input type text is used'
				}
			},
			'modal':
			{
				signature: '[static] modal(dom, escapable?)',
				returns: '',
				description: 'Displays the provided element as foremost element. It listens for the "close" event to remove it from the DOM. If multiple modal elements are displayed, only the last is closed.',
				parameters:
				{
					'dom': 'The node to display',
					'escapable': 'If true, then the "close" event is triggered (and the element is removed) when the escape key is pressed or if the user clicks anywhere else'
				}
			}
		}
	},
	'color':
	{
		title: 'bi.color',
		description: 'Provides convenience methods to convert or decompose colors.',
		sample: 'bi.color.toArray("#FF0000"); // -> [255, 0, 0, 1]<br />bi.color.toObject("#00FF00"); // -> {r: 0, g: 255, b: 0, a: 1}<br />bi.color.toString([0, 0, 255, 0.5]); // -> "rgba(0, 0, 255, 0.5)"<br />bi.color.toHex([0, 255, 255]); // -> "#00FFFF"<br />bi.color.blend("#FF0000", "#FFFFFF", 0.5); // -> "#FF7F7F"',
		methods:
		{
			'toArray':
			{
				signature: '[static] toArray(color)',
				returns: 'Array',
				description: 'Returns the red, green, blue, alpha color components in the form of an array',
				parameters:
				{
					'color': 'The color to decompose. If a #RRGGBB, rgb(R,G,B) or rgba(R,G,B,A) string is given, it is converted. If an object containing r, g, b and a properties is given, those are used'
				}
			},
			'toObject':
			{
				signature: '[static] toObject(color)',
				returns: 'Object',
				description: 'Returns the red, green, blue, alpha color components in the form of an object {r: int, g: int, b: int, a: float}',
				parameters:
				{
					'color': 'The color to decompose as per toArray(color)'
				}
			},
			'toString':
			{
				signature: '[static] toString(color)',
				returns: 'String',
				description: 'Returns the rgb() or rgba() form of the provided color',
				parameters:
				{
					'color': 'The color to decompose as per toArray(color)'
				}
			},
			'toHex':
			{
				signature: '[static] toHex(color)',
				returns: 'String',
				description: 'Returns the #RRGGBB form of the provided color',
				parameters:
				{
					'color': 'The color to decompose as per toArray(color)'
				}
			},
			'rgb2rgba':
			{
				signature: '[static] rgb2rgba(color, alpha)',
				returns: 'String',
				description: 'Returns the toString(color) form of the provided color with the applied alpha',
				parameters:
				{
					'color': 'The color to decompose as per toArray(color)',
					'alpha': 'The alpha component'
				}
			},
			'hsl2rgb':
			{
				signature: '[static] hsl2rgb(h, s, l)',
				returns: 'Object',
				description: 'Returns the rgb toObject(color) form of the provided hsl components',
				parameters:
				{
					'h': 'The hue',
					's': 'The saturation',
					'l': 'The luminance'
				}
			},
			'rgb2hsl':
			{
				signature: '[static] rgb2hsl(rgb)',
				returns: 'Object',
				description: 'Returns the {h: int, s: float, l: float} form of the provided rgb color',
				parameters:
				{
					'rgb': 'The rgb color to decompose as per toArray(color)'
				}
			},
			'blend':
			{
				signature: '[static] blend(foreground, background, alpha)',
				returns: 'String',
				description: 'Returns the toHex(color) form of the result of alpha blending of the foreground on the background',
				parameters:
				{
					'foreground': 'The foreground color to use as per toArray(color)',
					'background': 'The background color to use as per toArray(color)',
					'alpha': 'The alpha blending value'
				}
			}
		}
	},
	'Promise':
	{
		title: "Promise",
		description: "The main purpose of this class is to polyfill the Promise object for browsers that do not support it. Meanwhile, this class offers additionnal guarantees and flexibility.",
		sample: "var p = new bi.Promise(function(resolve, reject)<br />{<br />&nbsp;&nbsp;&nbsp;&nbsp;resolve(42);<br />});<br />p.then(function(value) { console.log(value); }); // -> 42",
		ctor:
		{
			signature: 'bi.Promise(executor?)',
			description: 'Constructs a new instance of this class. The optional executor is a function that accepts two parameters: the resolve function to call in order to resolve this promise, and the reject function to call in order to reject this promise. The executor function itself should perform its operations and either call the resolve or reject argument function. Only one call of either is allowed, subsequent calls to resolve or reject will be ignored.'
		},
		properties:
		{
			'state': {type: 'String', description: 'The current state, one of "pending", "fulfilled" or "rejected". This allows to introspect the meaning of the value in a fially() case.'},
			'value': {type: 'Object', description: 'The resolved value or undefined if the state is still pending or is rejected.'},
			'reason': {type: 'Object', description: 'The rejected reason or undefined if the state is still pending or is fulfilled.'}
		},
		methods:
		{
			'all':
			{
				signature: '[static] all(iterable)',
				returns: 'Promise',
				description: 'Returns a single Promise that resolves when all of the promises passed as an iterable have resolved or when the iterable contains no promises. It rejects with the reason of the first promise that rejects. The order of the resolved values is guaranteed to be the same as the iterator.',
				parameters:
				{
					'iterable': 'An array of Promise'
				}
			},
			'race':
			{
				signature: '[static] race(iterable)',
				returns: 'Promise',
				description: 'Returns a promise that resolves or rejects as soon as one of the promises in an iterable resolves or rejects, with the value or reason from that promise.',
				parameters:
				{
					'iterable': 'An array of Promise'
				}
			},
			'reject':
			{
				signature: '[static] reject(reason)',
				returns: 'Promise',
				description: 'Returns a Promise object that is rejected with a given reason.',
				parameters:
				{
					'reason': 'Reason why this Promise rejected.'
				}
			},
			'resolve':
			{
				signature: '[static] resolve(value)',
				returns: 'Promise',
				description: 'Returns a Promise object that is resolved with a given value.',
				parameters:
				{
					'value': 'Argument to be resolved by this Promise.'
				}
			},
			'then':
			{
				signature: 'then(onFulfilled, onRejected?)',
				returns: 'Promise',
				description: 'Returns a Promise. It takes up to two arguments: callback functions for the success and failure cases of the Promise.',
				parameters:
				{
					'onFulfilled': 'A Function called if the Promise is fulfilled. This function has one argument, the fulfillment value.',
					'onRejected': 'A Function called if the Promise is rejected. This function has one argument, the rejection reason.'
				}
			},
			'catch':
			{
				signature: 'catch(onRejected)',
				returns: 'Promise',
				description: 'Returns a Promise and deals with rejected cases only. It behaves the same as calling <code>Promise.then(undefined, onRejected)</code>.',
				parameters:
				{
					'onRejected': 'A Function called if the Promise is rejected. This function has one argument, the rejection reason.'
				}
			},
			'finally':
			{
				signature: 'finally(onFinally)',
				returns: 'Promise',
				description: 'Returns a Promise. When the promise is settled, i.e either fulfilled or rejected, the specified callback function is executed with the apropriate parameter.',
				parameters:
				{
					'onFinally': 'A Function called when the Promise is settled.'
				}
			}
		}
	}
};
bi.fire(bi, 'provide', ['jsapidoc.content.bi']);