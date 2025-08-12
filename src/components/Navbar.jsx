import React from 'react';
import { Link } from 'react-router-dom';
import useUIStore from '../store/uiStore';

const Navbar = () => {
  const isCollapsed = useUIStore((state) => state.isCollapsed);
  const toggleCollapse = useUIStore((state) => state.toggleSidebar);

  return (
    <div
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } h-screen fixed top-0 left-0 flex flex-col transition-all duration-300 bg-[#443f38] text-white shadow-lg z-10`}
    >
      <div className="flex items-center justify-between p-4 border-b border-[#5f594f]">
        {!isCollapsed && <span className="text-xl font-bold">MiniCRM</span>}
        <div className={`${isCollapsed ? 'w-full flex justify-center' : ''}`}>
          <button onClick={toggleCollapse} className="focus:outline-none">
            <img src="/menu.png" alt="Toggle Menu" className="w-6 h-6" />
          </button>
        </div>
      </div>

      <nav className="flex flex-col gap-2 p-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#5c564d] transition"
        >
          <span>🏠</span>
          {!isCollapsed && <span>Dashboard</span>}
        </Link>
        <Link
          to="/clients"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#5c564d] transition"
        >
          <span>👥</span>
          {!isCollapsed && <span>Clients</span>}
        </Link>
        <Link
          to="/leads"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#5c564d] transition"
        >
          <span>📈</span>
          {!isCollapsed && <span>Leads</span>}
        </Link>
        <Link
          to="/tasks"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#5c564d] transition"
        >
          <span>📝</span>
          {!isCollapsed && <span>Tasks</span>}
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
