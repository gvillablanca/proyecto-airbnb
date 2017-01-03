$(document).ready(function(){
	var llegadaVal = $('#llegada').pickadate({
	    selectMonths: true,// Creates a dropdown to control month
	    min: true, // permite seleccionar solo desde el dia de hoy
	    selectYears: 15,// Creates a dropdown of 15 years to control year
	    closeOnSelect: true
  		});

    var llegada = llegadaVal.pickadate('picker');

	var salidaVal =$('#salida').pickadate({
	    selectMonths: true,// Creates a dropdown to control month
	    selectYears: 15, // Creates a dropdown of 15 years to control year
  		});

    var salida = salidaVal.pickadate('picker');
    

	if  (llegada.get('value')){
	  salida.set('min', llegada.get('select'));
	  
	}
	if (salida.get('value')){
	  llegada.set('max', salida.get('select'));
	}


	llegada.on('set', function(event) {
	  if ( event.select ) {
	    salida.set('min',llegada.get('select'));
	  }
	});
	salida.on('set', function(event) {
	  if ( event.select ) {
	    llegada.set('max', salida.get('select'));
	  }
	});
});

$(document).ready(function(){

	var llegadaValDos = $('#llegada-dos');
	var salidaValDos =$('#salida_dos');

	llegadaValDos.pickadate({
	    selectMonths: true,// Creates a dropdown to control month
	    min: true, // permite seleccionar solo desde el dia de hoy
	    selectYears: 15,// Creates a dropdown of 15 years to control year
	    closeOnSelect: true
  		});

    var llegadaDos = llegadaValDos.pickadate('picker'); 

	salidaValDos.pickadate({
	    selectMonths: true,// Creates a dropdown to control month
	    min: true, // permite seleccionar solo desde el dia de hoy
	    selectYears: 15, // Creates a dropdown of 15 years to control year
	    closeOnSelect: true
  		});

    var salidaDos = salidaValDos.pickadate('picker');


    if  (llegadaDos.get('value')){
	  salidaDos.set('min', llegadaDos.get('select'));
	  
	}
	if (salidaDos.get('value')){
	  llegadaDos.set('max', salidaDos.get('select'));
	}


	llegadaDos.on('set', function(event) {
	  if ( event.select ) {
	    salidaDos.set('min',llegadaDos.get('select'));
	  }
	});

	salidaDos.on('set', function(event) {
	  if ( event.select ) {
	    llegadaDos.set('max', salidaDos.get('select'));
	  }
	});

});
$(document).ready(function(){
	$('#aceptar').click(function(){
		  var calle = $('#first_name').val();
		  var desde = $('#llegada').val();
		  var hasta = $('#salida').val();

		if( calle === null || calle.length === 0){
			var $toastContent = $('<span> Ingresa direccion</span>');
			Materialize.toast($toastContent, 2000);
			return false;
		}else if ( desde === null || desde.length === 0){
			var $toastContent = $('<span>  Ingresa fecha </span>');
			Materialize.toast($toastContent, 2000);
			return false;
		}else if ( hasta === null || hasta.length === 0){
			var $toastContent = $('<span>Ingresa fecha </span>');
			Materialize.toast($toastContent, 2000);
			return false;
		}
		guardarStorageUsuario(calle, desde, hasta);
		location.reload();
		return true;
    });
});
function guardarStorageUsuario(a, b, c){
    var calle = a;
    var desde = b;
    var hasta = c;
	localStorage.setItem('calleSAve', calle);
	localStorage.setItem('desdeSAve',desde);
	localStorage.setItem('hastaSave', hasta);
}
