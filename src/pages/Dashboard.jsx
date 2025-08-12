import React from 'react';
import useClientStore from '../store/clientStore';
import useLeadStore from '../store/leadStore';
import useTaskStore from '../store/taskStore';
import { format } from 'date-fns';

import TaskGraph from '../components/TaskGraph';
import LeadsGraph from '../components/LeadsGraph';
import ClientsGraph from '../components/ClientsGraph';
import SummaryGraph from '../components/SummaryGraph';

const Dashboard = () => {
  const clients = useClientStore((state) => state.clients);
  const leads = useLeadStore((state) => state.leads);
  const tasks = useTaskStore((state) => state.tasks);

  const recentActivities = [
    ...clients.map((c) => ({ type: 'Client', name: c.name, createdAt: c.createdAt })),
    ...leads.map((l) => ({ type: 'Lead', name: l.name, createdAt: l.createdAt })),
    ...tasks.map((t) => ({ type: 'Task', name: t.title, createdAt: t.createdAt })),
  ]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <div className="p-6 bg-[#f7f7f4] min-h-screen w-full">
      <h1 className="text-2xl font-semibold text-[#443f38] mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-xl font-semibold text-[#443f38]">{clients.length}</p>
          <p className="text-gray-500">Clients</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-xl font-semibold text-[#443f38]">{leads.length}</p>
          <p className="text-gray-500">Leads</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-xl font-semibold text-[#443f38]">{tasks.length}</p>
          <p className="text-gray-500">Tasks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <SummaryGraph />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <TaskGraph />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <LeadsGraph />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <ClientsGraph />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-md font-medium text-[#443f38] mb-4">Recent Activity</h2>
          <ul className="space-y-2">
            {recentActivities.map((a, i) => (
              <li key={i} className="text-sm text-gray-700">
                <span className="font-semibold text-[#443f38]">{a.type}:</span> {a.name}{' '}
                <span className="text-xs text-gray-500 ml-2">
                  (
                  {a.createdAt
                    ? format(new Date(a.createdAt), "MMMM d, yyyy 'at' h:mm a")
                    : 'Unknown date'}
                  )
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
