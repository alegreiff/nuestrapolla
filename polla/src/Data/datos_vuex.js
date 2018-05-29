import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export const datos = new Vuex.Store({
	state: {
		allpronos: null,
		allpolleros: null,
		posiciones: null,
		lastmatch: null,
		sedes: [],
		
		pollerosamigos: [
			{id: 18, 	sigla: 'AA', nombre: 'Alfonso Acosta'}, 
			{id: 0, 	sigla: 'DU', nombre: 'Diego Urrutia'},
			{id: 6, 	sigla: 'EM', nombre: 'Esteban Muñoz'},
			{id: 19, 	sigla: 'FA', nombre: 'Federico Arango'},
			{id: 2, 	sigla: 'JD', nombre: 'Jaime de Greiff'},
			{id: 10, 	sigla: 'LU', nombre: 'Luis Carlos Urrutia'},
			{id: 7, 	sigla: 'LV', nombre: 'Luis Fernando Velasco'},
			{id: 0, 	sigla: 'MS', nombre: 'Miller Sánchez'},
			{id: 0, 	sigla: 'AP', nombre: 'Alejandro Pardo'},
			{id: 11, 	sigla: 'RR', nombre: 'Ricardo Ramírez'},
			{id: 29, 	sigla: 'MC', nombre: 'Marcela Cortés'},
			{id: 0, 	sigla: '##', nombre: 'OTRO'}
		],
		/*
		*/
		valorequipos: [
			{nombre: 'Colombia', equipo: 31, puntos: 989, interes: 1000},
			{nombre: 'Uruguay', equipo: 4, puntos: 976, interes: 800}, 
			{nombre: 'Brasil', equipo: 17, puntos: 1384, interes: 800},
			{nombre: 'Polonia', equipo: 29, puntos: 1128, interes: 900}, 
			{nombre: 'Argentina', equipo: 13, puntos: 1254, interes: 800},
			{nombre: 'Alemania', equipo: 21, puntos: 1544, interes: 800},
			{nombre: 'Bélgica', equipo: 25, puntos: 1346, interes: 700}, 
			{nombre: 'Rusia', equipo: 1, puntos: 493, interes: 700}, 
			{nombre: 'España', equipo: 6, puntos: 1162, interes: 600}, 
			{nombre: 'Senegal', equipo: 30, puntos: 825, interes: 600}, 
			{nombre: 'Inglaterra', equipo: 28, puntos: 1040, interes: 600},
			{nombre: 'Japón', equipo: 32, puntos: 528, interes: 600},
			{nombre: 'Francia', equipo: 9, puntos: 1166, interes: 600},
			{nombre: 'Egipto', equipo: 3, puntos: 636, interes: 600}, 
			{nombre: 'Nigeria', equipo: 16, puntos: 635, interes: 500}, 
			{nombre: 'Suecia', equipo: 23, puntos: 889, interes: 500}, 
			{nombre: 'Marruecos', equipo: 7, puntos: 681, interes: 500},
			{nombre: 'Perú', equipo: 11, puntos: 1106, interes: 500}, 
			{nombre: 'Portugal', equipo: 5, puntos: 1306, interes: 400},
			{nombre: 'Dinamarca', equipo: 12, puntos: 1054, interes: 400},
			{nombre: 'Islandia', equipo: 14, puntos: 930, interes: 400}, 
			{nombre: 'Croacia', equipo: 15, puntos: 975, interes: 400}, 
			{nombre: 'México', equipo: 22, puntos: 1008, interes: 400}, 
			{nombre: 'Costa Rica', equipo: 19, puntos: 858, interes: 300},
			{nombre: 'Serbia', equipo: 20, puntos: 732, interes: 300}, 
			{nombre: 'Australia', equipo: 10, puntos: 700, interes: 200},
			{nombre: 'Suiza', equipo: 18, puntos: 1179, interes: 200}, 
			{nombre: 'Corea del Sur', equipo: 24, puntos: 520, interes: 200}, 
			{nombre: 'Panamá', equipo: 26, puntos: 574, interes: 200}, 
			{nombre: 'Arabia Saudita', equipo: 2, puntos: 462, interes: 100}, 
			{nombre: 'Túnez', equipo: 27, puntos: 1012, interes: 100}, 
			{nombre: 'Irán', equipo: 8, puntos: 727, interes: 100},
		],
		//plandepremios:[50,20,10,15,5],
		plandepremios: {cuota:150000, fee:20, porcentajes: [50, 20, 10, 10, 5, 5, 100] },
		frasesculas: [
			'A esa edad se juega por plata, por compromiso, por durar un año más. Pero ya no hay ilusión. Y el fútbol es ilusión',
			'Con Italia sería a otro precio',
			'De los equipos de diez hombres, líbranos señor (Atte., equipo de nueve hombres)',
			'Dios es colombiano',
			'Dios estaba con nosotros, pero el árbitro no',
			'El fútbol es mucho más que una cuestión de vida o muerte',
			'El fútbol es sencillo. Somos once contra doce',
			'El fútbol es un deporte que inventaron los ingleses, juegan once contra once y siempre gana Alemania',
			'Equipo que sale a ganar, empata; equipo que sale a empatar, pierde',
			'Equipos ladrones y el Real Madrid',
			'Excelentes pronósticos. Sigue así',
			'Gasté mucho dinero en coches, alcohol y mujeres. El resto lo he malgastado',
			'Jugamos como nunca y perdimos como siempre',
			'Lo del gol de Yepes es pura carreta',
			'Lástima el Unión Magdalena',
			'Messi y diez más',
			'No es mi polla, no es tu polla. Es Nuestra Polla',
			'No seas el Chile de la polla',
			'Nos robaron otra vez',
			'Ojo con Holanda, puede dar la sorpresa',
			'Para ganar un partido, se necesitan 90 minutos. Para perderlo, basta con uno',
			'Primera polla con VAR y sin Bar',
			'Pronto aprendí que la pelota nunca viene hacia uno por donde uno espera que venga',
			'Se juega como se vive',
			'Se pierde y se gana',
			'Si le haces un gol a tu exequipo, ¡celébralo!',
			'Un bello mundial sin Estados Unidos',
			'Un partido sin goles es como un domingo sin sol',
			'ya pagó su polla. Ojalá',
			'¿7 mil por escudo? Espere a que arranque el mundial, apuesto a que bajan a mil pesos',
			'¿A quién robará Roldán?',
			'¿De verdad sigue pensando si fue o no gol de Yepes?',
			'¿Está haciendo sus pronósticos pensando que hay un árbitro?',
			'¿Llegaremos a Qatar? Si no, ¿vamos a catar?',
			'¿ya despegaron a Paolo Guerrero',
			'¿Ya pagó su polla? Llame ya a su pollero amigo'
		],
		listaequipos: [],
		horamostrable: true,
		calendario: null,
		calendarioparapronos: [],
		datosUsuarioWordpress: [],
		proxdata: [],
		primerMundial:[
			{mundial: 'Corea - Japón 2002', poster: '2002'},
			{mundial: 'Francia 1998', poster: '1998'},
			{mundial: 'USA 1994', poster: '1994'},
			{mundial: 'Italia 1990', poster: '1990'},
			{mundial: 'México 1986', poster: '1986'},
			{mundial: 'España 1982', poster: '1982'},
			{mundial: 'Argentina 1978', poster: '1978'},
			{mundial: 'Alemania 1974', poster: '1974'},
			{mundial: 'México 1970', poster: '1970'},
			{mundial: 'Inglaterra 1966', poster: '1966'},
			{mundial: 'Chile 1962', poster: '1962'},
			{mundial: 'Suecia 1958', poster: '1958'},
			{mundial: 'Suiza 1954', poster: '1954'},
			{mundial: 'Brasil 1950', poster: '1950'},
			{mundial: 'Francia 1938', poster: '1938'},
			{mundial: 'Italia 1934', poster: '1934'},
			{mundial: 'Uruguay 1930', poster: '1930'}
		],
		escudoscolombia: [
			{equipo: 'Hincha del fútbol', escudo: 'futbol'},
			{equipo: 'Águilas Doradas', escudo: 'aguilas'}, //NO
			{equipo: 'Alianza Petrolera', escudo: 'petrolera'},
			{equipo: 'América de Cali', escudo: 'america'},
			{equipo: 'Atlético Bucaramanga', escudo: 'bucaramanga'},
			{equipo: 'Atlético Huila', escudo: 'huila'},
			{equipo: 'Atlético Junior', escudo: 'junior'},
			{equipo: 'Atlético Nacional', escudo: 'nacional'},
			{equipo: 'Chicó FC', escudo: 'chico'},
			{equipo: 'Cortuluá', escudo: 'cortulua'},
			{equipo: 'Cúcuta', escudo: 'cucuta'},
			{equipo: 'Deportes Tolima', escudo: 'tolima'},
			{equipo: 'Deportivo Cali', escudo: 'cali'},
			{equipo: 'Deportivo Pasto', escudo: 'pasto'},
			{equipo: 'Deportivo Pereira', escudo: 'pereira'},
			{equipo: 'Deportes Quindío', escudo: 'quindio'},
			{equipo: 'Envigado FC', escudo: 'envigado'},
			{equipo: 'Fortaleza', escudo: 'fortaleza'},
			{equipo: 'Independiente Medellín', escudo: 'medellin'},
			{equipo: 'Independiente Santa Fe', escudo: 'santafe'},
			{equipo: 'Jaguares de Córdoba', escudo: 'jaguares'},
			{equipo: 'La Equidad', escudo: 'equidad'},
			{equipo: 'Leones FC', escudo: 'leones'},//NO
			{equipo: 'Millonarios', escudo: 'millos'},
			{equipo: 'Once Caldas', escudo: 'caldas'},
			{equipo: 'Patriotas FC', escudo: 'patriotas'},
			{equipo: 'Real Cartagena', escudo: 'cartagena'},
			{equipo: 'Tigres FC', escudo: 'tigres'}, //NO
			{equipo: 'Unión Magdalena', escudo: 'union'}
		],
		configuracionPolla: [{
		faseactiva: 'grupos',
			grupos: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
				fechas: [{
					fase: 'grupos',
					iniciolimite: '2018-05-18 00:01:00',
					finlimite: '2018-06-12 23:59:00',
					comodines: 2,
					partidos: 48,
					ptsPARCIAL: 3,
					ptsFULL: 5,
					fasenumber: 32
					
					},
					{
					fase: 'octavos',
					iniciolimite: '2018-06-28 15:00:00',
					finlimite: '2018-06-29 23:00:00',
					comodines: 2,
					partidos: 8,
					ptsPARCIAL: 6,
					ptsFULL: 10,
					fasenumber: 8
					
					},
					{
					fase: 'cuartos',
					iniciolimite: '2018-07-03 15:00:00',
					finlimite: '2018-07-05 15:00:00',
					comodines: 2,
					partidos: 4,
					ptsPARCIAL: 10,
					ptsFULL: 15,
					fasenumber: 4
					
					},
					{
					fase: 'semifinales',
					iniciolimite: '2018-07-07 16:00:00',
					finlimite: '2018-07-09 15:00:00',
					comodines: 1,
					partidos: 2,
					ptsPARCIAL: 15,
					ptsFULL: 20,
					fasenumber: 2
					
					},
					{
					fase: 'finales',
					iniciolimite: '2018-07-11 16:00:00',
					finlimite: '2018-07-13 15:00:00',
					comodines: 1,
					partidos: 2,
					ptsPARCIAL: 20,
					ptsFULL: 25,
					fasenumber: 1
					
					}
				],
				pronos: null
			}
			,{
				text: 'Fecha',
				value: 'fecha'
			}
		]
	},
	getters: {
		allpolleros: (state) => {
			_.each(state.allpolleros, item => item.id = parseInt(item.id))
			_.each(state.allpolleros, item => item.pollero = item.pollero.toLowerCase())
			_.each(state.allpolleros, item => item.pollero = item.pollero[0].toUpperCase() + item.pollero.slice(1))
			return state.allpolleros
		},
		allpollerosHome: (state, getters) => {
			var temp = _.cloneDeep(getters.allpolleros);
			return temp
		},
		valueequipos: (state) => {
			//_.each(state.allpolleros, item => item.id = parseInt(item.id))
			return state.valorequipos
		},
		ultimopartido: (state) => {
			return state.lastmatch
		},
		calendario:(state) => {
			_.each(state.calendario, item => item.id = parseInt(item.id))
			_.each(state.calendario, item => item.fase = parseInt(item.fase))
			_.each(state.calendario, item => item.hora = parseInt(item.hora))
			_.each(state.calendario, item => item.idloc = parseInt(item.idloc))
			_.each(state.calendario, item => item.idvis = parseInt(item.idvis))
			_.each(state.calendario, item => item.lg = parseInt(item.lg))
			_.each(state.calendario, item => item.vg = parseInt(item.vg))
			_.each(state.calendario, item => item.procesado = parseInt(item.procesado))
			_.each(state.calendario, item => item.locacion = parseInt(item.locacion))
			_.each(state.calendario, item => item.dtv = parseInt(item.dtv))
			return state.calendario

		},
		consolidadoPronos: (state) => {
			_.each(state.allpronos, item => item.id = parseInt(item.id))
			_.each(state.allpronos, item => item.cambios = parseInt(item.cambios))
			_.each(state.allpronos, item => item.id_jugador = parseInt(item.id_jugador))
			_.each(state.allpronos, item => item.m_loc = parseInt(item.m_loc))
			_.each(state.allpronos, item => item.m_vis = parseInt(item.m_vis))
			_.each(state.allpronos, item => item.partido = parseInt(item.partido))
			_.each(state.allpronos, item => item.puntos = parseInt(item.puntos))
			return state.allpronos
		},
		calendarioArray: (state) => {
			_.each(state.calendario, item => item.id = parseInt(item.id))
			var arr = _.values(state.calendario);
			return arr
		},
		polleroID:(state) => {
			return parseInt(state.datosUsuarioWordpress.id);
		},
		polleroFoto:(state) =>{
			return (state.datosUsuarioWordpress.foto);
		},
		polleroFavoritos:(state) =>{
			return (state.datosUsuarioWordpress.favoritos);
		},
		eltiempo:(state) => {
			return (state.datosUsuarioWordpress.tiempo);
		},
		elplandepremios:(state) => {
			return (state.plandepremios);
		},
		losOtrosPolleros: (state, getters) => {
			//console.table(getters.allpolleros)
			var temp = _.cloneDeep(getters.allpolleros);
			temp = _.orderBy(temp, [user => user.pollero.toLowerCase()], ['asc']);
			temp = _.reject(temp, { 'id': getters.polleroID }); 
			return temp
		},
		fasePolla: (state) =>  {
			var faseActive = state.configuracionPolla[0].faseactiva
			//console.log(faseActive);
			//return state.configuracionPolla[0].fechas.find(configuracionPolla => configuracionPolla.fase === faseActive)
			return (_.filter(state.configuracionPolla[0].fechas, ['fase', faseActive]))[0]
			 //state.escudoscolombia.find(escudoscolombia => escudoscolombia.equipo === id)
		},
		escudoFPC: (state) => (id) => {
			return state.escudoscolombia.find(escudoscolombia => escudoscolombia.equipo === id)
		},
		equipoFavoritoID: (state) => (id) => {
			var tempo = state.valorequipos.find(valorequipos => valorequipos.nombre === id)
			return tempo.equipo;
			//{nombre: 'Japón', equipo: 32, puntos: 528, interes: 600},
		},
		primerMundial: (state) => (id) => {
			return state.primerMundial.find(primerMundial => primerMundial.mundial === id)
		},
		puestoPollero(state, getters) {
			if (getters.posicionesNumericas && getters.polleroID != 1) {
				var s = _.findIndex(getters.posicionesNumericas, { 'm_loc': getters.polleroID})
				return getters.posicionesNumericas[s];
			} else {
				return ''
			}
		},
		statistics(state, getters){
			var golesporprono = _.cloneDeep(getters.consolidadoPronos)
			//golesporprono = _.filter(golesporprono, { 'm_loc': NaN, 'm_vis': NaN });
			golesporprono = _.filter(golesporprono, function(o) { return o.m_loc >= 0 ; });
			for(var i in golesporprono){
				//golesporprono[i].gxp = golesporprono[i].m_loc + golesporprono[i].m_vis
				
					golesporprono[i].gxp = golesporprono[i].m_loc + golesporprono[i].m_vis;
				
				
			}
			//var sumagxp = _.groupBy(golesporprono, function(num) {
			var sumagxp = _.countBy(golesporprono, function(num) {
					return num.gxp;
			});
			var agrupado = _.cloneDeep(getters.consolidadoPronos)
			agrupado = _.filter(agrupado, function(o) { return o.m_loc >= 0 ; });
			for(var i in agrupado){
				
					if(agrupado[i].m_loc < agrupado[i].m_vis ){
						agrupado[i].m0 = agrupado[i].m_vis
						agrupado[i].m1 = agrupado[i].m_loc
					}else if(agrupado[i].m_loc > agrupado[i].m_vis){
						agrupado[i].m0 = agrupado[i].m_loc
						agrupado[i].m1 = agrupado[i].m_vis
					}else{
						agrupado[i].m0 = agrupado[i].m_loc
						agrupado[i].m1 = agrupado[i].m_vis
					}
				
			}
			var result = _.countBy(agrupado, function(num) {
					return num.m0 + ' - ' + num.m1;
			});
			var salida = new Object()
			var goles = 0
			var partidos = 0
			var victorias = 0
			var empates = 0
			for (var i in getters.consolidadoPronos){
				//console.log("LOCAL " + getters.consolidadoPronos[i].m_loc + " -vs- " + getters.consolidadoPronos[i].m_vis)
				if((isNaN(getters.consolidadoPronos[i].m_loc)) && (isNaN(getters.consolidadoPronos[i].m_vis))){
					
				}else{
					partidos++
					goles+= getters.consolidadoPronos[i].m_loc
					goles+= getters.consolidadoPronos[i].m_vis
					if(getters.consolidadoPronos[i].m_loc === getters.consolidadoPronos[i].m_vis){
						empates++
					}else{
						victorias++
					}
				}
			}
			salida['sumagxp']=sumagxp
			salida['grupo']=result
			salida['prom']=goles / partidos
			salida['goles']=goles
			salida['empates']=empates
			salida['victorias']=victorias
			salida['partidos']=partidos
			return salida
		},
		posicionesQPS(state, getters){
			return _.cloneDeep(getters.posicionesNumericas)
		},
		pronosticosPolleroActivo:(state, getters) =>{
			//_.each(state.allpronos, item => item.partido = parseInt(item.partido))
			//_.each(state.allpronos, item => item.m_loc = parseInt(item.m_loc))
			//_.each(state.allpronos, item => item.m_vis = parseInt(item.m_vis))
			var temp =  _.filter(getters.consolidadoPronos, ['id_jugador', (getters.polleroID)])
			return  _.orderBy(temp, [prono => prono.partido], ['asc']);
		},
		pronosticosPolleroComparado: (state, getters) => (id) => {
			var temp = _.cloneDeep(getters.consolidadoPronos)
			//console.log(id)
			//console.table(temp)
			temp =  _.filter(temp, ['id_jugador', id])
			return  _.orderBy(temp, [prono => prono.partido], ['asc']);
		},
		posicionesNumericas: (state) => {
			_.each(state.posiciones, item => item.id_jugador = parseInt(item.id_jugador))
			_.each(state.posiciones, item => item.puntaje = parseInt(item.puntaje))
			_.each(state.posiciones, item => item.partidos = parseInt(item.partidos))
			_.each(state.posiciones, item => item.GRANCHEPAZO = parseInt(item.GRANCHEPAZO))
			_.each(state.posiciones, item => item.DOBLE = parseInt(item.DOBLE))
			_.each(state.posiciones, item => item.EXACTO = parseInt(item.EXACTO))
			_.each(state.posiciones, item => item.SENCILLO = parseInt(item.SENCILLO))
			_.each(state.posiciones, item => item.BLANCOSIMPLE = parseInt(item.BLANCOSIMPLE))
			_.each(state.posiciones, item => item.BLANCOCONCOMODIN = parseInt(item.BLANCOCONCOMODIN))
			_.each(state.posiciones, item => item.USOCOM = parseInt(item.USOCOM))
			_.each(state.posiciones, item => item.NULO = parseInt(item.NULO))

			for (var i in state.posiciones) {
				state.posiciones[i].status = (state.posiciones[i].puntaje + '|' + state.posiciones[i].GRANCHEPAZO + '|' + state.posiciones[i].DOBLE + '|' + state.posiciones[i].EXACTO + '|' + state.posiciones[i].SENCILLO + '|' + state.posiciones[i].BLANCOSIMPLE + '|' + state.posiciones[i].BLANCOCONCOMODIN + '|' + state.posiciones[i].USOCOM + '|' + state.posiciones[i].NULO);
				state.posiciones[i].pos = +i + +1;

				if (i > 0) {
					if (state.posiciones[i].status === state.posiciones[i - 1].status) {
						state.posiciones[i].pos = state.posiciones[i - 1].pos;
					}
				}
			}
			for (var i in state.posiciones) {
				if (i > 0) {
					if (state.posiciones[i].status === state.posiciones[i - 1].status) {
						state.posiciones[i].pos = state.posiciones[i - 1].pos;
					}
				}
			}
			return state.posiciones;
		},
		nombrePollero: (state) => {
			var tempo = state.datosUsuarioWordpress.data[0]
			tempo = tempo.toLowerCase()
			tempo = tempo[0].toUpperCase() + tempo.slice(1)
			return tempo
		},
		partidosProcesados: (state, getters) => {
			var procesados = _.filter(getters.consolidadoPronos, {
				'procesado': 'SI'
			})
			return procesados
		},
		partidosProcesadosSencillo: (state, getters) => (id) => {
			var procesados = _.filter(getters.consolidadoPronos, {
				'partido': id
			})
			return procesados
		},
		/*pronosticosPolleroComparado: (state, getters) => (id) => {
			var temp = _.cloneDeep(getters.consolidadoPronos)
			console.log(id)
			console.table(temp)
			temp =  _.filter(temp, ['id_jugador', id])
			return  _.orderBy(temp, [prono => prono.partido], ['asc']);
		},*/
		puntosPollero: (state, getters) => {
			var misPronos = _.filter(state.allpronos, {
				'id_jugador': getters.polleroID,
				'procesado': 'SI'
			})
			var tempo = _.each(misPronos, item => item.puntos = parseInt(item.puntos))
			var puntos = _.sumBy(tempo, function (o) {
				return o.puntos
			})
			var procesados = _.size(tempo)
			var COMODINBLANCO = _.size(_.filter(tempo, ['resultado', 'COMODINBLANCO']))
			var BLANCO = _.size(_.filter(tempo, ['resultado', 'BLANCO']))
			var SENCILLO = _.size(_.filter(tempo, ['resultado', 'SENCILLO']))
			var EXACTO = _.size(_.filter(tempo, ['resultado', 'EXACTO']))
			var DOBLE = _.size(_.filter(tempo, ['resultado', 'DOBLE']))
			var FULL = _.size(_.filter(tempo, ['resultado', 'FULL']))
			var NULO = _.size(_.filter(tempo, ['resultado', 'NULO']))
			var salida = new Object()
			salida['pronos'] = tempo
			salida['puntos'] = puntos
			salida['procesados'] = procesados
			salida['fichas'] = [{
					nombre: 'Granchepazo',
					puntos: FULL,
					comodin: true
				},
				{
					nombre: 'Doble',
					puntos: DOBLE,
					comodin: true
				},
				{
					nombre: 'Chepazo',
					puntos: EXACTO,
					comodin: false
				},
				{
					nombre: 'Simple',
					puntos: SENCILLO,
					comodin: false
				},
				{
					nombre: 'Blanco',
					puntos: BLANCO,
					comodin: false
				},
				{
					nombre: 'Paila',
					puntos: COMODINBLANCO,
					comodin: true
				}
			]
			return salida
		}


	},
	actions: {

	},
	mutations: {
		cambiaHora: (state, valor) => state.horamostrable = valor,
		updateCalendario(state) {
			axios.get(`/wp-json/calendario/v1/all/32`)
				.then(response => {
					state.calendario = response.data
					//console.log("::::::::::::::::::::::::::::::::::::::::::CALENDARIO ACTUALIZA+DO");
				})
				.catch(e => {
					//console.log(e.message + ' En UPDATE CALENDARIO')
				})
		},
		updatePosiciones(state) {
			axios.get(`/wp-json/posiciones/v1/all/`)
				.then(response => {
					/*state.posiciones = response.data[0];
					state.lastmatch = response.data[1];*/
					state.posiciones = response.data;
					//state.lastmatch = response.data[1];

				})
				.catch(e => {
					//console.log(e.message + ' En UPDATE POSICIONES')
				})
		},
		ultimopartidoprocesado(state) {
			axios.get(`/wp-json/lastmatch/v1/all/`)
				.then(response => {
					/*state.posiciones = response.data[0];
					state.lastmatch = response.data[1];*/
					state.lastmatch = response.data;
					//state.lastmatch = response.data[1];

				})
				.catch(e => {
					//console.log(e.message + ' En UPDATE POSICIONES')
				})
		},
		updatePronos(state) {
			axios.get(`/wp-json/todoslospronos/v1/all/`)
				.then(response => {
					state.allpronos = response.data
				})
				.catch(e => {
					//console.log(e.message + ' En UPDATE ALL PRONOS')
				})
		},
		updateAllPolleros(state) {
			//console.log("CREANDO LISTA DE POLLEROS")
			axios.get(`/wp-json/lospolleros/v1/all/`)
				.then(response => {
					state.allpolleros = response.data
				})
				.catch(e => {
					//console.log(e.message + ' En UPDATE ALL POLLEROS')
				})
		}

	}

})
