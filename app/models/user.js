import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
	answers: DS.hasMany('answer'),
});
