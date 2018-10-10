<template lang="pug" >
div.all
	.panel
		v-slide-y-transition(mode="out-in")
			v-flex(xs3 v-if="filterActive")
				v-select(v-model="value" :items="items" label="Фильтр")
		v-spacer
		v-slide-y-transition(mode="out-in")
			v-btn(flat v-if="filterActive" @click="filterActive = !filterActive" key='o') Применить фильтр
			v-btn(flat v-if="!filterActive" @click="filterActive = !filterActive" key='a') Задать фильтр
	v-slide-y-reverse-transition(mode="out-in")
		v-layout(align-center justify-center column fill-height v-if="filterActive" key="one")
			p {{ value }}
		v-layout(align-center justify-center column fill-height v-if="!filterActive" key="two")
			.arc
				p Архив содержит миллионы документов.
				p
					i.icon-archive
				p Задайте критерии фильтра

</template>

<script>
export default {
	data () {
		return {
			filterActive: false,
			items: [ 'Дата', 'Тип документа', 'Автор', 'Исполнитель', 'Сотрудник', 'Статус', 'Вложения' ],
			value: [ 'Дата', 'Тип документа', 'Автор', 'Исполнитель', 'Сотрудник', 'Статус', 'Вложения' ]
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
	/* border-bottom: 1px dotted #ccc; */
	/* height: 3.8rem; */
	/* width: 100%; */
	display: flex;
	/* background: #ccc; */
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

.all {
	height: 100%;
}
</style>
