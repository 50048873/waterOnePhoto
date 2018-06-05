<template>
  <nav>
   <router-link :to="item.path" v-for="(item, index) in data" :key="index">
     <span class="iconWrap" v-if="item.iconCls"><i :class="item.iconCls"></i></span>
     <span class="title">{{item.title}}</span>
   </router-link>
  </nav>
</template>

<script>
  export default {
    name: 'NavLeft',
    props: {
      data: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../assets/less/variable.less';
  nav {
    background-color: #eef7f6;
    a {
      display: block;
      padding: 10px 20px;
      color: #333;
      font-weight: bold;
      &.ON {
        background-color: white;
        color: @color-theme;
      }
    }
    .title {
      margin-left: 6px; 
    }
  }
</style>
