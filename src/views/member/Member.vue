/**
* @author The Fool on 2022-03-25
*/
<template>
    <Layout style="height: 100%">
        <Modal v-model="isShow.modal" width="90%">
            <AutumnCrud ref="modalAutumnCrud" v-if="isShow.modal" :data="data" :page="page" :condition="condition"
                        :options="foreignOptions">
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
                    <AutumnButton @click="doit(data)" class="table-inline-button">操作</AutumnButton>
                </template>
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
    import AutumnCrud from "@components/AutumnCrud/AutumnCrud";
    import dataOptions from "@/modules/member/memberOptions";
    import foreignDataOptions from "@/modules/member/memberOptions";
    import http from "@/utils/http";
    export default {
        name: "Member",
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
                url : `/Autumn/v1/private/member/query`,

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
