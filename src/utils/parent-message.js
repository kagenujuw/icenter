;(function(aA){
	if(typeof exports === 'object') {
		module.exports = aA;
		return;
	}
	if(typeof define === 'function' && (define.amd || define.cmd)){
		define(function() {return aA;})
		return ;
	}
	window.aA=aA;
})(
	(function(){
		function test(str){
			return str+"---aaa----";
		}
		return {
			open(url){
				console.log('open')
			},
			locationUrl(){
				console.log('locationUrl');
			}
		}
	})()	
);