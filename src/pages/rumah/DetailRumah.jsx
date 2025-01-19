import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { rumahAPI, pembayaranAPI } from '../../services/api';

const DetailRumah = () => {
  const { id } = useParams(); 
  const [penghuni, setPenghuni] = useState([]);
  const [pembayaran, setPembayaran] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);

        const penghuniResponse = await rumahAPI.getHistory(id);
        const { data: penghuniData, status: penghuniStatus } = penghuniResponse.data;
        if (!penghuniStatus) {
          throw new Error('Data penghuni gagal diambil');
        }

        const pembayaranResponse = await pembayaranAPI.getHistoryByRumah(id);
        const { data: pembayaranData, status: pembayaranStatus } = pembayaranResponse.data;
        if (!pembayaranStatus) {
          throw new Error('Data pembayaran gagal diambil');
        }

        setPenghuni(penghuniData);
        setPembayaran(pembayaranData);
      } catch (err) {
        setError(err.message || 'Terjadi kesalahan saat mengambil data');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Detail Rumah</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Penghuni</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-300 text-left text-gray-600">ID</th>
                <th className="px-4 py-2 border border-gray-300 text-left text-gray-600">Nama Penghuni</th>
                <th className="px-4 py-2 border border-gray-300 text-left text-gray-600">Tanggal Mulai</th>
                <th className="px-4 py-2 border border-gray-300 text-left text-gray-600">Tanggal Selesai</th>
                <th className="px-4 py-2 border border-gray-300 text-left text-gray-600">Status Aktif</th>
              </tr>
            </thead>
            <tbody>
              {penghuni.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">{item.id}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.penghuni}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.tanggal_mulai}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.tanggal_selesai}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.status_aktif ? 'Aktif' : 'Tidak Aktif'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Pembayaran</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-300 text-left text-gray-600">ID</th>
                <th className="px-4 py-2 border border-gray-300 text-left text-gray-600">Nama Penghuni</th>
                <th className="px-4 py-2 border border-gray-300 text-left text-gray-600">Nomor Rumah</th>
                <th className="px-4 py-2 border border-gray-300 text-left text-gray-600">Jenis Iuran</th>
                <th className="px-4 py-2 border border-gray-300 text-left text-gray-600">Jumlah Iuran</th>
                <th className="px-4 py-2 border border-gray-300 text-left text-gray-600">Periode</th>
                <th className="px-4 py-2 border border-gray-300 text-left text-gray-600">Status Pembayaran</th>
              </tr>
            </thead>
            <tbody>
              {pembayaran.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">{item.id}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.penghuni}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.rumah}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.jenis_iuran}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.jumlah_iuran}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.periode}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.status_pembayaran ? 'Lunas' : 'Belum Lunas'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailRumah;
