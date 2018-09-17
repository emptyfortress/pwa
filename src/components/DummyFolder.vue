<template lang="pug">
v-container.infolder
	trend( :data="folder.data.history" :gradient="['#222']" auto-draw smooth ).trend
	.folder
		i.icon-folder-o
		span {{folder.data.text}}
	br
	v-layout(row wrap).filt
		v-flex.item(@click="setFilter('')" :class="filter==='' ? 'active' : ''") {{folder.data.items}}
			.new Всего
		v-flex.item(@click="setFilter('unread')" :class="filter==='unread' ? 'active' : ''") {{folder.data.unread}}
			.new Новых
		v-flex.item {{folder.data.overdue}}
			.new Просрочено
		v-flex.item {{folder.data.overdue}}
			.new Важных
</template>

<script>
export default {
	props: ['folder'],
	data () {
		return {
			tempFolder: this.folder
		}
	},
	computed: {
		currentFolder () {
			return this.$store.getters.currentFolder
		},
		filter () {
			return this.currentFolder.data.filter
		}
	},
	methods: {
		showAll () {
			this.unread = false
			this.$store.commit('setFilter', '')
		},
		setFilter (e) {
			let dummy = {}
			dummy.id = this.$store.getters.currentFolder.id
			dummy.filter = e
			this.$store.dispatch('updateFolderFilter', dummy)
			console.log(dummy)
		}
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.filt {
	border-top: 1px solid $grey1;
	border-bottom: 1px solid $grey1;
	color: $secondary;
	.item {
		font-size: 2.5rem;
		padding: 1rem;
		line-height: 80%;
		cursor: pointer;
		&.active {
			background: #fff;
			border-top: 3px solid $info;
		}
		&:hover {
			background: #fff;
		}
	}
	.new {
		font-size: 1rem;
		line-height: 80%;
		margin-top: .5rem;
	}
}

.infolder {
	padding-top: 0;
}
.folder {
	font-size: 2rem;
	opacity: .5;
	span {
		margin-left: 1rem;
	}
}
.new {
	font-size: 1.1rem;
	span {
		font-size: 2rem;
		margin-left: 1rem;
	}
}

.trend {
	/* display: block; */
	/* margin-left: 2rem; */
	width: 120px;
	margin-bottom: 1rem;
}

</style>
