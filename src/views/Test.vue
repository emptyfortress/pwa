<template lang="pug">
v-container(grid-list-md )
	v-card
		h3 Ссылки  (4)
		table
			tr.link(v-for="link in links")
				td
					.tit
						img(:src="require('@/assets/img/test/' + link.img + '.png')")
						span {{ link.title }}
				td laksjd

</template>

<script>

export default {
	data () {
		return {
			links: [
				{
					title: 'Docsvision5.docx',
					img: 'attach',
					info: 'Вложение'
				},
				{
					title: 'Входящий договор',
					img: 'card',
					info: 'Вложение'
				},
				{
					title: 'Исходящий',
					img: 'card',
					info: 'Вложение'
				},
				{
					title: 'Входящий Вх-1 Исковое заявление',
					img: 'card',
					info: 'Вложение'
				},
				{
					title: 'docsvision.com',
					img: 'link',
					info: 'Вложение'
				}
			]
		}
	}
}
</script>

<style scoped lang="scss">
h3 {
	font-size: 1.2rem;
	text-align: left;
	font-weight: 400;
	border-bottom:1px solid #ccc;
	padding-bottom: 1rem;
}
.v-card {
	height: 80vh;
	padding: 2rem;
	font-size: 1.1rem;
}
table {
	width: 100%;
}

.link {
	height: 42px;
	padding: .2rem .5rem;
	img {
		vertical-align: bottom;
		margin-right: 1rem;
	}
	td {
		border-bottom: 1px solid #eee;
	}
}

.tit {
	text-decoration: underline;
	color: #0048A7;
}

</style>
