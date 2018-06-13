<template>
    <v-list two-line dense>
        <v-list-tile :to="{path: '/'}" exact>
            <v-list-tile-action><v-icon>more_horiz</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>Inicio</v-list-tile-title></v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path: '/provis'}" >
            <v-list-tile-action><v-icon>more_horiz</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>Inicio completo</v-list-tile-title></v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path: '/diariopolla'}">
            <v-list-tile-action><v-icon>more_horiz</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>Polla</v-list-tile-title></v-list-tile-content>
        </v-list-tile>
        <!--<v-list-tile :to="{path: '/pronos'}">
            <v-list-tile-action><v-icon>more_horiz</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>Ingreso de marcadores</v-list-tile-title></v-list-tile-content>
        </v-list-tile>-->
        <v-list-tile :to="{path: '/calendario'}">
            <v-list-tile-action><v-icon>more_horiz</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>Calendario</v-list-tile-title></v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path: '/clasificador'}" exact>
            <v-list-tile-action><v-icon>more_horiz</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>Clasificador</v-list-tile-title></v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path: '/reglamento'}" exact>
            <v-list-tile-action><v-icon>more_horiz</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>Reglamento</v-list-tile-title></v-list-tile-content>
        </v-list-tile>
        
        <!--<v-list-tile :to="{path: '/mispronos'}">
            <v-list-tile-action><v-icon>more_horiz</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>Comparapollas</v-list-tile-title></v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path: '/posiciones'}" exact>
            <v-list-tile-action><v-icon>more_horiz</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>Posiciones</v-list-tile-title></v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path: '/clasificador'}" exact>
            <v-list-tile-action><v-icon>more_horiz</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>Clasificador</v-list-tile-title></v-list-tile-content>
        </v-list-tile>-->
        <v-list-tile :to="{path: '/miperfil'}" exact>
            <v-list-tile-action><v-icon>more_horiz</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>Mi perfil</v-list-tile-title></v-list-tile-content>
        </v-list-tile>
        <v-list-tile href="/salida">
            <v-list-tile-action><v-icon>exit_to_app</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>Salir</v-list-tile-title></v-list-tile-content>
        </v-list-tile>
    </v-list>
</template>
<script>
export default {
	name: 'MenuPrincipal',
}
</script>