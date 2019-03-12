<template lang="pug">
.cont
	h2 {{ this.currentItem.title }}
	h3 {{selItems.length}}
	h3 index: {{ onboarding }}
</template>

<script>
export default {
	props: ['onboarding', 'selItems'],
	data () {
		return {
		}
	},
	computed: {
		currentItem () {
			return this.selItems[this.onboarding]
		}
	},
	methods: {
	}
}
</script>

<style lang="scss">
.cont {
}
h2 {
	font-size: 1.6rem;
	font-weight: 400;
}
</style>
