<template lang="pug">
v-container(grid-list-xl fluid)
	v-layout( row wrap )
		v-flex(v-for="item in items" sm3)
			v-card(flat tile)
				p {{item.title}}
</template>

<script>
export default {
	props: ['items'],
	data () {
		return {

		}
	},
	computed: {
	},
	methods: {
	}
}
</script>

<style scoped lang="scss">
.v-card {
	/* width: 200px; */
	height: 300px;
}
</style>
