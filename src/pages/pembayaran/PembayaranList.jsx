import React, { useState, useEffect } from 'react';
import { pembayaranAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const PembayaranList = () => {
  const [pembayaran, setPembayaran] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPembayaran = async () => {
      try {
        setLoading(true);
        const response = await pembayaranAPI.getAll();
        const { data, status } = response.data;
        if (status) {
          setPembayaran(data);
        } else {
          throw new Error('Data rumah gagal diambil');
        }
      } catch (err) {
        setError(err.message || 'Terjadi kesalahan saat mengambil data');
      } finally {
        setLoading(false);
      }
    };

    fetchPembayaran();
  }, []);

  const handleTambahPembayaran = () => {
    navigate('/pembayaran/create');
  };

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="w-full mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-left text-white-800">Daftar Pembayaran</h1>
        <button
          onClick={handleTambahPembayaran}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Tambah Pembayaran
        </button>
      </div>

      {pembayaran.length === 0 ? (
        <p className="text-center text-gray-500">Tidak ada data pembayaran.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-300 text-left text-black">ID</th>
                <th className="px-4 py-2 border border-gray-300 text-left text-black">Nama Penghuni</th>
                <th className="px-4 py-2 border border-gray-300 text-left text-black">Nomor Rumah</th>
                <th className="px-4 py-2 border border-gray-300 text-left text-black">Jenis Iuran</th>
                <th className="px-4 py-2 border border-gray-300 text-left text-black">Jumlah Iuran</th>
                <th className="px-4 py-2 border border-gray-300 text-left text-black">Periode</th>
                <th className="px-4 py-2 border border-gray-300 text-left text-black">Status Pembayaran</th>
              </tr>
            </thead>
            <tbody>
              {pembayaran.map((pembayaran) => (
                <tr key={pembayaran.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">{pembayaran.id}</td>
                  <td className="px-4 py-2 border border-gray-300">{pembayaran.penghuni}</td>
                  <td className="px-4 py-2 border border-gray-300">{pembayaran.rumah}</td>
                  <td className="px-4 py-2 border border-gray-300">{pembayaran.jenis_iuran}</td>
                  <td className="px-4 py-2 border border-gray-300">{pembayaran.jumlah_iuran}</td>
                  <td className="px-4 py-2 border border-gray-300">{pembayaran.periode}</td>
                  <td className="px-4 py-2 border border-gray-300">{pembayaran.status_pembayaran}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PembayaranList;
