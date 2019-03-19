<template lang="pug">
.cont
	.group(v-sticky="{zIndex: 3}")
		div.act
			v-btn(color="info" v-for="button in abuttons" :loading="loading" :disabled="loading"  @click="decision") {{ button.title }}
			v-spacer
			v-menu(transition="slide-y-transition")
				v-btn( icon slot="activator" )
					v-icon more_vert
				v-list
					v-list-tile( v-for="(item, index) in bbuttons" :key="index" @click="")
						v-list-tile-title {{ item.title }}
	h2 {{ this.currentItem.title }}
	.att1.mt-2
		v-list-tile.mx-0
			v-list-tile-avatar
				img(:src="require('@/assets/img/user0.svg')").av
			v-list-tile-content
				v-list-tile-title {{ currentItem.executor }}
				v-list-tile-sub-title автор
		v-list-tile
			v-list-tile-avatar.rel
				img(:src="require('@/assets/img/user0.svg')").av
				.k
					span K
			v-list-tile-content
				v-list-tile-title Петров А.П.
				v-list-tile-sub-title контролер
		v-list-tile
			v-list-tile-avatar
				i.icon-deadline.deadline
			v-list-tile-content
				v-list-tile-title {{ currentItem.deadline }}
				v-list-tile-sub-title срок
		v-list-tile
			v-list-tile-avatar
				i.icon-control-date.deadline
			v-list-tile-content
				v-list-tile-title {{ currentItem.deadline }}
				v-list-tile-sub-title срок контроля
	.descr.mt-3 {{ currentItem.descr }}

	v-expansion-panel(v-model="panel" expand).expand.mt-3
		v-expansion-panel-content(v-for="( pan, i ) in panels" :key="i")
			template( slot="header" )
				.att-header {{ pan.header }}
			v-card
				Att(:id="currentItem" )

	.descr.mt-3(v-if="currentItem.files === undefined") Файлы отстуствуют

	<!-- .attach.mt&#45;4(v&#45;if="currentItem.files") -->
	<!-- 	i.icon&#45;skrepka -->
	<!-- 	span.mr&#45;2 Файлы: -->
	<!-- 	span {{ currentItem.files }} -->

	<!-- .side -->
	<!-- 	.att2(v&#45;if="currentItem.files") -->
	<!-- 		v&#45;list.files -->
	<!-- 			v&#45;list&#45;tile( v&#45;for="( item, i ) in 3" :key="i" avatar @click="" ) -->
	<!-- 				img(:src="require('@/assets/img/filetype/file&#45;doc.png')" ) -->
	<!-- 				v&#45;list&#45;tile&#45;content.mx&#45;2 -->
	<!-- 					v&#45;list&#45;tile&#45;title this is title laskjdl laksjd lkj -->
	<!-- 				v&#45;list&#45;tile&#45;action -->
	<!-- 					v&#45;menu(transition="slide&#45;y&#45;transition") -->
	<!-- 						v&#45;btn( icon slot="activator" ) -->
	<!-- 							v&#45;icon more_vert -->
	<!-- 						v&#45;list -->
	<!-- 							v&#45;list&#45;tile( v&#45;for="(item, index) in actions" :key="index"  @click="") -->
	<!-- 								v&#45;list&#45;tile&#45;title {{ item.title }} -->
	<!-- 	.att2(v&#45;if="currentItem.files") -->
	<!-- 		v&#45;list.files -->
	<!-- 			v&#45;list&#45;tile( v&#45;for="( item, i ) in 3" :key="i" avatar @click="" ) -->
	<!-- 				img(:src="require('@/assets/img/filetype/file&#45;doc.png')" ) -->
	<!-- 				v&#45;list&#45;tile&#45;content.mx&#45;2 -->
	<!-- 					v&#45;list&#45;tile&#45;title this is title -->
	<!-- 				v&#45;list&#45;tile&#45;action -->
	<!-- 					v&#45;menu(transition="slide&#45;y&#45;transition") -->
	<!-- 						v&#45;btn( icon slot="activator" ) -->
	<!-- 							v&#45;icon more_vert -->
	<!-- 						v&#45;list -->
	<!-- 							v&#45;list&#45;tile( v&#45;for="(item, index) in actions" :key="index"  @click="") -->
	<!-- 								v&#45;list&#45;tile&#45;title {{ item.title }} -->

</template>

<script>
import VueSticky from 'vue-sticky'
import Att from '@/components/Att'

export default {
	props: ['id'],
	data () {
		return {
			loader: null,
			loading: false,
			loading1: false,
			actions: [
				{ title: 'Скачать' },
				{ title: 'Просмотр' },
				{ title: 'Сделать основным' },
				{ title: 'Действие' }
			],
			abuttons: [
				{ title: 'делегировать' },
				{ title: 'завершить' },
				{ title: 'подписать' }
			],
			bbuttons: [
				{ title: 'отклонить' },
				{ title: 'отозвать' }
			],
			panels: [
				{ header: 'Атрибуты' },
				{ header: 'Файлы' }
			],
			panel: [ false, true ]
		}
	},
	computed: {
		currentPath () { return this.$router.fullPath },
		currentFolder () { return this.$store.getters.currentFolder },
		items () { return this.$store.getters.items },
		currentItem () {
			return this.items[this.id]
		}
	},
	methods: {
		decision () {
			this.loading = true
			let next
			let id = (parseInt(this.$route.params.id, 10) + 1)
			id === this.items.length ? next = 0 : next = id
			setTimeout(() => {
				this.loading = false
				this.$router.push(this.currentFolder.path + '/' + next)
			}, 800)
		}
	},
	components: {
		Att
	},
	directives: {
		'sticky': VueSticky
	}

}
</script>

<style lang="scss">
@import '@/assets/css/colors.scss';

.cont {
	/* background: green; */
}
.group {
	/* background: $cool; */
	/* background: $info; */
}
.act {
	display: flex;
}

.av { background: #fff; }
.k {
	position: absolute;
	top: -10px;
	right: -5px;
	span {
		background: red;
		font-size: .93rem;
		padding: 0 .3rem;
		border-radius: 20px;
		color: #fff;
		font-weight: 600;
	}
}
.deadline {
	font-size: 2rem;
}
.descr {
	font-size: 1.2rem;
}
.attach {
	font-size: 1.4rem;
}
h2 {
	font-size: 2rem;
	font-weight: 400;
	line-height: 120%;
	margin-top: 2rem;
}
.v-list__tile__sub-title {
	font-size: .9rem;
	color: #888;
}
.att1 {
	display: flex;
	flex-wrap: wrap;
	/* max-width: 600px; */
}
.att2 {
	background: yellow;
	margin-right: 1rem;
	max-width: 400px;
	min-width: 300px;
}
.side {
	display: flex;
	flex-wrap: wrap;
}
.v-list.theme--light.files {
	background: transparent;
}
.att-header {
}
.theme--light.v-expansion-panel .v-expansion-panel__container {
	background: transparent;
}
.expand {
	box-shadow: none;
	border-bottom: 1px solid #ccc;
	.theme--light.v-card {
		background: transparent;
	}
}
</style>
