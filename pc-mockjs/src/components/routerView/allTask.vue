<template>
	<div class="allTask">
		<mTab :title='msg' :allTask='allTask'/>
		<mPage :title='msg'/>
	</div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
import mTab from '@/components/dataBlock/mTab'
import mPage from '@/components/dataBlock/mPage'
import api from '@/fetch/api'
import { Bus } from '@/assets/js/bus'
export default {
	name:'allTask',
	data(){
		return {
			msg: '这是全部任务',
			msgType: 'all',
			allTask:[]
		}
	},
	components:{
		mTab,
		mPage
	},
	created(){
		//获取列表的数据
		this.getData();
	},
	mounted(){
		this.eventBus();
	},
	methods:{
		eventBus(){
			//事件总线
			Bus.$on('vue-allTask',(param)=>{
				this.allTask.unshift(param);
			})
		},
		async getData(){
			 let data={pageNo:1,pageSize:100};
			 let getTask=await api.getAllTask(data);
				console.log(getTask)
			 this.allTask=getTask;
			 this.$store.dispatch('saveAllTask',this.allTask);
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