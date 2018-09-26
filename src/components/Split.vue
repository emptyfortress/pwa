<template lang="pug">
div.all
	h1 hi all
	<!-- drag&#45;zone.zone -->
	<!-- 	drag&#45;content.content -->
	<!-- 		SlickList(lockAxis="y" :value="items" helperClass="moving" :distance=2 @input="newArr") -->
	<!-- 			transition&#45;group(name="sort" ) -->
	<!-- 				SlickItem(v&#45;for="(item, index) in items" :index="index" :key="index" :item="item" ) -->
	<!-- 					v&#45;card(flat v&#45;responsive="cardResponse" :class="myclass(item)" @click.native="selectCard(item, $event)").desktope -->
	<!-- 						.wrap -->
	<!-- 							.drag(@click.prevent="item.unread = !item.unread" @click="doNothing") -->
	<!-- 							v&#45;list&#45;tile&#45;avatar(v&#45;if="!selectMode") -->
	<!-- 								img(:src="require('@/assets/img/user0.svg')" v&#45;if="!selectMode").av -->
	<!-- 							.check(v&#45;if="selectMode") -->
	<!-- 								v&#45;checkbox(v&#45;model="item.selected" :value="item.selected" :id="item.id.toString()" color="success") -->
	<!-- 							.card&#45;content -->
	<!-- 								.head {{item.title}} -->
	<!-- 								.some some staff goes here -->
	<!-- 								.fio {{ item.author }} -->
	<!-- 								.date {{item.created}} -->
	<!-- 								.state В работе -->
	<!-- 		.empty(v&#45;if="items.length === 0") -->
	<!-- 			img(:src="require('@/assets/img/man.svg')") -->
	<!-- 			div {{list}} -->
	<!-- 	drag&#45;handle.handle -->
	<!-- 		div -->
	<!-- 	drag&#45;content.content -->
	<!-- 		v&#45;slide&#45;x&#45;transition(mode="out&#45;in" v&#45;if="detail") -->
	<!-- 			router&#45;view -->
	<!-- 		v&#45;slide&#45;x&#45;transition(mode="out&#45;in" v&#45;if="!detail &#38;&#38; !selectMode") -->
	<!-- 			DummyFolder(:folder="currentFolder") -->
	<!-- 		v&#45;slide&#45;x&#45;transition(mode="out&#45;in" v&#45;if="!detail &#38;&#38; selectMode") -->
	<!-- 			MultiSelect(:quantity="quantity") -->
</template>

<script>
import { SlickList, SlickItem, HandleDirective } from 'vue-slicksort'
import { ResponsiveDirective } from 'vue-responsive-components'
import DummyFolder from '@/components/DummyFolder'
import MultiSelect from '@/components/MultiSelect'

export default {
	data () {
		return {
		}
	},
	computed: {
	},
	methods: {
	},
	components: {
		SlickItem,
		SlickList,
		DummyFolder,
		MultiSelect
	},
	directives: {
		handle: HandleDirective,
		responsive: ResponsiveDirective
	}
}
</script>
