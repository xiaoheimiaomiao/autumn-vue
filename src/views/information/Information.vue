/**
* @author The Fool on 2022-03-25
*/
<template>
  <Layout style="height: 100%">
    <Modal v-model="isShow.modal" width="90%">
      <AutumnCrud
        ref="modalAutumnCrud"
        v-if="isShow.modal"
        :data="data"
        :page="page"
        :condition="condition"
        :options="foreignOptions"
        addBtn="发起咨询"
      >
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
import foreignDataOptions from "@/modules/information/informationOptions";
import http from "@/utils/http";
export default {
  name: "Information",
  components: { AutumnCrud, AutumnTable },
  data() {
    return {
      columns: [],
      data: [],
      options: dataOptions(this),
      foreignOptions: foreignDataOptions(this),
      page: {},
      isShow: {
        modal: false,
      },
      childPageView: false,
      condition: "",
      queryCondition: {},
      currentDbRow: {},
      url: `/Autumn/v1/private/information/query`,
    };
  },
  methods: {
    pageChange: function (page) {},
    ondblclick: function (row, index) {
      let key = this.options.referencesKey;
      this.currentDbRow = row;
      this.condition = row["shopName"];
      //   this.queryCondition = {
      //     shopName: row.shopName,
      //   };
      this.isShow.modal = true;
      this.$nextTick(() => {
        this.$refs.modalAutumnCrud.modalForm.infoModel["userName"] =
          this.$store.getters.userInfo.loginName;
        this.$refs.modalAutumnCrud.modalForm.infoModel["informationDate"] =
          new Date();

        this.$refs.modalAutumnCrud.modalForm.infoModel["shopName"] =
          row["shopName"];
        this.$refs.modalAutumnCrud.modalForm.infoModel[
          "shopNinformationStatusame"
        ] = "已发起";
      });
    },
    // cancelModal: function () {
    //     this.isShow.addModal = false;
    //            this.$refs.modalAutumnCrud.initModalForm()
    // },
  },
};
</script>

<style scoped>
</style>
