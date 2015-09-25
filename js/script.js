$(function()
{
	var preguntas = [];	
	var puntaje = 0;
	var errores=0;
	var tiempo = 0; //Para saber si el tiempo se ha inicializado...
	var cuentaTiempo = 30;
	var cargarJson = function()		
	{
		var txtOpciones = "";
		$.getJSON( "js/preguntas.json", function(data)
		{
			preguntas = data;					
			cargarPregunta(Math.floor(Math.random()*preguntas.length));
		});
	}();

	var cargarPregunta = function(numPregunta)
	{ 		
		clearInterval(tiempo);			
		cuentaTiempo = 30;
		tiempo = setInterval(function(){
		cuentaTiempo--;
			$("#tiempo").html("Tiempo: " + cuentaTiempo);
			if(cuentaTiempo <= 0)
			{			
				clearInterval(cuentaTiempo);
				swal("Perdiste", "El tiempo se ha terminado", "error");		
				$("#ecuacion").delay(2000).fadeOut('slow', function() {
					clearInterval(tiempo);	
					location.reload();
				});							
			}
		}, 1000);	
		if(preguntas[numPregunta].salio !== "si")
		{	
			$("#pregunta").html(preguntas[numPregunta].pregunta);
			console.log(preguntas[numPregunta].salio);									
			//Para cargar las opciones de respuesta...
			for(var i = 1; i <= preguntas[numPregunta].opciones.length; i++)
			{
				$("#opcion_" + i).html(preguntas[numPregunta].opciones[i - 1])
					.click(function(event) {
					var ind = Number(this.id.split("_")[1]);	
					validarRespuesta(preguntas[numPregunta].correcta,ind,numPregunta);					
				});
			}
		}
		else
		{
			if(puntaje > 30) {
				 swal("Ganaste", "Tu puntaje es: "+puntaje, "succes")
			}
			else
			{
				cargarPregunta(Math.floor(Math.random()*preguntas.length))
			}			
		}
	};

	var validarRespuesta = function(respuesta, opcion, numPregunta)
	{				
		if (opcion === respuesta) 
		{
			swal("Correcto", "la respuesta es correcta", "success");							
			puntaje++;			
			$("#puntaje").html("Puntaje: 0"+puntaje);
			clearInterval(tiempo);		
			cuentaTiempo = 30;
			cargarPregunta(Math.floor(Math.random()*preguntas.length));
			preguntas[numPregunta].salio = "si";						
		}
		else 
		{
			/*  //Poner O quitar un / antes del * EJ: //* o /*
			clearInterval(tiempo);		
			cuentaTiempo = 30;	
			swal("Incorrecto", "la respuesta no es correcta", "error");
			cargarPregunta(Math.floor(Math.random()*preguntas.length));
			preguntas[numPregunta].salio = "si";
			/*/
			if (errores === 4) 
			{								
				swal("Perdiste", "3 errores en esta partida Puntaje Final: "+puntaje, "error");		
				$("#ecuacion").delay(3000).fadeOut('slow', function() {					
					clearInterval(tiempo);	
					location.reload();
				});			
			}
			else
			{
				clearInterval(tiempo);		
				cuentaTiempo = 30;	
				swal("Incorrecto", "la respuesta no es correcta", "error");
				cargarPregunta(Math.floor(Math.random()*preguntas.length));
				preguntas[numPregunta].salio = "si";	
				errores++;
				console.log(errores);
			} // */
		}
	};
});
