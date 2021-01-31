const drag=()=>{
	let $header=$('#tabwrap');
	let $tabBody=$("#tabBody");
	let $hName=$header.find(".hName:gt(0):not(:last-child)");
		$hName.each(function(index,el){
			$(this).on('mousemove',(event)=>{
				let e=event||window.event;
				let width=$(this).outerWidth();
				if(e.offsetX>width-10){
					$(this).css('cursor','e-resize');
				}else{
					$(this).css('cursor','default');
				}
			})
		})

		$hName.each(function(){
			var diffX=0;
			var drag=false;
			var logThWidth=0;
			var logThNextWidth=0;
			var tabWidth=0;
			$(this)[0].onmousedown=function(event){
				var that=this,
					e=event||window.event,
					thIndex=$(this).index(),
					thWidth=$(this).outerWidth(),
					tabWidth=$header.outerWidth();

					if(e.offsetX>thWidth-10){
						drag=true;
						logThWidth=thWidth;
						logThNextWidth=$(this).next().outerWidth();
						diffX=e.clientX-thWidth;
						var div="<div class='line' style='width:1px;height:40px;background:#f60;position:absolute;right:0px;top:0px;'></div>";

						var trs=$tabBody.find('row');
						$header.find(".hName").eq(thIndex).append(div);
						trs.each(function(){
							$(this).find('.grow-cell').eq(thIndex).append(div);
						})

						var view_Height=document.querySelector('.tabBody').offsetHeight;
						var scrollHeight=document.querySelector('.tabBody').scrollHeight;
						if(view_Height<scrollHeight){
							var viewWidth=$(".tabBody").outerWidth()-8;
						}else{
							var viewWidth=$(".tabBody").outerWidth();
						}
					}

				document.onmousemove=function(event){
					if(drag){
						var e=event||window.event;
						var win=$(window).width();

						if(e.client>=win){
							var diffW=win-diffX;
						}else{
							var diffW=e.clientX-diffX;
						}
						var addjutWidth=0;
						var allWidth=0;
						var gridHeaderWidth=$header.outerWidth();

						$header.find(".hName").each(function(){
							allWidth+=$(this).outerWidth();
						})

						if(diffW<=logThWidth){
							addjutWidth=logThWidth-diffW;
							if(diffW<20){
								diffW=21
							}else{
								if(allWidth-1<=viewWidth){
									$header.css('width',viewWidth+'px');
									$(".bodywrap").css('width',viewWidth+'px');
								}else{
									$header.css('width',tabWidth-addjutWidth+'px');
									$(".bodywrap").css('width',tabWidth-addjutWidth+'px');
								}
								$(that).css("width",diffW+'px');
								$(".bodywrap").find(".row").each(function(){
									$(this).find(".grow-cell").eq(thIndex).css("width",diffW+'px');
								})
							}
						}else{
							addjutWidth=diffW-logThWidth;
							if(allWidth<viewWidth){
								$header.css('width',gridHeaderWidth+'px');
								$(".bodywrap").css('width',gridHeaderWidth+'px');
							}else{
								setTimeout(function(){
									$header.css('width',allWidth+2+'px');
									$(".bodywrap").css('width',allWidth+2+'px');
								},50)
							}
							$(that).css("width",diffW+'px');
							$(".bodywrap").find(".row").each(function(){
								$(this).find(".grow-cell").eq(thIndex).css("width",diffW+'px');
							})
						}
					}
					return false;
				}

				document.onmouseup=function(event){
					document.onmousemove=null;
					document.onmouseup=null;

					drag=false;
					logThWidth=0;
					logThNextWidth=0;

					$header.find(".hName").eq(thIndex).css('cursor','default');
					$header.find(".hName").eq(thIndex).find(".line").remove();
					$tabBody.find(".grow-cell").find(".line").remove();

					var newWidth=0;
					$header.find(".hName").each(function(){
						newWidth+=$(this).outerWidth();
					})
					if(viewWidth<=newWidth){
						$header.css('width',newWidth+'px');
						$(".bodywrap").css("width",newWidth+"px");
					}
					this.releaseCapture && this.releaseCapture();
				}
				this.setCapture && this.setCapture();
			}
		})
}

export default {
	drag:drag
}