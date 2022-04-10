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
        </AutumnCrud>

    </Layout>
</template>

<script>
import AutumnCrud from "@components/AutumnCrud/AutumnCrud";
import dataOptions from "@/modules/job/jobOptions";
import foreignDataOptions from "@/modules/job/jobOptions";
import http from "@/utils/http";

export default {
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
            queryCondition: {jobStatus: '已完成', userName: this.$store.getters.userInfo.loginName},
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

    }
}
</script>

<style scoped>

</style>
