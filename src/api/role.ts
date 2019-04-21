import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/roles',
    method: 'get'
  })
}

export function addRole(data: any) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

export function updateRole(id: any, data: any) {
  return request({
    url: `/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id: any) {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}
