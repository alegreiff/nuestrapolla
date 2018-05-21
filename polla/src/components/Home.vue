<template>
  <v-layout row wrap>
    <v-flex lg4 md12 sm12 xs12 hidden-md-and-down>
      <v-date-picker class="np_datepicker elevation-10" :first-day-of-week="1" locale="es-sp" no-title v-model="fechas_picker"
        :allowed-dates="feitas">
      </v-date-picker>
      <!-- <button class="glossy primary small roboto" @click="muestrabanderas()">
        <span v-if="banderas">Con banderas</span>
        <span v-else>Sin banderas</span>
      </button> -->

      <button class="primary small roboto" @click="cambia_formato_tiempo()">
        <span v-if="horamostrable">Ver hora en Rusia</span>
        <span v-else>Ver hora en Colombia</span>
      </button>
      <!-- <button @click="createPDF">CREAR PDF</button> -->
      <!-- DELETE TRACE puntosPollero-->
      <Flashcard v-cloak v-if="mi_posicionesNumericas" colorBack="#FFC800" :puntajes="mi_posicionesNumericas" :headerFront="mi_posicionesNumericas.pollero"
        :headerBack="mi_posicionesNumericas.pollero" :footerFront="mi_posicionesNumericas.partidos" :footerBack="mi_posicionesNumericas.puntaje"
        :front="mi_posicionesNumericas.puntaje">
      </Flashcard>
    </v-flex>
    <v-flex lg4 md12 sm12 xs12 hidden-lg-and-up>
      <h3>Seleccione la fecha</h3>
      <v-select v-bind:items="feitas" v-model="fechas_picker" label="Select" single-line bottom></v-select>
      <button class="glossy primary small roboto" @click="muestrabanderas()">
        <span v-if="banderas">Con banderas</span>
        <span v-else>Sin banderas</span>
      </button>

      <button class="glossy primary small roboto" @click="cambia_formato_tiempo()">
        <span v-if="horamostrable">Ver hora en Rusia</span>
        <span v-else>Ver hora en Colombia</span>
      </button>
      <Flashcard v-cloak v-if="mi_posicionesNumericas" colorBack="#FFC800" :puntajes="mi_posicionesNumericas" :headerFront="mi_posicionesNumericas.pollero"
        :headerBack="mi_posicionesNumericas.pollero" :footerFront="mi_posicionesNumericas.partidos" :footerBack="mi_posicionesNumericas.puntaje"
        :front="mi_posicionesNumericas.puntaje">
      </Flashcard>
    </v-flex>
    <v-flex lg8>


      <!-- <pre> {{ mi_posicionesNumericas }} </pre> -->

      <div v-for="partido in partidos_fecha">
        <div class="np_partido_dia elevation-1" :class="{'elevation-18':calendario[partido.id].procesado==0, 'np_partido_dia_proces': calendario[partido.id].procesado==1 }">

          <div class="estadio_datos">
            <span class="estadio_icono" :class="'est'+ id_estadio(calendario[partido.id].estadio) "></span>
            <p>{{calendario[partido.id].estadio}}</p>
            <p>{{calendario[partido.id].ciudad}}</p>
            <span class="horapartido">{{ fechaCorta(calendario[partido.id].fecha) }}</span>
            <span class="horapartido" v-if="horamostrable">{{ fechaHoraLocal(calendario[partido.id].fecha, calendario[partido.id].hora) }} co</span>
            <span class="horapartido" v-else>{{ fechaHora(calendario[partido.id].fecha) }} ru</span>
          </div>
          <div class="equipo_local">
            {{calendario[partido.id].local}}

            <img :src="'/assets/flags/'+calendario[partido.id].idloc + '.png'" :alt="calendario[partido.id].idloc" class="flags_diario">

            <img :src="'/assets/band/'+calendario[partido.id].idloc + '.png'" :alt="calendario[partido.id].idloc" class="flags_diario"
              v-if="banderas">

          </div>
          <div class="resultados">
            <p class="res_superior"></p>
            <p class="res_pron">Pronóstico</p>
            <p class="res_pronlocal"> {{ pronos_partido(partido.id).miloc}} </p>

            <p class="res_pronvis"> {{ pronos_partido(partido.id).mivis}} </p>
            <p class="res_comodin">
              <span class="np_pronocomodin" v-if="pronos_partido(partido.id).micom == 'SI'"></span>
            </p>

            <p class="res_marcador" v-if="calendario[partido.id].procesado== 1">Marcador</p>
            <p class="marcadorDef_loc" v-if="calendario[partido.id].procesado== 1">{{calendario[partido.id].lg}}</p>

            <p class="marcadorDef_vis" v-if="calendario[partido.id].procesado== 1">{{calendario[partido.id].vg}}</p>
            <p class="res_puntos" v-if="calendario[partido.id].procesado== 1">Puntos</p>
            <p class="res_pts" v-if="calendario[partido.id].procesado== 1">{{ pronos_partido(partido.id).mipuntos}}</p>


          </div>
          <div class="equipo_visitante">

            {{calendario[partido.id].visitante}}
            <img :src="'/assets/flags/'+calendario[partido.id].idvis + '.png'" :alt="calendario[partido.id].idvis" class="flags_diario">

            <img :src="'/assets/band/'+calendario[partido.id].idvis + '.png'" :alt="calendario[partido.id].idvis" class="flags_diario"
              v-if="banderas">


          </div>
          <div class="comandos">

            <v-chip color="green" text-color="white">
              <v-avatar class="green darken-4">{{ calendario[partido.id].grupo }}</v-avatar>
              Grupo
            </v-chip>
            <v-btn @click="dialogo(pronos_partido(partido.id).pronos, partido.id)" round color="red lighten-2" dark class="np_textodusha">
              {{ pronos_partido(partido.id).cuantos}}
            </v-btn>
            {{ pronos_partido(partido.id).loc}} -- {{ pronos_partido(partido.id).vis}} -- {{ pronos_partido(partido.id).emp}} -- {{ pronos_partido(partido.id).micom}}
            <!--<div class="charr">
        <chart-pie :data = 'pronos_partido(partido.id).data' :config = 'chartConfig'></chart-pie>
      </div>-->
          </div>
        </div>

      </div>

    </v-flex>
    <template>
      <v-layout row justify-center>
        <v-dialog v-model="muestrapronospartido" max-width="600" scrollable v-if="pronopartido" persistent>
          <v-card>
            <v-card-text>
              <tablapronosporpartido :partidoPronos="pronopartido" :posiciones="posicionesNumericas" :partido="partidoactivo" ></tablapronosporpartido>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <!-- <v-btn color="green darken-1" flat @click.native="muestrapronospartido = false">Cerrar</v-btn> -->
              <v-btn color="green darken-1" flat @click="dialogoCierra()">Cerrar</v-btn>

              
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
  </v-layout>
</template>

<script>

import Vue from 'vue'
import Flashcard from './flashcard'
//import PuntosPollero from './PuntosPollero'
import tablapronosporpartido from './tablapronosporpartido'
import {
  mapState,
  mapMutations,
  mapGetters
} from 'vuex'
import jsPDF from 'jsPDF'
//import { ChartPie } from 'vue-d2b'


export default {
  data: () => ({
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
    feitas: []

  }),
  components: {
    Flashcard,
    tablapronosporpartido
    //PuntosPollero
    //ChartPie
  },
  props: {
    source: String
  },
  methods: {
    createPDF() {
      var doc = new jsPDF();
      var pdfName = "ddoo"
      doc.text("Hello World", 10, 10);
      doc.save(pdfName + '.pdf');
    },
    muestrabanderas() {
      this.banderas = !this.banderas
    },
    ...mapMutations(['cambiaHora']),
    cambia_formato_tiempo() {
      this.$store.commit('cambiaHora', !this.horamostrable)
    },
    id_estadio(estadio) {
      if (this.sedes) {
        // var sale = _.findIndex(this.sedes, {'estadio': estadio});
        var sale = _.findKey(this.sedes, function (o) {
          return o.estadio == estadio
        })
      } else {
        var sale = 'la mocha'
      }
      return sale
    },
    pronos_partido(partido) {
      var allpronos = _.filter(this.allpronos, ['partido', partido])
      // console.log(allpronos)
      var cuantos = allpronos.length
      var salida = new Object()
      var loc = 0
      var vis = 0
      var emp = 0
      var com = 0
      var mis_pronos = _.filter(allpronos, ['id_jugador', this.datosUsuarioWordpress.id])
      for (var i in allpronos) {
        //console.log((allpronos[i].m_loc) + ' -vs-' + (allpronos[i].m_vis))
        if (allpronos[i].comodin == 'SI') {
          com++
        }

        if (parseInt(allpronos[i].m_loc) > parseInt(allpronos[i].m_vis)) {
          loc++
        } else if (parseInt(allpronos[i].m_loc) < parseInt(allpronos[i].m_vis)) {
          vis++
        } else {
          emp++
        }
      }
      salida['pronos'] = allpronos
      salida['cuantos'] = cuantos
      salida['loc'] = loc
      salida['vis'] = vis
      salida['emp'] = emp
      salida['com'] = com
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
        }
      ]
      //console.log(mis_pronos.length + ' TAMAÑO MISS PRONOS')

      if (mis_pronos.length == 1) {
        salida['miloc'] = mis_pronos[0].m_loc
        salida['mivis'] = mis_pronos[0].m_vis
        salida['micom'] = mis_pronos[0].comodin
        salida['micambios'] = mis_pronos[0].cambios
        salida['mipuntos'] = mis_pronos[0].puntos
      }

      return salida
    },
    dialogo(pronos, idpartido) {
      //console.log('dialoguemos...')
      this.pronopartido = pronos
      this.muestrapronospartido = true
      this.partidoactivo = idpartido
    },
    dialogoCierra() {
      //console.log('dialoguemos...')
      this.pronopartido = null
      this.partidoactivo = null
      this.muestrapronospartido = false
      
    }
  },
  watch: {
    /* horamostrable: function (val) {
      //this.horamostrable = val;
      this.cambia_formato_tiempo();
    }, */

  },
  computed: {
    ...mapState(['horamostrable', 'datosUsuarioWordpress', 'configuracionPolla', 'calendario', 'listaequipos', 'proxdata', 'frasesculas', 'sedes', 'allpronos']),
    ...mapGetters(['nombrePollero', 'partidosProcesados', 'puntosPollero', 'posicionesNumericas', 'fasePolla']),
    eventos() {
      var eventos = []
      if (this.calendario) {
        for (var i in this.calendario) {
          if (i > 0) {
            var match = this.calendario[i].local + ' vs ' + this.calendario[i].visitante
            // eventos[i] = {date: this.eventosFecha(this.calendario[i].fecha), title: match, desc: this.calendario[i].fecha, id:this.calendario[i].id };
            eventos[i] = {
              date: this.eventosFecha(this.calendario[i].fecha),
              id: this.calendario[i].id,
              fechafull: this.calendario[i].fecha
            }
          }
        }
      }
      var salida = eventos.shift()
      return eventos
    },
    mi_posicionesNumericas() {
      if (this.posicionesNumericas) {
        var tempo = _.filter(this.posicionesNumericas, ['id_jugador', this.datosUsuarioWordpress.id]);
        return tempo[0];
      } else {
        return "Hola";
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
    lasfechas() {
      if (this.calendario) {
        var feitas = _.map(this.calendario, 'fecha')
        for (var i in feitas) {
          feitas[i] = this.eventosFecha(feitas[i])
          //console.log(feitas[i])
        }
        this.feitas = feitas
      }
    }

  },
  mounted() {
    this.fechas_picker = '2018-06-14'
  },
  created() {

  }
} </script>