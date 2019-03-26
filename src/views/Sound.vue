<template lang="pug">
v-slide-x-transition(mode="out-in")
	v-container
		.folder
			i.icon-loud
			span Sound
		<!-- h1 Sound -->
		br
		br
		v-textarea(id="message" v-model="msg" auto-grow box color="deep-purple" label="Бдыщ" rows="1" )
		v-btn( id="speak" color="info" @click='gav') Озвучить
		br
		br
		br
		br
		.folder
			i.icon-microphone
			span Голосовые команды
		br
		v-btn( id="recognize" color="info" @click='rec') Начать запись
		br
		input(id="interim" placeholder="Прогресс распознавания")
		br
		v-textarea(id="message1" placeholder="Окончательный результат")
</template>

<script>

export default {
	data () {
		return {
			msg: 'Привет! На сегодня у вас 3 новых задания. Одно из них - срочно.'
		}
	},
	methods: {
		speak (text) {
			const message = new SpeechSynthesisUtterance()
			message.lang = 'ru-RU'
			message.text = text
			window.speechSynthesis.speak(message)
		},
		gav () {
			this.speak(this.msg)
		}
		// isMobile () {
		// 	return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
		// }
	}
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

</style>
