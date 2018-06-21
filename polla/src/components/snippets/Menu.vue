<template>
    <v-list two-line dense>
        <v-list-tile :to="{path: '/'}" exact>
            <v-list-tile-action><v-icon>more_horiz</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>Inicio</v-list-tile-title></v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path: '/posiciones'}" > 
            <v-list-tile-action><v-icon>more_horiz</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>Posiciones</v-list-tile-title></v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path: '/grupos'}" > 
            <v-list-tile-action><v-icon>more_horiz</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>Equipos</v-list-tile-title></v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path: '/pdfs'}">
            <v-list-tile-action><v-icon>more_horiz</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>PDF Mis pronósticos</v-list-tile-title></v-list-tile-content>
        </v-list-tile>
        <!--<v-list-tile :to="{path: '/pronos'}">
            <v-list-tile-action><v-icon>more_horiz</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>Ingreso de marcadores</v-list-tile-title></v-list-tile-content>
        </v-list-tile>-->
        <v-list-tile :to="{path: '/calendario'}">
            <v-list-tile-action><v-icon>more_horiz</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>Calendario</v-list-tile-title></v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path: '/compara'}">
            <v-list-tile-action><v-icon>more_horiz</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>Compara pronósticos</v-list-tile-title></v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path: '/clasificador'}" exact>
            <v-list-tile-action><v-icon>more_horiz</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>Clasificador</v-list-tile-title></v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path: '/reglamento'}" exact>
            <v-list-tile-action><v-icon>more_horiz</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>Reglamento</v-list-tile-title></v-list-tile-content>
        </v-list-tile>
        
        
        <!--<v-list-tile :to="{path: '/posiciones'}" exact>
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