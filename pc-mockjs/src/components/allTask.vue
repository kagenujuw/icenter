<template>
	<div class="allTask">
		<mTab :title='msg'/>
		<mPage :title='msg'/>
	</div>
</template>
<script>
import mTab from '@/components/dataBlock/mTab'
import mPage from '@/components/dataBlock/mPage'
import comAjax from '@/fetch/comAjax'
import api from '@/fetch/api'
export default {
	name:'allTask',
	data(){
		return {
			msg: '这是全部任务',
			msgType: 'all'
		}
	},
	components:{
		mTab,
		mPage
	},
	created(){
		let data={
			name:'这是新建任务',
			startTime:'',
			endTime:'',
			createTime:'',
			descript:'这里是描述',
			manager:[],
			memeber:[],
			status:20,
			lightStatus:0
		}
		this.getData(data)
		
		// let getTask=await api.getAllTask(data)
		// console.log(getTask)
	},
	methods:{
		async getData(data){
			 let getTask=await api.getAllTask(data)
				console.log(getTask)
		}
	}
}
</script>
<style scoped>
.allTask{
	width: 100%;
	height:100%;
}
</style>