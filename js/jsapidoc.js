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
				self.showClass(0, 0);
			});
		},
		generateTreeStructure: function()
		{
			this.content.sort(function(a, b) { return (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1); });
			var ol = bi.$('jsapidoc_ol');
			
			var self = this;
			for( var i = 0; i < this.content.length; i++ )
			{
				this.content[i].items.sort(function(a, b) { return (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1); });
				var li = ol.appendChild(bi.node('li', 
					bi.node('span', this.content[i].name.escape(), {click: function() { this.parentNode.classList.toggle('open'); }}),
					{id: 'package_' + i}
				));
				var ol2 = li.appendChild(bi.node('ol'));
				
				for( var j = 0; j < this.content[i].items.length; j++ )
				{
					ol2.appendChild(bi.node('li', bi.node('span', this.content[i].items[j].name.escape()),
					{
						id: 'class_' + i + '_' + j,
						click: function() { self.showClass(this.dataset.package, this.dataset.class); },
						dataPackage: i,
						dataClass: j
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
			var item = this.content[p].items[c];
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
				item.properties.sort(function(a, b) { return (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1); });
				
				var tbody = bi.node('tbody');
				
				for( var i = 0; i < item.length; i++ )
				{
					tbody.appendChild(bi.node('tr',
					[
						bi.node('td', item[i].name, {click: function() { this.parentNode.classList.toggle('open'); }}),
						bi.node('td', item[i].type),
						bi.node('td', item[i].description)
					]));
				}
				
				main.appendChild(bi.node('section',
				[
					bi.node('h2', 'Properties'),
					bi.node('table',
					[
						bi.node('thead', bi.node('tr',
						[
							bi.node('th', "Property"),
							bi.node('th', "Type"),
							bi.node('th', "Description")
						])),
						tbody
					])
				]));
			}
			
			if( item.methods )
			{
				main.appendChild(bi.node('section',
				[
					bi.node('h2', 'Methods')
					// todo
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