<template lang="pug">
.detail
	v-fade-transition(mode="out-in")
		DummyFolder(:folder="currentFolder" v-if="!detail")

		v-layout(column align-start v-if="detail")
			.att1
				.slider
					v-slider(v-model="size" hide-details min=200 max=1000 @input="changeWidth")
				v-btn(icon large @click="toggleShowme" :class="showme ? 'active' : ''").read
					i.icon-book
				v-btn(icon large @click="toggleTree" :class="tree ? 'active' : ''").read
					i.icon-tree
				v-spacer
				.status [ {{ currentItem.status }} ]
				v-spacer
				v-btn(icon large @click="prev")
					i.icon-prev
				v-btn(icon large @click="next")
					i.icon-next
				v-btn(icon large @click="back")
					i.icon-close

			.parent
				div
					v-layout(row fill-height align-center )
						v-btn( icon large @click="prev" ).big
							i.icon-prev
						div
							v-card.empty
								v-window(v-model="intId")
									v-window-item(v-for="item in items" :key="item.id")
										div
											v-layout( align-center justify-center fill-height )
												.vert(v-bind:style="{width: computedWidth, height: computedHeight}")
													img(:src="require('@/assets/img/docs/img' + item.id + '.jpg')" width="100%" v-if="!showme && item.files && !tree")
													iframe(src='https://view.officeapps.live.com/op/embed.aspx?src=https://firebasestorage.googleapis.com/v0/b/docsvision-8d5eb.appspot.com/o/sample.doc?alt=media&token=b94e9ae9-9634-4b02-a1cf-5ecb0e0310a7' width='100%' frameborder='0' scrolling='no' v-if="showme")
													h2(v-if="!showme && tree").text-xs-center Здесь будет маршрут согласования
													.dumb
														img(:src="require('@/assets/img/empty.svg')" width="40%" v-if="!item.files && !tree")
						v-btn( icon large @click="next").big
							i.icon-next

				v-fade-transition(mode="out-in")
					router-view(v-bind:key="intId").full

	<!-- iframe(src='https://view.officeapps.live.com/op/embed.aspx?src=https://firebasestorage.googleapis.com/v0/b/docsvision&#45;8d5eb.appspot.com/o/sample.doc?alt=media&#38;token=b94e9ae9&#45;9634&#45;4b02&#45;a1cf&#45;5ecb0e0310a7' width='100%' height='500' frameborder='0' scrolling='no' v&#45;if="showme") br -->
	<!-- iframe(src='http://docs.google.com/viewer?url=https://firebasestorage.googleapis.com/v0/b/docsvision&#45;8d5eb.appspot.com/o/automate&#45;the&#45;boring&#45;stuff&#45;with&#45;python&#45;2015&#45;.pdf?alt=media&#38;token=2cd730cf&#45;cdbe&#45;4956&#45;a1c1&#45;6ead413cc248&#38;embedded=true' width='400' height='500' frameborder="0" ) -->
	<!-- iframe(src="https://onedrive.live.com/embed?cid=CA582F2BC3AD1590&#38;resid=CA582F2BC3AD1590%2136277&#38;authkey=AHJ96YRJIbbJcec&#38;em=2" frameborder="0" width="400" height="346" ) -->
	<!-- iframe( src="https://onedrive.live.com/embed?cid=CA582F2BC3AD1590&#38;resid=CA582F2BC3AD1590%2133463&#38;authkey=AFh1O3tkDLAQzzw&#38;em=2" width="100%" height="327" frameborder="0" scrolling="no" ) -->

</template>

<script>
import DummyFolder from '@/components/DummyFolder'

export default {
	props: ['id'],
	data () {
		return {
			showme: false,
			tree: false,
			size: 465,
			width: 465,
			height: 651
		}
	},
	computed: {
		detail () { return this.$store.getters.detail },
		currentPath () { return this.currentFolder.path },
		items () {
			return this.$store.getters.items
		},
		intId () {
			return parseInt(this.id, 10)
		},
		currentFolder () {
			return this.$store.getters.currentFolder
		},
		currentItem () {
			return this.$store.getters.currentItem(this.intId)
		},
		computedWidth () {
			return this.width + 'px'
		},
		computedHeight () {
			return this.height + 'px'
		}
	},
	mounted () {
		if (this.currentItem.unread === true) {
			let that = this
			setTimeout(function () {
				that.toggleUnread(false)
			}, 2000)
		}
	},
	updated () {
		if (this.currentItem.unread === true) {
			let that = this
			setTimeout(function () {
				that.toggleUnread(false)
			}, 2000)
		}
	},
	methods: {
		back () {
			this.$router.push(this.currentFolder.path)
			this.$store.commit('toggleDetail', false)
		},
		changeWidth () {
			this.width = this.size
			this.height = this.width * 1.4
		},
		next () {
			let total = this.items.length - 1
			let n = this.intId + 1
			if (n <= total) {
				let destination = this.currentPath + '/' + n
				this.$router.push(destination)
			} else {
				let destination = this.currentPath + '/' + 0
				this.$router.push(destination)
			}
		},
		prev () {
			let total = this.items.length - 1
			let n = this.intId - 1
			if (n < 0) {
				let destination = this.currentPath + '/' + total
				this.$router.push(destination)
			} else {
				let destination = this.currentPath + '/' + n
				this.$router.push(destination)
			}
		},
		toggleUnread (e) {
			let cur = this.currentItem
			cur.unread = e
			this.$store.dispatch('updateItemReadStatus', cur)
			console.log(this.filenames)
		},
		toggleTree () {
			if (this.tree === true) {
				this.tree = false
				this.showme = false
			} else {
				this.tree = true
				this.showme = false
			}
		},
		toggleShowme () {
			if (this.showme === false) {
				this.tree = false
				this.showme = true
			} else {
				this.tree = false
				this.showme = false
			}
		}
	},
	components: {
		DummyFolder
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.detail {
	height: 100%;
	/* background: red; */
	position: relative;
	padding-right: 1rem;
}
.slider {
	margin-left: 4.3rem;
}
.parent {
	display: flex;
	align-items: flex-start;
	width: 100%;
}
.att1 {
	width: 100%;
	display: flex;
	/* background: red; */
}
.empty {
	background: #fff;
	/* text-align: center; */
}
.big {
	font-size: 2rem;
}
.attribute {
	flex-grow: 1;
	margin-right: 1rem;
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

iframe {
	border: 2px dotted red;
	height: 100%;
}
.read {
	font-size: 1.6rem;
	i {
		margin-left: -7px;
	}
	&.active {
		background: $cool;
	}
}
.vert {
	overflow: hidden;
	h2 {
		color: #ccc;
	}
}
.full {
	flex-grow: 1;
}
.icon-close {
	font-size: 1.5rem;
}
.status {
	font-size: 1.7rem;
	line-height: 3.4rem;
	color: $grey2;

	/* border: 3px solid #000; */
	/* background: #ccc; */
	/* height: 30px; */
}

</style>
