/* eslint-disable react/prop-types */
export default function StatCard({ icon: Icon, iconBg, iconColor, value, label, sub, growth }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white py-5 px-6 shadow hover:shadow-md transition-shadow">
      <div className={`flex h-11 w-11 items-center justify-center rounded-full ${iconBg}`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>

      <div className="mt-4">
        <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
        <span className="text-sm font-medium text-gray-500">{label}</span>
        {sub && (
          <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
        )}
        {growth && (
          <span className="mt-1 inline-block text-xs font-medium text-green-600">{growth}</span>
        )}
      </div>
    </div>
  );
}
