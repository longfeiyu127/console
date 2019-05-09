<template>
  <div class="dashboard-container">
    <div class="dashboard-text">姓名:{{ userData.name }}</div>
    <div class="dashboard-text">公司:{{ userData.company }}</div>
    <div class="dashboard-text">
      身份:<span v-for="role in userData.roles" :key="role">{{ role }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'

@Component
export default class Dashboard extends Vue {
  get userData() {
    return UserModule.userData
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
