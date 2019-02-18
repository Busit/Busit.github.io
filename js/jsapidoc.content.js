jsapidoc.content = 
{
	'bi':
	{
		'core':
		{
			title: 'Object: bi',
			description: 'This is the base object required to operate the Busit Javascript API. It is created upon inclusion of the file in the DOM.<br />The <code>bi</code> object also acts as the global namespace for the entire API. The basic methods are defined directly on the root namespace described hereafter while other high level classes or functionnalities are created as packages registered as sub-properties of this object.',
			sample: '<script type="text/javascript" src="/js/bi.js"></script>',
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
					returns: 'Element[]', 
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
					returns: 'Element',
					description: 'Returns the first Element that matches the provided CSS selector. If no element matches, then <code>null</code> is returned.',
					parameters:
					{
						'search': 'A valid CSS selector String.',
						'element': 'The root HTMLElement to search against. If a String is provided, it is matched using <code>bi.first(element)</code>. If omitted, the <code>document</code> is used instead.'
					}
				},
				'last':
				{
					signature: 'last(search, element?)',
					returns: 'Element',
					description: 'Returns the last Element that matches the provided CSS selector. If no element matches, then <code>null</code> is returned.',
					parameters:
					{
						'search': 'A valid CSS selector String',
						'element': 'The root HTMLElement to search against. If a String is provided, it is matched using <code>bi.first(element)</code>. If omitted, the <code>document</code> is used instead.'
					}
				},
				'$':
				{
					signature: '$(id)',
					returns: 'Element',
					description: 'Alias of <code>document.getElementById(id)</code>.',
					parameters:
					{
						'id': 'The id of the Element to find.'
					}
				},
				'fire':
				{
					signature: 'fire(element, event, params?, async?)',
					returns: '',
					description: 'Triggers the specified event on the target element.<pre>// use fire as a function call<br />var a = [2,1,3];<br />bi.fire(a, "sort"); // -> [1,2,3]<br /><br />// use fire as an event<br />bi.fire(document.body, "click");<br /><br />// conflicting function name<br />document.body.click = function(txt) { console.log(txt); };<br />bi.fire(document.body, "click", "test"); // -> calls the click function and prints to the console<br />bi.fire(document.body, "@click", "test"); // -> dispatches the click event with event.data = "test"</pre>',
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
					returns: '',
					description: '',
					parameters:
					{
					}
				},
				'once':
				{
					signature: 'once(element, event, handler)',
					returns: '',
					description: '',
					parameters:
					{
					}
				},
				'release':
				{
					signature: 'release(element, event, handler)',
					returns: '',
					description: '',
					parameters:
					{
					}
				},
				'connect':
				{
					signature: 'connect(element, event, handler)',
					returns: '',
					description: '',
					parameters:
					{
					}
				},
				'connectOnce':
				{
					signature: 'connectOnce(element, event, handler)',
					returns: '',
					description: '',
					parameters:
					{
					}
				},
				'disconnect':
				{
					signature: 'disconnect(element, event, handler)',
					returns: '',
					description: '',
					parameters:
					{
					}
				},
				'onLoad':
				{
					signature: 'onLoad(callback)',
					returns: '',
					description: '',
					parameters:
					{
					}
				},
				'node':
				{
					signature: 'node(tag, attributes, content)',
					returns: '',
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
					returns: '',
					description: '',
					parameters:
					{
					}
				},
				'importCss':
				{
					signature: 'importCss(name)',
					returns: '',
					description: '',
					parameters:
					{
					}
				},
				'_':
				{
					signature: '_(key, ...)',
					returns: '',
					description: '',
					parameters:
					{
					}
				}
			},
			events:
			{
			}
		},
		'ajax': {title: 'Function: bi.ajax'},
		'cookie': {title: 'Object: bi.cookie'},
		'EventTarget': {title: 'Class: bi.EventTarget'},
		'env': {title: 'Object: bi.env'},
		'translate': {title: 'Object: bi.translate'},
		'rest': {title: 'Object: bi.rest'}, 
		'modal': {title: 'Object: bi.modal'},
		'gui': {title: 'Object: bi.gui'}
	},
	'html':
	{
		'dom':
		{
			title: "DOM overrides and overloads",
			description: "The following DOM extensions ensure a minimum level of browser compatibility and otherwise add some common sense methods to the base Javascript objects.",
			properties:
			{
				'EventTarget': {type: 'HTMLElement', description: 'If the EventTarget type does not exist, it is cloned from HTMLElement.'},
				'console': {type: 'Object', description: 'If the Console does not exist, an empty placeholder is created.'}
			},
			methods:
			{
				'RegExp.escape':
				{
					signature: '[static] RegExp.escape(s)',
					returns: 'String',
					description: 'Escapes the provided string such that it can be safely included in a new RegExp pattern.<pre>RegExp.escape("ab +$ cd"); // -> "ab \\+\\$ cd"</pre>',
					parameters:
					{
						's': 'The string to escape.'
					}
				},
				'RegExp.all':
				{
					signature: 'RegExp.all(txt)',
					returns: 'Array',
					description: 'Returns all matches of the <code>exec()</code> method at once.<pre>/(o+)/ig.all("foo mOoOo"); // -> [["oo"], ["OoOo"]]</pre>',
					parameters:
					{
						'txt': 'The text to match against'
					}
				},
				'Function.later':
				{
					signature: 'Function.later(t, a)',
					returns: '',
					description: 'Calls the function later using <code>requestAnimationFrame</code>.<pre>(function() { console.log("a"); }).later();<br />console.log("b");<br /> // -> "b" then "a"</pre>',
					parameters:
					{
						't': 'The <code>this</code> argument as of <code>Function.apply()</code>',
						'a': 'The <code>args</code> argument as of <code>Function.apply()</code>'
					}
				},
				'Function.delay':
				{
					signature: 'Function.delay(d, t, a)',
					returns: '',
					description: 'Delays the function call using <code>setTimeout</code>.<pre>(function() { console.log("a"); }).delay(2000);<br />// -> "a" 2 seconds later</pre>',
					parameters:
					{
						'd': 'The delay in milliseconds',
						't': 'The <code>this</code> argument as of <code>Function.apply()</code>',
						'a': 'The <code>args</code> argument as of <code>Function.apply()</code>'
					}
				},
				'Date.addSeconds':
				{
					signature: 'Date.addSeconds(n)',
					returns: 'Date',
					description: 'Adds the specified amount of time to the date.',
					parameters:
					{
						'n': 'The amount of time to add.'
					}
				},
				'Date.addMinutes':
				{
					signature: 'Date.addMinutes(n)',
					returns: 'Date',
					description: 'Adds the specified amount of time to the date.',
					parameters:
					{
						'n': 'The amount of time to add.'
					}
				},
				'Date.addHours':
				{
					signature: 'Date.addHours(n)',
					returns: 'Date',
					description: 'Adds the specified amount of time to the date.',
					parameters:
					{
						'n': 'The amount of time to add.'
					}
				},
				'Date.addDays':
				{
					signature: 'Date.addDays(n)',
					returns: 'Date',
					description: 'Adds the specified amount of time to the date.',
					parameters:
					{
						'n': 'The amount of time to add.'
					}
				},
				'Date.addMonths':
				{
					signature: 'Date.addMonths(n)',
					returns: 'Date',
					description: 'Adds the specified amount of time to the date.',
					parameters:
					{
						'n': 'The amount of time to add.'
					}
				},
				'Date.addYears':
				{
					signature: 'Date.addYears(n)',
					returns: 'Date',
					description: 'Adds the specified amount of time to the date.',
					parameters:
					{
						'n': 'The amount of time to add.'
					}
				},
				'Date.addWeeks':
				{
					signature: 'Date.addWeeks(n)',
					returns: 'Date',
					description: 'Adds the specified amount of time to the date.',
					parameters:
					{
						'n': 'The amount of time to add.'
					}
				},
				'Date.getWeek':
				{
					signature: 'Date.getWeek()',
					returns: 'Number',
					description: 'Returns the week number.',
					parameters:
					{
					}
				},
				'Array.clear':
				{
					signature: 'Array.clear()',
					returns: '',
					description: 'Clears the array.',
					parameters:
					{
					}
				},
				'Array.first':
				{
					signature: 'Array.first()',
					returns: 'Object',
					description: 'Returns the first element of the array or null if the array is empty.',
					parameters:
					{
					}
				},
				'Array.last':
				{
					signature: 'Array.last()',
					returns: 'Object',
					description: 'Returns the last element of the array of null if the array is empty.',
					parameters:
					{
					}
				},
				'Array.remove':
				{
					signature: 'Array.remove(v)',
					returns: 'Object',
					description: 'Removes the specified value from the array and return it. If the value is not found, null is returned.',
					parameters:
					{
						'v': 'The value to remove.'
					}
				},
				'Array.contains':
				{
					signature: 'Array.contains(v)',
					returns: 'Boolean',
					description: 'Returns whether or not the specified value is in the array.',
					parameters:
					{
						'v': 'The value to check.'
					}
				},
				'Array.containsAny':
				{
					signature: 'Array.containsAny(v)',
					returns: 'Boolean',
					description: 'Returns whether or not any of the specified values are contained in the array.',
					parameters:
					{
						'v': 'Array of values to check.'
					}
				},
				'Array.containsAll':
				{
					signature: 'Array.containsAll(v)',
					returns: 'Boolean',
					description: 'Returns whether or not all of the specified values are contained in the array.',
					parameters:
					{
						'v': 'Array of values to check.'
					}
				},
				'Array.pushUnique':
				{
					signature: 'Array.pushUnique(v)',
					returns: 'Number',
					description: 'Pushes the specified value in the array only if it is not already present. Returns the new array length.',
					parameters:
					{
						'v': 'The value to push.'
					}
				},
				'Array.aggregate':
				{
					signature: 'Array.aggregate(f, reverse)',
					returns: 'Object',
					description: 'Applies the specified function <code>f(result, item)</code> recursively on all elements of the array. The <code>result</code> is the return value of the previous call.',
					parameters:
					{
						'f': 'The aggregation function to apply.',
						'reverse': 'If true, the array is processed in reverse order. Default false.'
					}
				},
				'Array.random':
				{
					signature: 'Array.random()',
					returns: 'Object',
					description: 'Returns a random element of the array.',
					parameters:
					{
					}
				}
			},
			events:
			{
				'enter': {},
				'escape': {},
				'delete': {}
			}
		}
	}
};
bi.fire(bi, 'provide', ['jsapidoc.content']);