/**
* @author The Fool on 2022-03-25
*/
<template>
    <Layout style="height: 100%">
        <Modal v-model="isShow.form" width="90%">
            <Form v-model="params" :label-width="100" label-position="left">
                <FormItem label="车辆名称">
                    <Select v-model="params.carName"
                            :placeholder="'请选择车辆名称'"
                            style="width: 80%">
                        <Option v-for="(option,index) in selections.goodsName"
                                :key="index"
                                :value="option['dicText']">
                            {{ option['dicText'] }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="备注">
                    <Input v-model="params.remark" style="width: 80%"/>
                </FormItem>
            </Form>
            <div slot="footer">
                <AutumnButton type="success" @click="submit">提交</AutumnButton>
                <AutumnButton type="success" @click="isShow.form = false">取消</AutumnButton>
            </div>
        </Modal>
        <AutumnCrud
            ref="autumnTable"
            :data="data" :query-condition="queryCondition"
            :options="options" :child="childPageView"
            :page="page" @pageChange="pageChange" >
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
                <AutumnButton @click="doit(data)" class="table-inline-button">下发</AutumnButton>
            </template>
        </AutumnCrud>

    </Layout>
</template>

<script>
import AutumnCrud from "@components/AutumnCrud/AutumnCrud";
import dataOptions from "@/modules/job/jobOptions";
import foreignDataOptions from "@/modules/job/jobOptions";
import http from "@/utils/http";
import {queryByData, queryByType} from "../../api/system/dicApi";


export default {
    inject: ['reload'],//注入依赖
    name: "Job",
    components: {AutumnCrud},
    data() {
        return {
            params: {},
            columns: [],
            data: [],
            options: dataOptions(this),
            foreignOptions: foreignDataOptions(this),
            page: {},
            isShow: {
                form: false,
            },
            childPageView: false,
            condition: "",
            queryCondition: {jobStatus: '已审核'},
            currentDbRow: {},
            url: `/Autumn/v1/private/job/query`,
            selections: {
                goodsName: []
            }
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

        doit: function (data) {
            this.params.id = data.id;
            this.params.userName = data.userName;
            this.params.jobDate = data.jobDate;
            this.params.shopName = data.shopName;
            this.params.goodName = data.goodName;
            this.params.number = data.number;
            this.params.jobMoney = data.jobMoney;
            this.params.jobStatus = '已下发';

            let param = {
                carStatus : '未使用'
            }
            http.get('/Autumn/v1/private/car/query',param).then(result => {
                const {data} = result;
                queryByData(data,'carName').then(({data}) => {
                    this.selections.goodsName = data
                    this.isShow.form = true;
                })
            })

        },
        submit: function () {
            http.post("/Autumn/v1/private/job/edit",this.params).then(({code}) => {
                if (code === '000000') {
                    this.$Message.success('下发成功！');
                    this.isShow.form = false
                    this.reload()
                }
            })
        },
    }
}
</script>

<style scoped>

</style>
