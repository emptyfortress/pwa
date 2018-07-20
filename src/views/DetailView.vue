<template lang="pug">
v-container( grid-list-md text-xs-center )
	v-layout(row wrap)
		v-flex(xs12)
			v-card
				v-card-media(:src="cat.url" height="350")
				v-card-title(primary-title)
					h3.headline.mb-0 {{cat.comment}}
	v-btn(@click="goHome") Назад
	v-container
</template>

<script>
import { find } from 'lodash'

export default {
	data () {
		return {
			cat: ''
		}
	},
	mounted () {
		this.cat = find(this.$root.cat, (cat) => cat['.key'] === this.$route.params.id)
	},
	methods: {
		goHome () {
			this.$router.push('/')
		}
	}
}
</script>

<style scoped lang="scss">

</style>
