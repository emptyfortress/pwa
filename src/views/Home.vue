<template lang="pug">
v-container(grid-list-md)
	.display-1.font-weight-thin
		i.icon-check
		span Поручения
	v-layout( row wrap )
		v-flex( xs6 sm4 )
			v-card(flat :class="$vuetify.breakpoint.mdAndDown ? 'small' : 'big'")
				v-layout( row justify-center align-center)
					v-flex
						.folder Выполнено
					v-flex
						vue-easy-pie-chart( :percent="75" :scale-length="0" :size="90")
		v-flex( xs6 sm4 )
			v-card(flat :class="$vuetify.breakpoint.mdAndDown ? 'small' : 'big'")
				v-layout( row justify-center align-center)
					v-flex
						.folder Просрочено
					v-flex
						vue-easy-pie-chart( :percent="0" :scale-length="0" :size="90")
	br
	br
	.display-1.font-weight-thin
		i.icon-folder
		span Папки
	v-layout(row wrap)
		v-flex(v-for="n in 15" :key="n" xs6 sm4 @click="displayDetails(picture['.key'])")
			v-card(flat :class="$vuetify.breakpoint.mdAndDown ? 'small' : 'big'")
				v-badge( color="info" overlap)
					span( slot="badge" ) 7
				v-layout( row justify-space-around align-center)
					v-flex
						.counter 15
					v-flex
						trend( :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]" :gradient=[ "#133C60", "#0195DA" ] auto-draw smooth )
				.folder This is folder
		<!-- v&#45;flex( xs6 sm4 ) -->
		<!-- 	v&#45;card(flat :class="$vuetify.breakpoint.mdAndDown ? 'small' : 'big'") -->
		<!-- 		v&#45;layout( row justify&#45;center align&#45;center) -->
		<!-- 			v&#45;flex -->
		<!-- 				.folder This is folder -->
		<!-- 			v&#45;flex -->
		<!-- 				vue&#45;easy&#45;pie&#45;chart( :percent="75" :scale&#45;length="0" ) -->
</template>

<script>
import VueEasyPieChart from 'vue-easy-pie-chart'
import 'vue-easy-pie-chart/dist/vue-easy-pie-chart.css'

export default {
	data () {
		return {
			title: 'just test'
		}
	},
	methods: {
		displayDetails (id) {
			this.$router.push({name: 'detail', params: { id: id }})
		}
	},
	components: {
		VueEasyPieChart
	}
}
</script>

<style scoped lang="scss">
.container {
	margin-bottom: 4rem;
	border: 1px solid red;
}
.display-1 {
	text-transform: uppercase;
	i {
		display: inline-block;
		font-size: 1.6rem;
		margin-right: 1rem;
		transform: translateY(-3px)
	}
}

.v-card {
	position: relative;
	.v-badge {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}
	.counter {
		font-weight: 300;
	}
	&.big {
		padding: 1rem;
		.folder {
			font-size: 1.5rem;
		}
		.counter { font-size: 2.5rem; }
	}
	&.small {
		padding: .7rem;
		.folder {
			font-size: 1.2rem;
		}
		.counter { font-size: 1.4rem; }
	}
	svg {
		height: 60px;
	}
}

</style>
