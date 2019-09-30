<template lang="pug">
v-dialog( v-model="pre" width="800")
	v-list-tile(avatar slot="activator").test
		v-list-tile-avatar.sm
			i.icon-doc.lrg
		v-list-tile-content
			v-list-tile-title.bold  {{ files[index].name }}

	v-card
		v-layout(row align-start).gr
			v-flex(xs8)
				v-window(v-model="img" vertical)
					v-window-item(v-for="item in files" :key="item.name")
						v-card(flat)
							v-row(align="center" justify="center").fill-height
								.vert
									img(:src="require('@/assets/img/docs/img' + img + '.jpg')").ful

			v-flex(xs4)
				v-card(color="info")
					v-card-title
						table.att
							tr
								td(colspan="2").headline {{ files[index].name }}
							tr
								td(colspan="2").big {{ files[index].size }}
							tr
								td(colspan="2" height="50")
							tr
								td.label Создан:
								td 2018-09-20
							tr
								td.label Изменен:
								td --
							tr
								td.label Автор:
								td {{ people[index].name }}
				.ctr
					v-btn(icon large @click="prev")
						i.icon-prev
					v-btn(icon large @click="next")
						i.icon-next
				.mt-5.text-xs-center
					v-btn(block flat large v-for="bt in actions" :key="bt") {{ bt }}

</template>

<script>
export default {
	props: ['preview', 'index'],
	data () {
		return {
			length: 4,
			dialog: false,
			img: this.index,
			actions: [
				'Просмотр',
				'Редактировать',
				'Скачать',
				'Открыть карточку',
				'Открыть папку'
			],
			files: [
				{ name: 'Договор с ООО "Ромашка".doc', size: '45 kB' },
				{ name: 'Приложение к договору.txt', size: '11 kB' },
				{ name: 'Расписание выплат.xls', size: '23 kB' },
				{ name: 'Приказ № 12-3/Л.doc', size: '15 kB' }
			],
			people: [
				{ name: 'Орлов Г.А.' },
				{ name: 'Сидоров П.К' },
				{ name: 'Уткин П.П.' },
				{ name: 'Соловьева Г.А.' }
			]
		}
	},
	computed: {
		pre: {
			get () {
				return this.preview
			},
			set (newValue) { return false }
		},
		// img () {
		// 	return this.index
		// },
	},
	methods: {
		next () {
			this.img = this.img + 1 === this.length
				? 0
				: this.img + 1
		},
		prev () {
			this.img = this.img - 1 < 0
				? this.length - 1
				: this.img - 1
		}
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.gr { background: #dedede; height: 760px; }
.lrg { font-size: 2.0rem; color: #003952; }
.ful {
	width: 100%;
}
.att {
	font-size: 1.0rem;
	color: #fff;
	td { vertical-align: top; }
}
.big { font-size: 1.2rem; }
.vert {
	/* height: 300px; */
	/* overflow: hidden; */
	/* height: 100%; */
	width: 100%;
	background: red;
}
.ctr { text-align: center; }
</style>
