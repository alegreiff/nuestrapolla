<template>
<v-layout>
    <v-flex xs12>
        <b-table
            :data="isEmpty ? [] : partidos_fase_grupos"
            :bordered="isBordered"
            :striped="isStriped"
            :narrowed="isNarrowed"
            :hoverable="isHoverable"
            :loading="isLoading"
            :mobile-cards="hasMobileCards">
            <template slot-scope="props">
                <b-table-column label="Día" width="120">
                    {{ fechaDia(props.row.fecha) }}
                </b-table-column>

                <b-table-column label="Ciudad">
                     +{{ (props.row.hora) }}<v-icon>timelapse</v-icon> {{ props.row.ciudad }} 
                     <v-btn flat icon color="indigo" @click="infoCiudad(props.row.locacion)"><v-icon>star</v-icon></v-btn>
                </b-table-column>

                <b-table-column :label="horamostrable ? 'Hora Colombia' : 'Hora Rusia' " sortable field="fecha">
                    <span data-th="Colombia" class="text-right" v-if="horamostrable">{{ fechaCorta(props.row.fecha) }} {{ fechaHoraLocal(props.row.fecha, (props.row.hora)) }}</span>
                    <span data-th="Hora local" class="text-right" v-else>{{ fechaCorta(props.row.fecha) }} {{ fechaHora(props.row.fecha)}}</span>
                </b-table-column>
                <b-table-column label="Partido" centered>
                    {{ (props.row.local) }} vs {{ (props.row.visitante) }}
                </b-table-column>
                <b-table-column label="Exclusivo" centered sortable field="dtv">
                    {{ props.row.dtv }}
                </b-table-column>
                <b-table-column label="Procesado">
                    {{ miresultado(props.row.id) }}
                </b-table-column>
                <b-table-column label="Mí pronóstico">
                    {{ miprono(props.row.id) }}
                </b-table-column>
                <b-table-column label="Marcador" centered v-if="props.row.procesado===1">
                    {{ (props.row.lg) }} - {{ (props.row.vg) }}
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
    </v-flex>
<template>
<v-layout row justify-center>
<v-dialog v-model="dialog2" max-width="500px">
    <v-card>
        <v-card-title>
        Dialog 2
        </v-card-title>
        <v-card-text v-if="ciudadactiva">
        <span class="estadio_icono bigstadium" :class="'est'+ ciudadactiva"></span>
        
        <img :src="'/assets/ciudades/'+ciudadactiva + '.jpg'" alt="" class="np_posteresciudad">
        </v-card-text>
        <v-card-actions>
        <v-btn color="primary" flat @click.stop="dialog2=false">Close</v-btn>
        </v-card-actions>
        </v-card>
</v-dialog>
</v-layout>
</template>
</v-layout>



</template>
<script>
import { mapState, mapMutations, mapGetters} from 'vuex'
export default {
	data () {
/*const tableDataSimple = [
                
                
]     */   
		return {
                //tableDataSimple,
                isEmpty: false,
                isBordered: false,
                isStriped: false,
                isNarrowed: false,
                isHoverable: false,
                isLoading: false,
                hasMobileCards: true,
            grupoActivo: '',
                dialog2: false,
                ciudadactiva: null
			
			}
	},
	created () {
	},
	computed: {
        ...mapState(['horamostrable', 'datosUsuarioWordpress', 'configuracionPolla']),
        ...mapGetters(['pronosticosPolleroActivo', 'calendario']),
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
        },
        miprono(partido){
            var tempo = _.filter(this.pronosticosPolleroActivo, ['partido', partido])[0];
            if(tempo){
                return tempo.m_loc + ' - ' + tempo.m_vis;
            }else{
                return "ERR X1";
            }
        },
        miresultado(partido){
            var tempo = _.filter(this.pronosticosPolleroActivo, ['partido', partido])[0];
            if(tempo){
                if(tempo.procesado === "SI"){
                    return tempo.resultado+ " - " +tempo.puntos;
                }else{
                    return "ND";
                }
            }else{
                return "ERR";
            }
        },
        infoCiudad(ciudad){
            console.log(ciudad)
            this.ciudadactiva = ciudad;
            this.dialog2 = true;
        }
	}
}
</script>