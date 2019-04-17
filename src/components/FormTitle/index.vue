<template>
  <p class="form-title"><slot /></p>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class FormTitle extends Vue {
}
</script>

<style lang="scss" scoped>
.form-title{
  background: #eef1f6;
  padding: 8px 24px;
  margin-bottom: 20px;
  border-radius: 2px;
  display: block;
  line-height: 32px;
  font-size: 16px;
  font-weight: 600;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
}
</style>
