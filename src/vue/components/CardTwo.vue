<template>
  <section class="CardTwo">
    <h3 class="title">{{title}}</h3>
    <div class="chart" :style="getHeight">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CardTwo',
  props: {
  	title: {
  		type: String,
  		default: ''
  	},
    height: {
        type: String,
        default: 300
    }
  },
  computed: {
    getHeight() {
      let height = parseFloat(this.height) + 'px'
      return {
        height: height
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/variable.less";
  .CardTwo {
    background-color: white;
    padding: 10px;
    .title {
    	position: relative;
    	padding-left: 20px;
    	vertical-align: top;
    	line-height: 1.5;
    	margin-top: 5px;
    	margin-bottom: 15px;
    	&:before {
    		content: '';
    		position: absolute;
        top: 3px;
    		left: 0;
    		width: 14px;
    		height: 14px;
    		background-color: @color-theme;
    	}
    }
  }
</style>