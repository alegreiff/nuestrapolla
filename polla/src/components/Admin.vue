<template>
  <v-container>
    <v-layout row wrap v-if="datosUsuarioWordpress.id==1">
        <v-flex xs12>
            Yo soy el administrador de Nuestra Polla {{ datosUsuarioWordpress.id }}
            Asignar un marcador:
            Llamar al partido en modal. Asignar el marcador. Guardar.
            (Va a WP con el id partido y el LG y el VG)
            Wordpress Guarda el marcador (partidos lg y vg)
            Wordpress llama la tabla pronos y de acuerdo al partido, resultado y pronóstico - comodín asigna puntos y cambia estado de procesado a SI
            Vue recarga las consultas pertinentes para actualizar listados


            WORDPRESS 
        <v-btn @click="reset()" color="primary">RESET</v-btn>
		 -- <v-btn @click="creaPronosNulos()" color="secondary">Marcadores NULOS</v-btn>
		
		<v-btn @click="pdftest()"  block color="primary">Todos los pronos<v-icon right dark>highlight</v-icon> </v-btn> 
        </v-flex>
        <v-flex xs12>

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
                <td @click="muestrapais(props.item)" class="text-xs-center">
                    <span v-if="props.item.lg"> <strong> {{props.item.lg }} </strong> </span>
                    <v-btn 
                    :class="{'primary':props.item.procesado==0, 'error': props.item.procesado==1 }">
                    
                    {{ props.item.local }} 
                    vs 
                    {{ props.item.visitante }}
                    
                    
                    </v-btn>
                    <span v-if="props.item.vg"> <strong> {{props.item.vg }} </strong> </span>
                    </td>
                
                

                </template>
                
            </v-data-table>

        </v-flex>
  </v-layout>
  
  <v-dialog v-model="dialog" persistent max-width="800">
      <v-card>
        <v-card-title class="headline">{{datapartido.id}} </v-card-title>
        <v-card-text>
            <span> {{datapartido.local }}</span>
            <input  type="number" class="np_textinput" min="0" max="21" step="1" v-model="datapartido.lg" number >
             VS
             <span> {{datapartido.visitante }}</span>
            <input  type="number" class="np_textinput" min="0" max="21" step="1" v-model="datapartido.vg" number > 
             <pre> {{datapartido}} </pre> 
            <v-btn @click="salvaMarcadorFinal()" fab dark color="indigo">
                <v-icon dark>add</v-icon>
            </v-btn>
            
            <p> {{ mensaje }} </p>
            
            </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click.native="dialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  
   <v-dialog v-model="resetfull" persistent max-width="800">
      <v-card>
        <v-card-title class="headline">Resultados del reset </v-card-title>
        <v-card-text>
            <p> {{ mensaje }} </p>
            
            </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="resetfull = false">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click.native="resetfull = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
   



  
  <!--<v-layout v-else>
      <v-flex>
          No soy nadie {{ datosUsuarioWordpress.id }}
      </v-flex>
  </v-layout>-->
</v-container>  
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations, mapGetters} from 'vuex'

export default {
	data () {
		return {
			marcadorGuardar: '',
			resetfull: false,
			mensaje: '',
			dialog: false,
			// notifications: false,
			// sound: true,
			fullcalendario: null,
			widgets: false,
			datapartido: '',
			// grupoActivo: '',
			// numero: 11,
			valorestabla: [64],
			valores_default_tabla: {sortBy: 'fecha'},
			// calendario: [],
			errors: [],
			// foca: 'La foca',
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
				{ text: '', value: 'visitante' }

			]

		}
	},
	methods: {
		...mapMutations(['cambiaHora', 'updateCalendario', 'updatePosiciones', 'updatePronos']),
		actualiza_calendario () {
			this.$store.commit('updateCalendario')
		},
		actualiza_posiciones () {
			this.$store.commit('updatePosiciones')
		},
		actualiza_allpronos () {
			this.$store.commit('updatePronos')
		},
		actualizarDatos () {
			axios.get(`/wp-json/fullcalendario/v1/all/`)
				.then(response => {
					this.fullcalendario = response.data
				})
				.catch(e => {
					this.errors.push(e.message)
				})

			this.actualiza_calendario()

			this.actualiza_posiciones()

			this.actualiza_allpronos()
		},

		reset () {
			axios.post(`/wp-json/resetpqy/v1/all/`)
				.then(response => {
					this.resetfull = true
					this.actualizarDatos()
					this.mensaje = response.data
				})
				.catch(e => {
					this.errors.push(e.message)
				})
		},
		creaPronosNulos () {
				axios.get(`/wp-json/resetnulos/v1/all/` + this.fasePolla.fasenumber)
				.then(response => {
					this.resetfull = true
					//this.actualizarDatos()
					this.mensaje = response.data
				})
				.catch(e => {
					this.errors.push(e.message)
				})
		},
		muestrapais (partido) {
			this.mensaje = ''
			this.datapartido = partido
			this.dialog = true
		},
		salvaMarcadorFinal () {
			this.datapartido.id = parseInt(this.datapartido.id)
			this.datapartido.lg = parseInt(this.datapartido.lg)
			this.datapartido.vg = parseInt(this.datapartido.vg)
			if (
				(typeof this.datapartido.id === 'number') && (this.datapartido.id % 1 === 0) &&
          (typeof this.datapartido.lg === 'number') && (this.datapartido.lg % 1 === 0) && (this.datapartido.lg >= 0) &&
          (typeof this.datapartido.vg === 'number') && (this.datapartido.vg % 1 === 0) && (this.datapartido.vg >= 0)
			) {
				axios.post(`/wp-json/actualizamarcador/v1/all/`, {
					partido: this.datapartido.id,
					lg: this.datapartido.lg,
					vg: this.datapartido.vg,
					idloc: this.datapartido.idloc,
					idvis: this.datapartido.idvis
				})
					.then(response => {
						this.actualizarDatos()
						this.mensaje = response.data
					})
					.catch(e => {
						console.log('ERROR ' + e)
					})
			} else {
				this.mensaje = 'algo no va bien'
			}
		},
pdftest(){

      axios({
  url: `/wp-json/generatepdf/v1/all/` + this.polleroID,
  method: 'GET',
  responseType: 'blob', // important
}).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', this.polleroID + '-todos-los-pronos-.pdf');
        document.body.appendChild(link);
        link.click();

          //this.showFile(escape(response.data));
          //console.log(response.data)
          //window.open().document.write(response.data);
          //window.open("data:application/pdf," + escape(response.data)); 
          
				})
				.catch(e => {
          //this.errors.push(e.message)
          console.log("Hay un error en pdftest Diariopolla.vue")
				})
		
    },		

	},
	watch: {

	},
	computed: {
		...mapState(['horamostrable', 'datosUsuarioWordpress', 'configuracionPolla', 'calendario', 'listaequipos', 'proxdata', 'frasesculas', 'sedes', 'allpronos']),
		...mapGetters(['polleroID', 'fasePolla']),
		partidos_fase_grupos () {
			if (this.fullcalendario) {
				// var resultado =  _.filter(this.calendario, function(elem) { return elem.grupo !== null; });

				return this.fullcalendario
			}
		}

	},
	mounted () {
		axios.get(`/wp-json/fullcalendario/v1/all/`)
			.then(response => {
				this.fullcalendario = response.data
			})
			.catch(e => {
				this.errors.push(e.message)
			})
	},
	created () {

	}
}
</script>