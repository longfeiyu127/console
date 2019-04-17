<template>
  <div class="app-container">
    <div class="box-center" ref="center" style="height: 100%; width:100%;">
      <div class="background">
        <img :src="activityConfig.bannerUrl" alt="背景">
      </div>
      <div class="lottery-content">
        <ul>
          <li v-for="(item, index) in phone" :key="index" :style="{color: activityConfig.mobileColor}">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { ActivityModule } from '@/store/modules/activity'
const ActivityConfig = require('@/static/activityConfig.json')

export enum ActivityStatus {
  Unstart,
  Start,
  End
}

const debounce = (fn: any) => () => {
  clearTimeout(fn.timer)
  fn.timer = setTimeout(fn, 300)
}

let setCenter: any = null

@Component
export default class Screen extends Vue {
  private activityConfig = ActivityConfig[ActivityModule.activityName || 'a20190414']
  private phone = ['1', '8', '8', '*', '*', '*', '*', '8', '8', '8', '8']
  private status = '0'
  /**
   * const activity = this.$route.query.activity || 'a20190414'
    const activityConfig = config[activity]
    return {
      activityConfig,
      activity,
      phone: ['1', '8', '8', '*', '*', '*', '*', '8', '8', '8', '8'],
      status: '0'
    }
   */
  private setCenterHW() {
    console.log('窗口变化')
    const { clientWidth, clientHeight } = document.documentElement
    const center: any = this.$refs.center
    const ratio = 1792 / 1024
    if (clientWidth / clientHeight > ratio) {
      center.style.width = `${clientHeight * ratio}px`
      center.style.height = `${clientHeight}px`
    } else {
      center.style.width = `${clientWidth}px`
      center.style.height = `${clientWidth / ratio}px`
    }
  }

  private created() {
    if (this.$route.path === '/activity/screen') {
      setCenter = debounce(this.setCenterHW)
      console.log(setCenter)
      setCenter()
      window.addEventListener('resize', setCenter)
    }
  }
  private destroyed() {
    window.removeEventListener('resize', setCenter)
  }
}
</script>

<style lang="scss" scoped>
.app-container{
  padding: 0px;
  height: 100%;
  width: 100%;
  background: #000;
  position: absolute;
  .box-center{
    height: 100%;
    width: 100%;
    // height: 1024px;
    // width: 1792px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .background{
    height: 100%;
    width: 100%;
    position: absolute;
    img{
      height: 100%;
      width: 100%;
    }
  }
  .lottery-content {
    margin: 0 auto;
    height: 100%;
    // width: 100%;
    .award {
      display: block;
      width: 42%;
      margin: 0 auto;
    }
    ul {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      left: 50%;
      top: 65%;
      transform: translate(-50%, -50%);
      li {
        list-style: none;
        margin: 0 0.3rem;
        font: 3rem "STYuanti-SC-Bold";
        padding: 0.02rem;
        height: 100%;
        line-height: 100%;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 0.04rem 0.04rem rgba(0, 0, 0, 0.2);
        position: relative;
        z-index: 1;
      }
      li:nth-child(4),
      li:nth-child(5),
      li:nth-child(6),
      li:nth-child(7) {
        margin: 0 0.015rem;
        font: 0.26rem "STYuanti-SC-Regular";
        height: 28%;
        line-height: 28%;
        background: none;
        color: #fff;
        position: relative;
        top: 0.04rem;
        box-shadow: none;
      }
      li:nth-child(7) {
        margin: 0 0.03rem;
      }
    }
  }
}
</style>
