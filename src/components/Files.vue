<template lang="pug">
	v-layout( row wrap ).filepanel
		.file(v-if="current.filenames.length" v-for="file in current.filenames")
			img(:src="require('@/assets/img/file-main.svg')").full
			.name {{ file.name }}
			.type(:class="file.type") {{ file.type }}
		.file(v-if="current.dopfiles.length" v-for="file in current.dopfiles").dop
			img(:src="require('@/assets/img/file.svg')").full
			.name {{ file.name }}
			.type(:class="file.type") {{ file.type }}
		.file
			v-btn( icon outline ).add
				v-icon add
		.file(v-if="current.report.length" v-for="file in current.report")
			img(:src="require('@/assets/img/report.svg')").full
			.name {{ file.name }}
			.type(:class="file.type") {{ file.type }}

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
		min-height: 100px;
		margin-right: 2rem;
		padding-bottom: 1rem;
		cursor: pointer;
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
		background: #050505;
		&.txt { background: #7e7e7e; }
		&.png { background: #3F7C80; }
		&.pdf { background: #D82121; }
		&.doc { background: #035693; }
		&.xls { background: #167F1B; }
	}
	.dop {
		.type, .name { opacity: .5; }
	}
	.add {
		position: absolute;
		top: 25px;
		left: 7px;
		color: #888;
	}
}

</style>
