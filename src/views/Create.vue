<template lang="pug">
v-container(grid-list-md text-xs-center).rel
	v-layout(align-start justify-center row)
		v-flex(xs6)
			v-card
				v-card-title(primary-title)
					h3.headline.mb-0 Add an item
				v-form( ref="form" )
					v-text-field( v-model="text" label="Folder"  )
					v-text-field( v-model="children" label="children"  )
					v-text-field( v-model="items" label="Items"  )
					v-text-field( v-model="unread" label="unread"  )
					v-text-field( v-model="history" label="History"  )
					v-btn( @click="back" ) Отмена
					v-btn( @click="postFolder" ) Отправить

</template>

<script>
export default {
	data () {
		return {
			text: '',
			items: '',
			unread: '',
			children: [],
			history: []
		}
	},
	methods: {
		postFolder () {
			const hist = this.history.split(' ')
			const sub = this.children.split(', ')
			this.$root.$firebaseRefs.folders.push(
				{
					'text': this.text,
					'items': this.items,
					'unread': this.unread,
					'children': sub,
					'history': hist
				})
				.then(this.$router.push('/'))
		}
	}
}
</script>

<style scoped lang="scss">
.v-card {
	padding: 0 1rem;
}
</style>
