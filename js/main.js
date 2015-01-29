function createShortcutMenu()
{
	$("h2").each(function(i, e)
	{
		var a = document.createElement('A');
		a.href = '#' + e.parentElement.name;
		a.innerHTML = e.innerHTML;
		$('#quick').append(a);
	});
}