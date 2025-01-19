import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import PenghuniList from './pages/penghuni/PenghuniList';
import PenghuniForm from './pages/penghuni/PenghuniForms';
import PenghuniEdit from './pages/penghuni/PenghuniEdit';
import RumahList from './pages/rumah/RumahList';
import RumahForm from './pages/rumah/RumahForm';
import DetailRumah from './pages/rumah/DetailRumah';
import PembayaranList from './pages/pembayaran/PembayaranList';
import PembayaranForm from './pages/pembayaran/PembayaranForm';

const queryClient = new QueryClient();

const App = () => {
  return (
    console.log('Hello World!'),
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex">
          <Sidebar />
          <div className="ml-64 p-8 w-full min-h-screen overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/penghuni" element={<PenghuniList />} />
              <Route path="/penghuni/create" element={<PenghuniForm />} />
              <Route path="/penghuni/edit/:id" element={<PenghuniEdit />} />
              <Route path="/rumah" element={<RumahList />} />
              <Route path="/rumah/create" element={<RumahForm />} />
              <Route path="/rumah/edit/:id" element={<RumahForm />} />
              <Route path="/rumah/:id/history" element={<DetailRumah />} />
              <Route path="/pembayaran" element={<PembayaranList />} />
              <Route path="/pembayaran/create" element={<PembayaranForm />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;