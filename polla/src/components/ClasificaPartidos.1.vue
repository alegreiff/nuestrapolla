<template>
  <v-layout row wrap>
    <v-flex xs12>
        <v-card dark color="primary">
          <v-card-text class="px-0">12</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6 v-for="i in 2" :key="i">
        <v-card dark color="secondary">
          <v-card-text class="px-0">6</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs4 v-for="i in 3" :key="i">
        <v-card dark color="primary">
          <v-card-text class="px-0">4</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3 v-for="i in 4" :key="i">
        <v-card dark color="secondary">
          <v-card-text class="px-0">3</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs2 v-for="i in 6" :key="i">
        <v-card dark color="primary">
          <v-card-text class="px-0">2</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs1 v-for="i in 12" :key="i">
        <v-card dark color="secondary">
          <v-card-text class="px-0">1</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-chip label outline color="blue" text-color="black" v-for="partido in matches" :key="partido.id" v-if="matches">
          {{partido.local}} - {{partido.visitante}} {{ valor(partido.idloc, partido.idvis)}}
        </v-chip>


 <v-chip color="indigo" text-color="white">
      <v-avatar>
        <v-icon>account_circle</v-icon>
        <v-icon>mood_bad</v-icon>
        <v-icon>mood</v-icon>
      </v-avatar>
      Ranee
    </v-chip>
          
        
      </v-flex>
    
  </v-layout>

</template>
<script>
import {
  mapGetters
} from 'vuex'
//import draggable from 'vuedraggable'
export default {
  data() {
    return {
      matches: {},
      list: [{
        name: "John"
      }, {
        name: "Joao"
      }, {
        name: "Jean"
      }],
      list2: [{
        name: "Juan"
      }, {
        name: "Edgard"
      }, {
        name: "Johnson"
      }],
      list3: {},

    }
  },
  components: {
    //draggable,
  },
  created() {

  },
  computed: {
    ...mapGetters(['valueequipos', 'calendario']),
  },
  methods: {
    valor(loc, vis) {
      var local = _.find(this.valueequipos, ['equipo', (loc)]);
      var visit = _.find(this.valueequipos, ['equipo', (vis)]);
      //console.table (local.puntos)
      return ((local.puntos * local.interes ) + (visit.puntos * visit.interes))

    },
    add: function () {
      this.list.push({
        name: 'Juan'
      });
    },
    replace: function () {
      this.list = [{
        name: 'Edgard'
      }]
    },
    onMove({
      relatedContext,
      draggedContext
    }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      //return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      console.log(relatedElement + ' - ' + draggedElement);
    }
  },
  watch: {
    calendario(val) {
      if (this.valueequipos) {
        var tempo = val;
        for (var i in tempo) {
          var t = this.valor(tempo[i].idloc, tempo[i].idvis)
          //var local = _.find(this.valueequipos, ['equipo', (tempo[i].loc)]);
          console.log(t)
          //var visit = _.find(this.valueequipos, ['equipo', (tempo[i].vis)]);
          tempo[i].points = t;

        }
        tempo = _.sortBy(tempo, ['points'], ['desc'])
        this.matches = _.cloneDeep(tempo)
      }


    },

  },
  created() {

  }

}
</script>
<style>
.draga{
  padding: 10px;
  cursor: pointer;
  border: 2px blue solid;
  background: lime;
  font-size: 0.5em;
  
  
}
.dragArea{
min-height: 100px;
background: yellow;
}
</style>

