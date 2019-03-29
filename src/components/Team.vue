<template lang="pug">
.team
	.ava
		.man(v-for="n in 7" :key="n")
			v-avatar(color="accent")
				img(:src="require('@/assets/img/user0.svg')")
	<!-- apexchart(type="bar" :options="chartOptions" :series="series") -->
</template>

<script>
export default {
	data: function () {
		return {
			chartOptions: {
				chart: {
					toolbar: { show: false },
					foreColor: '#fff',
					colors: [ '#fff' ]
				},
				// grid: { show: false },
				// colors: '#00567D',
				plotOptions: {
					bar: {
						horizontal: true
					}
				},
				dataLabels: {
					enabled: false
				},
				series: [{
					data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
				}],
				xaxis: {
					categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan', 'United States', 'China', 'Germany']
				}
			}
		}
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.team { margin: .5rem; }
.ava {
	display: flex;
	flex-wrap: wrap;
}
.man {
	margin: .25rem;
}

/* .v-avatar.accent { */
/* 	border: 3px solid red; */
/* } */
</style>
