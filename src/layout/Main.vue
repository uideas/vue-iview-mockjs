<template>
  <Layout class="layout">
    <SideView></SideView>
    <Layout class="right">
      <HeadView :UserData="UserData"></HeadView>
      <Content class="content">
        <BreadcrumbView></BreadcrumbView>
        <Content>
          <router-view/>
          <router-view name="helper"/>
        </Content>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import HeadView from "@/components/HeadView.vue";
import SideView from "@/components/SideView.vue";
import BreadcrumbView from "@/components/BreadcrumbView.vue";
import pathToRegexp from "path-to-regexp";
export default {
  components: {
    HeadView,
    SideView,
    BreadcrumbView
  },
  data() {
    return {
      UserData: {}
    };
  },
  methods: {
    // 获取登录用户信息
    getUserData() {
      this.UserData = this.$store.state.userInfo;
    }
  },
  created() {
    this.getUserData();
  }
};
</script>

<style scoped lang="less" scoped>
.layout {
  background: #f5f7f9;
  flex-direction: row;
  .right {
    height: 100vh;
  }
  .content {
    padding: 0 16px 16px;
    overflow: auto;
    height: 100vh;
  }
}
</style>
