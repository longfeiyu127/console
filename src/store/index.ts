import Vue from 'vue'
import Vuex from 'vuex'
import { IAppState } from './modules/app'
import { IActivityState } from './modules/activity'
import { IUserState } from './modules/user'
import { IPermissionState } from './modules/permission'

Vue.use(Vuex)

export interface IRootState {
  app: IAppState
  user: IUserState,
  permission: IPermissionState,
  activity: IActivityState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
