<template>
<el-dialog title="上传抽奖号码" :visible.sync="dialogVisible" width="800px">
  <UploadExcel :on-success="handleSuccess" />
  <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
    <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
  </el-table>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </div>
</el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Form, FormItem, Input, Button } from 'element-ui'
import UploadExcel from '@/components/UploadExcel/index.vue'
import { ActivityModule } from '@/store/modules/activity'

@Component({
  components: {
    UploadExcel
  }
})
export default class uploadWinning extends Vue {
  @Prop({ required: true }) private visible!: boolean
  private dialogVisible = false
  private formLabelWidth = '60px'
  private tableData = []
  private tableHeader = []

  private handleSuccess({ results, header }: any) {
    this.tableData = results
    this.tableHeader = header
  }
  @Watch('dialogVisible')
  private OnDialogVisible(val: boolean) {
    console.log('bianhua', val)
    if (val !== this.visible) {
      this.$emit('update:visible', val)
    }
  }
  @Watch('visible', { immediate: true })
  private OnVisible(val: boolean) {
    if (val !== this.dialogVisible) {
      this.dialogVisible = val
    }
  }
}
</script>

<style lang="scss">
@import 'src/styles/variables.scss';

.el-submenu.is-active > .el-submenu__title {
  color: $subMenuActiveText !important;
}

.full-mode {
  .nest-menu .el-submenu > .el-submenu__title,
  .el-submenu .el-menu-item {
    background-color: $subMenuBg !important;

    &:hover {
      background-color: $subMenuHover !important;
    }
  }
}

.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding-left: 10px !important;
      position: relative;

      .el-tooltip {
        padding: 0 10px !important;
      }
    }

    .el-submenu {
      overflow: hidden;

      & > .el-submenu__title {
        padding-left: 10px !important;

        .el-submenu__icon-arrow {
          display: none;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.svg-icon {
  margin-right: 16px;
}
</style>
