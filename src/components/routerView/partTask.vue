<template>
	<div class="partTask">
		<mTab :title='msg'/>
		<mPage :title='msg'/>
	</div>
</template>
<script>
import mTab from '@/components/dataBlock/mTab'
import mPage from '@/components/dataBlock/mPage'
export default {
	name:'partTask',
	data(){
		return {
			msg: '这是我参与任务',
			msgType: 'partTask'
		}
	},
	components:{
		mTab,
		mPage
	}
}
</script>
<style scoped>
.partTask{
	width: 100%;
	height:100%;
}	
</style>