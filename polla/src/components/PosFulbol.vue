<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-card dark color="primary">
                <v-card-text class="px-0">
                    Reglamento Nuestra Polla Rusia 2018
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs3>
            adasdas
        </v-flex>
        <v-flex xs8>
            <div class="tablagrupo">
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
                        <tr v-for="eq, index in equipos_grupo('A')" :class="{'np_clasificado':index<2, 'np_eliminado':index>1 }">
                            <td>
                                <img :src="'/assets/band/'+eq.id + '.png'" :alt="eq.id" class="np_miniflag">
                            </td>
                            <td>{{ eq.equipo }}</td>
                            <td>{{ parseInt(eq.pg) + parseInt(eq.pe) + parseInt(eq.pp)  }}</td>
                            <td>{{ eq.pg }}</td>
                            <td>{{ eq.pe }}</td>
                            <td>{{ eq.pp }}</td>
                            <td>{{ eq.gf }}</td>
                            <td>{{ eq.gc }}</td>
                            <td>{{ parseInt(eq.gf) + parseInt(eq.gc) }}</td>
                            <td>{{ parseInt(eq.pg) * 3 + parseInt(eq.pe) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="tablagrupo">
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
                        <tr v-for="eq, index in equipos_grupo('B')" :class="{'np_clasificado':index<2, 'np_eliminado':index>1 }">
                            <td>
                                <img :src="'/assets/band/'+eq.id + '.png'" :alt="eq.id" class="np_miniflag">
                            </td>
                            <td>{{ eq.equipo }}</td>
                            <td>{{ parseInt(eq.pg) + parseInt(eq.pe) + parseInt(eq.pp)  }}</td>
                            <td>{{ eq.pg }}</td>
                            <td>{{ eq.pe }}</td>
                            <td>{{ eq.pp }}</td>
                            <td>{{ eq.gf }}</td>
                            <td>{{ eq.gc }}</td>
                            <td>{{ parseInt(eq.gf) + parseInt(eq.gc) }}</td>
                            <td>{{ parseInt(eq.pg) * 3 + parseInt(eq.pe) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="tablagrupo">
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
                        <tr v-for="eq, index in equipos_grupo('C')" :class="{'np_clasificado':index<2, 'np_eliminado':index>1 }">
                            <td>
                                <img :src="'/assets/band/'+eq.id + '.png'" :alt="eq.id" class="np_miniflag">
                            </td>
                            <td>{{ eq.equipo }}</td>
                            <td>{{ parseInt(eq.pg) + parseInt(eq.pe) + parseInt(eq.pp)  }}</td>
                            <td>{{ eq.pg }}</td>
                            <td>{{ eq.pe }}</td>
                            <td>{{ eq.pp }}</td>
                            <td>{{ eq.gf }}</td>
                            <td>{{ eq.gc }}</td>
                            <td>{{ parseInt(eq.gf) + parseInt(eq.gc) }}</td>
                            <td>{{ parseInt(eq.pg) * 3 + parseInt(eq.pe) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="tablagrupo">
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
                        <tr v-for="eq, index in equipos_grupo('D')" :class="{'np_clasificado':index<2, 'np_eliminado':index>1 }">
                            <td>
                                <img :src="'/assets/band/'+eq.id + '.png'" :alt="eq.id" class="np_miniflag">
                            </td>
                            <td>{{ eq.equipo }}</td>
                            <td>{{ parseInt(eq.pg) + parseInt(eq.pe) + parseInt(eq.pp)  }}</td>
                            <td>{{ eq.pg }}</td>
                            <td>{{ eq.pe }}</td>
                            <td>{{ eq.pp }}</td>
                            <td>{{ eq.gf }}</td>
                            <td>{{ eq.gc }}</td>
                            <td>{{ parseInt(eq.gf) + parseInt(eq.gc) }}</td>
                            <td>{{ parseInt(eq.pg) * 3 + parseInt(eq.pe) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="tablagrupo">
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
                        <tr v-for="eq, index in equipos_grupo('E')" :class="{'np_clasificado':index<2, 'np_eliminado':index>1 }">
                            <td>
                                <img :src="'/assets/band/'+eq.id + '.png'" :alt="eq.id" class="np_miniflag">
                            </td>
                            <td>{{ eq.equipo }}</td>
                            <td>{{ parseInt(eq.pg) + parseInt(eq.pe) + parseInt(eq.pp)  }}</td>
                            <td>{{ eq.pg }}</td>
                            <td>{{ eq.pe }}</td>
                            <td>{{ eq.pp }}</td>
                            <td>{{ eq.gf }}</td>
                            <td>{{ eq.gc }}</td>
                            <td>{{ parseInt(eq.gf) + parseInt(eq.gc) }}</td>
                            <td>{{ parseInt(eq.pg) * 3 + parseInt(eq.pe) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="tablagrupo">
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
                        <tr v-for="eq, index in equipos_grupo('F')" :class="{'np_clasificado':index<2, 'np_eliminado':index>1 }">
                            <td>
                                <img :src="'/assets/band/'+eq.id + '.png'" :alt="eq.id" class="np_miniflag">
                            </td>
                            <td>{{ eq.equipo }}</td>
                            <td>{{ parseInt(eq.pg) + parseInt(eq.pe) + parseInt(eq.pp)  }}</td>
                            <td>{{ eq.pg }}</td>
                            <td>{{ eq.pe }}</td>
                            <td>{{ eq.pp }}</td>
                            <td>{{ eq.gf }}</td>
                            <td>{{ eq.gc }}</td>
                            <td>{{ parseInt(eq.gf) + parseInt(eq.gc) }}</td>
                            <td>{{ parseInt(eq.pg) * 3 + parseInt(eq.pe) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="tablagrupo">
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
                        <tr v-for="eq, index in equipos_grupo('G')" :class="{'np_clasificado':index<2, 'np_eliminado':index>1 }">
                            <td>
                                <img :src="'/assets/band/'+eq.id + '.png'" :alt="eq.id" class="np_miniflag">
                            </td>
                            <td>{{ eq.equipo }}</td>
                            <td>{{ parseInt(eq.pg) + parseInt(eq.pe) + parseInt(eq.pp)  }}</td>
                            <td>{{ eq.pg }}</td>
                            <td>{{ eq.pe }}</td>
                            <td>{{ eq.pp }}</td>
                            <td>{{ eq.gf }}</td>
                            <td>{{ eq.gc }}</td>
                            <td>{{ parseInt(eq.gf) + parseInt(eq.gc) }}</td>
                            <td>{{ parseInt(eq.pg) * 3 + parseInt(eq.pe) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="tablagrupo">
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
                        <tr v-for="eq, index in equipos_grupo('H')" :class="{'np_clasificado':index<2, 'np_eliminado':index>1 }">
                            <td>
                                <img :src="'/assets/band/'+eq.id + '.png'" :alt="eq.id" class="np_miniflag">
                            </td>
                            <td>{{ eq.equipo }}</td>
                            <td>{{ parseInt(eq.pg) + parseInt(eq.pe) + parseInt(eq.pp)  }}</td>
                            <td>{{ eq.pg }}</td>
                            <td>{{ eq.pe }}</td>
                            <td>{{ eq.pp }}</td>
                            <td>{{ eq.gf }}</td>
                            <td>{{ eq.gc }}</td>
                            <td>{{ parseInt(eq.gf) + parseInt(eq.gc) }}</td>
                            <td>{{ parseInt(eq.pg) * 3 + parseInt(eq.pe) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </v-flex>
        <v-flex xs12>
            cafrfs
        </v-flex>

    </v-layout>

</template>
<script>
import { mapState} from 'vuex'
export default {
  name: "Grupi",
  
  data: function() {
    return {
        jaime: 'JDG'
       
    };
  },
  methods: {
		equipos_grupo (grupo) {
			
				var salida = _.filter(this.listaequipos, ['grupo', grupo])
				var salida = _.orderBy(salida, ['pts', 'dg', 'pg', 'gf', 'gc'], ['desc', 'desc', 'desc', 'desc', 'asc'])
				for (var i in salida) {
					if (i == 0) {
						var orden = (i + 1)
						//this.octavos[grupo + 1] = salida[i]
					}
					if (i == 1) {
						var orden = (i + 1)
						//this.octavos[grupo + 2] = salida[i]
					}
				}
				return salida
			
		},
  },
  computed: {
    ...mapState(['listaequipos']),
    //...mapGetters(['valueequipos', 'calendario', 'polleroFavoritos', 'equipoFavoritoID', 'nombrePollero']),
  },
    watch: {
  },
  	mounted () {

	},

};
</script>