<template>
    <!-- <v-layout row wrap v-if="polleroID && polleroID===103"> -->
    <v-layout row wrap v-if="amigo.length === 1 || polleroID === 1">
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
        <v-flex xs10 v-if="polleroID===1">
        <v-flex xs12 v-else>
            <v-card color="grey lighten-5">
                <v-card-text class="px-0">
                    
                        <!--<table class="tabla_npreg" v-if="union_datos_filtrados">
                            <thead>
                                <tr>
                                    <th>Pollero</th>
                                    <th>Pagó</th>
                                    <th>Correo</th>
                                    <th>Nombre</th>
                                    <th>Comentario</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(usuario, index) in  union_datos_filtrados" :key="index">
                                    <td>{{usuario.pollero}}</td>
                                    <td>{{usuario.pago}}</td>
                                    <td>{{usuario.correo}}</td>
                                    <td>{{usuario.nombre}}</td>
                                    <td>{{usuario.comentario}}</td>
                                </tr>
                            </tbody>
                            
                        </table>-->  
                        
                            <b-table v-if="union_datos_filtrados" :data="union_datos_filtrados" :columns="lascolumnas" :narrowed="true"></b-table>
                </v-card-text>
            </v-card>
            
        </v-flex>
        <v-flex xs12>
            <v-card color="primary">
                <v-card-text class="px-0">No es tu polla. No es mi polla. Es Nuestra Polla</v-card-text>
            </v-card>
        </v-flex>

    </v-layout>
<v-layout v-else>
    <h1>Unauthorized {{polleroID}}</h1>
</v-layout>
</template>

<script>
import {  mapGetters, mapState} from 'vuex'

export default {
    beforeRouteEnter:((to, from, next) =>{
        console.info("Antes de entrar");
        
        next((vm) => console.log(vm));
    }),
  name: "Control Polleros Amigos",
    data: () => ({
        amigo: null,
        polleroamigoactivo: null,
        polleros: null,
        lascolumnas: [
                    {
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
      pa_activo(pollero){
          this.polleroamigoactivo = pollero;
      }

  },
  computed: {
    ...mapState(['horamostrable', 'frasesculas', 'pollerosamigos']),
    ...mapGetters(['allpollerosHome', 'nombrePollero', 'fasePolla', 'consolidadoPronos', 'polleroID', ]),
        amigospolleros(){
			
			if(this.pollerosamigos){
				return _.sortBy(this.pollerosamigos, [function(o) { return o.sigla; }]);
			}
        },
        filtrados_pollero(){
			
			if(this.polleroamigoactivo){
				return this.allpollerosHome.filter((polleros) => polleros.polleroamigo === this.polleroamigoactivo)
			}else{
				return this.allpollerosHome
			}
        },
        union_datos_filtrados(){
            if(this.polleroamigoactivo && this.union_datos){
				return this.union_datos.filter((polleros) => polleros.polleroamigo === this.polleroamigoactivo)
			}else{
				if(this.union_datos){
                    if(this.amigo.length===1){
                        this.pa_activo(this.amigo[0].nombre);
                    }
                    
                    return this.union_datos
                }
                
			}
        },

        union_datos(){
               if(this.polleros){
                   var merge = _.merge(this.allpollerosHome, this.polleros);
                   
               return merge;
               
               }else{
                   return 'NoMatch';
               }
            
        }
  },
    watch: {
  },
  beforeMount() {
    //this.pa_activo(this.amigo[0].nombre);
  },
  	mounted () {
    
    },
      created() {
        this.amigo = this.pollerosamigos.filter((amigos) => amigos.id === this.polleroID)
        

    if(this.amigo.length === 1 || this.polleroID === 1){
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

};
</script>