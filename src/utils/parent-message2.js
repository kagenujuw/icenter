;(function(){
	function aA(){
		return {
				open(url){
					console.log('open')
				},
				locationUrl(){
					console.log('locationUrl');
				}
			}
	}

	var moduleName = aA;

	if(typeof module !== 'undefined' && typeof exports === 'object'){
		module.exports = moduleName;
	}else if(typeof define === 'function' && (define.amd || define.cmd)){
		define(function() {return moduleName;})
	}else{
		let root=this();
		root.aA=moduleName();
	}

}).call(function(){
	return this || (typeof window!=='undefined'?window:global);
})