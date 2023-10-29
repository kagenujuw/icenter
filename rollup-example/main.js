import { isArray } from "./libs/array";
import index from './src/test.vue';


//
console.log(isArray(3));
console.log(isArray("1,2,3,4"));
console.log(isArray([1, 2, 3, 4]));

const test = {
  manifest: index
}

export default test