<template lang="pug">
.infolder
	v-scale-transition(origin="center center" mode="out-in")
		v-layout( align-center row justify-center v-if="!selItems.length" key="one")
			v-flex.text-xs-center
				i.icon-basket
				div Выберите объекты
		v-layout(column align-start v-if="selItems.length" key="two")
			v-slider(v-model="size" hide-details min=200 max=1000 @input="changeWidth").slider
			.parent
				div
					v-layout(row fill-height align-center )
						v-btn( icon large @click="prev" ).big
							i.icon-prev
						div
							v-card.empty
								v-window( v-model="onboarding")
									v-window-item( v-for="item in selItems" :key="item.id")
										div
											v-layout( align-center justify-center fill-height tag="v-card-text" )
												.vert(v-bind:style="{width: computedWidth, height: computedHeight}")
													img(:src="require('@/assets/img/docs/img' + item.id + '.jpg')" width="100%" v-if="item.files")
													.dumb
														img(:src="require('@/assets/img/empty.svg')" width="40%" v-if="!item.files")
						v-btn( icon large @click="next").big
							i.icon-next
				Attribute(:items="selItems" :id="onboarding").attribute
	v-snackbar(v-model="snackbar" :timeout=0 multi-line ).snackbar
		v-btn(flat dark :loading="loading" :disabled="loading"  @click="decision") Подписать
		<!-- v&#45;btn(flat dark  @click="decision = !decision") Отклонить -->
		<!-- v&#45;btn(flat   @click="delegate" ) Делегировать -->
		v-btn(flat icon  @click="snackbar = false")
			i.icon-close

</template>

<script>
import Attribute from '@/components/Attribute'

export default {
	data () {
		return {
			loader: null,
			loading: false,
			loading1: false,
			size: 465,
			width: 465,
			snackbar: false,
			show: true,
			height: 651,
			sel: this.selectMode,
			onboarding: 0
		}
	},
	mounted () {
	},
	computed: {
		selItems () {
			const all = this.$store.getters.items
			return all.filter(item => item.selected === true)
		},
		computedWidth () {
			return this.width + 'px'
		},
		computedHeight () {
			return this.height + 'px'
		}
	},
	watch: {
		selItems (val) {
			if (val.length > 0) {
				this.snackbar = true
			} else this.snackbar = false
		}
	},
	methods: {
		decision () {
			this.loading = true
			setTimeout(() => {
				this.loading = false
				this.selItems[this.onboarding].selected = false
			}, 800)
		},
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
	},
	components: {
		Attribute
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
.parent {
	display: flex;
}

.attribute {
	flex-grow: 1;
	/* height: 300px; */
	margin-right: 3rem;
}
.decision {
	/* bottom: 200px !important; */
	bottom: 85px;
	z-index: 1;
}

.modal {
	z-index: 1050;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	outline: 0;
	overflow: hidden;
	-webkit-overflow-scrolling: touch;
}

.modal-backdrop {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: #000;
	opacity: 0;
	transition: all 0.15s;
}
.modal-backdrop.modal-opened {
	opacity: 0.4;
}
</style>
