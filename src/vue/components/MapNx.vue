<template>
  <div class="MapNx">
    <img class="m-nx-map" :src="getStaticPath('/static/img/map.png')" alt="bg.jpg">
  </div>
</template>

<script>
import $ from 'jquery'
import {getStaticPath} from '../assets/js/mixin'
export default {
  name: 'MapNx',
  mixins: [getStaticPath],
  data() {
    return {
    }
  },
  methods: {
    getWarnPosition(item) {
      let nx = {
        jd: [104.2869, 107.6536],
        wd: [35.2494, 39.8758]
      }
      
      //图片内目标Y坐标=取绝对值（目标纬度-图片上边对应纬度）/取绝对值（图片下边纬度-图片上边对应纬度）*（图片的高度）
      //图片内目标X坐标=取绝对值（目标经度-图片左边对应经度）/取绝对值（图片右边经度-图片左边对应经度）*（图片的宽度）
      let top = Math.abs(item.lttd - nx.wd[1]) / Math.abs(nx.wd[0] - nx.wd[1]) * this.imgHeight - 20 + 'px',
          left = Math.abs(item.lgtd - nx.jd[0]) / Math.abs(nx.jd[1] - nx.jd[0]) * this.imgWidth - 20 + 'px'

      return item.status == normal ? {top, left} : {top, left, zIndex: 1}
    }
  }
}
</script>

<style scoped lang="less">
  .MapNx {
    
  }
</style>