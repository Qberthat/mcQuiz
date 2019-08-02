import Service from '@ember/service';
import { inject } from '@ember/service';

export default Service.extend({
	store: inject(),
	ajax: inject(),

	getAllQuizes(questionnaireLength = 50) {
		return this.ajax.request(`https://opentdb.com/api.php?amount=${questionnaireLength}&type=multiple`);
	},
})
