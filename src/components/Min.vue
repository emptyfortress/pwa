<template lang="pug">
.min
	.top
		span создать:
		span(v-if="true") на исполнение
		v-icon(@click="restore") minimize
		v-icon(@click="restore") call_made
		v-icon(@click="closePop").close close

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
		},
		closePop () {
			this.$store.commit('closeAddTask')
			this.$store.commit('closeMin')
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
.top {
	position: ablsolute;
	top: 0;
	right: 0;
	text-align: right;
	background: $info;
	span {
		font-size: .9rem;
		text-transform: uppercase;
		float: left;
		color: #fff;
		padding: .2rem .5rem;
		background: $info;
	}
	i {
		color: #fff;
		cursor: pointer;
		padding: .5rem;
		display: inline-block;
		font-size: .97rem;
		&:hover {
			background: lighten($info, 20%);
		}
	}
}

</style>
