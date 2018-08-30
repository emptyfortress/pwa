<template lang="pug">
v-container(grid-list-xl fluid)
	SlickList( :value="items" axis="xy" helperClass="moving" @input="newArr" )
		v-layout( row wrap )
			SlickItem(v-for="(item, index) in items" :index="index" :key="index" :item="item" ).sli
				vue-flip( :active-click="true" width="100%" :key="index" ).flip
					v-card(flat tile slot="front" )
						.expand
							i.icon-new-window
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
					v-card(flat tile slot="back")
						.drag1
						v-layout( column )
							p.header {{item.title}}
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
@import '@/assets/css/colors.scss';

.av {
	background: #eee;
}

.v-list__tile__sub-title {
	font-size: .9rem;
	color: aaa;
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

/* .header-back { */
/* 	font-size: 1.2rem; */
/* 	color: #82B1FF; */
/* 	margin-left: 1rem; */
/* 	border-bottom: 1px solid #ddd; */
/* } */

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
	/* border-bottom: 1px dotted $grey1; */
}
.expand {
	position: absolute;
	top: 0;
	right: 0;
}
</style>
