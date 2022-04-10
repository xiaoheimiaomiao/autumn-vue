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
            http.get('/Autumn/v1/private/job/job2').then(result => {
                arr= result.data;
                let option;
                option = {
                    xAxis: {
                        type: 'category',
                        data: arr.name
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data: arr.value,
                            type: 'bar',
                            barMaxWidth: '10%',
                            showBackground: true,
                            backgroundStyle: {
                                color: 'rgba(180, 180, 180, 0.2)'
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

