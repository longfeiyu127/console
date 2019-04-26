<template>
  <div class="tab-container">
    <el-tag>mounted times ：{{ createdTimes }}</el-tag>
    <el-alert :closable="false" style="width:200px;display:inline-block;vertical-align: middle;margin-left:30px;" title="Tab with keep-alive" type="success" />
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.index" :label="item.label" :name="item.key">
        <keep-alive>
          <site-tab v-if="activeName===item.key" :type="item.key" @create="showCreatedTimes" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import SiteTab from './components/siteTab.vue'

@Component({
  components: {
    SiteTab
  }
})
export default class Sitemap extends Vue {
  private tabMapOptions = [
    { label: '保单查询', key: 'CN' },
    { label: '保单服务', key: 'US' },
    { label: '个险理赔', key: 'JP' },
    { label: '团险理赔', key: 'JP1' },
    { label: '活动相关', key: 'JP2' },
    { label: '增值服务', key: 'JP3' },
    { label: '附加功能', key: 'JP4' },
    { label: '用户', key: 'JP5' },
    { label: '产品', key: 'EU' }
  ]
  private activeName = 'CN'
  private createdTimes = 0

  private showCreatedTimes() {
    this.createdTimes = this.createdTimes + 1
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
</style>
