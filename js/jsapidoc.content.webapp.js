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
			'"use strict";<br />bi.require(["bi.webapp", "bi.view"], function()<br />{<br />' +
			'&nbsp;&nbsp;&nbsp;&nbsp;bi.views.import(...); // see Single Page Application<br /><br />' +
			'&nbsp;&nbsp;&nbsp;&nbsp;bi.webapp.initialize();' +
			'<br />}'],
		properties:
		{
			'{WEBAPP_VERSION}': {type: 'String', description: 'This variable is substituted by the publication date of the WebApp.'},
			'{WEBAPP_PATH}': {type: 'String', description: 'This variable is substituted by the URL root path of the WebApp.'},
			'{WEBAPP_TITLE}': {type: 'String', description: 'This variable is substituted by the friendly name of the WebApp.'}
		}
	},
	'.metadata.json':
	{
		title: 'WebApp Template substitution metadata file',
		description: 'This JSON file is part of the WebApp Template. It defines the set of custom variables that can be substituted when deploying a WebApp.<br /><br />' +
			'When deploying a zip archive of a WebApp, every file that matches the "fileMatch" property is scanned and the variables contained between curly braces {VARIABLE} are substituted.<br /><br />' + 
			'The variables can be fixed values, or API configuration variables themselves. If a variable notation does not match, then it is left untouched.',
		sample: ['{<br />' + 
			'&nbsp;&nbsp;&nbsp;&nbsp;"fileMatch": "(config\\.json|\\.conf)$",<br />' + 
			'&nbsp;&nbsp;&nbsp;&nbsp;"variables":<br />' + 
			'&nbsp;&nbsp;&nbsp;&nbsp;{<br />' + 
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"PUBLIC_DOMAIN": "{com.busit.domain}", // internal API config variable<br />' + 
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ANSWER": 42 // fixed value<br />' + 
			'&nbsp;&nbsp;&nbsp;&nbsp;}<br />}',
			'Welcome to {PUBLIC_DOMAIN}, the answer is {ANSWER} and the question is {UNKNOWN}.<br /><br />' +
			'Welcome to busit.com, the answer is 42 and the question is {UNKNOWN}.<br /><br />'
			]
	}
};
bi.fire(bi, 'provide', ['jsapidoc.content.webapp']);