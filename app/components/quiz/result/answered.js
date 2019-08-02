import Component from '@ember/component';
import { inject } from '@ember/service';


export default Component.extend({
	answerManager: inject(),
	currentQuestionIndex: null,
	questionnaireLength: null,
	quizScore: null,
	questions: null,
	answers: null,
	showAnswers: false,

	actions: {
		showAnswered() {
			this.get('getAnswered')(this.get('answers'));
			this.set('showAnswers', true)
		}, 
	}
});

