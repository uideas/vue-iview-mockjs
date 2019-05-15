<template>
  <Header class="header">
    <h2 class="left">{{Title}}</h2>
    <Content class="right">
      <Badge dot class="notification">
        <Icon type="ios-notifications-outline" size="26" :count="Notification.Count"></Icon>
      </Badge>
      <Dropdown placement="bottom-end">
        <a href="javascript:void(0)">
          <Avatar class="avatar" :src="UserData.Avatar"/>
          {{UserData.Name}}
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem>Personal Prefile</DropdownItem>
          <DropdownItem divided>Sign Out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Content>
  </Header>
</template>

<script>
export default {
  props: {
    UserData: Object
  },
  data() {
    return {
      Title: "VUE_CLI3_IVIEW MANAGMENT",
      Notification: {
        Count: 0
      }
    };
  },
  methods: {
    GetNotificationData() {
      this.axios.get(this.$API.GET_NOTIFICATION_COUNT).then(res => {
        this.Notification.Count = res.Count;
      });
    }
  },
  created() {
    this.GetNotificationData();
  }
};
</script>

<style lang="less" scoped>
.header {
  background: #fff;
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  .left {
    font-size: 20px;
    color: #333333;
  }
  .right {
    justify-content: flex-end;
    align-items: center;
    display: flex;
    .notification {
      line-height: 26px;
      margin-right: 30px;
      cursor: pointer;
    }
    .avatar {
      margin-right: 5px;
    }
  }
}
</style>
