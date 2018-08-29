<template lang="pug">
v-container(grid-list-xl fluid)
	SlickList( :value="items" axis="xy" helperClass="moving" @input="newArr" )
		v-layout( row wrap )
			SlickItem(v-for="(item, index) in items" :index="index" :key="index" :item="item" ).sli
				vue-flip( :active-click="true" width="100%" ).flip
					v-card(flat tile slot="front" )
						.drag
						v-list-tile( avatar )
							v-list-tile-avatar
								img(src="@/assets/img/user0.svg").av
							v-list-tile-content
								v-list-tile-title {{ item.author }}
								v-list-tile-sub-title 20 авг 13:10
						v-divider
						v-card-title(primary-title @click="doNothing")
							p.header {{item.title}}
						<!-- p.descr Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. -->
						p.descr Lorem ipsum dolor sit amet, consectetur adipisicing elit,
						v-card-actions
							.status В работе
							v-spacer
							.attach(v-if="item.files")
								i.icon-skrepka
									span {{ item.files }}
					v-card(flat tile slot="back")
						.drag1
						v-layout( column )
							p.header-back {{item.title}}

							v-tabs-items(v-model="tabs")
								v-tab-item(id="tab1")
									FilesList( :title="item.title" )
								v-tab-item(id="tab2")
									div this is item 2
							v-card-actions( @click="doNothing" )
								v-tabs( v-model="tabs" )
									v-tab( href="#tab1" )
										v-icon phone
									v-tab( href="#tab2" )
										v-icon favorite
</template>

<script>
import { SlickList, SlickItem } from 'vue-slicksort'
import VueFlip from 'vue-flip'
import FilesList from '@/components/FilesList'

export default {
	props: ['items'],
	data () {
		return {
			activeOnClick: false,
			tabs: null
		}
	},
	computed: {
	},
	methods: {
		newArr (e) {
			this.$store.commit('setItems', e)
		},
		handleFlip () {
			this.activeOnClick = !this.activeOnClick
		},
		doNothing (evt) {
			evt.stopPropagation()
		}
	},
	components: {
		SlickItem,
		SlickList,
		VueFlip,
		FilesList
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

.flip {
	width: 100%;
	height: 350px;
	/* padding: .5rem; */
	/* overflow: hidden; */
	/* position: relative; */
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
	padding: 0 1rem;
	padding-left: 17px;
}

.moving {
	background: #fff;
	box-shadow: 0 0 10px rgba(0,0,0,0.5);
	font-family: Roboto;
	color: #000;
	line-height: 160%;
}
.header-back {
	font-size: 1.2rem;
	color: #82B1FF;
	cursor: pointer;
	/* margin-left: 1rem; */
	border-bottom: 1px solid #ddd;
	&:hover {
		text-decoration: underline;
	}
}
.header {
	margin-top: 0;
	font-size: 1.2rem;
	color: #82B1FF;
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
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
.drag {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 12px;
	background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAGklEQVQYV2PcvHHzf19/X0YGBgYGMAEDKBwAjs0EBCLstwQAAAAASUVORK5CYII=) repeat;
	/* background-color: blue; */
}
.drag1 {
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	width: 12px;
	background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAGklEQVQYV2PcvHHzf19/X0YGBgYGMAEDKBwAjs0EBCLstwQAAAAASUVORK5CYII=) repeat;
}
</style>
