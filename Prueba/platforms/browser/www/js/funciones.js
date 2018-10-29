function obtener_registros(){
	var todo = new Array();
	var todo_str = localStorage.getItem('tareas');
	if (todo_str !== null){
		todo = JSON.parse(todo_str);
	}
	return todo
}

function generar_id(vari){
	if (vari === null) {
		id = 0;
		return id
	}else{
		for (var i = 0; i <= vari.length; i++) {
			if (i === vari.length) {
				id = i+1;
				return id
			}
		}
	}
}

function borrar_memoria(){
	localStorage.removeItem('tareas');
	mostrar_todo();
}

function nueva_tarea(){
var nom_tarea = document.getElementById("tarea").value;
var lista_tareas = obtener_registros();
if (document.getElementById("tarea").value !== '') {
var nueva_tarea = {
	nombre: nom_tarea,
	id: generar_id(lista_tareas),
	tach: "no",
	sup: "no"
	};
lista_tareas.push(nueva_tarea);
localStorage.setItem("tareas",JSON.stringify(lista_tareas));
document.getElementById("tarea").value = '';
mostrar_todo();
}else{
	alert("Debes ingresar el nombre");
}


}

function elim_tarea(id){
	var errores = document.getElementById("error");
	var lista_tareas = obtener_registros();
	var html = '';
	for (i=1; i<=lista_tareas.length; i++){
		var aux = lista_tareas[i-1];
		var num = parseInt(id);
		var num2 = parseInt(aux.id);
		if (num === i && i === num2 ) {
			aux.sup = "si";
			localStorage.setItem('tareas',JSON.stringify(lista_tareas));
			mostrar_todo();
		}
	}
}

function mod_tarea(id){
	var lista_tareas = obtener_registros();
	var html = '';
	for (i=1; i<=lista_tareas.length; i++){
		var aux = lista_tareas[i-1];
		var num = parseInt(id);
		var num2 = parseInt(aux.id);
		if (num === i && i === num2 ) {
 			document.getElementById("btn_new").setAttribute('style', 'display:none;');
 			document.getElementById("tarea").setAttribute('style', 'display:none;');
 			document.getElementById("tit_tarea").setAttribute('style', 'display:none;');
 			document.getElementById("btn_mod").removeAttribute('style');
 			document.getElementById("modi").removeAttribute('style');
 			document.getElementById("modi").value = aux.nombre;
 			var num_env = i - 1;
 			document.getElementById("btn_mod").setAttribute('onclick', 'guardar('+id+','+num_env+')');
		}
	}
}
function guardar(id, num){
	mod_tarea = document.getElementById("modi").value;
	lista_tareas = obtener_registros();
	if (document.getElementById("modi").value !== '') {
		var aux = lista_tareas[num];
		aux.nombre = mod_tarea;
		localStorage.setItem('tareas',JSON.stringify(lista_tareas));
		document.getElementById("modi").value = '';
 		document.getElementById("btn_mod").setAttribute('style', 'display:none;');
 		document.getElementById("modi").setAttribute('style', 'display:none;');
		document.getElementById("btn_new").removeAttribute('style');
 		document.getElementById("tarea").removeAttribute('style');
 		document.getElementById("tit_tarea").removeAttribute('style');
 	
	}else{
			alert("Debes ingresar el nombre");
	}
	location.reload();
	mostrar_todo();
}

function destach_tarea(id){
	var errores = document.getElementById("error");
	var lista_tareas = obtener_registros();
	var html = '';
	for (i=1; i<=lista_tareas.length; i++){
		var aux = lista_tareas[i-1];
		var num = parseInt(id);
		var num2 = parseInt(aux.id);
		if (num === i && i === num2 ) {
			aux.tach = "no";
			localStorage.setItem('tareas',JSON.stringify(lista_tareas));
			mostrar_todo();
		}
	}
	
}


function tach_tarea(id){
	var errores = document.getElementById("error");
	var lista_tareas = obtener_registros();
	var html = '';
	for (i=1; i<=lista_tareas.length; i++){
		var aux = lista_tareas[i-1];
		var num = parseInt(id);
		var num2 = parseInt(aux.id);
		if (num === i && i === num2 ) {
			aux.tach = "si";
			localStorage.setItem('tareas',JSON.stringify(lista_tareas));
			mostrar_todo();
		}
	}
	
}
function mostrar_todo(){
	var tareas_div = document.getElementById("lista");
	var lista_tareas = obtener_registros();
	var cnt = 0;
	var html = '';

			html += ''+
			'<div>' +
			'<table border>'+
			'<tr><td><center>Nombre</center></td><td colspan="3"><center>Opciones</center></td></tr>';

	for (i=1; i<=lista_tareas.length; i++){
		var aux = lista_tareas[i-1];
		if(aux.sup === "si"){
		}else{
			if (aux.tach === "si" ) {
			html += '' +
			'<tr>'+
			'<td><strike><center>' + aux.nombre + '</center></strike></td>'+
			'<td><button type="button" class="special" class="" onclick="elim_tarea('+aux.id+')">Eliminar</button></td>'+
			'<td><button type="button" class="special" class="" onclick="mod_tarea('+aux.id+')">Modificar</button></td>'+
			'<td><button type="button" class="special" class="" onclick="destach_tarea('+aux.id+')">Destachado</button></td></tr>';

			}else{
			html += '' +
			'<tr>'+
			'<td><center>' + aux.nombre + '</center></td>'+
			'<td><button type="button" class="special" class="" onclick="elim_tarea('+aux.id+')">Eliminar</button></td>'+
			'<td><button type="button" class="special" class="" onclick="mod_tarea('+aux.id+')">Modificar</button></td>'+
			'<td><button type="button" class="special" class="" onclick="tach_tarea('+aux.id+')">Tachado</button></td></tr>';}}
	}
	html +=''+
			'</table>'+
			'</div>';
	tareas_div.innerHTML = html;
}
mostrar_todo();