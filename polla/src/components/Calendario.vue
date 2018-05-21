<template>
<div>
    <button class="glossy primary small roboto" @click="cambia_formato_tiempo()">
    <span v-if="horamostrable">Ver hora en Rusiax</span>
    <span v-else>Ver hora en Colombia</span>
    </button>
  <div class="text-xs-center">
   <!-- :class="{ 'form-group': true, 'has-error': descriptionError != null }"-->
    <v-btn fab dark small :class="{'pink': grupoActivo=='', 'teal': grupoActivo!='',}" @click="muestragrupo('')">
      Todos
    </v-btn>
    <v-btn fab dark small :class="{'pink': grupoActivo=='A', 'teal': grupoActivo!='A'}" @click="muestragrupo('A')">
      A
    </v-btn>
    <v-btn fab dark small :class="{'pink': grupoActivo=='B', 'teal': grupoActivo!='B'}" @click="muestragrupo('B')">
      B
    </v-btn>
    <v-btn fab dark small :class="{'pink': grupoActivo=='C', 'teal': grupoActivo!='C'}" @click="muestragrupo('C')">
      C
    </v-btn>
    <v-btn fab dark small :class="{'pink': grupoActivo=='D', 'teal': grupoActivo!='D'}" @click="muestragrupo('D')">
      D
    </v-btn>
    <v-btn fab dark small :class="{'pink': grupoActivo=='E', 'teal': grupoActivo!='E'}" @click="muestragrupo('E')">
      E
    </v-btn>
    <v-btn fab dark small :class="{'pink': grupoActivo=='F', 'teal': grupoActivo!='F'}" @click="muestragrupo('F')">
      F
    </v-btn>
    <v-btn fab dark small :class="{'pink': grupoActivo=='G', 'teal': grupoActivo!='G'}" @click="muestragrupo('G')">
      G
    </v-btn>
    <v-btn fab dark small :class="{'pink': grupoActivo=='H', 'teal': grupoActivo!='H'}" @click="muestragrupo('H')">
      H
    </v-btn>
  </div>


<v-data-table
      v-bind:headers="headers"
      :items="partidos_fase_grupos"
      :rows-per-page-items="valorestabla"
      rowsPerPageText="Partidos por vista"
      :pagination.sync="valores_default_tabla"
      class="elevation-1"
    >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.id }}</td>
       <td class="text-xs-right">{{ fechaCorta(props.item.fecha) }} - 
          <span v-if="! horamostrable">{{ fechaHora(props.item.fecha) }}</span>
          <span v-else>{{ fechaHoraLocal(props.item.fecha, props.item.hora) }}</span>
          
          
        </td>
      <!-- <td class="text-xs-right"> {{ props.item.fecha }} </td> -->
      <td class="text-xs-right">{{ props.item.grupo }}</td>
      <td class="text-xs-right">{{ props.item.local }}</td>
      <td @click="muestrapais(props.item.visitante)" class="text-xs-right np_destacapais">{{ props.item.visitante }}</td>
      <td class="text-xs-right">{{ props.item.ciudad }} <br /> {{ props.item.estadio }} </td>
      

    </template>
    <template slot="footer">
      <td colspan="100%">
        <strong>2018 Rev 0.021</strong>
      </td>
    </template>
  </v-data-table>

        


<v-dialog v-model="dialog" persistent max-width="500">
      <v-btn color="primary" dark slot="activator">Open Dialog</v-btn>
      <v-card>
        <v-card-title class="headline">{{ paisactivo }}</v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click.native="dialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </div>
</template>
<script>
import { mapState, mapMutations} from 'vuex'
axios.defaults.baseURL = location.origin
axios.defaults.headers.common['X-WP-Nonce'] = variables_wordpress.nonce
import grupo_rusia from './snippets/Grupo.vue'
export default {
	components: {
		grupo_rusia
	},
	data () {
		return {
			dialog: false,
			notifications: false,
			sound: true,
			widgets: false,
			paisactivo: '',
			grupoActivo: '',
			numero: 11,
			valorestabla: [24, { text: 'Todos', value: -1 }],
			valores_default_tabla: {sortBy: 'fecha'},
			// calendario: [],
			errors: [],
			foca: 'La foca',
			headers: [
				{
					text: '#',
					align: 'left',
					sortable: true,
					value: 'id'
				},
				{ text: 'Fecha', value: 'fecha' },
				{ text: 'Grupo', value: 'grupo' },
				{ text: '', value: 'local' },
				{ text: '', value: 'visitante' },
				{ text: 'Ciudad', value: 'ciudad' }

			]

		}
	},
	created () {
		/* axios.get(`/wp-json/calendario/v1/all/32`)
    .then(response => {
      this.calendario = response.data
    })
    .catch(e => {
      this.errors.push(e.message)
    }) */
	},
	computed: {
		...mapState(['horamostrable', 'datosUsuarioWordpress', 'configuracionPolla', 'calendario']),
		partidos_fase_grupos () {
			if (this.calendario) {
				if (this.grupoActivo === '') {
					var resultado = _.filter(this.calendario, function (elem) { return elem.grupo !== null })
				} else {
					var resultado = this.partidos_grupo(this.grupoActivo)
				}
				return resultado
			}
		}

	},
	methods: {
		...mapMutations(['cambiaHora']),
		cambia_formato_tiempo () {
			this.$store.commit('cambiaHora', !this.horamostrable)
		},
		partidos_grupo (grupo) {
			return _.filter(this.calendario, ['grupo', grupo])
		},
		muestragrupo (grupo) {
			this.grupoActivo = grupo
			// console.log(grupo);
		},
		muestrapais (pais) {
			this.paisactivo = pais
			this.dialog = true
		}
	}
}
</script>
<style>
.np_destacapais{
  font-weight: bolder !important;
  color: red;
  cursor: pointer;
}
</style>

<!-- 
"local": "1",
    "visitante": "2",
    "grupo": "A",
    "fecha": "2018-06-14 18:00:00",
    "ciudad": "Moscú",
    "estadio": "Estadio Olímpico Luzhnikí",
    "hora": "3"
-->