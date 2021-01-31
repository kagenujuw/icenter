<template>
	<div class="wrapMain">
		<mNav/>
		<mBodyContent/>
	</div>
</template>
<script>
import mNav from '@/components/layout/mNav.vue'
import mBodyContent from '@/components/layout/mBodyContent'
export default {
	name:'mBody',
	data(){
		return {

		}
	},
	components:{
		mNav,
		mBodyContent
	}
}	
</script>
<style scoped lang="scss">
.wrapMain{
	height:calc(100% - 50px);
}
</style>