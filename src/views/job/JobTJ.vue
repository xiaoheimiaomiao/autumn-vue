/**
* @author The High Priestess on 2021-10-23
*/
<template>
    <Layout style="height: 100%">
        <Header style="background-color: #ffffff">

        </Header>
        <Main>
            <Table
                size="small"
                style="width: 100%;"
                :data="data"
                :columns="columns"
                no-data-text="暂无数据"
                :stripe="true"
                :border="true">
<!--                <template slot-scope="{ row, index,column }" slot="image">-->
<!--                    <img alt="" :src="row[column.key + 'show']" style="width: 100%;height: 100%"/>-->
<!--                </template>-->
            </Table>
        </Main>

    </Layout>
</template>

<script>
import AutumnCrud from "@components/AutumnCrud/AutumnCrud";
import dataOptions from "@/modules/good/goodOptions";
import AutumnTable from "@components/AutumnTable/AutumnTable";
import http from "@/utils/http"
import {generateColumns} from "@components/AutumnTable/autumnTable.parse";
import {showImages} from "@/api/system/uploadApi";

export default {
    name: "History",
    components: {AutumnTable, AutumnCrud},
    data() {
        return {
            columns: [],
            data: [],
            showRowImagesItemsKey: [],
            options: dataOptions(this),
            page: {},
            isShow: {
                modal: false
            },
            childPageView: false,
            condition: "",
            modalForm: {
                crudForm: {
                    userName: "",
                    goodsName: "",
                    goodsType: "",
                    goodsLogo: "",
                    goodsPrice: "",
                    goodsRemark: "",
                    goodsId: "",
                    shopId: "",
                },
                joinForm: {
                    jobUser: "",
                    jobShop: "",
                    jobGoods: "",
                    goodsSum: 0.00,
                    jobStatus: "",
                    jobDate: "",
                    goodsNumber: 0
                }
            }
        }
    },
    created() {
        this.init();
    },
    methods: {
        init: function () {
            let url = `/Autumn/v1/private/job/select`;
            let userInfo = this.$store.getters.userInfo;
            this.initOptions();
            http.post(url, userInfo.loginName).then(result => {
                let rows = result.data;
                if (result.code === '000000' && this.showRowImagesItemsKey.length > 0) {
                    rows.map(item => {
                        this.showRowImagesItemsKey.map(key => {
                            if (item[key]) {
                                this.getImageShow(item[key]).then(data => {
                                    item[key + 'show'] = data;
                                    this.data.push(item);
                                })
                            } else {
                                this.data.push(item);
                            }

                        })
                    });
                } else {
                    this.data = rows;
                }
            })
        },
        initOptions: function () {
            this.columns = generateColumns(this.options, false);
            this.showRowImagesItemsKey = [];
            this.columns.map(item => {
                if (item.slot === 'image') {
                    this.showRowImagesItemsKey.push(item.key)
                }
            })
        },
        getImageShow: function (url) {
            return new Promise(resolve => {
                if (url) {
                    showImages(url).then(result => {
                        if (result.code === '000000') {
                            resolve('data:image/png;base64,' + result.data);
                        }
                    })
                }
            })
        },
        pageChange: function (page) {

        },
        ondblclick: function (row, index) {
            this.condition = row.id
            this.childPageView = true
        }
    }
}
</script>

<style scoped>

</style>
