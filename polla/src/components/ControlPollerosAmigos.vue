<template>
    <!-- <v-layout row wrap v-if="polleroID && polleroID===103"> -->
    <v-layout row wrap v-if="amigo.length === 1 || polleroID === 1" v-cloak>
        <v-flex xs12>
            <v-card dark color="primary">
                <v-card-text class="px-0">
                    CONTROL Polleros Amigos - Nuestra Polla Rusia 2018
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs2 v-if="polleroID===1">
            <v-card color="secondary">
                <v-card-text class="px-0">

                        <v-btn small block color="info" v-if="polleroID===1" v-for="pollero in  amigospolleros" :key="pollero.id" @click="pa_activo(pollero.nombre)">{{ pollero.sigla }} - {{pollero.nombre}}</v-btn>

                    
                </v-card-text>
            </v-card>
        </v-flex>
        <!--<v-flex xs10 v-if="polleroID===1">
            <v-card color="grey lighten-5">
                <v-card-text class="px-0">
                    <b-table v-if="union_datos_filtrados" :data="union_datos_filtrados" :columns="lascolumnas" :narrowed="true"></b-table>
                </v-card-text>
            </v-card>
            
        </v-flex>-->
        <!--<v-flex :class="polleroID===1? xs10 : xs12">-->
        <v-flex xs10>
            <v-card color="grey lighten-5">
                <v-card-text class="px-0">
                    <b-table v-if="union_datos_filtrados" :data="union_datos_filtrados" :narrowed="true">
                    <template slot-scope="props">
                
                <b-table-column label="Pollero" centered width="150" sortable field="pollero">
                    {{ (props.row.pollero) }}   --- {{ props.row.tuira}}
                </b-table-column>
                <b-table-column label="Pronos" centered width="30" :class="pronos_parciales_pollero(props.row.id)<2 ? 'pronosROJOS' : 'pronosVERDES'">
                    <span>{{pronos_parciales_pollero(props.row.id)}}</span>
                </b-table-column>
                <b-table-column label="¿Pagó?" centered width="30" sortable field="pago" :class="props.row.pago==0 ? 'pronosROJOS' : 'pronosVERDES'">
                    {{ props.row.pago==='0' ? 'NO' : 'SI' }} 
                </b-table-column>
                <b-table-column label="Correo" centered width="220">
                    {{ (props.row.correo) }}  
                </b-table-column>
                <b-table-column label="Nombre" centered width="200" sortable field="nombre">
                    {{ (props.row.nombre) }} 
                </b-table-column>
                <b-table-column label="Anotación" centered sortable field="comentario">
                    {{ (props.row.comentario) }} 
                </b-table-column>
                <b-table-column label="EDITAR">
                        <v-btn color="info" small @click="editaUsuario(props.row)">Editar {{props.row.id}}</v-btn>
                </b-table-column>
                
            </template>
            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>Cargando datos</p>
                    </div>
                </section>
            </template>
            </b-table>
                </v-card-text>
            </v-card>
            
        </v-flex>
        <v-flex xs12>
            <v-card color="primary">
                <v-card-text class="px-0">No es tu polla. No es mi polla. Es Nuestra Polla</v-card-text>
            </v-card>
        </v-flex>

<template>
<v-dialog v-model="dialog2" max-width="700px" v-if="apollado">
        <v-card>
          <v-card-title>
            {{apollado.pollero}} - {{apollado.nombre}}
          </v-card-title>
          <v-card-text>
                
                <p>Comentario, forma de pago, nota, recordatorio, tip...</p>
                <textarea name="" v-model="apollado.comentario" cols="30" rows="2"></textarea>
                
                <input type="radio" id="one" value="0" v-model="apollado.pago">
                <label for="one">No ha pagado</label>
                <br>
                <input type="radio" id="two" value="1" v-model="apollado.pago">
                <label for="two">Ya pagó</label>
                <hr />
                <v-btn small @click="updatePolleroData()">Actualizar información de {{apollado.pollero}}</v-btn>
            <!--<pre>
                 {{apollado}} 
            </pre>-->
            
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="dialog2=false">Cerrar sin cambios</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

    </v-layout>
<v-layout v-else>
    <h1>No es lugar para un pollero como usted {{polleroID}}</h1>
</v-layout>
</template>

<script>
    import {
        mapGetters,
        mapState
    } from 'vuex'

export default {
    /*beforeRouteEnter: ((to, from, next) => {
        console.info("Antes de entrar");

        next((vm) => console.log(vm));
    }),*/
    name: "Control Polleros Amigos",
    data: () => ({
        dialog2: false,
        apollado: null,
        amigo: null,
        polleroamigoactivo: null,
        polleros: null,
        lascolumnas: [{
                field: 'pollero',
                label: 'ID',
                width: '200'

            },
            {
                field: 'pago',
                label: '¿pagó?',
                width: '40'
            },
            {
                field: 'correo',
                label: 'Correo',
                width: '250'
            },
            {
                field: 'nombre',
                label: 'Nombre',
                width: '125'
            },
            {
                field: 'comentario',
                label: 'Comentario'
            }
        ],

    }),

    methods: {
        pronos_parciales_pollero(pollero){
		
        var tempo = _.filter(this.consolidadoPronosFinal, { 'id_jugador': pollero});
        //tempo = _.filter(this.consolidadoPronos, { 'id_jugador': pollero});
        //tempo = _.filter(tempo, function(o) { return o.partido > 62; });
		
		return tempo.length;
		},
        updatePolleroData(){
            axios.post(`/wp-json/updateapollado/v1/all/`, {
			pollero: this.apollado.id,
			pago: parseInt(this.apollado.pago),
            comentario: this.apollado.comentario
            
			
            })
            .then(response => {
			    //this.actualizarDatos()
                //this.mensaje = response.data
                this.dialog2 = false;
				})
				.catch(e => {
				    console.log('ERROR ' + e)
					})
        },
        editaUsuario(user){
            
            this.apollado = user;
            this.dialog2 = true;
        },     
        pa_activo(pollero) {
            pollero === 'OTRO' ? this.polleroamigoactivo = 'POR DEFINIR' : this.polleroamigoactivo = pollero;
        }

    },
    computed: {
        ...mapState(['horamostrable', 'frasesculas', 'pollerosamigos']),
        ...mapGetters(['allpollerosHome', 'nombrePollero', 'fasePolla', 'consolidadoPronosFinal', 'polleroID', ]),
        amigospolleros() {

            if (this.pollerosamigos) {
                return _.sortBy(this.pollerosamigos, [function (o) {
                    return o.sigla;
                }]);
            }
        },
        filtrados_pollero() {
            if (this.polleroamigoactivo) {
                return this.allpollerosHome.filter((polleros) => polleros.polleroamigo === this.polleroamigoactivo)
            } else {
                return this.allpollerosHome
            }
        },
        union_datos_filtrados() {
            if (this.polleroamigoactivo && this.union_datos) {
                return this.union_datos.filter((polleros) => polleros.polleroamigo === this.polleroamigoactivo)
            } else {
                if (this.union_datos) {
                    if (this.amigo.length === 1) {
                        this.pa_activo(this.amigo[0].nombre);
                    }
                    return this.union_datos
                }
            } 
        },
        union_datos() {
            if (this.polleros) {
                var merge = _.merge(this.allpollerosHome, this.polleros);

                return merge;

            } else {
                return 'NoMatch';
            }

        }
    },
    watch: {},
    beforeMount() {
        //this.pa_activo(this.amigo[0].nombre);
    },
    mounted() {
    },
    created() {
        this.amigo = this.pollerosamigos.filter((amigos) => amigos.id === this.polleroID)
        if (this.amigo.length === 1 || this.polleroID === 1) {
            axios.get(`/wp-json/pollerosamics/v1/all/`).then(response => {
                var lospolleros = response.data
                _.each(lospolleros, item => item.id = parseInt(item.id))
                _.each(lospolleros, item => item.orden = parseInt(item.orden))
                this.polleros = lospolleros;
            }).catch(e => {
                this.errors.push(e.message)
            })
        }
    }
}; </script>