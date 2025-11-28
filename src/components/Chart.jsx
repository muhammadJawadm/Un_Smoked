import React from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

// Clean, reusable Line chart component for monthly counts
const Chart = ({ title = "", data = [], color = "#2563eb", dataKey = "value" }) => {
  const fallback = [
    { name: "Jan", value: 120 },
    { name: "Feb", value: 140 },
    { name: "Mar", value: 160 },
    { name: "Apr", value: 200 },
    { name: "May", value: 240 },
    { name: "Jun", value: 260 },
    { name: "Jul", value: 300 },
    { name: "Aug", value: 280 },
    { name: "Sep", value: 320 },
    { name: "Oct", value: 340 },
    { name: "Nov", value: 360 },
    { name: "Dec", value: 400 },
  ];

  const rows = Array.isArray(data) && data.length ? data : fallback;

  return (
    <div className="w-full bg-white">
      {title ? (
        <div className="flex items-center justify-between px-2 pb-2 bg-white">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          <span className="text-xs text-gray-500">Last 12 months</span>
        </div>
      ) : null}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rows} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" tick={{ fontSize: 12 }} />
            <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ fontSize: 12 }} />
            <Legend wrapperStyle={{ paddingTop: 8 }} />
            <Line type="monotone" dataKey={dataKey} name="Count" stroke={color} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
            