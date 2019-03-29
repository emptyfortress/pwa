<template lang="pug">
.team
	.ava(v-for="man in team" :key="man.id")
		v-avatar(color="accent" size="36")
			img(:src="require('@/assets/img/user0.svg')")
		.con
			.bar(v-bind:style="{ width: man.width }")
			.name {{ man.name }}
				span {{ man.label }}
	<!-- apexchart(type="bar" :options="chartOptions" :series="series") -->
</template>

<script>
export default {
	data: function () {
		return {
			team: [
				{ id: 0, name: 'Орлов П.С.', width: '30%', label: '30' },
				{ id: 1, name: 'Гусев К.А.', width: '40%', label: '40' },
				{ id: 2, name: 'Соловьева Г.А.', width: '15%', label: '15' },
				{ id: 3, name: 'Уткин Ф.В.', width: '80%', label: '80' },
				{ id: 4, name: 'Журавлев П.Н.', width: '55%', label: '55' },
				{ id: 5, name: 'Тимофеев К.М.', width: '43%', label: '43' },
				{ id: 6, name: 'Иванов Д.А.', width: '25%', label: '25' }

			],
			chartOptions: {
				chart: {
					toolbar: { show: false },
					foreColor: '#fff',
					colors: [ '#fff' ]
				},
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
	},
	computed: {
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.team { margin: 1.5rem; }
.ava {
	display: flex;
	flex-wrap: nowrap;
	margin-bottom: .25rem;
}
.man {
	margin: .25rem;
}
.bar {
	height: 28px;
	background-image: linear-gradient(to top, #005981 0%,#005981 50%,#006797 51%,#006797 100%);
	span {
		color: #fff;
		line-height: 28px;
		padding-left: 1rem;
	}
}
.con {
	width: 100%;
	margin-top: 4px;
	margin-left: 1rem;
	height: 28px;
	position: relative;
	cursor: pointer;
	.name {
		position: absolute;
		top: 4px;
		left: 5px;
		color: #fff;
		display: none;
		span {
			margin-left: 10px;
		}
	}
	&:hover {
		background: darken( $info, 3% );
		.name {
			display: block;
		}
	}
}

</style>
