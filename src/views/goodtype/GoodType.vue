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
    import AutumnCrud from "@components/AutumnCrud/AutumnCrud";
    import dataOptions from "@/modules/goodtype/goodtypeOptions";
    import foreignDataOptions from "@/modules/goodtype/goodtypeOptions";
    import http from "@/utils/http";
    export default {
        name: "GoodType",
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
                queryCondition:{},
                currentDbRow: {},
                url : `/Autumn/v1/private/goodtype/query`,

            }
        },
        methods: {
            pageChange: function (page) {},

        }
    }
</script>

<style scoped>

</style>
