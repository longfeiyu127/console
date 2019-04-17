<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="Filter keyword"
      style="margin-bottom:30px;"
    />
    <el-tree
      ref="tree2"
      @node-click="nodeClick"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Tree as ElTree } from 'element-ui'
import { TreeData } from 'element-ui/types/tree'

@Component
export default class Sitemap extends Vue {
  private filterText = ''
  private data2 = [
    {
      id: 1,
      label: 'claim',
      children: [
        {
          id: 4,
          label: 'question',
          children: [
            {
              id: 9,
              label: 'document'
            },
            {
              id: 91,
              label: 'prePdf'
            },
            {
              id: 10,
              label: 'guide'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      label: 'auxiliary',
      children: [
        {
          id: 5,
          label: 'familyMember',
          children: [
            {
              id: 45,
              label: 'familyMemberList'
            },
            {
              id: 921,
              label: 'familyMemberDetail'
            },
            {
              id: 101,
              label: 'familyMemberModifyInfo'
            }
          ]
        },
        {
          id: 6,
          label: 'Level two 2-2'
        }
      ]
    },
    {
      id: 3,
      label: 'claimIndividual',
      children: [
        {
          id: 7,
          label: 'report'
        },
        {
          id: 8,
          label: 'apply'
        }
      ]
    }
  ]
  private defaultProps = {
    children: 'children',
    label: 'label'
  }

  @Watch('filterText')
  private onFilterTextChange(val: string) {
    (this.$refs.tree2 as ElTree).filter(val)
  }

  private nodeClick(data: any) {
    console.log(data)
  }

  private filterNode(value: string, data: TreeData) {
    if (!value) {
      return true
    }
    return data.label && data.label.indexOf(value) !== -1
  }
}
</script>
