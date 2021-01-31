<template>
	<div class="moreBtn">
		  <div class="more">更 多</div>
		  <div class="downList">
		  	<dl>
		  		<dd>列选项</dd>
		  		<dd>筛选</dd>
		  		<dd>批量导入</dd>
		  		<dd>批量导出</dd>
		  	</dl>
		  </div>
	</div>
</template>
<script>
export default {
	name:'moreBtn',
	data(){
		return {
			msg:'是大V是大V师德师风'
		}
	},
	mounted(){

	}
}
</script>
<style scoped>
.moreBtn{
	float:left;
	margin-top:6px;
	position:relative;
	transition:all 0.3s ease-in;
}
.more{
	width:50px;
	height:26px;
	line-height:26px;
	padding:0px 10px;
	border:#bbb solid 1px;
	border-radius:3px;
	color:#525252;
	cursor:pointer;
	position:relative
}
.more:before{
	content:'';
	position:absolute;
	width:0px;
	height:0px;
	right:15px;
	top:5px;
	border-width: 5px;
	border-style: solid;
	border-color: transparent transparent #525252 transparent;
	z-index:10;
}
.downList{
	position:absolute;
	left:0px;
	top:28px;
	width:120px;
	display:none;
}
.downList:before{
	content:'';
	position:absolute;
	width:0px;
	height:0px;
	left:30px;
	top:-6px;
	border-width: 8px;
	border-style: solid;
	border-color: transparent transparent #d4d4d4 transparent;
	z-index:10;
}
.downList dl{
	margin-top:10px;
	width:100%;
	border:#d4d4d4 solid 1px;
	border-radius:5px;
	overflow:hidden;
	padding:10px 0px;
	background:#fff;
	position:relative;
	box-sizing:border-box;
	box-shadow:0px 3px 6px 1px rgba(0,0,0,.2);
}
.downList dl dd{
	height:30px;
	line-height:30px;
	padding-left:20px;
	box-sizing:border-box;
	cursor:pointer;
	color:#313b40;
	transition:all 0.3s ease-in;
}
.downList dl dd:hover{
	background:#d4d4d4;
	color:#000;
}
.moreBtn:hover .downList{
	display:block;
}
.moreBtn:hover .more:before{
	content:'';
	position:absolute;
	width:0px;
	height:0px;
	right:15px;
	top:10px;
	border-width: 5px;
	border-style: solid;
	border-color: #525252 transparent transparent transparent;
	z-index:10;
}
</style>