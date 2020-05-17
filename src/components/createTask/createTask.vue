<template>
	<div :nameShow='nameShow'>
		 <!-- 新建任务的弹框：start -->
		 <el-dialog
		   title="新建任务"
		   :visible.sync="modelShow"
		   width="600px"
		   @close="closeTask('no')"
		   >
		   <div class="taskMain">
		   		<div class="mRow">
		   			<el-input type="textarea" autosize placeholder="任务名称" v-model="taskName"></el-input></div>
		   		<div class="mRow">
		   			<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="任务描述" v-model="taskDesc"></el-input></div>	
		 			<div class="mRow mMan">
		 					<div class="mleft">负责人：</div>
		 					<div class="mRight">
		 							<el-select
		 							    v-model="value9"
		 							    multiple
		 							    filterable
		 							    remote
		 							    reserve-keyword
		 							    placeholder="请输入姓名查询人员"
		 							    :remote-method="remoteMethod"
		 							    :loading="loading">
		 							    <el-option
		 							      v-for="item in options4"
		 							      :key="item.value"
		 							      :label="item.label"
		 							      :value="item.value">
		 							    </el-option>
		 							  </el-select>
		 					</div>
		 			</div>
		 			<div class="mRow mMan">
		 					<div class="mleft">参与人：</div>
		 					<div class="mRight">
		 							<el-select
		 							    v-model="value9"
		 							    multiple
		 							    filterable
		 							    remote
		 							    reserve-keyword
		 							    placeholder="请输入姓名查询人员"
		 							    :remote-method="remoteMethod"
		 							    :loading="loading">
		 							    <el-option
		 							      v-for="item in options4"
		 							      :key="item.value"
		 							      :label="item.label"
		 							      :value="item.value">
		 							    </el-option>
		 							  </el-select>
		 					</div>
		 			</div>

		 			<div class="mRow mMan">
		 					<div class="mleft">时间：</div>
		 					<div class="mRight">
		 							<div class="block">
		 							    <el-date-picker
		 							      v-model="value6"
		 							      type="daterange"
		 							      range-separator="至"
		 							      start-placeholder="开始日期"
		 							      end-placeholder="结束日期">
		 							    </el-date-picker>
		 							  </div>
		 					</div>
		 			</div>

		   </div>

		   <span slot="footer" class="dialog-footer">
		     <el-button @click="closeTask('no')">取 消</el-button>
		     <el-button type="primary" @click="closeTask('yes')">确 定</el-button>
		   </span>
		 </el-dialog>
		 <!-- 新建任务的弹框：end -->
	</div>
</template>
<script>
import api from '@/fetch/api'
import { Bus } from '@/assets/js/bus'
import { mapActions, mapGetters } from 'vuex'
import { Message } from 'element-ui'
export default {
	name:'createTask',
	data(){
		return {
			modelShow:false,
			taskName:'',
			taskDesc:'',
			options4: [],
      value9: [],
      list: [],
      loading: false,
      states: ["Alabama", "Alaska", "Arizona",
      "Arkansas", "California", "Colorado",
      "Connecticut", "Delaware", "Florida",
      "Georgia", "Hawaii", "Idaho", "Illinois",
      "Indiana", "Iowa", "Kansas", "Kentucky",
      "Louisiana", "Maine", "Maryland",
      "Massachusetts", "Michigan", "Minnesota",
      "Mississippi", "Missouri", "Montana",
      "Nebraska", "Nevada", "New Hampshire",
      "New Jersey", "New Mexico", "New York",
      "North Carolina", "North Dakota", "Ohio",
      "Oklahoma", "Oregon", "Pennsylvania",
      "Rhode Island", "South Carolina",
      "South Dakota", "Tennessee", "Texas",
      "Utah", "Vermont", "Virginia",
      "Washington", "West Virginia", "Wisconsin",
      "Wyoming"],
      value6:''
		}
	},
	props:['show'],
	computed:{
		nameShow:function(){
			this.modelShow=this.show
			return this.show;
		}
	},
	mounted(){
		this.list = this.states.map(item => {
		  return { value: item, label: item };
		});
	},
	methods:{
		remoteMethod(query) {
	    if (query !== '') {
	      this.loading = true;
	      setTimeout(() => {
	        this.loading = false;
	        this.options4 = this.list.filter(item => {
	          return item.label.toLowerCase()
	            .indexOf(query.toLowerCase()) > -1;
	        });
	      }, 200);
	    } else {
	      this.options4 = [];
	    }
	  },
	  async closeTask(type){
	  		if(type == 'no'){
	  			this.$emit('closeTask',{isShow:false})
	  		}else{
	  			//引入mockjs
	  			var Mock = require('mockjs')
	  			let data={
	  						taskId:Mock.mock(/\d{5}/),
	  						name:Mock.mock('@cparagraph(1)'),
	  						startTime:new Date().getTime(),
	  						endTime:new Date().getTime(),
	  						createTime:new Date().getTime(),
	  						descript:Mock.mock('@csentence'),
	  						manager:[{
	  							no:Mock.mock(/\d{10}/),
	  							name:Mock.mock('@cname'),
	  							name_en:'wujun',
	  							imgUrl:''
	  						}],
	  						member:[{
	  							no:Mock.mock(/\d{10}/),
	  							name:Mock.mock('@cname'),
	  							name_en:'wukaijun',
	  							imgUrl:''
	  						}],
	  						status:20,
	  						lightStatus:0,
	  					}
	  			let getTask=await api.taskAdd(data);
	  			// console.log(getTask)	
	  			
	  			/**
	  			 * 方法一
	  			 * 新建任务成功后才有事件总线传递值
	  			 */
	  			//Bus.$emit('vue-allTask',getTask);

	  			this.$emit('closeTask',{isShow:false})
	  			//方法二
	  			this.$store.commit('addTask',getTask);
	  			Message.success({message:'任务添加成功',duration:1000});
	  		}
	  },
	},
	beforeDestroy(){
		Bus.$off('vue-allTask');
	}
}	
</script>
<style scoped lang="scss">
.taskMain{
	width:100%;
	height:400px;
}
.mRow{
	margin-bottom:10px;
}
.mMan{
	position:relative;
	padding-left:100px;
	box-sizing:border-box;
}
.mleft{
	position:absolute;
	width:100px;
	height:30px;
	line-height:30px;
	left:0px;
	top:0px;
}
</style>				