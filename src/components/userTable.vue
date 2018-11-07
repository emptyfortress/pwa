<template lang="pug">
table.users
	draggable
		tr(v-for="item in items")
			td {{item}}
			td laksd

</template>

<script>
import draggable from 'vuedraggable'

export default {
	props: [ 'items' ],
	data () {
		return {
		}
	},
	computed: {
	},
	components: {
		draggable
	},
	methods: {
	}
}
</script>
