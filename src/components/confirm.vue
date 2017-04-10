<template lang="html">
  <div style="padding:15px;">
      <x-button @click.native="test" type="primary">Show</x-button>
     <confirm v-model="show" :title="title"
     @on-cancel="onCancel"
     @on-confirm="onConfirm"
     @on-show="onShow"
     @on-hide="onHide">
       <p style="text-align:center;">123  </p>
     </confirm>
   </div>
</template>

<script>
import {Confirm,XButton} from 'vux';
export default {
  data(){
    return {
      title:"test",
      show:false
    }
  },
  components:{
    Confirm,
    XButton
  },
  methods:{
    onCancel () {
     console.log('on cancel')
   },
   onConfirm () {
     console.log('on confirm')
   },
   onHide () {
     console.log('on hide')
   },
   onShow () {
     console.log('on show')
   },
    showPlugin () {
      console.log(this.$vux);
     this.$vux.confirm.show({
       title: 'Title',
       content: 'Content',
       onShow () {
         console.log('plugin show')
       },
       onHide () {
         console.log('plugin hide')
       },
       onCancel () {
         console.log('plugin cancel')
       },
       onConfirm () {
         console.log('plugin confirm')
       }
     })
   },
   test(){
     this.show = !this.show;
   }
  },
  props:{
    isShow:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style lang="css">
</style>
