<template>
  <div class="components-container">
    <div>
      <el-form>
        <el-form-item label="编辑模式" :label-width="formLabelWidth">
          <el-radio-group v-model="editorType">
            <el-radio :label="0">新增</el-radio>
            <el-radio :label="1">编辑</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <el-form>
        <el-form-item label="活动" :label-width="formLabelWidth" v-if="editorType === 1">
          <el-select v-model="activityID" filterable placeholder="请选择">
            <el-option
              v-for="item in ActivityList"
              :key="item.activityID"
              :label="item.name"
              :value="item.activityID">
            </el-option>
          </el-select>
        </el-form-item>
        <div v-else>
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="activityName"></el-input>
          </el-form-item>
          <el-form-item label="活动代号" :label-width="formLabelWidth">
            <el-input v-model="activityID"></el-input>
          </el-form-item>
        </div>
        <el-form-item :label-width="formLabelWidth">
          <el-button type="primary" @click.native="confirm">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="editor-container">
      <json-editor ref="jsonEditor" @input="oninput" v-model="value" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Form, FormItem, Input, Button, Select, Option, Message } from 'element-ui'
import JsonEditor from '@/components/JsonEditor/index.vue'
import { ActivityStatus } from './console.vue'
import $http from '@/api'

export enum EditorType {
  add,
  updata
}

@Component({
  components: { JsonEditor }
})
export default class ConfigEditor extends Vue {
  private formLabelWidth = '80px'
  private editorType: EditorType = 0
  private activityName: string = ''
  private activityID: string = ''
  private value: Object = {}
  private ActivityList: any[] = []
  private editorJson: any = {}

  @Watch('editorType')
  private onEditorType(val: EditorType) {
    if (val === EditorType.add) {
      this.activityName = ''
      this.activityID = ''
    }
  }
  @Watch('activityID')
  private onActivityID(val: string) {
    if (val === '') {
      this.value = {}
    } else {
      const activityItem = this.ActivityList.find((item: any) => item.activityID === val)
      if (activityItem) {
        this.value = JSON.parse(activityItem.config)
      }
      // this.value = this.ActivityList.find((item: any) => item.activityID === val)
    }
  }

  private oninput(value: any) {
    console.log(value)
    this.editorJson = value
  }

  private async confirm() {
    if (this.editorType === EditorType.add) {
      // 新增
      const data = {
        activityID: this.activityID,
        name: this.activityName,
        config: this.editorJson
      }
      const res = await $http.activity.createConfig(data)
      if (res.resCode === 0) {
        this.ActivityList.push(data)
        return Message({
          message: '新增成功',
          type: 'success',
          duration: 5 * 1000
        })
      }
    } else {
      // 修改
      const activityItem = this.ActivityList.find((item: any) => item.activityID === this.activityID)
      const data = {
        activityID: this.activityID,
        name: activityItem.name,
        config: this.editorJson
      }
      const res = await $http.activity.updateConfig(data)
      if (res.resCode === 0) {
        // this.ActivityList.push(data)
        return Message({
          message: '修改成功',
          type: 'success',
          duration: 5 * 1000
        })
      }
    }
  }

  private async created() {
    const res = await $http.activity.getActivityList()
    console.log(res)
    if (res.resCode !== 0) return
    this.ActivityList = res.resData
  }
}
</script>

<style lang="scss" scoped>
.editor-container{
  position: relative;
  height: 100%;
}
</style>
