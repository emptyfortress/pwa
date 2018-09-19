<template lang="pug">
v-container.infolder
	.folder
		i.icon-multi
		span Групповые операции
	br

</template>

<script>
export default {
	data () {
		return {
		}
	},
	computed: {
		currentFolder () {
			return this.$store.getters.currentFolder
		},
		filter () {
			return this.currentFolder.filter
		}
	},
	methods: {
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.infolder {
	padding-top: 0;
}
.folder {
	font-size: 2rem;
	opacity: .5;
	span {
		margin-left: 1rem;
	}
}

</style>
