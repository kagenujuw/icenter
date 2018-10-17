<template>
	<div class="header">
		<div class="logo">ICENTER</div>
		<div class="logoUser">{{logout}}</div>
	</div>
</template>
<script>
export default {
	name:'mhead',
	data(){
		return {
			logout: '退出'
		}
	}
}
</script>
<style scoped lang="scss">
.header{
	height:50px;
	line-height: 50px;
	padding: 0px 20px;
	box-sizing: border-box;
	background: #0c58ff;
	color:#fff;
}
.logo{
	float: left;
	min-width: 100px;
	height: 50px;
	line-height: 50px;
	font-size: 30px;
	font-family: inherit;
}
.logoUser{
	float: right;
	min-width: 40px;
	height:30px;
	padding: 0px 10px;
	border-radius:4px;
	line-height: 30px;
	text-align: center;
	margin-top:10px;
	cursor: pointer;
	letter-spacing: 3px;
	background: rgba(255,255,255,.1);
	&:hover{
		background: rgba(255,255,255,.4);
	}
}
</style>