<template>
<ul class="vue-countdown">
    <li>
        <p class="digit">{{ days | twoDigits }}</p>
        <p class="text">Días</p>
    </li>

    <li>
        <p class="digit">{{ hours | twoDigits }}</p>
        <p class="text">Horas</p>
    </li>

    <li>
        <p class="digit">{{ minutes | twoDigits }}</p>
        <p class="text">Minutos</p>
    </li>

    <li>
        <p class="digit">{{ seconds | twoDigits }}</p>
        <p class="text">Segundos</p>
    </li>
</ul>
</template>

<script>
import Vue from 'vue'
Vue.filter('twoDigits', (value) => {
    if ( value.toString().length <= 1 ) {
        return '0'+value.toString()
    }
    return value.toString()
})
export default {
    props: ['deadline'],
    data() {
        return {
            now: Math.trunc((new Date()).getTime() / 1000),
            date: null
        }
    },
    mounted() {
        this.date = Math.trunc(Date.parse(this.deadline) / 1000)
        setInterval(() => {
            this.now = Math.trunc((new Date()).getTime() / 1000)
        }, 1000)
    },
    computed: {
        seconds() {
            return Math.trunc(this.date - this.now) % 60
        },
        minutes() {
            return Math.trunc((this.date - this.now) / 60) % 60
        },
        hours() {
            return Math.trunc((this.date - this.now) / 60 / 60) % 24
        },
        days() {
            return Math.trunc((this.date - this.now) / 60 / 60 / 24)
        }
    }
}
</script>