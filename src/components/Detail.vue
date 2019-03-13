<template lang="pug">
.detail
	v-layout(column align-start)
		v-slider(v-model="size" hide-details min=200 max=1000 @input="changeWidth").slider
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
												img(:src="require('@/assets/img/docs/img' + item.id + '.jpg')" width="100%" v-if="item.files")
												.dumb
													img(:src="require('@/assets/img/empty.svg')" width="40%" v-if="!item.files")
					v-btn( icon large @click="next").big
						i.icon-next

			<!-- Attribute(:selItems="selItems" :onboarding="onboarding").attribute -->

	<!-- h2 {{ currentItem.title }} -->
	<!-- .attr -->
	<!-- 	ul.one -->
	<!-- 		li Автор: -->
	<!-- 		li Исполнитель: -->
	<!-- 		li Создано: -->
	<!-- 		li Изменено: -->
	<!-- 	ul -->
	<!-- 		li {{currentItem.author}} -->
	<!-- 		li {{currentItem.executor}} -->
	<!-- 		li {{currentItem.created}} -->
	<!-- 		li {{currentItem.modified}} -->
	<!-- br -->
	<!-- div Файлов: {{currentItem.files}} -->
	<!-- ul -->
	<!-- 	li(v&#45;for="file in currentItem.filenames") {{ file.name }} -->
	<!-- br -->
	<!-- v&#45;btn(@click="showme = !showme") show -->
	<!-- v&#45;btn(@click="show") showlaksd -->
	<!-- br -->
	<!-- iframe(src='https://view.officeapps.live.com/op/embed.aspx?src=https://firebasestorage.googleapis.com/v0/b/docsvision&#45;8d5eb.appspot.com/o/sample.doc?alt=media&#38;token=b94e9ae9&#45;9634&#45;4b02&#45;a1cf&#45;5ecb0e0310a7' width='100%' height='500' frameborder='0' scrolling='no' v&#45;if="showme") br -->
	<!-- iframe(src='http://docs.google.com/viewer?url=https://firebasestorage.googleapis.com/v0/b/docsvision&#45;8d5eb.appspot.com/o/automate&#45;the&#45;boring&#45;stuff&#45;with&#45;python&#45;2015&#45;.pdf?alt=media&#38;token=2cd730cf&#45;cdbe&#45;4956&#45;a1c1&#45;6ead413cc248&#38;embedded=true' width='400' height='500' frameborder="0" ) -->
	<!-- iframe(src="https://onedrive.live.com/embed?cid=CA582F2BC3AD1590&#38;resid=CA582F2BC3AD1590%2136277&#38;authkey=AHJ96YRJIbbJcec&#38;em=2" frameborder="0" width="400" height="346" ) -->
	<!-- iframe( src="https://onedrive.live.com/embed?cid=CA582F2BC3AD1590&#38;resid=CA582F2BC3AD1590%2133463&#38;authkey=AFh1O3tkDLAQzzw&#38;em=2" width="100%" height="327" frameborder="0" scrolling="no" ) -->

	<!-- v&#45;container(grid&#45;list&#45;sm) -->
	<!-- 	v&#45;layout(row wrap) -->
	<!-- 		v&#45;flex(v&#45;for="n in 20") -->
	<!-- 			v&#45;card(flat) -->
</template>

<script>
export default {
	props: ['id'],
	data () {
		return {
			showme: false,
			size: 465,
			width: 465,
			height: 651,
		}
	},
	computed: {
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
		changeWidth () {
			this.width = this.size
			this.height = this.width * 1.4
		},
		next () {
			let total = this.items.length - 1
			let n = this.intId + 1
			if ( n <= total ) {
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
			if ( n < 0 ) {
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
		}
	}
}
</script>

<style scoped lang="scss">
.detail {
	height: 100%;
	h2 {
		font-size: 2rem;
		font-weight: 400;
		line-height: 120%;
	}
}
.slider {
	margin-left: 4.3rem;
}
.parent {
	display: flex;
	/* background: green; */
}
.empty {
	background: #fff;
	/* text-align: center; */
}
.big {
	font-size: 2rem;
}

iframe {
	/* border: 1px solid red; */
	/* background: red; */
}

/* .attr { */
/* 	display: flex; */
/* 	opacity: .7; */
/* 	ul { */
/* 		list-style: none; */
/* 	} */
/* 	.one { */
/* 		text-align: right; */
/* 	} */
/* } */
/* .file { */
/* 	width: 100%; */
/* 	height: 300px; */
/* 	background: #ccc; */
/* } */

</style>
