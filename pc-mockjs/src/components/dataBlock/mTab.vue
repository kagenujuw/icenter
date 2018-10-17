<template>
	<div class='task_up'>
		<div class="tabHead"></div>
		<div class="tabBody"></div>
	</div>
</template>
<script>
export default {
	name:'mTab',
	data(){
		return {
			headName:[
				{name:'任务名称',width:400,drag:false,enName:'taskName'},
				{name:'负责人',width:120,drag:false,enName:'manager'},
				{name:'参与人',width:120,drag:false,enName:'member'},
				{name:'开始时间',width:200,drag:false,enName:'startTime'},
				{name:'结束时间',width:200,drag:false,enName:'endTime'},
			]
		}
	},
	props:['title']
}	
</script>
<style scoped>
.task_up{
	width: 100%;
	height:calc(100% - 60px);
}	
</style>