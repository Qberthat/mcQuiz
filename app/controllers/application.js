import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { on } from '@ember/object/evented';

export default Controller.extend({
	userManager: inject(),
	
	createUser: on('init', function() {
		this.userManager.create();
	})
});
