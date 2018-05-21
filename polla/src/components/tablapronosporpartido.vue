<template>
  <div>
    <!-- <button @click="dialog2 = true">teste</button> -->
  <vue-good-table v-if="datosPartidoActivo" 
    :columnFilters="columnFilters"
    :columns="columnas"
    :rows="datosPartidoActivo"
    :paginate="false"
    :lineNumbers="false"
    globalSearchPlaceholder="Encuéntrate"
    nextText="Siguiente"
    prevText="Anterior"
    :responsive="true"
    :defaultSortBy="inicioSort"
    styleClass="table condensed pollk">
  
<template slot="table-column" slot-scope="props">
     <span v-if="props.column.field =='m_loc'" >
          {{ calendario[partido].local }} 
     </span>
     <span v-else-if="props.column.field =='m_vis'" >
          {{ calendario[partido].visitante }} 
     </span>
     <span v-else class="np_manito">
        {{props.column.label}}
     </span>
     
  </template>

  
    <template slot="table-row" scope="props">
      <!--<td>{{ props.row.pos }}</td>
      <td @click="cam(props.row)" class="np_pollero_tablapos">{{ props.row.pollero }}</td>
      <td>{{ props.formattedRow.puntaje }}</td>-->
      <!-- <td class="fancy">{{ posicionPollero(props.row.id_jugador)}}</td> -->
      
      <td class="fancy">{{ props.row.posicion }}</td> 
      <td class="fancy">{{ props.row.puntaje }}</td> 
      <td class="fancy">{{ props.row.pollero }}</td>
      <td class="fancy">{{ props.row.m_loc > 0 ? props.row.m_loc: 0 }}</td>
      <td class="wwww">{{ props.row.m_vis >0 ? props.row.m_vis : 0 }}</td>
      

      <!--
        <td class="wwww">{{ props.row.m_loc }}</td>
        <td class="wwww">{{ props.row.m_vis }}</td>
      -->
      <td class="fancy">{{ props.row.comodin }}</td>
      
      
      
      <!-- <td>{{ props.index }}</td> -->
    </template>  
  </vue-good-table>

  <div v-if="losnulos.length > 1">
    <h6>NULOS:</h6>
    <span class="text-xs-center" v-for="nulo in losnulos" :key="nulo.id">
      <v-chip>{{ nulo.pollero}}</v-chip>
    </span>
  </div>
<!--<v-dialog v-model="dialog2" max-width="500px" scrollable>
        <v-card>
          XBNBNBNMBM
        </v-card>
</v-dialog>-->



  <!--<p v-else>PAILARANGAS</p> -->
</div>

</template>

<script>
import Vue from 'vue';
import VueGoodTable from 'vue-good-table';
import {   mapState } from 'vuex'
Vue.use(VueGoodTable);


export default {
  props: {
    partidoPronos: null,
    posiciones: null,
    partido: null,
    columnFilters: {"pollero":"es","m_loc":"","m_vis":""},
    
    
  },
  data() {
    return {
      
      //dialog2: false,
      losnulos: null,
      datosPartidoActivo: null,
      user: 'esp',
      inicioSort: {
        field: 'posicion',
        type: 'asc' 
      },
    columnas: 
    [
      {
        label: 'Pos.',
        tdClass: 'text-center',
        field: 'posicion',
        type: 'number',
        width: '20px'
      },
      {
        label: 'Pts.',
        tdClass: 'text-center',
        field: 'puntaje',
        type: 'number',
        width: '20px'
      },
      {
        label: 'Pollero',
        tdClass: 'text-center',
        field: 'pollero',
        //sortable: true,
        filterable: true,
        placeholder: 'busca',
        width: '160px',
        globalSearch: true
      }, {
        label: 'LOCAL',
        tdClass: 'text-center',
        field: 'm_loc',
        sortable: true,
        type: 'number',
        
        filterable: true,
        placeholder: 'goles'
        
      }, {
        label: 'VISITANTE',
        tdClass: 'text-center',
        field: 'm_vis',
        sortable: true,
        type: 'number',
        
        filterable: true,
        placeholder: 'goles'
        
      },  {
        label: 'COMODÍN',
        tdClass: 'text-center',
        field: 'comodin',
        sortable: true,
        type: 'number',
        width: '20px'
      }
      ]
    }
  },
  computed: {
    ...mapState(['calendario']),
  },
  methods:{
    /*posicionPollero(idPollero){
      var temp = _.filter(this.posiciones, ['id_jugador', idPollero])
      return temp[0].pos;
    }*/

  },
  /*watch: {
    partidoPronos(val){
      for(var i in val){
        this.partidoPronos[i].poss =_.filter(this.posiciones, ['id_jugador', this.partidoPronos[i].id_jugador])[0].pos 
      }
    }
  },*/
  created() {
    if(this.partidoPronos){
      
      if(this.posiciones.length > 0){
        for(var i in this.partidoPronos){
        var pos =_.filter(this.posiciones, ['id_jugador', this.partidoPronos[i].id_jugador])[0].pos
        this.partidoPronos[i].posicion = pos;
        var puntaje = _.filter(this.posiciones, ['id_jugador', this.partidoPronos[i].id_jugador])[0].puntaje
        this.partidoPronos[i].puntaje = puntaje;
        }
      }else{
        for(var i in this.partidoPronos){
          this.partidoPronos[i].posicion = 0;
          this.partidoPronos[i].puntaje = 0;
        }
      }
      //888
    var temporal = this.partidoPronos;
    var nulos = _.filter(temporal, function(o) { if (isNaN(o.m_loc)) return o });
    this.losnulos = nulos;
    //this.datosPartidoActivo = this.partidoPronos;
    this.datosPartidoActivo = _.filter(temporal, function(o) { if (o.m_loc>=0 ) return o });
    }else{
      
    }

  }
}
</script>