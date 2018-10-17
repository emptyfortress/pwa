<template lang="pug">
drag-it-dude(v-if="addTask")
	.add
		h2 Add task
</template>

<script>
import DragItDude from 'vue-drag-it-dude'

export default {
	data () {
		return {
		}
	},
	computed: {
		addTask () {
			return this.$store.getters.addTask
		}

	},
	components: {
		DragItDude
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
	box-shadow: 0 0 15px #000000aa;
}

</style>
