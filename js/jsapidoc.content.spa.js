jsapidoc.content['Single Page Application'] = 
{
	'bi.webapp':
	{
		title: 'bi.webapp',
		description: 'This object is the main entry point for a single page web application. It offers a simple framework for natural browsing using url fragments.<br /><br />' +
			'The views should be registered in <code>bi.views</code>. A default view should also be registered as <code>bi.views.default</code> in order to catch any missing (aka 404) view.<br /><br />' +
			'The matching of the view is based on the key registered in <code>bi.views</code> including the "#" symbol but excluding any "/" and after.<br />Example: the URL <code>https://...#abc.def/123</code> will use the view <code>bi.views["#abc.def"]</code> regardless of the trailing "/123". Meanwhile, the complete URL fragment including the "/" parts can then be retrieved using <code>bi.webapp.currentHash</code> or the native <code>location.hash</code> property.',
		sample: 'bi.require(["bi.webapp", "bi.view"], function()<br />{<br />&nbsp;&nbsp;&nbsp;&nbsp;bi.views.import(<br />&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;default: bi.instance(' +
			'<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;parent: bi.view,<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;members:<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;show: function(previous) { this.dom = bi.webapp.container.appendChild(bi.node("a", {href: "#page1"}, "Go to page 1")); },<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hide: function(next) { this.dom.remove(); }<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}' +
			'<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}),<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"#page1": bi.instance(' + 
			'<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;parent: bi.view,<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;members:<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;show: function(previous) { this.dom = bi.webapp.container.appendChild(bi.node("a", {href: "#"}, "Go to homepage")); },<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hide: function(next) { this.dom.remove(); }<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}' +
			'<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br />&nbsp;&nbsp;&nbsp;&nbsp;});<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;bi.webapp.initialize();<br />});',
		properties:
		{
			'bi.panels': {type: 'Object', description: 'This object is the container for all the <code>bi.panel</code> of a web application'},
			'bi.views': {type: 'Object', description: 'This object is the container for all the <code>bi.view</code> of a web application'},
			'bi.webapp.container': {type: 'HTMLElement', description: 'This the main container in which the views should attach their dom. Default to <code>document.body</code>'},
			'bi.webapp.current': {type: 'bi.view', description: 'This the current view'},
			'bi.webapp.data': {type: 'Object', description: 'This a container to eventually pass or store temporary data between different views'},
			'bi.webapp.currentHash': {type: 'String', description: 'This the current URL fragment. Default "#"'},
			'bi.webapp.previousHash': {type: 'String', description: 'This the previous URL fragment. Default null'}
		},
		methods:
		{
			'initialize':
			{
				signature: '[static] initialize(container?)',
				returns: '',
				description: 'Initializes the Single Page Application browsing system by listening at the "hashchange" event of the browser. The matching view is loaded immediately unless there is no URL fragment defined yet; in which case the default view "#" is loaded instead',
				parameters:
				{
					'container': 'Optional default container for the views. If an HTMLElement is provided, it is used directly. If a string is provided, the matching element id is used'
				}
			},
			'route':
			{
				signature: '[static] route(next, previous?)',
				returns: '',
				description: 'Navigates to the next view and calls itd <code>show()</code> method.',
				parameters:
				{
					'next': 'The String URL fragment to navigate to, including the leading "#". If a matching view cannot be found in <code>bi.views</code> then <code>bi.views.default</code> is used',
					'previous': 'The String URL fragment if the previous view. If not specified, the <code>bi.webapp.currentHash</code> is used'
				}
			}
		}
	},
	'bi.view':
	{
		title: 'bi.view',
		description: 'This class represents a view (or one page) of a web application. See <code>bi.webapp</code> for more details on how to use it.',
		sample: 'bi.views["#my_view"] = bi.instance(<br />{<br />&nbsp;&nbsp;&nbsp;&nbsp;parent: bi.view,<br />&nbsp;&nbsp;&nbsp;&nbsp;members:<br />&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;show: function(previous)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.dom = bi.webapp.container.appendChild(bi.node("div", "Hello World!"));<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hide: function(next)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.dom.remove();<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />&nbsp;&nbsp;&nbsp;&nbsp;}<br />});',
		properties:
		{
			'dom': {type: 'HTMLElement', description: 'The main dom element that holds the view content. Null by default, it should ideally be set in the <code>show()</code> method.'},
			'panel': {type: 'bi.panel', description: 'Reference to the <code>bi.panel</code> that is currently being displayed. Null by default, it should ideally be set when showing a panel.'}
		},
		methods:
		{
			'show':
			{
				signature: 'show(previous)',
				returns: '',
				description: 'Abstract method that should show the current view. The content of the view should typically be added to the <code>bi.webapp.container</code>',
				parameters:
				{
					'previous': 'The previous URL fragment that was shown before the current one'
				}
			},
			'hide':
			{
				signature: 'hide(next)',
				returns: '',
				description: 'Abstract method that should hide the current view. Typically calle <code>this.dom.remove()</code> and also call <code>detachPanel()</code> to cleanup resources',
				parameters:
				{
					'next': 'The next URL fragment to be shown after the current one'
				}
			},
			'attachPanel':
			{
				signature: 'attachPanel(panel, data?)',
				returns: 'bi.panel',
				description: 'Attaches and returns the provided <code>bi.panel</code> to the current view. Detaches the previous panel if necessary. Then calls the <code>show()</code> method on the panel',
				parameters:
				{
					'panel': 'An instance of <code>bi.panel</code> to show, or a string index to lookup in the <code>bi.panels</code> registry',
					'data': 'The optional data to be provided to the panel'
				}
			},
			'detachPanel':
			{
				signature: 'detachPanel()',
				returns: '',
				description: 'Removes the current <code>bi.panel</code> by calling its <code>hide()</code> method',
				parameters:
				{
				}
			},
			'beforeunload':
			{
				signature: 'beforeunload()',
				returns: 'String',
				description: 'Abstract method that should return a String to prompt the user before navigating away from the view. If the return value is not null, a <code>bi.modal.confirm</code> is shown with the option to stay on the current view or leave to the next',
				parameters:
				{
				}
			}
		}
	},
	'bi.panel':
	{
		title: 'bi.panel',
		description: 'This object represents an overlay section of a <code>bi.view</code> as part of a web application. See <code>bi.webapp</code> for more details on how to use it.',
		sample: 'bi.panels["my_panel"] = bi.instance(<br />{<br />&nbsp;&nbsp;&nbsp;&nbsp;parent: bi.panel,<br />&nbsp;&nbsp;&nbsp;&nbsp;members:<br />&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;show: function(view, data)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.dom = view.dom.appendChild(bi.node("div", data));<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hide: function()<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.dom.remove();<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />&nbsp;&nbsp;&nbsp;&nbsp;}<br />});',
		properties:
		{
			'dom': {type: 'HTMLElement', description: 'The main dom element that holds the panel content. Null by default, it should ideally be set in the <code>show()</code> method.'},
			'view': {type: 'bi.view', description: 'Reference to the <code>bi.view</code> that holds this panel. Null by default, it should ideally be set in the <code>show()</code> method.'}
		},
		methods:
		{
			'show':
			{
				signature: 'show(view?, data?)',
				returns: '',
				description: 'Abstract method that should show the panel for the given view. Typically although not required the panel should be displayed using <code>view.dom.appendChild(this.dom);</code>.',
				parameters:
				{
					'view': 'The linked parent <code>bi.view</code>. It may be null if the panel is to be displayed independently of any view',
					'data': 'The optional additional data required by the panel'
				}
			},
			'hide':
			{
				signature: 'hide()',
				returns: '',
				description: 'Abstract method that should hide the panel',
				parameters:
				{
				}
			}
		}
	}
};
bi.fire(bi, 'provide', ['jsapidoc.content.spa']);