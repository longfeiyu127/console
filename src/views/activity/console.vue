<template>
  <div class="app-container">
    <form-title>设置活动时间</form-title>
    <!-- 活动时间 -->
    <el-form ref="form" label-width="80px">
      <el-form-item v-for="item in date" :label="item.desc" :key="item.item">
        <el-date-picker v-model="item.time" type="datetimerange"
          range-separator="至" start-placeholder="开始时间"
          end-placeholder="结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">设置</el-button>
      </el-form-item>
    </el-form>
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
          </el-form-item>
          <el-form-item>
            <p>剩余抽奖次数 5 次</p>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">重置抽奖次数</el-button>
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
        <el-button type="primary" @click="uploadVisible = true">下载签到表</el-button>
        <el-button type="primary" @click="uploadVisible = true">下载大屏幕中奖清单</el-button>
        <el-button type="primary" @click="uploadVisible = true">下载APP中奖清单</el-button>
      </el-form-item>
    </el-form>
    <account-dialog :visible.sync="centerDialogVisible" />
    <upload-winning :visible.sync="uploadVisible" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { DatePicker, Form, FormItem, Input, RadioGroup, Radio, CheckboxGroup, Checkbox, Switch, Col, Select, Option } from 'element-ui'
import { TreeData } from 'element-ui/types/tree'
import FormTitle from '@/components/FormTitle/index.vue'
import AccountDialog from './components/accountDialog.vue'
import UploadWinning from './components/uploadWinning.vue'
import Screen from '@/views/activity/screen.vue'
import { ActivityModule } from '@/store/modules/activity'

const ActivityConfig = require('@/static/activityConfig.json')

@Component({
  components: {
    AccountDialog,
    UploadWinning,
    Screen,
    FormTitle
  }
})
export default class Tree extends Vue {
  get activityConfig():any {
    console.log(ActivityConfig[ActivityModule.activityName || 'a20190414'])
    return ActivityConfig[ActivityModule.activityName || 'a20190414']
  }
  get date():any {
    console.log(ActivityConfig[ActivityModule.activityName || 'a20190414'])
    const date = ActivityConfig[ActivityModule.activityName || 'a20190414'].date.map((item: any) => {
      if (!item.time) {
        item.time = [
          new Date(item.startTime),
          new Date(item.endTime)
        ]
      }
      return item
    })
    console.log(date)
    return date
  }
  private centerDialogVisible = false
  private uploadVisible = false
  private prizeType = ''

  @Watch('activityConfig.date', { deep: true })
  private OnDate(val: any) {
    console.log(val)
  }
  private created() {
    console.log(ActivityModule)
    console.log(ActivityModule.activityName)
    if (ActivityModule.activityName === '') {
      console.log(ActivityModule)
      this.centerDialogVisible = true
    }
  }

  private filterNode(value: string, data: TreeData) {
    if (!value) {
      return true
    }
    return data.label && data.label.indexOf(value) !== -1
  }
  private onSubmit() {
    console.log('提交')
    const a = ActivityConfig
    console.log(a)
    console.log(this.activityConfig)
    // console.log(ActivityConfig)
  }
  // 点击抽奖/停止
  private lottery() {
    console.log(this.prizeType)
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
