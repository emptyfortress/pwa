<template lang="pug">
.detail
	.attr
		ul.one
			li Автор:
			li Исполнитель:
			li Создано:
			li Изменено:
		ul
			li Автор:
			li Исполнитель:
			li Создано:
			li Изменено:
	v-container(grid-list-sm)
		v-layout(row wrap)
			v-flex(v-for="n in 20")
				v-card(flat)

	<!-- div(v&#45;for="n in 50") -->
	<!-- 	h3 this is details of item {{currentItem.id}} для папки {{currentFolder.text}} -->
</template>

<script>
export default {
	props: ['id'],
	computed: {
		currentFolder () {
			return this.$store.getters.currentFolder
		},
		currentItem () {
			return this.$store.getters.currentItem(this.id)
		}
	}
}
</script>

<style scoped lang="scss">
.v-card {
	width: 100px;
	height: 100px;
	background: #fff;
}
.attr {
	display: flex;
	ul {
		list-style: none;
	}
	.one {
		text-align: right;
	}
}
.file {
	width: 100%;
	/* width: 300px; */
	height: 300px;
	background: #ccc;
}

</style>
