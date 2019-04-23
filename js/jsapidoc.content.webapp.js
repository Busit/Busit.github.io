jsapidoc.content['Busit WebApps'] = 
{
	'template':
	{
		title: 'WebApp Template',
		description: 'The Busit WebApp template consists of default skeleton files that are common to all WebApps. The files may contain variables (see properties below) that will be substituted to match the final WebApp (aka: not the template itself).<br /><br />' +
			'The template may vary but typically contains the following initialization script. So you just need to provide an <strong>index.js</strong> file at the root path of the WebApp. The index.js file would typically contain a Single Page Application.',
		sample: ['&lt;script type="text/javascript" src="js/bi.js"&gt;&lt;/script&gt;<br />&lt;script type="text/javascript"&gt;<br />' +
			'&nbsp;&nbsp;&nbsp;&nbsp;bi.$rev = "{WEBAPP_VERSION}";<br />' +
			'&nbsp;&nbsp;&nbsp;&nbsp;bi.$root = "/{WEBAPP_PATH}";<br />' +
			'&nbsp;&nbsp;&nbsp;&nbsp;bi.onLoad(function() { bi.require(["index.js"]); });<br />' +
			'&lt;/script&gt;',
			'"use strict";<br />bi.require(["bi.webapp", "bi.view"], function()<br />{' +
			'&nbsp;&nbsp;&nbsp;&nbsp;bi.views.import(...); // see Single Page Application<br /><br />' +
			'&nbsp;&nbsp;&nbsp;&nbsp;bi.webapp.initialize();' +
			'<br />}'],
		properties:
		{
			'{WEBAPP_VERSION}': {type: 'String', description: 'This variable is substituted by the publication date of the WebApp.'},
			'{WEBAPP_PATH}': {type: 'String', description: 'This variable is substituted by the URL root path of the WebApp.'},
			'{WEBAPP_TITLE}': {type: 'String', description: 'This variable is substituted by the friendly name of the WebApp.'}
		},
		methods:
		{
		}
	}
};
bi.fire(bi, 'provide', ['jsapidoc.content.spa']);