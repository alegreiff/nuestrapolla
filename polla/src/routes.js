import Admin from './components/Admin.vue'
import Diariopolla from './components/Diariopolla.vue'
import StartPolla from './components/StartPolla.vue'
import PronosMobile from './components/PronosMobile.vue'
import Calendar from './components/Calendar.vue'
import Polleros from './components/Polleros.vue'
import Misspronos from './components/Misspronos.vue'
import Clasificador from './components/ClasificaPartidos.vue'
import Reglamento from './components/Reglamento.vue'



export const routes = [
	{path: '/', component: StartPolla},
	{path: '/diariopolla', component: Diariopolla},
	{path: '/pronos', component: PronosMobile},
	{path: '/calendario', component: Calendar},
	{path: '/polladmin', component: Admin},
	{path: '/posiciones', component: Polleros},
	{path: '/mispronos', component: Misspronos},
	{path: '/clasificador', component: Clasificador},
	{path: '/reglamento', component: Reglamento},
	{path: '/nouser',
    beforeEnter(to, from, next) {
        window.location = "../"
	}},
	{path: '/miperfil',
    beforeEnter(to, from, next) {
		var root = location.protocol + '//' + location.host + '/pollero';
        window.location = root
    }}
]