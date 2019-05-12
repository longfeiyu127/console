<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">增加角色</el-button>

    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <!-- <el-table-column align="center" label="角色代号" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="角色" width="220">
        <template slot-scope="scope">
          {{ scope.row.extra }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="详情">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope" v-if="scope.row.name !== 'admin'">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑权限</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit Role':'New Role'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="role.name" placeholder="角色" />
        </el-form-item>
        <el-form-item label="Desc">
          <el-input
            v-model="role.description"
            :autosize="{minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Role Description"
          />
        </el-form-item>
        <el-form-item label="Menus">
          <el-tree ref="tree" :check-strictly="checkStrictly" :data="routesData" :props="defaultProps" show-checkbox node-key="path" class="permission-tree" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">
          {{ 'permission.cancel' }}
        </el-button>
        <el-button type="primary" @click="confirmRole">
          {{ 'permission.confirm' }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import path from 'path'
import { deepClone } from '@/utils'
import { getRoutes, getRoles, addRole, deleteRole, updateRole } from '@/api/role'
import $http from '@/api'
import { PermissionModule } from '@/store/modules/permission'

const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: []
}

@Component
export default class Role extends Vue {
  private role: any = Object.assign({}, defaultRole)
  private routes = []
  private dialogVisible = false
  private dialogType = 'new'
  private serviceRoutes: any = []
  private checkStrictly = false
  private defaultProps = {
    children: 'children',
    label: 'title'
  }

  get rolesList() {
    return PermissionModule.roleList
  }

  get routesData() {
    return this.routes
  }

  private created() {
    this.getRoutes()
    PermissionModule.getRoleList()
  }

  private async getRoutes() {
    const res = await getRoutes()
    this.serviceRoutes = res.data
    const routes = this.generateRoutes(res.data)
    // this.routes = this.i18n(routes)
  }

  private generateRoutes(routes: any, basePath = '/') {
    const res = []

    for (let route of routes) {
      // skip some route
      if (route.hidden) { continue }

      const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

      if (route.children && onlyOneShowingChild && !route.alwaysShow) {
        route = onlyOneShowingChild
      }

      const data: any = {
        path: path.resolve(basePath, route.path),
        title: route.meta && route.meta.title
      }

      // recursive child routes
      if (route.children) {
        data.children = this.generateRoutes(route.children, data.path)
      }
      res.push(data)
    }
    return res
  }

  private generateArr(routes: any) {
    let data: any[] = []
    routes.forEach((route: any) => {
      data.push(route)
      if (route.children) {
        const temp = this.generateArr(route.children)
        if (temp.length > 0) {
          data = [...data, ...temp]
        }
      }
    })
    return data
  }
  private handleAddRole() {
    this.role = Object.assign({}, defaultRole)
    if (this.$refs.tree) {
      // @ts-ignore
      this.$refs.tree.setCheckedNodes([])
    }
    this.dialogType = 'new'
    this.dialogVisible = true
  }
  private handleEdit(scope: any) {
    this.dialogType = 'edit'
    this.dialogVisible = true
    this.checkStrictly = true
    this.role = deepClone(scope.row)
    this.$nextTick(() => {
      const routes = this.generateRoutes(this.role.routes)
      // @ts-ignore
      this.$refs.tree.setCheckedNodes(this.generateArr(routes))
      // set checked state of a node not affects its father and child nodes
      this.checkStrictly = false
    })
  }
  private handleDelete({ $index, row }: any) {
    this.$confirm('Confirm to remove the role?', 'Warning', {
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      type: 'warning'
    })
      .then(async() => {
        await deleteRole(row.key)
        this.rolesList.splice($index, 1)
        this.$message({
          type: 'success',
          message: 'Delete succed!'
        })
      })
      .catch(err => { console.error(err) })
  }
  private generateTree(routes: any, basePath = '/', checkedKeys: any) {
    const res: any|any[] = []

    for (const route of routes) {
      const routePath = path.resolve(basePath, route.path)

      // recursive child routes
      if (route.children) {
        route.children = this.generateTree(route.children, routePath, checkedKeys)
      }

      if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
        res.push(route)
      }
    }
    return res
  }
  private async confirmRole() {
    const isEdit = this.dialogType === 'edit'
    // @ts-ignore
    const checkedKeys: any = this.$refs.tree.getCheckedKeys()
    this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)

    if (isEdit) {
      await updateRole(this.role.key, this.role)
      for (let index = 0; index < this.rolesList.length; index++) {
        if (this.rolesList[index].key === this.role.key) {
          this.rolesList.splice(index, 1, Object.assign({}, this.role))
          break
        }
      }
    } else {
      const { data } = await addRole(this.role)
      this.role.key = data.key
      this.rolesList.push(this.role)
    }

    const { description, key, name } = this.role
    this.dialogVisible = false
    this.$notify({
      title: 'Success',
      dangerouslyUseHTMLString: true,
      message: `
          <div>Role Key: ${key}</div>
          <div>Role Nmae: ${name}</div>
          <div>Description: ${description}</div>
        `,
      type: 'success'
    })
  }
  private onlyOneShowingChild(children = [], parent: any) {
    let onlyOneChild: any = null
    const showingChildren = children.filter((item: any) => !item.hidden)

    // When there is only one child route, the child route is displayed by default
    if (showingChildren.length === 1) {
      onlyOneChild = showingChildren[0]
      onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
      return onlyOneChild
    }

    // Show parent if there are no child route to display
    if (showingChildren.length === 0) {
      onlyOneChild = { ...parent, path: '', noShowingChildren: true }
      return onlyOneChild
    }

    return false
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
