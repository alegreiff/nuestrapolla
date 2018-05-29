import Vue from 'vue'
import Buefy from 'buefy'
import VueRouter from 'vue-router'
import {routes} from './routes'
import App from './App.vue'
// import '../node_modules/vuetify/dist/vuetify.min.css'
import { datos} from './Data/datos_vuex'
import Vuetify from 'vuetify'
import FuncionesComunesPLG from './Data/funcionesComunes.js'
import VueCharts from  'vue-charts'
import { mapState, mapMutations} from 'vuex'
Vue.use(VueCharts)
Vue.use(Buefy)
import VueYouTubeEmbed from 'vue-youtube-embed'
Vue.use(VueYouTubeEmbed)

Vue.use(require('vue-shortkey'))
Vue.use(FuncionesComunesPLG)
Vue.config.devtools = true //producción false desarrollo true

Vue.use(Vuetify, {
	theme: {
		primary: '#1976D2',
		secondary: '#424242',
		accent: '#82B1FF',
		error: '#FF5252',
		info: '#2196F3',
		success: '#4CAF50',
		warning: '#FFC107',
		pollarojo: '#EC1C24',
		pollarojo2: '#AC1C23',
		pollarojo3: '#631E21',
		pollacrema: '#F1EBA8',
		pollagris: '#817C5E',
		pollanegro: '#1D191C',
	}
  })

Vue.use(VueRouter)

const router = new VueRouter({
	routes: routes
})
new Vue({
	methods:{
		...mapMutations(['updateAllPolleros']),
		actualiza_polleros () {
			this.$store.commit('updateAllPolleros')
		},
	},
	mounted(){
		if(this.userid){
			//console.log("hay usuario")
		}else{
			this.$router.push('/nouser')
		}
	},
	created () {
		//console.dir(variables_wordpress);
		//console.log(JSON.stringify(variables_wordpress))

		//
		this.actualiza_polleros()
		this.$store.state.datosUsuarioWordpress = variables_wordpress
		this.userid = parseInt(variables_wordpress['id'])
		
		if (this.userid) {
			axios.get(`/wp-json/getpronosuser/v1/all/` + this.userid)
				.then(response => {
					this.$store.state.configuracionPolla[0].pronos = response.data
				})
				.catch(e => {
					this.errors.push(e.message)
				})
		}else{
			//console.log("pasa por main 74")
		}

		axios.get(`/wp-json/calendario/v1/all/32`)
			.then(response => {
				this.$store.state.calendario = response.data
			})
			.catch(e => {
				this.errors.push(e.message)
			})

			axios.get(`/wp-json/calendario/v1/all/32`)
			.then(response => {
				this.$store.state.calendarioparapronos = response.data
			})
			.catch(e => {
				this.errors.push(e.message)
			})
		axios.get(`/wp-json/listaequipos/v1/all/`)
			.then(response => {
				this.$store.state.listaequipos = response.data
			})
			.catch(e => {
				this.errors.push(e.message)
			})

		axios.get(`/wp-json/todoslospronos/v1/all/`)
			.then(response => {
				this.$store.state.allpronos = response.data
			})
			.catch(e => {
				this.errors.push(e.message)
			})

		axios.get(`/wp-json/posiciones/v1/all/`)
			.then(response => {
				this.$store.state.posiciones = response.data
			})
			.catch(e => {
				this.errors.push(e.message)
			})

		axios.get(`/wp-json/listasedes/v1/all/`)
			.then(response => {
				this.$store.state.sedes = response.data
			})
			.catch(e => {
				this.errors.push(e.message)
			})
	},
	router: router,
	store: datos,
	userid: '',
	el: '#app',
	render: h => h(App),
	errors: {}
})
