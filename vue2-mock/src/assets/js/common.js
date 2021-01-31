const method={
	install:(Vue) => {
		//设置项目的名称
		Vue.prototype.$projectName = 'pc-mockjs';

		Vue.prototype.checkVersion = ()=>{
			//浏览器版本的检测
			var userAgent = navigator.userAgent;
			var isOpera = userAgent.indexOf("Opera") > -1;
		 	if (isOpera) {
		        return "Opera"
		    }else if(userAgent.indexOf("Firefox") > -1) {
		        return "FF";
		    }else if (userAgent.indexOf("Chrome") > -1){
		  		return "Chrome";
		 	}else if (userAgent.indexOf("Safari") > -1) {
		        return "Safari";
		    }else if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
		        return "IE";
		    }
		}
		/**==继续添加开发中用到的方法==**/
	}
}