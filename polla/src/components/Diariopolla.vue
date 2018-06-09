<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex lg4 md12 sm12 xs12 hidden-md-and-down>
        <v-btn @click="actualiza_info_polla()" color="primary">Actualizar</v-btn>
        <v-date-picker class="np_datepicker elevation-10" :first-day-of-week="1" locale="es-sp" no-title v-model="fechas_picker"
          :allowed-dates="feitas">
        </v-date-picker>
        <hr>
        <Flashcard v-cloak v-if="mi_posicionesNumericas" colorBack="#FFC800" :puntajes="mi_posicionesNumericas" :headerFront="mi_posicionesNumericas.pollero"
          :headerBack="mi_posicionesNumericas.pollero" :footerFront="mi_posicionesNumericas.partidos" :footerBack="mi_posicionesNumericas.puntaje"
          :front="mi_posicionesNumericas.puntaje">
        </Flashcard>
      </v-flex>
      <v-flex lg4 md12 sm12 xs12 hidden-lg-and-up>
        <v-card dark color="primary" v-if="mi_posicionesNumericas">
          <v-card-text>
            <v-layout class="text-xs-center">
              <v-flex xs3>
                <span class="pospoll"> {{ mi_posicionesNumericas.puntaje }} </span>
                <span class="pospoll_label">PTS</span>
              </v-flex>
              <v-flex xs3>
                <span class="pospoll"> {{ mi_posicionesNumericas.pos }} </span>
                <span class="pospoll_label">POS</span>
              </v-flex>
              <v-flex xs3>
                <span class="pospoll"> {{ mi_posicionesNumericas.partidos }} </span>
                <span class="pospoll_label">PARTIDOS</span>
              </v-flex>
              <v-flex xs3>
                <span class="pospoll"> {{ mi_posicionesNumericas.GRANCHEPAZO }} </span>
                <span class="pospoll_label">GCH</span>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
        <v-select v-bind:items="feitas" v-model="fechas_picker" label="Seleccione la fecha" single-line bottom></v-select>
      </v-flex>
      <v-flex lg8 md12 hidden-sm-and-down>
        <v-layout>
          <v-flex xs8 v-if="partidos_fecha && partidos_fecha_libres">
            Partidos para hoy: {{ partidos_fecha.length }} Por jugarse: {{partidos_fecha_libres.length}}
            <v-btn @click='funcionQPS("DIOS")' color="secondary">
              QPS polla perfecta
              <v-icon right dark>highlight</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs4 v-if="partidos_fecha_libres && partidos_fecha_libres.length > 1">
            <v-btn @click="funcionQPS('multiple')" block color="primary">
              QPS fecha
              <v-icon right dark>highlight</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        
        <div v-for="partido in partidos_fecha" :key="partido.id">
          <!-- <pre> {{ pronos_partido(partido.id) }} </pre> -->
          <div class="np_partido_dia elevation-1" :class="{'elevation-18':calendario[partido.id].procesado==0, 'np_partido_dia_proces': calendario[partido.id].procesado==1 }">
            <div class="estadio_datos" v-if="calendario[partido.id].procesado===0">
              <span class="estadio_icono" :class="'est'+ id_estadio(calendario[partido.id].estadio) "></span>
              <p>{{calendario[partido.id].estadio}}</p>
              <p>{{calendario[partido.id].ciudad}}</p>
              <span class="horapartido">{{ fechaCorta(calendario[partido.id].fecha) }}</span>
              <span class="horapartido" v-if="horamostrable">{{ fechaHoraLocal(calendario[partido.id].fecha, calendario[partido.id].hora) }} co</span>
              <span class="horapartido" v-else>{{ fechaHora(calendario[partido.id].fecha) }} ru</span>
            </div>
            <div class="resultadospartidopolla" v-else>
              <!--<p class="res_pts" v-if="calendario[partido.id].procesado== 1">{{ pronos_partido(partido.id).miresultado}}</p>-->
              <div v-if="pronos_partido(partido.id)">
                <v-chip :color="colorderesultado('FULL', partido.id)" text-color="white">
                  <v-avatar class="green darken-4">{{ (resultadospartido(partido.id)).granchepazos}}</v-avatar>
                  {{ ((resultadospartido(partido.id)).granchepazos === 1) ? 'Granchepazo' : 'Granchepazos' }}
                  <v-icon class="np_estrella_dorada">star_border</v-icon>
                </v-chip>
                <v-chip :color="colorderesultado('DOBLE', partido.id)" text-color="white">
                  <v-avatar class="green darken-4">{{ (resultadospartido(partido.id)).dobles}}</v-avatar>
                  {{ ((resultadospartido(partido.id)).dobles === 1) ? 'Doble' : 'Dobles' }}
                  <v-icon class="np_estrella_dorada">star_border</v-icon>
                </v-chip>
                <v-chip :color="colorderesultado('EXACTO', partido.id)" text-color="white">
                  <v-avatar class="green darken-4">{{ (resultadospartido(partido.id)).chepazos}}</v-avatar>
                  {{ ((resultadospartido(partido.id)).chepazos === 1) ? 'Chepazo' : 'Chepazos' }}
                </v-chip>
                <v-chip :color="colorderesultado('SENCILLO', partido.id)" text-color="white">
                  <v-avatar class="green darken-4">{{ (resultadospartido(partido.id)).sencillos}}</v-avatar>
                  {{ ((resultadospartido(partido.id)).sencillos === 1) ? 'Sencillo' : 'Sencillos' }}
                </v-chip>
                <v-chip :color="colorderesultado('BLANCO', partido.id)" text-color="white">
                  <v-avatar class="green darken-4">{{ (resultadospartido(partido.id)).blancos}}</v-avatar>
                  {{ ((resultadospartido(partido.id)).blancos === 1) ? 'Blanco' : 'Blancos' }}
                </v-chip>
                <v-chip :color="colorderesultado('COMODINBLANCO', partido.id)" text-color="white">
                  <v-avatar class="green darken-4">{{ (resultadospartido(partido.id)).pailas}}</v-avatar>
                  {{ ((resultadospartido(partido.id)).pailas === 1) ? 'Paila' : 'Pailas' }}
                  <v-icon class="np_estrella_dorada">star_border</v-icon>
                </v-chip>
                <v-chip :color="colorderesultado('NULO', partido.id)" text-color="white">
                  <v-avatar class="green darken-4">{{ (resultadospartido(partido.id)).nulos}}</v-avatar>
                  {{ ((resultadospartido(partido.id)).nulos === 1) ? 'Nulo' : 'Nulos' }}
                </v-chip>
              </div>
            </div>
            <div class="equipo_local">
              {{calendario[partido.id].local}}
              <img :src="'/assets/flags/'+calendario[partido.id].idloc + '.png'" :alt="calendario[partido.id].idloc" class="flags_diario">
              <img :src="'/assets/band/'+calendario[partido.id].idloc + '.png'" :alt="calendario[partido.id].idloc" class="flags_diario"
                v-if="banderas">
                <!--<pie-chart :data="[[calendario[partido.id].local, pronos_partido(partido.id).loc], [calendario[partido.id].visitante, pronos_partido(partido.id).vis], ['Empate', pronos_partido(partido.id).emp]]" :legend="true" width="100%" height="120px" class="cartapolla"></pie-chart>-->
            </div>
            <div class="resultados" v-if="pronos_partido(partido.id)">
              <p class="res_superior"></p>
              <p class="res_pron">Pronóstico</p>
              <p class="res_pronlocal"> {{ pronos_partido(partido.id).miloc != pronos_partido(partido.id).miloc ? '---' : pronos_partido(partido.id).miloc}}
                </p>
              <p class="res_pronvis"> {{ pronos_partido(partido.id).mivis != pronos_partido(partido.id).mivis ? '---' : pronos_partido(partido.id).mivis}}
                </p>
              <p class="res_comodin">
                <span class="np_pronocomodin" v-if="pronos_partido(partido.id).micom == 'SI'"></span>
              </p>
              <p class="res_marcador" v-if="calendario[partido.id].procesado== 1">Marcador</p>
              <p class="marcadorDef_loc" v-if="calendario[partido.id].procesado== 1">{{calendario[partido.id].lg}}</p>
              <p class="marcadorDef_vis" v-if="calendario[partido.id].procesado== 1">{{calendario[partido.id].vg}}</p>
              <p class="res_puntos" v-if="calendario[partido.id].procesado== 1">Puntos</p>
              <!--<span>{{graficaPronos(pronos_partido(partido.id).loc, pronos_partido(partido.id).vis, pronos_partido(partido.id).emp)}}</span>-->
              
              <p class="res_pts" v-if="calendario[partido.id].procesado== 1">{{ pronos_partido(partido.id).mipuntos}}</p>
            </div>
            <div class="equipo_visitante">
              {{calendario[partido.id].visitante}}
              <img :src="'/assets/flags/'+calendario[partido.id].idvis + '.png'" :alt="calendario[partido.id].idvis" class="flags_diario">
              
              <img :src="'/assets/band/'+calendario[partido.id].idvis + '.png'" :alt="calendario[partido.id].idvis" class="flags_diario"
                v-if="banderas">
                
            </div>
            <div class="graficadiariopolla" v-html="graficaPronos(pronos_partido(partido.id).loc, pronos_partido(partido.id).vis, pronos_partido(partido.id).emp)"></div> 
            <div class="comandos" v-if="pronos_partido(partido.id)">
              <v-chip color="green" text-color="white">
                <v-avatar class="green darken-4">{{ calendario[partido.id].grupo }}</v-avatar>
                Grupo
              </v-chip>
              <v-btn @click="dialogo(pronos_partido(partido.id).pronos, partido.id)" round color="primary" dark class="np_textodusha">
                Ver {{ pronos_partido(partido.id).cuantos}} pronósticos
              </v-btn>
              {{ pronos_partido(partido.id).loc}} -- {{ pronos_partido(partido.id).vis}} -- {{ pronos_partido(partido.id).emp}} -- {{ pronos_partido(partido.id).nulo
              }}
              <v-btn v-if="calendario[partido.id].procesado=== 0" @click="funcionQPS(partido.id)" small color="primary">
                QPS {{calendario[partido.id].local}} - {{calendario[partido.id].visitante}}
                <v-icon right dark>highlight</v-icon>
              </v-btn>
              
            </div>
          </div>
        </div>
      </v-flex>
      <v-flex xs12 hidden-md-and-up>
        <div v-for="partido in partidos_fecha" :key="partido.id">
          <v-card dark color="grey lighten-4" class="pa-0 ma-0 np_movil_diario">
            <v-card-text class="pa-0 ma-0" color="primary">
              <div class="elevation-1" :class="{'elevation-18':calendario[partido.id].procesado==0, 'np_partido_dia_proces': calendario[partido.id].procesado==1 }">
                <div class="ma-1">
                  <p>
                    <v-icon large>date_range</v-icon>
                    <span class="">{{ fechaCorta(calendario[partido.id].fecha) }}</span>
                    <span class="" v-if="horamostrable">{{ fechaHoraLocal(calendario[partido.id].fecha, calendario[partido.id].hora) }} co</span>
                    <span class="" v-else>{{ fechaHora(calendario[partido.id].fecha) }} ru</span> - {{calendario[partido.id].ciudad}}
                  </p>
                </div>
                <div class="ma-4">
                  <v-btn @click="dialogo(pronos_partido(partido.id).pronos, partido.id)" block dark color="primary" class="">
                    Ver todos los pronósticos
                  </v-btn>
                </div>
                <v-layout v-if="pronos_partido(partido.id)">
                  <v-flex xs2>
                    <p class="np_movil_grupo">{{ calendario[partido.id].grupo }}</p>
                  </v-flex>
                  <v-flex xs5>
                    <div class="text-xs-center">
                      {{calendario[partido.id].local}}
                      <img :src="'/assets/band/'+calendario[partido.id].idloc + '.png'" :alt="calendario[partido.id].idloc" class="flags_diario_mini">
                      <span class="np_movil_marcador">{{ pronos_partido(partido.id).miloc}}</span>
                    </div>
                  </v-flex>
                  <v-flex xs5>
                    <div class="text-xs-center">
                      {{calendario[partido.id].visitante}}
                      <img :src="'/assets/band/'+calendario[partido.id].idvis + '.png'" :alt="calendario[partido.id].idvis" class="flags_diario_mini">
                      <span class="np_movil_marcador">{{ pronos_partido(partido.id).mivis}}</span>
                    </div>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs2 v-if="pronos_partido(partido.id)">
                    <span class="np_pronocomodin" v-if="pronos_partido(partido.id).micom == 'SI'"></span>
                  </v-flex>
                  <v-flex xs6 class="text-xs-center">
                    <p class="np_movil_marcadorfinal_label" v-if="calendario[partido.id].procesado== 1">Marcador final</p>
                    <span v-if="calendario[partido.id].procesado== 1" class="np_movil_marcadorfinal">
                      <span class="">{{calendario[partido.id].lg}}</span> -
                      <span class="">{{calendario[partido.id].vg}}</span>
                    </span>
                  </v-flex>
                  <v-flex xs4 class="text-xs-center" v-if="pronos_partido(partido.id)">
                    <p class="np_movil_marcadorfinal_label" v-if="calendario[partido.id].procesado== 1">Puntos</p>
                    <span class="np_movil_puntos" v-if="calendario[partido.id].procesado== 1">{{ pronos_partido(partido.id).mipuntos}}</span>
                  </v-flex>
                </v-layout>
              </div>
            </v-card-text>
          </v-card>
          <hr>
        </div>
      </v-flex>
      <!-- INICIO VENTANA MODAL PRONOS X PARTIDO -->
      <template>
        <v-layout row justify-center>
          <v-dialog v-model="muestrapronospartido" :fullscreen="$vuetify.breakpoint.width < 600 ? true: false" max-width="600" scrollable
            v-if="pronopartido" persistent>
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon @click="dialogoCierra()" dark>
                  <v-icon>close</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <tablapronosporpartido :partidoPronos="pronopartido" :posiciones="posicionesNumericas" :partido="partidoactivo"></tablapronosporpartido>
              </v-card-text>
              <!--<v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" flat @click="dialogoCierra()">Cerrar</v-btn>
                        </v-card-actions>-->
            </v-card>
          </v-dialog>
        </v-layout>
      </template>
      <!-- FIN VENTANA MODAL PRONOS X PARTIDO -->
      <!-- INICIO VENTANA MODAL QPS GLOBAL-->
      <template>
        <v-layout row justify-center>
          <v-dialog v-model="qps" persistent fullscreen max-width="800">
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon @click.native="cierraFuncionQPS()" dark>
                  <v-icon>close</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
              </v-toolbar>
              <!-- <v-card-title class="headline">¿Qué pasaría sí...?</v-card-title> -->
              <v-card-text>
                <QPS :modo="modo" :partidosFecha="partidosfechaQPS" ref="elQPS"></QPS>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-layout>
      </template>
      <!-- FIN VENTANA MODAL QPS GLOBAL-->
    </v-layout>
  </v-container>
</template>
<script>
import Vue from 'vue'
import Flashcard from './flashcard'
import tablapronosporpartido from './tablapronosporpartido'
import { mapState, mapMutations, mapGetters} from 'vuex'
import jsPDF from 'jsPDF'
import QPS from './snippets/QPS.vue'


export default {
  data: () => ({
    qps: false,
    modo: '',
    partidoactivo: null,
    chartConfig(chart) {
      chart.donutRatio(0.5)
    },
    muestrapronospartido: false,
    banderas: true,
    pronopartido: null,
    drawer: null,
    fechas_picker: null,
    allowedDates: ['2018-06-21', '2018-06-25'],
    feitas: [],
    //estadoQPS: [],
    partidosfechaQPS: null,


  }),
  components: {
    Flashcard,
    tablapronosporpartido,
    QPS
  },
  props: {
    source: String
  },
  methods: {
    graficaPronos(loc, vis, emp){
      var base = loc+vis+emp;
      var locP = (loc * 100) / base;
      var visP = (vis * 100) / base;
      var empP = (emp * 100) / base;
      var salida = '<table border ="2" class="np_tabla_resultados" ><tr><td width='+ locP +'%> </td> <td width=' +empP+ '%> </td> <td width=' +visP+ '%> </td></tr></table>';
    //return (locP + ' ' + visP + ' ' +empP);
    return salida;
    },


    colorderesultado(resultado, partido){
      //console.log("El resultado del partido " + partido + " es: " + this.pronos_partido(partido).miresultado)
      if(this.pronos_partido(partido).miresultado===resultado){
        return 'teal'
      }else{
        return 'blue-grey darken-1'
      }
    },
    funcionQPS(match){
      
      if(match ==='multiple'){
        this.modo=match
        this.partidosfechaQPS = this.partidos_fecha
      }else if(match ==="DIOS"){
        this.modo="DIOS"
        this.partidosfechaQPS = this.partidos_fecha
      }else{
        this.modo="SINGLE"
        this.partidosfechaQPS = _.filter(this.partidos_fecha, ['id', match])
      }
      
      this.qps = true
    },
    cierraFuncionQPS(partidos){
      //this.estadoQPS = []
      this.partidosfechaQPS = null
      this.qps = false
      this.$refs.elQPS.QPSDATA=null;
    },
    muestrabanderas() {
      this.banderas = !this.banderas
    },
    ...mapMutations(['cambiaHora', 'updateCalendario', 'updatePosiciones', 'updatePronos']),
    cambia_formato_tiempo() {
      this.$store.commit('cambiaHora', !this.horamostrable)
    },
    actualiza_info_polla() {
      this.$store.commit('updateCalendario')
      this.$store.commit('updatePosiciones')
      this.$store.commit('updatePronos')
    },
    id_estadio(estadio) {
      if (this.sedes) {
        var sale = _.findKey(this.sedes, function (o) {
          return o.estadio == estadio
        })
      } else {
        var sale = 'la mocha'
      }
      return sale
    },
    pronos_partido(partido) {
      //console.log("PARTITA = ")
        //console.log(partido)
      if(this.consolidadoPronos){
        //var cotejo = parseInt(partido)
        var cotejo = partido
        var pronosticosInternos = _.filter(this.consolidadoPronos, ['partido', cotejo])
        var cuantos = pronosticosInternos.length
        //console.log("Cuantos pronos.....")
        //console.log(pronosticosInternos.length)
        var salida = new Object()
        var loc = 0
        var vis = 0
        var emp = 0
        var com = 0
        var nulo = 0
        //var jugadorId = parseInt(this.datosUsuarioWordpress.id)
        //var jugadorId = this.datosUsuarioWordpress.id
        var jugadorId = this.polleroID
        
        var mis_pronos = _.filter(pronosticosInternos, ['id_jugador', jugadorId])
        for (var i in pronosticosInternos) {
          if (pronosticosInternos[i].comodin == 'SI') {
            com++
          }

          if(((isNaN(pronosticosInternos[i].m_loc)) && (isNaN(pronosticosInternos[i].m_vis)))){
            nulo++
          }else{
            if ((pronosticosInternos[i].m_loc) > (pronosticosInternos[i].m_vis)) {
              loc++
            } else if ((pronosticosInternos[i].m_loc) < (pronosticosInternos[i].m_vis)) {
              vis++
            } else {
              emp++
            }
          }
          
        }
        salida['pronos'] = pronosticosInternos
        salida['cuantos'] = cuantos
        salida['loc'] = loc
        salida['vis'] = vis
        salida['emp'] = emp
        salida['com'] = com
        salida['nulo'] = nulo
        salida['data'] = [{
            label: 'L',
            value: loc
          },
          {
            label: 'V',
            value: vis
          },
          {
            label: 'E',
            value: emp
          },{
            label: 'N',
            value: nulo
          }
        ]
        //console.table(mis_pronos)
        if (mis_pronos.length === 1) {
          salida['mivis'] = mis_pronos[0].m_vis
          salida['miloc'] = mis_pronos[0].m_loc
          salida['micom'] = mis_pronos[0].comodin
          salida['micambios'] = mis_pronos[0].cambios
          salida['mipuntos'] = mis_pronos[0].puntos
          salida['miresultado'] = mis_pronos[0].resultado
        }
      }

      
      return salida
    },
    dialogo(pronos, idpartido) {
      //console.log("El partido activo es: " + idpartido) //555
      this.pronopartido = pronos
      this.muestrapronospartido = true
      this.partidoactivo = idpartido
    },
    dialogoCierra() {
      this.pronopartido = null
      this.partidoactivo = null
      this.muestrapronospartido = false
      
    },
    resultadospartido(partido){
      //console.log("El partido es... " + partido)
      //this.resmatch = this.partidosProcesadosSencillo(partido);
      var res = this.partidosProcesadosSencillo(partido);
      var salida = new Object()
      salida['puntos'] = _.sumBy(res, 'puntos');
      salida['granchepazos'] = _.filter(res, function(o) { if (o.resultado==='FULL') return o }).length;
      salida['dobles'] = _.filter(res, function(o) { if (o.resultado==='DOBLE') return o }).length;
      salida['chepazos'] = _.filter(res, function(o) { if (o.resultado==='EXACTO') return o }).length;
      salida['sencillos'] = _.filter(res, function(o) { if (o.resultado==='SENCILLO') return o }).length;
      salida['blancos'] = _.filter(res, function(o) { if (o.resultado==='BLANCO') return o }).length;
      salida['pailas'] = _.filter(res, function(o) { if (o.resultado==='COMODINBLANCO') return o }).length;
      salida['nulos'] = _.filter(res, function(o) { if (o.resultado==='NULO') return o }).length;
      return salida;
      

      
    },
  },
  watch: {
  },
  computed: {
    ...mapState(['horamostrable', 'datosUsuarioWordpress', 'configuracionPolla', 'listaequipos', 'frasesculas', 'sedes']),
    ...mapGetters(['nombrePollero', 'partidosProcesados', 'puntosPollero', 'calendario', 'posicionesNumericas', 'fasePolla', 'consolidadoPronos', 'polleroID', 'partidosProcesadosSencillo']),
    eventos() {
      var eventos = []
      if (this.calendario) {
        for (var i in this.calendario) {
          if (i > 0) {
            var match = this.calendario[i].local + ' vs ' + this.calendario[i].visitante
            eventos[i] = {
              date: this.eventosFecha(this.calendario[i].fecha),
              id: this.calendario[i].id,
              fechafull: this.calendario[i].fecha,
              procesado: this.calendario[i].procesado
            }
          }
        }
      }
      var salida = eventos.shift()
      return eventos
    },
    
    mi_posicionesNumericas() {
      if (this.posicionesNumericas) {
        var tempo = _.filter(this.posicionesNumericas, ['id_jugador', this.polleroID]);
        //console.table(tempo);
        return tempo[0];
      } else {
        return 0;
      }
    },
    partidos_fecha() {
      if (this.fechas_picker) {
        this.lasfechas
        var resultado = _.filter(this.eventos, ['date', this.fechas_picker])
        resultado = _.orderBy(resultado, ['fechafull'], ['asc'])
        return resultado
      }
    },
    partidos_fecha_libres() {
      if (this.partidos_fecha) {
        var resultado = _.filter(this.partidos_fecha, ['procesado', 0])
        return resultado
      }
    },
    lasfechas() {
      if (this.calendario) {
        var feitas = _.map(this.calendario, 'fecha')
        for (var i in feitas) {
          feitas[i] = this.eventosFecha(feitas[i])
        }
        this.feitas = feitas
      }
    }

  },
  mounted() {
    //console.log("La fecha INICIAL es");
    //console.log(this.lafecha());
    //this.fechas_picker = '2018-06-14'
    
    this.fechas_picker = this.lafecha();
    
  },
  created() {
    
  }
} 
</script>