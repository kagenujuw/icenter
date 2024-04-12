import honComponent from './src/container.vue';
import schema from './schema.js';

const honplatInput = {
  honComponent,
  schema,
  type: schema().componentAlias
}
export default honplatInput