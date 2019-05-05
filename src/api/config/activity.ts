export default {
  oprlogin: {
    url: '/ols/activity/vip/oprlogin'
  },
  /** 控制抽奖 */
  // 开始抽奖
  startLottery: {
    url: '/ols/activity/vip/startLottery'
  },
  // 停止抽奖
  stopLottery: {
    url: '/ols/activity/vip/stopLottery'
  },
  // 获取抽奖状态
  getPrizeStatus: {
    url: '/ols/activity/vip/getPrizeStatus'
  },
  // 重置转盘抽奖剩余次数到默认值
  setLotteryRemainTimes: {
    url: '/ols/activity/vip/setLotteryRemainTimes'
  },
  // 获取转盘抽奖剩余次数
  getLotteryRemainTimes: {
    url: '/ols/activity/vip/getLotteryRemainTimes'
  },
  // 设置活动时间
  setActivityTimeConfig: {
    url: '/ols/activity/vip/setActivityTimeConfig'
  },
  /* 上传下载 */
  // 上传中奖列表
  setPrizePool: {
    method: 'POST',
    url: '/ols/activity/vip/setPrizePool'
  },
  // 下载签到数据
  exportSignInList: {
    url: '/ols/activity/vip/exportSignInList/${activityKey}'
  },
  // 下载大屏幕中奖数据
  getWonPrizes: {
    url: '/ols/activity/vip/getWonPrizes'
  },
  // 下载APP中奖数据
  getAppDrawWonPrizes: {
    url: '/ols/activity/vip/getAppDrawWonPrizes'
  },
  // 获取活动列表
  getActivityList: {
    url: '/olsc/activity/list'
  },
  // 创建活动配置
  updateConfig: {
    method: 'POST',
    url: '/olsc/activity/update'
  },
  // 创建活动配置
  createConfig: {
    method: 'POST',
    url: '/olsc/activity/createConfig'
  }
}
