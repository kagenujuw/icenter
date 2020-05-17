<template>
	<div>
		<transition name='fade'>
			<div :class="['model-bg']" v-if='mdShow'></div>
		</transition>
		<transition name='slide'>
			<slot v-if='mdShow' name='comLayer'></slot>
		</transition>
	</div>
</template>
<script>
export default {
	name: 'model',
	data(){
		return {

		}
	},
	props:['mdShow'],
	methods:{
		close(){
			this.$emit('close');
		}
	}
}
</script>
<style scoped lang='scss'>
.model-bg{
	position:fixed;
	left:0px;
	top:0px;
	width:100%;
	height:100%;
	background:rgba(0,0,0,0.4);
	z-index:10;
}	
.fade-enter-active,
.fade-leave-active{
	transition:all 0.4s ease;
}
.fade-enter,.fade-leave-active{
	opacity:0;
}
.slide-enter-active,
.slide-leave-active{
	transition:all 0.4s ease;
}
.slide-enter,.slide-leave-active{
	opacity:0;
	transform:translateY(-30px);
}
</style>