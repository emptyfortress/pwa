<template lang="pug">
.mycontainer
	tree(ref="tree" :data="cards" :options="treeOptions" )

</template>

<script>
export default {
	data () {
		return {
			treeOptions: {
				checkbox: true
			},
			cards: [
				{
					text: 'Base objects',
					state: { selected: false, checked: true, expanded: true },
					children: [
						{
							text: 'Server card',
							state: { selected: false, checked: true, expanded: false },
							children: [
								{
									text: 'Server card',
									state: { selected: false, checked: true, expanded: false }
								}
							]
						},
						{
							text: 'Task',
							state: { selected: false, checked: true, expanded: true },
							children: [
								{
									text: 'Task',
									state: { selected: false, checked: true, expanded: true },
									children: [
										{
											text: 'Задание УД',
											state: { selected: false, checked: true, expanded: false },
											children: [ { text: 'lkaj' } ]
										},
										{
											text: 'Задание КС',
											state: { selected: false, checked: false, expanded: true },
											children: [
												{
													text: 'На подписание',
													state: { selected: false, checked: false, expanded: false }
												},
												{
													text: 'На консолидацию',
													state: { selected: false, checked: false, expanded: false }
												},
												{
													text: 'На согласование',
													state: { selected: true, checked: false, expanded: false }
												}
											]
										},
										{
											text: 'По резолюции',
											state: { selected: false, checked: true, expanded: false },
											children: [
												{
													text: 'На подписание',
													state: { selected: false, checked: false, expanded: false }
												},
												{
													text: 'На консолидацию',
													state: { selected: false, checked: false, expanded: false }
												},
												{
													text: 'На согласование',
													state: { selected: false, checked: false, expanded: false }
												}
											]
										}
									]
								}
							]
						},
						{
							text: 'Parners department card',
							state: { selected: false, checked: false, expanded: false },
							children: [ {} ]
						},
						{
							text: 'Card of dictionary row',
							state: { selected: false, checked: true, expanded: false },
							children: [ {} ]
						}
					]
				}
			]
		}
	}
}
</script>

<style scoped>
.mycontainer {
	background: #fff;
	height: 100%;
	position: relative;
	padding: 3rem;
}
p {
	font-size: 1.5rem;
	font-family: Arial;
	color: #02457E;
	margin-top: 1rem;
}

.bottom {
	position: absolute;
	bottom: 2rem;
	left: 3rem;
}
.inf {
	margin-bottom: 4rem;
}
.copy { font-size: .9rem; }
span { margin-left: 2rem; }

</style>
