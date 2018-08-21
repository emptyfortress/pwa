<template lang="pug" >
div.all
	h1 {{currentFolder.text}}

	v-layout( row v-if="$vuetify.breakpoint.lgAndUp")
		v-flex(sm4 xs12)
			v-layout(column)
				v-card(flat v-for="item in items" :key="item.id" :to="currentPath + '/' + item.id")
					h2 Item {{item.id}}
		v-flex(sm8 xs12)
			.view
				v-slide-y-transition(mode="out-in")
					router-view

	v-layout( column wrap v-if="$vuetify.breakpoint.mdAndDown")
		v-flex(xs12)
			v-layout(column)
				v-card(flat v-for="item in items" :key="item.id" :to="'/m/' + item.id" )
					h2 Item {{item.id}}
</template>

<script>
export default {
	computed: {
		currentPath () {
			return this.currentFolder.data.path
		},
		currentFolder () {
			return this.$store.getters.currentFolder
		},
		loading () {
			return this.$store.getters.loading
		},
		items () {
			return this.$store.getters.items
		}
	}
}
</script>

<style scoped lang="scss">
.view {
	width: 100%;
	background: #ddd;
}
.v-card {
	margin-bottom: 1px;
	padding: 1rem;
	h2 {
		font-weight: 400;
	}
}
</style>
