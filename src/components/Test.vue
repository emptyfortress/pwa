<template lang="pug">
h3 this is details of item для папки {{currentFolder.text}}
</template>

<script>
export default {
	computed: {
		currentFolder () {
			return this.$store.getters.currentFolder
		}
	}
}
</script>
