jsapidoc.content = 
{
	'bi':
	{
		'bi':
		{
			title: 'bi',
			description: 'This is the base object required to operate the Busit Javascript API. It is created upon inclusion of the file in the DOM.<br />The <code>bi</code> object also acts as the global namespace for the entire API. The basic methods are defined directly on the root namespace described hereafter while other high level classes or functionnalities are created as packages registered as sub-properties of this object.',
			sample: '&lt;head&gt;<br />&lt;script type="text/javascript" src="/js/bi.js"&gt;&lt;/script&gt;<br />&lt;script type="text/javascript&gt;<br />bi.onLoad(function() { console.log("Ready!"); });<br />&lt;/script&gt;<br />&lt;/head&gt;',
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
					description: 'Triggers the specified event on the target element.<pre>// use fire as a function call<br />bi.fire(console, "log", "foo"); // -> "foo"<br /><br />// use fire as an event<br />bi.fire(document.body, "click");<br /><br />// conflicting function name<br />document.body.click = function(txt) { console.log(txt); };<br />bi.fire(document.body, "click", "test"); // -> calls the click function and prints to the console<br />bi.fire(document.body, "@click", "test"); // -> dispatches the click event with event.data = "test"</pre>',
					parameters:
					{
						'element': 'The target element. If an Element is passed as argument, it is used directly. If a String is passed as argument, the element is resolved using <code>bi.all(element)</code>. If an Array is passed as argument, then the event is dispatched on all provided elements.',
						'event': 'The name of the event. If the event starts with <code>"on"</code> and a matching function exists on the element, that function is called. If the element is an EventTarget, then the event is dispatched on that element. If the element is an EventTarget and also contains a function with a matching name, the function is called in priority, except if the event name is prefixed with the <code>"@"</code> symbol.',
						'params': 'The parameters of the event. If the event resolves as a function, those are the function parameters. Otherwise the properties will be set in the <code>data</code> variable of the event.',
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
						'callback': 'The callback function'
					}
				},
				'node':
				{
					signature: 'node(tag, attributes, content)',
					returns: 'HTMLElement',
					description: '',
					parameters:
					{
					}
				},
				'provide':
				{
					signature: 'provide(name)',
					returns: '',
					description: '',
					parameters:
					{
					}
				},
				'require':
				{
					signature: 'require(name, successCallback)',
					returns: '',
					description: '',
					parameters:
					{
					}
				},
				'define':
				{
					signature: 'define(ctor, members, statics, inherit)',
					returns: '',
					description: '',
					parameters:
					{
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
						'name': 'The name of the CSS file to import'
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
			},
			events:
			{
			}
		},
		'ajax': {title: 'bi.ajax'},
		'cookie': {title: 'bi.cookie'},
		'EventTarget': {title: 'bi.EventTarget'},
		'env': {title: 'bi.env'},
		'translate': {title: 'bi.translate'},
		'rest': {title: 'bi.rest'}, 
		'modal': {title: 'bi.modal'},
		'gui': {title: 'bi.gui'},
		'Promise':
		{
			title: "Promise",
			description: "The main purpose of this class is to polyfill the Promise object for browsers that do not support it. Meanwhile, this class offers additionnal guarantees and flexibility.",
			sample: "var p = new bi.Promise(function(resolve, reject)<br />{<br />&nbsp;&nbsp;&nbsp;&nbsp;resolve(42);<br />});<br />p.then(function(value) { console.log(value); }); // -> 42",
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
					description: 'Returns a Promise. When the promise is settled, i.e either fulfilled or rejected, the specified callback function is executed.',
					parameters:
					{
						'onFinally': 'A Function called when the Promise is settled.'
					}
				}
			}
		}
	},
	'html':
	{
		'document':
		{
			title: "document",
			description: "The following DOM extensions ensure a minimum level of browser compatibility and otherwise add some common sense methods to the base Javascript objects.",
			methods:
			{
				'disableBackspace':
				{
					signature: 'disableBackspace(callback)',
					returns: '',
					description: 'Ignores the backspace key except in an input field. This is to avoid back navigation accidentally.',
					parameters:
					{
						'callback': 'Event handler when the backspace key is prevented'
					}
				},
				'enableBackspace':
				{
					signature: 'enableBackspace()',
					returns: '',
					description: 'Re-enables the backspace key.',
					parameters:
					{
					}
				}
			},
			events:
			{
				'enter': 'Fired when the "enter" key is pressed.',
				'escape': 'Fired when the "escape" key is pressed.',
				'delete': 'Fired when the "delete" key is pressed.'
			}
		},
		'window':
		{
			title: "window",
			description: "The following DOM extensions ensure a minimum level of browser compatibility and otherwise add some common sense methods to the base Javascript objects.",
			properties:
			{
				'EventTarget': {type: 'HTMLElement', description: 'If the EventTarget type does not exist, it is cloned from HTMLElement.'},
				'console': {type: 'Object', description: 'If the Console does not exist, an empty placeholder is created.'},
				'Promise': {type: 'bi.Promise', description: 'If the Promise type does not exist, it is cloned from bi.Promise.'}
			}
		},
		'RegExp':
		{
			title: "RegExp",
			description: "The following DOM extensions ensure a minimum level of browser compatibility and otherwise add some common sense methods to the base Javascript objects.",
			methods:
			{
				'escape':
				{
					signature: '[static] escape(s)',
					returns: 'String',
					description: 'Escapes the provided string such that it can be safely included in a new RegExp pattern.<pre>RegExp.escape("ab +$ cd"); // -> "ab \\+\\$ cd"</pre>',
					parameters:
					{
						's': 'The string to escape.'
					}
				},
				'all':
				{
					signature: 'all(txt)',
					returns: 'Array',
					description: 'Returns all matches of the <code>exec()</code> method at once.<pre>/(o+)/ig.all("foo mOoOo"); // -> [["oo"], ["OoOo"]]</pre>',
					parameters:
					{
						'txt': 'The text to match against'
					}
				}
			}
		},
		'Function':
		{
			title: "Function",
			description: "The following DOM extensions ensure a minimum level of browser compatibility and otherwise add some common sense methods to the base Javascript objects.",
			methods:
			{
				'later':
				{
					signature: 'later(t, a)',
					returns: '',
					description: 'Calls the function later using <code>requestAnimationFrame</code>.<pre>(function() { console.log("a"); }).later();<br />console.log("b");<br /> // -> "b" then "a"</pre>',
					parameters:
					{
						't': 'The <code>this</code> argument as of <code>Function.apply()</code>',
						'a': 'The <code>args</code> argument as of <code>Function.apply()</code>'
					}
				},
				'delay':
				{
					signature: 'delay(d, t, a)',
					returns: '',
					description: 'Delays the function call using <code>setTimeout</code>.<pre>(function() { console.log("a"); }).delay(2000);<br />// -> "a" 2 seconds later</pre>',
					parameters:
					{
						'd': 'The delay in milliseconds',
						't': 'The <code>this</code> argument as of <code>Function.apply()</code>',
						'a': 'The <code>args</code> argument as of <code>Function.apply()</code>'
					}
				}
			}
		},
		'location':
		{
			title: "location",
			description: "The following DOM extensions ensure a minimum level of browser compatibility and otherwise add some common sense methods to the base Javascript objects.",
			properties:
			{
				'parameters': {type: 'Object', description: 'The query string parameters in the form of a key-value pair object.<br />Note: the parameters are parsed on page load and will not reflect changes that occur afterwards.'}
			}
		},
		'Date':
		{
			title: "Date",
			description: "The following DOM extensions ensure a minimum level of browser compatibility and otherwise add some common sense methods to the base Javascript objects.",
			methods:
			{
				'addSeconds':
				{
					signature: 'addSeconds(n)',
					returns: 'Date',
					description: 'Adds the specified amount of time to the date.',
					parameters:
					{
						'n': 'The amount of time to add.'
					}
				},
				'addMinutes':
				{
					signature: 'addMinutes(n)',
					returns: 'Date',
					description: 'Adds the specified amount of time to the date.',
					parameters:
					{
						'n': 'The amount of time to add.'
					}
				},
				'addHours':
				{
					signature: 'addHours(n)',
					returns: 'Date',
					description: 'Adds the specified amount of time to the date.',
					parameters:
					{
						'n': 'The amount of time to add.'
					}
				},
				'addDays':
				{
					signature: 'addDays(n)',
					returns: 'Date',
					description: 'Adds the specified amount of time to the date.',
					parameters:
					{
						'n': 'The amount of time to add.'
					}
				},
				'addMonths':
				{
					signature: 'addMonths(n)',
					returns: 'Date',
					description: 'Adds the specified amount of time to the date.',
					parameters:
					{
						'n': 'The amount of time to add.'
					}
				},
				'addYears':
				{
					signature: 'addYears(n)',
					returns: 'Date',
					description: 'Adds the specified amount of time to the date.',
					parameters:
					{
						'n': 'The amount of time to add.'
					}
				},
				'addWeeks':
				{
					signature: 'addWeeks(n)',
					returns: 'Date',
					description: 'Adds the specified amount of time to the date.',
					parameters:
					{
						'n': 'The amount of time to add.'
					}
				},
				'getWeek':
				{
					signature: 'getWeek()',
					returns: 'Number',
					description: 'Returns the week number.',
					parameters:
					{
					}
				}
			}
		},
		'Array':
		{
			title: "Array",
			description: "The following DOM extensions ensure a minimum level of browser compatibility and otherwise add some common sense methods to the base Javascript objects.",
			methods:
			{
				'clear':
				{
					signature: 'clear()',
					returns: '',
					description: 'Clears the array.',
					parameters:
					{
					}
				},
				'first':
				{
					signature: 'first()',
					returns: 'Object',
					description: 'Returns the first element of the array or null if the array is empty.',
					parameters:
					{
					}
				},
				'last':
				{
					signature: 'last()',
					returns: 'Object',
					description: 'Returns the last element of the array of null if the array is empty.',
					parameters:
					{
					}
				},
				'remove':
				{
					signature: 'remove(v)',
					returns: 'Object',
					description: 'Removes the specified value from the array and return it. If the value is not found, null is returned.',
					parameters:
					{
						'v': 'The value to remove.'
					}
				},
				'contains':
				{
					signature: 'contains(v)',
					returns: 'Boolean',
					description: 'Returns whether or not the specified value is in the array.',
					parameters:
					{
						'v': 'The value to check.'
					}
				},
				'containsAny':
				{
					signature: 'containsAny(v)',
					returns: 'Boolean',
					description: 'Returns whether or not any of the specified values are contained in the array.',
					parameters:
					{
						'v': 'Array of values to check.'
					}
				},
				'containsAll':
				{
					signature: 'containsAll(v)',
					returns: 'Boolean',
					description: 'Returns whether or not all of the specified values are contained in the array.',
					parameters:
					{
						'v': 'Array of values to check.'
					}
				},
				'pushUnique':
				{
					signature: 'pushUnique(v)',
					returns: 'Number',
					description: 'Pushes the specified value in the array only if it is not already present. Returns the new array length.',
					parameters:
					{
						'v': 'The value to push.'
					}
				},
				'aggregate':
				{
					signature: 'aggregate(f, reverse)',
					returns: 'Object',
					description: 'Applies the specified function <code>f(result, item)</code> recursively on all elements of the array. The <code>result</code> is the return value of the previous call.',
					parameters:
					{
						'f': 'The aggregation function to apply.',
						'reverse': 'If true, the array is processed in reverse order. Default false.'
					}
				},
				'random':
				{
					signature: 'random()',
					returns: 'Object',
					description: 'Returns a random element of the array.',
					parameters:
					{
					}
				}
			}
		},
		'String':
		{
			title: "String",
			description: "The following DOM extensions ensure a minimum level of browser compatibility and otherwise add some common sense methods to the base Javascript objects.",
			methods:
			{
				'escape':
				{
					signature: 'escape(skip_quotes)',
					returns: 'String',
					description: 'Escapes the following characters to their html-encoded counterpart : &lt;, &gt;, &amp;, &quot;.<br />This is useful when creating html content to be included in the page.',
					parameters:
					{
						'skip_quotes': 'If true, double quotes are not escaped. Default false.'
					}
				},
				'nobbcode':
				{
					signature: 'nobbcode()',
					returns: 'String',
					description: 'Removes all tags between square brackets.<pre>"foo [bar] moo".nobbcode(); // -> "foo  moo"</pre>',
					parameters:
					{
					}
				},
				'contains':
				{
					signature: 'contains(arg)',
					returns: 'Boolean',
					description: 'Checks whether or not the specified substring is contained in this string.',
					parameters:
					{
						'arg': 'The substring to check.'
					}
				},
				'startsWith':
				{
					signature: 'startsWith(str)',
					returns: 'Boolean',
					description: 'Checks whether or not the string starts with the provided substring.',
					parameters:
					{
						'str': 'The substring to check.'
					}
				},
				'endsWith':
				{
					signature: 'endsWith()',
					returns: 'Boolean',
					description: 'Checks whether or not the string ends with the provided substring.',
					parameters:
					{
						'str': 'The substring to check.'
					}
				},
				'matches':
				{
					signature: 'matches(regex)',
					returns: 'Boolean',
					description: 'Alias of <code>RegExp.test()</code>',
					parameters:
					{
						'regex': 'String or RegExp to check.'
					}
				},
				'trim':
				{
					signature: 'trim(chars?)',
					returns: 'String',
					description: 'Trims all of the provided characters from the beginning and the end of the string. The order and occurences of those characters do not matter.',
					parameters:
					{
						'chars': 'The list of characters to remove. If omitted, all space-like characters are removed.'
					}
				}
			}
		},
		'Object':
		{
			title: "Object",
			description: "The following DOM extensions ensure a minimum level of browser compatibility and otherwise add some common sense methods to the base Javascript objects.",
			methods:
			{
				'import':
				{
					signature: 'import(o, deep)',
					returns: 'Object',
					description: 'Merges the content of the specied object into this one.',
					parameters:
					{
						'o': 'The object to import into this one.',
						'deep': 'Recursively import. Default false.'
					}
				},
				'exec':
				{
					signature: 'exec(f, args)',
					returns: 'Object',
					description: 'Applies the specified function bound to this object. This is an alias to <code>f.apply(this, args)</code>.',
					parameters:
					{
						'f': 'The function to apply',
						'args': 'The function parameters'
					}
				},
				'values':
				{
					signature: '[static] values(obj)',
					returns: 'Array',
					description: 'Returns all values of the iterable properties of the specified object.',
					parameters:
					{
						'obj': 'The object to iterate.'
					}
				},
				'keys':
				{
					signature: '[static] keys(obj)',
					returns: 'Array',
					description: 'Returns all names of the iterable properties of the specified object.',
					parameters:
					{
						'obj': 'The object to iterate'
					}
				},
				'entries':
				{
					signature: '[static] entries(obj)',
					returns: '',
					description: 'Polyfill for <code>Object.entries(obj)</code>.',
					parameters:
					{
						'obj': 'The target object'
					}
				}
			}
		},
		'Base64':
		{
			title: "Base64",
			description: "The following DOM extensions ensure a minimum level of browser compatibility and otherwise add some common sense methods to the base Javascript objects.",
			methods:
			{
				'decode':
				{
					signature: '[static] Base64.decode(i)',
					returns: 'String',
					description: 'Decodes the specified base64-encoded string.',
					parameters:
					{
						'i': 'The string to decode'
					}
				},
				'encode':
				{
					signature: '[static] Base64.decode(i)',
					returns: 'String',
					description: 'Encodes the specified string to base64.',
					parameters:
					{
						'i': 'The string to encode'
					}
				}
			}
		},
		'HTMLFormElement':
		{
			title: "HTMLFormElement",
			description: "The following DOM extensions ensure a minimum level of browser compatibility and otherwise add some common sense methods to the base Javascript objects.",
			methods:
			{
				'export':
				{
					signature: 'export()',
					returns: 'Object',
					description: 'Exports the form data in the form of a key-value pair object. Disabled fields and unchecked checkboxes and radios are not exported. Files are not supported.',
					parameters:
					{
					}
				}
			}
		},
		'HTMLElement':
		{
			title: "HTMLElement",
			description: "The following DOM extensions ensure a minimum level of browser compatibility and otherwise add some common sense methods to the base Javascript objects.",
			methods:
			{
				'remove':
				{
					signature: 'remove()',
					returns: 'HTMLElement',
					description: 'Removes this node from its parent. Returns itself.',
					parameters:
					{
					}
				},
				'clear':
				{
					signature: 'clear()',
					returns: '',
					description: 'Removes all children of this node.',
					parameters:
					{
					}
				},
				'draw':
				{
					signature: 'draw()',
					returns: '',
					description: 'Forces a style recomputation on this node. This will effectively apply any class name changes synchronousely.',
					parameters:
					{
					}
				},
				'index':
				{
					signature: 'index()',
					returns: 'Number',
					description: 'Returns the index of this node in its parent, or -1 if it has no parent.',
					parameters:
					{
					}
				},
				'elsewhere':
				{
					signature: 'elsewhere(callback, strict?)',
					returns: '',
					description: 'Listens for a click event anywhere else than on this element and calls the callback function then.',
					parameters:
					{
						'callback': 'The event listener',
						'strict': 'If true, children are not considered. Dafault false.'
					}
				},
				'insertAfter':
				{
					signature: 'insertAfter(node, reference?)',
					returns: 'Element',
					description: 'Inserts the specified child node after the referenced one.',
					parameters:
					{
						'node': 'The new child node',
						'reference': 'The reference child node. If not specified, the element is inserted at the end.'
					}
				},
				'appendSingleChild':
				{
					signature: 'appendSingleChild(child)',
					returns: 'Element',
					description: 'Alias to the original <code>HTMLElement.appendChild(child)</code>',
					parameters:
					{
						'child': 'The element to add as last child'
					}
				},
				'appendChild':
				{
					signature: 'appendChild(child)',
					returns: 'Element<br />Element[]',
					description: 'Appends the specified element or list of elements to this parent.',
					parameters:
					{
						'child': 'Element or array of elements to append.'
					}
				},
				'singleInsertBefore':
				{
					signature: 'singleInsertBefore(child, reference?)',
					returns: 'Element',
					description: 'Alias ot the original <code>HTMLElement.insertBefore(child, reference)</code>.',
					parameters:
					{
						'child': 'The new node',
						'reference': 'The reference child. If not specified, the child is added at the end.'
					}
				},
				'insertBefore':
				{
					signature: 'insertBefore(child, reference?)',
					returns: 'Element<br />Element[]',
					description: 'Inserts the specified element or list of elements before the referenced one.',
					parameters:
					{
						'child': 'Element or array of elements to insert',
						'reference': 'The reference node. If not specified, the child is added at the end.'
					}
				}
			}
		},
		'Event':
		{
			title: "Event",
			description: "The following DOM extensions ensure a minimum level of browser compatibility and otherwise add some common sense methods to the base Javascript objects.",
			methods:
			{
				'stop':
				{
					signature: 'stop()',
					returns: '',
					description: 'Stops the immediate propagation of the event and prevents the default handling.',
					parameters:
					{
					}
				},
				'stopImmediatePropagation':
				{
					signature: 'stopImmediatePropagation()',
					returns: '',
					description: 'Sets the <code>immediatePropagationStopped</code> property to <code>true</code> on this event in addition to the default method behavior.',
					parameters:
					{
					}
				},
				'stopPropagation':
				{
					signature: 'stopPropagation()',
					returns: '',
					description: 'Sets the <code>propagationStopped</code> property to <code>true</code> on this event in addition to the default method behavior.',
					parameters:
					{
					}
				}
			}
		},
		'EventTarget':
		{
			title: "EventTarget",
			description: "The following DOM extensions ensure a minimum level of browser compatibility and otherwise add some common sense methods to the base Javascript objects.",
			methods:
			{
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
		}
	}
};
bi.fire(bi, 'provide', ['jsapidoc.content']);