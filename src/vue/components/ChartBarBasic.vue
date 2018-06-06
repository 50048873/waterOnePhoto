<template>
  <div class="highcharts-container"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock';

export default {
  name: 'ChartBarBasic',
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
                name: '营业收入',
                data: []
            }, 
            obj2 = {
                name: '利润总额',
                data: []
            }
        this.data.forEach((item) => {
            obj1.data.push(item.y1)
            obj2.data.push(item.y2)
            categories.push(item.name)
        })
        seriesData.push(obj1)
        seriesData.push(obj2)
        // console.log(categories, seriesData)
        let options = {
            credits: {
                enabled: false
            },
            chart: {
                type: 'bar'
            },
            title: {
                text: null
            },
            subtitle: {
                text: null
            },
            xAxis: {
                // tickWidth: 0, // 刻度线
                categories: categories,
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                lineWidth: 1, // 轴线
                // tickWidth: 1, // 刻度线
                // gridLineWidth: 0, // 网格线
                title: {
                    text: null
                },
                labels: {
                    overflow: 'justify'
                }
            },

            tooltip: {
                // head + 每个 point + footer 拼接成完整的 table
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}：</td>' +
                '<td style="padding:0"><b>{point.y:.2f}万元</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: false, // 不显示图上数字
                        allowOverlap: true // 允许数据标签重叠
                    }
                }
            },
            legend: { // 图例
                enabled: true,
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
        height: 400px;
    }
</style>