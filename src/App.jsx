import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import PenghuniList from './pages/penghuni/PenghuniList';
import PenghuniForm from './pages/penghuni/PenghuniForm';
import RumahList from './pages/rumah/RumahList';
import RumahForm from './pages/rumah/RumahForm';
import RumahHistory from './pages/rumah/RumahHistory';
import PembayaranList from './pages/pembayaran/PembayaranList';
import PembayaranForm from './pages/pembayaran/PembayaranForm';
import PengeluaranList from './pages/pengeluaran/PengeluaranList';
import PengeluaranForm from './pages/pengeluaran/PengeluaranForm';
import LaporanTahunan from './pages/laporan/LaporanTahunan';
import LaporanBulanan from './pages/laporan/LaporanBulanan';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Sidebar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/penghuni" element={<PenghuniList />} />
              <Route path="/penghuni/create" element={<PenghuniForm />} />
              <Route path="/penghuni/edit/:id" element={<PenghuniForm />} />
              <Route path="/rumah" element={<RumahList />} />
              <Route path="/rumah/create" element={<RumahForm />} />
              <Route path="/rumah/edit/:id" element={<RumahForm />} />
              <Route path="/rumah/:id/history" element={<RumahHistory />} />
              <Route path="/pembayaran" element={<PembayaranList />} />
              <Route path="/pembayaran/create" element={<PembayaranForm />} />
              <Route path="/pengeluaran" element={<PengeluaranList />} />
              <Route path="/pengeluaran/create" element={<PengeluaranForm />} />
              <Route path="/laporan/tahunan" element={<LaporanTahunan />} />
              <Route path="/laporan/bulanan" element={<LaporanBulanan />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;