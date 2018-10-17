<template>
	<div class="wrapIndex">
		<mHead/>
		<mBody/>
	</div>
</template>
<script>
import mHead from '@/components/mHead.vue'
import mBody from '@/components/mBody.vue'
export default {
	name:'mIndex',
	data(){
		return {

		}
	},
	components:{
		mHead,
		mBody
	}
}	
</script>
<style scoped lang="scss">
.wrapIndex{
	width: 100%;
	height:100%;
	position: relative;
}
</style>