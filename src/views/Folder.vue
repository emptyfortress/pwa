<template lang="pug" >
div
	h1 Folder {{pageTitle}}
	v-layout( row wrap v-if="$vuetify.breakpoint.lgAndUp")
		v-flex(sm6 xs12)
			v-layout(v-for="item in items" column)
				v-card(flat router :to="goToDetail(item.id)" )
					h2 Item {{item.id}}
		v-flex(sm6 xs12)
			.view
				v-slide-y-transition(mode="out-in")
					router-view
	v-layout( column wrap v-if="$vuetify.breakpoint.mdAndDown")
		v-flex(sm6 xs12)
			v-layout(column)
				v-card(flat v-for="item in items" :to="goToDetailSm(item.id)" )
					h2 Item
</template>

<script>
export default {
	data () {
		return {
		}
	},
	computed: {
		url () {
			const path = this.$route.path.split('/')
			return path[1]
		},
		loading () {
			return this.$store.getters.loading
		},
		items () {
			return this.$store.getters.items
		},
		pageTitle () {
			return this.$store.getters.pageTitle
		}
	},
	methods: {
		goToDetail (e) {
			return '/' + this.url + '/items/' + e
		},
		goToDetailSm (e) {
			return '/item/' + e
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
