<template>
  <el-table :data="list" border fit highlight-current-row style="width: 100%">
    <el-table-column
      v-loading="loading"
      align="center"
      label="功能名称"
      width="180px"
      element-loading-text="请给我点时间！"
    >
      <template slot-scope="scope">
        <span>{{ scope.row.name }}</span>
      </template>
    </el-table-column>

    <el-table-column width="100px" align="center" label="上线时间">
      <template slot-scope="scope">
        <span>{{ scope.row.display_time | parseTime('{y}-{m}-{d}') }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="200px" align="center" label="链接">
      <template slot-scope="{row}">
        <span>{{ row.link }}</span>
        <!-- <el-tag>{{ row.type }}</el-tag> -->
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="开发/维护">
      <template slot-scope="scope">
        <span>{{ scope.row.author }}</span>
      </template>
    </el-table-column>

    <!-- <el-table-column width="120px" label="Importance">
      <template slot-scope="scope">
        <svg-icon v-for="n in 5" :key="n" icon-class="star" />
      </template>
    </el-table-column> -->

    <el-table-column class-name="status-col" align="center" label="上线状态" width="110">
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter">
          {{ row.status | statusFilterInfo }}
        </el-tag>
      </template>
    </el-table-column>

    <el-table-column class-name="status-col" align="center" label="操作" width="110">
      <template slot-scope="{row}">
        <el-button type="primary" @click.native="modify(row)">修改</el-button>
      </template>
    </el-table-column>

    <el-table-column align="center" label="备注" width="95">
      <template slot-scope="scope">
        <span>{{ scope.row.remark }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Table, TableColumn, Tag, Button } from 'element-ui'
import $http from '@/api'
import { parseTime } from '@/utils'

@Component({
  name: 'SiteTab',
  filters: {
    parseTime,
    statusFilter(status: string) {
      const statusMap = {
        '0': 'danger',
        '1': 'info',
        '2': 'success'
      }
      // @ts-ignore
      return statusMap[status]
    },
    statusFilterInfo(status: string) {
      const statusMap = {
        '0': '未上线',
        '1': '预发布',
        '2': '已上线'
      }
      // @ts-ignore
      return statusMap[status]
    }
  }
})
export default class SiteTab extends Vue {
  @Prop({ default: 'policyQuery' }) private type!: string
  private list = []
  private listQuery = {
    page: 1,
    limit: 5,
    type: this.type,
    sort: '+id'
  }
  private loading = false

  private async getList() {
    this.loading = true
    this.$emit('create') // for test
    const res = await $http.site.sitemap({type: this.type})
    console.log(res)
    this.list = res.resData
    this.loading = false
    // fetchList(this.listQuery).then((response): any => {
    //   console.log(response)
    //   this.list = response.data.items
    //   this.loading = false
    // })
  }

  private async modify(item: any) {

  }

  /**
   * @Emit()
  returnValue() {
    return 10
  }
   */

  private created() {
    this.getList()
  }
}
</script>
