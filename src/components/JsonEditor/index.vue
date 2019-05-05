<template>
  <div class="json-editor">
    <textarea ref="textarea" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/rubyblue.css'
require('script-loader!jsonlint')
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'

@Component
export default class ConfigEditor extends Vue {
  @Prop({ default() { return {} } }) private value!: Object

  private jsonEditor: any = false

  @Watch('value')
  private OnValue(value: any) {
    const editorValue = this.jsonEditor.getValue()
    if (value !== editorValue) {
      this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
    }
  }

  private async getValue() {
    return this.jsonEditor.getValue()
  }

  private mounted() {
    // @ts-ignore
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      mode: 'application/json',
      gutters: ['CodeMirror-lint-markers'],
      theme: 'rubyblue',
      lint: true
    })

    this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
    this.jsonEditor.on('change', (cm: any) => {
      this.$emit('changed', cm.getValue())
      this.$emit('input', cm.getValue())
    })
  }
}
</script>

<style scoped>
.json-editor{
  height: 100%;
  position: relative;
}
.json-editor >>> .CodeMirror {
  height: auto;
  min-height: 150px;
}
.json-editor >>> .CodeMirror-scroll{
  min-height: 150px;
}
.json-editor >>> .cm-s-rubyblue span.cm-string {
  color: #F08047;
}
</style>
