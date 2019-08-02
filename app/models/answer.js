import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
	question: DS.belongsTo('question'),
	content: DS.attr('string'),
});

