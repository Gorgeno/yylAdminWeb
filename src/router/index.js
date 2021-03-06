import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* 路由模块 */

/**
 * 配置说明
 *
 * // 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * hidden: true // (默认 false)
 *
 * // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * redirect: 'noRedirect'
 *
 * // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式
 * // 只有一个时，会将那个子路由当做根路由显示在侧边栏
 * // 若你想不管路由下面的 children 声明的个数多少都显示你的根路由
 * // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * alwaysShow: true
 *
 * // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * name: 'Index'
 * meta: {
 *   roles: ['admin/Index/index'] // 设置该路由进入的权限（菜单链接），支持多个权限叠加
 *   title: '控制台' // 设置该路由在侧边栏和面包屑中展示的名字
 *   icon: 'el-icon-s-home' // 设置该路由的图标，element-ui 的 icon
 *   noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
 *   breadcrumb: false //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
 *   affix: true // 若果设置为true，它则会固定在tags-view中(默认 false)
 *   // 当路由设置了该属性，则会高亮相对应的侧边栏。
 *   // 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
 *   // 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
 *   activeMenu: '/article/list'
 * }
 */

/**
 * constantRoutes
 * 不需要动态判断权限的路由，如登录、404、401等页面
 * 所有用户都可以访问
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/admin/base/redirect')
      }
    ]
  },
  {
    path: '/login',
    meta: {
      title: '登录'
    },
    hidden: true,
    component: () => import('@/views/admin/login/login')
  },
  {
    path: '/404',
    meta: {
      title: '404'
    },
    hidden: true,
    component: () => import('@/views/admin/base/404')
  },
  {
    path: '/401',
    meta: {
      title: '401'
    },
    hidden: true,
    component: () => import('@/views/admin/base/401')
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        meta: {
          title: '控制台',
          icon: 'el-icon-s-home',
          affix: true
        },
        component: () => import('@/views/admin/index/index')
      }
    ]
  }
]

/**
 * asyncRoutes
 * 需要动态判断权限并通过 addRoutes 动态添加的页面
 * 需要分配相应权限才可以访问
 */
export const asyncRoutes = [
  {
    path: '/members',
    name: 'Members',
    meta: {
      title: '会员管理',
      icon: 'el-icon-menu',
      roles: [
        'admin/Member/memberList',
        'admin/MemberLog/memberLogList'
      ]
    },
    redirect: 'noRedirect',
    component: Layout,
    alwaysShow: true,
    children: [
      {
        path: 'member',
        name: 'Member',
        meta: {
          title: '会员管理',
          icon: 'el-icon-s-grid',
          roles: ['admin/Member/memberList']
        },
        component: () => import('@/views/member/member')
      },
      {
        path: 'member-log',
        name: 'MemberLog',
        meta: {
          title: '会员日志',
          icon: 'el-icon-s-grid',
          roles: ['admin/MemberLog/memberLogList']
        },
        component: () => import('@/views/member-log/member-log')
      },
      {
        path: 'member-logsta',
        name: 'MemberLogsta',
        meta: {
          title: '会员日志统计',
          icon: 'el-icon-s-grid',
          roles: ['admin/MemberLog/memberLogSta'],
          activeMenu: '/members/member-log'
        },
        component: () => import('@/views/member-log/member-logsta'),
        hidden: true
      }
    ]
  },
  {
    path: '/apis',
    name: 'Apis',
    meta: {
      title: '接口管理',
      icon: 'el-icon-menu',
      roles: ['admin/ApiEnv/apiEnvList', 'admin/Api/apiList']
    },
    redirect: 'noRedirect',
    component: Layout,
    alwaysShow: true,
    children: [
      {
        path: 'api-env',
        name: 'ApiEnv',
        meta: {
          title: '接口环境',
          icon: 'el-icon-s-grid',
          roles: ['admin/ApiEnv/apiEnvList']
        },
        component: () => import('@/views/api-env/api-env')
      },
      {
        path: 'api',
        name: 'Api',
        meta: {
          title: '接口管理',
          icon: 'el-icon-s-grid',
          roles: ['admin/Api/apiList']
        },
        component: () => import('@/views/api/api')
      }
    ]
  },
  {
    path: '/index',
    name: 'Index',
    meta: {
      title: '应用管理',
      icon: 'el-icon-menu',
      roles: ['admin/Region/regionList']
    },
    redirect: 'noRedirect',
    component: Layout,
    alwaysShow: true,
    children: [
      {
        path: 'region',
        name: 'Region',
        meta: {
          title: '地区管理',
          icon: 'el-icon-s-grid',
          roles: ['admin/Region/regionList']
        },
        component: () => import('@/views/region/region')
      }
    ]
  },

  {
    path: '/rule',
    name: 'Rule',
    meta: {
      title: '权限管理',
      icon: 'el-icon-lock',
      roles: [
        'admin/AdminMenu/menuList',
        'admin/AdminRole/roleList',
        'admin/AdminUser/userList',
        'admin/AdminLog/logList',
        'admin/AdminMy/myInfo'
      ]
    },
    redirect: 'noRedirect',
    component: Layout,
    alwaysShow: true,
    children: [
      {
        path: 'menu',
        name: 'Menu',
        meta: {
          title: '菜单管理',
          icon: 'el-icon-menu',
          roles: ['admin/AdminMenu/menuList']
        },
        component: () => import('@/views/admin/menu/menu')
      },
      {
        path: 'role',
        name: 'Role',
        meta: {
          title: '角色管理',
          icon: 'el-icon-s-custom',
          roles: ['admin/AdminRole/roleList']
        },
        component: () => import('@/views/admin/role/role')
      },
      {
        path: 'user',
        name: 'User',
        meta: {
          title: '用户管理',
          icon: 'el-icon-user',
          roles: ['admin/AdminUser/userList']
        },
        component: () => import('@/views/admin/user/user')
      },
      {
        path: 'log',
        name: 'Log',
        meta: {
          title: '日志管理',
          icon: 'el-icon-notebook-2',
          roles: ['admin/AdminLog/logList']
        },
        component: () => import('@/views/admin/log/log')
      },
      {
        path: 'log-sta',
        name: 'LogSta',
        meta: {
          title: '日志统计',
          icon: 'el-icon-s-data',
          roles: ['admin/AdminLog/logStatistic'],
          activeMenu: '/rule/log'
        },
        component: () => import('@/views/admin/log/logsta'),
        hidden: true
      },
      {
        path: 'my',
        name: 'My',
        meta: {
          title: '个人中心',
          icon: 'el-icon-warning-outline',
          roles: ['admin/AdminMy/myInfo']
        },
        component: () => import('@/views/admin/my/my')
      }
    ]
  },

  {
    path: '/system',
    name: 'System',
    meta: {
      title: '系统管理',
      icon: 'el-icon-setting',
      roles: [
        'admin/AdminSetting/settingCache',
        'admin/AdminSetting/settingVerify',
        'admin/AdminSetting/settingToken',
        'admin/AdminSetting/serverInfo',
        'admin/AdminTool/toolMix',
        'admin/AdminTool/toolMap'
      ]
    },
    redirect: 'noRedirect',
    component: Layout,
    alwaysShow: true,
    children: [
      {
        path: 'setting-cache',
        name: 'SettingCache',
        meta: {
          title: '缓存设置',
          icon: 'el-icon-coin',
          roles: ['admin/AdminSetting/settingCache']
        },
        component: () => import('@/views/admin/setting/cache')
      },
      {
        path: 'setting-verify',
        name: 'SettingVerify',
        meta: {
          title: '验证码设置',
          icon: 'el-icon-picture-outline',
          roles: ['admin/AdminSetting/settingVerify']
        },
        component: () => import('@/views/admin/setting/verify')
      },
      {
        path: 'setting-token',
        name: 'SettingToken',
        meta: {
          title: 'Token设置',
          icon: 'el-icon-key',
          roles: ['admin/AdminSetting/settingToken']
        },
        component: () => import('@/views/admin/setting/token')
      },
      {
        path: 'server-info',
        name: 'ServerInfo',
        meta: {
          title: '服务器信息',
          icon: 'el-icon-info',
          roles: ['admin/AdminSetting/serverInfo']
        },
        component: () => import('@/views/admin/setting/server')
      },
      {
        path: 'tool-mix',
        name: 'ToolMix',
        meta: {
          title: '实用工具合集',
          icon: 'el-icon-help',
          roles: ['admin/AdminTool/toolMix']
        },
        component: () => import('@/views/admin/tool/mix')
      },
      {
        path: 'tool-map',
        name: 'ToolMap',
        meta: {
          title: '地图坐标拾取',
          icon: 'el-icon-map-location',
          roles: ['admin/AdminTool/toolMap']
        },
        component: () => import('@/views/admin/tool/map')
      }
    ]
  },

  // 404页面必须放在最后!!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // 去掉url中的#号，需要服务器支持
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
