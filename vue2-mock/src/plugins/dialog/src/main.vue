<template>
 <transition name="ec">
	<div class="dialog" v-if="visible" @click.self="closeMask">
		<div :class="['dialog-wrap']" :style="calcStyle()">
			<div class="dialog-head">
				<span class="dialog-title">{{title}}</span>
				<span class="dialog-close" @click="close">X</span>
			</div>
			<div class="dialog-content" :style="{height:(height-100)+'px'}"><slot></slot></div>
			<div class="dialog-footer" v-if="$slots.footer">
				<slot name="footer"></slot>
			</div>
		</div>
	</div>
 </transition>
</template>
<script>
export default {
	name: 'Dialog',
	props:{
		visible:{
			type: Boolean,
			default:''
		},
		title:{
			type: String,
			default:''
		},
		width: {
			type:String,
			default: '300'
		},
		height: {
			type: String,
			default: '200'
		},
		beforeClose:Function
	},
	computed:{},
	methods:{
		calcStyle(){
			if(this.width<=300){
				this.width=300
			}
			if(this.height<=200){
				this.height=200
			}
			return {
				width:this.width+'px',
				height:this.height+'px',
				marginLeft:-(this.width)/2+'px',
				marginTop:-(this.height)/2+'px',
			}
		},
		closeMask(){
					
		},
		close(){
			this.$emit('before-close','beforeClose');
		}
	}
}
</script>
<style lang="scss" scoped>
.dialog{
	position:fixed;
	width:100%;
	height:100%;
	left:0px;
	top:0px;
	right:0px;
	background:rgba(0,0,0,.5);
	z-index:2001;
	.dialog-wrap{
		position:fixed;
		width:300px;
		height:200px;
		left:50%;
		top:50%;
		margin-top:-100px;
		margin-left:-150px;
		border-radius:2px;
		background:#fff;
		overflow:hidden;
		box-shadow:0px 2px 2px rgba(0,0,0,.5);
		font-size:14px;
		.dialog-head{
			display:block;
			padding:0px 20px;
			box-sizing:border-box;
			height:40px;
			line-height:40px;
			font-size:bold;
			border-bottom:#e6e6e6 solid 1px;
			position:relative;
			.dialog-close{
				position:absolute;
				right:15px;
				top:10px;
				width:16px;
				height:16px;
				line-height:16px;
				text-align:center;
				color:#333;
				cursor:pointer;
				font-weight:normal;
			}
		}
		.dialog-footer{
			display:block;
			height:60px;
			padding:10px 20px;
			box-sizing:border-box;
		}
	}
}
.ec-enter {
    opacity: 0;
    .dialog-wrap {
        transform:translateY(-50px);
    }
}

.ec-enter-active {
    transition: opacity .4s;
    .dialog-wrap {
        transition: transform .4s;
    }
}
.ec-leave-active{
    transition: opacity .2s;
    .dialog-wrap {
        transition: transform .4s;
        transform:translateY(-50px);
    }
}
.ec-leave-active {
    opacity: 0;
}
</style>