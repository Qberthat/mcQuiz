import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';


export function encodeString(questions/*, hash*/) {

  return htmlSafe(`<strong>${questions}</strong>`);
}

export default helper(encodeString);
