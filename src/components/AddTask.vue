<template lang="pug">
drag-it-dude(v-if="addTask" v-on:dblclick.native="expand" :class="assignClass")
	.top
		span создать
		v-icon minimize
		v-icon call_made
		<!-- v&#45;icon call_received -->
		v-icon(@click="closePop").close close
	v-layout(row fill-height justify-start ).add
		h2 test
		h2 test
</template>

<script>
import DragItDude from 'vue-drag-it-dude'

export default {
	data () {
		return {
			expanded: 0
		}
	},
	computed: {
		addTask () {
			return this.$store.getters.addTask
		},
		assignClass () {
			if (this.expanded === 1) { return 'tall' } else if (this.expanded === 2) { return 'centr' }
		}
	},
	components: {
		DragItDude
	},
	methods: {
		expand () {
			if (this.expanded === 0) { this.expanded = 1 } else if (this.expanded === 1) { this.expanded = 2 } else if (this.expanded === 2) { this.expanded = 0 }
		},
		closePop () {
			this.$store.commit('closeAddTask')
		}
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.drag-it-dude {
	width: var(--sm);
	height: var(--sm);
	background: #fff;
	z-index: 3;
	position: fixed;
	left: initial;
	top: initial;
	right: 0;
	bottom: 0;
	box-shadow: 0 0 15px #00000033;
	.top {
		position: ablsolute;
		top: 0;
		right: 0;
		text-align: right;
		/* background: $info; */
		span {
			font-size: .9rem;
			text-transform: uppercase;
			float: left;
			color: #fff;
			padding: .2rem .5rem;
			background: $info;
		}
		i {
			cursor: pointer;
			padding: .5rem;
			display: inline-block;
			font-size: .97rem;
			&:hover {
				background: #eee;
			}
		}
	}
}

.tall {
	/* background: red; */
	height: 99vh;
}
.centr {
	position: ablsolute;
	top: 5%;
	bottom: 5%;
	left: 10%;
	right: 10%;
	width: 80%;
	height: 90%;
}

</style>
