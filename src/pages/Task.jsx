import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { parse, startOfWeek, format, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/calendarTheme.css';

import useTaskStore from '../store/taskStore';
import useClientStore from '../store/clientStore';
import useLeadStore from '../store/leadStore';

const locales = { 'en-US': enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const Tasks = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const clients = useClientStore((state) => state.clients);
  const leads = useLeadStore((state) => state.leads);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [entityType, setEntityType] = useState('client');
  const [entityId, setEntityId] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title || !date || !entityId) return;

    addTask({
      title,
      date,
      status,
      description,
      assignedTo,
      entityType,
      entityId,
    });

    setTitle('');
    setDate('');
    setStatus('Pending');
    setDescription('');
    setAssignedTo('');
    setEntityId('');
    setShowModal(false);
  };

  const events = tasks.map((task, i) => ({
    id: task.id,
    title: `${task.title} - ${task.assignedTo}`,
    start: new Date(`${task.date}T0${i + 1}:00:00`),
    end: new Date(`${task.date}T0${i + 2}:00:00`),
    allDay: false,
    resource: {
      status: task.status,
      assignedTo: task.assignedTo,
    },
  }));

  const todaysTasks = tasks.filter(
    (task) => task.date === new Date().toISOString().split('T')[0]
  );

  return (
    <div className="p-6 bg-[#f7f7f4] min-h-screen w-full">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <h1 className="text-2xl font-semibold text-[#443f38] whitespace-nowrap">📆 Task Calendar</h1>

        <div className="flex-1 text-center bg-[#f2f1ec] px-4 py-2 rounded shadow text-sm text-[#443f38]">
          <strong>Today's Summary:</strong>{' '}
          {todaysTasks.length === 0 ? (
            'No tasks'
          ) : (
            todaysTasks.map((task, index) => (
              <span key={task.id}>
                {task.title}
                {task.assignedTo ? ` (${task.assignedTo})` : ''}
                {index < todaysTasks.length - 1 && ', '}
              </span>
            ))
          )}
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-[#443f38] text-white rounded whitespace-nowrap"
        >
          + Add Task
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          views={['month', 'week', 'day']}
          style={{ height: 'calc(100vh - 200px)' }}
          onSelectEvent={(event) => {
            const newStatus = event.resource.status === 'Pending' ? 'Done' : 'Pending';
            useTaskStore.getState().updateTaskStatus(event.id, newStatus);
          }}
          components={{
            event: ({ event }) => (
              <div className="p-1 cursor-pointer">
                <div
                  className={`font-medium ${event.resource.status === 'Done' ? 'line-through text-gray-400' : ''}`}
                >
                  {event.title}
                </div>
                <div className={`text-xs ${event.resource.status === 'Done' ? 'text-green-400' : 'text-yellow-600'}`}>
                  {event.resource.status}
                </div>
              </div>
            ),
          }}

        />
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add Task</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option>Pending</option>
                <option>Done</option>
              </select>
              <input
                type="text"
                placeholder="Assigned To"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <div className="flex gap-2">
                <select
                  value={entityType}
                  onChange={(e) => {
                    setEntityType(e.target.value);
                    setEntityId('');
                  }}
                  className="w-1/2 p-2 border rounded"
                >
                  <option value="client">Client</option>
                  <option value="lead">Lead</option>
                </select>
                <select
                  value={entityId}
                  onChange={(e) => setEntityId(e.target.value)}
                  className="w-1/2 p-2 border rounded"
                >
                  <option value="">Select</option>
                  {entityType === 'client' &&
                    clients.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  {entityType === 'lead' &&
                    leads.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-[#443f38] text-white rounded">
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
