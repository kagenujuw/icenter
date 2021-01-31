export const formatAllTime=(timestamp)=>{
	if(timestamp){
		var date = new Date(timestamp);
		let yy = date.getFullYear() + '-';
        let mm = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let dd= date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return yy+mm+dd+h+m+s;
	}else{
		return ''
	}
}

export const formatTimeYMD=(timestamp)=>{
	if(timestamp){
		var date = new Date(timestamp);
		let yy = date.getFullYear() + '-';
        let mm = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let dd= date.getDate() + ' ';
        return yy+mm+dd;
	}else{
		return ''
	}
}
