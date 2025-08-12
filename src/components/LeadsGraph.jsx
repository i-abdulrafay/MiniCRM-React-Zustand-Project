import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import useLeadStore from '../store/leadStore';

const COLORS = ['#443f38', '#b9b4a6', '#e5e3d9', '#7b6e5d', '#a4978e'];

const LeadsGraph = () => {
  const leads = useLeadStore((state) => state.leads);

  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  return (
    <div className="bg-white p-4 w-full">
      <h2 className="text-lg font-semibold mb-4 text-center text-[#443f38]">Leads by Status
      </h2>
      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LeadsGraph;
