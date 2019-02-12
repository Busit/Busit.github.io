jsapidoc.content = 
[
	{
		name: 'bi',
		items:
		[
			{
				name: ' core', 
				title: 'Object: bi',
				description: 'This is the base object required to operate the Busit Javascript API.',
				sample: '&lt;script type="text/javascript" src="/js/bi.js"&gt;&lt;/script&gt;',
				properties:
				[
					{name: '$rev', type: 'string', description: 'If set, this property designates the code revision identifier. When requiring js files or css files, the revision identifier is appended as query string to manage the browser cache. If you set the revision identifier to a variable number (i.e.: <pre>new Date().getTime()</pre>) then this has the effect to prevent the browser cache.'},
					{name: '$root', type: 'string', description: 'If set, this property designates the root directory for js and css file inclusion.'}
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