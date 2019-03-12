<template lang="pug">
.infolder
	v-scale-transition(origin="center center" mode="out-in")
		v-layout( align-center row justify-center v-if="!selItems.length" key="one")
			v-flex.text-xs-center
				i.icon-basket
				div Выберите объекты
		v-layout(column align-start v-if="selItems.length" key="two")
			v-slider(v-model="size" hide-details min=200 max=1000 @input="changeWidth").slider
			v-layout(row fill-height align-center )
				v-btn( icon large @click="prev" ).big
					i.icon-prev
				div
					v-card.empty
						v-window( v-model="onboarding" )
							v-window-item( v-for="item in selItems" :key="item.id" )
								div
									v-layout( align-center justify-center fill-height tag="v-card-text" )
										.vert(v-bind:style="{width: computedWidth, height: computedHeight}")
											img(:src="require('@/assets/img/docs/img' + item.id + '.jpg')" width="100%" v-if="item.files")
											.emptyTitle(v-if="!item.files") {{ item.title }}
											.dumb
												img(:src="require('@/assets/img/empty.svg')" width="40%" v-if="!item.files")
				v-btn( icon large @click="next").big
					i.icon-next

</template>

<script>
export default {
	props: ['selItems'],
	data () {
		return {
			size: 465,
			width: 465,
			height: 651,
			sel: this.selectMode,
			onboarding: 0
		}
	},
	computed: {
		computedWidth () {
			return this.width + 'px'
		},
		computedHeight () {
			return this.height + 'px'
		}
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
	background: #fff;
	/* text-align: center; */
}
.dumb {
	height: 90%;
	display: flex;
	text-align: center;
	img {
		margin: 0 auto;
		opacity: .4;
	}
}

.big {
	font-size: 2rem;
}
.emptyTitle {
	font-size: 1.4rem;
	text-align: center;
	margin-top: 1rem;
}
.slider {
	margin-left: 4.3rem;
}

</style>
