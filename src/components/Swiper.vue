<template lang="html">
  <div>
      <Swiper :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange"></Swiper>
  </div>
</template>

<script>
import { Swiper, GroupTitle, SwiperItem, XButton, Divider } from 'vux'

const baseList = [{
  url: 'javascript:',
  img: 'https://static.vux.li/demo/1.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/2.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/3.jpg',
  title: '送你一次旅行'
}]
export default {
  components: {
    Swiper
  },
  data(){
    return {
      demo01_list:baseList,
      demo01_index: 0,
    }
  },
  methods:{
    demo01_onIndexChange (index) {
      this.demo01_index = index
    },
  },
  props:{
    swiperData:{
      default:baseList,
      type:Array
    }
  },
  created(){
    let _list = [];
    this._props.swiperData.map((val,idx) => {
      let _obj = {
        url:'javascript',
        img:val.image,
        title:val.title
      };
      _list.push(_obj);
    })
    this.demo01_list = _list;i
  }
}
</script>

<style lang="css">
</style>
