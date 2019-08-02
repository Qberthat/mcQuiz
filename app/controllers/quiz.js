import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { on } from '@ember/object/evented';
import { computed } from '@ember/object';

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
	seconds: 20,

	startTimer: on('init', function() {
		const controller = this;
		setInterval(function() {
			controller.set('seconds', controller.get('seconds') - 1);
			if (controller.get('seconds') === 0)  controller.send('selectNextQuestion');
		}, 1000);
	}),

	loadQuestions: on('init', function() {
		const controller = this;
		return this.quizManager.getAllQuizes(this.get('questionnaireLength'))
			.then((questions) => {
				questions.results.forEach((question) => {
					controller.store.createRecord('question', question);
				});
				controller.set('questions', controller.store.peekAll('question').toArray());
			});	
	}),

	loadUser: on('init', function () {
		this.set('user', this.userManager.getUser());
	}),

	answers: computed('questionIndexGreaterThan', function() {
		if(this.get('questionIndexGreaterThan') > this.get('questionnaireLength')) {
			return  this.answerManager.getAnswers();
		} 
		return [];
	}),

	questionIndexGreaterThan: computed("currentQuestionIndex", function() {
		let nextIndex = this.get('currentQuestionIndex');
		return (nextIndex + 1);
	}),

	questionnaireScore: computed('questionnaireLength', function() {
		let totalScore = this.get('questionnaireLength');
		return parseInt(totalScore * 2);
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
			this.set('seconds', 20);
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
