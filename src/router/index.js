import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Ad from '@/components/Ads/Ad'
import AdList from '@/components/Ads/AdList'
import NewAd from '@/components/Ads/NewAd'
import Orders from '@/components/User/Orders'
import Registration from '@/components/Auth/Registration'
import Login from '@/components/Auth/Login'
import AuthGuard from './auth-guard'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/ad/:id',
      props:true,//to get id as props
      name: 'ad',
      component: Ad
    },
    {
      path: '/list',
      name: 'list',
      component: AdList,
      beforeEnter: AuthGuard //to protect routes
    },
    {
      path: '/new',
      name: 'newad',
      component: NewAd,
      //beforeEnter: AuthGuard //to protect routes
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      beforeEnter: AuthGuard //to protect routes
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registration',
      name: 'reg',
      component: Registration
    }
  ],
  mode: 'history'
})
