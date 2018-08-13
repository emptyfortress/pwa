<template lang="pug">
<!-- v&#45;container -->
	<!-- h1 this is folder -->
div
	h1 Folder {{folderId}}
	v-layout( row wrap v-if="$vuetify.breakpoint.lgAndUp")
		v-flex(sm6 xs12)
			v-layout(v-for="item in items" column)
				v-card(flat router :to="temp")
					h2 {{ item.title }}&nbsp;{{folderId}}.{{item.num}}
		v-flex(sm6 xs12)
			.view
				router-view
</template>

<script>
export default {
	data () {
		return {
			temp: '/section/' + this.$route.params.id + '/detail/'
		}
	},
	computed: {
		loading () {
			return this.$store.getters.loading
		},
		items () {
			return this.$store.getters.items
		},
		folderId () {
			return this.$route.params.id
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
