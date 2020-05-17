<template>
	<div class="ownTask">
		<mTab :title='msg'/>
		<mPage :title='msg'/>
	</div>
</template>
<script>
import mTab from '@/components/dataBlock/mTab'
import mPage from '@/components/dataBlock/mPage'
export default {
	name:'ownTask',
	data(){
		return {
			msg: '这是我负责的任务',
			msgType: 'ownTasks'
		}
	},
	components:{
		mTab,
		mPage
	}
}
</script>
<style scoped>
.ownTask{
	width: 100%;
	height:100%;
}	
</style>