import Controller from '@ember/controller';

export default Controller.extend({
	actions: {
		startQuiz() {
			this.transitionToRoute('quiz');
		}
	}
});



