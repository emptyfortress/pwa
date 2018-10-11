<template lang="pug" >
div
	.panel
		v-layout(row)
			v-slide-y-transition(mode="out-in")
				v-layout( row v-if="state === 1" key='1')
					v-flex(xs6)
						v-select(v-model="start" :items="filters" label="Фильтровать по").mx-3
					v-slide-y-transition(mode="out-in")
						v-menu(v-if="start === 'Дата создания'" ref="menu" :close-on-content-click="false" v-model="menu" :nudge-right="30" :return-value.sync="date" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px")
							v-text-field(slot="activator" v-model="date" label="Год, месяц" prepend-icon="event" readonly)
							v-date-picker(v-model="date" type="month" scrollable locale="ru-ru")
								v-spacer
								v-btn(flat color="primary" @click="menu = false") Отмена
								v-btn(flat color="primary" @click="$refs.menu.save(date)") OK
						v-flex(v-if="start === 'Автор'" xs6 v-else key='three')
							v-autocomplete(:loading="personloading" :items="persons" :search-input.sync="search" v-model="select" solo background-color="grey" cache-items class="mx-3" flat hide-no-data hide-details label="Начните печатать")
						v-flex(xs6 v-else key='two')
							v-select(v-model="second" multiple :items="value" label="Значение").mx-3
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
			menu: false,
			date: null,
			start: '',
			second: '',
			personloading: false,
			search: null,
			items: [],
			select: null,
			doc: ['Задание', 'Групповое задание', 'Документ', 'Карточка', 'Договор', 'Служебная записка'],
			srok: ['Последний месяц', 'Последний квартал', 'Текущий месяц', 'Текущий квартал'],
			buttons: ['Я - автор', 'Я - исполнитель', 'Я - контролер', 'Договоры', 'Поручения', 'Служебки'],
			filters: [ 'Тип документа', 'Дата создания', 'Автор', 'Исполнитель', 'Сотрудник', 'Статус' ],
			stat: [ 'Согласовано', 'Согласовано с замечаниями', 'Делегировано', 'Отклонено', 'В работе' ],
			persons: [ 'one', 'alskd', 'laksjd', 'laskjd', 'als', 'two', 'three', 'four', 'five', 'six', 'seven' ]

		}
	},
	watch: {
		search (val) {
			val && val !== this.select && this.querySelections(val)
		}
	},
	computed: {
		value () {
			if (this.start === 'Тип документа') return this.doc
			else if (this.start === 'Дата создания') return this.srok
			else if (this.start === 'Статус') return this.stat
		}
	},
	methods: {
		querySelections (v) {
			this.personloading = true
			// Simulated ajax query
			setTimeout(() => {
				this.items = this.persons.filter(e => {
					return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
				})
				this.personloading = false
			}, 500)
		}
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.v-autocomplete {
	border-bottom: 1px solid #333;
}
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
