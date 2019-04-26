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
        <span>{{ scope.row.id }}</span>
      </template>
    </el-table-column>

    <el-table-column width="100px" align="center" label="上线时间">
      <template slot-scope="scope">
        <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="200px" align="center" label="链接">
      <template slot-scope="{row}">
        <span>{{ row.title }}</span>
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
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>

    <el-table-column align="center" label="备注" width="95">
      <template slot-scope="scope">
        <span>{{ scope.row.pageviews }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Table, TableColumn, Tag, Button } from 'element-ui'
import { fetchList } from '@/api/article'
import { parseTime } from '@/utils'

@Component({
  name: 'SiteTab',
  filters: {
    parseTime,
    statusFilter(status: string) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      // @ts-ignore
      return statusMap[status]
    }
  }
})
export default class SiteTab extends Vue {
  @Prop({ default: 'CN' }) private type!: string
  private list = []
  private listQuery = {
    page: 1,
    limit: 5,
    type: this.type,
    sort: '+id'
  }
  private loading = false

  private getList() {
    this.loading = true
    this.$emit('create') // for test
    fetchList(this.listQuery).then((response): any => {
      console.log(response)
      this.list = response.data.items
      this.loading = false
    })
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
