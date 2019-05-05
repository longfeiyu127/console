<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <router-view />
    </transition>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class AppMain extends Vue {}
</script>

<style lang="scss" scoped>
.app-main {
  overflow: hidden;
  min-height: calc(100vh - 50px);
}
</style>
