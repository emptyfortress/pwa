<template lang="pug">
v-layout(row @dblclick="doNothing").dlit
	v-text-field(v-model="mydays" type="number" label="Дней" v-if="!hhours").mx-2
	v-text-field(v-model="hours" type="number" label="Часов" v-else).mx-2
	v-layout(column).counter
		i(@click="plus" @dblclick="doNothing").icon-nup
		i(@click="toggleHours" :class="ifHour").icon-nmiddle
		i(@click="minus").icon-ndown

</template>

<script>
export default {
	props: [ 'days' ],
	data () {
		return {
		}
	},
	computed: {
		hhours () {
			return this.$store.getters.hours
		},
		mydays () {
			return this.$store.getters.duration
		},
		hours () {
			return this.mydays * 8
		},
		ifHour () {
			return this.hhours ? 'rd' : ''
		}
	},
	methods: {
		toggleHours () {
			this.$store.commit('toggleHours')
		},
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
		&.rd { color: red; }
		&:hover {
			color: #222;
		}
	}
}

.dlit {
	width: 100px;
}

</style>
