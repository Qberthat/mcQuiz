import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | question adapter', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let adapter = this.owner.lookup('adapter:question-adapter');
    assert.ok(adapter);
  });
});
