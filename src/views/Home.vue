<template lang="pug">
v-container(grid-list-md)
	v-layout(row wrap)
		v-flex(v-for="picture in this.$root.cat" :key="picture.id" xs6 sm4 @click="displayDetails(picture['.key'])")
			v-card(flat :class="$vuetify.breakpoint.mdAndDown ? 'small' : 'big'")
				v-badge( color="info" overlap)
					span( slot="badge" ) 7
				v-layout( row justify-space-around align-center)
					v-flex
							.counter 15
					v-flex
						trend( :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]" :gradient=[ "#133C60", "#0195DA" ] auto-draw smooth )
				.folder This is folder
</template>

<script>
export default {
	data () {
		return {
			title: 'just test'
		}
	},
	methods: {
		displayDetails (id) {
			this.$router.push({name: 'detail', params: { id: id }})
		}
	}
}
</script>

<style scoped lang="scss">

.v-card {
	position: relative;
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
