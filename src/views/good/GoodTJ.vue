/**
* @author The Fool on 2022-03-25
*/
<template>
    <div id="main" style='width:100%;height: 600px' >

    </div>
</template>

<script>

import http from "@/utils/http";

export default {
    name: "HistoryYear",
    data() {
        return {

        }
    },
    mounted() {
        this.bb();
    },
    methods: {
        bb: function () {
            let arr=[];
            // 基于准备好的dom，初始化echarts实例
            let main = document.getElementById('main');
            let myChart = this.$echart.init(main, 'dark');
            http.get('/Autumn/v1/private/good/good1').then(result => {
                arr= result.data;
                let option;
                let res = []
                arr.value.forEach((item, index)=>{
                    console.log(index)
                    let da = {
                        value: arr.value[index], name: arr.name[index]
                    }
                    res.push(da)
                })
                option = {
                    backgroundColor: '#FF0033',
                    title: {
                        text: 'Customized Pie',
                        left: 'center',
                        top: 20,
                        textStyle: {
                            color: '#ccc'
                        }
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    visualMap: {
                        show: false,
                        min: 80,
                        max: 600,
                        inRange: {
                            colorLightness: [0, 1]
                        }
                    },
                    series: [
                        {
                            name: 'Access From',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: res.sort(function (a, b) {
                                return a.value - b.value;
                            }),
                            roseType: 'radius',
                            label: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            labelLine: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            },
                            itemStyle: {
                                color: '#c23531',
                                shadowBlur: 200,
                                shadowColor: 'rgba(255, 0, 0, 0.5)'
                            },
                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function (idx) {
                                return Math.random() * 200;
                            }
                        }
                    ]
                };


                option && myChart.setOption(option);


            })
        }
    },

}
</script>

<style scoped>

</style>

