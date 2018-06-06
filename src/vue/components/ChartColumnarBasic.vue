<template>
  <div class="highcharts-container"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock';

export default {
  name: 'ChartColumnarBasic',
  props: {
    data: {
        type: Array,
        default: []
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.draw()
  },
  methods: {
    draw() {
        let _this = this
        let categories = [], seriesData = []
        // console.log(this.data)
        let obj1 = {
                name: '年度供水目标',
                data: []
            }, 
            obj2 = {
                name: '2017年1-10月供水量',
                data: []
            }, 
            obj3 = {
                name: '2017年10月供水量',
                data: []
            }, 
            obj4 = {
                name: '2016年1-10月供水量',
                data: []
            }
        this.data.forEach((item) => {
            obj1.data.push(item.y1)
            obj2.data.push(item.y2)
            obj3.data.push(item.y3)
            obj4.data.push(item.y4)
            categories.push(item.name)
        })
        seriesData.push(obj1)
        seriesData.push(obj2)
        seriesData.push(obj3)
        seriesData.push(obj4)
        // console.log(categories, seriesData)
        let options = {
            credits: {
              enabled: false
            },
            chart: {
                type: 'column'
            },
            title: {
                text: null
            },
            subtitle: {
                text: null
            },
            xAxis: {
                categories: categories,
                crosshair: true
            },
            yAxis: {
                min: 0,
                lineWidth: 1,
                title: {
                    text: null
                }
            },
            tooltip: {
                // head + 每个 point + footer 拼接成完整的 table
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}：</td>' +
                '<td style="padding:0"><b>{point.y:.2f}万吨</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    borderWidth: 0
                }
            },
            series: seriesData
        }
      this.chart = new Highcharts.Chart(this.$el, options)
    }
  }
}
</script>

<style scoped lang="less">
  .highcharts-container {
    height: 300px;
  }
</style>