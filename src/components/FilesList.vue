<template lang="pug">
ol
	li(v-for="item in attach")
		a {{ item }}
</template>

<script>
export default {
	props: ['attach']
}
</script>

<style scoped lang="scss">

</style>
