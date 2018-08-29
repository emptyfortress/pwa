<template lang="pug">
ol
	li(v-for="n in 20")
		p filename.doc
</template>

<script>
export default {
	props: ['title']
}
</script>

<style scoped lang="scss">
ol {
	border: 1px solid red;
	height: 100%;
}
</style>
