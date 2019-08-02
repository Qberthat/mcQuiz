import Service from '@ember/service';
import { inject } from '@ember/service';


export default Service.extend({
	store: inject(),


	answer(question, answer, user) {
		const userAnswer = this.store.createRecord('answer', {
			content: answer,
			question: question,
		})
		user.get('answers').pushObject(userAnswer);
	},

	getAnswers() {
		return this.store.peekAll('answer');
	},
});
