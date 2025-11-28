import React from "react";

const StatCard = ({
  icon: Icon,
  iconBg,
  iconColor,
  value,
  label,
  growth,
}) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white py-6 px-7 shadow">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-full ${iconBg}`}
      >
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>

      <div className="mt-4 flex items-end justify-between bg-white">
        <div className="bg-white">
          <h4 className="text-2xl font-bold text-gray-900 bg-white ">{value}</h4>
          <span className="text-sm font-medium text-gray-500 bg-white">
            {label}
          </span>
        </div>

        <span className="flex items-center gap-1 text-sm font-medium text-green-600">
          {growth}
        </span>
      </div>
    </div>
  );
};

export default StatCard;
