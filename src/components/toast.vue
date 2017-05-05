<template>
	<div>
		    <toast v-model="a" type="text" :time="1000" is-show-mask :text="tips" :position="position"></toast>

	</div>
</template>
<script type="text/javascript">
	import { Toast } from 'vux'
	export default{
		components:{
			Toast
		},
		data(){
			return {
				a:true,
				position:"top"
			}
		},
		props:{
			tips:{
				default:null,
				type:String
			}
		}
	}
</script>
<style lang="less">
	.vux-toast-top{
	width: 100% !important;
    background: dodgerblue !important;
    opacity: 1 !important;
    border-radius: 0 !important;
    top:0 !important;
	}
</style>