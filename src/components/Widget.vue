<template lang="pug">
div
	v-layout( column v-if="loading" align-center justify-center)
		v-flex.mt-5
			v-progress-circular( indeterminate color="primary" )

	v-layout(row wrap v-if="!loading")
		v-flex(v-for="folder in folders" :key="folder.id" xs12 sm4 @click="goToFolder(folder.id)")
			v-card(flat :class="$vuetify.breakpoint.mdAndDown ? 'small' : 'big'")
				v-badge( color="info" overlap v-show="folder.unread != 0")
					span( slot="badge" ) {{ folder.unread }}
				v-layout( row justify-space-around align-center)
					v-flex
						.counter {{ folder.items }}
					v-flex
						trend( :data="folder.history" :gradient=[ "#133C60", "#0195DA" ] auto-draw smooth )
				.folder {{ folder.text }}

</template>

<script>
export default {
	props: ['folders'],
	computed: {
		loading () {
			return this.$store.getters.loading
		}
	},
	methods: {
		goToFolder (id) {
			this.$router.push('/folder/' + id)
		}
	}
}
</script>

<style scoped lang="scss">
.v-card {
	position: relative;
	cursor: pointer;
	.v-badge {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}
	.counter {
		font-weight: 300;
	}
	&.big {
		padding: 1rem;
		.folder {
			font-size: 1.5rem;
		}
		.counter { font-size: 2.5rem; }
	}
	&.small {
		padding: .7rem;
		.folder {
			font-size: 1.2rem;
		}
		.counter { font-size: 1.4rem; }
	}
	svg {
		height: 60px;
	}
}

</style>
