<template lang="pug">
v-dialog(:value="pre" width="600")
	v-card.preview
		v-layout( row )
			v-flex(xs8)
				img(:src="require('@/assets/img/docs/img0.jpg')").av
				v-flex(xs4)
					v-card(color="info")
						v-card-title
							table.att
								tr
									td.label Имя:
									<!-- td.bold {{ file.name }} -->
								tr
									td.label Размер:
									<!-- td.bold {{ file.size }} -->
								tr
									td.label Создан:
									td 2018-09-20
								tr
									td.label Изменен:
									td --
								tr
									td.label Автор:
									<!-- td {{ people[index] }} -->
						v-divider
</template>

<script>
export default {
	props: ['preview'],
	data () {
		return {
			// pre: this.preview
		}
	},
	computed: {
		pre: {
			get () {
				return this.preview
			},
			set (newValue) {}
		}
	}
}
</script>
