jsapidoc.content = 
{
	'bi':
	{
		'core':
		{
			title: 'Object: bi',
			description: 'This is the base object required to operate the Busit Javascript API. It is created upon inclusion of the file in the DOM.<br />The <code>bi</code> objects also acts as the global namespace for the entire API. The basic methods are defined directly on the root namespace described hereafter while other high level classes or functionnalities are created as packages registered as sub-properties of this object.',
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
					description: 'Triggers the specified event on the target element.<pre>// use fire as a function call<br />var a = [2,1,3];<br />bi.fire(a, "sort"); // -> [1,2,3]<br /><br />// use fire as an event<br />bi.fire(document.body, "click");</pre>',
					parameters:
					{
						'element': 'The target element. If a String is passed as argument, the element is resolved using <code>bi.all(element)</code>. If an Array is passed as argument, then the event is dispatched on all provided elements.',
						'event': 'The name of the event. If the event starts with <code>"on"</code> and a matching function exists on the element, that function is called. If the element is an <code>EventTarget</code>, then the event is dispatched on that element. If the element is an <code>EventTarget</code> and also contains a function with a matching name, the function is called in priority, except if the event name is prefixed with the <code>"@"</code> symbol.',
						'params': 'The parameters of the event. If the event resolves as a function, those are the function parameters. Otherwise the properties will be set in the <code>data</code> variable of the event.',
						'async': 'If true, the <code>fire</code> function is processed in a later point in time, allowing the screen to eventually refresh. Default is false.'
					}
				},
				'on':
				{
					signature: '',
					returns: '',
					description: '',
					parameters:
					{
					}
				},
				'once':
				{
					signature: '',
					returns: '',
					description: '',
					parameters:
					{
					}
				},
				'release':
				{
					signature: '',
					returns: '',
					description: '',
					parameters:
					{
					}
				},
				'connect':
				{
					signature: '',
					returns: '',
					description: '',
					parameters:
					{
					}
				},
				'connectOnce':
				{
					signature: '',
					returns: '',
					description: '',
					parameters:
					{
					}
				},
				'disconnect':
				{
					signature: '',
					returns: '',
					description: '',
					parameters:
					{
					}
				},
				'onLoad':
				{
					signature: '',
					returns: '',
					description: '',
					parameters:
					{
					}
				},
				'node':
				{
					signature: '',
					returns: '',
					description: '',
					parameters:
					{
					}
				},
				'provide':
				{
					signature: '',
					returns: '',
					description: '',
					parameters:
					{
					}
				},
				'require':
				{
					signature: '',
					returns: '',
					description: '',
					parameters:
					{
					}
				},
				'define':
				{
					signature: '',
					returns: '',
					description: '',
					parameters:
					{
					}
				},
				'instance':
				{
					signature: '',
					returns: '',
					description: '',
					parameters:
					{
					}
				},
				'importCss':
				{
					signature: '',
					returns: '',
					description: '',
					parameters:
					{
					}
				},
				'_':
				{
					signature: '',
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
		'dom': {}
	}
};
bi.fire(bi, 'provide', ['jsapidoc.content']);