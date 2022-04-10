/**
* @author The Fool on 2022-03-25
*/
<template>
    <Layout style="height: 100%">
        <Modal v-model="isShow.modal" width="90%">
            <AutumnCrud ref="modalAutumnCrud" v-if="isShow.modal" :data="data" :page="page" :condition="condition"
                        :options="foreignOptions" addBtn="回复咨询">

<!--                <div slot="editBtn">-->
<!--                    <AutumnButton v-show="false"></AutumnButton>-->
<!--                </div>-->
<!--                <div slot="removeBtn">-->
<!--                    <AutumnButton v-show="false"></AutumnButton>-->
<!--                </div>-->
<!--                <template slot="extraBtn" slot-scope="{data}">-->
<!--                    <AutumnButton @click="doit(data)" class="table-inline-button">操作</AutumnButton>-->
<!--                </template>-->
            </AutumnCrud>
        </Modal>
        <AutumnCrud
                ref="autumnTable"
                :data="data" :query-condition="queryCondition"
                :options="options" :child="childPageView"
                :page="page" @pageChange="pageChange" @dblclick="ondblclick">
        </AutumnCrud>

    </Layout>
</template>

<script>
import AutumnTable from "../../components/AutumnTable/AutumnTable";
    import AutumnCrud from "@components/AutumnCrud/AutumnCrud";
    import dataOptions from "@/modules/information/informationOptions";
    import foreignDataOptions from "@/modules/informationresult/informationresultOptions";
    import http from "@/utils/http";
    export default {
        name: "Information",
        components: {AutumnCrud,AutumnTable},
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
                queryCondition:{informationStatus:'已发起'},
                currentDbRow: {},
                url : `/Autumn/v1/private/information/query`,

            }
        },
        methods: {
            pageChange: function (page) {},
            ondblclick: function (row, index) {
                let key = this.options.referencesKey
                this.currentDbRow = row;
                this.condition = row[key]
                this.queryCondition = {
                    shopName: row.shopName
                }
                this.isShow.modal = true
                this.$nextTick(() => {
                    this.$refs.modalAutumnCrud.modalForm.infoModel['informationName'] = row['informationName']
                    this.$refs.modalAutumnCrud.modalForm.infoModel['userName'] = this.$store.getters.userInfo.loginName
                    this.$refs.modalAutumnCrud.modalForm.infoModel['resultDate'] = new Date()



                })
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
