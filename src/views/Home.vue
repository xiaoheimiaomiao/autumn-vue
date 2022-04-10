<template>
  <Layout style="height: 100%">
    <Carousel v-model="carousel" loop>
      <CarouselItem v-for="item in plates" :key="item.id">
        <img :src="item.shopLogo" alt="" style="height: 400px; width: 100%" />
        <div style="text-align: center">
          <h1>{{ item.shopName }}</h1>
        </div>
      </CarouselItem>
    </Carousel>
    <template style="padding-top: 100px">
      <h2>
        文字背后的刀光剑影，平凡深处的点滴心绪。拥抱文学，描绘青春，有你、有我！
      </h2>
      <div style="margin: auto auto; text-align: canter">
        <ul v-if="userInfo.loginName === '作品展示用户'">
          <h3 style="text-indent: 2em">
            欢迎来到 文学作品展示子系统，您可以使用以下功能：
          </h3>
          <li>
            <h4 style="display: inline-block; text-indent: 3em">图书展示：</h4>
            在这里您可以查找喜爱书籍，并将其加入<u>加入购物车</u>
          </li>
          <li>
            <h4 style="display: inline-block; text-indent: 3em">商家列表：</h4>
            在这里您可以查看平台所有店铺，进入店铺查找图书，也可以将喜爱的图书<u
              >加入购物车</u
            >
          </li>
          <li>
            <h4 style="text-indent: 3em">咨询商家：</h4>
            <h5 style="display: inline-block; text-indent: 5em">发起咨询：</h5>
            在这里您可以选择商家进行商品咨询<br />
            <h5 style="display: inline-block; text-indent: 5em">咨询结果</h5>
            您可以在这里查看咨询结果，并进行结果查询<br />
            <h5 style="display: inline-block; text-indent: 5em">评价商家</h5>
            您在进入店铺之后可以对商家进行评价，并可以删除，修改您所发布的评价
          </li>
          <li>
            <h4 style="display: inline-block; text-indent: 3em">个人中心</h4>
            您可以在这里修改个人信息，上传头像（我们会保护个人隐私，用户信息将统一加密处理）
          </li>
        </ul>
      </div>
    </template>
  </Layout>
</template>

<script>
import http from "@/utils/http";
import { showImages } from "@/api/system/uploadApi";

export default {
  name: "Home",
  data() {
    return {
      userInfo: {},
      carousel: 0,
      plates: [],
    };
  },
  created() {
    this.getPlates();
  },
  methods: {
    getPlates() {
      http.get("/Autumn/v1/private/shop/query", {}).then(({ data }) => {
        let rows = [...data];
        this.plates = [];
        rows.map((row) => {
          this.getImageShow(row.shopLogo).then((data) => {
            this.plates.push({
              shopLogo: data,
              shopName: row.shopName,
            });
          });
        });
      });
      this.userInfo = this.$store.getters.userInfo;
      // console.log(userInfo);
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
  },
};
</script>

<style scoped>
</style>
