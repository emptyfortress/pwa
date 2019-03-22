<template lang="pug">
v-container.infolder
	trend( :data="folder.history" :gradient="['#222']" auto-draw smooth ).trend
	.folder
		i.icon-folder-o
		span {{folder.text}}
	br
	v-layout(row wrap).filt
		v-flex.item(@click="setFilter('')" :class="filter==='' ? 'active' : ''") {{folder.items}}
			.new Всего
		v-flex.item(@click="setFilter('unread')" :class="filter==='unread' ? 'active' : ''") {{unreadItems}}
			.new Новых
		v-flex.item(@click="setFilter('overdue')" :class="filter==='overdue' ? 'active' : ''") {{folder.overdue}}
			.new Просрочено
		v-flex.item(@click="setFilter('important')" :class="filter==='important' ? 'active' : ''") {{folder.overdue}}
			.new Важных
	br

	v-layout(row wrap).sort
		v-flex
			v-btn(round color="info" small) Срок
		v-flex
			v-btn(flat round small) Статус
		v-flex
			v-btn(flat round small) Автор
		v-flex
			v-btn(flat round small) Тема
		v-flex
			v-btn(flat round small) Создан

</template>

<script>
export default {
	props: ['folder'],
	data () {
		return {
		}
	},
	computed: {
		currentFolder () {
			return this.$store.getters.currentFolder
		},
		filter () {
			return this.currentFolder.filter
		},
		unreadItems () {
			let items = this.$store.getters.items
			let unread = items.filter(item => item.unread)
			return unread.length
		}
	},
	methods: {
		setFilter (e) {
			let dummy = {}
			dummy.id = this.$store.getters.currentFolder.id
			dummy.filter = e
			this.$store.dispatch('updateFolderFilter', dummy)
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
	padding-top: 1rem;
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

.sort {
	.v-btn {
	}
	.flex {
		flex-grow: 0;
	}
}
</style>
