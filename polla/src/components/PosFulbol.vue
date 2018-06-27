<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-card dark color="primary">
                <v-card-text class="px-0">
                    Posiciones por grupos y clasificados a octavos de final
                </v-card-text>
            </v-card>
        </v-flex>
        
        <v-flex xs8 >
            <div class="tablagrupo" v-for="(grupo, index) in ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']">
                <table class="tabla_np elevation-24">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Equipo</th>
                            <th>PJ</th>
                            <th>PG</th>
                            <th>PE</th>
                            <th>PP</th>
                            <th>GF</th>
                            <th>GC</th>
                            <th>DG</th>
                            <th>PTS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="eq, index in equipos_grupo(grupo)" :class="{'np_clasificado':index<2, 'np_eliminado':index>1 }">
                            <td>
                                <img :src="'/assets/band/'+eq.id + '.png'" :alt="eq.id" class="np_miniflag">
                            </td>
                            <td>{{ eq.equipo }}</td>
                            <td>{{ eq.pj  }}</td>
                            <td>{{ eq.pg }}</td>
                            <td>{{ eq.pe }}</td>
                            <td>{{ eq.pp }}</td>
                            <td>{{ eq.gf }}</td>
                            <td>{{ eq.gc }}</td>
                            <td>{{ eq.dg }}</td>
                            <td>{{ eq.pts }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </v-flex>
        <v-flex xs1></v-flex>
        <v-flex xs3>
            <div class="np_pos_octavos" v-if="Object.keys(octavos).length === 16">
					
                        <v-layout>
                            <v-flex>
                            
                        
						
							<img :src="'/assets/band/'+octavos.A1.id + '.png'" :alt="octavos.A1.id" class="np_miniflag_octavos">
							<p>{{ octavos.A1.equipo }}</p>
						</v-flex>

						<v-flex>
							<img :src="'/assets/band/'+octavos.B2.id + '.png'" :alt="octavos.B2.id" class="np_miniflag_octavos">
							<p>{{ octavos.B2.equipo }} </p>
						</v-flex>
                        </v-layout>
					</div>
					
					
                        <v-layout>
                            <v-flex>
                            
                        
						
							<img :src="'/assets/band/'+octavos.B1.id + '.png'" :alt="octavos.B1.id" class="np_miniflag_octavos">
							<p>{{ octavos.B1.equipo }}</p>
						</v-flex>

						<v-flex>
							<img :src="'/assets/band/'+octavos.A2.id + '.png'" :alt="octavos.A2.id" class="np_miniflag_octavos">
							<p>{{ octavos.A2.equipo }} </p>
						</v-flex>
                        </v-layout>
					</div>
					
                        <v-layout>
                            <v-flex>
                            
                        
						
							<img :src="'/assets/band/'+octavos.C1.id + '.png'" :alt="octavos.C1.id" class="np_miniflag_octavos">
							<p>{{ octavos.C1.equipo }}</p>
						</v-flex>
						
							<v-flex>
                                <img :src="'/assets/band/'+octavos.D2.id + '.png'" :alt="octavos.D2.id" class="np_miniflag_octavos">
							<p>{{ octavos.D2.equipo }} </p>
						
					<v-flex>
                    </v-layout>
					
					
                        <v-layout>
                            <v-flex>
                            
                        
						
							<img :src="'/assets/band/'+octavos.D1.id + '.png'" :alt="octavos.D1.id" class="np_miniflag_octavos">
							<p>{{ octavos.D1.equipo }}</p>
						</v-flex>
						
							<v-flex>
                                <img :src="'/assets/band/'+octavos.C2.id + '.png'" :alt="octavos.C2.id" class="np_miniflag_octavos">
							<p>{{ octavos.C2.equipo }} </p>
						
					<v-flex>
                    </v-layout>
					
                        <v-layout>
                            <v-flex>
                            
                        
						
							<img :src="'/assets/band/'+octavos.E1.id + '.png'" :alt="octavos.E1.id" class="np_miniflag_octavos">
							<p>{{ octavos.E1.equipo }}</p>
						</v-flex>
						
							<v-flex>
                                <img :src="'/assets/band/'+octavos.F2.id + '.png'" :alt="octavos.F2.id" class="np_miniflag_octavos">
							<p>{{ octavos.F2.equipo }} </p>
						
					<v-flex>
                    </v-layout>
					
					
                        <v-layout>
                            <v-flex>
                            
                        
						
							<img :src="'/assets/band/'+octavos.F1.id + '.png'" :alt="octavos.F1.id" class="np_miniflag_octavos">
							<p>{{ octavos.F1.equipo }}</p>
						</v-flex>
						
							<v-flex>
                                <img :src="'/assets/band/'+octavos.E2.id + '.png'" :alt="octavos.E2.id" class="np_miniflag_octavos">
							<p>{{ octavos.E2.equipo }} </p>
						
					<v-flex>
                    </v-layout>
					
                        <v-layout>
                            <v-flex>
                            
                        
						
							<img :src="'/assets/band/'+octavos.G1.id + '.png'" :alt="octavos.G1.id" class="np_miniflag_octavos">
							<p>{{ octavos.G1.equipo }}</p>
						</v-flex>
						
							<v-flex>
                                <img :src="'/assets/band/'+octavos.H2.id + '.png'" :alt="octavos.H2.id" class="np_miniflag_octavos">
							<p>{{ octavos.H2.equipo }} </p>
						
					<v-flex>
                    </v-layout>
					
					
                        <v-layout>
                            <v-flex>
                            
                        
						
							<img :src="'/assets/band/'+octavos.H1.id + '.png'" :alt="octavos.H1.id" class="np_miniflag_octavos">
							<p>{{ octavos.H1.equipo }}</p>
						</v-flex>
						
							<v-flex>
                                <img :src="'/assets/band/'+octavos.G2.id + '.png'" :alt="octavos.G2.id" class="np_miniflag_octavos">
							<p>{{ octavos.G2.equipo }} </p>
						
					<v-flex>
                    </v-layout>
				</div>
        </v-flex>
    </v-layout>

</template>
<script>
import { mapState, mapGetters} from 'vuex'
export default {
  name: "Grupi",
  
  data: function() {
    return {
        jaime: 'JDG',
        octavos: {},
        //procesado: 0
       
    };
  },
  methods: {
      sizee(){
          
          return (Object.keys(this.octavos).length); 
      },
		equipos_grupo (grupo) {
			
				var salida = _.filter(this.posequipos, ['grupo', grupo])
				var salida = _.orderBy(salida, ['pts', 'dg', 'pg', 'gf', 'gc'], ['desc', 'desc', 'desc', 'desc', 'asc'])
				for (var i in salida) {
					if (i == 0) {
						var orden = (i + 1)
						this.octavos[grupo + 1] = salida[i]
					}
					if (i == 1) {
						var orden = (i + 1)
						this.octavos[grupo + 2] = salida[i]
					}
                }
                //this.procesado++;
				return salida
			
		},
  },
  computed: {
    ...mapState(['listaequipos']),
    ...mapGetters(['posequipos']),
    //...mapGetters(['valueequipos', 'calendario', 'polleroFavoritos', 'equipoFavoritoID', 'nombrePollero']),
  },
    watch: {
        octavos(val){
            console.log( "cambeú");
        }
  },
  	mounted () {

	},

};
</script>