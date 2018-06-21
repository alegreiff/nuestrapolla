<template>
  <div>
<!-- {{ nombrePollero }} - partidos procesados {{ partidosProcesados.length}} --- {{ puntosPollero.puntos }}
 <p v-if="puestoPollero"> Posición: {{ puestoPollero.pos }} </p> -->
  
<v-layout row wrap>
<v-flex xs12>
  <v-btn small @click="pa_activo=null">Todos</v-btn>
  <v-menu offset-y>
      <v-btn slot="activator" color="primary" dark>Filtrar por pollero amigo</v-btn>
      <v-list>
        <v-list-tile v-for="(pa, index) in pollerosamigos" :key="index" @click="pa_activar(pa.sigla)">
          <v-list-tile-title>{{ pa.sigla }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  <span>{{pa_activo ? pa_activo : 'Todos' }}</span>
  <!--<v-btn v-for="pa in pollerosamigos" small @click="pa_activar(pa.sigla)">{{pa.sigla}}</v-btn>-->
  </v-flex>      
<v-flex xs12>
        <v-card color="blue-grey lighten-2">
<span v-if="ultimopartido"><b>Último partido procesado: </b>{{ultimopartido.LOCAL}} {{ultimopartido.lg}} - {{ultimopartido.vg}} {{ultimopartido.VISITANTE}}</span>      
<v-btn @click="actualiza_posiciones()" color="primary">Actualizar posiciones</v-btn> 
<v-btn @click="muestraHall()" color="terciary">Hall provisional de la fama</v-btn>

<vue-good-table v-if="misposicionesNumericas"
      title="Posiciones"
      :columns="$vuetify.breakpoint.width > 800 ? columnas : columnasMoviles"
      :rows="misposicionesNumericas"
      :lineNumbers="false"
      :globalSearch="true"
      globalSearchPlaceholder="Encuéntrate"
      nextText="Siguiente"
      prevText="Anterior"
      :responsive="true"
      styleClass="table table-condensed"
      
      rowsPerPageText="Polleros por página"
      styleClass="table condensed">
<!-- :paginate="true" -->
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
    <td>
    {{ props.row.pos }} <v-btn flat icon color="indigo" @click="mihistoria(props.row)">
              <v-icon>star</v-icon>
            </v-btn>
     </td>
    <td :class="el_genero(props.row)==='H' ? 'macho' : 'hembra'" @click="cam(props.row)" class="np_pollero_tablapos">{{ props.row.pollero }}</td>
    <td>{{ props.formattedRow.puntaje }}</td>
    <td>{{ props.row.pa }}</td>
    <td class="fancy">{{ props.row.GRANCHEPAZO }}</td>
    <td class="fancy">{{ props.row.EXACTO }}</td>
    <td class="fancy">{{ props.row.DOBLE }}</td>
    <td class="fancy">{{ props.row.SENCILLO }}</td>
    <td class="fancy">{{ props.row.BLANCOCONCOMODIN }}</td>
    <td class="fancy">{{ props.row.BLANCOSIMPLE }}</td>
    <td class="fancy">{{ props.row.USOCOM }}</td>
    <!--<td class="fancy">{{ props.row.NULO }}</td>-->
    <td class="fancy">{{ props.row.BLANCOCONCOMODIN + props.row.BLANCOSIMPLE }}</td>
    <!-- <td>{{ props.index }}</td> -->
  </template>


      </vue-good-table>

          
        </v-card>
      </v-flex>

<v-dialog v-model="dialog3" max-width="400px">
        <v-card>
<div class="np_hallfama">
<span>Premios provisionales calculados sobre las posiciones actuales</span>
<hr>
<p v-for="(pollero, index) in primeros" :key="index">1º: {{ pollero.pollero }}  {{ plan(0, primeros.length) }} + {{ plan(5, primeros.length) }} (Líder de la fase de grupos)</p>

<ul>
    <li v-for="(pollero, index) in primeros" :key="index">Pollero amigo (1º): {{ pollero.pa }} {{ plan(4, primeros.length) }}</li>
</ul>
<p v-for="(pollero, index) in segundos" :key="index">2º: {{ pollero.pollero }}   {{ plan(1, primeros.length) }}</p>
<p v-for="(pollero, index) in terceros" :key="index">3º: {{ pollero.pollero }} {{ plan(2, terceros.length) }}</p>
<p>Mejores polleros X pollero amigo</p>
<p v-for="(pa, index) in pollerosamigos" :key="index" v-if="pa.suma > 10">
    
    <ul>
        <li v-for="(benef, index) in mejorpollero(pa.sigla)" :key="index">[{{pa.sigla}}] --- {{ benef.pollero }} ({{ benef.pos }})  {{ plan(3, (10 * (mejorpollero(pa.sigla).length))) }}</li>
    </ul>
    </p>  
</div>  
        </v-card>
      </v-dialog>


<v-dialog v-model="lahistoria" max-width="500px" v-if="historiapollero && historipollero">
        <v-card>
          <v-card-title>
            <v-chip color="green" text-color="white">
            <v-avatar class="green darken-4">{{historipollero.pos}}</v-avatar>
              {{historipollero.puntaje}} Pts.
            </v-chip> &nbsp;
            <strong>{{ historipollero.pollero }}</strong>  &nbsp; [{{historipollero.partidos  }} partidos] 
            
              
          </v-card-title>
          <v-card-text>
            
            <table class="tabla_np_historia">
              <tr>
                <template v-for='(dato, index) in historiapollero'>
                  
                  <td>
                    <img :style='"height:" + parseInt(dato.puntos)*10+"px;"' :src="'/assets/puntos.png'">
                    <span class="np_eldato">{{ dato.puntos}}</span>
                    <span class="np_eldato">
                      <v-icon class="np_estrella_minimal" v-if="dato.res ==='CO' || dato.res ==='DO' || dato.res ==='FU' " >star</v-icon>
                      <v-icon class="np_estrella_minimal" v-else>remove</v-icon>
                      </span>
                    <!-- {{ dato.res}} -->
                    
                    </td>

                </template>
              </tr>
            </table>
            
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="lahistoria=false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


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
            
            <pre> {{ pa }} </pre>  
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
      historiapollero: null,
      historipollero: null,
      lahistoria: false,
      dialog3: false,
      posiciones: null,
        primeros: null,
        segundos: null,
        terceros: null,
      usuariodetalles: false,
      datosOtrosPolleros: null,
      datosAdicionalesPollero: null,
      pa: null,
      pa_activo: null,
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
        width: '20px',
        sortable: true,
        type: 'number'
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
        label: 'PA',
        field:'pa',
        sortable: true,
        width: '20px'
      },
      {
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
  /*
      ...mapState(['', 'plandepremios']),
    ...mapGetters(['posicionesNumericasHallFama']),
  */
  computed: {...mapState(['horamostrable', 'configuracionPolla', 'pollerosamigos','plandepremios']), 
  ...mapGetters(['nombrePollero', 'puntosPollero', 'posicionesNumericas', 'escudoFPC', 'ultimopartido', 'primerMundial', 'posicionesNumericasHallFama']),
  misposicionesNumericas(){
if (this.pa_activo) {
                return this.posicionesNumericas.filter((posiciones) => posiciones.pa === this.pa_activo)
            } else {
                return this.posicionesNumericas
            }
  }
 
  },
  methods:{
    mihistoria(pollero){
      //props.row.id_jugador, props.row.pollero
      this.historipollero = pollero;
      this.historiapollero = null
      console.log(pollero + ' --------------------')
        axios.get(`/wp-json/gethistoriauser/v1/all/` + pollero.id_jugador)
				.then(response => {
					this.historiapollero = response.data
				})
				.catch(e => {
					this.errors.push(e.message)
        })
        this.lahistoria = true
    },
    muestraHall(){
    this.primeros = this.posicionesNumericasHallFama.filter((posiciones) => posiciones.pos === 1)
        this.segundos = this.posicionesNumericasHallFama.filter((posiciones) => posiciones.pos === 2)
        this.terceros = this.posicionesNumericasHallFama.filter((posiciones) => posiciones.pos === 3)
        for(var i in this.pollerosamigos){
            var tempo = this.posicionesNumericasHallFama.filter((posiciones) => posiciones.pa === this.pollerosamigos[i].sigla)
            this.pollerosamigos[i].suma = tempo.length
        }
    this.dialog3=!this.dialog3;
    },
    ...mapMutations(['updatePosiciones', 'ultimopartidoprocesado']),
          plan(porc, cuantos){
          var tempo = ((this.plandepremios.porcentajes[porc] * (this.plandepremios.cuota * (100 - this.plandepremios.fee)) * this.posicionesNumericasHallFama.length)/100) / 100
          let val = (tempo/cuantos).toFixed(0).replace('.', ',')
        return '$' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
mejorpollero(pa){
    var tempo = this.posicionesNumericasHallFama.filter((posiciones) => posiciones.pa === pa)
    var tempo1 = tempo.filter((pollero) => pollero.pos > 3)[0]
    var pos = tempo1.pos
    console.log(pos)
    var tempo2 =  tempo.filter((pollero) => pollero.pos === pos)
    return tempo2
},
    escudo_FPC(equipo){
      var escudo =  this.escudoFPC(equipo)
      return escudo.escudo
    },
    pa_activar(pa){
      this.pa_activo = pa
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
      this.pa = pollero.pa; //junio 17
    },
    el_genero(pollero){
      if(this.polleros){
        var tempo = (_.filter(this.polleros, {'id': pollero.id_jugador }))[0];
        var salida = tempo.genero ==='Pollero' ? 'H' : 'M';
        return salida
      }
      
      //return ' s'
    },
    actualiza_posiciones () {
      this.$store.commit('updatePosiciones')
      this.$store.commit('ultimopartidoprocesado')
		},

  },
    mounted() {
    this.actualiza_posiciones();
        if(this.posicionesNumericasHallFama){
        this.primeros = this.posicionesNumericasHallFama.filter((posiciones) => posiciones.pos === 1)
        this.segundos = this.posicionesNumericasHallFama.filter((posiciones) => posiciones.pos === 2)
        this.terceros = this.posicionesNumericasHallFama.filter((posiciones) => posiciones.pos === 3)
    }
    if(this.pollerosamigos && this.posicionesNumericasHallFama ){
        for(var i in this.pollerosamigos){
            var tempo = this.posicionesNumericasHallFama.filter((posiciones) => posiciones.pa === this.pollerosamigos[i].sigla)
            this.pollerosamigos[i].suma = tempo.length
        }
    }
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