import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
	question: null,
	difficulty: null,
	selectedAnswer: null,
	isChecked: false,
	questionnaireLength: null,
	
	/*
		*Randomizes the answer locations
	*/
	answers: computed('question', function() {
		let newArr = this.get('question.incorrect_answers')
		.concat([this.get('question.correct_answer')]);

		let counter = newArr.length, temp, index;

		//console.log(this.get('question.correct_answer'))

		while (counter > 0 ){
			index = Math.floor(Math.random() * counter);
			counter--;
			temp = newArr[counter];
			newArr[counter] = newArr[index];
			newArr[index] = temp;
			}
		return newArr;
	}),

	actions: {
		selectAnswer(answer) {
			this.set('selectedAnswer', answer)
			this.set('isChecked', true);
		}
	}
});