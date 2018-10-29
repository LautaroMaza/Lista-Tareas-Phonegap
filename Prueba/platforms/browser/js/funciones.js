function obtener_tareas(){
	var tareas = new Array();

	var tareas_str = localStorage.getItem('tareas_guardadas');
	if (tareas_str !== null){
		tareas = JSON.parse(tareas_str);
	}

	return tareas
}

function new_task(){
	
	var nueva_tarea = document.getElementById("tarea").value;
	var tareas = obtener_tareas();
	tareas.push(nueva_tarea);
	localStorage.setItem('tareas_guardadas',JSON.stringify(tareas));
	document.getElementById("tarea").value = '';
	mostrar();
}

function mostrar(){
	var tareas_div = document.getElementById("tareas");
	var tareas = obtener_tareas();
	// traer del local storage las tareas
	// recorrerlas con for}
	var html = '';
	for (i=0; i<tareas.length; i++){
		html += '' +
			'<div>' +
		    '	<span>' + tareas[i] + '</span>' +
			'	<button type="button" class="" onclick="eliminar('+i+')">Eliminar</button>'+
			'	<button type="button" class="" onclick="modificar('+i+')">Modificar</button>' +
			'</div>';
	}

	tareas_div.innerHTML = html;
}
mostrar();