import Admin from './components/Admin.vue'
import Diariopolla from './components/Diariopolla.vue'
import StartPolla from './components/StartPolla.vue'
import PronosMobile from './components/PronosMobile.vue'
import Calendar from './components/Calendar.vue'
import Polleros from './components/Polleros.vue'
import Misspronos from './components/Misspronos.vue'
import Clasificador from './components/ClasificaPartidos.vue'
import Reglamento from './components/Reglamento.vue'
import ControlPA from './components/ControlPollerosAmigos.vue'
import inicioprov from './components/inicioprov.vue'
import posicionesEquipos from './components/posFulbol.vue'
/*import HallFama from './components/hallFama.vue'*/




export const routes = [
	{path: '/', component: Diariopolla},
	{path: '/pdfs', component: inicioprov},
	//{path: '/diariopolla', component: Diariopolla},//
	{path: '/pronos', component: PronosMobile},
	{path: '/calendario', component: Calendar},
	{path: '/polladmin', component: Admin},
	{path: '/posiciones', component: Polleros},
	{path: '/compara', component: Misspronos},
	{path: '/clasificador', component: Clasificador},
	{path: '/reglamento', component: Reglamento},
	{path: '/amigopollero', component: ControlPA},
	//{path: '/provis', component: StartPolla},
	{path: '/reglamento', component: Reglamento},
	{path: '/grupos', component: posicionesEquipos},
	/*{path: '/hallfama', component: HallFama},*/
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