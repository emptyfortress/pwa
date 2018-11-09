<template lang="pug">
v-layout(row).dlit
	v-text-field(v-model="mydays" type="number" label="Дней" v-if="dday").mx-2
	v-text-field(v-model="hours" type="number" label="Часов" v-else).mx-2
	v-layout(column).counter
		i(@click="plus" @dblclick="doNothing").icon-nup
		i(@click="dday = !dday" @dblclick="doNothing").icon-nmiddle
		i(@click="minus" @dblclick="doNothing").icon-ndown

</template>

<script>
export default {
	props: [ 'days' ],
	data () {
		return {
			dday: true
		}
	},
	computed: {
		mydays () {
			return this.$store.getters.duration
		},
		hours () {
			return this.mydays * 8
		}
	},
	methods: {
		doNothing (evt) {
			evt.stopPropagation()
		},
		plus () {
			this.$store.commit('durationUp')
		},
		minus () {
			this.$store.commit('durationDown')
		}
	}
}
</script>

<style scoped lang="scss">

.counter {
	font-size: .8rem;
	line-height: 0;
	margin-top: 1rem;
	cursor: pointer;
	i {
		color: #ccc;
		&:hover {
			color: #222;
		}
	}
}

.dlit {
	width: 100px;
}

</style>
