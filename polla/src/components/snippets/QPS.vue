<template>
    <v-container  text-xs-center>
    <v-layout row wrap>
      <template v-if="partidosQPS">
        <v-flex xs12> {{ mensajeactivo }}</v-flex>
        <v-flex xs3 v-if="modo !='DIOS'" v-for="(partido, index) in partidosQPS" :key="index" class="ahiteves">
          <v-btn small color="primary" small>{{calendario[partido.id].local}} - {{calendario[partido.id].visitante}}</v-btn>
          <!--<v-btn @click="agregaComparado(partido.id, partido.boton, index)" small :color="partido.boton ? 'primary' : 'error'" block dark>{{calendario[partido.id].local}} vs {{calendario[partido.id].visitante}}</v-btn>-->
          <b-field :class="{'qps_comodin':partidosQPS[index].COM === 'SI'}">
            <b-input class="qps_input"
                type="number"
                min="0"
                max="21"
                v-model="partidosQPS[index].GL">
            </b-input>
           vs 
            <b-input class="qps_input"
                type="number"
                min="0"
                max="21"
                v-model="partidosQPS[index].GV">
            </b-input>
        </b-field>
        </v-flex>
          <v-flex xs10 offset-xs1>  
            <v-btn color="primary" @click="verificaQPS()" block dark> C A L C U L A R  </v-btn>
          </v-flex>
      </template>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <vue-good-table v-if="QPSDATA"
      title="Así quedarían las posiciones"
      :columns="columnas"
      :rows="QPSDATA"
      :lineNumbers="false"
      :globalSearch="true"
      globalSearchPlaceholder="Encuéntrate"
      nextText="Siguiente"
      prevText="Anterior"
      :responsive="true"
      :paginate="true"
      rowsPerPageText="Polleros por página"
      :defaultSortBy="{field: 'puntaje', type: 'desc'}"
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
    <!-- <td>{{ props.index }}</td> -->
  </template>


      </vue-good-table>

      </v-flex>
    </v-layout>

    <!-- INICIO VENTANA MODAL QPS GLOBAL-->
    <template>
      <v-layout row justify-center>
        <v-dialog v-model="modalQPSinterno" max-width="800">
          <v-card>
            <v-toolbar dark color="primary">
          <v-btn icon @click.native="modalQPSinterno = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          
          <v-spacer></v-spacer>
          
        </v-toolbar>
            <v-card-title class="headline">¿Qué pasaría sí...?</v-card-title>
            <v-card-text>
                <pre> {{ partidosQPS }} </pre>

            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
    <!-- FIN VENTANA MODAL QPS GLOBAL-->

    </v-container>
</template>

<script>

import { mapState, mapGetters} from 'vuex'
import Vue from 'vue'
import VueGoodTable from 'vue-good-table'
Vue.use(VueGoodTable)
export default {
  props: {
    partidosFecha: null,
    modo: null
  },
  data() {
    return {
      mensajes:[
        'QPS.. este partido termina así', 'QPS.. estos partidos terminan así', 'QPS.. a partir de ahora mi polla es perfecta'
      ],
      mensajeactivo: null,
      partidosQPS: null,
      modalQPSinterno: false,
      QPSDATA: null,
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
        
      }],
    }
  },
  computed: {
    ...mapGetters(['calendario', 'consolidadoPronos', 'posicionesQPS', 'fasePolla', 'pronosticosPolleroActivo']),
    ...mapState(['posiciones']),
  },
  methods:{
    verificaQPS(){
      console.log("verificando pendiente")
      this.QPSDATA = null
      if(this.partidosQPS){
        this.QPSDATA = _.cloneDeep(this.posicionesQPS)
        this.calculoQPS();
        //this.posicionesQPS();
        
      }
    },
    posicionesQPS(){
      var val = this.QPSDATA;
      val = _.orderBy(val, ['puntaje', 'GRANCHEPAZO'], ['desc', 'desc']);
      for (var i in val) {
				val[i].status = (val[i].puntaje + '|' + val[i].GRANCHEPAZO + '|' + val[i].DOBLE + '|' + val[i].EXACTO + '|' + val[i].SENCILLO + '|' + val[i].BLANCOSIMPLE + '|' + val[i].BLANCOCONCOMODIN + '|' + val[i].USOCOM);
				val[i].pos = +i + +1;

				if (i > 0) {
					if (val[i].status === val[i - 1].status) {
						val[i].pos = val[i - 1].pos;
					}
				}
			}

    },

    qpsProcesa(partido, caso){
      
      console.log(' procesa ')
    },
    calculoQPS(){
      var salida = ''
      var cuenta = 0
      //this.modalQPSinterno = true;
      for(var i in this.partidosQPS){
        var contador = 0;
        //CARGA PRONOS ESTE PARTIDO
        var pronos_partidoQPS = _.filter(this.consolidadoPronos, ['partido', this.partidosQPS[i].id]);
        //ESTABLECE GANADOR
        var ganador = (this.partidosQPS[i].GL === this.partidosQPS[i].GV) ? 'EMPATE' : ((this.partidosQPS[i].GL > this.partidosQPS[i].GV) ? 'LOCAL' : 'VISITANTE')
        var signo = ''
        if(ganador === 'EMPATE'){
          signo = '==='
          //this.qpsProcesa(this.partidosQPS[i].id, 'EMPATE', this.partidosQPS[i].GL, this.partidosQPS[i].GV)
        }else if(ganador === 'LOCAL'){
          signo = '>'
          //this.qpsProcesa(this.partidosQPS[i].id, 'LOCAL', this.partidosQPS[i].GL, this.partidosQPS[i].GV)
        }else if (ganador === 'VISITANTE'){
          signo = '<'
          //this.qpsProcesa(this.partidosQPS[i].id, 'VISITANTE', this.partidosQPS[i].GL, this.partidosQPS[i].GV)
        }
        for(var j in pronos_partidoQPS){
          contador ++
          cuenta ++
          if(this.QPSDATA.length !=0){

            var temp = _.findIndex(this.QPSDATA, ['id_jugador', pronos_partidoQPS[j].id_jugador]); 
            console.log(temp + " =============================" + cuenta)
            if(temp >=0){
              var orden = temp;
            }
            console.log(temp + " =============================" + orden)
            //console.log(pronos_partidoQPS[j].id_jugador + " < Lleno...> " + orden)
          }
          
          if(orden >= 0){
            this.QPSDATA[orden].partidos++;
          }
          //console.log(this.posicionesQPS.length  + ' <============================= SIZE')
          //console.log('PRONO: ' + pronos_partidoQPS[j].m_loc +' - '+ pronos_partidoQPS[j].m_vis + ' REAL: ' + this.partidosQPS[i].GL + ' - ' + this.partidosQPS[i].GV )
          
          //MARCADOR EXACTO


          if(ganador === 'LOCAL'){
            console.log("LOCAL: " + pronos_partidoQPS[j].id_jugador + " ID:: " + orden + ' ::| ' + contador + ' | ' + cuenta+ ' --- '+ pronos_partidoQPS[j].pollero )
            //GRANCHEPAZO O CHEPAZO
            if((pronos_partidoQPS[j].m_loc === parseInt(this.partidosQPS[i].GL)) && (pronos_partidoQPS[j].m_vis === parseInt(this.partidosQPS[i].GV))){
              salida+= (" GANA EXACTO " + pronos_partidoQPS[j].m_loc + " vs " + pronos_partidoQPS[j].m_vis)
              
              if(orden >= 0){
                if(pronos_partidoQPS[j].comodin==='SI') this.QPSDATA[orden].USOCOM++
                pronos_partidoQPS[j].comodin==='SI' ? this.QPSDATA[orden].GRANCHEPAZO++ : this.QPSDATA[orden].EXACTO++
                pronos_partidoQPS[j].comodin==='SI' ? this.QPSDATA[orden].puntaje=(this.QPSDATA[orden].puntaje+(this.fasePolla.ptsFULL * 2)) : this.QPSDATA[orden].puntaje=(this.QPSDATA[orden].puntaje+this.fasePolla.ptsFULL)*1
              }else{
                
                this.QPSDATA.push(
                  {partidos: 1,
                  USOCOM: pronos_partidoQPS[j].comodin==='SI' ? 1 : 0,
                  GRANCHEPAZO: pronos_partidoQPS[j].comodin==='SI' ? 1 : 0,
                  EXACTO: pronos_partidoQPS[j].comodin==='NO' ? 1 : 0,
                  puntaje: pronos_partidoQPS[j].comodin==='SI' ? this.fasePolla.ptsFULL * 2 : this.fasePolla.ptsFULL * 1,
                  pollero:pronos_partidoQPS[j].pollero,
                  id_jugador: pronos_partidoQPS[j].id_jugador,
                  BLANCOCONCOMODIN: 0,
                  BLANCOSIMPLE: 0,
                  DOBLE: 0,
                  SENCILLO: 0,
                  pos: '',
                  status: ''
                  
                  })
              }



              
            
            //DOBLE O SENCILLO
            }else if (
              (pronos_partidoQPS[j].m_loc > pronos_partidoQPS[j].m_vis) 
            && ((pronos_partidoQPS[j].m_loc != parseInt(this.partidosQPS[i].GL)) || (pronos_partidoQPS[j].m_vis != parseInt(this.partidosQPS[i].GV)))
            
            ){
              salida+= (" GANA NO EXACTO " + pronos_partidoQPS[j].m_loc + " vs " + pronos_partidoQPS[j].m_vis)
              
              if(orden >= 0){
                if(pronos_partidoQPS[j].comodin==='SI') this.QPSDATA[orden].USOCOM++
                pronos_partidoQPS[j].comodin==='SI' ? this.QPSDATA[orden].DOBLE++ : this.QPSDATA[orden].SENCILLO++
                pronos_partidoQPS[j].comodin==='SI' ? this.QPSDATA[orden].puntaje=(this.QPSDATA[orden].puntaje+(this.fasePolla.ptsPARCIAL * 2)) : this.QPSDATA[orden].puntaje=(this.QPSDATA[orden].puntaje+this.fasePolla.ptsPARCIAL)*1
              }else{
                
                this.QPSDATA.push(
                  {partidos: 1,
                  USOCOM: pronos_partidoQPS[j].comodin==='SI' ? 1 : 0,
                  DOBLE: pronos_partidoQPS[j].comodin==='SI' ? 1 : 0,
                  SENCILLO: pronos_partidoQPS[j].comodin==='NO' ? 1 : 0,
                  puntaje: pronos_partidoQPS[j].comodin==='SI' ? this.fasePolla.ptsPARCIAL * 2 : this.fasePolla.ptsPARCIAL * 1,
                  pollero:pronos_partidoQPS[j].pollero,
                  id_jugador: pronos_partidoQPS[j].id_jugador,
                  BLANCOCONCOMODIN: 0,
                  BLANCOSIMPLE: 0,
                  EXACTO: 0,
                  GRANCHEPAZO: 0,
                  pos: '',
                  status: ''
                  
                  })
              }

            //BLANCO O PAILAS
            }else{
              salida+= (" LOOSER " + pronos_partidoQPS[j].m_loc + " vs " + pronos_partidoQPS[j].m_vis)

              if(orden >= 0){
                if(pronos_partidoQPS[j].comodin==='SI') this.QPSDATA[orden].USOCOM++
                pronos_partidoQPS[j].comodin==='SI' ? this.QPSDATA[orden].BLANCOCONCOMODIN++ : this.QPSDATA[orden].BLANCOSIMPLE++
              }else{
                
                this.QPSDATA.push(
                  {partidos: 1,
                  USOCOM: pronos_partidoQPS[j].comodin==='SI' ? 1 : 0,
                  BLANCOCONCOMODIN: pronos_partidoQPS[j].comodin==='SI' ? 1 : 0,
                  BLANCOSIMPLE: pronos_partidoQPS[j].comodin==='NO' ? 1 : 0,
                  puntaje: 0,
                  pollero:pronos_partidoQPS[j].pollero,
                  id_jugador: pronos_partidoQPS[j].id_jugador,
                  DOBLE: 0,
                  EXACTO: 0,
                  GRANCHEPAZO: 0,
                  SENCILLO: 0,
                  pos: '',
                  status: ''
                  
                  })
              }
              

              
              
            }
          }else if(ganador === 'VISITANTE'){
            console.log("VISITANTE: " + pronos_partidoQPS[j].id_jugador + " ID:: " + orden + ' ::| ' + contador + ' ' + cuenta+ ' --- '+ pronos_partidoQPS[j].pollero )
            //GRANCHEPAZO O CHEPAZO
            if((pronos_partidoQPS[j].m_loc === parseInt(this.partidosQPS[i].GL)) && (pronos_partidoQPS[j].m_vis === parseInt(this.partidosQPS[i].GV))){
              salida+= (" GANA EXACTO " + pronos_partidoQPS[j].m_loc + " vs " + pronos_partidoQPS[j].m_vis)

              if(orden >= 0){
                if(pronos_partidoQPS[j].comodin==='SI') this.QPSDATA[orden].USOCOM++
                pronos_partidoQPS[j].comodin==='SI' ? this.QPSDATA[orden].GRANCHEPAZO++ : this.QPSDATA[orden].EXACTO++
                pronos_partidoQPS[j].comodin==='SI' ? this.QPSDATA[orden].puntaje=(this.QPSDATA[orden].puntaje+(this.fasePolla.ptsFULL * 2)) : this.QPSDATA[orden].puntaje=(this.QPSDATA[orden].puntaje+this.fasePolla.ptsFULL)*1
              }else{
                
                this.QPSDATA.push(
                  {partidos: 1,
                  USOCOM: pronos_partidoQPS[j].comodin==='SI' ? 1 : 0,
                  GRANCHEPAZO: pronos_partidoQPS[j].comodin==='SI' ? 1 : 0,
                  EXACTO: pronos_partidoQPS[j].comodin==='NO' ? 1 : 0,
                  puntaje: pronos_partidoQPS[j].comodin==='SI' ? this.fasePolla.ptsFULL * 2 : this.fasePolla.ptsFULL * 1,
                  pollero:pronos_partidoQPS[j].pollero,
                  id_jugador: pronos_partidoQPS[j].id_jugador,
                  BLANCOCONCOMODIN: 0,
                  BLANCOSIMPLE: 0,
                  DOBLE: 0,
                  SENCILLO: 0,
                  pos: '',
                  status: ''
                  
                  })
              }
            
            //DOBLE O SENCILLO
            }else if (
              (pronos_partidoQPS[j].m_loc < pronos_partidoQPS[j].m_vis) 
            && ((pronos_partidoQPS[j].m_loc != parseInt(this.partidosQPS[i].GL)) || (pronos_partidoQPS[j].m_vis != parseInt(this.partidosQPS[i].GV)))
            
            ){
              salida+= (" GANA NO EXACTO " + pronos_partidoQPS[j].m_loc + " vs " + pronos_partidoQPS[j].m_vis)

              if(orden >= 0){
                if(pronos_partidoQPS[j].comodin==='SI') this.QPSDATA[orden].USOCOM++
                pronos_partidoQPS[j].comodin==='SI' ? this.QPSDATA[orden].DOBLE++ : this.QPSDATA[orden].SENCILLO++
                pronos_partidoQPS[j].comodin==='SI' ? this.QPSDATA[orden].puntaje=(this.QPSDATA[orden].puntaje+(this.fasePolla.ptsPARCIAL * 2)) : this.QPSDATA[orden].puntaje=(this.QPSDATA[orden].puntaje+this.fasePolla.ptsPARCIAL)*1
              }else{
                
                this.QPSDATA.push(
                  {partidos: 1,
                  USOCOM: pronos_partidoQPS[j].comodin==='SI' ? 1 : 0,
                  DOBLE: pronos_partidoQPS[j].comodin==='SI' ? 1 : 0,
                  SENCILLO: pronos_partidoQPS[j].comodin==='NO' ? 1 : 0,
                  puntaje: pronos_partidoQPS[j].comodin==='SI' ? this.fasePolla.ptsPARCIAL * 2 : this.fasePolla.ptsPARCIAL * 1,
                  pollero:pronos_partidoQPS[j].pollero,
                  id_jugador: pronos_partidoQPS[j].id_jugador,
                  BLANCOCONCOMODIN: 0,
                  BLANCOSIMPLE: 0,
                  EXACTO: 0,
                  GRANCHEPAZO: 0,
                  pos: '',
                  status: ''
                  
                  })
              }

            //BLANCO O PAILAS
            }else{
              salida+= (" LOOSER " + pronos_partidoQPS[j].m_loc + " vs " + pronos_partidoQPS[j].m_vis)

              if(orden >= 0){
                if(pronos_partidoQPS[j].comodin==='SI') this.QPSDATA[orden].USOCOM++
                pronos_partidoQPS[j].comodin==='SI' ? this.QPSDATA[orden].BLANCOCONCOMODIN++ : this.QPSDATA[orden].BLANCOSIMPLE++
              }else{
                
                this.QPSDATA.push(
                  {partidos: 1,
                  USOCOM: pronos_partidoQPS[j].comodin==='SI' ? 1 : 0,
                  BLANCOCONCOMODIN: pronos_partidoQPS[j].comodin==='SI' ? 1 : 0,
                  BLANCOSIMPLE: pronos_partidoQPS[j].comodin==='NO' ? 1 : 0,
                  puntaje: 0,
                  pollero:pronos_partidoQPS[j].pollero,
                  id_jugador: pronos_partidoQPS[j].id_jugador,
                  DOBLE: 0,
                  EXACTO: 0,
                  GRANCHEPAZO: 0,
                  SENCILLO: 0,
                  pos: '',
                  status: ''
                  
                  })
              }


            }
          }else if(ganador === 'EMPATE'){
            console.log("EMPATE: " + pronos_partidoQPS[j].id_jugador + " ID:: " + orden + ' ::| ' + contador + ' ' + cuenta+ ' --- '+ pronos_partidoQPS[j].pollero )
            //GRANCHEPAZO O CHEPAZO
            if((pronos_partidoQPS[j].m_loc === parseInt(this.partidosQPS[i].GL)) && (pronos_partidoQPS[j].m_vis === parseInt(this.partidosQPS[i].GV))){
              salida+= (" GANA EXACTO " + pronos_partidoQPS[j].m_loc + " vs " + pronos_partidoQPS[j].m_vis)

              if(orden >= 0){
                if(pronos_partidoQPS[j].comodin==='SI') this.QPSDATA[orden].USOCOM++
                pronos_partidoQPS[j].comodin==='SI' ? this.QPSDATA[orden].GRANCHEPAZO++ : this.QPSDATA[orden].EXACTO++
                pronos_partidoQPS[j].comodin==='SI' ? this.QPSDATA[orden].puntaje=(this.QPSDATA[orden].puntaje+(this.fasePolla.ptsFULL * 2)) : this.QPSDATA[orden].puntaje=(this.QPSDATA[orden].puntaje+this.fasePolla.ptsFULL)*1
              }else{
                
                this.QPSDATA.push(
                  {partidos: 1,
                  USOCOM: pronos_partidoQPS[j].comodin==='SI' ? 1 : 0,
                  GRANCHEPAZO: pronos_partidoQPS[j].comodin==='SI' ? 1 : 0,
                  EXACTO: pronos_partidoQPS[j].comodin==='NO' ? 1 : 0,
                  puntaje: pronos_partidoQPS[j].comodin==='SI' ? this.fasePolla.ptsFULL * 2 : this.fasePolla.ptsFULL * 1,
                  pollero:pronos_partidoQPS[j].pollero,
                  id_jugador: pronos_partidoQPS[j].id_jugador,
                  BLANCOCONCOMODIN: 0,
                  BLANCOSIMPLE: 0,
                  DOBLE: 0,
                  SENCILLO: 0,
                  pos: '',
                  status: ''
                  
                  })
              }
            
            //DOBLE O SENCILLO
            }else if (
              (pronos_partidoQPS[j].m_loc === pronos_partidoQPS[j].m_vis) 
            && ((pronos_partidoQPS[j].m_loc != parseInt(this.partidosQPS[i].GL)) || (pronos_partidoQPS[j].m_vis != parseInt(this.partidosQPS[i].GV)))
            
            ){
              salida+= (" GANA NO EXACTO " + pronos_partidoQPS[j].m_loc + " vs " + pronos_partidoQPS[j].m_vis)

              if(orden >= 0){
                if(pronos_partidoQPS[j].comodin==='SI') this.QPSDATA[orden].USOCOM++
                pronos_partidoQPS[j].comodin==='SI' ? this.QPSDATA[orden].DOBLE++ : this.QPSDATA[orden].SENCILLO++
                pronos_partidoQPS[j].comodin==='SI' ? this.QPSDATA[orden].puntaje=(this.QPSDATA[orden].puntaje+(this.fasePolla.ptsPARCIAL * 2)) : this.QPSDATA[orden].puntaje=(this.QPSDATA[orden].puntaje+this.fasePolla.ptsPARCIAL)*1
              }else{
                
                this.QPSDATA.push(
                  {partidos: 1,
                  USOCOM: pronos_partidoQPS[j].comodin==='SI' ? 1 : 0,
                  DOBLE: pronos_partidoQPS[j].comodin==='SI' ? 1 : 0,
                  SENCILLO: pronos_partidoQPS[j].comodin==='NO' ? 1 : 0,
                  puntaje: pronos_partidoQPS[j].comodin==='SI' ? this.fasePolla.ptsPARCIAL * 2 : this.fasePolla.ptsPARCIAL * 1,
                  pollero:pronos_partidoQPS[j].pollero,
                  id_jugador: pronos_partidoQPS[j].id_jugador,
                  BLANCOCONCOMODIN: 0,
                  BLANCOSIMPLE: 0,
                  EXACTO: 0,
                  GRANCHEPAZO: 0,
                  pos: '',
                  status: ''
                  
                  })
              }


            //BLANCO O PAILAS
            }else{
              salida+= (" LOOSER " + pronos_partidoQPS[j].m_loc + " vs " + pronos_partidoQPS[j].m_vis)

              if(orden >= 0){
                if(pronos_partidoQPS[j].comodin==='SI') this.QPSDATA[orden].USOCOM++
                pronos_partidoQPS[j].comodin==='SI' ? this.QPSDATA[orden].BLANCOCONCOMODIN++ : this.QPSDATA[orden].BLANCOSIMPLE++
              }else{
                
                this.QPSDATA.push(
                  {partidos: 1,
                  USOCOM: pronos_partidoQPS[j].comodin==='SI' ? 1 : 0,
                  BLANCOCONCOMODIN: pronos_partidoQPS[j].comodin==='SI' ? 1 : 0,
                  BLANCOSIMPLE: pronos_partidoQPS[j].comodin==='NO' ? 1 : 0,
                  puntaje: 0,
                  pollero:pronos_partidoQPS[j].pollero,
                  id_jugador: pronos_partidoQPS[j].id_jugador,
                  DOBLE: 0,
                  EXACTO: 0,
                  GRANCHEPAZO: 0,
                  SENCILLO: 0,
                  pos: '',
                  status: ''
                  
                  })
              }


            }
          }else{
            alert("ERRRRRORRR")
          }
        }
      }
      //console.log(sale);
      console.log(salida);
    },

    agregaComparado(id, boton, index){
      if(boton){
      this.partidosQPS[index].pron = true
      }else{
      this.partidosQPS[index].pron = false
      this.partidosQPS[index].GL = ''
      this.partidosQPS[index].GV = ''
      }
      this.partidosQPS[index].boton = !this.partidosQPS[index].boton
    },
    
  },
  mounted: function() {

  },  
  created: function () {
    },
  watch: {
    QPSDATA(val){
      val = _.orderBy(val, ['puntaje', 'GRANCHEPAZO'], ['desc', 'desc']);
      for (var i in val) {
				val[i].status = (val[i].puntaje + '|' + val[i].GRANCHEPAZO + '|' + val[i].DOBLE + '|' + val[i].EXACTO + '|' + val[i].SENCILLO + '|' + val[i].BLANCOSIMPLE + '|' + val[i].BLANCOCONCOMODIN + '|' + val[i].USOCOM);
				val[i].pos = +i + +1;

				if (i > 0) {
					if (val[i].status === val[i - 1].status) {
						val[i].pos = val[i - 1].pos;
					}
				}
			}
    },
    modo(val){
      if(val === 'DIOS') {
        this.mensajeactivo = this.mensajes[2]
      }else if(val === 'multiple'){
        this.mensajeactivo = this.mensajes[1]
      }else{
        this.mensajeactivo = this.mensajes[0]
      }
    },
    partidosFecha(val){
      console.log(this.modo + ' es el modo')
      if(this.modo && this.modo==="DIOS"){
        console.log("Modo GOD")
        var tempQps  = _.cloneDeep(_.filter(this.calendario, ['procesado', 0]))
      }else{
        var tempQps  = _.cloneDeep(_.filter(val, ['procesado', 0]))
      }
      
      for(var i in tempQps){
        var indice = _.findIndex(this.pronosticosPolleroActivo, ['partido', tempQps[i].id]); 
        tempQps[i].boton = false
        tempQps[i].GL = this.pronosticosPolleroActivo[indice].m_loc
        tempQps[i].GV = this.pronosticosPolleroActivo[indice].m_vis
        tempQps[i].COM = this.pronosticosPolleroActivo[indice].comodin
      }
      this.partidosQPS = tempQps
    }
  },
    
}
</script>