<template>
	<div class="completeTask">
		<mTab :title='msg'/>
		<mPage :title='msg'/>
	</div>
</template>
<script>
import mTab from '@/components/dataBlock/mTab'
import mPage from '@/components/dataBlock/mPage'
export default {
	name:'completeTask',
	data(){
		return {
			msg: '这是我完成任务',
			msgType: 'completed'
		}
	},
	components:{
		mTab,
		mPage
	}
}
</script>
<style scoped>
.completeTask{
	width: 100%;
	height:100%;
}	
</style>