import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
	questions: null,
	currentQuestionIndex: null,
	selectNextQuestion: null,
	selectedAnswer: null,
	isChecked: false,

	/*
	*Gets the the question from the current index with its answers
	*/
	currentQuestion: computed('questions', 'currentQuestionIndex', function() {
		if (this.get('currentQuestionIndex') != null && this.get('questions'))
			return this.get('questions')[this.get('currentQuestionIndex')];
		return null;
	}),

	currentQuestionNum: computed('currentQuestionIndex', function () {
		let currQuestion = this.get('currentQuestionIndex');
		return parseInt(currQuestion + 1);
	}),

	actions: {
		selectNextQuestion() {
			this.get('selectNextQuestion')();
			this.set('isChecked', false);
		},

		submitAnswer() {
			this.get('answerQuestion')(this.get('currentQuestion'), this.get('selectedAnswer'));
			this.send('selectNextQuestion');
		},
	}
});