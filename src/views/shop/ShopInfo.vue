/**
* @author The Fool on 2022-03-25
*/
<template>
    <Layout style="height: 100%">

        <AutumnCrud
            ref="autumnTable"
            :data="data" :query-condition="queryCondition"
            :options="options" :child="childPageView"
            :page="page" @pageChange="pageChange" >
        </AutumnCrud>

    </Layout>
</template>

<script>
import AutumnTable from "../../components/AutumnTable/AutumnTable";
import AutumnCrud from "@components/AutumnCrud/AutumnCrud";
import dataOptions from "@/modules/shop/shopOptions";
import foreignDataOptions from "@/modules/shopgood/shopgoodOptions";
import goodOptions from "@/modules/good/goodOptions";
import http from "@/utils/http";

export default {
    name: "Shop",
    components: {AutumnCrud,AutumnTable},
    data() {
        return {
            columns: [],
            data: [],
            options: dataOptions(this),
            foreignOptions: foreignDataOptions(this),
            goodOptions: goodOptions(this),
            goodQueryModel: {},
            page: {},
            isShow: {
                modal: false,
                importGood: false
            },
            childPageView: false,
            condition: "",
            queryCondition: {},
            currentDbRow: {},
            url: `/Autumn/v1/private/shop/query`,

        }
    },
    methods: {
        pageChange: function (page) {
        },

    }
}
</script>

<style scoped>

</style>
