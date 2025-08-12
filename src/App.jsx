import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Client from './pages/Client';
import Dashboard from './pages/Dashboard';
import Lead from './pages/Lead';
import Task from './pages/Task';
import NotFound from './pages/NotFound';
import useUIStore from './store/uiStore';
import Details from './pages/Details'; 

function AppContent() {
  const location = useLocation();
  const isCollapsed = useUIStore((state) => state.isCollapsed);

  const validRoutes = new Set([
    '/',
    '/dashboard',
    '/clients',
    '/leads',
    '/tasks'
  ]);

  const hideNavbar = !validRoutes.has(location.pathname);
  const marginLeft = hideNavbar ? '' : isCollapsed ? 'ml-20' : 'ml-64';

  return (
    <div className="flex">
      {!hideNavbar && <Navbar />}
      <div className={`${marginLeft} p-6 w-full transition-all duration-300`}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients" element={<Client />} />
          <Route path="/clients/details/:id" element={<Details />} />
          <Route path="/leads" element={<Lead />} />
          <Route path="/tasks" element={<Task />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default AppContent;
