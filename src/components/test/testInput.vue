<template>
	<div class='test' v-load='loading'>
		<input type="text" v-model="msg" v-focus>
		<p>测试loading指令的加载效果</p>
	</div>
</template>
<script>
export default {
	name:'test',
	data(){
		return {
			msg:'测试组件',
			loading:false
		}
	},
	created(){
		this.loading=true;
	},
	mounted(){
		console.log('--test mounted--')
		setTimeout(()=>{
			this.loading=false;
		},2000)
	}
}
</script>
<style scoped lang="scss">
.test{
	width:100%;
	height:100%;
}
</style>