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
	br
	.mychart(v-responsive="chartResponse")
		apexchart( type="donut" width="600" :options="chartOptions" :series="series" id="bigChart")
		apexchart( type="donut" width="400" :options="chartOptions" :series="series" id="smChart")
		<!-- .all 50 -->

</template>

<script>
import { ResponsiveDirective } from 'vue-responsive-components'

export default {
	props: ['folder'],
	data () {
		return {
			chartOptions: {
				labels: ['В работе', 'Новые', 'Просрочено', 'На контроле', 'Делегировано'],
				dataLabels: { enabled: false }
			},
			series: [11, 32, 45],
			chartResponse: {
				small: el => el.width < 800,
				big: el => el.width > 800
			}
		}
	},
	computed: {
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
		}
	},
	methods: {
		setFilter (e) {
			let dummy = {}
			dummy.id = this.$store.getters.currentFolder.id
			dummy.filter = e
			this.$store.dispatch('updateFolderFilter', dummy)
		}
	},
	directives: {
		responsive: ResponsiveDirective
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

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
		margin-top: .5rem;
	}
}

.infolder {
	padding-top: 1rem;
}
.folder {
	font-size: 2rem;
	opacity: .5;
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
	#bigChart { display: none; }
}
.big.mychart {
	#smChart { display: none; }
}

</style>
