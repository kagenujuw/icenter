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

		<el-button size='small' type="primary" @click="alert">测试alert</el-button>
		<el-button size='small' type="primary" @click="confirm">测试confirm</el-button>
		<el-button size='small' type="primary" @click="dialog">测试dialog</el-button>

		<createTask :show='show' @closeTask='closeTask'/>

		<!-- 测试 -->
		<Dialog title="测试表头" :visible='flag' width='600' height='350' @before-close='beforeClose'>
			<testInput/>
			<div class="footer-btn" slot="footer">
				<div class='btn cancel' @click='cancel'>取消</div>
				<div class='btn success' @click='success'>确定</div>
			</div>
		</Dialog>


	</div>
</template>
<script>
import createTask from '@/components/createTask/createTask'
import moreBtn from '@/components/moreBtn'
import testInput from '@/components/test/testInput.vue' 
export default {
	name: 'mTools',
	data(){
		return {
			show: false,
			flag:false,
		}
	},
	components:{
		createTask,
		moreBtn,
		testInput
	},
	methods: {
		closeTask(data){
			this.show=data.isShow;
		},
		beforeClose(str){
			console.log(str)
			this.flag=false;
		},
		cancel(){
			this.$_alert({
				title:'提示',
				content:'您确定要取消吗？'
			}).then(res=>{
				this.flag=false;
			})
		},
		success(){
			this.$_confirm({
          title:'提示',
          content:'您点击了确定按钮',
          submitText:'确定',
          cancelText:'取消'
      }).then(()=>{
          this.flag=false;
      }).catch((err)=>{
          console.log(err)
      })
		},
		dialog(){
			this.flag=true;
		},
		alert(){
			this.$_alert({
				title:'这是标题',
				content:'测试alert弹窗'
			}).then(res=>{
				console.log('测试alert弹窗的回调')
			})
		},
		confirm(){
			this.$_confirm({
          title:'提示',
          content:'这里是提示内容',
          submitText:'提交',
          cancelText:'返回'
      }).then(()=>{
          this.$_alert({
              title:'提示2',
              content:'这里是提示内容2'
          }).then(()=>{
              this.name='守候'
              alert(this.name)
          })
      }).catch((err)=>{
          alert(err)
      })
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
.footer-btn{
	float:right;
	.btn{
		float:left;
		width:70px;
		height:30px;
		line-height:30px;
		text-align:center;
		cursor:pointer;
		border:#e6e6e6 solif 1px;
		border-radius:2px;
		margin-left:10px;
		color:#333;
		opacity:0.8;
		&:hover{
			opacity:1;
		}
	}
	.success{
			background:#409EFF;
			border-color:#409EFF;
			color:#fff;
		}
}
</style>