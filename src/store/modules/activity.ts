import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

const namespaced = 'activity'
export interface Account {
  oprAccount: string,
  password: string,
  activityKey: string
}

export interface IActivityState {
  account: Account,
  activityName: string
}

@Module({ dynamic: true, store, name: namespaced })
class App extends VuexModule implements IActivityState {
  public account = sessionStorage.getItem('activity_ccount') ? JSON.parse(sessionStorage.getItem('activity_ccount') || '{}') : {
    oprAccount: '',
    password: '',
    activityKey: ''
  }
  public activityName = ''
  public ActivityConfig: any = null

  @Action({ commit: 'SET_ACCOUNT' })
  public setAccount(account: Account) {
    sessionStorage.setItem('activity_ccount', JSON.stringify(account))
    return account
  }

  @Action({ commit: 'SET_ACTIVITY_NAME' })
  public setActivityName(activityName: string) {
    return activityName
  }

  @Action({ commit: 'SET_ACTIVITY_CONFIG' })
  public setActivityConfig(ActivityConfig: Object) {
    return ActivityConfig
  }

  @Mutation
  private SET_ACCOUNT(account: Account) {
    this.account = account
  }

  @Mutation
  private SET_ACTIVITY_NAME(activityName: string) {
    this.activityName = activityName
  }

  @Mutation
  private SET_ACTIVITY_CONFIG(ActivityConfig: Object) {
    this.ActivityConfig = ActivityConfig
  }
}

export const ActivityModule = getModule(App)
