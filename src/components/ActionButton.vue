<template lang="pug">
	v-btn( fab dark large color="info" @click="active = !active" :class="active ? 'rotate' : ''" )
		v-icon(dark) add

</template>

<script>
export default {
	data () {
		return {
			active: false
		}
	},
	computed: {
	},
	methods: {
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.v-btn {
	i {
		transition: all .3s ease;
	}
	&.rotate {
		i {
			transform: rotate(135deg);
		}
	}
}

</style>
