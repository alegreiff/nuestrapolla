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
							<v-btn @click="pdftest()"  block color="terciary" v-if="(estatuspronos) === 0" >Descargar Mis pronósticos PDF
								<v-icon right dark>highlight</v-icon>
							</v-btn>
							<p v-if="estatuspronos>0">Pronósticos que le faltan para la fase de grupos: {{ estatuspronos }}</p>
							<p>Partidos para esta fase {{ fasePolla.partidos }}</p>
							<p>Esta es una polla de 64 partidos. Única para todo el mundial</p>
							<hr>
							<p>Esta es una página de inicio provisional para polleros que necesiten modificar o crear marcadores. 
								<v-btn :to="{path: '/provis'}"  block color="primary">Ver toda la información de la polla
								<v-icon right dark>highlight</v-icon>
							</v-btn>

							<v-btn :to="{path: '/amigopollero'}"  block color="secondary">Enlace exclusivo para polleros amigos
								<v-icon right dark>highlight</v-icon>
							</v-btn>
								 </p>
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

    computed: {
    ...mapState(['horamostrable',]),
    ...mapGetters(['allpollerosHome', 'nombrePollero', 'fasePolla','pronosticosPolleroActivo']),
    pronosPendientes(){
        if(this.fasePolla && this.pronosticosPolleroActivo){
          var nulos = _.filter(this.pronosticosPolleroActivo, function(o) { if (isNaN(o.m_loc)) return o }).length;
          return (parseInt(this.fasePolla.partidos) - (parseInt(this.pronosticosPolleroActivo.length))+ nulos);
        }
      },


    }
  
} 
</script>