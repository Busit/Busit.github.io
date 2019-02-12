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
				sample: '&lt;script type="text/javascript" src="/js/bi.js"&gt;&lt;/script&gt;'
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