<template>
  <div class="progress-circle">
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset"/>
    </svg>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      radius: {
        type: [Number, String],
        default: 100
      },
      percent: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        dashArray: Math.PI * 100
      }
    },
    computed: {
      dashOffset() {
        if (isNaN(this.percent)) {
          return this.dashArray
        }
        let percent = (1 - parseFloat(this.percent))
        percent = percent < 0 ? 0 : percent
        return percent * this.dashArray
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../assets/less/variable.less";
  .progress-circle {
    position: relative;
    svg {
      overflow: visible;
      transform: rotate(-90deg);
      circle {
        stroke-width: 8px;
        transform-origin: center;
        transform: scale(0.9);
        &.progress-background {
          stroke: #d1d1d1;
        }
        &.progress-bar {
          stroke: @color-orange;
        }
      }
    }
  }
</style>