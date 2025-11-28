import { Outlet } from "react-router-dom";
import Sidebar from "../layouts/partials/sidebar"
import { useState } from "react";

export default function RootLayout() {
  const [smallSidebar, setSmallSidebar] = useState(false); // collapse state
  return (
    <div>
      <Sidebar smallSidebar={smallSidebar} setSmallSidebar={setSmallSidebar} />
      <div className={`${smallSidebar ? "lg:ml-32" : "lg:ml-72"} mt-2.5`}>
        <Outlet />
      </div>
    </div>
  )
}
