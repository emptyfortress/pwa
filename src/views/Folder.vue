<template lang="pug" >
div
	h1 {{currentFolder.text}}
	v-layout( row wrap v-if="$vuetify.breakpoint.lgAndUp")
		v-flex(sm6 xs12)
			v-layout(v-for="item in items" :key="item.id" column)
				v-card(flat router :to="goToDetail(item)" )
					h2 Item {{item.id}}
		v-flex(sm6 xs12)
			.view
				v-slide-y-transition(mode="out-in")
					router-view
	v-layout( column wrap v-if="$vuetify.breakpoint.mdAndDown")
		v-flex(sm6 xs12)
			v-layout(column)
				v-card(flat v-for="item in items" :to="goToDetailSm(item)" )
					h2 Item
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
		loading () {
			return this.$store.getters.loading
		},
		items () {
			return this.$store.getters.items
		}
	},
	methods: {
		goToDetail (e) {
			return this.currentFolder.data.path + '/item/' + e.id
			// return '/section/:section' + '/item/' + e.id
		},
		goToDetailSm (e) {
			return '/item/' + e.id
		}
	}
}
</script>

<style scoped lang="scss">
.list {
	width: 100%;
}
.view {
	height: 200px;
	width: 100%;
	background: #ddd;
}
.v-card {
	min-height: 100px;
	margin-bottom: 1rem;
	h2 {
		font-weight: 400;
	}

}
</style>
