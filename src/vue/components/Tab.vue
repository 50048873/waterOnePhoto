<template>
  <div class="Tab">
     <span v-for="(item, index) in data" class="title" :class="{ON: current === index}" @click="setCurrent(index)">{{item.title}}</span>
  </div>
</template>

<script>
  export default {
    name: 'Tab',
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        current: 0
      }
    },
    methods: {
      setCurrent(index) {
        this.current = index
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../assets/less/variable.less';
  .Tab {
    display: flex;
    text-align: center;
    .title {
      display: block;
      flex: 1;
      color: white;
      background-color: @color-green;
      cursor: pointer;
      height: 36px;
      line-height: 36px;
      &.ON {
        background-color: @color-theme;
        color: white;
      }
    }
  }
</style>
