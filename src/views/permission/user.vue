<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="userList"
      border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="姓名"
        width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.realname }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center"
        label="公司">
        <template slot-scope="scope">
          <span>{{ scope.row.company }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" label="角色">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <!-- <el-input v-model="row.editObj.roles[0]"
              class="edit-input" size="small" /> -->
            <el-checkbox-group class="edit-input"
              v-model="row.editObj.roles" :min="1">
              <el-checkbox v-for="role in roleList"
                :label="role.name" :key="role.key"></el-checkbox>
            </el-checkbox-group>
          </template>
          <span v-else>{{ row.roles.join(' ') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作"
        min-width="50px">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-button type="success" size="small"
              icon="el-icon-circle-check-outline"
              @click="confirmEdit(row)">
              确定
            </el-button>
            <el-button class="cancel-btn" size="small"
              icon="el-icon-refresh" type="warning"
              @click="cancelEdit(row)">
              取消
            </el-button>
          </template>
          <el-button v-else type="primary" size="small"
            icon="el-icon-edit" @click="row.edit=!row.edit">
            修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import path from 'path'
import { deepClone } from '@/utils'
import $http from '@/api'
import { PermissionModule } from '@/store/modules/permission'
import permission from '@/directive/permission/permission.ts'

const defaultUser = {
  username: '',
  roles: [],
  realname: '',
  company: ''
}

interface User {
  username: String
  roles: any[]
  realname: string
  company?: string
  createdAt?: string
  edit?: boolean
  editObj?: User
}

@Component({
  directives: {
    permission
  }
})
export default class Role extends Vue {
  private listLoading: boolean = true
  private userList: any[] = []

  get roleList() {
    return PermissionModule.roleList
  }

  private async created() {
    this.getUsers()
    await PermissionModule.getRoleList()
    this.listLoading = false
  }

  private async getUsers() {
    this.listLoading = true
    const res = await $http.user.getUsers()
    this.listLoading = false
    console.log(res, res.resCode)
    if (res.resCode !== 0) return
    this.userList = res.resData.list.reverse().map((v: any) => {
      v.editObj = deepClone(v)
      this.$set(v, 'edit', false)
      return v
    })
  }

  private cancelEdit(row: any) {
    // @ts-ignore
    const { realname, company, roles } = deepClone(row)
    row.editObj = { realname, company, roles }
    row.edit = false
    this.$message({
      message: 'The user has been restored to the original value',
      type: 'warning'
    })
  }
  private async confirmEdit(row: any) {
    row.edit = false
    // @ts-ignore
    const { realname, company, roles } = deepClone(row.editObj)
    const res = await $http.user.updateUser({
      id: row.id,
      realname,
      company,
      roles
    })
    if (res.resCode !== 0) return
    row.realname = realname
    row.company = company
    row.roles = roles
    this.$message({
      message: 'The user has been edited',
      type: 'success'
    })
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
/* .cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
} */
</style>
