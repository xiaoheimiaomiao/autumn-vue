/**
* @author The High Priestess on 2021-10-17
*/
<template>
  <Layout style="height: 100%">
    <div v-if="childPageView">
      <AutumnCrud
        :data="data"
        :page="page"
        :condition="condition"
        :options="foreignOptions"
        :child="childPageView"
        @backParent="childPageView = false"
      ></AutumnCrud>
    </div>
    <div v-if="!childPageView">
      <AutumnCrud
        :data="data"
        :options="options"
        :child="childPageView"
        :page="page"
        @pageChange="pageChange"
        @dblclick="ondblclick"
      >
      </AutumnCrud>
    </div>
  </Layout>
</template>

<script>
import AutumnCrud from "@components/AutumnCrud/AutumnCrud";
import dataOptions from "@/modules/user/userOptions";
import foreignDataOptions from "@/modules/user/userOptions";

export default {
  name: "User",
  components: { AutumnCrud },
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
    };
  },
  methods: {
    pageChange: function (page) {},
    ondblclick: function (row, index) {
      this.condition = row.id;
      this.childPageView = true;
    },
  },
};
</script>

<style scoped>
</style>
