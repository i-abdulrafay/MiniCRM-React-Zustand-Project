import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useClientStore from '../store/clientStore';

const Details = () => {
  const { id } = useParams();
  const clients = useClientStore((state) => state.clients);
  const client = clients.find((c) => c.id === Number(id));

  if (!client) {
    return (
      <div className="p-6">
        <p className="text-red-600">Client not found.</p>
        <Link to="/clients" className="text-blue-600 underline">← Back to Clients</Link>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#f7f7f4] min-h-screen">
      <h1 className="text-2xl font-semibold text-[#443f38] mb-4">
        👤 Client Details
      </h1>

      <div className="bg-white p-6 rounded shadow">
        <p><span className="font-medium text-[#443f38]">Name:</span> {client.name}</p>
        <p><span className="font-medium text-[#443f38]">Email:</span> {client.email}</p>
        <p><span className="font-medium text-[#443f38]">Phone:</span> {client.phone}</p>
        <p><span className="font-medium text-[#443f38]">Address:</span> {client.address}</p>
        <p><span className="font-medium text-[#443f38]">City:</span> {client.city}</p>
        <p><span className="font-medium text-[#443f38]">Zip:</span> {client.zip}</p>
        <p><span className="font-medium text-[#443f38]">Country:</span> {client.country}</p>
        <p><span className="font-medium text-[#443f38]">Status:</span> {client.status}</p>
        <p><span className="font-medium text-[#443f38]">Type:</span> {client.type}</p>
        <p><span className="font-medium text-[#443f38]">Source:</span> {client.source}</p>
        <p><span className="font-medium text-[#443f38]">Category:</span> {client.category}</p>
        <p><span className="font-medium text-[#443f38]">Created:</span> {client.createdAt ? new Date(client.createdAt).toLocaleString() : 'N/A'}</p>
      </div>

      <Link to="/clients" className="mt-4 inline-block text-sm text-blue-600 underline">
        ← Back to Clients
      </Link>
    </div>
  );
};

export default Details;
