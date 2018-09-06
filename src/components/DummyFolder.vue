<template lang="pug">
v-container(fill-height)
	v-layout(row wrap align-center)
		v-container
			trend( :data="folder.data.history" :gradient="['#222']" auto-draw smooth ).trend
			.folder
				i.icon-folder-o
				span {{folder.data.text}}
			br
			v-layout(row wrap)
				v-flex
					.new Всего
						span {{folder.data.items}}
				v-flex
					.new Новых
						span {{folder.data.unread}}
				v-flex
					.new Просрочено
						span {{folder.data.unread}}
				v-flex
					.new Важных
						span {{folder.data.unread}}
</template>

<script>
export default {
	props: ['folder']
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

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
