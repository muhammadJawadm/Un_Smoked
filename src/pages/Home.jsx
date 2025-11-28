import { Link } from "react-router-dom";
import Header from "../layouts/partials/header";
import { BsCartCheckFill } from "react-icons/bs";
import { HiMiniUsers } from "react-icons/hi2";
import ChartOne from "../components/chartOne";
import Chart from "../components/Chart";
import { Users, Baby, ShieldCheck, UserCheck } from "lucide-react";
import StatCard from "../components/StatCard";

export default function Home() {
  return (
    <div>
      <Header header={"Dashboard"} />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-5">
          {/* <div className="flex justify-end pb-5">
            <DashboardFilter />
          </div> */}
          {/* Top KPI cards */}
         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 md:gap-6 2xl:gap-7">
  
  <StatCard
    icon={Users}
    iconBg="bg-blue-100"
    iconColor="text-blue-600"
    value="1,245"
    label="Total Parents"
    growth="+2.1%"
  />

  <StatCard
    icon={Baby}
    iconBg="bg-indigo-100"
    iconColor="text-indigo-600"
    value="2,876"
    label="Total Children"
    growth="+3.4%"
  />

  <StatCard
    icon={ShieldCheck}
    iconBg="bg-emerald-100"
    iconColor="text-emerald-600"
    value="18,542"
    label="Total Milestones"
    growth="+1.2%"
  />

  <StatCard
    icon={UserCheck}
    iconBg="bg-violet-100"
    iconColor="text-violet-600"
    value="07"
    label="Active Users"
    growth="+0.3%"
  />

</div>


          {/* Charts stacked */}
          <div className="mt-6 space-y-6">
            <div className="rounded-xl border border-gray-200 shadow bg-white" >
              <div className="flex items-center justify-between px-2 pb-2 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Total Parents (Monthly)</h3>
                <span className="text-xs text-gray-500">Last 12 months</span>
              </div>
              <Chart />
            </div>
            <div className="rounded-xl border border-gray-200 shadow" >
              <div className="flex items-center justify-between px-2 pb-2 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Total Children (Monthly)</h3>
                <span className="text-xs text-gray-500">Last 12 months</span>
              </div>
              <ChartOne />
            </div>
          </div>
        </div>
       
      </div>
    </div>
  )
}
