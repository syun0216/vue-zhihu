<template lang="html">
  <div>
      <Swiper class="swiper-container"  v-if="demo01_list != null" v-model="demo01_index" @on-index-change="demo01_onIndexChange">
          <swiper-item class="swiper-img" @click.native="clickFunc(item.id)" v-for="(item, index) in demo01_list" :key="index">
          <img :src="item.img" />
          <p>123</p>
        </swiper-item>
      </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'vux'

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
    Swiper,
    SwiperItem
  },
  data(){
    return {
      demo01_list:null,
      demo01_index: 0,
    }
  },
  methods:{
    demo01_onIndexChange (index) {
      this.demo01_index = index
    },
    setSwiperData(){
      let _list = [];
      this._props.swiperData.map((val,idx) => {
        let _obj = {
          url:'javascript',
          img:"http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl="+val.image,
          title:val.title,
          id:val.id
        };
        _list.push(_obj);
      })
      this.demo01_list = _list;
    },
    clickFunc(id){
      this.$router.push({
        path: 'con',
        query: {
          id: id || ""
        }
      });
    }
  },
  props:{
    swiperData:{
      default:baseList,
      type:Array
    }
  },
  mounted(){
    this.setSwiperData();
  }
}
</script>

<style lang="less">
.swiper-container{
  width:100%;
}
.swiper-img{
  width:100%;
  img{
    width:100%;
  }
}
</style>
