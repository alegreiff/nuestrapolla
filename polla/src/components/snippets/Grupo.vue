<template>

<div>
    <p v-for="partido in partidosgrupo">
        {{ partido.ciudad}}    
    </p> 
</div>

</template>

<script>
export default {
	name: 'grupo_rusia',
	props: {
		partidosgrupo: []
	}
}
</script>

<style>

</style>