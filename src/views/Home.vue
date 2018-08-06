<template lang="pug">
v-container(grid-list-md)
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
			Widget(:folders="taskData")

	br
	br
	br
	br
	.display-1.font-weight-thin
		i.icon-doc
		span Документы
	Widget(:folders="docData")

	br
	br
	br
	br
	.display-1.font-weight-thin
		i.icon-folder
		span Папки
	Widget(:folders="folderData")
</template>

<script>
import VueEasyPieChart from 'vue-easy-pie-chart'
import 'vue-easy-pie-chart/dist/vue-easy-pie-chart.css'
import Widget from '@/components/Widget'

export default {
	data () {
		return {
		}
	},
	computed: {
		loading () {
			return this.$store.getters.loading
		},
		folderData () {
			const all = this.$store.getters.folders
			let result = []
			this.filterRec(all, x => x.dash === true && x.type === 'folder', result)
			return result
		},
		docData () {
			const all = this.$store.getters.folders
			let result = []
			this.filterRec(all, x => x.dash === true && x.type === 'doc', result)
			return result
		},
		taskData () {
			const all = this.$store.getters.folders
			let result = []
			this.filterRec(all, x => x.dash === true && x.type === 'task', result)
			return result
		}
	},
	methods: {
		displayDetails (id) {
			this.$router.push({name: 'detail', params: { id: id }})
		},
		filterRec (currentItems, condition, result) {
			for (let item of currentItems) {
				if (condition(item)) {
					result.push(item)
				}
				if (item.children) {
					this.filterRec(item.children, condition, result)
				}
			}
		}
	},
	components: {
		VueEasyPieChart,
		Widget
	}
}
</script>

<style scoped lang="scss">

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

</style>
