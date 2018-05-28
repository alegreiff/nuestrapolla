<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-card dark color="primary">
                <v-card-text class="px-0">
                    CONTROL Polleros Amigos - Nuestra Polla Rusia 2018
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs3>
            <v-card color="secondary">
                <v-card-text class="">
                        <v-btn color="info" v-for="pollero in  amigospolleros" :key="pollero.id" @click="pa_activo(pollero.nombre)">{{ pollero.sigla }} - {{pollero.nombre}}</v-btn>
                    
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs8>
            <v-card dark color="grey lighten-5">
                <v-card-text class="px-0">
                    <div class="np_reglamento">
                        <p v-for="usuario in filtrados_pollero" key="pollero.id">{{usuario.pollero}}</p>
                    </div>
                     
                </v-card-text>
            </v-card>
            <b-table :data="data" :columns="columns"></b-table>
        </v-flex>
        <v-flex xs12>
            <v-card dark color="primary">
                <v-card-text class="px-0">No es tu polla. No es mi polla. Es Nuestra Polla</v-card-text>
            </v-card>
        </v-flex>

    </v-layout>

</template>
<script>
import {  mapGetters, mapState} from 'vuex'

export default {
  name: "Control Polleros Amigos",
  
  data: function() {
    return {
        polleroamigoactivo: null,
        polleros: null
        
       
    };
  },
  methods: {
      pa_activo(pollero){
          this.polleroamigoactivo = pollero;
      }

  },
  computed: {
      ...mapState(['horamostrable', 'frasesculas', 'pollerosamigos']),
    ...mapGetters(['allpollerosHome', 'nombrePollero', 'fasePolla', 'consolidadoPronos', 'statistics', 'polleroID', ]),
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
  },
    watch: {
  },
  	mounted () {
    
    },
      created() {
    axios.get(`/wp-json/lospolleros/v1/all/`).then(response => {
      var lospolleros = response.data
      _.each(lospolleros, item => item.id = parseInt(item.id))
      _.each(lospolleros, item => item.idpollero = parseInt(item.idpollero))
      this.polleros = lospolleros;
    }).catch(e => {
      this.errors.push(e.message)
    })
  }

};
</script>