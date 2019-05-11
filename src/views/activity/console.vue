<template>
  <div class="app-container">
    <div v-if="!centerDialogVisible">
      <form-title>设置活动时间</form-title>
      <!-- 活动时间 -->
      <activity-time />
      <!-- 活动控制 -->
      <form-title>抽奖</form-title>
      <div class="flex-box">
        <div class="flex-item">
          <el-form ref="form11" label-width="80px">
            <el-form-item>
              <el-button type="primary" @click="uploadVisible = true">上传中奖号码</el-button>
            </el-form-item>
            <el-form-item label="奖项">
              <el-radio-group v-model="prizeType">
                <el-radio v-for="item in activityConfig.awards" :label="item.key" :key="item.key">{{ item.name }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="lottery">抽奖</el-button>
              <el-button type="primary" @click="stopLottery">停止抽奖</el-button>
            </el-form-item>
            <el-form-item>
              <p>剩余抽奖次数 {{ remainTime }} 次</p>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="setRemainTime">重置抽奖次数</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="flex-item" @click="$router.push('/activity/screen')">
          <screen />
        </div>
      </div>
      <form-title>下载专区</form-title>
      <el-form ref="form2" label-width="80px">
        <el-form-item>
          <el-button type="primary" @click="downLoadSignList">下载签到表</el-button>
          <el-button type="primary" @click="downLoadgWonPrizes">下载大屏幕中奖清单</el-button>
          <el-button type="primary" @click="downLoadgAppWonPrizes">下载APP中奖清单</el-button>
        </el-form-item>
      </el-form>
    </div>
    <account-dialog :visible.sync="centerDialogVisible" />
    <upload-winning :visible.sync="uploadVisible" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Form, FormItem, Input, RadioGroup, Radio, CheckboxGroup, Checkbox, Switch, Col, Select, Option, Message } from 'element-ui'
import { TreeData } from 'element-ui/types/tree'
import FormTitle from '@/components/FormTitle/index.vue'
import AccountDialog from './components/accountDialog.vue'
import ActivityTime from './components/activityTime.vue'
import UploadWinning from './components/uploadWinning.vue'
import Screen from '@/views/activity/screen.vue'
import { parseTime } from '@/utils'
import { ActivityModule } from '@/store/modules/activity'
import $http from '@/api'

interface excelOption {
  multiHeader?: any[] | undefined,
  header: any,
  data: any,
  filename: any,
  merges?: any[] | undefined,
  autoWidth?: boolean | undefined,
  bookType?: string | undefined
}

/*
  multiHeader = [],
  header,
  data,
  filename,
  merges = [],
  autoWidth = true,
  bookType=  'xlsx'
*/

export enum ActivityStatus {
  NotStarted,
  Started,
  Finish
}

let Export2Excel: any = null

@Component({
  components: {
    ActivityTime,
    AccountDialog,
    UploadWinning,
    Screen,
    FormTitle
  }
})
export default class Console extends Vue {
  get activityConfig():any {
    // console.log(ActivityConfig[ActivityModule.activityName || 'a20190414'])
    // @ts-ignore
    return ActivityModule.ActivityConfig[ActivityModule.activityName || 'a20190414']
  }
  private centerDialogVisible = ActivityModule.activityName === ''
  private uploadVisible = false
  private prizeType = ''
  private remainTime = '5'
  private status: ActivityStatus = 0

  // @Watch('activityConfig.date', { deep: true })
  // private OnDate(val: any) {
  //   console.log(val)
  // }
  private created() {
    // console.log(ActivityModule)
    console.log('ActivityModule.activityName', ActivityModule.activityName)
    this.centerDialogVisible = ActivityModule.activityName === ''
  }

  get activityName() {
    return ActivityModule.activityName
  }

  @Watch('activityName', { immediate: true })
  private OnActivityName(val: string) {
    // console.log('activityName变化了', val)
    if (val) {
      this.initData()
    }
  }

  private initData() {
    // 查询抽奖状态
    this.getPrizeStatus()
    // 查询剩余抽奖次数
    this.getLotteryRemainTimes()
  }
  // 查询抽奖状态
  private async getPrizeStatus() {
    const res = await $http.activity.getPrizeStatus({ activityKey: ActivityModule.account.activityKey })
    console.log(res)
    if (res.resCode !== 0) return
    this.status = +res.resData.status
  }
  // 查询剩余抽奖次数
  private async getLotteryRemainTimes() {
    const res = await $http.activity.getLotteryRemainTimes({ ...ActivityModule.account })
    console.log(res)
    if (res.resCode !== 0) return
    this.remainTime = res.resData.remainTimes
  }

  private async downLoadSignList() {
    const res = await $http.activity.exportSignInList({ activityKey: ActivityModule.account.activityKey })
    console.log(res)
    if (res.resCode !== 0) return
    const { list } = res.resData
    console.log(list)
    const tHeader = ['签到号码', '签到时间']
    const filterVal = ['phone', 'createdDate']
    const data = this.formatJson(filterVal, list)
    console.log(data)
    this.downloadExcel({
      header: tHeader, // 表头 必填
      data, // 具体数据 必填
      filename: '签到表', // 非必填
      autoWidth: true, // 非必填
      bookType: 'xlsx' // 非必填
    })
  }

  private async downLoadgWonPrizes() {
    const res = await $http.activity.getWonPrizes({ ...ActivityModule.account })
    console.log(res)
    if (res.resCode !== 0) return
    const { list } = res.resData
    console.log(list)
    const tHeader = ['奖项', '手机号', '中奖时间']
    const filterVal = ['prizeType', 'phone', 'winTime']
    const data = this.formatJson(filterVal, list)
    console.log(data)
    this.downloadExcel({
      header: tHeader, // 表头 必填
      data, // 具体数据 必填
      filename: '大屏幕中奖清单', // 非必填
      autoWidth: true, // 非必填
      bookType: 'xlsx' // 非必填
    })
  }

  private async downLoadgAppWonPrizes() {
    const res = await $http.activity.getAppDrawWonPrizes({ ...ActivityModule.account })
    console.log(res)
    if (res.resCode !== 0) return
    const { list } = res.resData
    console.log(list)
    const tHeader = ['奖项', '手机号', '中奖时间']
    const filterVal = ['prizeType', 'phone', 'winTime']
    const data = this.formatJson(filterVal, list)
    console.log(data)
    this.downloadExcel({
      header: tHeader, // 表头 必填
      data, // 具体数据 必填
      filename: 'APP中奖清单', // 非必填
      autoWidth: true, // 非必填
      bookType: 'xlsx' // 非必填
    })
  }

  private downloadExcel(opotions: excelOption) {
    if (Export2Excel) {
      Export2Excel.export_json_to_excel(opotions)
    } else {
      // @ts-ignore
      import('@/vendor/Export2Excel.js').then(excel => {
        // console.log(excel)
        Export2Excel = excel
        // @ts-ignore
        excel.export_json_to_excel(opotions)
      })
    }
  }

  private formatJson(filterVal: any[], jsonData: any[]) {
    return jsonData.map((v: any) => filterVal.map(j => {
      if (j === 'timestamp') {
        return parseTime(v[j])
      } else {
        return v[j]
      }
    }))
  }

  private onSubmit() {
    console.log('提交')
    const a = ActivityModule.ActivityConfig
    console.log(a)
    console.log(this.activityConfig)
  }
  // 点击抽奖
  private async lottery() {
    console.log(this.status)
    if (this.status !== 1) {
      if (this.prizeType) {
        const res = await $http.activity.startLottery({ ...ActivityModule.account, prizeType: this.prizeType })
        console.log(res)
        if (res.resCode !== 0) return
        Message({
          message: '开始抽奖',
          type: 'success',
          duration: 5 * 1000
        })
      } else {
        Message({
          message: '请先选择抽奖类型',
          type: 'error',
          duration: 5 * 1000
        })
      }
      console.log(this.prizeType)
    } else {
      Message({
        message: '正在抽奖，请先停止抽奖',
        type: 'error',
        duration: 5 * 1000
      })
    }
  }
  // 停止抽奖
  private async stopLottery() {
    if (this.status === 1) {
      const res = await $http.activity.stopLottery({ ...ActivityModule.account })
      console.log(res)
      if (res.resCode !== 0) return
      this.remainTime = res.resData.remainTimes
      Message({
        message: '抽奖成功',
        type: 'success',
        duration: 5 * 1000
      })
    } else {
      Message({
        message: '抽奖未开始，请先开始抽奖',
        type: 'error',
        duration: 5 * 1000
      })
    }
  }
  // 重置抽奖次数
  private async setRemainTime() {
    const res = await $http.activity.setLotteryRemainTimes({ ...ActivityModule.account })
    console.log(res)
    if (res.resCode !== 0) return
    this.remainTime = res.resData.remainTimes
    Message({
      message: '重置成功',
      type: 'success',
      duration: 5 * 1000
    })
  }

  private async beforeRouteEnter(to: Route, form: Route, next: () => void) {
    console.log(JSON.parse(JSON.stringify(ActivityModule.ActivityConfig)))
    if (ActivityModule.ActivityConfig) {
      next()
    } else {
      const res = await $http.activity.getActivityList()
      if (res.resCode !== 0) return next()
      let data: any = {}
      res.resData.map((item: any): void => {
        data[item.activityID] = JSON.parse(item.config)
      })
      console.log(JSON.parse(JSON.stringify(data)))
      ActivityModule.setActivityConfig(data)
      next()
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-box{
  display: flex;
  .flex-item{
    flex: 1;
    position: relative;
  }
}
</style>
