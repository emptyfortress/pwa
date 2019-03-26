<template lang="pug">
.grid
	.zag Новое поручение
	input.tit(ref="ttt" v-model="title" :class="finish ? 'fin' : ''" @input="uniq")
	br
	v-textarea(v-model="descr" label="Описание" @input="copy" autofocus ).descr
</template>

<script>
export default {
	data () {
		return {
			title: 'Название',
			descr: '',
			edited: '',
			finish: false,
			touch: false
		}
	},
	methods: {
		uniq () {
			this.touch = true
			this.finish = true
		},
		copy () {
			if (this.touch === false) {
				this.title = ''
				this.title = this.descr
				let dot = this.descr.indexOf('.')
				if (dot > 0 && this.edited.length === 0) {
					let subs = this.descr.slice(0, dot)
					this.title = subs
					this.finish = true
				}
			}
		}
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.grid {
	padding: 0 2rem;
	width: 800px;
	margin: 0 auto;
}
.zag {
	font-size: 2.3rem;
	line-height: 200%;
	margin-bottom: 3rem;
}

.tit {
	width: 100%;
	font-size: 1.8rem;
	font-weight: 400;
	color: #CCCACA;
	&.fin {
		color: #000;
	}
}

.descr {
	font-size: 1.2rem;
	color: #999;
	width: 100%;
}

</style>
