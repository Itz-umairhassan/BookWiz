import React from 'react'
import routes from '../../routes/sidebar'
import { NavLink, useMatch, useLocation } from 'react-router-dom'
import * as Icons from '../../icons'
import SidebarSubmenu from './SidebarSubmenu'
import { Button } from '@windmill/react-ui'

function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

// New component
function RouteNavLink({ route }) {
  const match = useMatch(route.path);
  const location = useLocation();

  console.log("Current URL: " + location.pathname);
console.log("matching path "+route.path+" match: "+ JSON.stringify(match, null, 2))

  return (
    <li className="relative px-6 py-3">
      <NavLink
    
        to={`${route.path}`}
        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
        activeclassname="text-gray-800 dark:text-gray-100"
      >
        {match && (
          <span
            className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
          />
        )}
        <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
        <span className="ml-4">{route.name}</span>
      </NavLink>
    </li>
  );
}

function SidebarContent() {
  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
        BookWiz
      </a>
      <ul className="mt-6">
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <RouteNavLink route={route} key={route.name} /> // Use the new component here
          )
        )}
      </ul>
    </div>
  );
}

export default SidebarContent;