<template>
  <div class="app-container">
    <!-- 活动时间 -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item v-for="item in activityConfig.date" :label="item.desc" :key="item.item">
        <el-date-picker v-model="item.time" type="datetimerange"
          range-separator="至" start-placeholder="开始时间"
          end-placeholder="结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
    <!-- 活动控制 -->
    <el-form ref="form1" :model="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.region"
          placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期"
            v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间"
            v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <account-dialog :visible.sync="centerDialogVisible" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { DatePicker, Form, FormItem, Input, RadioGroup, Radio, CheckboxGroup, Checkbox, Switch, Col, Select, Option } from 'element-ui'
import { TreeData } from 'element-ui/types/tree'
import AccountDialog from './components/accountDialog.vue'
import { ActivityModule } from '@/store/modules/activity'

const ActivityConfig = require('@/static/activityConfig.json')
const activityName = ActivityModule.activityName || 'a20190414'

@Component({
  components: {
    AccountDialog
  }
})
export default class Tree extends Vue {
  private activityConfig = ActivityConfig[activityName]
  private centerDialogVisible = false
  private filterText = ''
  private data2 = []
  private defaultProps = {
    children: 'children',
    label: 'label'
  }
  private value4 = [
    new Date(2000, 10, 10, 10, 10),
    new Date(2000, 10, 11, 10, 10)
  ]
  private form = {
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: ''
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
}
</script>
