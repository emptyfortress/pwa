<template lang="pug">
v-container(grid-list-md text-xs-center)
	v-layout(align-start justify-center row)
		v-flex(xs12)
			v-card
				v-card-media(:src="this.catUrl" height="350")
				v-card-title(primary-title)
					h3.headline.mb-0 Add a cat
				v-form( ref="form" v-model="valid" lazy-validation )
					v-text-field( v-model="title" :rules="nameRules" :counter="15" label="Название" required )
					v-btn( @click="clear" ) Очистить
					v-btn( :disabled="!valid" @click="postCat" ) Отправить
</template>

<script>
import parse from 'xml-parser'

export default {
	data () {
		return {
			catUrl: null,
			name: ''
		}
	},
	mounted () {
		this.$http.get('https://thecatapi.com/api/images/get?format=xml&results_per_page=1').then(response => {
			this.catUrl = parse(response.body).root.children['0'].children['0'].children['0'].children['0'].content
		})
	},
	methods: {
		clear () {
			this.name = ''
		},
		postCat () {
			this.$root.$firebaseRefs.cat.push(
				{
					'url': this.catUrl,
					'comment': this.title,
					'info': 'Запощено с любовью',
					'created_at': -1 * new Date().getTime()
				})
				.then(this.$router.push('/'))
		}
	}
}
</script>

<style scoped lang="scss">
.v-card { padding-bottom: 2rem; }
.v-form {
	margin: 0 1rem;
}
</style>
