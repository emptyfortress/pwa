<template lang="pug" >
div
	.panel
		v-layout(row)
			v-slide-y-transition(mode="out-in")
				v-layout( row v-if="state === 1" key='1')
					v-flex
						v-select(v-model="start" :items="filters" label="Фильтровать по").mx-3
					v-slide-y-transition(mode="out-in")
						v-flex(v-if="start === 'Дата создания'" key='lkj')
							span date
							<!-- v&#45;select(v&#45;model="second" multiple :items="value" label="Значение").mx&#45;3 -->
						v-flex(v-else key='two')
							v-select(v-model="second" multiple :items="value" label="Значение").mx-3
					<!-- v&#45;flex -->
					<!-- 	v&#45;icon calendar_today -->
			v-spacer
			v-slide-y-transition(mode="out-in")
				v-btn(flat v-if="state === 2" @click="state = 2" key='3') Применить фильтр
				v-btn(flat v-if="state === 1" @click="state = 1" key='k4') Добавить фильтр
				v-btn(flat v-if="state === 0" @click="state = 1" key='5') Задать фильтр

	v-slide-y-reverse-transition(mode="out-in")
		v-layout(align-center justify-center column fill-height v-if="state === 1" key="one").vcenter
			.zag За Последний месяц
			v-layout( row wrap )
				.butt(v-for="butt in buttons")
					v-btn(flat) {{ butt }}
			.zag.mt-5 За Последний квартал
			v-layout( row wrap )
				.butt(v-for="butt in buttons")
					v-btn(flat) {{ butt }}

		v-layout(align-center justify-center column fill-height v-if="state === 0" key="two").vcenter
			.arc
				p Архив содержит миллионы документов
				p
					i.icon-archive
				p Задайте критерии фильтра
	<!-- p {{ typeof e1 }} -->
	<!-- p {{ e2 }} -->

</template>

<script>
export default {
	data () {
		return {
			state: 0,
			start: '',
			second: '',
			doc: ['Задание', 'Групповое задание', 'Документ', 'Карточка', 'Договор', 'Служебная записка'],
			srok: ['Последний месяц', 'Последний квартал', 'Текущий месяц', 'Текущий квартал'],
			buttons: ['Я - автор', 'Я - исполнитель', 'Я - контролер', 'Договоры', 'Поручения', 'Служебки'],
			filters: [ 'Тип документа', 'Дата создания', 'Автор', 'Исполнитель', 'Сотрудник', 'Вложения' ]
		}
	},
	computed: {
		value () {
			if (this.start === 'Тип документа') return this.doc
			else if (this.start === 'Дата создания') return this.srok
		}
	},
	methods: {
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.panel {
	padding: .5rem 1rem;
	display: flex;
}
.arc {
	color: $grey2;
	text-align: center;
	p {
		font-size: 1.2rem;
	}
	i {
		font-size: 10rem;
		line-height: 1rem;
		opacity: .7;
	}
}
.vcenter {
	margin-top: 200px;
}
.zag {
	text-transform: uppercase;
	font-size: 2rem;
	font-weight: 300;
}

</style>
