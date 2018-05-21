<template>
    <div class="np_flashcard">
        <div @click="isToggle=!isToggle" v-bind:style="{backgroundColor: colorFront, color: colorTextFront}" v-show="!isToggle" class="animated flipInX flashcard">
            <div class="card-header" style="padding-bottom: 15px;"> {{headerFront}} <span class="np_flashcard_posicion">Posición: {{ puntajes.pos }}</span></div>
            <div class="card-content center">
                <p v-bind:style="{fontSize: textSizeFront,fontWeight: 'bold'}">{{front}}<span class="np_pts_flashcard">Puntos</span></p>
                
                <img v-if="imgFront!=''" :src="imgFront" width="200" height="200">
            </div>
            <div class="card-footer" v-if="footerFront">Partidos: {{footerFront}}</div>
        </div>
        <div @click="isToggle=!isToggle" v-bind:style="{backgroundColor: colorBack, color: colorTextBack}" v-show="isToggle" class="animated flipInX flashcard">
            <div class="card-header" style="padding-bottom: 15px;"> {{headerBack}}</div>
            <div class="card-content center">
                <!--
                <v-layout column wrap v-for="(puntaje, i) in puntajes">
                
                <v-chip color="green" text-color="white">
                  <v-avatar class="green darken-4">{{ puntajes[i].puntos}}</v-avatar>
                  {{  (puntajes[i].puntos > 1 || puntajes[i].puntos < 1) ? puntajes[i].nombre + 's' : puntajes[i].nombre  }} 
                   <v-icon v-if="puntajes[i].comodin" class="np_estrella_dorada">star_border</v-icon>
                </v-chip>
                </v-layout>
                -->
                <v-layout column wrap>
                
                <v-chip color="green" text-color="white">
                  <v-avatar class="green darken-4">{{ puntajes.GRANCHEPAZO }}</v-avatar>
                  {{  (puntajes.GRANCHEPAZO > 1 || puntajes.GRANCHEPAZO < 1) ? 'Granchepazos' : 'Granchepazo'  }} 
                   <v-icon class="np_estrella_dorada">star_border</v-icon>
                </v-chip>
                <v-chip color="green" text-color="white">
                  <v-avatar class="green darken-4">{{ puntajes.DOBLE }}</v-avatar>
                  {{  (puntajes.DOBLE > 1 || puntajes.DOBLE < 1) ? 'Dobles' : 'Doble'  }} 
                   <v-icon class="np_estrella_dorada">star_border</v-icon>
                </v-chip>
                <v-chip color="green" text-color="white">
                  <v-avatar class="green darken-4">{{ puntajes.EXACTO }}</v-avatar>
                  {{  (puntajes.EXACTO > 1 || puntajes.EXACTO < 1) ? 'Chepazos' : 'Chepazo'  }} 
                </v-chip>
                <v-chip color="green" text-color="white">
                  <v-avatar class="green darken-4">{{ puntajes.SENCILLO }}</v-avatar>
                  {{  (puntajes.SENCILLO > 1 || puntajes.SENCILLO < 1) ? 'Sencillos' : 'Sencillo'  }} 
                </v-chip>
                <v-chip color="green" text-color="white">
                  <v-avatar class="green darken-4">{{ puntajes.BLANCOSIMPLE }}</v-avatar>
                  {{  (puntajes.BLANCOSIMPLE > 1 || puntajes.BLANCOSIMPLE < 1) ? 'Blancos' : 'Blanco'  }} 
                </v-chip>
                <v-chip color="green" text-color="white">
                  <v-avatar class="green darken-4">{{ puntajes.BLANCOCONCOMODIN }}</v-avatar>
                  {{  (puntajes.BLANCOCONCOMODIN > 1 || puntajes.BLANCOCONCOMODIN < 1) ? 'Pailas' : 'Paila'  }} 
                   <v-icon class="np_estrella_dorada">star_border</v-icon>
                </v-chip>
                <v-chip color="green" text-color="white">
                  <v-avatar class="green darken-4">{{ puntajes.NULO }}</v-avatar>
                  {{  (puntajes.NULO > 1 || puntajes.NULO < 1) ? 'Nulos' : 'Nulo'  }} 
                   
                </v-chip>
                </v-layout>
            </div>
            <div class="card-footer" v-if="footerBack">{{footerBack}} puntos</div>
        </div>
    </div>
</template>
<script>
export default {
	data () {
		return {
			isToggle: false
		}
	},
	props: {
		puntajes: {
			type: Array

		},
		imgFront: {
			type: String,
			default: ''
		},

		front: {
			type: String,
			default: ''
		},

		textSizeFront: {
			type: String,
			default: '5em'
		},

		colorTextFront: {
			type: String,
			default: 'black'
		},
		colorTextBack: {
			type: String,
			default: 'white'
		},
		colorFront: {
			type: String,
			default: 'white'
		},
		colorBack: {
			type: String,
			default: '#2ecc71'
		},
		headerFront: {
			type: String,
			default: ''
		},
		headerBack: {
			type: String,
			default: ''
		},
		footerFront: {
			type: String,
			default: ''
		},
		footerBack: {
			type: String,
			default: ''
		}
	}
}
</script>
<style scoped>
div.np_flashcard{
    max-width: 300px !important;
}
.center {
    text-align: center;
}
.flashcard {
    cursor: pointer;
    border-radius: 10px;
    margin: 20px;
    padding: 25px;
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
}
.flashcard:hover {
    box-shadow: 0 0px 25px rgba(0, 0, 0, 0.3);
}
.animated {
    animation-duration: 0.35s;
    animation-fill-mode: both;
}
@keyframes flipInX {
    from {
        transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
        animation-timing-function: ease-in;
        opacity: 0;
    }
    40% {
        transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
        animation-timing-function: ease-in;
    }
    60% {
        transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
        opacity: 1;
    }
    80% {
        transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    }
    to {
        transform: perspective(400px);
    }
}
.flipInX {
    backface-visibility: visible !important;
    animation-name: flipInX;
}
</style>