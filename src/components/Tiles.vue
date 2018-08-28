<template lang="pug">
v-container(grid-list-xl fluid)
	SlickList( :value="items" axis="xy" helperClass="moving" @input="newArr" )
		v-layout( row wrap )
			SlickItem(v-for="(item, index) in items" :index="index" :key="index" :item="item" ).sli
				v-card(flat tile)
					v-list-tile( avatar )
						v-list-tile-avatar
							img(src="@/assets/img/user0.svg").av
						v-list-tile-content
							v-list-tile-title {{ item.author }}
							v-list-tile-sub-title 20 авг 13:10
					v-divider
					v-card-title(primary-title)
						p.header {{item.title}}
					p.descr Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					v-card-actions
						.status В работе
						v-spacer
						.attach
							i.icon-skrepka
								span 13
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
.av {
	background: #eee;
}
.v-list__tile__sub-title {
	font-size: .9rem;
	color: #aaa;
}
.sli {
	display: flex;
	width: 265px;
	margin: 1rem;
}

.v-card {
	width: 100%;
	height: 350px;
	padding: .5rem;
	overflow: hidden;
	position: relative;
}
.v-card__actions {
	border-top: 1px solid #ddd;
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	background: #fff;
	padding: 0 1rem;
}

.moving {
	background: #fff;
	box-shadow: 0 0 10px rgba(0,0,0,0.5);
	font-family: Roboto;
	color: #000;
}
.header {
	font-size: 1.2rem;
	color: #82B1FF;
}
.descr {
	margin: 0 1rem;
	height: 4.3rem;
	overflow: hidden;
}
.status {
	text-transform: uppercase;
	font-size: .9rem;
	color: orange;
}
.attach {
	i span {
		font-style: normal;
	}
}
</style>
