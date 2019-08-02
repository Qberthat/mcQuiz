import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import { run } from '@ember/runloop';

export default Component.extend({
	router: inject(),
	quizManager: inject(),
	answerManager: inject(),
	
	questions: null,
	currentQuestionIndex: null,
	selectNextQuestion: null,
	selectedAnswer: null,
	isAnswered: false,
	isChecked: false,
	isTrue: false,

	/*
	*Gets the the question from the current index with its answers
	*/

	currentQuestion: computed('questions', 'currentQuestionIndex', function() {
		if (this.get('currentQuestionIndex') != null && this.get('questions')) {
			return this.get('questions')[this.get('currentQuestionIndex')];
		} else {
			return null;
		}
	}),
	
	currentQuestionNum: computed('currentQuestionIndex', function () {
		let currQuestion = this.get('currentQuestionIndex');
		return parseInt(currQuestion + 1);
	}),

	timer: run.later(function(){

	}),

	actions: {
		/*
			*selectNextQuestion() = 
				*gets the 'selectNextQuestion function from the controller
				*sets 'isAnswered' to false (reenables the submit button for the next question)
				*Doesn't work yet, but should uncheck the radio box

			*submitAnswer() =
				*gets the 'answerQuestion' function with the 'currentQuestion' and 'selectedAnswer' 
				*as arguments.
				*Sets 'isAnswered' to true, which disables the submit button.
		 */
		selectNextQuestion() {
			this.get('selectNextQuestion')();
			this.set('isAnswered', false);
			this.set('isChecked', false);
		},

		submitAnswer() {
			this.get('answerQuestion')(this.get('currentQuestion'), this.get('selectedAnswer'));
			this.send('selectNextQuestion');
		},
	}
});