"use strict";

window.jsapidoc = bi.instance(
{
	methods:
	{
		initialize: function(element)
		{
			if( !element ) element = document.body;
			element.clear();
			element.classList.add('wait');
			element.appendChild(
			[
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
			this.content.sort(function(a, b) { return (a.name > b.name ? 1 : -1); });
			var ol = bi.$('jsapidoc_ol');
			
			var self = this;
			for( var i = 0; i < this.content.length; i++ )
			{
				this.content[i].items.sort(function(a, b) { return (a.name > b.name ? 1 : -1); });
				var li = ol.appendChild(bi.node('li', this.content[i].name.escape(), {click: function() { this.classList.toggle('open'); }}));
				var ol2 = li.appendChild(bi.node('ol'));
				
				for( var j = 0; j < this.content[i].items.length; j++ )
				{
					ol2.appendChild(bi.node('li', this.content[i].items[j].name,
					{
						click: function() { self.showClass(this.dataset.package, this.dataset.class); }
						dataPackage: i,
						dataClass: j
					}));
				}
			}
		},
		showClass: function(name)
		{
		}
	}
});

bi.fire(bi, 'provide', ['jsapidoc']);