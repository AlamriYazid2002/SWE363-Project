export function StatCard({ title, value, subtitle, icon: Icon }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm text-gray-600">{title}</h3>
        {Icon && <Icon size={20} className="text-gray-400" />}
      </div>
      <div className="text-4xl mb-1">{value}</div>
      {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
    </div>
  );
}
