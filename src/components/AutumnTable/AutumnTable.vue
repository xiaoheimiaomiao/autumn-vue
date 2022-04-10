<template>
  <Layout style="height: 100%; background-color: #ffffff">
    <Header style="background-color: #ffffff">
      <Form inline v-model="queryModel" style="margin-top: 14px">
        <template v-for="(model, index) in queryModelList">
          <FormItem
            :key="index"
            :label="model.title"
            :label-width="model.title.length * 20"
            label-position="left"
          >
            <Input
              clearable
              v-model="queryModel[model.key]"
              :placeholder="'请输入' + model.title"
            ></Input>
          </FormItem>
        </template>
        <!--                <FormItem>-->
        <!--                    <AutumnButton icon="md-add" type="success" @click="clickAddBtn">新增</AutumnButton>-->
        <!--                </FormItem>-->
        <FormItem>
          <AutumnButton icon="md-search" type="primary" @click="queryTable"
            >查询</AutumnButton
          >
        </FormItem>
        <FormItem style="float: right">
          <AutumnButton icon="md-refresh" @click="refresh">刷新</AutumnButton>
        </FormItem>
        <FormItem style="float: right" v-if="child">
          <AutumnButton @click="$emit('backParent')">返回原页面</AutumnButton>
        </FormItem>
      </Form>
      <Modal
        v-model="isShow.infoModel"
        draggable
        :title="modal.infoModel.title"
        :mask-closable="false"
        :closable="false"
      >
        <Form v-model="modalForm.infoModel">
          <template v-for="(item, index) in modalFormItems">
            <template v-if="!item.hidden">
              <!-- input组件 -->
              <FormItem
                :key="index"
                :label="item.title"
                :label-width="100"
                label-position="left"
                v-if="!item.type || item.type === 'input'"
              >
                <Input
                  v-model="modalForm.infoModel[item.key]"
                  :placeholder="'请输入' + item.title"
                  style="width: 80%"
                ></Input>
              </FormItem>
              <!-- 下拉框组件 -->
              <FormItem
                :key="index"
                :label="item.title"
                :label-width="100"
                label-position="left"
                v-if="item.type === 'selection'"
              >
                <Select
                  v-model="modalForm.infoModel[item.key]"
                  :placeholder="'请选择' + item.title"
                  style="width: 80%"
                >
                  <Option
                    v-for="(option, index) in item.options"
                    :key="index"
                    :value="option['dicText']"
                  >
                    {{ option["dicText"] }}
                  </Option>
                </Select>
              </FormItem>
              <!-- 日期组件 -->
              <FormItem
                :key="index"
                :label="item.title"
                :label-width="100"
                label-position="left"
                v-if="item.type === 'datetime'"
              >
                <DatePicker
                  @on-change="datetimeFormatter($event, item)"
                  v-model="modalForm.infoModel[item.key]"
                  format="yyyy-MM-dd HH:mm:ss"
                  :type="item.type"
                  :placeholder="'请选择' + item.title"
                  style="width: 80%"
                ></DatePicker>
              </FormItem>
              <!-- 图片上传组件 -->
              <FormItem
                :key="index"
                :label="item.title"
                :label-width="100"
                label-position="left"
                v-if="item.type === 'avatar' || item.type === 'image'"
              >
                <image-upload
                  ref="imageUpload"
                  @getUploadUrl="getUploadUrl"
                  :item="item"
                  :data="modalForm.infoModel[item.key]"
                ></image-upload>
              </FormItem>
            </template>
          </template>
        </Form>
        <template slot="footer">
          <AutumnButton type="success" @click="confirmModalOp"
            >确认</AutumnButton
          >
          <AutumnButton @click="cancelModal"> 取消 </AutumnButton>
        </template>
      </Modal>
    </Header>
    <Content>
      <Table
        :data="tableData"
        size="small"
        style="width: 100%"
        :columns="tableColumns"
        no-data-text="暂无数据"
        :stripe="options.stripe"
        @on-row-dblclick="ondblclick"
        :border="options.border"
      >
        <template slot-scope="{ row, index, column }" slot="image">
          <img
            alt=""
            :src="row[column.key + 'show']"
            style="width: 100%; height: 100%"
          />
        </template>
        <template slot-scope="{ row, index, column }" slot="datetime">
          <span>{{ dateHandle(row, column) }}</span>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <slot name="extraBtn" :data="row" />
          <!--                    <AutumnButton icon="md-create" @click="clickEditBtn(row)" class="table-inline-button">编辑</AutumnButton>-->
          <!--                    <AutumnButton icon="md-close" @click="remove(row)" type="error" class="table-inline-button">删除</AutumnButton>-->
        </template>
      </Table>
    </Content>
    <Footer style="background-color: #ffffff">
      <Page
        style="float: right"
        show-total
        :total="pageModel.total"
        @on-change="pageChange"
        :page-size="pageModel.size"
        :current="pageModel.page"
      >
      </Page>
    </Footer>
  </Layout>
</template>

<script>
import {
  generateColumns,
  generateQueryModel,
  generateQueryModelList,
  generateModalFormItems,
} from "@components/AutumnTable/autumnTable.parse";
import ImageUpload from "@components/AutumnUpload/ImageUpload";
import { initApi } from "@components/AutumnTable/autumnTable.api";
import {
  query,
  list,
  save,
  edit,
  remove,
} from "@components/AutumnTable/autumnTable.api";
import _ from "lodash";
import "@/utils/dateUtils";
import { showImages } from "@/api/system/uploadApi";
import http from "@/utils/http";

export default {
  name: "AutumnTable",
  inject: ["reload"], //注入依赖
  model: {},
  props: {
    autoQuery: {
      type: Boolean,
      default: true,
    },
    queryUrl: {
      type: String,
      default: "",
    },
    showAction: {
      type: Boolean,
    },
    options: {
      type: Object,
      required: true,
    },
    page: {
      type: Object,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    child: {
      type: Boolean,
    },
    condition: {
      type: String,
    },
    queryCondition: {
      type: Object,
    },
  },
  components: { ImageUpload },
  data() {
    return {
      tableData: this.data,
      tableColumns: [],
      pageModel: {
        page: this.page.current ? this.page.current : 1,
        size: this.page.pageSize ? this.page.pageSize : 8,
        total: this.page.total ? this.page.total : 20,
      },
      queryModel: {},
      queryModelList: generateQueryModelList(this.options),
      isShow: {
        infoModel: false,
      },
      modal: {
        infoModel: {
          title: "增加",
          type: "add",
        },
      },
      modalFormItems: generateModalFormItems(this.options),
      modalForm: {
        infoModel: {},
      },
      src: "",
    };
  },
  watch: {
    queryCondition(value) {
      if (value) {
        this.queryTable();
      }
    },
  },
  created() {
    this.init();
  },
  methods: {
    init: function () {
      this.initColumns();
      initApi(this.options);
      this.initQueryModel();
      this.isShow.infoModel = false;
      this.modalForm.infoModel = {};
    },
    initColumns: function () {
      this.tableColumns = generateColumns(
        this.options,
        this.$slots.extraBtn || this.showAction
      );
      this.showRowImagesItemsKey = [];
      this.tableColumns.map((item) => {
        if (item.slot === "image") {
          this.showRowImagesItemsKey.push(item.key);
        }
      });
    },
    initQueryModel: function () {
      this.queryModel = generateQueryModel(this.options, this.pageModel);
      if (this.autoQuery) {
        this.queryTable();
      }
    },
    initModalForm: function () {
      for (let item in this.modalFormItems) {
        if (item.type === "datetime") {
          this.modalForm.infoModel[item.key] = "";
        }
      }
    },
    queryTable: function () {
      let queryModelClone = _.cloneDeep(this.queryModel);
      console.log(this.queryModel);
      if (this.queryCondition) {
        for (let key in this.queryCondition) {
          queryModelClone[key] = this.queryCondition[key];
        }
      }
      if (this.condition) {
        let key = this.options.foreignKey;
        queryModelClone[key] = this.condition;
      }
      list(queryModelClone).then((result) => {
        this.tableData = [];
        const { rows, total } = result.data;
        if (this.showRowImagesItemsKey.length > 0) {
          rows.map((item) => {
            this.showRowImagesItemsKey.map((key) => {
              if (item[key]) {
                this.getImageShow(item[key]).then((data) => {
                  item[key + "show"] = data;
                  this.tableData.push(item);
                });
              } else {
                this.tableData.push(item);
              }
            });
          });
        } else {
          this.tableData = rows;
        }
        this.pageModel.total = parseInt(total);
      });
    },
    pageChange: function (page) {
      this.$emit("pageChange", page);
      this.queryModel.page = page;
      this.queryTable();
    },
    dateHandle: function (row, column) {
      let time = new Date(row[column.key]);
      return time.format("yyyy-MM-dd HH:mm:ss");
    },
    getUploadUrl: function (data) {
      const { url, item } = data;
      this.modalForm.infoModel[item.key] = url;
    },
    getImageShow: function (url) {
      return new Promise((resolve) => {
        if (url) {
          showImages(url).then((result) => {
            if (result.code === "000000") {
              resolve("data:image/png;base64," + result.data);
            }
          });
        }
      });
    },
    clickAddBtn: function () {
      this.modal.infoModel.type = "add";
      this.modal.infoModel.title = "添加数据";
      this.isShow.infoModel = true;
    },
    clickEditBtn: function (row) {
      this.modal.infoModel.type = "edit";
      this.modal.infoModel.title = "修改数据";
      this.modalForm.infoModel = _.cloneDeep(row);
      this.isShow.infoModel = true;
    },
    remove: function (row) {
      remove([row.id]).then((result) => {
        this.$Message.success({
          content: "删除成功",
          duration: 2,
        });
        this.init();
      });
    },
    datetimeFormatter: function (value, item) {
      this.modalForm.infoModel[item.key] = value;
    },
    confirmModalOp: function () {
      if (this.modal.infoModel.type === "add") {
        save(this.modalForm.infoModel).then((result) => {
          if (result.code === "000000") {
            this.init();
            this.$Message.success({
              content: "新增成功",
              duration: 2,
            });
          }
        });
      }
      if (this.modal.infoModel.type === "edit") {
        edit(this.modalForm.infoModel).then((result) => {
          if (result.code === "000000") {
            this.init();
            this.$Message.success({
              content: "修改成功",
              duration: 2,
            });
          }
        });
      }
    },
    ondblclick: function (row, index) {
      this.$emit("dblclick", row, index);
    },
    refresh: function () {
      // this.reload();
      this.queryModel.id = "";
      this.queryModel.shopName = "";
      this.queryModel.goodName = "";
      this.queryModel.informationName = "";
      this.queryModel.userName = "";
      this.queryModel.loginName = "";
      this.queryModel.typeName = "";
      this.queryTable();
    },
    cancelModal: function () {
      if (this.$refs.imageUpload && this.$refs.imageUpload[0]) {
        this.$refs.imageUpload[0].resetUpload();
      }
      this.isShow.infoModel = false;
      this.modalForm.infoModel = {};
    },
    getCurrentRow: function () {},
  },
};
</script>

<style scoped>
</style>
