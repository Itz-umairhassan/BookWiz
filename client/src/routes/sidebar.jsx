/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */

const routes = [
  {
    path: '/app/folders', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'My Documents', // name that appear in Sidebar
  },
  {
    path: '/app/notes',
    icon: 'FormsIcon',
    name: 'Notes',
  },
  {
    path: '/app/Profile',
    icon: 'CardsIcon',
    name: 'Profile',
  },
  {
    path: '/app/chat_history',
    icon: 'ChartsIcon',
    name: 'Chat History',
  },
  {
    path: '/app/trash',
    icon: 'ButtonsIcon',
    name: 'Trash',
  },
  // {
  //   path: '/app/modals',
  //   icon: 'ModalsIcon',
  //   name: 'Modals',
  // },
  // {
  //   path: '/app/tables',
  //   icon: 'TablesIcon',
  //   name: 'Tables',?//////////////////////////
  // },
//   {
//     icon: 'PagesIcon',
//     name: 'Pages',
//     routes: [
//       // submenu
//       {
//         path: '/login',
//         name: 'Login',
//       },
//       {
//         path: '/create-account',
//         name: 'Create account',
//       },
//       {
//         path: '/forgot-password',
//         name: 'Forgot password',
//       },
//       {
//         path: '/app/404',
//         name: '404',
//       },
//       {
//         path: '/app/blank',
//         name: 'Blank',
//       },
//     ],
//   },
 ]

export default routes
