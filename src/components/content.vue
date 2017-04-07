<template lang="html">
  <div class="v_content">
    <slot></slot>
  </div>
</template>

<script>
</script>

<style lang="less">
.v_content{
  overflow: auto;
  position:absolute;
  top:43px;
  left: 5%;
  width: 90%;
  -webkit-overflow-scrolling: touch;
}
</style>
