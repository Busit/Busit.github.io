jsapidoc.content['Busit WebApps'] = 
{
	'1) What is a WebApp ?':
	{
		title: 'Busit WebApps',
		description: 'In the Busit platform, the administrator can deploy web applications that serve various purposes. For instance, the administrator panel itself is a WebApp.<br /><br />' +
			'This allows to apply updates very easily, or even deploy different version of the same WebApp side by side.<br />' + 
			'A WebApp is therefore a zip archive that contains all the files that need to be deployed on the platform. Each WebApp is characterized by the listed properties.',
		properties:
		{
			'name': {type: 'String', description: 'This is the friendly name of the WebApp.'},
			'path': {type: 'String', description: 'This is the unique URL root path of the WebApp. For instance, if the path is <code>my_app</code>, the full URL will be <code>https://host.net/my_app</code>'},
			'businessapp': {type: 'Boolean', description: 'This flag indicates if the WebApp can be used as a template for a BusinessApp.'}
		}
	},
	'2) WebApp Template':
	{
		title: 'WebApp Template',
		description: 'The Busit WebApp template consists of default skeleton files that are common to all WebApps. The files may contain variables (see properties below) that will be substituted to match the final WebApp (aka: not the template itself).' + 
			'<br /><br />When deploying a WebApp zip archive, the content of the WebApp Template is first copied, then only the archive is uncompressed. This means that any file present in the archive will overwrite the ones from the template. This provides a huge flexibility of implementation while keeping the effective requirements as low as possible.' + 
			'<br /><br />The deployed WebApp files may also contain some variables that will be substituted according to the <code>.metadata.json</code> configuration file.<br /><br />' +
			'The template may vary but typically contains the following files. The index.html contains this initialization snippet, so you just need to override the <code>index.js</code> file in your WebApp archive.',
		sample: ['&lt;script type="text/javascript" src="js/bi.js"&gt;&lt;/script&gt;<br />&lt;script type="text/javascript"&gt;<br />' +
			'&nbsp;&nbsp;&nbsp;&nbsp;bi.$rev = "{WEBAPP_VERSION}";<br />' +
			'&nbsp;&nbsp;&nbsp;&nbsp;bi.$root = "/{WEBAPP_PATH}";<br />' +
			'&nbsp;&nbsp;&nbsp;&nbsp;bi.onLoad(function() { bi.require(["index.js"]); });<br />' +
			'&lt;/script&gt;',
			'WebApp Template Files<br />' + 
			'&nbsp;&nbsp;|- .htaccess<br />' +
			'&nbsp;&nbsp;|- .metadata.json<br />' +
			'&nbsp;&nbsp;|- index.html<br />' +
			'&nbsp;&nbsp;|- index.js'],
		properties:
		{
			'{WEBAPP_VERSION}': {type: 'String', description: 'This variable is substituted by the publication date of the WebApp.'},
			'{WEBAPP_PATH}': {type: 'String', description: 'This variable is substituted by the URL root path of the WebApp.'},
			'{WEBAPP_TITLE}': {type: 'String', description: 'This variable is substituted by the friendly name of the WebApp.'}
		}
	},
	'3) .metadata.json':
	{
		title: 'WebApp Template substitution metadata file',
		description: 'This JSON file is part of the WebApp Template. It defines the set of custom variables that can be substituted when deploying a WebApp.<br /><br />' +
			'When deploying a zip archive of a WebApp, every file that matches the <code>fileMatch</code> property is scanned and the variables contained between curly braces <code>{VARIABLE}</code> are substituted.<br /><br />' + 
			'The variables can be fixed values, or API configuration variables themselves. If a variable notation does not match, then it is left untouched.',
		sample: ['{<br />' + 
			'&nbsp;&nbsp;&nbsp;&nbsp;"fileMatch": "(config\\\\.json|\\\\.conf)$",<br />' + 
			'&nbsp;&nbsp;&nbsp;&nbsp;"variables":<br />' + 
			'&nbsp;&nbsp;&nbsp;&nbsp;{<br />' + 
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"PUBLIC_DOMAIN": "{com.busit.domain}", // internal API config variable<br />' + 
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ANSWER": 42 // fixed value<br />' + 
			'&nbsp;&nbsp;&nbsp;&nbsp;}<br />}',
			'Welcome to {PUBLIC_DOMAIN}, the answer is {ANSWER} and the question is {UNKNOWN}.<br /><br />' +
			'Welcome to busit.com, the answer is 42 and the question is {UNKNOWN}.'
			]
	},
	'4) Entry point':
	{
		title: 'WebApp entry point',
		description: 'The <code>index.js</code> file is the default WebApp Template entry point that is loaded from the main <code>index.html</code> file. Typically, it would contain a Single Page Application.<br />' +
			'Note that the <code>bi</code> namespace is not included in the default WebApp Template, so if you want to build a Single Page Application, you should inlude those files in the WebApp archive.<br /><br />' +
			'The Busit WebApp engine allows the use of PHP 7 for server-side scripting if necessary. Hence, the entry point can be customized by providing a custom <code>.htaccess</code> file, by overriding the <code>index.html</code> file, or by using an <code>index.php</code> file instead.',
		sample: '"use strict";<br /><br />var title = document.createElement("h1");<br />title.textContent = "{WEBAPP_TITLE}";<br />document.body.appendChild(title);'
	}
};
bi.fire(bi, 'provide', ['jsapidoc.content.webapp']);