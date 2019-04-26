<template>
  <div class="components-container board">
    <Kanban :key="1" :list="list1" :group="group" class="kanban todo" header-text="Todo">
      <div v-for="element in list1" :key="element.id" class="board-item">
        {{ element.name }} {{ element.id }}
      </div>
    </Kanban>
    <Kanban :key="2" :list="list2" :group="group" class="kanban working" header-text="Working">
      <div v-for="element in list2" :key="element.id" class="board-item">
        {{ element.name }} {{ element.id }}
      </div>
    </Kanban>
    <Kanban :key="3" :list="list3" :group="group" class="kanban done" header-text="Done">
      <div v-for="element in list3" :key="element.id" class="board-item">
        <span>{{ element.name }} {{ element.id }}</span>
        <div class="handle">
          <el-button type="primary" @click.native="confirm(element.id)">操作</el-button>
        </div>
      </div>
    </Kanban>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Button } from 'element-ui'
import Kanban from '@/components/Kanban/index.vue'

@Component({
  components: {
    Kanban
  }
})
export default class sitePermission extends Vue {
  private group = 'mission'
  private list1 = [
    { name: 'Mission', id: 1 },
    { name: 'Mission', id: 2 },
    { name: 'Mission', id: 3 },
    { name: 'Mission', id: 4 }
  ]
  private list2 = [
    { name: 'Mission', id: 5 },
    { name: 'Mission', id: 6 },
    { name: 'Mission', id: 7 }
  ]
  private list3 = [
    { name: 'Mission', id: 8 },
    { name: 'Mission', id: 9 },
    { name: 'Mission', id: 10 }
  ]

  private confirm(id: any) {
    console.log(id)
  }
}
</script>

<style lang="scss">
.board {
  width: 1000px;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
  padding-top: 50px;
}
.kanban {
  &.todo {
    .board-column-header {
      background: #4A9FF9;
    }
  }
  &.working {
    .board-column-header {
      background: #f9944a;
    }
  }
  &.done {
    .board-column-header {
      background: #2ac06d;
    }
  }
}

.board-item {
  cursor: pointer;
  width: 100%;
  height: 64px;
  margin: 5px 0;
  background-color: #fff;
  text-align: left;
  line-height: 54px;
  padding: 5px 10px;
  box-sizing: border-box;
  box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .handle{
    // height: 24px;
  }
}
</style>
