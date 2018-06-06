<template>
  <div class="highcharts-container"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock'
import {handleChartClick} from '../assets/js/util'
export default {
  name: 'ChartMoney',
  props: {
    data: {
        type: Array,
        default: []
    },
    hasMin: {
        type: Boolean,
        default: false
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
        this.data.forEach((item) => {
            seriesData.push(parseFloat(item.y))
            categories.push(item.curDate)
        })
        // console.log(seriesData, categories)
        let max = Math.max.apply(Math, seriesData),
            min = Math.min.apply(Math, seriesData)
        let options = {
            credits: {
              enabled: false
            },
            chart: {
                type: 'column',
                margin: 0
            },
            title: {
                text: null
            },
            subtitle: {
                text: null
            },
            xAxis: {
                categories: categories,
                crosshair: true,
                labels: {
                    enabled: false
                },
                tickWidth: 0
            },
            yAxis: {
                min: _this.hasMin ? min - ((max - min) / 10) : 0,
                title: {
                    text: null
                },
                labels: {
                    enabled: false
                },
                gridLineWidth: 0
            },
            tooltip: {
                // head + 每个 point + footer 拼接成完整的 table
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.2f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                column: {
                    borderWidth: 0
                },
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function (e) { // 点击圆环回调
                                console.log('Category: ' + this.category + ', value: ' + this.y)
                                handleChartClick.bind(_this)({
                                    category: this.category,
                                    y: this.y
                                })
                            }
                        }
                    }
                }
            },
            series: [{
                name: "总资产",
                data: seriesData
            }]
        }
      this.chart = new Highcharts.Chart(this.$el, options)
    }
  }
}
</script>

<style scoped lang="less">
  .highcharts-container {
    height: 100%;
  }
</style>