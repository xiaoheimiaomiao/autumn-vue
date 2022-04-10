/**
* @author The Fool on 2022-03-25
*/
<template>
    <Layout style="height: 100%">
        <AutumnCrud
            ref="autumnTable"
            :data="data" :query-condition="queryCondition"
            :options="options" :child="childPageView"
            :page="page" @pageChange="pageChange">
            <div slot="addBtn">
                <AutumnButton v-show="false"></AutumnButton>
            </div>
            <div slot="editBtn">
                <AutumnButton v-show="false"></AutumnButton>
            </div>
            <div slot="removeBtn">
                <AutumnButton v-show="false"></AutumnButton>
            </div>
            <template slot="extraBtn" slot-scope="{data}">
                <!--                    @click="introduce(data)"-->
                <AutumnButton @click="doPay(data)" class="table-inline-button">审核</AutumnButton>
                <AutumnButton @click="doPay1(data)" class="table-inline-button">审核驳回</AutumnButton>
            </template>
        </AutumnCrud>

    </Layout>
</template>

<script>
import AutumnCrud from "@components/AutumnCrud/AutumnCrud";
import dataOptions from "@/modules/job/jobOptions";
import foreignDataOptions from "@/modules/job/jobOptions";
import http from "@/utils/http";

export default {
    inject: ['reload'],//注入依赖
    name: "Job",
    components: {AutumnCrud},
    data() {
        return {
            columns: [],
            data: [],
            options: dataOptions(this),
            foreignOptions: foreignDataOptions(this),
            page: {},
            isShow: {
                modal: false
            },
            childPageView: false,
            condition: "",
            queryCondition: {jobStatus: '已付款'},
            currentDbRow: {},
            url: `/Autumn/v1/private/job/query`,

        }
    },
    methods: {
        pageChange: function (page) {
        },
        ondblclick: function (row, index) {
            let key = this.options.referencesKey
            this.currentDbRow = row;
            this.condition = row[key]
            this.isShow.modal = true
        },
        doPay: function (data) {
            let params = data
            params.jobStatus = '已审核'
            http.post("/Autumn/v1/private/job/edit",params).then(({code}) => {
                if (code === '000000') {
                    this.$Message.success('已审核');
                    this.reload()
                }
            })
        },
        doPay1: function (data) {
            let params = data
            params.jobStatus = '审核驳回'
            http.post("/Autumn/v1/private/job/edit",params).then(({code}) => {
                if (code === '000000') {
                    this.$Message.success('审核驳回');
                    this.reload()
                }
            })
        },
    }
}
</script>

<style scoped>

</style>
