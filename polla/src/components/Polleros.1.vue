<template>
  <div v-if="datosUsuarioWordpress.userlogged">
<v-expansion-panel>
    <v-expansion-panel-content v-for="(item,i) in configuracionPolla[0].fechas" :key="i">
      <div slot="header">{{ item.fase }} {{ diferencia(item.finlimite,item.iniciolimite) }}</div>
      <v-card>
        <v-card-text class="grey lighten-3">
          {{ fechaCompleta(item.iniciolimite) }}
          - . -
          {{ fechaCompleta(item.finlimite) }}
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>


   <pre> jaime {{ configuracionPolla[0].fechas }} </pre> 
   <hr>
   <pre> de greiff {{ configuracionPolla[1] }} </pre> 
<hr><hr>
  <pre>1 {{ configuracionPolla.fechas}} </pre>
  <pre>2 {{ configuracionPolla[fechas]}} </pre>
  </div>
  <div v-else>
    Nada
  </div>
</template>

<script>
import { mapState} from 'vuex';
  export default {
    data () {
      return {
        items: [
          {
            text: 'Polleros',
            disabled: false
          },
          {
            text: 'jaime de greiff',
            disabled: false
          },
          {
            text: 'RUSSKI 2018 Copa del mundo',
            disabled: true
          }
        ]
      }
    },
        computed:{
    ...mapState(['horamostrable', 'datosUsuarioWordpress', 'configuracionPolla']),
  },
  }
</script>