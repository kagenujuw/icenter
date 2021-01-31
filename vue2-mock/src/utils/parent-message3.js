(function(root, factory) {
	if(typeof define === 'function' && (define.amd || define.cmd)){
		// AMD
		define([],factory);

	}else if(typeof exports === 'object'){
		module.exports = factory();
	}else{
		root=this || (typeof window !== 'undefined' ? window : global);
		root.returnExports = factory();
	}
})(this,function() {
	function a(){ console.log('aaa')}; //私有方法，因为下面没有被返回
	function b(){ console.log('bbb')}; // 公共方法，因为被返回了
	function c(){ console.log('ccc')};

	return {
		b:b,
		c:c
	}
})