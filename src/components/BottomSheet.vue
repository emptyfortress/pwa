<template lang="pug">
v-bottom-sheet( v-model="sheet"  inset )
	v-btn( slot="activator" icon )
		v-icon offline_bolt
	v-list
		v-container( grid-list-sm )
			v-layout( align-start wrap )
				v-flex( v-for="tile in tiles" :key="tile.id" @click="sheet = false" )
					v-card( tile flat )
						v-card-media( height="64px" contain :src="`https://cdn.vuetifyjs.com/images/bottom-sheets/${tile.img}`")
						v-card-title
							p.text-xs-center {{ tile.title }}
							<!-- h3.headline.text&#45;xs&#45;center {{ tile.title }} -->
</template>

<script>
export default {
	props: [ 'narrow' ],
	data () {
		return {
			inset: this.narrow,
			sheet: true,
			tiles: [
				{ id: 1, img: 'keep.png', title: 'Keep' },
				{ id: 2, img: 'inbox.png', title: 'Inbox' },
				{ id: 3, img: 'hangouts.png', title: 'Hangouts' },
				{ id: 4, img: 'messenger.png', title: 'Messenger' },
				{ id: 5, img: 'google.png', title: 'Google+' },
				{ id: 6, img: 'keep.png', title: 'Keep' },
				{ id: 7, img: 'inbox.png', title: 'Inbox' },
				{ id: 8, img: 'hangouts.png', title: 'Hangouts' },
				{ id: 9, img: 'messenger.png', title: 'Messenger' },
				{ id: 10, img: 'google.png', title: 'Google+' }
			]

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
	background: #eee;
}
</style>
