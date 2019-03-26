<template lang="pug">
.filePane.mx-3(@click="test")
	v-layout( align-center justify-center column fill-height )
		v-slide-x-transition(mode="out-in")
			.absent(v-if="!attach" :key="1")
				v-layout(row align-center justify-center)
					i.icon-absentfile(@click="test")
					.notfound
						span Контекстные файлы не найдены.
						br
						span Откройте карточку, документ или задание,
						br
						span содержащие нужные вам файлы
			.absent(v-else)
				v-layout(row align-center justify-space-around fill-height wrap)
					.file(v-for="item in filenames")
						v-layout(row align-center justify-center fill-height)
							.text-xs-center
								span {{ item.name }}
								v-checkbox

</template>

<script>
export default {
	data () {
		return {
			files: []
		}
	},
	computed: {
		intId () {
			return parseInt(this.$route.params.id, 10)
		},
		currentItem () {
			return this.$store.getters.currentItem(this.intId)
		},
		filenames () {
			if (this.currentItem) {
				return this.currentItem.filenames
			} else return false
		},
		attach () {
			if (this.$route.params.id && this.currentItem.filenames) {
				return true
			} else return false
		}
	},
	methods: {
		test () {
			console.log(this.intId)
		}
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.filePane {
	background: #eee;
	/* height: 180px; */
	padding: 1rem;
	.absent {
		width: 100%;
		i { font-size: 4.5em; color: #aaa; }
		overflow: scroll;
	}
	.file {
		width: 120px;
		min-width: 100px;
		height: 140px;
		background: #fff;
		margin-right: 1rem;
		margin-bottom: 1rem;
		overflow: hidden;
		position: relative;
		.bt {
			position: absolute;
			bottom: 1rem;
			left: 1rem;
		}
	}
}

</style>
