import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
	userManager: inject(),
	
	actions: {
		startQuiz() {
			this.userManager.create();
			this.transitionToRoute('quiz');
		}
	}
});



