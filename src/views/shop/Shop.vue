/**
* @author The Fool on 2022-03-25
*/
<template>
    <Layout style="height: 100%">
        <Modal v-model="isShow.importGood" width="90%">
            <AutumnTable ref="modalAutumnTable" v-if="isShow.importGood" :data="data" :page="page"
                         :query-condition="goodQueryModel" show-action
                         :options="goodOptions" :query-url="'/Autumn/v1/private/shopGood/outList'">
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
                    <AutumnButton @click="doimportGood(data)" class="table-inline-button">引入商品</AutumnButton>
                </template>
            </AutumnTable>
        </Modal>
        <Modal v-model="isShow.modal" width="90%">
            <AutumnCrud ref="modalAutumnCrud" v-if="isShow.modal" :data="data" :page="page" :condition="condition"
                        :options="foreignOptions" :query-condition="queryCondition">
                <div slot="addBtn">
                    <AutumnButton @click="introduce">引入商品</AutumnButton>
                </div>
<!--                <div slot="editBtn">-->
<!--                    <AutumnButton v-show="false"></AutumnButton>-->
<!--                </div>-->
<!--                <div slot="removeBtn">-->
<!--                    <AutumnButton v-show="false"></AutumnButton>-->
<!--                </div>-->
<!--                <template slot="extraBtn" slot-scope="{data}">-->
<!--                    &lt;!&ndash;                    @click="introduce(data)"&ndash;&gt;-->
<!--                    <AutumnButton @click="editGood(data)" class="table-inline-button">编辑数量</AutumnButton>-->
<!--                </template>-->
            </AutumnCrud>
        </Modal>
        <AutumnTable
            ref="autumnTable"
            :data="data" :query-condition="queryCondition"
            :options="options" :child="childPageView"
            :page="page" @pageChange="pageChange" @dblclick="ondblclick">
        </AutumnTable>

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
        ondblclick: function (row, index) {
            let key = this.options.referencesKey
            this.currentDbRow = row;
            this.condition = row[key]
            this.queryCondition = {
                shopName: row.shopName
            }
            this.isShow.modal = true
        },
        introduce: function () {
            this.goodQueryModel = {shopName: this.currentDbRow.shopName}
            this.isShow.importGood = true
        },
        doimportGood: function (row) {
            let shopGood = {
                shopName: this.currentDbRow.shopName,
                goodName: row.goodName
            }
            http.post('/Autumn/v1/private/shopGood/save', shopGood).then(({code,data}) => {
                if (code === '000000') {
                    this.$refs.modalAutumnCrud.queryTable()
                    this.$Message.success({
                        content: "引入成功",
                        duration: 2
                    })
                    this.isShow.importGood = false
                }
            })
        },
        editGood: function (row) {
            this.$refs.modalAutumnCrud.modal.infoModel.type = 'edit';
            this.$refs.modalAutumnCrud.isShow.infoModel = true
            this.$refs.modalAutumnCrud.modalForm.infoModel = row;
        }
    }
}
</script>

<style scoped>

</style>
