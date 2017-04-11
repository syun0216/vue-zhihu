<template lang="html">
  <div>
    <div class="header">
      <img src="./../assets/menu.png" alt="菜单按钮">
    </div>
    <div class="aside">
      <ul>
        <li>123</li>
        <li>234</li>
        <li>345</li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
}
</script>

<style lang="less">
  .header{
    width:100%;
    height:2.8rem;
    z-index:9;
    padding-left:5%;
    position: fixed;
    top:0;
    background-image: linear-gradient(0deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.6) 95%);
     img{
      width:1.5rem;
      position: absolute;
      top:20%;
      left: 5%;
    }
  }
  .aside{
    position: fixed;
    z-index:11;
    top:0;
    left:0;
    right:0;
    visibility: hidden;
    &::-webkit-scrollbar {
        display: none!important;
        width: 0!important;
        height: 0!important;
        -webkit-appearance: none;
        opacity: 0!important;
    }
    ul{

    }
  }
</style>
