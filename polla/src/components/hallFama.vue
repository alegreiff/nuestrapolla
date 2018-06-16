<template>
<v-layout row wrap>
<v-flex xs12>
<pre>{{posicionesNumericasHallFama[0].pollero}}</pre>
<pre>{{posicionesNumericasHallFama[1].pollero}}</pre>
<pre>{{posicionesNumericasHallFama[2].pollero}}</pre>
</v-flex>
<v-flex xs12>DOS</v-flex>
</v-layout>
</template>

<script>
import {  mapGetters} from 'vuex'
export default {
  name: "Hall de la Fama",

  data: function() {
    return {
        posiciones: null,

    };
  },
  methods: {
    
  },
  computed: {
    ...mapGetters(['posicionesNumericasHallFama']),
  },
    watch: {
 

  },
mounted () {


},

};
</script>