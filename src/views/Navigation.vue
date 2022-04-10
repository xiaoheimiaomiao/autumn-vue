<!-- 菜单导航 -->
<template>
  <Layout style="height: 100%">
    <Header style="padding: 0">
      <div style="float: right; margin-right: 10px">
        <Dropdown @on-click="clickItem">
          <span style="color: #ffffff">{{ userInfo.loginUsername }}</span>
          <DropdownMenu slot="list">
            <DropdownItem name="personalInformation">个人中心</DropdownItem>
            <DropdownItem name="changePassword">修改密码</DropdownItem>
            <DropdownItem name="logout">退出系统</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </Header>
    <Layout style="background-color: #f5f6fa">
      <Sider
        style="height: 100%; background-color: #ffffff; padding: 10px"
        :width="300"
      >
        <Menu
          theme="light"
          class="menu"
          :active-name="activeName"
          @on-select="selectMenus"
        >
          <template v-for="(menu, index) in menusInfo">
            <Submenu
              @click.native="selectMenus(menu.path)"
              :name="menu.path"
              :key="index"
              v-if="menu.visible === '0'"
            >
              <template slot="title">
                <Icon :type="menu.icon" v-if="menu.icon !== '#'" />
                {{ menu["menuName"] }}
              </template>
              <template v-for="(ele, subIndex) in menu.children">
                <MenuItem
                  :name="ele.path"
                  :key="subIndex"
                  v-if="ele.visible === '0'"
                >
                  <Icon :type="ele.icon" v-if="ele.icon !== '#'" />
                  {{ ele["menuName"] }}
                </MenuItem>
              </template>
            </Submenu>
          </template>
        </Menu>
      </Sider>
      <Content style="height: 100%; background-color: #ffffff">
        <router-view style="background-color: #ffffff"></router-view>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import { getMenusInfo } from "@/api/system/menuApi";
import { getMenus } from "@/utils/menusUtils";

export default {
  name: "Navigation",
  data() {
    return {
      activeName: this.$route.path,
      userInfo: {
        avatarUrl: "",
        belongInfoId: "",
        loginUsername: "",
        password: "",
        realName: "",
        sex: 0,
        state: 0,
        sysUserId: 0,
        telephone: "",
        userNo: "",
      },
      menusInfo: [],
    };
  },
  created() {
    this.getUserInfo();
    this.getMenus();
  },
  methods: {
    getUserInfo() {
      const userInfo = this.$store.getters.userInfo;
      this.userInfo.loginUsername =
        userInfo.loginName === null ? "admin" : userInfo.loginName;
      this.userInfo.avatarUrl =
        userInfo.avatarUrl === null
          ? "https://i.loli.net/2017/08/21/599a521472424.jpg"
          : userInfo.avatarUrl;
    },
    getMenus() {
      getMenus().then((result) => {
        this.menusInfo = result;
        this.$router.push("/Home");
        console.log(this.menusInfo);
      });
    },
    selectMenus(path) {
      this.$router.push({ path });
    },
    clickItem(value) {
      switch (value) {
        case "personalInformation":
          this.$router.push("/personal/center");
          break;
        case "modifyPassword":
          break;
        case "logout":
          // this.$store.commit('CLEAR_USER_INFO')
          // this.$store.commit('CLEAR_ROLE_LIST')
          // this.$store.commit('CLEAR_TOKEN')
          this.$router.push({ path: "/" });
          break;
      }
    },
  },
};
</script>

<style>
.ivu-menu-light:after {
  height: 0 !important;
}

.ivu-btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 0 solid transparent;
  white-space: nowrap;
  line-height: 1.5;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 0;
  transition: color 0.2s linear, background-color 0.2s linear,
    border 0.2s linear, box-shadow 0.2s linear;
  color: #515a6e;
  background-color: #fff;
  border-color: #6699cc;
}
</style>

<style lang="less">
@import "../style/theme/global/index";

.ivu-menu-light {
  &.ivu-menu-vertical {
    .ivu-menu-item-active {
      &:not(.ivu-menu-submenu) {
        color: @menu-light-active-font-color;
        background: fade(@primary-color, 85%);
        z-index: 2;
        border-radius: 10px;
      }
    }
  }
}
.menu {
  /*默认显示滚动条，设置为白色看不出来*/
  overflow-y: scroll;
  height: 650px;
  width: 100%;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
.menu::-webkit-scrollbar {
  width: 10px;
  background-color: #fff;
}

/*定义滚动条轨道 内阴影+圆角*/
.menu:hover::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgb(255, 255, 255);
  border-radius: 10px;
  background-color: rgb(223, 223, 223);
}

/*定义滑块 内阴影+圆角*/
.menu:hover::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(12, 12, 12, 0.3);
  background-color: rgba(92, 92, 92, 0.304);
}
</style>

