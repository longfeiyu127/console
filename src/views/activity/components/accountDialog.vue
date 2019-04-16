<template>
  <el-dialog
    title="验证信息"
    :visible.sync="dialogVisible"
    width="30%"
    center>
    <div>
      <el-form>
        <el-form-item label="活动" :label-width="formLabelWidth">
          <el-select v-model="account.activityKey" placeholder="请选择活动">
            <el-option v-for="item in selectData" :label="item.name" :value="item.activityKey" :key="item.activityKey"></el-option>
            <!-- <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="account.oprAccount" :maxlength="13"></el-input>
        </el-form-item>
        <el-form-item label="口令" :label-width="formLabelWidth">
          <el-input v-model="account.password"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Form, FormItem, Input, Button } from 'element-ui'
import { ActivityModule } from '@/store/modules/activity'
const ActivityConfig = require('@/static/activityConfig.json')
const ActivityConfigKeys = Object.keys(ActivityConfig)
const selectData = ActivityConfigKeys.map(item => {
  return {
    name: ActivityConfig[item].name,
    activityKey: ActivityConfig[item].activityKey
  }
})

@Component({
  // Set 'name' here to prevent uglifyjs from causing recursive component not work
  // See https://medium.com/haiiro-io/element-component-name-with-vue-class-component-f3b435656561 for detail
  name: 'AccountDialog'
})
export default class AccountDialog extends Vue {
  @Prop({ required: true }) private visible!: boolean
  @Prop({ default: false }) private isNest!: boolean
  @Prop({ default: false }) private collapse!: boolean
  @Prop({ default: '' }) private basePath!: string

  private selectData = selectData
  private dialogVisible = false
  private formLabelWidth = '60px'
  private account = {
    oprAccount: '',
    password: '',
    activityKey: ''
  }

  private confirm() {
    console.log(this.account)
    ActivityModule.setAccount(this.account)
    // ActivityModule.setActivityName(this.account)
    this.dialogVisible = false
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
