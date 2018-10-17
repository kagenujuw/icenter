<template>
	<div class='task_down'>
		<div class="block">
		    <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="currentPage"
		      :page-sizes="[100, 200, 300, 400]"
		      :page-size="100"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="400">
		    </el-pagination>
	    </div>
	</div>
</template>
<script>
export default {
	name:'mPage',
	data(){
		return {
			msg: '这是全部任务的分页',
			currentPage: 4
		}
	},
	props:['title'],
	methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
}	
</script>
<style scoped lang="scss">
.task_down{
	height:60px;
	border-top: #e2e2e2 solid 1px;
	padding-right: 20px;
	padding-top: 10px;
	box-sizing: border-box;
	.block{
		float:right;
	}
}
</style>