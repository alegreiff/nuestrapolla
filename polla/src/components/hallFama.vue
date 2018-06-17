<template>
<v-layout row wrap>
<v-flex xs12>
<p v-for="(pollero, index) in primeros" :key="index">PRIMERO: {{ pollero.pollero }}  {{ plan(0, primeros.length) }} + {{ plan(5, primeros.length) }}</p>

<ul>
    <li v-for="(pollero, index) in primeros" :key="index">POLLERO AMIGO DE PRIMERO: {{ pollero.pa }} {{ plan(4, primeros.length) }}</li>
</ul>

<p v-for="(pollero, index) in segundos" :key="index">SEGUNDO: {{ pollero.pollero }}  {{ plan(1, primeros.length) }}</p>
<p v-for="(pollero, index) in terceros" :key="index">TERCERO: {{ pollero.pollero }} {{ plan(2, terceros.length) }}</p>
<hr>
<p v-for="(pa, index) in pollerosamigos" :key="index" v-if="pa.suma > 10">
    Mejor pollero de: {{pa.sigla}}
    <ul>
        <li v-for="(benef, index) in mejorpollero(pa.sigla)" :key="index"> {{ benef.pollero }}  {{ plan(3, (10/(mejorpollero(pa.sigla).length))) }}</li>
    </ul>
    </p>
</v-flex>
<v-flex xs12><hr></v-flex>
</v-layout>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: "Hall de la Fama",

  data: function() {
    return {
        posiciones: null,
        primeros: null,
        segundos: null,
        terceros: null,

    };
  },
  methods: {
      //plandepremios: {cuota:150000, fee:20, porcentajes: [50, 20, 10, 10, 5, 5, 100] },
      plan(porc, cuantos){
          var tempo = ((this.plandepremios.porcentajes[porc] * (this.plandepremios.cuota * (100 - this.plandepremios.fee)) * this.posicionesNumericasHallFama.length)/100) / 100
          let val = (tempo/cuantos).toFixed(0).replace('.', ',')
        return '$' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
mejorpollero(pa){
    var tempo = this.posicionesNumericasHallFama.filter((posiciones) => posiciones.pa === pa)
    var tempo1 = tempo.filter((pollero) => pollero.pos > 3)[0]
    var pos = tempo1.pos
    console.log(pos)
    var tempo2 =  tempo.filter((pollero) => pollero.pos === pos)
    return tempo2
}



  },
  computed: {
    ...mapState(['pollerosamigos', 'plandepremios']),
    ...mapGetters(['posicionesNumericasHallFama']),
  },
    watch: {
 

  },
mounted () {
    
    if(this.posicionesNumericasHallFama){
        this.primeros = this.posicionesNumericasHallFama.filter((posiciones) => posiciones.pos === 1)
        this.segundos = this.posicionesNumericasHallFama.filter((posiciones) => posiciones.pos === 2)
        this.terceros = this.posicionesNumericasHallFama.filter((posiciones) => posiciones.pos === 3)
    }
    if(this.pollerosamigos){
        for(var i in this.pollerosamigos){
            var tempo = this.posicionesNumericasHallFama.filter((posiciones) => posiciones.pa === this.pollerosamigos[i].sigla)
            this.pollerosamigos[i].suma = tempo.length
        }
    }


},

};
</script>