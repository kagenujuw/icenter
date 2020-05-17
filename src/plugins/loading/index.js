import LoadingComponent from './src/main.vue'
import Vue from 'vue'

let instance;

const LoadingConstructor=Vue.extend(LoadingComponent);
instance=new LoadingConstructor({
	el:document.createElement('div')
})

instance.show=true;
const loading={
	show(options = {}){
		instance.show=true;
		if(options){
			options.el.appendChild(instance.$el);
			instance.text=options.text;
		}
	},
	hide() {
		instance.show=false;
	}
}

export default loading