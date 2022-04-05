<template lang="pug">
v-container.infolder
	trend( :data="folder.history" :gradient="['#222']" auto-draw smooth ).trend
	.folder
		i.icon-folder-o
		span {{folder.text}}
	br
	v-layout(row wrap).filt
		v-flex.item(@click="setFilter('Все')" :class="filter==='Все' ? 'active' : ''") {{ items.length }}
			.new Всего
		v-flex.item(@click="setFilter('Новые')" :class="filter==='Новые' ? 'active' : ''") {{unreadItems}}
			.new Новых
		v-flex.item(@click="setFilter('Просроченные')" :class="filter==='Просроченные' ? 'active' : ''") {{ overdueItems }}
			.new Просрочено
		v-flex.item(@click="setFilter('На контроле')" :class="filter==='На контроле' ? 'active' : ''") {{ controlItems }}
			.new На контроле
		v-flex.item(@click="setFilter('Завершенные')" :class="filter==='Завершенные' ? 'active' : ''") {{ finishedItems }}
			.new Завершено
	br
	.mychart(v-responsive="chartResponse")
		apexchart( type="donut" width="600" :options="chartOptions" :series="series" id="bigChart")
		apexchart( type="donut" width="400" :options="chartOptions" :series="series" id="smChart")

</template>

<script>
import { ResponsiveDirective } from 'vue-responsive-components'

export default {
	props: ['folder'],
	data () {
		return {
			filterActive: undefined,
			chartOptions: {
				labels: [
					'Новые',
					'Просроченные',
					'На контроле',
					'Завершено',
					'Остальные'
				],
				colors: ['#527ACC', '#CC1E14', '#FFAF19', '#31991F', '#666'],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: val => (this.items.length / 100) * val
				},
				plotOptions: {
					pie: {
						offsetX: 0,
						offsetY: 0,
						expandOnClick: true,
						dataLabels: {
							offset: 0
						},
						donut: {
							size: '55%',
							background: 'transparent',
							labels: {
								show: true,
								name: {
									show: false,
									fontSize: '22px',
									fontFamily: 'Helvetica, Arial, sans-serif',
									color: undefined,
									offsetY: -10
								},
								value: {
									show: true,
									fontSize: '27px',
									fontFamily: 'Helvetica, Arial, sans-serif',
									color: undefined,
									offsetY: 16,
									formatter: function (val) {
										return val
									}
								},
								total: {
									show: true,
									// label: "Всего",
									color: '#373d3f',
									formatter: function (w) {
										return w.globals.seriesTotals.reduce((a, b) => {
											return a + b
										}, 0)
									}
								}
							}
						}
					}
				},
				chart: {
					events: {
						dataPointSelection: (event, chartContext, config) => {
							this.setFilterChart(config.dataPointIndex)
							console.log(2222)
						}
					}
				}
			},
			chartResponse: {
				small: el => el.width < 800,
				big: el => el.width > 800
			}
		}
	},
	computed: {
		series () {
			return this.seriesAll.map(item => item.val)
		},
		seriesAll () {
			let temp = []
			if (this.unreadItems) {
				temp.push({ label: 'Новые', val: this.unreadItems })
			}
			if (this.overdueItems) {
				temp.push({ label: 'Просроченные', val: this.overdueItems })
			}
			if (this.controlItems) {
				temp.push({ label: 'На контроле', val: this.controlItems })
			}
			if (this.finishedItems) {
				temp.push({ label: 'Завершено', val: this.finishedItems })
			}
			temp.push({
				label: 'Завершено',
				val:
          this.items.length -
          this.unreadItems -
          this.controlItems -
          this.overdueItems -
          this.finishedItems
			})
			return temp
		},
		items () {
			return this.$store.getters.items
		},
		currentFolder () {
			return this.$store.getters.currentFolder
		},
		filter () {
			return this.currentFolder.filter
		},
		unreadItems () {
			let items = this.$store.getters.items
			let unread = items.filter(item => item.unread)
			return unread.length
		},
		overdueItems () {
			let items = this.$store.getters.items
			let overdue = items.filter(item => item.overdue)
			return overdue.length
		},
		controlItems () {
			let items = this.$store.getters.items
			let control = items.filter(item => item.controler)
			return control.length
		},
		finishedItems () {
			let items = this.$store.getters.items
			let finish = items.filter(item => item.status === 'Завершено')
			return finish.length
		}
	},
	methods: {
		setFilter (e) {
			let dummy = {}
			dummy.id = this.$store.getters.currentFolder.id
			dummy.filter = e
			this.$store.dispatch('updateFolderFilter', dummy)
		},
		setFilterChart (e) {
			let dummy = {}
			dummy.id = this.$store.getters.currentFolder.id
			if (e === 0 && this.filterActive !== 0) {
				dummy.filter = 'Новые'
				this.filterActive = 0
			} else if (e === 1 && this.filterActive !== 1) {
				dummy.filter = 'Просроченные'
				this.filterActive = 1
			} else if (e === 2 && this.filterActive !== 2) {
				dummy.filter = 'На контроле'
				this.filterActive = 2
			} else if (e === 3 && this.filterActive !== 3) {
				dummy.filter = 'Завершенные'
				this.filterActive = 3
			} else if (e === 4) {
				dummy.filter = 'Все'
				this.filterActive = undefined
			} else if (this.filterActive === e) {
				dummy.filter = 'Все'
				this.filterActive = undefined
			}
			this.$store.dispatch('updateFolderFilter', dummy)
		}
	},
	directives: {
		responsive: ResponsiveDirective
	}
}
</script>

<style scoped lang="scss">
@import "@/assets/css/colors.scss";

.filt {
  border-top: 1px solid $grey1;
  border-bottom: 1px solid $grey1;
  color: $secondary;
  .item {
    font-size: 2.5rem;
    padding: 1rem;
    line-height: 80%;
    cursor: pointer;
    &.active {
      background: #fff;
      border-top: 3px solid $info;
    }
    &:hover {
      background: #fff;
    }
  }
  .new {
    font-size: 1rem;
    line-height: 80%;
    margin-top: 0.5rem;
  }
}

.infolder {
  padding-top: 1rem;
}
.folder {
  font-size: 2rem;
  opacity: 0.5;
  span {
    margin-left: 1rem;
  }
}
.new {
  font-size: 1.1rem;
  span {
    font-size: 2rem;
    margin-left: 1rem;
  }
}

.trend {
  /* display: block; */
  /* margin-left: 2rem; */
  width: 120px;
  margin-bottom: 1rem;
}

.sort {
  .v-btn {
  }
  .flex {
    flex-grow: 0;
  }
}
.mychart {
  position: relative;
  .all {
    position: absolute;
    top: 40%;
    left: 40%;
  }
}
.small.mychart {
  #bigChart {
    display: none;
  }
}
.big.mychart {
  #smChart {
    display: none;
  }
}
</style>
