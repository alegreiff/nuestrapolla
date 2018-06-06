<template>
  <v-app>
    <v-navigation-drawer 
    :mini-variant="miniVariant" 
    :mobile-break-point="2600"
    :clipped="clipped" v-model="drawer" fixed app>
    <MenuPrincipal></MenuPrincipal>
    <img :src="'/assets/lp.png'" class="" alt="Nuestra Polla">
    </v-navigation-drawer>
    <v-toolbar :fixed="!fixed" app :clipped-left="clipped" color="pollarojo2" dark>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      
      <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'" class="ml-0 pl-3">
       
        <span class="hidden-xs-only np_textodusha">Nuestra Polla 2018</span> 
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <p class="np_textosmalltitulo">{{ nombrePollero }} <span v-if="valore != null && (fasePolla.partidos - valore > 0)"> Le faltan {{ fasePolla.partidos - valore }} pronósticos</span></p>
      <v-spacer></v-spacer>
      <img :src="'/assets/bannerpolla.png'" class="bannerpolla" alt="Nuestra Polla">
      {{ $vuetify.breakpoint.width }}
      <v-btn icon @click.stop="rightDrawer = !rightDrawer" >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <!-- :: {{ fasePolla.partidos }} : {{ pronosticosPolleroActivo.length }} ::: {{ estatuspronos }} :: -->
      
        <!-- <v-fade-transition mode="out-in"> -->
          <router-view></router-view>
        <!-- </v-fade-transition> -->
      
    </v-content>
    <v-navigation-drawer temporary :right="right" v-model="rightDrawer" fixed>
      <img :src="'/assets/polla.png'" class="" alt="Nuestra Polla">
    </v-navigation-drawer>
    <v-footer  fixed color="pollarojo2" dark>
      <span><TiempoRestante deadline="June 14, 2018 10:00"></TiempoRestante></span>
      <button v-shortkey.once="['ctrl', 'h']" @shortkey="theAction()"></button> <span class="versionpolla">
        {{infoversion}}
        </span>
    </v-footer>
    <template>
      <v-layout row justify-center>
        <v-dialog v-model="vieneeljefe" fullscreen transition="dialog-bottom-transition" class="jefe">
          <v-card>
          <v-toolbar dark color="pollagris">
          <v-btn icon @click.native="vieneeljefe = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>¿Cómo ser más productivo para la empresa?</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="vieneeljefe = false">Guardar contenido</v-btn>
          </v-toolbar-items>
        </v-toolbar> 
          <ElJefe :modelo="vieneeljefe"></ElJefe>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
  </v-app>
</template>
<script>
import { mapGetters } from 'vuex'
import MenuPrincipal from './components/snippets/Menu.vue'
import ElJefe from './components/snippets/Jefe.vue'
import TiempoRestante from './components/TiempoRestante.vue'

  export default {
    data: () => ({
      infoversion: 'v.1.30 Pardito como pollero amigo',
      vieneeljefe: false,
      clipped: true,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      estatuspronos: null,
      valore: null
    }),
    components: {
      MenuPrincipal,
      ElJefe,
      TiempoRestante
	  },
  computed:{
      ...mapGetters(['nombrePollero', 'pronosticosPolleroActivo', 'fasePolla', 'consolidadoPronos']),
      pronosPendientes(){
        if(this.fasePolla && this.pronosticosPolleroActivo){
          var nulos = _.filter(this.pronosticosPolleroActivo, function(o) { if (isNaN(o.m_loc)) return o }).length;
          return (parseInt(this.fasePolla.partidos) - (parseInt(this.pronosticosPolleroActivo.length))+ nulos);
        }
      }
    },
  methods:{
    theAction () {
      //console.log("hjkdf hsjfhsdjfhsdjk")
      this.vieneeljefe = true;
      //this.$router.push('/')
    }

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
  }
}

</script>