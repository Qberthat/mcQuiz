import Component from '@ember/component';

export default Component.extend({
	answers: null,
	showAnswers: false,

	actions: {
		showAnswered() {
			this.get('getAnswered');
			this.set('showAnswers', true)
		}, 
	}
});

