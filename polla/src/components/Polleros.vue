<template>
  <div>
<!-- {{ nombrePollero }} - partidos procesados {{ partidosProcesados.length}} --- {{ puntosPollero.puntos }}
 <p v-if="puestoPollero"> Posición: {{ puestoPollero.pos }} </p> -->
  
<v-layout row wrap>      
<v-flex xs12>
        <v-card color="blue-grey lighten-2">
<span v-if="ultimopartido"><b>Último partido procesado: </b>{{ultimopartido.LOCAL}} {{ultimopartido.lg}} - {{ultimopartido.vg}} {{ultimopartido.VISITANTE}}</span>      
<v-btn @click="actualiza_posiciones()" color="primary">Actualizar posiciones</v-btn>  

<vue-good-table v-if="posicionesNumericas"
      title="Posiciones"
      :columns="$vuetify.breakpoint.width > 800 ? columnas : columnasMoviles"
      :rows="posicionesNumericas"
      :lineNumbers="false"
      :globalSearch="true"
      globalSearchPlaceholder="Encuéntrate"
      nextText="Siguiente"
      prevText="Anterior"
      :responsive="true"
      :paginate="true"
      rowsPerPageText="Polleros por página"
      styleClass="table condensed">

<template slot="table-column" slot-scope="props">
     <span v-if="props.column.field =='GRANCHEPAZO'" class="np_manito">
        <i class="material-icons">star_border</i> {{props.column.label}}
     </span>
     <span v-else-if="props.column.field == 'DOBLE'" class="np_manito">
        <i class="material-icons">star_border</i> {{props.column.label}}
     </span>
     <span v-else-if="props.column.field == 'BLANCOCONCOMODIN'" class="np_manito">
        <i class="material-icons">star_border</i> {{props.column.label}}
     </span>
     <span v-else class="np_manito">
        {{props.column.label}}
     </span>
  </template>    
  <template slot="table-row" scope="props" v-if="$vuetify.breakpoint.width > 800">
    <td>{{ props.row.pos }}</td>
    <td @click="cam(props.row)" class="np_pollero_tablapos">{{ props.row.pollero }}</td>
    <td>{{ props.formattedRow.puntaje }}</td>
    <td class="fancy">{{ props.row.GRANCHEPAZO }}</td>
    <td class="fancy">{{ props.row.EXACTO }}</td>
    <td class="fancy">{{ props.row.DOBLE }}</td>
    <td class="fancy">{{ props.row.SENCILLO }}</td>
    <td class="fancy">{{ props.row.BLANCOCONCOMODIN }}</td>
    <td class="fancy">{{ props.row.BLANCOSIMPLE }}</td>
    <td class="fancy">{{ props.row.USOCOM }}</td>
    <td class="fancy">{{ props.row.NULO }}</td>
    <!-- <td>{{ props.index }}</td> -->
  </template>


      </vue-good-table>

          
        </v-card>
      </v-flex>
    <v-dialog v-model="usuariodetalles" max-width="600">
          <v-layout v-if="datosAdicionalesPollero" row wrap :class="'np_perfil'+datosAdicionalesPollero.genero">
           
              <v-flex xs6>
          <Flashcard v-cloak v-if="usuariodetalles"
          colorBack="#FFC800"
          :puntajes= "datosOtrosPolleros"
          :headerFront="datosOtrosPolleros.pollero"
          :headerBack="datosOtrosPolleros.pollero"
          :footerFront="datosOtrosPolleros.partidos" 
          :footerBack="datosOtrosPolleros.puntaje" 
          :front="datosOtrosPolleros.puntaje">
          </Flashcard>
          <img :src="'/assets/fpc/'+escudo_FPC(datosAdicionalesPollero.hincha) + '.png'" :alt="escudo_FPC(datosAdicionalesPollero.hincha)" class="np_escudofpc">
              
              <img :src="'/assets/posters/'+primer_Mundial(datosAdicionalesPollero.edad) + '.png'" class="np_primermundial">
            </v-flex>
            <v-flex xs6>
            <div v-if="datosAdicionalesPollero">
          <img :src="'/wp-content/uploads/ultimatemember/'+(datosAdicionalesPollero.id)+'/profile_photo.jpg'" v-if="datosAdicionalesPollero.lafoto[0]" class="np_avatar_mona">
          <img :src="'/wp-content/plugins/ultimate-member/assets/img/default_avatar.jpg'" v-else class="np_avatar_mona">
              
              

            <!--<pre> {{ escudo_FPC(datosAdicionalesPollero.hincha) }} </pre>-->
            
            <pre> {{ datosAdicionalesPollero.primermundial }} </pre>  
            
            <pre> {{ ( datosAdicionalesPollero.polleroamigo) }} </pre>  
            <pre> {{ (datosAdicionalesPollero.edad) }} </pre>

            
            <pre> {{ datosAdicionalesPollero.genero }} </pre>  
            
           
            </v-flex>
           </div>

          </v-layout>
          
    </v-dialog>
</v-layout>







  </div>

</template>

<script>
var renderTestColumn = function (colname, entry) {
        return '<span>Dr. '+JSON.stringify(entry.pollero)+'</span>';
    };


import { mapState, mapGetters, mapMutations } from 'vuex'
//import VueBootstrapTable from 'vue2-bootstrap-table2'
import Vue from 'vue';
import VueGoodTable from 'vue-good-table';
Vue.use(VueGoodTable);
import Flashcard from './flashcard'

export default {
  components: {
    //VueBootstrapTable,
    Flashcard
  },
  data() {
    return {
      usuariodetalles: false,
      datosOtrosPolleros: null,
      datosAdicionalesPollero: null,
      onClickFn: function(row, index){
        //this.cam();
        //usuariodetalles =!usuariodetalles;
        //this.datosOtrosPolleros =!this.datosOtrosPolleros
        //polla2018.cam();
        //console.log(row); //the object for the row that was clicked on
        //console.log(index); // index of the row that was clicked on
      },
      columnas: [
      {
        label: '# pos',
        tdClass: 'text-center',
        field: 'pos',
        width: '20px'
      },
      {
        label: 'Pollero',
        tdClass: 'text-center',
        field: 'pollero',
        //sortable: true,
        //filterable: true,
        width: '90px'
      }, {
        label: 'PTS',
        tdClass: 'text-center',
        field: 'puntaje',
        sortable: true,
        type: 'number',
        width: '20px'
      }, {
        label: 'GCH',
        tdClass: 'text-center',
        field: 'GRANCHEPAZO',
        sortable: true,
        type: 'number',
        width: '20px'
      }, {
        label: 'CH',
        tdClass: 'text-center',
        field: 'EXACTO',
        sortable: true,
        type: 'number',
        width: '20px'
      }, {
        label: 'DBL',
        tdClass: 'text-center',
        field: 'DOBLE',
        sortable: true,
        type: 'number',
        width: '20px'
      }, {
        label: 'SEN',
        tdClass: 'text-center',
        field: 'SENCILLO',
        sortable: true,
        type: 'number',
        width: '20px'
      }, {
        label: '0*',
        tdClass: 'text-center',
        field: 'BLANCOCONCOMODIN',
        sortable: true,
        type: 'number',
        width: '20px'
      }, {
        label: '0',
        tdClass: 'text-center',
        field: 'BLANCOSIMPLE',
        sortable: true,
        type: 'number',
        width: '20px'
      }, {
        label: 'COM',
        tdClass: 'text-center',
        field: 'USOCOM',
        sortable: true,
        type: 'number',
        width: '20px'
        
      },{
        label: '--',
        tdClass: 'text-center',
        field: 'NULO',
        sortable: false,
        type: 'number',
        width: '20px'
        
      }],
      columnasMoviles: [
      {
        label: '# pos',
        tdClass: 'text-center',
        field: 'pos',
        width: '20px'
      },
      {
        label: 'Pollero',
        tdClass: 'text-center',
        field: 'pollero',
        //sortable: true,
        //filterable: true,
        width: '90px'
      }, {
        label: 'PTS',
        tdClass: 'text-center',
        field: 'puntaje',
        sortable: true,
        type: 'number',
        width: '20px'
      }],
      errors: [],
      polleros: null,
    }
  },
  computed: {...mapState(['horamostrable', 'configuracionPolla']), 
  ...mapGetters(['nombrePollero', 'puntosPollero', 'posicionesNumericas', 'escudoFPC', 'ultimopartido', 'primerMundial']),
 
  },
  methods:{
    ...mapMutations(['updatePosiciones', 'ultimopartidoprocesado']),
    escudo_FPC(equipo){
      var escudo =  this.escudoFPC(equipo)
      return escudo.escudo
    },
    primer_Mundial(mundial){
      var mundial =  this.primerMundial(mundial)
      return mundial.poster
    },
    
    cam(pollero){
      this.datosOtrosPolleros = pollero;
      //console.table(this.datosOtrosPolleros)
      this.usuariodetalles =!this.usuariodetalles;
      //console.log(" <===============================> ")
      //console.table(this.polleros)
      this.datosAdicionalesPollero = (_.filter(this.polleros, {'id': pollero.id_jugador }))[0];
      

    },
    actualiza_posiciones () {
      this.$store.commit('updatePosiciones')
      this.$store.commit('ultimopartidoprocesado')
		},

  },
    mounted() {
    this.actualiza_posiciones();
  },
  created() {
    axios.get(`/wp-json/lospolleros/v1/all/`).then(response => {
      var lospolleros = response.data
      _.each(lospolleros, item => item.id = parseInt(item.id))
      this.polleros = lospolleros;
    }).catch(e => {
      this.errors.push(e.message)
    })
  }
}
</script>