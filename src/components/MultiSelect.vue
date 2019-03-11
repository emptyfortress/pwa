<template lang="pug">
.infolder
	v-scale-transition(origin="center center" mode="out-in")
		v-layout( align-center row justify-center v-if="!selected" key="one")
			v-flex.text-xs-center
				i.icon-basket
				div Выберите объекты
		v-layout(column).mx-3
			v-slider(v-model="size" min=200 max=1000 @input="changeWidth")
			v-layout(row fill-height align-center  v-if="selected" key="two")
				v-btn( icon @click="prev" )
					i.icon-prev
				div
					v-card.empty
						v-window( v-model="onboarding" )
							v-window-item( v-for="item in selItems" :key="item.id" )
								div
									v-layout( align-center justify-center fill-height tag="v-card-text" )
										.vert(v-bind:style="{width: computedWidth, height: computedHeight}")
											img(:src="require('@/assets/img/docs/img' + item.id + '.jpg')" width="95%" v-if="item.files")
											img(:src="require('@/assets/img/docs/empty.png')" width="95%" v-if="!item.files").empty
											.emptyTitle(v-if="!item.files") {{ item.title }}
										<!-- h3 {{ item.title }} -->
				v-btn( icon @click="next")
					i.icon-next

				<!-- v&#45;card&#45;actions.justify&#45;space&#45;between -->
				<!-- 	v&#45;btn( icon @click="prev" ) -->
				<!-- 		i.icon&#45;prev -->
				<!-- 	v&#45;item&#45;group( v&#45;model="onboarding" class="text&#45;xs&#45;center" mandatory ) -->
				<!-- 		v&#45;item( v&#45;for="n in length" :key="`btn&#45;${n}`" ) -->
				<!-- 			v&#45;btn( slot&#45;scope="{ active, toggle }" :input&#45;value="active" icon @click="toggle" ) -->
				<!-- 				v&#45;icon mdi&#45;record -->
				<!-- 	v&#45;btn( icon @click="next") -->
				<!-- 		i.icon&#45;next -->

</template>

<script>
export default {
	props: ['selItems'],
	data () {
		return {
			size: 265,
			width: 265,
			height: 350,
			// length: 3,
			onboarding: 0
		}
	},
	computed: {
		selected () { return this.$store.getters.selected },
		computedWidth () {
			return this.width + 'px'
		},
		computedHeight () {
			return this.height + 'px'
		},
	},
	methods: {
		changeWidth () {
			this.width = this.size
			this.height = this.width * 1.4
		},
		next () {
			this.onboarding = this.onboarding + 1 === length
				? 0
				: this.onboarding + 1
		},
		prev () {
			this.onboarding = this.onboarding - 1 < 0
				? this.length - 1
				: this.onboarding - 1
		},
		clearUnread () {
			let items = this.$store.getters.items
			items.map(function (item) {
				item.unread = 0
			})
		},
		specialSelection (e) {
			if (this.quantity > e) {
				return 'disabled'
			} else return ''
		}
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';
.disabled {
	display: none;
}

.icon-basket {
	font-size: 4rem;
	opacity: .3;
}

.infolder {
	height: 100%;
}

.empty {
	/* height: calc(100vh - 160px); */
	/* width: calc((100vh - 160px)*0.71); */
	background: #ccc;
	/* margin: 0 auto; */
}

</style>
