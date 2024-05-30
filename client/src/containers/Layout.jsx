import React, { useContext, Suspense, useEffect, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import routes from "../routes";

import Sidebar from "../components/SideBar/index.jsx";
import Header from "../components/Header";
import Main from "./Main";
import ThemedSuspense from "../components/ThemedSuspense";
import { SidebarContext } from "../context/SidebarContext";
import Page404 from "../pages/404";






function Layout() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  let location = useLocation();

  useEffect(() => {
    closeSidebar();
  }, [location]);

  //const SecondRouteComponent = routes[5].component;
  //console.log("routes: " + JSON.stringify(routes, null, 2));
  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
        isSidebarOpen && "overflow-hidden"
      }`}
    >
     {/* <SecondRouteComponent />  */}
      <Sidebar />

      {/* <Forms /> */}
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Routes>
              {routes
                .filter((route) => route.component)
                .map((route, i) => (
                  <Route
                    key={i}
                    path={`${route.path}`}
                    element={<route.component />}
                  />
                ))}

{/* <Route path="/app/chat" element={<Navigate to="/chat" />} /> */}
    <Route path="/app/*" element={<Navigate to="/app/mydocument" />} />
         
              <Route path="/*" element={<Page404 />} />


            </Routes>
          </Suspense>
        </Main>
      
      </div>
    </div>
  );
}

export default Layout;
