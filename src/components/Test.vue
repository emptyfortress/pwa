<template lang="pug">
h3 this is details of item {{fold}}.{{$route.params.id}}
</template>

<script>
export default {
	computed: {
		fold () {
			return this.$route.path.split('/')[2]
		}
	}
}
</script>
