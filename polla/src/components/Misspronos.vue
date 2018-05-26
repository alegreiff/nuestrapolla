<template>
<v-layout row wrap>
    <v-flex xs6>
        <!--<pre>{{ a1 }}</pre>-->
        <!-- Props can be literal, or dynamic (like they are here) -->
<!--<vue-chart
:chart-type="graficaTipo"
:columns="columnsX"
:rows="rowsX"
:options="optionsX"
></vue-chart>-->
    </v-flex>
    <v-flex xs6>
        <template>
        <v-card color="grey lighten-4" flat>
            <v-card-text>
            <v-container fluid>
                <v-layout row wrap>
                <v-flex xs12 sm6>
                    <v-subheader v-text="'Los polleros'"></v-subheader>
                </v-flex>
                <v-flex xs12 sm6>
                    {{ filtracomparables }}
                    <v-select v-if="comparables"
                    item-text="pollero"
                    
                    v-bind:items="comparables"
                    v-model="a1"
                    label="Polleros"

                    ></v-select>
                    <v-btn v-if="outro" color="error" dark large @click="comparaPollas(pronosticosPolleroActivo, outro)">Comparar pollas</v-btn>
                </v-flex>
                </v-layout>
            </v-container>
            </v-card-text>
        </v-card>
        </template>

    </v-flex>
    <v-flex xs12>
        <!--<h2 v-if="suma"> {{  ((suma*100)/4800).toFixed(2)}} % </h2>-->
        <h2 v-if="suma"> {{ suma < 2 ? 0 : ((suma*100)/4800).toFixed(2)}}% </h2>
        
        
        
<template>
    <section>
        <b-table v-if="comparadas!=null"
            :data="calendarioArray"            
            :bordered="true"
            :striped="true"
            :narrowed="false"
            :hoverable="true"
            :loading="false"
            default-sort-direction="desc"
            default-sort="semejanza"
            :row-class="(row, index) => row.semejanza === 100 ? '_100' : row.semejanza === 90 ? '_90' : row.semejanza === 85 ? '_85' : row.semejanza === 75 ? '_75' : row.semejanza === 65 ? '_65' : row.semejanza === 50 ? '_50' : '_0' "
            :mobile-cards="true">

            <template slot-scope="props" slot="header">
                
                <b-tag :active="!!props.column.meta" :label="props.column.meta">
                    {{ props.column.label }}
                </b-tag>
            </template>

            <template slot-scope="props">
                
                <b-table-column field="id" label="partido"  sortable numeric>
                    {{ props.row.id }}
                </b-table-column>

                <b-table-column label="Local">
                    {{ props.row.local }}
                </b-table-column>

                <b-table-column label="Visitante">
                    {{ props.row.visitante }}
                </b-table-column>
                <b-table-column :label="nombrePollero">
                    {{ miprono(props.row.id) }}
                </b-table-column>
                <b-table-column label="Mi comodín">
                    {{ micomodin(props.row.id) }}
                </b-table-column>
                <b-table-column :label="a1.pollero">
                    {{ otroprono(props.row.id) }}
                </b-table-column>
                <b-table-column label="Su comodín">
                    {{ otrocomodin(props.row.id) }}
                </b-table-column>
                
                <b-table-column field="semejanza" label="Semejanza"  sortable numeric meta="sasasa">
                    {{ props.row.semejanza }}
                </b-table-column>
            </template>

            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                icon="emoticon-sad"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>C.A.R.G.A.N.D.O</p>
                    </div>
                </section>
            </template>
        </b-table>
    </section>
</template>



    </v-flex>
    <!--
    <v-flex xs6>
        <v-card dark color="primary">
          <v-card-text><pre> {{ comparadas }} </pre></v-card-text>
        </v-card>
    </v-flex>
    <v-flex xs3>
        <v-card dark color="purple">
          <v-card-text><pre> {{ pronosticosPolleroActivo }} </pre></v-card-text>
        </v-card>
    </v-flex>
    
    <v-flex xs3>
        <v-card dark color="purple">
          <v-card-text><pre> {{ outro }} </pre></v-card-text>
        </v-card>
    </v-flex>
    -->
</v-layout>
</template>
<script>

import { mapState,   mapMutations,   mapGetters } from 'vuex'


export default {
  data: () => ({
    jk: 'Pooolo',
    a1: null,
    outro: null,
    comparadas: null,
    suma: null,
    comparables: null,
  }),
  components: {
  },
  methods: {
      filtracomparables(){
        var tempo = _.filter(this.comparables, [ 'pronos', true]);
        this.comparables = tempo;
      },
      pronos_parciales_pollero(pollero){
        var tempo = _.filter(this.consolidadoPronos, { 'id_jugador': pollero});
        var partidos = this.fasePolla.partidos
        
		return (partidos - tempo.length);
		},
    ...mapMutations(['cambiaHora']),
    miprono(partido){
        if(this.pronosticosPolleroActivo){
        var t = parseInt(partido)
        //console.log(typeof(partido) + " => " + partido)
        //console.log(typeof(t) + " => " + t)
        
        //console.log("Tempore:::::::::::::::")
        
        var temp =  _.filter(this.pronosticosPolleroActivo, ['partido', partido]) 
        //console.table(temp); CORREGIR JAIME
        if(temp[0]){
            if(temp[0].m_vis >=0){
                return temp[0].m_loc + '-' + temp[0].m_vis;
            }else{
                return 'N/D'
            }
        }else{
            return 99 + '-' + 95;
            //console.alert ("ERROR " + partido)
        }
        
        }
    },
    otroprono(partido){
        //partido = parseInt(partido)
        var temp =  _.filter(this.outro, ['partido', partido])
        //return temp[0].m_loc + '-' + temp[0].m_vis;
        if(temp[0].m_vis >=0){
            return temp[0].m_loc + '-' + temp[0].m_vis;
        }else{
            return 'N/D'
        }
    },
    micomodin(partido){
        var temporex =  _.filter(this.pronosticosPolleroActivo, ['partido', partido])
        return temporex[0].comodin;
    },
    otrocomodin(partido){
        //partido = parseInt(partido)
        var temp =  _.filter(this.outro, ['partido', partido])
        return temp[0].comodin;
    },
    compara(partido){
        //partido = parseInt(partido)
        var temp =  _.filter(this.comparadas, ['partido', partido])
        return temp[0].resultado;
    },
    pronos_otro(id){
        //console.log(id)
      return  this.pronosticosPolleroComparado(id) 
    },
    comparaPollas(yo, otro){
        var salida = new Object()
        var suma = 0;
        for(var i in yo){
            var contador = +i + +1;
            salida[i] = new Object()
            salida[i].partido = yo[i].partido;
            if((yo[i].m_loc > yo[i].m_vis &&  otro[i].m_loc > otro[i].m_vis) ||(yo[i].m_loc < yo[i].m_vis &&  otro[i].m_loc < otro[i].m_vis) ||(yo[i].m_loc === yo[i].m_vis &&  otro[i].m_loc === otro[i].m_vis)){
                if((yo[i].m_loc === otro[i].m_loc) && (yo[i].m_vis === otro[i].m_vis)){
                    if(yo[i].comodin === otro[i].comodin){
                        salida[i].resultado = 100
                        suma += 100
                        //INTENCIÓN MARCADOR COMODÍN
                    }else{
                        salida[i].resultado = 85
                        suma += 85
                        //INTENCIÓN MARCADOR
                    }
                }else{
                    //if((yo[i].m_loc + yo[i].m_vis) === (otro[i].m_loc + otro[i].m_vis)){
                    if((yo[i].m_loc ===  otro[i].m_loc) || (yo[i].m_vis === otro[i].m_vis)){
                        if(yo[i].comodin === otro[i].comodin){
                            salida[i].resultado = 90
                            suma += 90
                            //INTENCIÓN COMODÍN GOLESLOCALOVISITANTE
                        }else{
                            salida[i].resultado = 75
                            suma += 75
                            //INTENCIÓN GOLESLOCALOVISITANTE
                        }    
                    }else{
                        if(yo[i].comodin === otro[i].comodin){
                            salida[i].resultado = 65
                            suma += 65
                            //INTENCIÓN COMODÍN
                        }else{
                            salida[i].resultado = 50
                            suma += 50
                            //INTENCIÓN
                        }
                    }
                }
            }else{
                salida[i].resultado = 0
            }
            if(this.calendarioArray){
                this.calendarioArray[i].semejanza = salida[i].resultado;
            }
            //console.log("El contador es: " + contador)
        }
        this.comparadas =  salida;
        
        if(suma > 1){
            this.suma = suma;
        }else{
            this.suma = 1;
        }
        

    }

  },
  watch: {
      a1(val){
          //console.log("Cambia el pollero seleccionado")
          //var id = parseInt(val.id)
          this.outro = this.pronos_otro(val.id)
          this.comparadas = null
          this.suma = null
      },
      losOtrosPolleros(val){
          for (var i in val){
              console.log(val[i].pollero + ' ---------- ' + this.pronos_parciales_pollero(val[i].id));
              if(this.pronos_parciales_pollero(val[i].id)===0){
                  val[i]['pronos'] = true;
              }else{
                  val[i]['pronos'] = false;
              }
          }
          this.comparables = _.cloneDeep(val)
          //this.comparables = _.filter(val, [ 'pronos', true]);
          //var temp =  _.filter(this.pronosticosPolleroActivo, ['partido', partido]) 
          //this.comparables = resultado;
      },
  },
  computed: {
    ...mapState(['horamostrable']),
    ...mapGetters(['allpolleros', 'nombrePollero', 'posicionesNumericas', 'fasePolla', 'losOtrosPolleros', 'pronosticosPolleroComparado', 'pronosticosPolleroActivo', 'calendarioArray', 'consolidadoPronos']),




    }
} 
</script>