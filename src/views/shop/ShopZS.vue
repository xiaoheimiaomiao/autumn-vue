<template>
  <Layout style="height: 100%">
    <Modal v-model="isShow.form" width="30%">
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
  </Layout>
</template>

<script>
import AutumnTable from "../../components/AutumnTable/AutumnTable";
import AutumnCrud from "@components/AutumnCrud/AutumnCrud";
import dataOptions from "@/modules/shopgood/shopgoodOptions";
import foreignDataOptions from "@/modules/shopgood/shopgoodOptions";
import goodOptions from "@/modules/good/goodOptions";
import http from "@/utils/http";

export default {
  name: "ShopGood",
  components: { AutumnCrud, AutumnTable },
  data() {
    return {
      params: {},
      columns: [],
      data: [],
      options: dataOptions(this),
      foreignOptions: foreignDataOptions(this),
      goodOptions: goodOptions(this),
      goodQueryModel: {},
      page: {},
      isShow: {
        modal: true,
        form: false,
      },
      childPageView: false,
      condition: "",
      queryCondition: {},
      currentDbRow: {},
      url: `/Autumn/v1/private/shopGood/list`,
      selections: {
        goodsName: [],
      },
    };
  },
  mounted() {
    console.log(this.data);
  },
  methods: {
    pageChange: function (page) {
      console.log(this.data);
    },
    ondblclick: function (row, index) {
      console.log(this.data);
      let key = this.options.referencesKey;
      this.currentDbRow = row;
      this.condition = row[key];
      this.params.shopName = row.shopName;
      this.queryCondition = {
        shopName: row.shopName,
      };
      this.isShow.modal = true;
    },
    doit: function (data) {
      console.log(this.data);
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
