<template lang="pug">
v-bottom-sheet( v-model="sheet"  inset )
	v-btn( slot="activator" icon )
		v-icon offline_bolt
	.test
		v-tabs( v-model="tabs" fixed-tabs )
			v-tab( href="#mobile-tabs-5-1" )
				v-icon phone
			v-tab( href="#mobile-tabs-5-2" )
				v-icon favorite
			v-tab( href="#mobile-tabs-5-3" )
				v-icon account_box
		v-tabs-items( v-model="tabs" ).white.elevation-1
			v-tab-item( v-for="i in 3" :id="'mobile-tabs-5-' + i" :key="i" )
				v-card.hei
					v-card-text {{ text }}

</template>

<script>

export default {
	props: [ 'narrow' ],
	data () {
		return {
			inset: this.narrow,
			sheet: false,
			tabs: null,
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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
	/* height: 300px; */
	background: #fff;
}
.hei {
	min-height: 200px;
}

</style>
