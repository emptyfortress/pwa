<template lang="pug">
v-container.infolder
	.folder
		i.icon-multi
		span Групповые операции
	br
	p(v-if="!selected") Ничего не выбрано
	v-layout(column v-if="selected")
		v-btn(large color="info") Взять в работу
		v-btn(large color="success") Согласовать
		v-btn(large color="warning") Согласовать с замечаниями
		v-btn(large color="error") Отклонить

</template>

<script>
export default {
	data () {
		return {
		}
	},
	computed: {
		selected () { return this.$store.getters.selected },
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
