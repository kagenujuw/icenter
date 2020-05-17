import Vue from 'vue'

const focus = Vue.directive('focus', {
	inserted: function(el, binding, vnode) {
		//当绑定的元素插入到dom中
		el.focus();
	},
	bind(){
		console.log('bind');
	},
	update(){
		console.log('update');
	},
	componentUpdated(){
		// 所在组件的VNode及其孩子的VNode全部更新时调用
		console.log('componentUpdated')
	},
	unbind(){
		// 只调用一次，指令与元素解绑时调用
		console.log('unbind');
	}
})

const load = Vue.directive('load',{
	inserted:function(el, binding, vnode){
		el.style.position='relative';
		if(binding.value){
			// 插入元素
			let styleObj="position:absolute;left:50%;top:50%;margin-left:-40px;margin-top:-30px;width:80px;height:60px;background:#d4d4d4;line-height:60px;text-align:center";
			let ms='<div style="">loading...</div>';
			let div = document.createElement('div');
			div.innerHTML=ms;
			div.style=styleObj;
			div.className='loading-mask';
			el.appendChild(div);
		}
	},
	componentUpdated(el, binding,vnode){
		let mask=document.querySelector(".loading-mask");
		el.removeChild(mask);
	}

})

export {
	focus,
	load
}