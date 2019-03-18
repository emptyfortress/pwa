<template lang="pug">
.cont
	.group
		v-btn(flat v-for="button in abuttons" ) {{ button.title }}
		v-menu(transition="slide-y-transition")
			v-btn( icon slot="activator" )
				v-icon more_vert
			v-list
				v-list-tile( v-for="(item, index) in bbuttons" :key="index"  @click="")
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
		.descr.mt-3(v-if="currentItem.files === undefined") Файлы отстуствуют

		.attach.mt-4(v-if="currentItem.files")
			i.icon-skrepka
			span.mr-2 Файлы:
			span {{ currentItem.files }}

		.att1(v-if="currentItem.files")
			v-list.files
				v-list-tile( v-for="( item, i ) in 3" :key="i" avatar @click="" )
					v-list-avatar
						img(:src="require('@/assets/img/filetype/file-doc.png')" )
					v-list-tile-content.mx-2
						v-list-tile-title this is title
					v-list-tile-action
						v-menu(transition="slide-y-transition")
							v-btn( icon slot="activator" )
								v-icon more_vert
							v-list
								v-list-tile( v-for="(item, index) in actions" :key="index"  @click="")
									v-list-tile-title {{ item.title }}

</template>

<script>
export default {
	props: ['id', 'items'],
	data () {
		return {
			actions: [
				{ title: 'Скачать' },
				{ title: 'Просмотр' },
				{ title: 'Сделать основным' },
				{ title: 'Действие' }
			],
			abuttons: [
				{ title: 'делегировать' },
				{ title: 'завершить' },
				{ title: 'подписать' },
			],
			bbuttons: [
				{ title: 'отклонить' },
				{ title: 'отозвать' }
			]
		}
	},
	computed: {
		currentItem () {
			return this.items[this.id]
		}
	},
	methods: {
	}
}
</script>

<style lang="scss">
@import '@/assets/css/colors.scss';

.cont {
}
.group {
	background: $cool;
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
}
.v-list.theme--light.files {
	background: transparent;
}
</style>
