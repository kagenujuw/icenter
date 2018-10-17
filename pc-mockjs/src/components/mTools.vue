<template>
	<div class="toolBtn">
		<ul>
			<li>新建</li>
			<li>删除</li>
		</ul>
	</div>
</template>
<script>
export default {
	name: 'mTools',
	data(){
		return {

		}
	}
}	
</script>
<style scoped lang="scss">
.toolBtn{
	width: 100%;
	height:40px;
	background: #e2e2e2;
	padding: 0px 20px;
	box-sizing: border-box;
}
ul{
	float: left;
	display: inline-block;
}
ul>li{
	float: left;
	min-width: 55px;
	height: 26px;
	line-height: 26px;
	border:#0c58ff solid 1px;
	border-radius:4px;
	text-align: center;
	color:#0c58ff;
	margin-top: 6px;
	margin-right:10px;
	cursor: pointer;
	transition: all .3s ease-in;
	&:hover{
		background:#0c58ff;
		color:#fff;
	}
}	
</style>