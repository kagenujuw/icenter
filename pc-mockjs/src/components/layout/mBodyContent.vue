<template>
	<div class="mainRight">
		<mTools/>
		<div class="listData">
			<router-view/>
		</div>
	</div>
</template>
<script>
import mTools from '@/components/mTools'
export default {
	name:'mBodyContent',
	data(){
		return {

		}
	},
	components:{
		mTools
	}
}
</script>
<style scoped>
.mainRight{
	float:left;
	width:calc(100% - 180px);
	height:100%;
}
.listData{
	width: 100%;
	height:calc(100% - 40px);
}
</style>