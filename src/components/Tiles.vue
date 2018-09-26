<template lang="pug">
div
	.panel
		v-slide-y-transition
			v-btn(flat small color="info" @click="clearUnread") Сбросить новые
		v-slide-y-transition
			v-btn(flat small color="info" @click="") Только новые
	SlickList( :value="items" axis="xy" :distance=2 helperClass="moving" @input="newArr" ).mygrid
		SlickItem(v-for="(item, index) in items" :index="index" :key="index" :item="item" ).sli
			vue-flip( :active-click="true" width="100%" :key="index" ).flip
				v-card(flat tile slot="front" :class="item.unread ? 'unread' : ''" )
					.drag(@click.prevent="item.unread = !item.unread" @click="doNothing")
					.vert-flex
						v-list-tile( avatar )
							v-list-tile-avatar
								img(:src="require('@/assets/img/user0.svg')").av
							v-list-tile-content
								v-list-tile-title {{ item.author }}
								v-list-tile-sub-title 20 авг 13:10
						v-divider
						p.head {{item.title}}
						p.descr {{item.descr}}
						v-card-actions
							.status В работе
							v-spacer
							.attach(v-if="item.files")
								i.icon-skrepka
									span {{ item.files }}
					.open( @click="doNothing" )
						i.icon-new-window
				v-card(flat tile slot="back" :class="item.unread ? 'unread' : ''" )
					.drag1
					.vert-flex
						p.head-back {{item.title}}
						FilesList( :attach="item.attach" v-if="item.focus === 'files'" )
						Attr(v-if="!item.files || item.focus === 'info'")

						v-bottom-nav( :active.sync="item.focus" :value="item.files" absolute )
							v-btn( color="info" flat value="files" @click="doNothing" v-if="item.files")
								i.icon-skrepka.big {{ item.files }}
							v-btn( color="info" flat value="info" @click="doNothing")
								i.icon-info.big

</template>

<script>
import { SlickList, SlickItem, HandleDirective } from 'vue-slicksort'
import VueFlip from 'vue-flip'
import FilesList from '@/components/FilesList'
import Attr from '@/components/Attr'

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
		doNothing (evt) {
			evt.stopPropagation()
		}
	},
	components: {
		SlickItem,
		SlickList,
		VueFlip,
		FilesList,
		Attr
	},
	directives: {
		handle: HandleDirective
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
}
.v-card {
	width: 100%;
	height: 350px;
	padding: .5rem;
	overflow: hidden;
	position: relative;
}

.v-card__actions {
	width: 100%;
	height: 50px;
	min-height: 50px;
	padding: 0 1rem;
	padding-left: 17px;
}

.v-card.unread {
	.drag, .drag1 {
		background-color: $accent;
	}
	.head {
		font-weight: bold;
	}
}
.moving {
	background: #fff;
	box-shadow: 0 0 10px rgba(0,0,0,0.5);
	font-family: Roboto;
	color: #000;
	line-height: 160%;
	.v-bottom-nav {
		background: #fff;
	}
}
.v-bottom-nav {
	box-shadow: none;
}

.head-back {
	font-size: 1.2rem;
	color: $grey2;
}

.head {
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
.drag, .drag1 {
	position: absolute;
	height: 100%;
	width: 8px;
	top: 0;
	background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAGElEQVQYV2NctmzZ/8jISAZGEGBAAigcAI4pBAQE47ttAAAAAElFTkSuQmCC) repeat;
}
.drag {
	left: 0;
}
.drag1 {
	right: 0;
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
	display: flex;
	flex-flow: row wrap;
}

.sli {
	display: flex;
	width: 265px;
	margin: 1rem;
	user-select: none;
}
.application .theme--light.v-card, .theme--light .v-card {
	/* background-color: #ccc; */
	color: rgba(0,0,0,.87);

}

.panel {
	padding: .5rem 0;
	height: 3.5rem;
}

</style>
