function createShortcutMenu()
{
	var quick = document.createElement("DIV");
	quick.id = "quick";
	document.body.appendChild(quick);
	
	$("h2").each(function(i, e)
	{
		var a = document.createElement('A');
		a.href = '#' + e.parentElement.name;
		a.innerHTML = e.innerHTML;
		quick.appendChild(a);
	});
}