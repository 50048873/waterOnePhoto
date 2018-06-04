<template>
  <div class="highcharts-container"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock';

export default {
  name: 'ChartBarBasic',
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
                categories: ['非洲', '美洲', '亚洲', '欧洲', '大洋洲'],
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
                valueSuffix: ' 百万'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        allowOverlap: true // 允许数据标签重叠
                    }
                }
            },
            legend: { // 图例
                enabled: false,
            },
            series: [{
                name: '1800 年',
                data: [107, 31, 635, 203, 2]
            }, {
                name: '1900 年',
                data: [133, 156, 947, 408, 6]
            }, {
                name: '2008 年',
                data: [973, 914, 4054, 732, 34]
            }]
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