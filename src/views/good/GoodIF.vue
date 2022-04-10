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
            http.get('/Autumn/v1/private/good/good2').then(result => {
                arr= result.data;
                let res = []
                arr.value.forEach((item, index)=>{
                    console.log(index)
                    let da = {
                        value: arr.value[index], name: arr.name[index]
                    }
                    res.push(da)
                })
                console.log(arr)
                let option;
                option = {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        top: '5%',
                        left: 'center'
                    },
                    series: [
                        {
                            name: 'Access From',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            itemStyle: {
                                borderRadius: 10,
                                borderColor: '#fff',
                                borderWidth: 2
                            },
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '40',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: res
                        }
                    ]
                };
                // option = {
                //     // xAxis: {
                //     //     type: 'category',
                //     //     data: arr.name
                //     // },
                //     // yAxis: {
                //     //     type: 'value'
                //     // },
                //     tooltip: {
                //         trigger: 'item'
                //     },
                //     legend: {
                //         top: '5%',
                //         left: 'center'
                //     },
                //
                //     series: [
                //         {
                //             name: 'Access From',
                //             type: 'pie',
                //             radius: ['40%', '70%'],
                //             avoidLabelOverlap: false,
                //             itemStyle: {
                //                 borderRadius: 10,
                //                 borderColor: '#fff',
                //                 borderWidth: 2
                //             },
                //             label: {
                //                 show: false,
                //                 position: 'center'
                //             },
                //             emphasis: {
                //                 label: {
                //                     show: true,
                //                     fontSize: '40',
                //                     fontWeight: 'bold'
                //                 }
                //             },
                //             labelLine: {
                //                 show: false
                //             },
                //             data: [
                //                 { value: 1048, name: 'Search Engine' },
                //                 { value: 735, name: 'Direct' },
                //                 { value: 580, name: 'Email' },
                //                 { value: 484, name: 'Union Ads' },
                //                 { value: 300, name: 'Video Ads' }
                //             ]
                //             // {
                //             //     data: arr.value,
                //             //     type: 'radar',
                //             //     barMaxWidth: '10%',
                //             //     showBackground: true,
                //             //     backgroundStyle: {
                //             //         color: 'rgba(180, 180, 180, 0.2)'
                //             //     }
                //             // }
                //         }
                //
                //     ]
                // };


                option && myChart.setOption(option);


            })
        }
    },

}
</script>

<style scoped>

</style>

