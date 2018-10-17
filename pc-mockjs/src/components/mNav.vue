<template>
	<div class="mainLeft">
		<ul>
			<router-link tag="li" :to="{path:'/index/allTask'}">全部任务</router-link>
			<router-link tag="li" :to="{path:'/index/ownTask'}">我负责的</router-link>
			<router-link tag="li" :to="{path:'/index/partTask'}">我参与的</router-link>
			<router-link tag="li" :to="{path:'/index/completeTask'}">我完成的</router-link>
		</ul>
	</div>
</template>
<script>
export default {
	name:"mNav",
	data(){
		return {
			
		}
	}
}	
</script>
<style scoped lang="scss">
.mainLeft{
	float:left;
	width: 180px;
	height:100%;
	border-right:#eee solid 1px;
	background: #f7f7f7;
	box-sizing: border-box;
	ul{
		width:100%;
		display: block;
		li{
			width:100%;
			height:40px;
			line-height: 40px;
			text-indent: 2em;
			text-align: left;
			font-size: 14px;
			cursor: pointer;
			transition: all 0.4s ease-in;
			&:hover{
				background: #c1d1f5;
			}
		}
		li.active{
			background: #c1d1f5;
		}
	}
}	
</style>