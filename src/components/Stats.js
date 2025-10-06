import React from 'react';

const StatCard = ({ title, count, icon, color }) => (
  <div className="bg-white/10 backdrop-blur-lg border border-white/10 flex-1 p-6 rounded-xl shadow-lg flex items-center gap-4">
    <div className={`text-3xl ${color}`}>
      {icon}
    </div>
    <div>
      <p className={`text-3xl font-bold`}>{count}</p>
      <p className="text-gray-300 mt-1">{title}</p>
    </div>
  </div>
);

function Stats({ total, completed, incomplete }) {
  return (
    <div className="flex flex-col sm:flex-row gap-6">
      <StatCard title="Total Tasks" count={total} icon="🗂️" color="text-purple-300" />
      <StatCard title="Completed" count={completed} icon="✅" color="text-green-300" />
      <StatCard title="Incomplete" count={incomplete} icon="⏳" color="text-yellow-300" />
    </div>
  );
}

export default Stats;