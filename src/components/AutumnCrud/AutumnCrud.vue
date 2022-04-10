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
        <FormItem>
          <slot name="addBtn">
            <AutumnButton icon="md-add" type="success" @click="clickAddBtn()">{{
              addBtn
            }}</AutumnButton>
          </slot>
        </FormItem>
        <FormItem>
          <slot name="queryBtn">
            <AutumnButton icon="md-search" type="primary" @click="queryTable">{{
              queryBtn
            }}</AutumnButton>
          </slot>
        </FormItem>
        <FormItem style="float: right">
          <slot name="refreshBtn">
            <AutumnButton icon="md-refresh" @click="refresh">{{
              refreshBtn
            }}</AutumnButton>
          </slot>
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
        :closable="true"
      >
        <slot name="allInfoModal">
          <slot name="infoModalForm">
            <Form v-model="modalForm.infoModel">
              <template v-for="(item, index) in modalFormItems">
                <slot :name="'infoModalFormItem-' + item.key">
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
                        :disabled="
                          item.disabled ||
                          (columnDisabled ? columnDisabled[item.key] : false)
                        "
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
                        :disabled="
                          item.disabled ||
                          (columnDisabled ? columnDisabled[item.key] : false)
                        "
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
                        :disabled="
                          item.disabled ||
                          (columnDisabled ? columnDisabled[item.key] : false)
                        "
                        @on-change="datetimeFormatter($event, item)"
                        v-model="modalForm.infoModel[item.key]"
                        format="yyyy-MM-dd HH:mm:ss"
                        :type="item.type"
                        :placeholder="'请选择' + item.title"
                        style="width: 80%"
                      ></DatePicker>
                    </FormItem>
                    <FormItem
                      :key="index"
                      :label="item.title"
                      :label-width="100"
                      label-position="left"
                      v-if="
                        item.type === 'audio' ||
                        item.type === 'video' ||
                        item.type === 'work' ||
                        item.type === 'work'
                      "
                    >
                      <file-upload
                        ref="fileUpload"
                        @getUploadUrl="getUploadUrl"
                        :item="item"
                        :data="modalForm.infoModel[item.key]"
                      />
                    </FormItem>
                    <!-- 图片上传组件 -->
                    <FormItem
                      :key="index"
                      :label="item.title"
                      :label-width="100"
                      label-position="left"
                      :disabled="
                        item.disabled ||
                        (columnDisabled ? columnDisabled[item.key] : false)
                      "
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
                </slot>
              </template>
              <slot name="addFormItems" />
            </Form>
          </slot>
          <template slot="footer">
            <AutumnButton type="success" @click="confirmModalOp"
              >确认</AutumnButton
            >
            <AutumnButton @click="cancelModal"> 取消 </AutumnButton>
          </template>
        </slot>
      </Modal>
    </Header>
    <Content>
      <Modal
        v-model="isShow.videoModel"
        :title="modal.videoModel.title"
        :mask-closable="false"
        :closable="true"
        fullscreen
        :width="800"
      >
        <autumn-video
          v-if="isShow.videoModel"
          :src="handlerFileUrl(modalForm.videoModel.src)"
        />
        <div slot="footer">
          <AutumnButton
            type="success"
            @click="download(handlerFileUrl(modalForm.videoModel.src))"
            >下载</AutumnButton
          >
          <AutumnButton type="info" @click="isShow.videoModel = false"
            >取消</AutumnButton
          >
        </div>
      </Modal>
      <Table
        :data="tableData"
        size="small"
        style="width: 80%"
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
        <template slot-scope="{ row, index, column }" slot="audio">
          <AutumnAudio
            @audioPlay="$emit('audioPlay', row)"
            :name="''"
            :url="handlerFileUrl(row[column.key])"
            mini
          />
        </template>
        <template slot-scope="{ row, index, column }" slot="work">
          <AutumnButton @click="download(handlerFileUrl(row[column.key]))">
            下载
          </AutumnButton>
          <!--              <AutumnAudio @audioPlay="$emit('audioPlay',row)" :name="''"-->
          <!--                           :url="handlerFileUrl(row[column.key])" mini/>-->
        </template>
        <template slot-scope="{ row, index, column }" slot="video">
          <AutumnButton
            icon="ios-videocam"
            @click="viewAutumnVideo(row, column)"
          />
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <slot name="editBtn">
            <AutumnButton
              icon="md-create"
              @click="clickEditBtn(row)"
              class="table-inline-button"
              >{{ editBtn }}
            </AutumnButton>
          </slot>
          <slot name="removeBtn">
            <AutumnButton
              icon="md-close"
              @click="remove(row)"
              type="error"
              class="table-inline-button"
            >
              {{ removeBtn }}
            </AutumnButton>
          </slot>
          <slot name="extraBtn" :data="row" />
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
} from "@components/AutumnCrud/autumnCrud.parse";
import ImageUpload from "@components/AutumnUpload/ImageUpload";
import { initApi } from "@components/AutumnCrud/autumnCrud.api";
import {
  query,
  list,
  save,
  edit,
  remove,
} from "@components/AutumnCrud/autumnCrud.api";
import _ from "lodash";
import "@/utils/dateUtils";
import { showImages } from "@/api/system/uploadApi";
import http from "@/utils/http";
import AutumnAudio from "../AutumnMeta/AutumnAudio";
import AutumnVideo from "../AutumnMeta/AutumnVideo";

import FileUpload from "../AutumnUpload/FileUpload";
import saveAs from "@/utils/download";

export default {
  name: "AutumnCrud",
  inject: ["reload"], //注入依赖
  model: {},
  props: {
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
    addBtn: {
      type: String,
      default: "新增",
    },
    queryBtn: {
      type: String,
      default: "查询",
    },
    refreshBtn: {
      type: String,
      default: "刷新",
    },
    editBtn: {
      type: String,
      default: "编辑",
    },
    removeBtn: {
      type: String,
      default: "删除",
    },
    showAction: {
      type: Boolean,
      default: true,
    },
    queryCondition: {
      type: Object,
    },
    downloadFileNameFiled: {
      type: String,
    },
    columnDisabled: {
      type: Object,
    },
    beforeEdit: {
      type: Function,
    },
  },
  components: { ImageUpload, AutumnAudio, FileUpload, AutumnVideo },
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
        videoModel: false,
      },
      showRowImagesItemsKey: [],
      showAudioItemsKey: [],
      modal: {
        infoModel: {
          title: "增加",
          type: "add",
        },
        videoModel: {
          title: "视频播放",
          type: "add",
        },
      },
      modalFormItems: generateModalFormItems(this.options),
      currentRow: {},
      modalForm: {
        infoModel: {},
        videoModel: {
          src: "",
        },
      },
      src: "",
    };
  },
  created() {
    this.init();
    console.log(this.queryModel);
  },
  methods: {
    XZ: function (row, index, column) {},
    init: function () {
      this.initColumns();
      initApi(this.options);
      this.initQueryModel();
      this.isShow.infoModel = false;
      this.modalForm.infoModel = {};
      this.initModalForm();
    },
    initColumns: function () {
      this.tableColumns = generateColumns(
        this.options,
        this.$slots.extraBtn || this.showAction
      );
      this.showRowImagesItemsKey = [];
      this.showAudioItemsKey = [];
      this.tableColumns.map((item) => {
        if (item.slot === "image") {
          this.showRowImagesItemsKey.push(item.key);
        }
        if (item.slot === "audio") {
          this.showAudioItemsKey.push(item.key);
        }
        // if (item.slot === 'work') {
        //     this.showAudioItemsKey.push(item.key)
        // }
      });
    },
    initQueryModel: function () {
      this.queryModel = generateQueryModel(this.options, this.pageModel);
      this.queryTable();
    },
    initModalForm: function () {
      const items = _.cloneDeep(this.modalFormItems);
      items.map((item) => {
        if (item.type === "datetime") {
          this.modalForm.infoModel[item.key] = "";
        }
        if (item.type === "input") {
          this.modalForm.infoModel[item.key] = "";
        }
      });
    },
    queryTable: function () {
      let queryModelClone = _.cloneDeep(this.queryModel);
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
        } else if (this.showAudioItemsKey.length > 0) {
          rows.map((item) => {
            this.showAudioItemsKey.map((key) => {
              if (item[key]) {
                this.handlerFileUrl(item[key]).then((data) => {
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
    handlerFileUrl: function (data) {
      const path = data
        ? data
            .replace("C:/image/\\", "")
            .replace("/Users/lumos/Downloads/Autumn/", "")
        : "";
      console.log(data);
      return `/api/Autumn/files/${path}`;
    },
    viewAutumnVideo: function (row, column) {
      this.currentRow = row;
      this.modalForm.videoModel.src = row[column.key];
      this.isShow.videoModel = true;
    },
    clickAddBtn: function (title, type) {
      this.modal.infoModel.type = type ? type : "add";
      this.modal.infoModel.title = title ? title : "添加数据";
      this.isShow.infoModel = true;
    },
    clickEditBtn: function (row) {
      if (this.beforeEdit) {
        this.beforeEdit();
      }
      this.modal.infoModel.type = "edit";
      this.modal.infoModel.title = "修改数据";
      this.modalForm.infoModel = _.cloneDeep(row);
      this.isShow.infoModel = true;
    },
    getUploadUrl: function (data) {
      console.log(data);
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
    remove: function (row) {
      this.$Modal.confirm({
        title: "是否确认删除数据？",
        onOk: () => {
          remove([row.id]).then((result) => {
            this.$Message.success({
              content: "删除成功",
              duration: 2,
            });
            this.init();
          });
        },
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
      this.queryModel.id = " ";
      this.queryModel.shopName = " ";
      this.queryModel.goodName = " ";
      this.queryModel.informationName = " ";
      this.queryModel.userName = " ";
      this.queryModel.loginName = " ";
      this.queryModel.typeName = " ";
      this.queryTable();
    },
    cancelModal: function () {
      if (this.$refs.imageUpload && this.$refs.imageUpload[0]) {
        this.$refs.imageUpload[0].resetUpload();
      }
      this.isShow.infoModel = false;
      this.modalForm.infoModel = {};
    },
    download: function (url) {
      console.log(this.currentRow);
      saveAs(url, this.currentRow[this.downloadFileNameFiled]);
    },
  },
};
</script>

<style scoped>
.table-inline-button {
  margin-right: 5px;
}
</style>
