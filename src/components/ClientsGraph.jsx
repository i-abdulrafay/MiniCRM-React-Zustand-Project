import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import useClientStore from '../store/clientStore';

const COLORS = ['#443f38', '#b9b4a6', '#7b6e5d', '#e5e3d9'];

const ClientsGraph = () => {
  const clients = useClientStore((state) => state.clients);

  const statusCounts = clients.reduce((acc, client) => {
    acc[client.status] = (acc[client.status] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
  }));

  const maxValue = Math.max(...data.map((d) => d.count)) || 1;

  return (
    <div className="bg-white p-4 w-full">
      <h2 className="text-lg font-semibold mb-4 text-center text-[#443f38]">Clients by Status
      </h2>
      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
          >
            <XAxis type="number" domain={[0, maxValue]} allowDecimals={false} />
            <YAxis dataKey="status" type="category" />
            <Tooltip />
            <Bar dataKey="count">
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ClientsGraph;
