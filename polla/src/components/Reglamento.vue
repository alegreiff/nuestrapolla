<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-card dark color="primary">
                <v-card-text class="px-0">
                    ssss
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs4>
            <v-card dark color="secondary">
                <v-card-text class="px-0">
                    <v-btn color="info" @click="textoactivo = tx_intro" block small>Generalidades</v-btn>
                    <v-btn color="info" @click="textoactivo = tx_2" block small>2</v-btn>
                    <v-btn color="info" @click="textoactivo = tx_3" block small>3</v-btn>
                    <v-btn color="info" @click="textoactivo = tx_4" block small>Inscripción de los marcadores</v-btn>
                    <v-btn color="info" @click="textoactivo = tx_5" block small>Menús de la página</v-btn>
                    <v-btn color="info" @click="textoactivo = tx_6" block small>6</v-btn>
                    <v-btn color="info" @click="textoactivo = tx_2" block small>2</v-btn>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs8>
            <v-card dark color="grey lighten-5">
                <v-card-text class="px-0">
                    <div class="np_reglamento" v-html="textoactivo"></div>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12>
            <v-card dark color="primary">
                <v-card-text class="px-0">12</v-card-text>
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
        tx_intro: "<p>¿Por qué muchos nos vemos tentados a participar en una polla del mundial de fútbol? Por muchas razones. Una de las más válidas es porque le da más sabor al mundial. Hemos comprobado que a personas que no gustan del fútbol y a quienes el mundial les parece exagerado, inscribirse en <b>Nuestra Polla</b> les cambia la percepción del evento. Inscribirse en <b>Nuestra Polla</b> es despertar los sentidos, es echarle ají a una empanada para potenciar el trabajo de las papilas gustativas. Participar en <b>Nuestra Polla</b> es emocionante, es garantizar la emoción del mundial.</p><p><b>Nuestra Polla</b> no está abierta a todo aquel que quiera participar; se accede por invitación de uno de los polleros amigos, quienes hacen viable el proceso. Los polleros amigos se encargan de dar a conocer <b>Nuestra Polla</b>, avalar a quienes se registran para participar, recoger el dinero de la inscripción, apoyar a su grupo de polleros en cualquier duda que surja y establecer contacto con el pollero mayor, quien se encarga de la administración de la <b>Nuestra Polla</b> y de la página web que la soporta.</p><p>A diferencia de los mundiales anteriores, el de Rusia 2018 no tendrá dos pollas (polla y repolla las llamábamos), sino una sola, que contempla los 64 partidos. Por esta razón, el valor de participación suma los valores equivalentes a la antigua dupla compuesta por polla y repolla. Ello determina que los premios serán muy jugosos y que los polleros deben asumir el compromiso de inscribir sus pronósticos en cinco momentos, porque en nuestro modelo se aplica sobre partidos ciertos, no sobre posibles llaves, definidas desde antes que empiece el mundial. No inscribir resultados significa perder los puntos de esa fase y restar muchas posibilidades de ser uno de los ganadores. Estos son los cinco momentos de inscripción de pronósticos y los plazos límite para hacerlo.</p>",
        textoactivo: null,
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
        tx_6: '6',
    };
  },
  methods: {
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