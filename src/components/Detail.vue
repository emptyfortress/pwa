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
				.quant {{ intId + 1 }} / {{ items.length }}
				v-btn(icon large @click="next")
					i.icon-next
				v-btn(icon large @click="back")
					i.icon-close
			.input
				input(id="files" type="file")
				v-btn(@click="load") Load

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
													//- img(:src="require('@/assets/img/docs/img' + item.id + '.jpg')" width="100%" v-if="!showme && item.files && !tree")
													//- #cont(v-if="showme")
													#cont
													h2(v-if="!showme && tree").text-xs-center Здесь будет маршрут согласования
													.dumb
														img(:src="require('@/assets/img/empty.svg')" width="40%" v-if="!item.files && !tree")
						v-btn( icon large @click="next").big
							i.icon-next

				v-fade-transition(mode="out-in")
					router-view(v-bind:key="intId").full

</template>

<script>
// import docx from 'docx-preview'
import DummyFolder from '@/components/DummyFolder'

// var docData = <document Blob>

// docx.renderAsync(docData, document.getElementById("cont"))
// 	.then(x => console.log("docx: finished"))

export default {
	props: ['id'],
	data () {
		return {
			showme: false,
			tree: false,
			size: 350,
			width: 350,
			height: 490
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
		},
		load () {
			this.tree = false
			this.showme = true
			let container = document.getElementById('cont')
			var xhr = new XMLHttpRequest()
			xhr.open('GET', '/img/test.docx')
			xhr.responseType = 'blob' // force the HTTP response, response-type header to be blob
			xhr.onload = function () {
			// eslint-disable-next-line
				docx.renderAsync(xhr.response, container, null, { debug: true })
					.then(function (x) { console.log(x) })
			}
			xhr.send()
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
}
.quant {
	line-height: 4.0rem;
	color: $grey2;
}
#cont {
	overflow-y: scroll;
	width: 100%;
	height: 100%;
}

</style>
