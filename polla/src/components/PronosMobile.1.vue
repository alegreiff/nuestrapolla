<template>
	<v-container fluid grid-list-md>
		<v-layout row wrap>
			<v-flex xs12 hidden-lg-and-up>
				<v-tabs v-model="active">
					<v-tabs-bar class="blue darken-4">
						<v-tabs-item v-for="tab in grupos" :key="tab" :href="'#' + tab" ripple>
							<span class="mov_np_grupo_bold">{{ tab.slice(-1) }}</span>
						</v-tabs-item>
					</v-tabs-bar>
					<v-tabs-items>
						<v-tabs-content v-for="tab in grupos" :key="tab" :id="tab">
							<v-card flat>
								<v-card-text>
									<div class="comodin">
										<v-btn @click="guardaGrupo()" block v-if="estadoGrupo==6 && pronosGrupo==2 && e_grupos[active]==true" round color="red lighten-2"
										    dark class="np_textodusha">Guardar grupo
											<span class="np_grupo_bold">{{ active }}</span>
										</v-btn>
										<v-btn @click="abreGrupoParaEdicion()" block v-if="e_grupos[active]==false" round color="blue lighten-2" dark class="np_textodusha">Editar marcadores grupo
											<span class="np_grupo_bold">{{ active }}</span>
										</v-btn>
										<div>
											<v-progress-linear v-if="(estadoGrupo + pronosGrupo)<8" :value="(estadoGrupo + pronosGrupo)*12.5" color="lime" height="20" background-opacity="0.2" background-color="red">
											</v-progress-linear>
											<p class="np_guardar_no" v-if="(puedeGuardarGrupo['cuenta'])<8">
													{{ puedeGuardarGrupo['mensaje'] }}
											</p>
											<p v-else>{{ mensajeGuardado }}</p>
										</div>
									</div>
									<template v-for="partido, index in partidos_grupo(tab.slice(-1))">
										<v-layout class="text-xs-center">
											<v-flex xs1>
												<div class="__com">
													<v-checkbox class="mov_np_check" v-model="pronos[partido.id]['comodin']" :disabled="pronosGrupo>1 && pronos[partido.id]['comodin']== false||e_grupos[active]==false">
													</v-checkbox>
												</div>
											</v-flex>
											<v-flex xs3>
												<div class="__loc">
													<div class="mov_equipo" :class="movil_ganador(partido.id, 'local')">{{ partido.local }}</div>
												</div>
											</v-flex>
											<v-flex xs2>
												<div class="__mloc">

													<input :disabled="e_grupos[active]==false" type="number" class="mov_np_textinput" min="0" max="21" step="1" v-model="pronos[partido.id]['mlocal']"
													    number @change="cambiamarcador(partido.id)">
												</div>
											</v-flex>
											<v-flex xs2>
												<div class="__mvis">
													<input :disabled="e_grupos[active]==false" type="number" class="mov_np_textinput" min="0" max="21" step="1" v-model="pronos[partido.id]['mvisit']"
													    number @change="cambiamarcador(partido.id)">
												</div>
											</v-flex>
											<v-flex xs3>
												<div class="__vis">
													<div class="mov_equipo" :class="movil_ganador(partido.id, 'visitante')">{{ partido.visitante}}</div>
												</div>
											</v-flex>
										</v-layout>
									</template>
								</v-card-text>
							</v-card>
						</v-tabs-content>
					</v-tabs-items>
				</v-tabs>
			</v-flex>
			<v-flex xs12 hidden-md-and-down>
				<v-tabs v-model="active">
					<v-tabs-bar class="blue darken-4" dark>
						<v-tabs-item v-for="tab in grupos" :key="tab" :href="'#' + tab" ripple>
							<span class="np_grupo_bold">{{ tab.slice(-1) }}</span>
						</v-tabs-item>
						<!-- <v-tabs-slider color="white" style="height: 8px;"></v-tabs-slider> -->
						<v-btn @click.native="next" color="primary">Siguiente grupo</v-btn>
					</v-tabs-bar>
					<v-tabs-items class="np_fondotabs">
						<v-tabs-content v-for="tab in grupos" :key="tab" :id="tab">
							<v-card flat>
								<v-card-text>
									<span class="np_grupo_bold_gris">Grupo {{ tab.slice(-1) }}</span>
									<v-chip color="green" text-color="white">
										<v-avatar class="green darken-4">{{ golesGrupo.goles }}</v-avatar>Goles X partido</v-chip>
									<v-chip color="green" text-color="white">
										<v-avatar class="green darken-4">{{ golesGrupo.empates }}</v-avatar>Empates</v-chip>
									<v-chip color="green" text-color="white">
										<v-avatar class="green darken-4">{{ golesGrupo.victorias }}</v-avatar>Victorias</v-chip>
									<div class="pronos">
										<div class="partidos">
											<template v-for="partido, index in partidos_grupo(tab.slice(-1))">
												{{ tabla_posiciones }}
												<div class="np_partido" :class="{'np_comodo': pronos[partido.id]['comodin']}">
													<div v-if="e_grupos[active]==true" class="npcom">
														<v-checkbox class="np_check" label="¿Comodín?" v-model="pronos[partido.id]['comodin']" :disabled="pronosGrupo>1 && pronos[partido.id]['comodin']== false||e_grupos[active]==false">
														</v-checkbox>
													</div>
													<div v-else class="npcom" :class="{'vacio':pronos[partido.id]['comodin'] }">
														<span v-if="pronos[partido.id]['comodin']">Comodín</span>
													</div>
													<div class="equipo" :class="ganador(partido.id, 'local')">{{ partido.local }}</div>
													<div class="marcador">
														<input :disabled="e_grupos[active]==false" type="number" class="np_textinput" min="0" max="21" step="1" v-model="pronos[partido.id]['mlocal']"
														    number @change="cambiamarcador(partido.id)">
														<div class="quantity-nav">
															<div v-if="e_grupos[active]==true" class="quantity-button quantity-up" @click="sumagol(partido.id, 'mlocal', 'suma')">+</div>
															<div v-if="e_grupos[active]==true" class="quantity-button quantity-down" @click="sumagol(partido.id, 'mlocal', 'resta')">-</div>
														</div>
													</div>
													<div class="versus">vs</div>
													<div class="marcador">
														<input :disabled="e_grupos[active]==false" type="number" class="np_textinput" min="0" max="21" step="1" v-model="pronos[partido.id]['mvisit']"
														    number @change="cambiamarcador(partido.id)">
														<div class="quantity-nav">
															<div v-if="e_grupos[active]==true" class="quantity-button quantity-up" @click="sumagol(partido.id, 'mvisit', 'suma')">+</div>
															<div v-if="e_grupos[active]==true" class="quantity-button quantity-down" @click="sumagol(partido.id, 'mvisit', 'resta')">-</div>
														</div>
													</div>
													<div class="equipo" :class="ganador(partido.id, 'visitante')">{{ partido.visitante}}</div>
												</div>
											</template>
										</div>
										<div class="comodin">
											<v-btn @click="guardaGrupo()" block v-if="estadoGrupo==6 && pronosGrupo==2 && e_grupos[active]==true" round color="red lighten-2"
											    dark class="np_textodusha">Guardar grupo
												<span class="np_grupo_bold">{{ active }}</span>
											</v-btn>
											<v-btn @click="abreGrupoParaEdicion()" block v-if="e_grupos[active]==false" round color="blue lighten-2" dark class="np_textodusha">Editar marcadores grupo
												<span class="np_grupo_bold">{{ active }}</span>
											</v-btn>
											<div>
												<v-progress-linear v-if="(estadoGrupo + pronosGrupo)<8" :value="(estadoGrupo + pronosGrupo)*12.5" color="lime" height="20"
												    background-opacity="0.2" background-color="red">
												</v-progress-linear>
												<p class="np_guardar_no" v-if="(puedeGuardarGrupo['cuenta'])<8">
													{{ puedeGuardarGrupo['mensaje'] }}
												</p>
												<p v-else>{{ mensajeGuardado }}</p>
											</div>
										</div>
										<v-layout>
											<v-flex hidden-md-and-down>
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
															<tr v-for="eq, index in equipos_grupo(tab)" :class="{'np_clasificado':index<2, 'np_eliminado':index>1 }">
																<td>
																	<img :src="'/assets/band/'+eq.id + '.png'" :alt="eq.id" class="np_miniflag">
																</td>
																<td>{{ eq.equipo }}</td>
																<td>{{ eq.pj }}</td>
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
										</v-layout>
										</div>
									</div>
								</v-card-text>
							</v-card>
						</v-tabs-content>
					</v-tabs-items>
				</v-tabs>
			</v-flex>
			<v-flex xs12 hidden-md-and-down>
				
				<div class="np_info" v-if="Object.keys(octavos).length === 16">
					<div class="binf">
						<div v-if="e_grupos['A']==false">
							<img :src="'/assets/band/'+octavos.A1.id + '.png'" :alt="octavos.A1.id" class="np_miniflag_octavos" :class="{'np_imagen_low': procesados_grupo('A') < 6}">
							<p>{{ octavos.A1.equipo }}</p>
						</div>
						<div v-else class="np_big_octavos">A1</div>

						<div v-if="e_grupos['B']==false">
							<img :src="'/assets/band/'+octavos.B2.id + '.png'" :alt="octavos.B2.id" class="np_miniflag_octavos" :class="{'np_imagen_low': procesados_grupo('B') < 6}">
							<p>{{ octavos.B2.equipo }} </p>
						</div>
						<div v-else class="np_big_octavos">B2</div>
					</div>
					<div class="binf"></div>
					<div class="binf"></div>
					<div class="binf"></div>
					<div class="binf">
						<div v-if="e_grupos['B']==false">
							<img :src="'/assets/band/'+octavos.B1.id + '.png'" :alt="octavos.B1.id" class="np_miniflag_octavos" :class="{'np_imagen_low': procesados_grupo('B') < 6}">
							<p>{{ octavos.B1.equipo }}</p>
						</div>
						<div v-else class="np_big_octavos">A1</div>

						<div v-if="e_grupos['A']==false">
							<img :src="'/assets/band/'+octavos.A2.id + '.png'" :alt="octavos.A2.id" class="np_miniflag_octavos" :class="{'np_imagen_low': procesados_grupo('A') < 6}">
							<p>{{ octavos.A2.equipo }} </p>
						</div>
						<div v-else class="np_big_octavos">A2</div>
					</div>
					<div class="binf">
						<div v-if="e_grupos['C']==false">
							<img :src="'/assets/band/'+octavos.C1.id + '.png'" :alt="octavos.C1.id" class="np_miniflag_octavos" :class="{'np_imagen_low': procesados_grupo('C') < 6}">
							<p>{{ octavos.C1.equipo }}</p>
						</div>
						<div v-else class="np_big_octavos">C1</div>
						<div v-if="e_grupos['D']==false">
							<img :src="'/assets/band/'+octavos.D2.id + '.png'" :alt="octavos.D2.id" class="np_miniflag_octavos" :class="{'np_imagen_low': procesados_grupo('D') < 6}">
							<p>{{ octavos.D2.equipo }} </p>
						</div>
						<div v-else class="np_big_octavos">D2</div>
					</div>
					<div class="binf"></div>
					<div class="binf"></div>
					<div class="binf"></div>
					<div class="binf">
						<div v-if="e_grupos['D']==false">
							<img :src="'/assets/band/'+octavos.D1.id + '.png'" :alt="octavos.D1.id" class="np_miniflag_octavos" :class="{'np_imagen_low': procesados_grupo('D') < 6}">
							<p>{{ octavos.D1.equipo }}</p>
						</div>
						<div v-else class="np_big_octavos">D1</div>
						<div v-if="e_grupos['C']==false">
							<img :src="'/assets/band/'+octavos.C2.id + '.png'" :alt="octavos.C2.id" class="np_miniflag_octavos" :class="{'np_imagen_low': procesados_grupo('C') < 6}">
							<p>{{ octavos.C2.equipo }} </p>
						</div>
						<div v-else class="np_big_octavos">C2</div>
					</div>
					<div class="binf">
						<div v-if="e_grupos['E']==false">
							<img :src="'/assets/band/'+octavos.E1.id + '.png'" :alt="octavos.E1.id" class="np_miniflag_octavos" :class="{'np_imagen_low': procesados_grupo('E') < 6}">
							<p>{{ octavos.E1.equipo }}</p>
						</div>
						<div v-else class="np_big_octavos">E1</div>
						<div v-if="e_grupos['F']==false">
							<img :src="'/assets/band/'+octavos.F2.id + '.png'" :alt="octavos.F2.id" class="np_miniflag_octavos" :class="{'np_imagen_low': procesados_grupo('F') < 6}">
							<p>{{ octavos.F2.equipo }} </p>
						</div>
						<div v-else class="np_big_octavos">F2</div>
					</div>
					<div class="binf"></div>
					<div class="binf"></div>
					<div class="binf"></div>
					<div class="binf">
						<div v-if="e_grupos['F']==false">
							<img :src="'/assets/band/'+octavos.F1.id + '.png'" :alt="octavos.F1.id" class="np_miniflag_octavos" :class="{'np_imagen_low': procesados_grupo('F') < 6}">
							<p>{{ octavos.F1.equipo }}</p>
						</div>
						<div v-else class="np_big_octavos">F1</div>
						<div v-if="e_grupos['E']==false">
							<img :src="'/assets/band/'+octavos.E2.id + '.png'" :alt="octavos.E2.id" class="np_miniflag_octavos" :class="{'np_imagen_low': procesados_grupo('E') < 6}">
							<p>{{ octavos.E2.equipo }} </p>
						</div>
						<div v-else class="np_big_octavos">E2</div>
					</div>
					<div class="binf">
						<div v-if="e_grupos['G']==false">
							<img :src="'/assets/band/'+octavos.G1.id + '.png'" :alt="octavos.G1.id" class="np_miniflag_octavos" :class="{'np_imagen_low': procesados_grupo('G') < 6}">
							<p>{{ octavos.G1.equipo }}</p>
						</div>
						<div v-else class="np_big_octavos">G1</div>
						<div v-if="e_grupos['H']==false">
							<img :src="'/assets/band/'+octavos.H2.id + '.png'" :alt="octavos.H2.id" class="np_miniflag_octavos" :class="{'np_imagen_low': procesados_grupo('H') < 6}">
							<p>{{ octavos.H2.equipo }} </p>
						</div>
						<div v-else class="np_big_octavos">H2</div>
					</div>
					<div class="binf"></div>
					<div class="binf"></div>
					<div class="binf"></div>
					<div class="binf">
						<div v-if="e_grupos['H']==false">
							<img :src="'/assets/band/'+octavos.H1.id + '.png'" :alt="octavos.H1.id" class="np_miniflag_octavos" :class="{'np_imagen_low': procesados_grupo('H') < 6}">
							<p>{{ octavos.H1.equipo }}</p>
						</div>
						<div v-else class="np_big_octavos">H1</div>
						<div v-if="e_grupos['G']==false">
							<img :src="'/assets/band/'+octavos.G2.id + '.png'" :alt="octavos.G2.id" class="np_miniflag_octavos" :class="{'np_imagen_low': procesados_grupo('G') < 6}">
							<p>{{ octavos.G2.equipo }} </p>
						</div>
						<div v-else class="np_big_octavos">G2</div>
					</div>
				</div>
				<div class="np_info" v-else>C A L C U L A N D O</div>
			</v-flex>
			<template>
				<v-layout row justify-center>
					<v-dialog v-model="dialog" persistent max-width="400">
						<v-card>
							<v-card-title class="headline">{{ this.datosUsuarioWordpress.data[0] }}</v-card-title>
							<v-card-text>
								{{ mensaje_database }}
								<hr>
								<p class="frasecula">... {{fraseespecial}} ...</p>
							</v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="red darken-1" flat @click.native="dialog = false">Entendido</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-layout>
			</template>
		</v-layout>
	</v-container>
</template>
<script>
import { mapState, mapMutations} from 'vuex'
export default {

	data () {
		return {
			active: null,
			text: 'XXXXX',
			usuarioactivo: '',
			octavos: {},
			rules: {
				required: (value) => !!value || 'Required.'
			},
			e_grupos: {},
			pronos: [],
			// calendario: [],
			mensaje_database: '',
			dialog: false,
			fraseespecial: '',
			mensajeGuardado: ''
			
		}
	},
	computed: {
		...mapState(['horamostrable', 'datosUsuarioWordpress', 'configuracionPolla', 'calendarioparapronos', 'listaequipos', 'proxdata', 'frasesculas']),
		grupos () {
			if (this.configuracionPolla) {
				this.pronos = this.configuracionPolla[0].pronos
				// this.calendario = this.calendariox;
				if (this.configuracionPolla[0].faseactiva === 'octavos') {
					return ['8']
					//console.log('estamos en octavos')
				} else {
					//console.log('estamos en fase de grupos')
					this.e_grupos['A'] = false
					this.e_grupos['B'] = false
					this.e_grupos['C'] = false
					this.e_grupos['D'] = false
					this.e_grupos['E'] = false
					this.e_grupos['F'] = false
					this.e_grupos['G'] = false
					this.e_grupos['H'] = false
					return this.configuracionPolla[0].grupos
				}
			}
		},
		estadoGrupo () {
			var res = _.filter(this.calendarioparapronos, ['grupo', this.active])
			var com = _.filter(res, ['procesado', 1])
			var size = _.size(com)
			var vvv = com.length
			//console.log('Estado GRUPO SIZE: ' + size + ' el tamaño length es: ' + vvv)
			return (size)
		},
		golesGrupo () {
			var res = _.filter(this.calendarioparapronos, ['grupo', this.active])
			var com = _.filter(res, ['procesado', 1])
			var lg = _.sumBy(com, function (o) { return o.lg })
			var vg = _.sumBy(com, function (o) { return o.vg })
			// var em = _.sumBy(com, function(o) { return o.vg; });
			var empates = 0
			for (var i in com) {
				if (com[i].lg == com[i].vg) {
					empates++
				}
			}
			var res = []
			res.goles = ((lg + vg) / com.length).toFixed(2)
			if (isNaN(res.goles)) {
				res.goles = 0
			}
			res.empates = empates
			res.victorias = com.length - empates
			return res
		},
		pronosGrupo () {
			var res = _.filter(this.pronos, ['grupo', this.active])
			var com = _.filter(res, ['comodin', true])
			var size = _.size(com)
			var vvv = com.length
			//console.log('Estado COMODINES SIZE: ' + size + ' el tamaño length es: ' + vvv)
			return (size)
		},
		puedeGuardarGrupo(){
			var pg = this.pronosGrupo;
			var eg = this.estadoGrupo;
			//<p v-if="(estadoGrupo + pronosGrupo)<8">El grupo NO está listo para guardar {{estadoGrupo}} -- {{pronosGrupo}}</p>
			if(eg < 6){
				var partidos = ((6 - eg)=== 1) ? ' partido': ' partidos';
				var m1 = ' Le faltan los marcadores de ' + (6 - eg) + partidos;
			}else{
				var m1 = ' Marcadores OK.';
			}
			if(pg < 2){
				var partidos = ((2 - pg)=== 1) ? ' partido': ' partidos';
				var m2 = ' Le faltan los comodines de ' + (2 - pg) + partidos;
			}else{
				var m2 = ' Comodines OK.';
			}
			var salida = new Object();
			salida['cuenta'] = pg + eg;
			salida['mensaje'] = 'El grupo NO está listo para ser guardado.' + m1 + m2;
			return salida;
		},
		pronosFinalesGrupo () {
			var res = _.filter(this.pronos, ['grupo', this.active])
			return (res)
		},
		tabla_posiciones () {
			var contador = 0
			this.resetEquiposPos()

			if (this.tamanio_objeto(this.listaequipos) == 32) {
				for (var i in this.calendarioparapronos) {
					if (this.calendarioparapronos[i].procesado == 1) {
						var eq_local = this.calendarioparapronos[i]['idloc']
						var eq_visit = this.calendarioparapronos[i]['idvis']
						if (isNaN(this.calendarioparapronos[i]['lg'])) {
							this.calendarioparapronos[i]['lg'] = 0
						}
						if (isNaN(this.calendarioparapronos[i]['vg'])) {
							this.calendarioparapronos[i]['vg'] = 0
						}
						var resultado = ''
						this.listaequipos[eq_local]['gf'] = parseInt(this.listaequipos[eq_local]['gf']) + parseInt(this.calendarioparapronos[i]['lg'])
						this.listaequipos[eq_local]['gc'] = parseInt(this.listaequipos[eq_local]['gc']) + parseInt(this.calendarioparapronos[i]['vg'])
						this.listaequipos[eq_visit]['gf'] = parseInt(this.listaequipos[eq_visit]['gf']) + parseInt(this.calendarioparapronos[i]['vg'])
						this.listaequipos[eq_visit]['gc'] = parseInt(this.listaequipos[eq_visit]['gc']) + parseInt(this.calendarioparapronos[i]['lg'])
						if (isNaN(this.calendarioparapronos[i]['lg'])) {
							this.calendarioparapronos[i]['lg'] = 0
						}
						if (isNaN(this.calendarioparapronos[i]['vg'])) {
							this.calendarioparapronos[i]['vg'] = 0
						}
						if (this.calendarioparapronos[i]['lg'] > this.calendarioparapronos[i]['vg']) {
							resultado = 'LOCAL'
							this.listaequipos[eq_local]['pg'] = this.listaequipos[eq_local]['pg'] + 1
							this.listaequipos[eq_visit]['pp'] = this.listaequipos[eq_visit]['pp'] + 1
						} else if (this.calendarioparapronos[i]['lg'] < this.calendarioparapronos[i]['vg']) {
							resultado = 'VISITANTE'
							this.listaequipos[eq_visit]['pg'] = this.listaequipos[eq_visit]['pg'] + 1
							this.listaequipos[eq_local]['pp'] = this.listaequipos[eq_local]['pp'] + 1
						} else {
							resultado = 'EMPATE'
							this.listaequipos[eq_local]['pe'] = this.listaequipos[eq_local]['pe'] + 1
							this.listaequipos[eq_visit]['pe'] = this.listaequipos[eq_visit]['pe'] + 1
						}
						this.listaequipos[eq_local]['dg'] = parseInt(this.listaequipos[eq_local]['gf']) - parseInt(this.listaequipos[eq_local]['gc'])
						this.listaequipos[eq_visit]['dg'] = parseInt(this.listaequipos[eq_visit]['gf']) - parseInt(this.listaequipos[eq_visit]['gc'])
						this.listaequipos[eq_local]['pts'] = 3 * (this.listaequipos[eq_local]['pg']) + this.listaequipos[eq_local]['pe']
						this.listaequipos[eq_visit]['pts'] = 3 * (this.listaequipos[eq_visit]['pg']) + this.listaequipos[eq_visit]['pe']
						if (this.listaequipos[eq_local]['pj'] == null) {
							this.listaequipos[eq_local]['pj'] = 1
						} else {
							this.listaequipos[eq_local]['pj'] = this.listaequipos[eq_local]['pj'] + 1
						}
						if (this.listaequipos[eq_visit]['pj'] == null) {
							this.listaequipos[eq_visit]['pj'] = 1
						} else {
							this.listaequipos[eq_visit]['pj'] = this.listaequipos[eq_visit]['pj'] + 1
						}
						contador++
					}
				}
			} else {
				//console.log('Algo pasa JOE')
			}
		}
	},
	methods: {
		...mapMutations(['updatePronos']),
		
		actualiza_allpronos () {
			this.$store.commit('updatePronos')
		},
		lafrase () {
			return this.frasesculas[Math.floor(Math.random() * this.frasesculas.length)]
		},
		procesados_grupo (grupo) {
			var res = _.filter(this.calendarioparapronos, ['grupo', grupo])
			var com = _.filter(res, ['procesado', 1])
			var size = _.size(com)

			return (size)
		},
		activaEstadoOpenClose () {
			this.next()
			if (this.active === 'A') {
				this.active = 'G'
				this.next()
			} else {
				this.prev()
			}
		},
		abreGrupoParaEdicion () {
			this.e_grupos[this.active] = true
			this.mensajeGuardado = 'No olvide guardar el grupo'
			this.activaEstadoOpenClose()
		},
		guardaGrupo () {
			this.e_grupos[this.active] = false
			this.activaEstadoOpenClose()
			axios.post(`/wp-json/insertargrupo/v1/all/`, {
				dato: this.pronosFinalesGrupo,
				grupo: this.active,
				pollero: this.datosUsuarioWordpress.id
			})
				.then(response => {
					this.fraseespecial = this.lafrase()
					this.mensaje_database = response.data + ' para el grupo ' + this.active
					this.dialog = true
					this.actualiza_allpronos()
					this.mensajeGuardado = 'Grupo guardado';
					
					
					
					/*axios.get(`/wp-json/todoslospronos/v1/all/`)
						.then(response => {
							this.$store.state.allpronos = response.data
						})
						.catch(e => {
							this.errors.push(e.message)
						})*/
					//console.log('RESPUESTA ' + response)
				})
				.catch(e => {
					//console.log('ERROR ' + e)
				})
		},
		resetEquiposPos () {
			for (var i in this.listaequipos) {
				this.listaequipos[i]['pj'] = 0
				this.listaequipos[i]['pg'] = 0
				this.listaequipos[i]['pe'] = 0
				this.listaequipos[i]['pp'] = 0
				this.listaequipos[i]['gf'] = 0
				this.listaequipos[i]['gc'] = 0
				this.listaequipos[i]['dg'] = 0
				this.listaequipos[i]['pts'] = 0
			}
		},
		next () {
			this.active = this.grupos[(this.grupos.indexOf(this.active) + 1) % this.grupos.length]
		},
		prev () {
			this.active = this.grupos[(this.grupos.indexOf(this.active) - 1) % this.grupos.length]
		},
		partidos_grupo (grupo) {
			return _.filter(this.calendarioparapronos, ['grupo', grupo])
		},
		pronos_grupo (grupo) {
			return _.filter(this.pronos, ['grupo', grupo])
		},
		pronos_grupo_comodin (grupo) {
			return _.filter(this.pronos, {
				'grupo': grupo,
				'comodin': true
			})
		},
		equipos_grupo (grupo) {
			if (this.active != null) {
				var salida = _.filter(this.listaequipos, ['grupo', grupo])
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
				return salida
			}
		},
		sumagol (partido, equipo, operacion) {
			if (operacion === 'suma') {
				this.pronos[partido][equipo]++
				if (this.pronos[partido][equipo] > 21) {
					this.pronos[partido][equipo] = 21
				}
			} else {
				this.pronos[partido][equipo]--
				if (this.pronos[partido][equipo] < 0) {
					this.pronos[partido][equipo] = 0
				}
			}
			this.cambiamarcador(partido)
		},
		cambiamarcador (partido) {
			//console.log(' <----> ' + partido)
			partido = parseInt(partido)
			if (Number.isInteger(parseInt(this.pronos[partido]['mlocal'])) && Number.isInteger(parseInt(this.pronos[partido]['mvisit']))) {
				this.calendarioparapronos[partido]['procesado'] = 1
			} else {
				this.calendarioparapronos[partido]['procesado'] = 0
			}
			if (isNaN(this.pronos[partido]['mlocal'])) {
				this.pronos[partido]['mlocal'] = 0
			}
			if (isNaN(this.pronos[partido]['mvisit'])) {
				this.pronos[partido]['mvisit'] = 0
			}
			this.calendarioparapronos[partido]['lg'] = parseInt((this.pronos[partido]['mlocal']))
			this.calendarioparapronos[partido]['vg'] = parseInt((this.pronos[partido]['mvisit']))
		},
		ganador (partido, turno) {
			if (this.pronos[partido]['mlocal'] > this.pronos[partido]['mvisit']) {
				if (turno === 'local') {
					return 'np_gana'
				} else {
					return 'np_pierde'
				}
			} else if (this.pronos[partido]['mlocal'] < this.pronos[partido]['mvisit']) {
				if (turno === 'visitante') {
					return 'np_gana'
				} else {
					return 'np_pierde'
				}
			} else {
				return 'np_empata'
			}
		},
		movil_ganador (partido, turno) {
			if (this.pronos[partido]['mlocal'] > this.pronos[partido]['mvisit']) {
				if (turno === 'local') {
					return 'mov_np_gana'
				} else {
					return 'mov_np_pierde'
				}
			} else if (this.pronos[partido]['mlocal'] < this.pronos[partido]['mvisit']) {
				if (turno === 'visitante') {
					return 'mov_np_gana'
				} else {
					return 'mov_np_pierde'
				}
			} else {
				return 'mov_np_empata'
			}
		},
		actualizaPronosCargados () {
			this.testa(this.tamanio_objeto(this.calendarioparapronos), this.tamanio_objeto(this.pronos))
		},
		tamanio_objeto (objeto) {
			var size = _.size(objeto)
			return size
		},
		testa (calsize, pronosize) {
			if (calsize == 48 && pronosize == 64) {
				for (var i in this.pronos) {
					if (i < 49) {
						var elpartido = (this.pronos[i].partido)
						var idpartido = elpartido
						var idequipoL = _.findIndex(this.listaequipos, {'id': this.calendarioparapronos[idpartido]['idloc']})
						var idequipoV = _.findIndex(this.listaequipos, {
							'id': this.calendarioparapronos[idpartido]['idvis']
						})
						if (Number.isInteger(parseInt(this.pronos[elpartido]['mlocal'])) && Number.isInteger(parseInt(this.pronos[elpartido]['mvisit']))) {
							this.calendarioparapronos[idpartido]['procesado'] = 1
						} else {
							this.calendarioparapronos[idpartido]['procesado'] = 0
						}
						if (isNaN(this.pronos[elpartido]['mlocal'])) {
							this.pronos[elpartido]['mlocal'] = 0
						}
						if (isNaN(this.pronos[elpartido]['mvisit'])) {
							this.pronos[elpartido]['mvisit'] = 0
						}
						this.calendarioparapronos[idpartido]['lg'] = parseInt(this.pronos[elpartido]['mlocal'])
						this.calendarioparapronos[idpartido]['vg'] = parseInt(this.pronos[elpartido]['mvisit'])
					}
				}
				//console.log('Pasando por TESTA')
			} else {
				//console.log('NO ACTIVA INICIO')
			}
		}

	},
	mounted () {
		
	},
	created () {
	},
	watch: {
		/*tab(val){
			if (val){
				this.active = val;
			}
		},*/
		calendarioparapronos () {
			//console.log('CAL  Changed from CAL!')
			this.actualizaPronosCargados()
		},
		pronos () {
			//console.log('CAL  Changed from PRONOS!')
			this.actualizaPronosCargados()
		}
	}
}
</script>
