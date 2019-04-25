<template>
  <el-form ref="form" label-width="80px">
    <el-form-item v-for="item in date" :label="item.desc" :key="item.item">
      <el-date-picker v-model="item.time" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
        range-separator="至" start-placeholder="开始时间"
        end-placeholder="结束时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="confirm">设置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form, FormItem, DatePicker, Button, Message } from 'element-ui'
import { ActivityModule } from '@/store/modules/activity'
import $http from '@/api'
const ActivityConfig = require('@/static/activityConfig.json')
const ActivityConfigKeys = Object.keys(ActivityConfig)
const selectData = ActivityConfigKeys.map(item => {
  return {
    item,
    name: ActivityConfig[item].name,
    activityKey: ActivityConfig[item].activityKey
  }
})

interface ActivityTimeConfig {
  activityKey: string,
  item: string,
  startTime: string,
  endTime: string,
  oprAccount: string,
  password: string
}

@Component({
  name: 'ActivityTime'
})
export default class ActivityTime extends Vue {
  get date():any {
    // console.log(ActivityConfig[ActivityModule.activityName || 'a20190414'])
    const date = ActivityConfig[ActivityModule.activityName || 'a20190414'].date.map((item: any) => {
      if (!item.time) {
        item.time = [
          item.startTime,
          item.endTime
        ]
      }
      return item
    })
    // console.log(date)
    return date
  }

  private async confirm() {
    console.log(this.date)
    this.date.map(async(item: any) => {
      // const time
      /** 2019-04-14 14:00:00 */
      const data: ActivityTimeConfig = {
        ...ActivityModule.account,
        item: item.item,
        startTime: item.time[0],
        endTime: item.time[1]
      }
      // console.log(data)
      const res = await $http.activity.setActivityTimeConfig(data)
      if (res.resCode === 0) {
        Message({
          message: '设置成功',
          type: 'success',
          duration: 5 * 1000
        })
      }
    })
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
