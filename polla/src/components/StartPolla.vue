<template>
	<v-container fluid grid-list-md class="pollacontainer">
		<v-layout row wrap>
			<v-flex xs12 md6 lg3 class="text-xs-center">
				<v-card color="grey lighten-4" light class="completacard">
					<v-card-text>
						<h3>Nuestra Polla</h3>
						<img :src="'/assets/lp.png'" alt="Nuestra Polla" class="">
						</v-card-text>
					</v-card>
				</v-flex>
				<v-flex xs12 md6 lg6>
					<v-card color="pollarojo2" dark class="completacard">
						<v-card-text class="text-xs-center">
							<v-btn :to="{path: '/pronos'}"  block color="primary">Crear o modificar mis marcadores
								<v-icon right dark>highlight</v-icon>
							</v-btn>
							<v-btn color="primary" dark @click.stop="dialog2 = true">Ayuda sobre marcadores</v-btn>
							<!--<v-btn @click="pdftest()"  block color="terciary" v-if="(fasePolla.partidos - valore) === 0" >Mis pronósticos PDF<v-icon right dark>highlight</v-icon></v-btn>-->
							<v-btn @click="pdftest()"  block color="terciary" v-if="(estatuspronos) === 0" >Descargar Mis pronósticos PDF
								<v-icon right dark>highlight</v-icon>
							</v-btn>
							<p v-if="estatuspronos>0">Pronósticos que le faltan para la fase de grupos: {{ estatuspronos }}</p>
							<p>Partidos para esta fase {{ fasePolla.partidos }}</p>
							<p>Esta es una polla de 64 partidos. Única para todo el mundial</p>
						</v-card-text>
					</v-card>
				</v-flex>
				<v-flex xs12 md6 lg3>
					<v-card color="pollarojo2" dark class="completacard">
						<v-card-text class="text-xs-center">
							<p v-if="allpollerosHome" class="dato_size0">{{allpollerosHome.length}}</p>
							<span>Polleros registrados</span>
						</v-card-text>
					</v-card>
				</v-flex>
			</v-layout>
			<v-layout row wrap>
				
				<v-flex xs12 md6 lg3>
					<v-card color="pollagris" dark class="completacard">
						<v-card-text class="text-xs-center">
							<span>Tiempo restante para ingresar o modificar marcadores de la fase de grupos y para pagar la inscripción a su pollero amigo. </span>
						</v-card-text>
					</v-card>
				</v-flex>
				<v-flex xs12 md6 lg3>
					<v-card color="pollacrema" light class="completacard">
						<v-card-text class="text-xs-center">
							<span class="tempoprono"><TiempoRestante deadline="June 12, 2018 23:59"></TiempoRestante></span>
							<span>Vence el martes 12 de junio a las 23:59</span>
						</v-card-text>
					</v-card>
				</v-flex>
				<v-flex xs12 md6 lg3>
					<v-card color="pollagris" dark class="completacard">
						<v-card-text class="text-xs-center">
							<p class="dato_size2">{{ formatPremio(elplandepremios.cuota) }}</p>
							<span>Valor inscripción</span>
						</v-card-text>
					</v-card>
				</v-flex>
				<v-flex xs12 md6 lg3>
					<v-card color="pollacrema" light class="completacard">
						<v-card-text class="text-xs-center">
							<p class="dato_size2">{{ formatPremio(6) }}</p>
							<span class="np_porcentaje">{{elplandepremios.porcentajes[6]}}%</span>
							<span>Botín</span>
						</v-card-text>
					</v-card>
				</v-flex>
			</v-layout>
			<v-layout row wrap>
				<v-flex xs12 md6 lg3>
					<v-card color="pollacrema" light class="completacard">
						<v-card-text class="text-xs-center">
							<p class="dato_size2">{{ formatPremio(0) }}</p>
							<span class="np_porcentaje">{{elplandepremios.porcentajes[0]}}%</span>
							<span>Primer puesto</span>
						</v-card-text>
					</v-card>
				</v-flex>
				<v-flex xs12 md6 lg3>
					<v-card color="pollagris" dark class="completacard">
						<v-card-text class="text-xs-center">
							<p class="dato_size2">{{ formatPremio(1) }}</p>
							<span class="np_porcentaje">{{elplandepremios.porcentajes[1]}}%</span>
							<span>Segundo puesto</span>
							
						</v-card-text>
					</v-card>
				</v-flex>
				<v-flex xs12 md6 lg3>
					<v-card color="pollacrema" light class="completacard">
						<v-card-text class="text-xs-center">
							<p class="dato_size2">{{ formatPremio(2) }}</p>
							<span class="np_porcentaje">{{elplandepremios.porcentajes[2]}}%</span>
							<span>Tercer puesto</span>
						</v-card-text>
					</v-card>
				</v-flex>
				<v-flex xs12 md6 lg3>
					<v-card color="red darken-4" dark class="completacard">
						<v-card-text class="text-xs-center">
							<p class="dato_size2">{{ formatPremio(5) }}</p>
							<span class="np_porcentaje">{{elplandepremios.porcentajes[4]}}%</span>
							<span>Mejor pollero al finalizar la fase de grupos</span>
							
						</v-card-text>
					</v-card>
				</v-flex>
			</v-layout>
			<v-layout row wrap>
				<v-flex xs12 md6 lg3>
					<v-card color="pollagris" dark>
						<v-card-text class="text-xs-center">
							<p class="dato_size2">{{ formatPremio(3) }}</p>
							<span class="np_porcentaje">{{elplandepremios.porcentajes[3]}}%</span>
							<span>Para repartir entre los mejores polleros de cada pollero amigo</span>
							
						</v-card-text>
					</v-card>
				</v-flex>
				<v-flex xs12 md6 lg3>
					<v-card color="pollacrema" light class="completacard">
						<v-card-text class="text-xs-center">
							<p class="dato_size2">{{ formatPremio(4) }}</p>
							<span class="np_porcentaje">{{elplandepremios.porcentajes[4]}}%</span>
							<span>Para el pollero amigo del gran ganador</span>
						</v-card-text>
					</v-card>
				</v-flex>
				<v-flex xs12 md6 lg3>
					<v-card color="pollagris" dark class="completacard">
						<v-card-text class="text-xs-center">
							<p class="dato_size2">{{ formatPremio(elplandepremios.cuota) }}</p>
							<span>Valor inscripción</span>
						</v-card-text>
					</v-card>
				</v-flex>
				<v-flex xs12 md6 lg3>
					<v-card color="pollacrema" light>
						<v-card-text class="text-xs-center">
							<p class="dato_size1" v-if="statistics.prom === statistics.prom">{{ (statistics.prom).toFixed(2) }}</p>
							<span>Promedio de goles por partido</span>
						</v-card-text>
					</v-card>
				</v-flex>
			</v-layout>
			<v-layout row wrap>
				<v-flex xs12 md6 lg3>
					<v-card color="pollacrema" light>
						<v-card-text class="text-xs-center">
							<p class="dato_size1">{{ statistics.partidos }}</p>
							<span>Partidos</span>
						</v-card-text>
					</v-card>
				</v-flex>
				<v-flex xs12 md6 lg3>
					<v-card color="pollagris" dark>
						<v-card-text class="text-xs-center">
							<p class="dato_size1">{{ statistics.goles }}</p>
							<span>Goles</span>
						</v-card-text>
					</v-card>
				</v-flex>
				<v-flex xs12 md6 lg3>
					<v-card color="pollacrema" light>
						<v-card-text class="text-xs-center">
							<p class="dato_size1">{{ statistics.victorias }}</p>
							<span>Victorias</span>
						</v-card-text>
					</v-card>
				</v-flex>
				<v-flex xs12 md6 lg3>
					<v-card color="pollagris" dark>
						<v-card-text class="text-xs-center">
							<p class="dato_size1">{{ statistics.empates }}</p>
							<span>Empates</span>
						</v-card-text>
					</v-card>
				</v-flex>
			</v-layout>
			<v-layout row wrap>
				<v-flex xs12 md6 lg3>
					<v-card class="completacard">
						<v-toolbar color="pollagris" dark>
							<v-toolbar-title>Marcadores frecuentes</v-toolbar-title>
						</v-toolbar>
						<v-list>
							<template v-if="index < 5" v-for="(item, index) in frecuentes">
								<v-list-tile avatar ripple :key="item.key">
									<v-list-tile-content>
                {{ item.key }}
              </v-list-tile-content>
									<v-list-tile-action>
										<v-list-tile-action-text>{{ item.value }}</v-list-tile-action-text>
									</v-list-tile-action>
								</v-list-tile>
							</template>
						</v-list>
					</v-card>
				</v-flex>
				<v-flex xs12 md6 lg3>
					<v-card class="completacard">
						<v-toolbar color="pollacrema" light>
							<v-toolbar-title>Número de goles por partido</v-toolbar-title>
						</v-toolbar>
						<v-list>
							<template v-if="index < 5" v-for="(item, index) in golesporpartido">
								<v-list-tile avatar ripple :key="item.key">
									<v-list-tile-content>
                {{ item.key }}
              </v-list-tile-content>
									<v-list-tile-action>
										<v-list-tile-action-text>{{ item.value }}</v-list-tile-action-text>
									</v-list-tile-action>
								</v-list-tile>
							</template>
						</v-list>
					</v-card>
				</v-flex>
				<v-flex xs12 md6 lg3>
					<v-card color="pollagris" dark class="completacard">
						<v-card-text class="text-xs-center np_frasepolla">
							
							<span>{{lafrase()}}</span>
						</v-card-text>
					</v-card>
				</v-flex>
				<v-flex xs12 md6 lg3>
					<v-card color="pollacrema" light class="completacard">
						<v-card-text class="text-xs-center">
							<span>Polla</span>
							<span>Nuestra</span>
						</v-card-text>
					</v-card>
				</v-flex>
			</v-layout>
			<v-layout row wrap>
				<v-flex xs12>
					{{ filtrados_pollero.length }}
					
					<v-btn color="primary" small dark @click="filtroPolleros('Alfonso Acosta')">AA</v-btn>
					<v-btn color="primary" small dark @click="filtroPolleros('Alejandro Pardo')">AP</v-btn>
					<v-btn color="primary" small dark @click="filtroPolleros('Diego Urrutia')">DU</v-btn>
					<v-btn color="primary" small dark @click="filtroPolleros('Esteban Muñoz')">EM</v-btn>
					<v-btn color="primary" small dark @click="filtroPolleros('Federico Arango')">FA</v-btn>
					<v-btn color="primary" small dark @click="filtroPolleros('Jaime de Greiff')">JD</v-btn>
					<v-btn color="primary" small dark @click="filtroPolleros('Luis Carlos Urrutia')">LU</v-btn>
					<v-btn color="primary" small dark @click="filtroPolleros('Luis Fernando Velasco')">LV</v-btn>
					<v-btn color="primary" small dark @click="filtroPolleros('Marcela Cortés')">MC</v-btn>
					<v-btn color="primary" small dark @click="filtroPolleros('Miller Sánchez')">MS</v-btn>
					<v-btn color="primary" small dark @click="filtroPolleros('Ricardo Ramírez')">RR</v-btn>
					<v-btn color="primary" small dark @click="filtroPolleros(0)">TODOS</v-btn>
				</v-flex>
			</v-layout>
			<v-layout row wrap>
				<v-flex xs6 md3 lg2 v-for="(item, index) in filtrados_pollero" class="np_conocepolleros">
					
					<!--<v-chip block :class="item.genero==='Pollero' ? 'light-blue darken-2': 'purple lighten-2' " text-color="white" @click="mueche(item.id)">
            <v-avatar class="blue darken-3">{{quien(item.polleroamigo)}}</v-avatar>
            <v-icon v-if="es_pollero_amigo(item.id)">people</v-icon>  {{ item.pollero }} - {{pronos_parciales_pollero(item.id)}} 
						
          </v-chip>-->
					<v-btn small :class="item.genero==='Pollero' ? 'light-blue darken-2': 'purple lighten-2' " dark @click="mueche(item.id)" block>
						{{quien(item.polleroamigo)}} {{ item.pollero }} - {{pronos_parciales_pollero(item.id)}}
					</v-btn>
				</v-flex>
			</v-layout>
			
			<v-layout row wrap>
				<v-flex xs12 md6 lg3>
					<v-card color="pollacrema" light>
						<v-card-text class="text-xs-center">
          Nuestra Polla
          </v-card-text>
					</v-card>
				</v-flex>
				<v-flex xs12 md6 lg3>
					<v-card color="pollagris" dark>
						<v-card-text class="text-xs-center">
          Nuestra Polla
          </v-card-text>
					</v-card>
				</v-flex>
				<v-flex xs12 md6 lg3>
					<v-card color="pollacrema" light>
						<v-card-text class="text-xs-center">
          Nuestra Polla
          </v-card-text>
					</v-card>
				</v-flex>
				<v-flex xs12 md6 lg3>
					<v-card color="pollagris" dark>
						<v-card-text class="text-xs-center">
          Nuestra Polla
          </v-card-text>
					</v-card>
				</v-flex>
			</v-layout>
			<template>
				<v-dialog v-model="dialog2" max-width="900px">
        <v-card>
          <v-card-title>
            ¿Cómo crear o modificar marcadores ?
          </v-card-title>
          <v-card-text>
            
            <youtube video-id="bE66XPod_kM"></youtube>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="dialog2=false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
			</template>
			<template>
				<v-dialog v-model="pollerodata" max-width="500px">
        <v-card>
          <v-card-title v-if="pollero_activo">
            {{ pollero_activo.pollero }} 
						<img :src="'/assets/fpc/'+escudo_FPC(pollero_activo.hincha) + '.png'" class="np_home_escudofpc">
          </v-card-title>
          <v-card-text class="np_datopollerohome" v-if="pollero_activo">
						<v-chip color="primary" text-color="white">{{quien(pollero_activo.polleroamigo)}}</v-chip>
						<v-chip>{{ pollero_activo.edad }}</v-chip>
						<v-chip color="primary" text-color="white" v-for="(equipo, index) in pollero_activo.favoritos" :key="equipo.index">{{equipo}}</v-chip>
						<hr>
						<v-chip color="primary" text-color="white">Pronósticos: {{pronos_parciales_pollero(pollero_activo.id)}}</v-chip>
						
						
            
            
						<!--<pre>{{pollero_activo}}</pre>-->
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="pollerodata=false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
			</template>
		</v-container>
</template>
<script>

//<!-- {{quien(item.polleroamigo)}}  {{es_pollero_amigo(item.id)}}-->
import { mapState, mapGetters } from 'vuex'
import TiempoRestante from './TiempoRestante.vue'
export default {
  data: () => ({
		dialog2: false,
		polleros: null,
		pollerodata: false,
		txsnack: '',
		timeout: 5000,
    valore: null,
		estatuspronos: null,
		pollero_activo: null,
		polleroamigoactivo: null

	}),
	    components: {
      TiempoRestante
	  },
  methods:{
filtroPolleros(valor){
if(valor === 0){
	this.polleroamigoactivo = null;
}else{
	this.polleroamigoactivo = valor;
}
},
		escudo_FPC(equipo){
      var escudo =  this.escudoFPC(equipo)
      return escudo.escudo
    },
		mueche(pollero){
			this.txsnack = pollero;
			this.pollero_activo = (_.filter(this.allpollerosHome, { 'id': pollero}))[0];
			this.pollerodata = true;
		},
		quien(jugatore){
			var sale = _.find(this.pollerosamigos, { 'nombre': jugatore});
			//console.log("El PA es " + sale.sigla);
			if(sale){
				console.log("El PA es " + sale.sigla);
				return sale.sigla;
			}else{
				console.log("PAILASS")
			}
		},
		es_pollero_amigo(id){
			var sale = _.find(this.pollerosamigos, { 'id': id});
			if(sale){
				return sale.id === id ? true: false
			}else{
				return false;
			}
			
		},
		pronos_parciales_pollero(pollero){
		var tempo = _.filter(this.consolidadoPronos, { 'id_jugador': pollero});
		return tempo.length;
		},
		lafrase () {
			return this.frasesculas[Math.floor(Math.random() * this.frasesculas.length)]
		},
    sortObject (obj) {
        var arr = [];
        var prop;
        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                arr.push({
                    'key': prop,
                    'value': obj[prop]
                });
            }
        }
        arr.sort(function(a, b) {
            return b.value - a.value;
        });
        return arr; // returns array
    },
    formatPremio(value) {
      var premio = 0;
      if(this.allpollerosHome){
        value < 10 ? premio = (((this.allpollerosHome.length) * (this.elplandepremios.cuota *((100 - this.elplandepremios.fee)/100))) *(this.elplandepremios.porcentajes[value]/100)): premio = value;
      }
        //this.porcentajes[value] * this.elplandepremios.cuota * 
        //=(polleros * (cuota * ((100 - fee)/100))) * (E4 / 100)
        let val = (premio/1).toFixed(0).replace('.', ',')
        return '$' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    pdftest(){
    if (this.polleroID) {
      //axios.get(`/wp-json/generatepdf/v1/all/` + this.polleroID)
      //https://gist.github.com/javilobo8/097c30a233786be52070986d8cdb1743 ENLACE MÁGICO
      axios({
  url: `/wp-json/generatepdfpollero/v1/all/` + this.polleroID,
  method: 'GET',
  responseType: 'blob', // important
}).then(response => {
        var str = 'FASE-'+this.fasePolla.fase+'-'+this.nombrePollero + '-pronos-nuestrapolla-' + this.eltiempo +'.pdf';
        str = str.replace(/\s+/g, '-').toLowerCase();
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', str);
        document.body.appendChild(link);
        link.click();

          //this.showFile(escape(response.data));
          //console.log(response.data)
          //window.open().document.write(response.data);
          //window.open("data:application/pdf," + escape(response.data)); 
          
				})
				.catch(e => {
          //this.errors.push(e.message)
          //console.log("Hay un error en pdftest Diariopolla.vue")
				})
		}else{
			//console.log("pasa por main CREAR un PDF")
		}
    }
	},
	created() {
    axios.get(`/wp-json/pollerosamics/v1/all/`).then(response => {
                var lospolleros = response.data
                _.each(lospolleros, item => item.id = parseInt(item.id))
                _.each(lospolleros, item => item.orden = parseInt(item.orden))
                this.polleros = lospolleros;
            }).catch(e => {
                this.errors.push(e.message)
            })
		
		
  },
  mounted() {
    //console.log("///////////////")
		this.estatuspronos = this.pronosPendientes;

		
		
  },
  watch: {
    pronosticosPolleroActivo(val){
      var nulos = _.filter(val, function(o) { if (isNaN(o.m_loc)) return o }).length;
      //console.log("LOS NULOS SON: " + nulos)
      this.valore = val.length - nulos;
    },
    pronosPendientes(val){
      //console.log("Cambia")
      this.estatuspronos = val;
    }
  },
    computed: {
    ...mapState(['horamostrable', 'frasesculas', 'pollerosamigos']),
    ...mapGetters(['allpollerosHome', 'nombrePollero', 'posicionesNumericas', 'fasePolla', 'losOtrosPolleros', 'pronosticosPolleroActivo', 'calendarioArray', 'consolidadoPronos', 'statistics', 'polleroID', 'eltiempo','elplandepremios', 'escudoFPC']),
    pronosPendientes(){
        if(this.fasePolla && this.pronosticosPolleroActivo){
          var nulos = _.filter(this.pronosticosPolleroActivo, function(o) { if (isNaN(o.m_loc)) return o }).length;
          return (parseInt(this.fasePolla.partidos) - (parseInt(this.pronosticosPolleroActivo.length))+ nulos);
        }
      },
    frecuentes(){
      if(this.statistics.grupo){
        var sortable = this.sortObject(this.statistics.grupo)
      }
      return sortable
    },
    golesporpartido(){
      if(this.statistics.sumagxp){
        var sortable = this.sortObject(this.statistics.sumagxp)
      }
      return sortable
		},
		filtrados_pollero(){
			
			if(this.polleroamigoactivo){
				return this.allpollerosHome.filter((polleros) => polleros.polleroamigo === this.polleroamigoactivo)
			}else{
				//return 
				return _.sortBy(this.allpollerosHome, [function(o) { return o.id; }]);
				
			}
		},

    }
  
} 
</script>
<style>
.textopeq{
  font-size: 0.7em;
}
</style>