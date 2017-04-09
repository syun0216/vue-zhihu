<template lang="html">
  <div style="padding:15px;">
      <x-button @click.native="showPlugin" type="primary">Show</x-button>
    </div>
</template>

<script>
import {Confirm,XButton} from 'vux';
export default {
  data(){
    return {
      title:"test",
    }
  },
  components:{
    Confirm,
    XButton
  },
  methods:{
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
