<template lang="pug">
#data
</template>

<script>
import Vue from 'vue/dist/vue.js'
import { ContainerMixin, ElementMixin } from 'vue-slicksort'

const SortableList = {
	mixins: [ContainerMixin],
	template: `
		<ul class="list">
			<slot />
		</ul>
	`
}

const SortableItem = {
	mixins: [ElementMixin],
	props: ['item'],
	template: `
		<li class="list-item">{{item}}</li>
	`
}

const ExampleVue = {
	name: 'Example',
	template: `
	<div class="root">
		<SortableList lockAxis="y" v-model="items">
			<SortableItem v-for="(item, index) in items" :index="index" :key="index" :item="item"/>
		</SortableList>
	</div>
	`,
	components: {
		SortableItem,
		SortableList
	},
	props: ['items'],
	data () {
		return {
		}
	}
}

</script>
