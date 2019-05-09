<template>
  <el-dialog
    title="添加站点"
    :visible.sync="dialogVisible"
    width="30%"
    center>
    <div>
      <el-form>
        <el-form-item label="功能名称" :label-width="formLabelWidth">
          <el-input v-model="account.oprAccount"></el-input>
        </el-form-item>
        <el-form-item label="上线时间" :label-width="formLabelWidth">
          <el-input v-model="account.oprAccount"></el-input>
        </el-form-item>
        <el-form-item label="链接" :label-width="formLabelWidth">
          <el-input v-model="account.oprAccount"></el-input>
        </el-form-item>
        <el-form-item label="开发/维护" :label-width="formLabelWidth">
          <el-input v-model="account.oprAccount"></el-input>
        </el-form-item>
        <el-form-item label="上线状态" :label-width="formLabelWidth">
          <el-select v-model="account.activityKey" placeholder="请选择活动">
            <el-option v-for="item in selectData" :label="item.name" :value="item.activityKey" :key="item.activityKey"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="account.password"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button type="primary" @click.native="confirm">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Form, FormItem, Input, Button } from 'element-ui'
import { ActivityModule } from '@/store/modules/activity'
import $http from '@/api'

@Component({
  name: 'AddDialog'
})
export default class AccountDialog extends Vue {
  @Prop({ required: true }) private visible!: boolean

  private selectData: any[] = []
  private dialogVisible = false
  private formLabelWidth = '75px'
  private account = {
    oprAccount: '13100000001',
    password: 'emhhb3NoYW5nMTg3MnNpbmNlMTg3MmNtcmg=',
    activityKey: ''
  }

  private async confirm() {
    // console.log(this.account)
    // const res = await $http.activity.oprlogin(this.account)
    // console.log(res)
    // if (res.resCode === 0) {
    //   console.log(this.account)
    //   ActivityModule.setAccount(this.account)
    //   ActivityModule.setActivityName(this.selectData.filter((item: any) => item.activityKey === this.account.activityKey)[0].item || '')
    //   this.dialogVisible = false
    // }
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

  created() {
    // const ActivityConfigKeys = Object.keys(ActivityModule.ActivityConfig)
    // const selectData = ActivityConfigKeys.map((item: any) => {
    //   return {
    //     item,
    //     name: ActivityModule.ActivityConfig[item].name,
    //     activityKey: ActivityModule.ActivityConfig[item].activityKey
    //   }
    // })
    // this.selectData = selectData
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
