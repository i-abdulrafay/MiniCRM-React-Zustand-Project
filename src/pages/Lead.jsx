import React, { useState } from 'react';
import useLeadStore from '../store/leadStore';

const statuses = ['New', 'Contacted', 'Proposal', 'Won', 'Lost'];

const Lead = () => {
  const { leads, moveLead, addLead, deleteLead } = useLeadStore();
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    source: '',
    status: 'New',
  });

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('leadId', id);
  };

  const handleDrop = (e, newStatus) => {
    const id = parseInt(e.dataTransfer.getData('leadId'), 10);
    moveLead(id, newStatus);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      addLead(formData);
      setFormData({ name: '', email: '', phone: '', source: '', status: 'New' });
      setFormOpen(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-[#443f38]">Leads Board</h1>
        <button
          onClick={() => setFormOpen((prev) => !prev)}
          className="bg-[#443f38] text-white px-4 py-2 rounded shadow"
        >
          {formOpen ? 'Close Form' : 'Add Lead'}
        </button>
      </div>

      {formOpen && (
        <form
          onSubmit={handleAddLead}
          className="bg-[#f7f7f4] border border-[#e5e3d9] p-4 rounded mb-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <input
              name="name"
              placeholder="Lead Name"
              value={formData.name}
              onChange={handleInputChange}
              className="p-2 border rounded"
              required
            />
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="p-2 border rounded"
              required
            />
            <input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              name="source"
              placeholder="Lead Source"
              value={formData.source}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="p-2 border rounded"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 bg-[#443f38] text-white px-4 py-2 rounded shadow"
          >
            Submit
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {statuses.map((status) => (
          <div
            key={status}
            onDrop={(e) => handleDrop(e, status)}
            onDragOver={handleDragOver}
            className="bg-[#f7f7f4] border border-[#e5e3d9] rounded-lg p-4 min-h-[400px]"
          >
            <h2 className="text-lg font-semibold mb-4 text-[#443f38]">{status}</h2>

            {leads
              .filter((lead) => lead.status === status)
              .map((lead) => (
                <div
                  key={lead.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, lead.id)}
                  className="bg-white text-[#443f38] p-4 rounded-lg shadow mb-4 cursor-move border border-[#ddd] hover:shadow-md"
                >
                  <h3 className="font-bold text-sm">{lead.name}</h3>
                  <p className="text-xs">{lead.email}</p>
                  <p className="text-xs mb-2">{lead.phone}</p>
                  <button
                    onClick={() => deleteLead(lead.id)}
                    className="text-red-600 text-xs hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lead;
