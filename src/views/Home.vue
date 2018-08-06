<template lang="pug">
v-container(grid-list-md)
	.display-1.font-weight-thin
		i.icon-check
		span Поручения
	v-layout( row wrap )
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
	br
	br
	.display-1.font-weight-thin
		i.icon-folder
		span Папки
	v-layout( column v-if="loading" align-center justify-center)
		v-flex.mt-5
			v-progress-circular( indeterminate color="primary" )
	v-layout(row wrap v-if="!loading")
		v-flex(v-for="folder in folderData" :key="folder.id" xs6 sm4 @click="displayDetails(picture['.key'])")
			v-card(flat :class="$vuetify.breakpoint.mdAndDown ? 'small' : 'big'")
				v-badge( color="info" overlap v-if="folder.unread != 0")
					span( slot="badge" ) {{ folder.unread }}
				v-layout( row justify-space-around align-center)
					v-flex
						.counter {{ folder.items }}
					v-flex
						trend( :data="folder.history" :gradient=[ "#133C60", "#0195DA" ] auto-draw smooth )
				.folder {{ folder.text }}
</template>

<script>
import VueEasyPieChart from 'vue-easy-pie-chart'
import 'vue-easy-pie-chart/dist/vue-easy-pie-chart.css'

export default {
	data () {
		return {
			title: 'just test',
			folders: ''
		}
	},
	computed: {
		loading () {
			return this.$store.getters.loading
		},
		folderData () {
			return this.$store.getters.folders
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
