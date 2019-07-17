const Layout = () => import('@/components/Layout/web.vue')

const web = {
  path: '/web',
  name: 'web',
  meta: {
    title: '前台',
  },
  component: Layout,
  redirect: '/web/home',
  children: [{
    path: 'home',
    name: 'Home',
    meta: {
      title: '前台欢迎页',
    },
    component: () => import('@/views/web/Home.vue'),
  }],
}

export default web
