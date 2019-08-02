import DS from 'ember-data';

export default DS.Model.extend({
	category: DS.attr("string"),
	difficulty: DS.attr("string"),
	question: DS.attr("string"),
	correct_answer: DS.attr("string"),
	incorrect_answers: DS.attr(["string"]),
});
