<template lang="pug">
.grid
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
		available-fields-label-text="Поля"
		rows-label-text="Строки"
		cols-label-text="Колонки"
		)
		template( slot="value" slot-scope="{ value }" ) {{ value.toLocaleString() }}
</template>

<script>
import Pivot from '@marketconnect/vue-pivot-table'

export default {
	data () {
		return {
			data: [
				{ 'continent': 'Америка', 'country': 'США', 'year': 2010, 'gender': 'муж.', 'count': 153295220 },
				{ 'continent': 'Америка', 'country': 'США', 'year': 2010, 'gender': 'жен.', 'count': 156588400 },
				{ 'continent': 'Америка', 'country': 'США', 'year': 2011, 'gender': 'муж.', 'count': 154591960 },
				{ 'continent': 'Америка', 'country': 'США', 'year': 2011, 'gender': 'жен.', 'count': 157800200 },
				{ 'continent': 'Америка', 'country': 'США', 'year': 2012, 'gender': 'муж.', 'count': 155851840 },
				{ 'continent': 'Америка', 'country': 'США', 'year': 2012, 'gender': 'жен.', 'count': 158944800 },
				{ 'continent': 'Америка', 'country': 'США', 'year': 2013, 'gender': 'муж.', 'count': 155351842 },
				{ 'continent': 'Америка', 'country': 'США', 'year': 2013, 'gender': 'жен.', 'count': 158954803 },
				{ 'continent': 'Азия', 'country': 'Китай', 'year': 2010, 'gender': 'муж.', 'count': 690256342 },
				{ 'continent': 'Азия', 'country': 'Китай', 'year': 2010, 'gender': 'жен.', 'count': 650712406 },
				{ 'continent': 'Азия', 'country': 'Китай', 'year': 2011, 'gender': 'муж.', 'count': 694106441 },
				{ 'continent': 'Азия', 'country': 'Китай', 'year': 2011, 'gender': 'жен.', 'count': 654068030 },
				{ 'continent': 'Азия', 'country': 'Китай', 'year': 2012, 'gender': 'муж.', 'count': 697964288 },
				{ 'continent': 'Азия', 'country': 'Китай', 'year': 2012, 'gender': 'жен.', 'count': 657422649 },
				{ 'continent': 'Азия', 'country': 'Китай', 'year': 2013, 'gender': 'муж.', 'count': 697964405 },
				{ 'continent': 'Азия', 'country': 'Китай', 'year': 2013, 'gender': 'жен.', 'count': 657422752 },
				{ 'continent': 'Азия', 'country': 'Индия', 'year': 2010, 'gender': 'муж.', 'count': 638354751 },
				{ 'continent': 'Азия', 'country': 'Индия', 'year': 2010, 'gender': 'жен.', 'count': 592629727 },
				{ 'continent': 'Азия', 'country': 'Индия', 'year': 2011, 'gender': 'муж.', 'count': 646873890 },
				{ 'continent': 'Азия', 'country': 'Индия', 'year': 2011, 'gender': 'жен.', 'count': 600572093 },
				{ 'continent': 'Азия', 'country': 'Индия', 'year': 2012, 'gender': 'муж.', 'count': 655193693 },
				{ 'continent': 'Азия', 'country': 'Индия', 'year': 2012, 'gender': 'жен.', 'count': 608395922 },
				{ 'continent': 'Азия', 'country': 'Индия', 'year': 2013, 'gender': 'муж.', 'count': 655193491 },
				{ 'continent': 'Азия', 'country': 'Индия', 'year': 2013, 'gender': 'жен.', 'count': 608335918 },
				{ 'continent': 'Азия', 'country': 'Япония', 'year': 2010, 'gender': 'муж.', 'count': 153295220 },
				{ 'continent': 'Азия', 'country': 'Япония', 'year': 2010, 'gender': 'жен.', 'count': 156588400 },
				{ 'continent': 'Азия', 'country': 'Япония', 'year': 2011, 'gender': 'муж.', 'count': 154591960 },
				{ 'continent': 'Азия', 'country': 'Япония', 'year': 2011, 'gender': 'жен.', 'count': 157800200 },
				{ 'continent': 'Азия', 'country': 'Япония', 'year': 2012, 'gender': 'муж.', 'count': 155851840 },
				{ 'continent': 'Азия', 'country': 'Япония', 'year': 2012, 'gender': 'жен.', 'count': 158944800 },
				{ 'continent': 'Азия', 'country': 'Япония', 'year': 2013, 'gender': 'муж.', 'count': 155851591 },
				{ 'continent': 'Азия', 'country': 'Япония', 'year': 2013, 'gender': 'жен.', 'count': 158944696 },
				{ 'continent': 'Европа', 'country': 'Франция', 'year': 2010, 'gender': 'муж.', 'count': 30675773 },
				{ 'continent': 'Европа', 'country': 'Франция', 'year': 2010, 'gender': 'жен.', 'count': 32285363 },
				{ 'continent': 'Европа', 'country': 'Франция', 'year': 2011, 'gender': 'муж.', 'count': 30815839 },
				{ 'continent': 'Европа', 'country': 'Франция', 'year': 2011, 'gender': 'жен.', 'count': 32452566 },
				{ 'continent': 'Европа', 'country': 'Франция', 'year': 2012, 'gender': 'муж.', 'count': 30948916 },
				{ 'continent': 'Европа', 'country': 'Франция', 'year': 2012, 'gender': 'жен.', 'count': 32612882 },
				{ 'continent': 'Европа', 'country': 'Франция', 'year': 2013, 'gender': 'муж.', 'count': 30948828 },
				{ 'continent': 'Европа', 'country': 'Франция', 'year': 2013, 'gender': 'жен.', 'count': 32612824 }
			],
			fields: [
				{
					getter: item => item.gender,
					label: 'Пол'
				},
				{
					getter: item => item.continent,
					label: 'Континент'
				}
			],
			rowFields: [
				{
					getter: item => item.country,
					label: 'Страна'
				}
			],
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

.grid {
	padding: 0 2rem;
}
.zag {
	font-size: 1.5rem;
	line-height: 200%;
}

</style>
