<template lang="pug">
v-container(grid-list-xl fluid)
	SlickList( :value="items" axis="xy" @input="newArr" )
		v-layout( row wrap )
			SlickItem(v-for="(item, index) in items" :index="index" :key="index" :item="item" ).sli
				v-card(flat tile)
					p {{item.title}}
</template>

<script>
import { SlickList, SlickItem } from 'vue-slicksort'

export default {
	props: ['items'],
	data () {
		return {

		}
	},
	computed: {
	},
	methods: {
		newArr (e) {
			this.$store.commit('setItems', e)
		}
	},
	components: {
		SlickItem,
		SlickList
	}
}
</script>

<style scoped lang="scss">
.sli {
	display: flex;
	width: 265px;
	margin: 1rem;
}

.v-card {
	width: 100%;
	height: 350px;
}
</style>
