<template lang="pug">
	v-alert( v-model="visibility" type="error" dismissible transition="scale-transition" ) {{ text }}
</template>

<script>
export default {
	props: [ 'text' ],
	data () {
		return {
			visibility: true
		}
	},
	watch: {
		visibility (val) {
			if (val) {
			} else {
				this.$emit('dismissed')
			}
		}
	}
}
</script>
