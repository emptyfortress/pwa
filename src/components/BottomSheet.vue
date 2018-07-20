<template lang="pug">
v-bottom-sheet( v-model="sheet"  inset )
	v-btn( slot="activator" icon )
		v-icon offline_bolt
	<!-- v&#45;card.test -->
	.test
		v-tabs( v-model="active" color="cyan" dark slider-color="yellow" )
			v-tab( v-for="n in 3" :key="n" ripple ) item {{ n }}
			v-tab-item( v-for="n in 3" :key="n" )
				v-card( flat )
					v-card-text Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

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
	},
	components: {
	}
}
</script>

<style scoped lang="scss">
.test {
	height: 300px;
	background: #fff;
}

</style>
