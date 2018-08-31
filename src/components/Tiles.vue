<template lang="pug">
v-container(grid-list-xl fluid)
	SlickList( v-model="items" axis="xy" helperClass="moving" @input="newArr" ).mygrid
		SlickItem(v-for="(item, index) in items" :index="index" :key="index" :item="item" ).sli
			vue-flip( :active-click="true" width="100%" :key="index" ).flip
				v-card(flat tile slot="front")
					.drag
					.vert-flex
						v-list-tile( avatar )
							v-list-tile-avatar
								img(src="@/assets/img/user0.svg").av
							v-list-tile-content
								v-list-tile-title {{ item.author }}
								v-list-tile-sub-title 20 авг 13:10
						v-divider
						p.header {{item.title}}
						p.descr {{item.descr}}
						v-card-actions
							.status В работе
							v-spacer
							.attach(v-if="item.files")
								i.icon-skrepka
									span {{ item.files }}
					.open( @click="doNothing" )
						i.icon-new-window
				v-card(flat tile slot="back")
					.drag1
					.vert-flex
						p.header-back {{item.title}}
						FilesList( :attach="item.attach" v-if="item.focus === 'files'")

						v-bottom-nav( :active.sync="item.focus" :value="true" absolute color="transparent")
							v-btn( color="info" flat value="files" @click="doNothing" v-if="item.files")
								i.icon-skrepka.big {{ item.files }}
							v-btn( color="info" flat value="info" @click="doNothing")
								i.icon-info.big

</template>

<script>
import { SlickList, SlickItem } from 'vue-slicksort'
import VueFlip from 'vue-flip'
import FilesList from '@/components/FilesList'

export default {
	props: ['items'],
	data () {
		return {
			showFiles: false,
			showInfo: false,
			activeOnClick: false
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
@import '@/assets/css/colors.scss';

.av {
	background: #eee;
}

.v-list__tile__sub-title {
	font-size: .9rem;
	color: aaa;
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
	/* border-top: 1px solid $grey; */
	width: 100%;
	height: 50px;
	min-height: 50px;
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
	color: $grey2;
}

.header {
	margin-top: 0;
	margin-left: 1rem;
	font-size: 1.2rem;
	color: $secondary;
	min-height: 5rem;
}
.descr {
	margin: 0 1rem;
	color: $grey2;
	overflow: hidden;
	flex-grow: 1;
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

.open {
	cursor: pointer;
	position: absolute;
	top: 0;
	right: 0;
	width: 36px;
	height: 40px;
	text-align: right;
	i {
		color: $grey;
		font-size: 1.5rem;
	}
	&:hover {
		i {
			color: $info;
		}
	}
}

.drag1 {
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	width: 12px;
	background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAGklEQVQYV2PcvHHzf19/X0YGBgYGMAEDKBwAjs0EBCLstwQAAAAASUVORK5CYII=) repeat;
}
.vert-flex {
	display: flex;
	flex-direction: column;
	height: 100%;
}
.v-divider {
	max-height: 1px;
	margin-bottom: 1rem;
	background: none;
}

i.big {
	font-size: 1.3rem;
	font-style: normal;
	text-align: center;
}
.v-tabs__items {
	flex-grow: 1
}

.mygrid {
	/* width: 100%; */
	/* background: red; */
	display: flex;
	flex-flow: row wrap;
}

.sli {
	display: flex;
	width: 265px;
	margin: 1rem;
}
.test {
	width: 100%;
	height: 200px;
	background: white;
}

</style>
