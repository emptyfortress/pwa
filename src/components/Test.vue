<template lang="pug">
div
	div(v-for="n in 50")
		h3 this is details of item {{currentItem.id}} для папки {{currentFolder.text}}
</template>

<script>
export default {
	props: ['id'],
	computed: {
		currentFolder () {
			return this.$store.getters.currentFolder
		},
		currentItem () {
			return this.$store.getters.currentItem(this.id)
		}
	}
}
</script>

<style scoped lang="scss">
div div { margin-top: 2rem; }

</style>
