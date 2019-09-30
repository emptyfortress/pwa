<template lang="pug">
	v-layout( row wrap ).filepanel
		v-menu(v-if="current.filenames.length" v-for="(file, index) in current.filenames" :key="index")
			.file(slot="activator")
				img(:src="require('@/assets/img/file-main.svg')").full
				.name {{ file.name }}
				.type(:class="file.type") {{ file.type }}
			v-card(max-width="300" color="info")
				v-card-title
					table.att
						tr
							td.label Имя:
							td.bold {{ file.name }}
						tr
							td.label Размер:
							td.bold {{ file.size }}
						tr
							td.label Создан:
							td 2018-09-20
						tr
							td.label Изменен:
							td --
						tr
							td.label Автор:
							td {{ people[index] }}
				v-divider
				v-list
					v-list-tile(@click="")
						v-list-tile-content
							v-list-tile-title Сделать обложкой
					v-list-tile(@click="")
						v-list-tile-content
							v-list-tile-title Превью
					v-list-tile(@click="")
						v-list-tile-content
							v-list-tile-title Скачать
					v-list-tile(@click="")
						v-list-tile-content
							v-list-tile-title Создать версию
					v-list-tile(@click="")
						v-list-tile-content
							v-list-tile-title Удалить
		v-menu(v-if="current.dopfiles.length" v-for="( file, i) in current.dopfiles" :key="i" )
			.file.dop(slot="activator")
				img(:src="require('@/assets/img/file.svg')").full
				.name {{ file.name }}
				.type(:class="file.type") {{ file.type }}
			v-card(max-width="300" color="grey2")
				v-card-title
					table.att
						tr
							td.label Имя:
							td.bold {{ file.name }}
						tr
							td.label Размер:
							td.bold {{ file.size }}
						tr
							td.label Создан:
							td 2018-09-20
						tr
							td.label Изменен:
							td --
						tr
							td.label Автор:
							td {{ people[i+ 2] }}
				v-divider
				v-list
					v-list-tile(@click="")
						v-list-tile-content
							v-list-tile-title Сделать обложкой
					v-list-tile(@click="")
						v-list-tile-content
							v-list-tile-title Превью
					v-list-tile(@click="")
						v-list-tile-content
							v-list-tile-title Скачать
					v-list-tile(@click="")
						v-list-tile-content
							v-list-tile-title Создать версию
					v-list-tile(@click="")
						v-list-tile-content
							v-list-tile-title Удалить
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
			// filemenu: false,
			// filemenu1: false,
			people: [
				'Derek Barnhouse',
				'Seth Reyes',
				'John Miller',
				'Lynn Mathias',
				'Darlene Barrie',
				'Wendy McHugh',
				'Ruth Merrell',
				'Joseph Mackey',
				'Dennis Holman',
				'Will Hernandez',
				'Eugene Tuggle',
				'Jamel Grant',
				'Willy Fahey',
				'Steven Griffith',
				'Daniel Webster',
				'Robert Carter',
				'Velda White',
				'Terresa Juarez',
				'Angela Mayer',
				'Florence Boyle'
			]
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
.label {
	color: #888;
	padding-right: 1rem;
}
.bold {
	font-weight: bold;
	font-size: 1.1rem;
}
.att td {
	color: #fff;
}

</style>
