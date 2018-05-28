<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-card dark color="primary">
                <v-card-text class="px-0">
                    Reglamento Nuestra Polla Rusia 2018
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs3>
            <v-card color="secondary">
                <v-card-text class="px-0">
                    <v-btn :color="b1 ? 'error' : 'info'" @click="cambiacontenido(tx_intro, 'b1')" block small>Generalidades</v-btn>
                    <v-btn :color="b2 ? 'error' : 'info'" @click="cambiacontenido(tx_3, 'b2')" block small>Inscripción</v-btn>
                    <v-btn :color="b3 ? 'error' : 'info'" @click="cambiacontenido(tx_2, 'b3')" block small>Fases y fechas</v-btn>
                    <v-btn :color="b4 ? 'error' : 'info'" @click="cambiacontenido(tx_4, 'b4')" block small>Pronósticos</v-btn>
                    <v-btn :color="b5 ? 'error' : 'info'" @click="cambiacontenido(tx_5, 'b5')" block small>Menús</v-btn>
                    <v-btn :color="b6 ? 'error' : 'info'" @click="cambiacontenido(tx_6, 'b6')" block small>Costo</v-btn>
                    <v-btn :color="b7 ? 'error' : 'info'" @click="cambiacontenido(tx_7, 'b7')" block small>Puntajes</v-btn>
                    <v-btn :color="b8 ? 'error' : 'info'" @click="cambiacontenido(tx_8, 'b8')" block small>Premiación</v-btn>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs8>
            <v-card dark color="grey lighten-5">
                <v-card-text class="px-0">
                    <div class="np_reglamento" v-html="textoactivo"></div>
                     
                </v-card-text>
            </v-card>
            <b-table :data="data" :columns="columns"></b-table>
        </v-flex>
        <v-flex xs12>
            <v-card dark color="primary">
                <v-card-text class="px-0">No es tu polla. No es mi polla. Es Nuestra Polla</v-card-text>
            </v-card>
        </v-flex>

    </v-layout>

</template>
<script>
//import {  mapGetters} from 'vuex'

export default {
  name: "Ricolamento",
  
  data: function() {
    return {
        b1: true,
        b2: false,
        b3: false,
        b4: false,
        b5: false,
        b6: false,
        b7: false,
        textoactivo: null,
        tx_intro: "<p>¿Por qué muchos nos vemos tentados a participar en una polla del mundial de fútbol? Por muchas razones. Una de las más válidas es porque le da más sabor al mundial. Hemos comprobado que a personas que no gustan del fútbol y a quienes el mundial les parece exagerado, inscribirse en <b>Nuestra Polla</b> les cambia la percepción del evento. Inscribirse en <b>Nuestra Polla</b> es despertar los sentidos, es echarle ají a una empanada para potenciar el trabajo de las papilas gustativas. Participar en <b>Nuestra Polla</b> es emocionante, es garantizar la emoción del mundial.</p><p><b>Nuestra Polla</b> no está abierta a todo aquel que quiera participar; se accede por invitación de uno de los polleros amigos, quienes hacen viable el proceso. Los polleros amigos se encargan de dar a conocer <b>Nuestra Polla</b>, avalar a quienes se registran para participar, recoger el dinero de la inscripción, apoyar a su grupo de polleros en cualquier duda que surja y establecer contacto con el pollero mayor, quien se encarga de la administración de la <b>Nuestra Polla</b> y de la página web que la soporta.</p><p>A diferencia de los mundiales anteriores, el de Rusia 2018 no tendrá dos pollas (polla y repolla las llamábamos), sino una sola, que contempla los 64 partidos. Por esta razón, el valor de participación suma los valores equivalentes a la antigua dupla compuesta por polla y repolla. Ello determina que los premios serán muy jugosos y que los polleros deben asumir el compromiso de inscribir sus pronósticos en cinco momentos, porque en nuestro modelo se aplica sobre partidos ciertos, no sobre posibles llaves, definidas desde antes que empiece el mundial. No inscribir resultados significa perder los puntos de esa fase y restar muchas posibilidades de ser uno de los ganadores. Estos son los cinco momentos de inscripción de pronósticos y los plazos límite para hacerlo.</p>",
        tx_2: `<ol>
        <li>Fase de grupos: 48 pronósticos. Deben inscribirse antes del martes 12 de junio a las 11:59 p.m.</li>
        <li>Octavos de final: 8 pronósticos. Deben inscribirse entre el 28 de junio 3:00 p.m. y el 29 de junio 11:00 p.m.</li>
        <li>Cuartos de final: 4 pronósticos. Deben inscribirse entre el 3 de julio 3:00 p.m. y el 5 de julio 3:00 p.m.</li>
        <li>Semifinales: 2 pronósticos. Deben inscribirse entre el 7 de julio 4:00 p.m. y el 9 de julio 3:00 p.m.</li>
        <li>Tercer puesto y final: 2 pronósticos. Deben inscribirse entre el 11 de julio 4:00 p.m. y el 13 de julio 3:00 p.m.</li>
        </ol>`,
        tx_3: `
        Usted deberá crear una cuenta de usuario en el sitio https://nuestrapolla.com/registro/
        Al crear esta cuenta usted consignará la información relacionada con:
        <ul>
            <li>El correo electrónico de comunicación de los procesos de la polla</li>
            <li>Sus nombres y apellidos</li>
            <li>Su nombre de pollero (alias que lo identificará en la polla)</li>
            <li>La contraseña de acceso a la página de la polla (entre 8 y 15 caracteres, debe tener al menos una mayúscula, una minúscula y un número)</li>
            <li>Quién es su pollero amigo (debe seleccionarlo del listado). El martes 12 de junio, día en que se cierra la inscripción de la polla, el pollero amigo informará al pollero mayor si avala su participación</li>
            <li>Sexo, de qué equipo es hincha, sus dos selecciones favoritos para ganar el mundial, cuál fue el mundial siguiente al de su nacimiento (información que se suma a su perfil)</li>
            <li>Su cuenta de Twitter (no es información obligatoria)</li>
            <li>El registro termina al aceptar las condiciones de participación en la parte baja de la interfaz del registro</li>
        </ul>
        NOTA: En adelante todos sus ingresos a la página de Nuestra Polla serán con su correo electrónico y la contraseña seleccionada`,
        tx_4: `
        <p>El proceso comienza al pinchar el botón ‘Crear o modificar mis marcadores’, que está en el menú Inicio. En ese momento se despliega la interfaz en la que se diligencian los pronósticos de la siguiente fase del mundial. Al ser la primera en disputa, a continuación está el listado de instrucciones para inscribir los pronósticos de la fase de grupos. El proceso de las siguientes fases es más sencillo, en la medida que no hay grupos y que los polleros estarán más familiarizados con la interfaz.
	    <p>La inscripción de pronósticos se hace por cada grupo; resulta más claro para los usuarios hacerlo así que por el orden de los partidos, porque permite definir si el resultado de cada grupo es lógico (a medida que se diligencia, la tabla de posiciones del grupo se actualiza). Para inscribir los pronósticos, debe pinchar el botón ‘Editar marcadores grupo’, que está a la derecha de la pantalla.</p>
	    <p>Los marcadores pueden ser diligenciados de dos maneras: parándose sobre cada casilla para digitar el número de goles de cada equipo, o pinchando sobre los signos + y -. A la derecha de la interfaz, se va informando qué está faltando diligenciar en los pronósticos del grupo.</p>
	    <p>En cada grupo deben definirse seis resultados, dos comodines (los puntos que se obtengan en esos dos partidos tendrán doble puntaje; como pollero debe decidir si se la juega con partidos de “resultado predecible” o si “se arriesga” con la posibilidad de sumar en un partido en el que no todos los participantes de la polla suman, al resultar “poco predecible”.</p>
	    <p>Cada vez que se consiga un marcador o se define un comodín, la barra rosada que está a la derecha de la pantalla se torna verde, dando cuenta del porcentaje de avance en los pronósticos del grupo. Simultáneamente, la tabla de posiciones del grupo va actualizándose de acuerdo con los pronósticos del pollero.</p>
	    <p>Una vez se definen los seis pronósticos y los dos comodines, se habilita la opción ‘Guardar marcadores grupo’ (un aviso le recuerda que debe guardar los marcadores, porque Ud. podría pasar a otro grupo y seguir con los pronósticos. En ese momento es posible hacer ajustes en las decisiones recién tomadas o guardar los marcadores; una vez se guardan, aparece la información de que ya fueron guardados los marcadores del grupo.</p>
	    <p>Se puede editar o pasar a los demás grupos, para repetir el proceso, a través del botón ‘Siguiente grupo’, que está en la franja azul, en la parte derecha. También puede hacerse en otro orden; basta con seleccionar el grupo.</p>
        <p>Cada vez que se guarda un grupo, tras haber definido los seis marcadores y los comodines, en la parte superior de la pantalla se actualiza la información de cuántos marcadores restan para ingresar en la presente fase. Una vez se consignan todos los resultados de la fase, la información ya no muestra cuántos resultados faltan; aparece el nombre del pollero.</p>`,
        tx_5: `
        <p>Una vez termina el registro, Ud. puede escoger entre ver su perfil o acceder a Mi polla. Al seleccionar la segunda opción, se accede al menú Inicio de la polla (que ofrece varias informaciones, como número de polleros, dinero de cada premio, estadísticas de los pronósticos. El botón azul ‘Crear o modificar mis marcadores’ lo lleva a la interfaz donde se consignan los pronósticos. El segundo botón, ‘Ayuda sobre marcadores’, es un video que muestra de manera sintética cómo se inscriben los marcadores.</p>
        <p>Estos son los otros menús de la página, que se despliegan al pinchar en la parte superior izquierda de la pantalla, al lado de ‘Nuestra polla 2018’:</p>
        <ul>
        <li>Polla (información de los pronósticos propios y de otros polleros de todos los partidos, que pueden seleccionarse por calendario, e información de puntuación de todos los polleros ante los diversos marcadores para cada partido (¿qué pasaría si...? - QPS) y polla perfecta (QPS polla perfecta), que muestra la puntuación que se tendría si todos los partidos por jugarse desde el momento de la consulta quedan como el pollero pronosticó)</li>	
        <li>Ingreso de marcadores (donde se ponen los marcadores la siguiente fase por jugar; al pronosticar los resultados de los grupos en la fase de grupos, se muestra la tabla de posiciones, los dos clasificados por grupo y los cruces con los clasificados de otros grupos, de acuerdo con los pronósticos consignados</li>
        <li>Calendario (se muestra el listado de todos los partidos del mundial –ciudad, fecha, hora y el pronóstico consignado)</li>
        <li>Comparapollas (permite ver qué tan similar es la polla del usuario con respecto a la de otro pollero, que defina)</li>
        <li>Posiciones (muestra la tabla de posiciones de los polleros, de acuerdo con el sistema de puntuación y el sistema de desempate establecidos)</li>
        <li>Mi perfil (muestra la información del pollero, consignada en el registro; permite establecer la imagen del perfil, que será mostrada a todos los polleros, para su fácil identificación)</li>
        <li>Salir (para desconectarse de la página)</li>
        </ul>`,
        tx_6: `El costo de la inscripción es de $150.000. ¡Este valor de participación es el mismo de la suma de los costos de inscripción del Mundial Brasil 2014, porque la inscripción en esa polla (fase de grupos) fue por $100.000 y en esa repolla (fases restantes) fue de $50.000.`,
        tx_7: `
        <p>Nuestra Polla Rusia 2018 se juega con los 64 partidos del mundial y con 22 comodines, distribuidos en fases. La puntuación que otorga cada partido aumenta significativamente de acuerdo con la fase; los partidos de las finales dan más entre cinco y siete veces más puntos que los de la fase inicial, para que se mantenga la posibilidad de alcanzar a los punteros. La polla perfecta da 645 puntos e total: 320 en la fase de grupos y 325 en las fases siguientes.</p>

<p>Ud., como pollero, suma en un partido en dos casos:
-Si atina el resultado exacto del partido
-Si no le pega al resultado exacto, pero sí a la distribución de puntos del partido. Ej.: el partido queda 3-0 y usted pronosticó 2-0.</p>

<p>La otra condición que afecta la puntuación en un partido es el uso de comodines: doblan el puntaje que se obtiene en un partido.</p>

<p>Para que sea muy claro el tema de la puntuación, es importante identificar las posibilidades de puntuación en un partido:</p>

<table class="tabla_npreg"> 
	<thead>
		<tr>
			<th width="200px">Nombre</th>
			<th>Caso</th>
		</tr>	
	</thead>
	<tbody>
		<tr>
			<td>Granchepazo</td>
			<td>Con comodín, Ud. acierta de manera exacta el marcador del partido</td>
		</tr>
		<tr>
			<td>Doble</td>
			<td>Con comodín, Ud. acierta la distribución de puntos de un partido</td>
		</tr>
		<tr>
			<td>Chepazo</td>
			<td>Sin comodín, Ud. acierta de manera exacta el marcador del partido</td>
		</tr>
		<tr>
			<td>Simple</td>
			<td>Sin comodín, Ud. acierta la distribución de puntos de un partido</td>
		</tr>
		<tr>
			<td>Blanco simple</td>
			<td>Sin comodín, Ud. no acierta nada</td>
		</tr>
		<tr>
			<td>Blanco con comodín</td>
			<td>Con comodín, Ud. no acierta nada y ha desperdiciado un comodín</td>
		</tr>
		<tr>
			<td>Nulo</td>
			<td>Ojalá no ocurra. Ud. no inscribió el pronóstico dentro del plazo establecido para hacerlo</td>
		</tr>
	</tbody>
</table>

<p>La siguiente tabla contiene la puntuación de cada fase del mundial.</p>
<table class="tabla_npreg"> 
	<thead>
		<tr>
			<th width="200px">---</th>
			<th>Fase de grupos<br />48 partidos<br />16 comodines</th>
			<th>Octavos<br /> 8 partidos<br />2 comodines)</th>
			<th>Cuartos<br /> 4 partidos<br />2 comodines)</th>
			<th>Semifinales<br /> 2 partidos<br />1 comodín)</th>
			<th>Finales<br /> 2 partidos<br />1 comodín)</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Granchepazo</td>
			<td>10</td>
			<td>20</td>
			<td>30</td>
			<td>40</td>
			<td>50</td>
		</tr>
		<tr>
			<td>Doble</td>
			<td>6</td>
			<td>12</td>
			<td>20</td>
			<td>30</td>
			<td>40</td>
		</tr>
		<tr>
			<td>Chepazo</td>
			<td>5</td>
			<td>10</td>
			<td>15</td>
			<td>20</td>
			<td>25</td>
		</tr>
		<tr>
			<td>Simple</td>
			<td>3</td>
			<td>6</td>
			<td>10</td>
			<td>15</td>
			<td>20</td>
		</tr>
		<tr>
			<td>Blanco simple</td>
			<td>0</td>
			<td>0</td>
			<td>0</td>
			<td>0</td>
			<td>0</td>
		</tr>
		<tr>
			<td>Blanco con comodín</td>
			<td>0</td>
			<td>0</td>
			<td>0</td>
			<td>0</td>
			<td>0</td>
		</tr>
		<tr>
			<td>Nulo</td>
			<td>0</td>
			<td>0</td>
			<td>0</td>
			<td>0</td>
			<td>0</td>
		</tr>
	</tbody>
</table>
        `,
        tx_7: `
        <p>
	El 80% del dinero recaudado por concepto de inscripciones conforma el botín que se repartirán los ganadores. El 20% restante se destinará a cubrir los gastos administrativos y de mantenimiento de la página web. (Los polleros amigos con 10 o más polleros NO PAGARÁN inscripción)</p>
	<p>Los ganadores se repartirán el botín así:</p>
<table class="tabla_npreg"> 
	<thead>
		<tr>
			<th width="90%">Premio</th>
			<th>Porcentaje</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Primer lugar</td>
			<td>50</td>
			
		</tr>
		<tr>
			<td>Segundo lugar</td>
			<td>20</td>
			
		</tr>
		<tr>
			<td>Tercer lugar</td>
			<td>10</td>
			
		</tr>
		<tr>
			<td>Para repartir por partes iguales entre quienes obtengan el mayor puntaje del grupo de cada uno de los polleros amigos <br />(condiciones: el pollero amigo deberá tener al menos 10 inscritos, contando con él <br />y el ganador será quien no haya obtenido premio alguno).</td>
			<td>10</td>
			
		</tr>
		<tr>
			<td>Pollero amigo del ganador del primer premio</td>
			<td>5</td>
			
		</tr>
		<tr>
			<td>Para el pollero que al terminar la fase de grupos (los primeros 48 partidos) vaya de primero</td>
			<td>5</td>
			
		</tr>

	</tbody>
</table>
        `,
       
    };
  },
  methods: {
      cambiacontenido(texto, boton){
        //console.log(boton)
        //this.boton
        this.b1 = false;
        this.b2 = false;
        this.b3 = false;
        this.b4 = false;
        this.b5 = false;
        this.b6 = false;
        this.b7 = false;
        this.b8 = false;
        switch(boton){
            case 'b1': this.b1 = true; break;
            case 'b2': this.b2 = true; break;
            case 'b3': this.b3 = true; break;
            case 'b4': this.b4 = true; break;
            case 'b5': this.b5 = true; break;
            case 'b6': this.b6 = true; break;
            case 'b7': this.b7 = true; break;
            case 'b8': this.b8 = true; break;
        }
        //this.boton = true;
        this.textoactivo = texto;
        
        
        
        
      },
  },
  computed: {
    //...mapGetters(['valueequipos', 'calendario', 'polleroFavoritos', 'equipoFavoritoID', 'nombrePollero']),
  },
    watch: {
  },
  	mounted () {
          this.textoactivo = this.tx_intro;
	},

};
</script>