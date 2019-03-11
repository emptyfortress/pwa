<template lang="pug">
.infolder
	v-scale-transition(origin="center center" mode="out-in")
		v-layout( align-center row justify-center v-if="!selected" key="one")
			v-flex.text-xs-center
				i.icon-basket
				div Выберите объекты
		v-layout(column  v-if="selected" key="two")
			v-card(tile).empty
				v-window( v-model="onboarding" )
					v-window-item( v-for="n in length" :key="`card-${n}`" )
						v-card( color="transparent" height="200" )
							v-layout( align-center justify-center fill-height tag="v-card-text" )
								Transparent themed, for background-imaged slides. Background color black added for demonstration purposes.

				v-card-actions.justify-space-between
					v-btn( text @click="prev" )
						v-icon( mdi-chevron-left )
					v-item-group( v-model="onboarding" class="text-xs-center" mandatory )
						v-item( v-for="n in length" :key="`btn-${n}`" )
							v-btn( slot-scope="{ active, toggle }" :input-value="active" icon @click="toggle" )
								v-icon mdi-record
					v-btn( text @click="next")
						v-icon( mdi-chevron-right )

</template>

<script>
export default {
	props: ['selItems'],
	data () {
		return {
			// length: 3,
			onboarding: 0
		}
	},
	computed: {
		length () {
			return this.selItems.length
		},
		selected () { return this.$store.getters.selected }
	},
	methods: {
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
	padding-top: 0;
	height: 100%;
}
.folder {
	font-size: 2rem;
	opacity: .5;
	span {
		margin-left: 1rem;
	}
}
.empty {
	height: calc(100vh - 200px);
	width: calc((100vh - 200px)*0.71);
	background: #fff;
	/* margin: 0 auto; */
}

</style>
