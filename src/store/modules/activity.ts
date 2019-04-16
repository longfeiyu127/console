import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface Account {
  oprAccount: string,
  password: string,
  activityKey: string
}

export interface IActivityState {
  account: Account,
  activityName: string
}

@Module({ dynamic: true, store, name: 'activity' })
class App extends VuexModule implements IActivityState {
  public account = {
    oprAccount: '',
    password: '',
    activityKey: ''
  }
  public activityName = ''

  @Action({ commit: 'SET_ACCOUNT' })
  public setAccount(account: Account) {
    return account
  }

  @Action({ commit: 'SET_ACTIVITY_NAME' })
  public setActivityName(activityName: string) {
    return activityName
  }

  @Mutation
  private SET_ACCOUNT(account: Account) {
    this.account = account
  }

  @Mutation
  private SET_ACTIVITY_NAME(activityName: string) {
    this.activityName = activityName
  }
}

export const ActivityModule = getModule(App)
