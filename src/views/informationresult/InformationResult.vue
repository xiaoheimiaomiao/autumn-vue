/**
* @author The Fool on 2022-03-25
*/
<template>
  <Layout style="height: 100%">
    <Modal v-model="isShow.modal" width="90%">
      <AutumnTable
        ref="modalAutumnCrud"
        v-if="isShow.modal"
        :data="data"
        :page="page"
        :condition="condition"
        :options="foreignOptions"
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
      </AutumnTable>
    </Modal>
    <AutumnTable
      ref="autumnTable"
      :data="data"
      :query-condition="queryCondition"
      :options="options"
      :child="childPageView"
      :page="page"
      @pageChange="pageChange"
    >
    </AutumnTable>
  </Layout>
</template>

<script>
import AutumnTable from "../../components/AutumnTable/AutumnTable";
import AutumnCrud from "@components/AutumnCrud/AutumnCrud";
import dataOptions from "@/modules/information/informationOptions";
import foreignDataOptions from "@/modules/informationresult/informationresultOptions";
import http from "@/utils/http";
export default {
  name: "InformationResult",
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
      url: `/Autumn/v1/private/informationresult/query`,
    };
  },
  methods: {
    pageChange: function (page) {},
    ondblclick: function (row, index) {
      let key = this.options.referencesKey;
      this.currentDbRow = row;
      this.condition = row[key];
      this.isShow.modal = true;
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
