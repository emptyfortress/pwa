<template lang="pug">
.infolder
	.folder
		i.icon-multi
		span Групповые операции
	br
	v-scale-transition(origin="center center" mode="out-in")
		v-layout( align-center row justify-center v-if="!selected" key="one")
			v-flex.text-xs-center
				i.icon-basket
				div Выберите объекты
		v-layout(column  v-if="selected" key="two")
			v-btn(large color="accent" @click="clearUnread") Сбросить новые
			v-btn(large color="info") Взять в работу
			v-btn(large color="success" :class="specialSelection(1)") Согласовать
			v-btn(large color="warning" :class="specialSelection(1)") Согласовать с замечаниями
			v-btn(large color="error" :class="specialSelection(2)") Отклонить

</template>

<script>
export default {
	props: ['quantity'],
	data () {
		return {
		}
	},
	computed: {
		selected () { return this.$store.getters.selected }
	},
	methods: {
		clearUnread () {
			let items = this.$store.getters.items
			items.map(function (item) {
				item.unread = 0
			})
		},
		specialSelection (e) {
			if (this.quantity > e) {
				return 'disabled'
			} else return ''
		}
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';
.disabled {
	display: none;
}

.icon-basket {
	font-size: 4rem;
	opacity: .3;
}

.infolder {
	padding-top: 0;
	height: 100%;
}
.folder {
	font-size: 2rem;
	opacity: .5;
	span {
		margin-left: 1rem;
	}
}

</style>
