<template lang="pug" >
div
	.panel
		v-layout( row wrap )
			v-slide-y-transition(mode="out-in")
				v-flex(xs2 v-if="state === 1" key='1')
					v-select(v-model="e1" :items="e11" label="Фильтровать по").mx-3
			v-slide-y-transition(mode="out-in")
				v-layout(row wrap)
					v-flex(xs4 v-if="state === 1 && e1 === 'Тип документа'" key='2')
						v-select(v-model="e2" :items="e21" ).mx-3
					v-flex(xs4 v-if="state === 1 && (e1 === 'Тип документа' || e1 === 'Дата')" key='3')
						v-select(v-model="e3" :items="e31" ).mx-3
			v-slide-y-transition(mode="out-in")
				v-btn(flat v-if="state === 1" @click="state = 2" key='o') Применить фильтр
				v-btn(flat v-if="state === 0" @click="state = 1" key='a') Задать фильтр
	v-slide-y-reverse-transition(mode="out-in")
		v-layout(align-center justify-center column fill-height v-if="(state === 1) && (e1 === '')" key="one").vcenter
			.zag За Последний месяц
			v-layout( row wrap )
				.butt(v-for="butt in buttons")
					v-btn {{ butt }}
			.zag.mt-5 За Последний квартал
			v-layout( row wrap )
				.butt(v-for="butt in buttons")
					v-btn {{ butt }}

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
			e1: '',
			e11: [ 'Дата', 'Тип документа', 'Автор', 'Исполнитель', 'Сотрудник', 'Статус', 'Вложения' ],
			e2: 'Задание',
			e21: ['Задание', 'Групповое задание', 'Документ', 'Карточка', 'Договор', 'Служебная записка'],
			buttons: ['Я - автор', 'Я - исполнитель', 'Я - контролер', 'Договоры', 'Поручения', 'Служебки'],
			e3: 'Последний месяц',
			e31: ['Последний месяц', 'Последний квартал', 'Диапазон']
		}
	},
	computed: {
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
