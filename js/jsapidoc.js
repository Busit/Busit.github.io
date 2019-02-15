"use strict";

window.jsapidoc = bi.instance(
{
	members:
	{
		initialize: function(element)
		{
			if( !element ) element = document.body;
			element.clear();
			element.classList.add('wait');
			element.appendChild(
			[
				bi.node('header', 'Javascript API Documentation'),
				bi.node('ol', {id: 'jsapidoc_ol'}),
				bi.node('main', {id: 'jsapidoc_main'})
			]);
			
			var self = this;
			bi.require("jsapidoc.content", function()
			{
				self.generateTreeStructure();
				self.showClass('bi', 'core');
			});
		},
		generateTreeStructure: function()
		{
			var keys = Object.keys(this.content).sort(function(a, b) { return (a.toLowerCase() > b.toLowerCase() ? 1 : -1); });
			var ol = bi.$('jsapidoc_ol');
			
			var self = this;
			for( var i = 0; i < keys.length; i++ )
			{
				var items = Object.keys(this.content[keys[i]]).sort(function(a, b) { return (a.toLowerCase() > b.toLowerCase() ? 1 : -1); });
				var li = ol.appendChild(bi.node('li', 
					bi.node('span', keys[i].escape(), {click: function() { this.parentNode.classList.toggle('open'); }}),
					{id: 'package_' + keys[i]}
				));
				var ol2 = li.appendChild(bi.node('ol'));
				
				for( var j = 0; j < items.length; j++ )
				{
					ol2.appendChild(bi.node('li', bi.node('span', items[j].escape()),
					{
						id: 'class_' + keys[i] + '_' + items[j],
						click: function() { self.showClass(this.dataset.package, this.dataset.class); },
						dataPackage: keys[i],
						dataClass: items[j]
					}));
				}
			}
		},
		showClass: function(p, c)
		{
			var s = bi.first('li.selected', bi.$('jsapidoc_ol'));
			if( s ) s.classList.remove('selected');
			bi.$('package_' + p).classList.add('open');
			bi.$('class_' + p + '_' + c).classList.add('selected');
			
			var main = bi.$('jsapidoc_main');
			var item = this.content[p][c];
			main.clear();
			main.appendChild(bi.node('h1', item.title.escape()));
			
			if( item.description )
			{
				main.appendChild(bi.node('section',
				[
					bi.node('h2', 'Description'),
					bi.node('p', item.description)
				]));
			}
			
			if( item.sample )
			{
				main.appendChild(bi.node('section',
				[
					bi.node('h2', 'Sample'),
					bi.node('pre', item.sample.escape())
				]));
			}
			
			if( item.ctor )
			{
				main.appendChild(bi.node('section',
				[
					bi.node('h2', 'Constructor')
					// todo
				]));
			}
			
			if( item.properties )
			{
				var props = Object.keys(item.properties).sort(function(a, b) { return (a.toLowerCase() > b.toLowerCase() ? 1 : -1); });
				var tbody = bi.node('tbody');
				
				for( var i = 0; i < props.length; i++ )
				{
					tbody.appendChild(bi.node('tr',
					[
						bi.node('td', props[i].escape()),
						bi.node('td', item.properties[props[i]].type),
						bi.node('td', item.properties[props[i]].description)
					]));
				}
				
				main.appendChild(bi.node('section',
				[
					bi.node('h2', 'Properties'),
					bi.node('table',
					[
						bi.node('thead', bi.node('tr',
						[
							bi.node('th', "Name"),
							bi.node('th', "Type"),
							bi.node('th', "Description")
						])),
						tbody
					])
				]));
			}
			
			if( item.methods )
			{
				var methods = Object.keys(item.methods).sort(function(a, b) { return (a.toLowerCase() > b.toLowerCase() ? 1 : -1); });
				var tbody = bi.node('tbody');
				
				for( var i = 0; i < methods.length; i++ )
				{
					tbody.appendChild(bi.node('tr',
					[
						bi.node('td', item.methods[methods[i]].signature),
						bi.node('td', item.methods[methods[i]].returns),
						bi.node('td', item.methods[methods[i]].description + "<h3>Parameters</h3>")
					]));
					
					var ul = bi.node('ul');
					var params = Object.keys(item.methods[methods[i]].parameters).sort(function(a, b) { return (a.toLowerCase() > b.toLowerCase() ? 1 : -1); });
					for( var j = 0; j < params.length; j++  )
						ul.appendChild(bi.node('li', "<em>" + params[j] + "</em>: " + item.methods[methods[i]].parameters[params[j]]));
					tbody.lastChild.lastChild.appendChild(ul);
				}
				
				main.appendChild(bi.node('section',
				[
					bi.node('h2', 'Methods'),
					bi.node('table',
					[
						bi.node('thead', bi.node('tr',
						[
							bi.node('th', "Name"),
							bi.node('th', "Return Type"),
							bi.node('th', "Description")
						])),
						tbody
					])
				]));
			}
			
			if( item.events )
			{
				main.appendChild(bi.node('section',
				[
					bi.node('h2', 'Events')
					// todo
				]));
			}
		}
	}
});

bi.fire(bi, 'provide', ['jsapidoc']);