import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import useLeadStore from '../store/leadStore';
import useClientStore from '../store/clientStore';
import useTaskStore from '../store/taskStore';

const COLORS = ['#443f38', '#b9b4a6', '#7b6e5d'];

const SummaryGraph = () => {
  const leads = useLeadStore((state) => state.leads);
  const clients = useClientStore((state) => state.clients);
  const tasks = useTaskStore((state) => state.tasks);

  const data = [
    { name: 'Leads', value: leads.length },
    { name: 'Clients', value: clients.length },
    { name: 'Tasks', value: tasks.length },
  ];

  return (
    <div className="bg-white p-4 w-full">
      <h2 className="text-lg font-semibold mb-4 text-center text-[#443f38]">Summary Overview
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

export default SummaryGraph;
