import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { on } from '@ember/object/evented';
import { computed } from '@ember/object';
import { run, later } from '@ember/runloop';

export default Controller.extend({
	store: inject(),
	quizManager: inject(),
	userManager: inject(),
	answerManager: inject(),
	
	user: null,
	questions: null,
	currentQuestionIndex: 0,
	quizScore: 0,
	quotMark: "'",
	questionnaireLength: 15,
	responseMessage:'',
	seconds: 0,
	start: null,
	interval: null,

	loadQuestions: on('init', function () {
		const controller = this;
		return this.quizManager.getAllQuizes(this.get('questionnaireLength'))
			.then((questions) => {
				questions.results.forEach((question) => {
					controller.store.createRecord('question', question)
				});
				controller.set('questions', controller.store.peekAll('question').toArray());
			});	
	}),

	loadUser: on('init', function () {
		this.set('user', this.userManager.getUser());
	}),

	answers: computed('questionIndexGreaterThan', function () {
		if(this.get('questionIndexGreaterThan') > this.get('questionnaireLength')){
			return  this.answerManager.getAnswers();
		} 
		return [];
	}),

	questionIndexGreaterThan: computed("currentQuestionIndex", function(){
		let nextIndex = this.get('currentQuestionIndex');
		return (nextIndex + 1);
	}),

	questionnaireScore: computed('questionnaireLength', function(){
		let totalScore = this.get('questionnaireLength');
		return parseInt(totalScore * 2);
	}),

	timer: computed('seconds', function(){
		const that = this;
		let seconds = this.get('seconds')
		if (that.interval === null) {
			that.set('start', Date.now());
			that.interval = setInterval(function() {
				const start = that.get('start');
				that.set('seconds', Date.now() - start);
			}, 1000);
		}
		return parseInt(seconds / 1000);
	}),

		/**
			*selectNextQuestion() =
				*increments the 'currentQuestionIndex' and gets the question of the new index

			*answerQuestion() = 
				*checks if the answer is equal to the correct answer of the question
				*increases score by 2, congratulates if answer correct.
				*else outputs answer is wrong statement, shows correct answer.
				*score remains
		 */

	actions: {

		selectNextQuestion() {
			this.set('currentQuestionIndex', this.get('currentQuestionIndex') + 1);
			this.get('timer');
		},

		answerQuestion(question, answer) {
			this.answerManager.answer(question, answer, this.get('user'));
			if (answer == question.correct_answer){
				this.set('responseMessage', "Congratulations, your answer was correct!");
				return this.set('quizScore', this.get('quizScore') + 2 );
			} else {
				this.set('responseMessage', "Your answer was wrong. :( The right answer was"
					+ " " + this.quotMark + question.correct_answer + this.quotMark);
				return this.get('quizScore');
			}
		},

		getAnswered() {
			this.set('answers', this.answerManager.getAnswers());
		},
	}
});
