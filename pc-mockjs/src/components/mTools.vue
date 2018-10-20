<template>
	<div class="toolBtn">
		<ul class="tb">
			<li @click="show = true" class="fgbtn">
				<el-tooltip class="item" effect="dark" content="采用mockjs发方法生成数据" placement="bottom">
      		<el-button><i class="el-icon-plus"></i> 新建</el-button>
    		</el-tooltip>
  		</li>
		</ul>
		<moreBtn/>
		<createTask :show='show' @closeTask='closeTask'/>

	</div>
</template>
<script>
import createTask from '@/components/createTask/createTask'
import moreBtn from '@/components/moreBtn'
export default {
	name: 'mTools',
	data(){
		return {
			show: false,
		}
	},
	components:{
		createTask,
		moreBtn
	},
	methods: {
		closeTask(data){
			this.show=data.isShow;
		}
	},
}	
</script>
<style scoped lang="scss">
.toolBtn{
	width: 100%;
	height:40px;
	padding: 0px 20px;
	box-sizing: border-box;
}
ul.tb{
	float: left;
	display: inline-block;
}
ul.tb>li:nth-child(1){
	float:left;
}
ul.tb>li:nth-child(2){
	float: left;
	min-width: 55px;
	height: 26px;
	line-height: 26px;
	border:#409EFF solid 1px;
	border-radius:4px;
	text-align: center;
	color:#409EFF;
	margin-top: 6px;
	margin-right:10px;
	cursor: pointer;
	transition: all .3s ease-in;
	&:hover{
		background:#409EFF;
		color:#fff;
	}
}	
</style>