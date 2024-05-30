import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
// const  MyDocuments= lazy(() => import('../pages/Dashboard'))
import MyDocuments from '../pages/Dashboard'
import Notes from '../pages/Forms'
import Profile from '../pages/Buttons'
// const Charts = lazy(() => import('../pages/Charts'))
import Trash from '../pages/Tables'
import Files from '../pages/Files'
// const Modals = lazy(() => import('../pages/Modals'))
// const Tables = lazy(() => import('../pages/Tables'))
// const Page404 = lazy(() => import('../pages/404'))
// const Blank = lazy(() => import('../pages/Blank'))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/mydocuments', // the url
    component: MyDocuments, // view rendered
  },
  {
    path: '/notes',
    component: Notes,
  },
  {
    path: '/profile',
    component: Profile,
  },
  // {
  //   path: '/charts',
  //   component: Charts,
  // },
  {
    path: '/trash',
    component: Trash,
   },
  {
    path: '/files/:id',
    component: Files,
  },
  // {
  //   path: '/tables',
  //   component: Tables,
  // },
  // {
  //   path: '/404',
  //   component: Page404,
  // },
  // {
  //   path: '/blank',
  //   component: Blank,
  // },
]

export default routes
