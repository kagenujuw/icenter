<template>
	<div class='task_up'>
		<div class="tabHead">
			<div class="tabwrap" id="tabwrap" :style="{width:calc()}">
				<div :class="['hName',item.enName=='num'?'h-center':'']" v-for="(item,index) in headName" :style="{width:`${item.width}px`}">{{item.name!='num'?item.name:''}}</div>
			</div>
		</div>
		<div class="tabBody" id="tabBody" v-loading='loading'>
			<div class="bodywrap" :style="{width:calc()}" v-if="allTask&&allTask.length>0">
				<div class="row" v-for="(data,index) in allTask">
					<div :class="['grow-cell',item.enName=='num'?'h-center':'']" v-for='(item,sIndex) in headName' :style="{width:`${item.width}px`}">
						<div v-if="item.enName=='num'">{{index+1}}</div>
						<div v-if="item.enName=='taskName'" class='titleName'>{{data.name}}</div>
						<div v-if="item.enName=='manager'">{{process(data.manager)}}</div>
						<div v-if="item.enName=='member'">{{process(data.member)}}</div>
						<div v-if="item.enName=='startTime'">{{data.startTime | formatTimeYMD}}</div>
						<div v-if="item.enName=='endTime'">{{data.endTime | formatTimeYMD}}</div>
						<div v-if="item.enName=='descript'">{{data.descript}}</div>
						<div v-if="item.enName=='progress'">{{data.createTime | formatAllTime}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name:'mTab',
	data(){
		return {
			headName:[
				{name:'序号',width:60,drag:false,enName:'num'},
				{name:'任务名称',width:600,drag:false,enName:'taskName'},
				{name:'负责人',width:120,drag:false,enName:'manager'},
				{name:'参与人',width:120,drag:false,enName:'member'},
				{name:'开始时间',width:200,drag:false,enName:'startTime'},
				{name:'结束时间',width:200,drag:false,enName:'endTime'},
				{name:'描述',width:200,drag:false,enName:'descript'},
				{name:'进展更新时间',width:200,drag:false,enName:'progress'},
			]
		}
	},
	props:['title','allTask','loading'],
	mounted(){
		this.scrollLeft();
	},
	methods:{
		calc(){
			let w=0;
			this.headName.forEach((item)=>{
				w+=item.width;
			})
			return w+"px"; 
		},
		process(arr){
			let strArr=[];
			strArr=arr.map((item)=>{ return item.name })
			return strArr.toString();
		},
		scrollLeft(){
			var tabBody = document.querySelector('#tabBody');
			var tabwrap = document.querySelector('#tabwrap');
			tabBody.addEventListener("scroll",()=>{
				let left=tabBody.scrollLeft;
				if(left>0){
					tabwrap.style.marginLeft='-'+left+'px';
				}else{
					tabwrap.style.marginLeft='0px';
				}
			},false)
		}
	}
}	
</script>

<style scoped>
.task_up{
	width: 100%;
	height:calc(100% - 60px);
	font-size:14px;
}
.tabHead{
	width:100%;
	height:40px;
	border-top:#eee solid 1px;
	overflow:hidden;
	background:#ececec;
}
.tabwrap{
	width:100%;
	height:40px;
}
.hName{
	float:left;
	height:40px;
	line-height:40px;
	padding:0px 5px;
	box-sizing:border-box;
	text-align:left;
}
.h-center{
	text-align:center;
}
.hName:hover{
	background:#e0e0e0;
}
.tabBody{
	width:100%;
	height:calc(100% - 40px);
	overflow:auto;
}
.row{
	float:left;
	width:100%;
	height:40px;
	overflow:hidden;
	border-bottom:#d6d6d6 solid 1px;
}
.row:hover{
	background:#dbe6fd;
}
.row:hover .titleName{
	color:#409EFF;
	cursor:pointer;
	display:inline;
}
.grow-cell{
	float:left;
	height:40px;
	line-height:40px;
	padding:0px 5px;
	box-sizing:border-box;
	overflow:hidden;
	white-space:no-wrap;
	text-overflow:ellipsis;
	color:#313b40;
}
</style>