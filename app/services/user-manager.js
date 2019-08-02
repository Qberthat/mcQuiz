import Service from '@ember/service';
import { inject } from '@ember/service';

export default Service.extend({
	store: inject(),

	create(){
		this.store.createRecord('user')
	},

	getUser() {
		const users = this.store.peekAll('user');
		return (users != null) ? users.firstObject : null;
	}
});
