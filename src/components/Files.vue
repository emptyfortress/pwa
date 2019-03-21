<template lang="pug">
	v-layout( row wrap ).filepanel
		.file(v-for="file in current.files")
			img(:src="require('@/assets/img/file-main.svg')").full
			.name Dogovor aboutlka.doc
			.type doc
		.file(v-for="file in current.files").dop
			img(:src="require('@/assets/img/file.svg')").full
			.name Dogovor aboutlka.doc
			.type doc

</template>

<script>
export default {
	props: ['current'],
	data () {
		return {

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
.filepanel {
	margin: 0 2rem;
	.file {
		position: relative;
		width: 70px;
		margin-right: 2rem;
	}
	.full {
		width: 100%;
	}
	.name {
		line-height: 110%;
		/* font-size: 1.0rem; */
		position: absolute;
		top: 1.6rem;
		left: .4rem;
		width: 60px;
		white-space: wrap;
		overflow: hidden;
	}
	.type {
		text-transform: uppercase;
		color: #fff;
		font-size: 1.0rem;
		font-weight: 600;
		position: absolute;
		top: 60px;
		left: -10px;
		padding: 0rem 0.5rem;
		background: red;
	}
	.dop {
		.type, .name { opacity: .5; }

	}
}

</style>
