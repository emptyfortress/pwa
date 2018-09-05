<template lang="pug">
.detail
	h2 {{ currentItem.title }}
	.attr
		ul.one
			li Автор:
			li Исполнитель:
			li Создано:
			li Изменено:
		ul
			li {{currentItem.author}}
			li Исполнитель:
			li Создано:
			li Изменено:
	br
	v-btn(@click="showme = !showme") show
	v-btn(@click="toggleUnread(true)") showlaksd
	br
	<!-- iframe(src='https://view.officeapps.live.com/op/embed.aspx?src=<span style="color: #3366ff;">https://firebasestorage.googleapis.com/v0/b/docsvision&#45;8d5eb.appspot.com/o/sample.doc?alt=media&#38;token=b94e9ae9&#45;9634&#45;4b02&#45;a1cf&#45;5ecb0e0310a7</span>') -->
	iframe(src='https://view.officeapps.live.com/op/embed.aspx?src=https://firebasestorage.googleapis.com/v0/b/docsvision-8d5eb.appspot.com/o/sample.doc?alt=media&token=b94e9ae9-9634-4b02-a1cf-5ecb0e0310a7' width='100%' height='500' frameborder='0' scrolling='no' v-if="showme") br
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
			showme: false
		}
	},
	computed: {
		currentFolder () {
			return this.$store.getters.currentFolder
		},
		currentItem () {
			return this.$store.getters.currentItem(this.id)
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
		show () {
			console.log(this.$route.params.id)
		},
		toggleUnread (e) {
			let cur = this.currentItem
			cur.unread = e
			this.$store.dispatch('updateItemReadStatus', cur)
			console.log(123456)
		}
	}
}
</script>

<style scoped lang="scss">
.detail {
	background: #fff;
	padding: 1rem;
	height: 100%;
	h2 {
		font-size: 2rem;
		font-weight: 400;
		line-height: 120%;
	}
}
iframe {
	/* border: 1px solid red; */
	/* background: red; */
}
.v-card {
	width: 100px;
	height: 100px;
	background: #fff;
}
.attr {
	display: flex;
	opacity: .7;
	ul {
		list-style: none;
	}
	.one {
		text-align: right;
	}
}
.file {
	width: 100%;
	/* width: 300px; */
	height: 300px;
	background: #ccc;
}

</style>
