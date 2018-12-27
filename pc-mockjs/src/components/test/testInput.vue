<template>
	<div>
		<input type="text" v-model="msg">
	</div>
</template>
<script>
export default {
	name:'test',
	data(){
		return {
			msg:'测试组件'
		}
	},
	mounted(){
		console.log('--test mounted--')
	}
}
</script>