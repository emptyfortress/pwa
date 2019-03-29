<template lang="pug">
v-dialog( v-model="pre" width="800" )
	v-list-tile(avatar slot="activator").test
		v-list-tile-avatar.sm
			i.icon-doc.lrg
		v-list-tile-content
			v-list-tile-title.bold  {{ files[index].name }}

	v-layout(row).gr
		v-flex(xs8)
			img(:src="require('@/assets/img/docs/img' + index + '.jpg')").ful
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
				v-divider

</template>

<script>
export default {
	props: ['preview', 'index'],
	data () {
		return {
			dialog: false,
			actions: [
				'Просмотр',
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
		}
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.gr { background: #dedede; }
.lrg { font-size: 2.0rem; color: #003952; }
.ful { width: 100%; }
.att {
	font-size: 1.0rem;
	color: #fff;
	td { vertical-align: top; }
}
.big { font-size: 1.2rem; }
</style>
