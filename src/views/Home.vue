<template lang="pug">
v-container(grid-list-md)
	v-layout(row)
		v-flex(xs8)
			.display-1.font-weight-thin
				i.icon-check
				span Поручения
			v-layout( column v-if="loading" align-center justify-center)
				v-flex.mt-5
					v-progress-circular( indeterminate color="primary" )
			v-layout( row wrap v-if="!loading")
				v-flex( xs12 sm6 )
					v-card(flat :class="$vuetify.breakpoint.mdAndDown ? 'small' : 'big'")
						v-layout( row justify-center align-center)
							v-flex
								vue-easy-pie-chart( :percent="75" :scale-length="0" :size="80")
							v-flex
								.folder Выполнено поручений на этой неделе
				v-flex( xs12 sm6 )
					v-card(flat :class="$vuetify.breakpoint.mdAndDown ? 'small' : 'big'")
						v-layout( row justify-between align-center)
							v-flex
								vue-easy-pie-chart( :percent="0" :scale-length="0" :size="80")
							v-flex
								.folder Просрочено на этой неделе
				v-flex( xs12 )
					Widget(:folders="featuredType('task')")
			br
			br
			br
			br
			.display-1.font-weight-thin
				i.icon-doc
				span Документы
			Widget(:folders="featuredType('doc')")
			br
			br
			br
			br
			.display-1.font-weight-thin
				i.icon-folder
				span Папки
			Widget(:folders="featuredType('folder')")
		v-flex(xs4)
			.one
				.week Статистика недели (поручения)
				.digit 14
				apexchart( type="bar" :options="chartOptions" :series="series" id="bigChart")
				br
				.week Последние файлы
				v-list(two-line).filelist
					v-list-tile(v-for="file in files" :key="file.name" avatar @click="")
						v-list-tile-avatar
							i.icon-doc.lrg
						v-list-tile-content
							v-list-tile-title.bold {{ file.name }}
							v-list-tile-subtitle.sub {{ file.size }}
						v-list-tile-action
							v-btn( icon )
								v-icon(color="#003952") more_vert

</template>

<script>
import VueEasyPieChart from 'vue-easy-pie-chart'
import 'vue-easy-pie-chart/dist/vue-easy-pie-chart.css'
import Widget from '@/components/Widget'

export default {
	data () {
		return {
			files: [
				{ name: 'Договор с ООО "Ромашка".doc', size: '45 kB' },
				{ name: 'Приложение к договору.txt', size: '11 kB' },
				{ name: 'Расписане выплат.xls', size: '23 kB' },
				{ name: 'Приказ № 12-3/Л.doc', size: '15 kB' },
			],
			chartOptions: {
				chart: {
					toolbar: { show: false },
					foreColor: '#fff',
					colors: [ '#fff' ]
				},
				xaxis: {
					categories: ['пн', 'вт', 'ср', 'чт', 'пт'],
					position: 'bottom',
					// labels: { offsetY: -18 },
					axisBorder: { show: true, color: '#000' }
				},
				grid: { show: false },
				colors: '#00567D',
				fill: {
					type: 'gradient',
					gradient: {
						shade: 'dark',
						type: 'horizontal',
						shadeIntensity: 0.25,
						gradientToColors: undefined,
						inverseColors: true,
						opacityFrom: 0.85,
						opacityTo: 0.85,
						stops: [50, 0, 100]
					}
				}
			},
			plotOptions: {
			},
			series: [{
				name: 'kmg01',
				data: [5, 3, 1, 6, 2]
			}]
		}
	},
	computed: {
		loading () {
			return this.$store.getters.loading
		},
		featured () {
			let all = this.$store.getters.folders
			let dash = all.filter(item => item.dash === true)
			return dash
		}
	},
	methods: {
		featuredType (e) {
			return this.featured.filter(x => x.type === e)
		}
	},
	components: {
		VueEasyPieChart,
		Widget
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.container {
	margin-bottom: 5rem;
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
.one {
	height: 96%;
	/* margin-bottom: 6rem; */
	margin-top: 3.4rem;
	background: $info;
	padding-top: 1rem;
	.week {
		/* text-align: center; */
		color: #fff;
		margin-left: 1rem;
		margin-right: 1rem;
		text-transform: uppercase;
		font-size: 1.1rem;
		border-bottom: 1px solid #ffffff66;
	}
	.digit {
		margin-left: 1rem;
		font-size: 3rem;
		color: #fff;
	}
	.theme--light.v-list {
		color: #fff;
		background: transparent;
	}
	.lrg { font-size: 2.5rem; color: #003952; }
	.sub { font-size: .9rem; color: #003952; }
}

</style>
