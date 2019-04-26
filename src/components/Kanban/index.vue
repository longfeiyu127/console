<template>
  <div class="board-column">
    <div class="board-column-header">
      {{ headerText }}
    </div>
    <draggable
      :list="list"
      v-bind="$attrs"
      class="board-column-content"
      :set-data="setData"
    >
      <slot />
      <!-- <div v-for="element in list" :key="element.id" class="board-item">
        {{ element.name }} {{ element.id }}
      </div> -->
    </draggable>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
// @ts-ignore
import draggable from 'vuedraggable'

@Component({
  name: 'Kanban',
  components: {
    draggable
  }
})
export default class Kanban extends Vue {
  @Prop({ default: 'Header' }) private headerText!: string
  @Prop({ default() { return {} } }) private options!: Object
  @Prop({ default: [] }) private list!: any[]

  private setData(dataTransfer: any) {
    // to avoid Firefox bug
    // Detail see : https://github.com/RubaXa/Sortable/issues/1012
    dataTransfer.setData('Text', '')
  }
}
</script>

<style lang="scss" scoped>
.board-column {
  min-width: 300px;
  min-height: 100px;
  height: auto;
  overflow: hidden;
  background: #f0f0f0;
  border-radius: 3px;

  .board-column-header {
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    padding: 0 20px;
    text-align: center;
    background: #333;
    color: #fff;
    border-radius: 3px 3px 0 0;
  }

  .board-column-content {
    height: auto;
    overflow: hidden;
    border: 10px solid transparent;
    min-height: 60px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
  }
}
</style>
