<template>
  <div class="highcharts-container"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock';

export default {
  name: 'ChartProfit',
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
        var chart = null;
        let options = {
            credits: {
                enabled: false
            },
            chart: {
                type: 'pie'
            },
            title: {
                floating: true,
                text: "总计",
                style: { "fontWeight": "bold", "fontSize": "12px" }
            },
            tooltip: {
                headerFormat: '{series.name}<br>',
                pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    size: 180,
                    innerSize: '60%',
                    showInLegend: true,
                    dataLabels: {
                        enabled: false,
                        useHTML: true,
                        distance: 20,
                        y: -10,
                        padding: 0,
                        verticalAlign: 'middle',
                        formatter : function() {  
                            return "<div><p>"+this.point.name+"</p>"+this.percentage.toFixed(0)+"%</div>"; 
                        }
                    }
                },
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function (e) { // 点击圆环回调
                                /*layer.open({
                                    title: '项目进度统计',
                                    type: 1,
                                    skin: 'layui-layer-home', 
                                    anim: 0,
                                    shadeClose: true, 
                                    content: $(this.name).removeAttr('class').get(0).innerHTML
                                });*/
                            }
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: '标题',
                data: [
                        {
                        "name": "施工",
                        "y": 8
                    },
                    {
                        "name": "供水",
                        "y": 52
                    },
                    {
                        "name": "污水",
                        "y": 10
                    },
                    {
                        "name": "其它",
                        "y": 30
                    }
                ]
            }]
        }
        let callback = (c) => {
            // 环形图圆心
            var centerY = c.series[0].center[1],
                titleHeight = parseInt(c.title.styles.fontSize);
            c.setTitle({
                //x: 4,
                y: centerY + titleHeight/2
            });
            chart = c;
        }
        this.chart = new Highcharts.Chart(this.$el, options, callback)
    }
  }
}
</script>

<style scoped lang="less">
    .highcharts-container {
        height: 300px;
    }
</style>