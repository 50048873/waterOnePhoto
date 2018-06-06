<template>
  <section class="Card">
    <div class="top">
      <div class="top-left">
        <slot name="titlePart"></slot>
      </div>
      <div class="top-right">
        <template v-if="percent">
          <progress-circle radius="70" :percent="percentToNumber">
            <span class="percent">{{percentToString}}</span>
          </progress-circle>
          <span>同比增长</span>
        </template>
      </div>
    </div>
    <div class="bottom">
      <div class="icon-wrap">
        <i :class="iconCls"></i>
      </div>
      <div class="chart">
        <slot name="chartPart"></slot>
      </div>
    </div>
  </section>
</template>

<script>
import ProgressCircle from './ProgressCircle.vue'
export default {
  name: 'Card',
  components: {
    ProgressCircle
  },
  props: {
    percent: {
      type: [String, Number],
      default: ''
    },
    iconCls: {
      type: Object,
      default: ''
    }
  },
  computed: {
    percentToString() {
      return this.percent == 0 ? '--' : this.percent 
    },
    percentToNumber() {
      return parseFloat(this.percent) / 100
    }
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/variable.less";
  .Card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 270px;
    // height: 170px;
    box-sizing: border-box;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.5);
    background-color: white;
    overflow: auto;
     .top {
      display: flex;
      .top-left {
        flex: 1;
        padding-right: 10px;
      }
      .top-right {
        text-align: center;
        .percent {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 12px;
        }
      }
    }
    .bottom {
      display: flex;
      align-items: baseline;
      .icon-wrap {
        width: 60px;
        font-size: 32px;
        color: @color-theme;
      }
      .chart {
        flex: 1;
        height: 100px;
      }
    } 
  }
</style>