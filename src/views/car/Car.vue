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
    import dataOptions from "@/modules/car/carOptions";
    import foreignDataOptions from "@/modules/car/carOptions";
    import http from "@/utils/http";
    export default {
        name: "Car",
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
                url : `/Autumn/v1/private/car/query`,

            }
        },
        methods: {
            pageChange: function (page) {},
            ondblclick: function (row, index) {
                let key = this.options.referencesKey
                this.currentDbRow = row;
                this.condition = row[key]
                this.isShow.modal = true
            },
            // cancelModal: function () {
            //     this.isShow.addModal = false;
            //            this.$refs.modalAutumnCrud.initModalForm()
            // },
        }
    }
</script>

<style scoped>

</style>
