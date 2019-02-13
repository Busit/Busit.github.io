jsapidoc.content = 
[
	{
		name: 'bi',
		items:
		[
			{
				name: 'core', 
				title: 'Object: bi',
				description: 'This is the base object required to operate the Busit Javascript API. It is created upon inclusion of the file in the DOM.<br />The <code>bi</code> objects also acts as the global namespace for the entire API. The basic methods are defined directly on the root namespace described hereafter while other high level classes or functionnalities are created as packages registered as sub-properties of this object.',
				sample: '<script type="text/javascript" src="/js/bi.js"></script>',
				properties:
				[
					{name: '$rev', type: 'string', description: 'If set, this property designates the code revision identifier.<br />When requiring js files or css files, the revision identifier is appended as query string to manage the browser cache.<br />If you set the revision identifier to a variable number then this has the effect to prevent the browser cache.<pre>bi.$rev = "v1.0.42-beta"; // fixed version<br />bi.$rev = new Date().getTime(); // always different to disable the browser cache</pre>'},
					{name: '$root', type: 'string', description: 'If set, this property designates the root directory for js and css file inclusion. It should not include a trailing slash.<pre>bi.$root = "/web/app/project";</pre>'}
				],
				methods:
				[
				],
				events:
				[
				]
			},
			{name: 'ajax', title: 'Function: bi.ajax'},
			{name: 'cookie', title: 'Object: bi.cookie'},
			{name: 'EventTarget', title: 'Class: bi.EventTarget'}
		]
	},
	{
		name: 'html',
		items:
		[
			{name: 'dom'}
		]
	}
];
bi.fire(bi, 'provide', ['jsapidoc.content']);