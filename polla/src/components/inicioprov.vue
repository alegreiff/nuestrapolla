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
							<!--<v-btn href="https://nuestrapolla.com/assets/nuestrapolla-fasedegrupos.pdf"  target="_blank" block color="primary">Descargar TODOS los pronósticos - Fase de grupos
								<v-icon right dark>highlight</v-icon>
							</v-btn>-->
							<v-btn @click="pdftest()"  block color="terciary" v-if="(estatuspronos) === 0" >Descargar Mis pronósticos PDF
								<v-icon right dark>highlight</v-icon>
							</v-btn>
							<p v-if="estatuspronos>0">Pronósticos que le faltan para la fase de grupos: {{ estatuspronos }}</p>
							<p>Partidos para esta fase {{ fasePolla.partidos }}</p>
							<p>Esta es una polla de 64 partidos. Única para todo el mundial</p>
							<hr>
							<!--<p>Esta es una página de inicio provisional para polleros que necesiten modificar o crear marcadores. </p>
								<v-btn :to="{path: '/provis'}"  block color="primary">Ver toda la información de la polla
								<v-icon right dark>highlight</v-icon>
							</v-btn>
							-->
							<v-btn :to="{path: '/amigopollero'}"  block color="secondary">Enlace exclusivo para polleros amigos
								<v-icon right dark>highlight</v-icon>
							</v-btn>
								 
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
			
		</v-container>
</template>
<script>
//<!-- {{quien(item.polleroamigo)}}  {{es_pollero_amigo(item.id)}}-->
import { mapState, mapGetters } from 'vuex'
import TiempoRestante from './TiempoRestante.vue'
export default {
  data: () => ({

		estatuspronos: null,
		pollero_activo: null,
		polleroamigoactivo: null

	}),
	    components: {
      TiempoRestante
	  },
  methods:{
	
    pdftest(){
    if (this.polleroID) {
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

				})
				.catch(e => {
				})
		}else{

		}
    }
	},
  mounted() {
    //console.log("///////////////")
		this.estatuspronos = this.pronosPendientes;
		
  },
    watch: {
    pronosPendientes(val){
      //console.log("Cambia")
      this.estatuspronos = val;
    }
  },
    computed: {
    ...mapState(['horamostrable',]),
    ...mapGetters(['allpollerosHome', 'polleroID', 'nombrePollero','eltiempo', 'fasePolla','pronosticosPolleroActivo']),
    pronosPendientes(){
        if(this.fasePolla && this.pronosticosPolleroActivo){
					var pron = _.filter(this.pronosticosPolleroActivo, function(o) {return o.partido > 48 });
					var nulos = _.filter(pron, function(o) { if (isNaN(o.m_loc)) return o }).length;
					console.log(this.fasePolla.partidos +" - "+ pron.length+ " --- " +nulos)
          return (parseInt(this.fasePolla.partidos) - (parseInt(pron.length))+ nulos);
        }
      },


    }
  
} 
</script>