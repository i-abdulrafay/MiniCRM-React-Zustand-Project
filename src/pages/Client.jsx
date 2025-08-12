import React, { useState } from 'react';
import useClientStore from '../store/clientStore';
import { Link } from 'react-router-dom';

const emptyClient = {
  name: '',
  category: '',
  type: '',
  status: '',
  source: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  zip: '',
  country: '',
};

const Client = () => {
  const clients = useClientStore((state) => state.clients);
  const addClient = useClientStore((state) => state.addClient);
  const deleteClient = useClientStore((state) => state.deleteClient);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newClient, setNewClient] = useState(emptyClient);
  const [filters, setFilters] = useState({ category: '', type: '', status: '' });

  const handleChange = (e) => {
    setNewClient({ ...newClient, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    addClient(newClient);
    setNewClient(emptyClient);
    setShowForm(false);
  };

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) &&
    (filters.category ? c.category === filters.category : true) &&
    (filters.type ? c.type === filters.type : true) &&
    (filters.status ? c.status === filters.status : true)
  );

  return (
    <div className="bg-[#f7f7f4] min-h-screen text-[#443f38] p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Clients</h1>
        <div className="bg-white px-4 py-2 rounded-lg shadow border border-[#e5e3d9] text-[#443f38]">
          Total Clients: <span className="font-semibold">{clients.length}</span>
        </div>
      </div>



      <div className="mb-6 flex flex-wrap gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-[#e5e3d9]">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg border border-[#d1cfc4] bg-[#e5e3d9] w-60"
        />
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="px-3 py-2 rounded-lg border border-[#d1cfc4] bg-[#e5e3d9]"
        >
          <option value="">All Categories</option>
          <option value="Finance">Finance</option>
          <option value="Tech">Tech</option>
          <option value="Retail">Retail</option>
        </select>
        <select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          className="px-3 py-2 rounded-lg border border-[#d1cfc4] bg-[#e5e3d9]"
        >
          <option value="">All Types</option>
          <option value="Regular">Regular</option>
          <option value="Monthly">Monthly</option>
          <option value="Casual">Casual</option>
        </select>
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="px-3 py-2 rounded-lg border border-[#d1cfc4] bg-[#e5e3d9]"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Lost">Lost</option>
          <option value="On Hold">On Hold</option>
          <option value="In Progress">In Progress</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button
          onClick={() => setShowForm(!showForm)}
          className="ml-auto bg-[#443f38] text-white px-4 py-2 rounded-lg hover:bg-[#2f2c27]"
        >
          {showForm ? 'Cancel' : '+ Add Client'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAdd}
          className="grid grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-md border border-[#e5e3d9] mb-6"
        >
          {Object.entries(emptyClient).map(([key]) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1 capitalize">{key}</label>
              {['category', 'type', 'status', 'source'].includes(key) ? (
                <select
                  name={key}
                  value={newClient[key]}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-[#d1cfc4] bg-[#e5e3d9]"
                >
                  <option value="">Select {key}</option>
                  {key === 'category' && ['Finance', 'Tech', 'Retail'].map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                  {key === 'type' && ['Regular', 'Monthly', 'Casual'].map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                  {key === 'status' && ['Active', 'Lost', 'On Hold', 'In Progress', 'Cancelled'].map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                  {key === 'source' && ['Referral', 'Website', 'Cold Call', 'Email', 'Social Media'].map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name={key}
                  value={newClient[key]}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-[#d1cfc4] bg-[#e5e3d9]"
                />
              )}
            </div>
          ))}
          <div className="col-span-2 text-right">
            <button
              type="submit"
              className="bg-[#443f38] text-white px-6 py-2 rounded-lg hover:bg-[#2f2c27]"
            >
              Save Client
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse text-sm bg-white shadow-md rounded-xl overflow-hidden border border-[#e5e3d9]">
          <thead className="bg-[#e5e3d9] text-left">
            <tr>
              <th className="px-4 py-3 border-b">Client ID</th>
              <th className="px-4 py-3 border-b">Name</th>
              <th className="px-4 py-3 border-b">Category</th>
              <th className="px-4 py-3 border-b">Type</th>
              <th className="px-4 py-3 border-b">Status</th>
              <th className="px-4 py-3 border-b">Source</th>
              <th className="px-4 py-3 border-b">Email</th>
              <th className="px-4 py-3 border-b">Phone</th>
              <th className="px-4 py-3 border-b">City</th>
              <th className="px-4 py-3 border-b text-center">Details</th>
              <th className="px-4 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map(client => (
              <tr key={client.id} className="even:bg-[#faf8f1]">
                <td className="px-4 py-2 border-b">{client.id}</td>
                <td className="px-4 py-2 border-b">{client.name}</td>
                <td className="px-4 py-2 border-b">{client.category}</td>
                <td className="px-4 py-2 border-b">{client.type}</td>
                <td className="px-4 py-2 border-b">{client.status}</td>
                <td className="px-4 py-2 border-b">{client.source}</td>
                <td className="px-4 py-2 border-b">{client.email}</td>
                <td className="px-4 py-2 border-b">{client.phone}</td>
                <td className="px-4 py-2 border-b">{client.city}</td>
                <td className="px-4 py-2 border-b text-center"><Link to={`/clients/details/${client.id}`} className="text-blue-600 hover:underline">View</Link></td>
                <td className="px-4 py-2 border-b text-center">
                  <button
                    onClick={() => deleteClient(client.id)}
                    className="text-red-600 hover:underline"
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Client;
