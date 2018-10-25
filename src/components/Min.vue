<template lang="pug">
.min(@click="restore")

</template>

<script>
export default {
	data () {
		return {
		}
	},
	computed: {
	},
	methods: {
		restore () {
			this.$store.commit('toggleMin')
			this.$store.commit('toggleAddTask')
		}
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.min {
	width: 300px;
	height: 32px;
	position: fixed;
	bottom: 0;
	right: 0;
	background: $info;
}

</style>
