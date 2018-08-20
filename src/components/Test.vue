<template lang="pug">
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
