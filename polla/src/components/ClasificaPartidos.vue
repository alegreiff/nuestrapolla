<template>
<v-layout row wrap v-if="g1 && g2 && g3 && g4" class="clasificador">
<v-flex xs12>
<p>Esta clasificación de partidos obedece al ránking FIFA, a sus dos favoritos ({{polleroFavoritos[0][0]}} y {{polleroFavoritos[0][1]}}), a Colombia y a la subjetividad de Nuestra Polla. Organícelos a su gusto y descargue y comparta el resultado</p>
<v-btn color="info" @click="downloadVisualReport">Descargar partidos de interés para {{nombrePollero}}</v-btn>
</v-flex>
<v-layout row wrap ref="capture">
<v-flex xs3 >
        <v-btn depressed small disabled block>Imperdibles</v-btn>
				<Container :group-name="'1'" :get-child-payload="getChildPayload1" @drop="onDrop('g1', $event)">
					<Draggable v-for="(partido, index) in g1" :key="partido.id">
						<div class="draggable-item clasificador_g1">
              <span class="clasificador_match"><strong>{{index + 1}}</strong> {{partido.local}} - {{partido.visitante}}<img :src="'/assets/dtv.png'" alt="" class="" v-if="partido.dtv===1"></span>
              <span class="clasificador_fecha">{{ diaFechaCorta(partido.fecha) }} {{ fechaHoraLocal(partido.fecha, (partido.hora)) }}</span>
              
						</div>
					</Draggable>
				</Container>
	
</v-flex>
<v-flex xs3>
<v-btn depressed small disabled block>Interesantes</v-btn>
				<Container :group-name="'1'" :get-child-payload="getChildPayload2" @drop="onDrop('g2', $event)">
					<Draggable v-for="(partido, index) in g2" :key="partido.id">
						<div class="draggable-item clasificador_g2">
              <span class="clasificador_match"><strong>{{index + 1 + g1.length}}</strong> {{partido.local}} - {{partido.visitante}}<img :src="'/assets/dtv.png'" alt="" class="" v-if="partido.dtv===1"></span>
              <span class="clasificador_fecha">{{ diaFechaCorta(partido.fecha) }} {{ fechaHoraLocal(partido.fecha, (partido.hora)) }}</span>
              
						</div>
					</Draggable>
				</Container>
	
</v-flex>
<v-flex xs3>
<v-btn depressed small disabled block>Si no hay nada mejor</v-btn>
				<Container :group-name="'1'" :get-child-payload="getChildPayload3" @drop="onDrop('g3', $event)">
					<Draggable v-for="(partido, index) in g3" :key="partido.id">
						<div class="draggable-item clasificador_g3">
              <span class="clasificador_match"><strong>{{index + 1 + g1.length + g2.length}}</strong> {{partido.local}} - {{partido.visitante}}<img :src="'/assets/dtv.png'" alt="" class="" v-if="partido.dtv===1"></span>
              <span class="clasificador_fecha">{{ diaFechaCorta(partido.fecha) }} {{ fechaHoraLocal(partido.fecha, (partido.hora)) }}</span>
              
              
						</div>
					</Draggable>
				</Container>
	
</v-flex>
<v-flex xs3>
<v-btn depressed small disabled block>Prescindibles</v-btn>
				<Container :group-name="'1'" :get-child-payload="getChildPayload4" @drop="onDrop('g4', $event)">
					<Draggable v-for="(partido, index) in g4" :key="partido.id">
						<div class="draggable-item clasificador_g4">
              <span class="clasificador_match"><strong>{{index + 1 + g1.length + g2.length + g3.length}}</strong> {{partido.local}} - {{partido.visitante}}<img :src="'/assets/dtv.png'" alt="" class="" v-if="partido.dtv===1"></span>
              <span class="clasificador_fecha">{{ diaFechaCorta(partido.fecha) }} {{ fechaHoraLocal(partido.fecha, (partido.hora)) }}</span>
              
						</div>
					</Draggable>
				</Container>
	
</v-flex>


<v-flex xs12>Partidos de interés para {{nombrePollero}} en Nuestra Polla</v-flex>
</v-layout>
</v-layout>
</template>

<script>
import {  mapGetters} from 'vuex'
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, generateItems } from "../utils";
export default {
  name: "Groups",
  components: { Container, Draggable },
  data: function() {
    return {
      matches: {},
      g1: null,
      g2: null,
      g3: null,
      g4: null,
      items1: generateItems(15, i => ({
        id: "1" + i,
        data: `Draggable 1 - ${i}`
      })),
      /*
      items2: generateItems(15, i => ({
        id: "2" + i,
        data: `Draggable 2 - ${i}`
      })),
      items3: generateItems(15, i => ({
        id: "3" + i,
        data: `Draggable 3 - ${i}`
      })),
      items4: generateItems(15, i => ({
        id: "4" + i,
        data: `Draggable 3 - ${i}`
      }))*/
    };
  },
  methods: {
    favoritoEquipo(equipo){
      return this.equipoFavoritoID(equipo)
    },
    showCaptureRef() {
      //console.log("this.$refs.capture: " + this.$refs.capture);
      let vc = this;
      return vc.$refs.capture;
    },
    downloadVisualReport () {
      let vc = this
      // alert("Descargando reporte visual")
      //console.log('campaign-view#downloadVisualReport');
      window.html2canvas(vc.showCaptureRef()).then(canvas => {
          //document.body.appendChild(canvas)
    //var canvasElement = document.getElementById(id);

    var fileName = "partidos-de-" +this.nombrePollero+".png";
    var MIME_TYPE = "image/png";

    var imgURL = canvas.toDataURL(MIME_TYPE);

    var dlLink = document.createElement('a');
    dlLink.download = fileName;
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);


          /*const url = window.URL.createObjectURL(new Blob([canvas]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', "saveimagejaimepolla.png");
          document.body.appendChild(link);
          link.click();*/
      }).catch((error) => {
        //console.log("Erorr descargando reporte visual", error)
      });
    },
    onDrop: function(collection, dropResult) {
      //console.log(dropResult)
      this[collection] = applyDrag(this[collection], dropResult);
    },
    getChildPayload1: function(index) {
      if(this.g1){
        return this.g1[index];
      }
    },
    getChildPayload2: function(index) {
      if(this.g2){
        return this.g2[index];
      }
    },
    getChildPayload3: function(index) {
      if(this.g3){
        return this.g3[index];
      }
		},
		getChildPayload4: function(index) {
      if(this.g4){
        return this.g4[index];
      }
    },
    valor(loc, vis) {
      var fav1 = this.favoritoEquipo(this.polleroFavoritos[0][0]);
      var fav2 = this.favoritoEquipo(this.polleroFavoritos[0][1]);
      var bono = 1000;
      var favorito = 0;
      if(loc === fav1){
        favorito=favorito + bono;
      }
      if(loc === fav2){
        favorito=favorito + bono;
      }
      if(vis === fav1){
        favorito=favorito + bono;
      }
      if(vis === fav2){
        favorito=favorito + bono;
      }
      var local = _.find(this.valueequipos, ['equipo', (loc)]);
      var visit = _.find(this.valueequipos, ['equipo', (vis)]);
      //console.table (local.puntos)
      
      //<p v-for="item in polleroFavoritos[0]">{{ favoritoEquipo(item) }}</p>
      
      return ((local.puntos + local.interes + visit.puntos + visit.interes + favorito))
      //return ((local.interes + visit.interes))

      //return (((local.puntos * 0.4) + (local.interes * 60) ) + ((visit.puntos * 0.4) + (visit.interes * 60))).toFixed(2);

    },
    creaListas(){
      //console.log("creando las listas");
      if (this.valueequipos && this.calendario) {
        var tempo = this.calendario;
        for (var i in tempo) {
          var t = this.valor(tempo[i].idloc, tempo[i].idvis)
          tempo[i].points = t;
          tempo[i].data = 'Hola ' +t;
        }
        var sort_tempo = _.orderBy(tempo, ['points'], ['desc'])
        this.g1 = _.slice(sort_tempo, [0], [12])
        this.g1 = _.values(this.g1);
        this.g2 = _.slice(sort_tempo, [12], [24])
        this.g2 = _.values(this.g2);
        this.g3 = _.slice(sort_tempo, [24], [36])
        this.g3 = _.values(this.g3);
        this.g4 = _.slice(sort_tempo, [36], [48])
        this.g4 = _.values(this.g4);
        this.matches = _.cloneDeep(sort_tempo)
      }
    }
  },
  computed: {
    ...mapGetters(['valueequipos', 'calendario', 'polleroFavoritos', 'equipoFavoritoID', 'nombrePollero']),
  },
    watch: {
    calendario(val) {
      if (this.valueequipos) {
        var tempo = val;
        for (var i in tempo) {
          var t = this.valor(tempo[i].idloc, tempo[i].idvis)
          tempo[i].points = t;
          tempo[i].data = 'Hola ' +t;
        }
        var sort_tempo = _.orderBy(tempo, ['points'], ['desc'])
        this.g1 = _.slice(sort_tempo, [0], [12])
        this.g1 = _.values(this.g1);
        this.g2 = _.slice(sort_tempo, [12], [24])
        this.g2 = _.values(this.g2);
        this.g3 = _.slice(sort_tempo, [24], [36])
        this.g3 = _.values(this.g3);
        this.g4 = _.slice(sort_tempo, [36], [48])
        this.g4 = _.values(this.g4);
        this.matches = _.cloneDeep(sort_tempo)
      }


    },

  },
  	mounted () {
      this.creaListas();
	},

};
</script>