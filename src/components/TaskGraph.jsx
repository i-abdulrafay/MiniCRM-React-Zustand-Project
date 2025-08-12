import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import useTaskStore from '../store/taskStore';

const COLORS = ['#443f38', '#b9b4a6'];

const TaskGraph = () => {
  const tasks = useTaskStore((state) => state.tasks);

  const statusCounts = tasks.reduce(
    (acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    },
    { Pending: 0, Done: 0 }
  );

  const data = [
    { name: 'Pending', value: statusCounts.Pending },
    { name: 'Done', value: statusCounts.Done },
  ];

  return (
    <div className="bg-white p-4 w-full">
      <h2 className="text-lg font-semibold mb-4 text-center text-[#443f38]">Task Status
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
              innerRadius={50}
              outerRadius={90}
              label
            >
              {data.map((entry, index) => (
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

export default TaskGraph;
