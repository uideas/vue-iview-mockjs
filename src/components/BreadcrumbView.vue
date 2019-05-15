<template>
  <Breadcrumb class="bread">
    <BreadcrumbItem to="/" key="index">Home</BreadcrumbItem>
    <BreadcrumbItem v-for="(item, index) in $route.matched" :key="index">{{item.name}}</BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
export default {};
</script>
<style lang="less" scpoed>
.bread {
  margin: 16px 0;
}
</style>
