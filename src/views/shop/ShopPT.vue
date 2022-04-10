/**
* @author The Fool on 2022-03-25
*/
<template>
  <Layout style="height: 100%">
    <Modal v-model="isShow.form" width="90%">
      <Form v-model="params" :label-width="100" label-position="left">
        <FormItem label="商品名称">
          <Input v-model="params.goodName" style="width: 80%" />
        </FormItem>
        <FormItem label="数量">
          <Input v-model="params.number" style="width: 80%" />
        </FormItem>
        <FormItem label="备注">
          <Input v-model="params.remark" style="width: 80%" />
        </FormItem>
      </Form>
      <div slot="footer">
        <AutumnButton type="success" @click="submit">提交</AutumnButton>
        <AutumnButton type="success" @click="isShow.form = false"
          >取消</AutumnButton
        >
      </div>
    </Modal>
    <Modal v-model="isShow.modal" width="90%">
      <AutumnCrud
        ref="modalAutumnCrud"
        v-if="isShow.modal"
        :data="data"
        :page="page"
        :condition="condition"
        :options="foreignOptions"
        :query-condition="queryCondition"
      >
        <div slot="addBtn">
          <AutumnButton v-show="false"></AutumnButton>
        </div>
        <div slot="editBtn">
          <AutumnButton v-show="false"></AutumnButton>
        </div>
        <div slot="removeBtn">
          <AutumnButton v-show="false"></AutumnButton>
        </div>
        <template slot="extraBtn" slot-scope="{ data }">
          <AutumnButton @click="doit(data)" class="table-inline-button"
            >加入购物车</AutumnButton
          >
        </template>
      </AutumnCrud>
    </Modal>
    <AutumnTable
      ref="autumnTable"
      :data="data"
      :query-condition="queryCondition"
      :options="options"
      :child="childPageView"
      :page="page"
      @pageChange="pageChange"
      @dblclick="ondblclick"
    >
    </AutumnTable>
  </Layout>
</template>

<script>
import AutumnTable from "../../components/AutumnTable/AutumnTable";
import AutumnCrud from "@components/AutumnCrud/AutumnCrud";
import dataOptions from "@/modules/shop/shopOptions";
import foreignDataOptions from "@/modules/shopgood/shopgoodOptions";
import http from "@/utils/http";

export default {
  name: "Shop",
  components: { AutumnCrud, AutumnTable },
  data() {
    return {
      params: {},
      columns: [],
      data: [],
      options: dataOptions(this),
      foreignOptions: foreignDataOptions(this),
      goodQueryModel: {},
      page: {},
      isShow: {
        modal: false,
        form: false,
      },
      childPageView: false,
      condition: "",
      queryCondition: {},
      currentDbRow: {},
      url: `/Autumn/v1/private/shop/query`,
      selections: {
        goodsName: [],
      },
    };
  },
  methods: {
    pageChange: function (page) {},
    ondblclick: function (row, index) {
      let key = this.options.referencesKey;
      this.currentDbRow = row;
      this.condition = row["shopName"];
      this.params.shopName = row.shopName;
      //   this.queryCondition = {
      //     shopName: row.shopName,
      //   };
      this.isShow.modal = true;
    },
    doit: function (data) {
      this.params.userName = this.$store.getters.userInfo.loginName;
      this.params.jobDate = new Date();
      this.params.goodName = data.goodName;
      this.params.jobStatus = "已加入购物车";
      this.isShow.form = true;
    },
    submit: function () {
      http.post("/Autumn/v1/private/job/save", this.params).then(({ code }) => {
        if (code === "000000") {
          this.$Message.success("加入购物车成功！");
          this.isShow.form = false;
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
