<template lang="pug">
div
	.zag Grid example with pivot

	pivot(
		:data="data"
		:fields="fields"
		:row-fields="rowFields"
		:col-fields="colFields"
		:reducer="reducer"
		:default-show-settings="defaultShowSettings"
		show-settings-text="Настройки"
		hide-settings-text="Скрыть"
		)
		template( slot="value" slot-scope="{ value }" ) {{ value.toLocaleString() }}
</template>

<script>
import Pivot from '@marketconnect/vue-pivot-table'

export default {
	data () {
		return {
			data: [
				{'country': 'США', 'year': 2010, 'gender': 'муж.', 'count': 153295220},
				{'country': 'США', 'year': 2010, 'gender': 'жен.', 'count': 156588400},
				{'country': 'США', 'year': 2011, 'gender': 'муж.', 'count': 154591960},
				{'country': 'США', 'year': 2011, 'gender': 'жен.', 'count': 157800200},
				{'country': 'США', 'year': 2012, 'gender': 'муж.', 'count': 155851840},
				{'country': 'США', 'year': 2012, 'gender': 'жен.', 'count': 158944800},
				{'country': 'Китай', 'year': 2010, 'gender': 'муж.', 'count': 690256342},
				{'country': 'Китай', 'year': 2010, 'gender': 'жен.', 'count': 650712406},
				{'country': 'Китай', 'year': 2011, 'gender': 'муж.', 'count': 694106441},
				{'country': 'Китай', 'year': 2011, 'gender': 'жен.', 'count': 654068030},
				{'country': 'Китай', 'year': 2012, 'gender': 'муж.', 'count': 697964288},
				{'country': 'Китай', 'year': 2012, 'gender': 'жен.', 'count': 657422649},
				{'country': 'Индия', 'year': 2010, 'gender': 'муж.', 'count': 638354751},
				{'country': 'Индия', 'year': 2010, 'gender': 'жен.', 'count': 592629727},
				{'country': 'Индия', 'year': 2011, 'gender': 'муж.', 'count': 646873890},
				{'country': 'Индия', 'year': 2011, 'gender': 'жен.', 'count': 600572093},
				{'country': 'Индия', 'year': 2012, 'gender': 'муж.', 'count': 655193693},
				{'country': 'Индия', 'year': 2012, 'gender': 'жен.', 'count': 608395922},
				{'country': 'Франция', 'year': 2010, 'gender': 'муж.', 'count': 30675773},
				{'country': 'Франция', 'year': 2010, 'gender': 'жен.', 'count': 32285363},
				{'country': 'Франция', 'year': 2011, 'gender': 'муж.', 'count': 30815839},
				{'country': 'Франция', 'year': 2011, 'gender': 'жен.', 'count': 32452566},
				{'country': 'Франция', 'year': 2012, 'gender': 'муж.', 'count': 30948916},
				{'country': 'Франция', 'year': 2012, 'gender': 'жен.', 'count': 32612882}
			],
			fields: [],
			rowFields: [{
				getter: item => item.country,
				label: 'Страна'
			}, {
				getter: item => item.gender,
				label: 'Пол'
			}],
			colFields: [{
				getter: item => item.year,
				label: 'Год'
			}],
			reducer: (sum, item) => sum + item.count,
			defaultShowSettings: false

		}
	},
	components: {
		Pivot
	},
	computed: {
	},
	methods: {
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.zag {
	font-size: 1.5rem;
	line-height: 200%;
}
</style>
