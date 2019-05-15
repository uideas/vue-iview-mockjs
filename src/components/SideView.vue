<template>
  <Sider class="sider">
    <div class="logo">
      <img :src="Logo">
    </div>
    <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']" accordion>
      <template v-for="item in menus">
        <Submenu v-if="item.children.length" :name="item.id" :key="item.id">
          <template slot="title">
            <Icon :type="item.icon"/>
            {{ item.name }}
          </template>
          <template v-for="sub in item.children">
            <router-link :key="sub.id" :to="{name: sub.id}">
              <MenuItem :name="sub.id" :key="sub.id">{{ sub.name }}</MenuItem>
            </router-link>
          </template>
        </Submenu>
        <template v-else>
          <router-link :key="item.id" :to="{name: item.id}">
            <MenuItem :name="item.id">
              <Icon :type="item.icon"/>
              {{ item.name }}
            </MenuItem>
          </router-link>
        </template>
      </template>
    </Menu>
  </Sider>
</template>

<script>
import Logo from "@/assets/logo.png";
export default {
  data() {
    return {
      menus: [],
      Logo: Logo
    };
  },
  methods: {
    initMenuData() {
      this.$router.options.routes.forEach(menu => {
        let menuObj = {};
        if (menu.meta && menu.meta.isMenu) {
          menuObj.id = menu.name;
          menuObj.name = menu.meta.name;
          menuObj.route = menu.path;
          menuObj.icon = menu.meta.icon;
          menuObj.children = [];
          if (menu.children.length) {
            menu.children.forEach(child => {
              let childObj = {};
              if (child.meta && child.meta.isMenu) {
                childObj.id = child.name;
                childObj.name = child.meta.name;
                childObj.route = child.path;
                menuObj.children.push(childObj);
              }
            });
          }
          this.menus.push(menuObj);
        }
      });
    }
  },
  mounted() {
    this.initMenuData();
  }
};
</script>

<style lang="less" scoped>
.sider {
  position: relative;
  height: 100vh;
  overflow: auto;
}
.logo {
  color: #fff;
  padding: 20px 0 20px 0;
  text-align: center;
  img {
    width: 70px;
    background-color: #fff;
    padding: 1px;
    border: 1px solid #eee;
    border-radius: 35px;
  }
}
</style>
