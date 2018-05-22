import moment from 'moment'
moment.locale('es') // 'es'
moment.updateLocale('es', {
	monthsShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
})

const FuncionesComunesPLG = {
	// The install method is all that needs to exist on the plugin object.
	// It takes the global Vue object as well as user-defined options.
	install (Vue, options) {
		// We call Vue.mixin() here to inject functionality into all components.
		Vue.mixin({
			// Anything added to a mixin will be injected into all components.
			// In this case, the mounted() method runs when the component is added to the DOM.
			mounted () {
				console.log('Cargado el proyecto')
			},
			data () {
				return {}
			},
			watch: {},
			mounted () {},
			methods: {
				p_amigo(nombre){
					var pa = '';
					var colores = ['red darken-1','red darken-2','red darken-3','red darken-4','pink darken-1','pink darken-2','pink darken-3','pink darken-4','purple darken-1','purple darken-2','purple darken-3']
					var color = ''
					switch(nombre){
						case 'Alfonso Acosta':
							pa = 'AA'
							color = colores[0]
							break;
						case 'Diego Urrutia':
							pa = 'DU'
							color = colores[1]
							break;
						case 'Esteban Muñoz':
							pa = 'EM'
							color = colores[2]
							break;
						case 'Federico Arango':
							pa = 'FA'
							color = colores[3]
							break;
						case 'Jaime de Greiff':
							pa = 'JD'
							color = colores[4]
							break;
						case 'Luis Carlos Urrutia':
							pa = 'LU'
							color = colores[5]
							break;
						case 'Luis Fernando Velasco':
							pa = 'LV'
							color = colores[6]
							break;
						case 'Miller Sánchez':
							pa = 'MS'
							color = colores[7]
							break;
						case 'Natalia Guerrero':
							pa = 'NG'
							color = colores[8]
							break;
						case 'Ricardo Ramírez':
							pa = 'RR'
							color = colores[9]
							break;
						default:
							pa = '##';
							color = colores[10]
						
					}
					var sale = new Array();
					sale['pollero']= pa;
					sale['col'] = color;
					return sale;
				},
				diferencia (fin, inicio) {
					var startTime = moment(inicio)
					var endTime = moment(fin)

					var duration = moment.duration(endTime.diff(startTime))
					var hours = duration.asHours()
					return hours
				},
				fechaDia (fecha) {
					if (moment(fecha).isValid()) {
						return moment(fecha).format('dddd')
					} else {
						return ''
					}
				},
				fechaCorta (fecha) {
					if (moment(fecha).isValid()) {
						return moment(fecha).format('MMM D')
					} else {
						return ''
					}
				},
				fechaCompleta (fecha) {
					if (moment(fecha).isValid()) {
						return moment(fecha).format('dddd, MMMM D YYYY, h:mm:ss a')
					} else {
						return ''
					}
				},
				fechaHoraLocal (fecha, diff) {
					if (moment(fecha).isValid()) {
						var ladiff = -(5 + parseInt(diff))
						return moment(fecha).add(ladiff, 'hours').format('h:mm A')
					} else {
						return ''
					}
				},
				fechaHora (fecha) {
					if (moment(fecha).isValid()) {
						return moment(fecha).format('h:mm A')
					} else {
						return ''
					}
				},
				eventosFecha (fecha) {
					if (moment(fecha).isValid()) {
						return moment(fecha).format('YYYY[-]MM[-]DD')
					}
				},
				lafecha (){
					//Si la fecha es menor que 2018 - 06 - 14
					// Muestra 2018 - 06 - 14
					// Si no... muestra la fecha
					var fechabase = '2018-06-14';
					var fechaactual = moment().format('YYYY[-]MM[-]DD');
					var lafecha = '';
					fechaactual < fechabase ? lafecha = fechabase : lafecha = fechaactual;
					return lafecha;
					
					//return moment().format('YYYY[-]MM[-]DD');
				}

			}
		})
	}
}
export default FuncionesComunesPLG
