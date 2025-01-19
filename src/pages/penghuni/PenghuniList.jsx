import React, { useState, useEffect } from 'react';
import { penghuniAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const PenghuniList = () => {
  const [penghunis, setPenghunis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPenghunis = async () => {
      try {
        setLoading(true);
        const response = await penghuniAPI.getAll();
        const { data, status } = response.data;
        if (status) {
          setPenghunis(data);
        } else {
          throw new Error('Data penghuni gagal diambil');
        }
      } catch (err) {
        setError(err.message || 'Terjadi kesalahan saat mengambil data');
      } finally {
        setLoading(false);
      }
    };

    fetchPenghunis();
  }, []);

  const handleTambahPenghuni = () => {
    navigate('/penghuni/create');
  };

  const handleEditPenghuni = (id) => {
    navigate(`/penghuni/edit/${id}`);
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
        <h1 className="text-2xl font-bold text-left">Daftar Penghuni</h1>
        <button
          onClick={handleTambahPenghuni}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Tambah Penghuni
        </button>
      </div>

      {penghunis.length === 0 ? (
        <p className="text-center text-gray-500">Tidak ada data penghuni.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-300 text-gray-700 text-left">ID</th>
                <th className="px-4 py-2 border border-gray-300 text-gray-700 text-left">Nama Lengkap</th>
                <th className="px-4 py-2 border border-gray-300 text-gray-700 text-left">Status</th>
                <th className="px-4 py-2 border border-gray-300 text-gray-700 text-left">No. Telepon</th>
                <th className="px-4 py-2 border border-gray-300 text-gray-700 text-left">Status Pernikahan</th>
                <th className="px-4 py-2 border border-gray-300 text-gray-700 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {penghunis.map((penghuni) => (
                <tr key={penghuni.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">{penghuni.id}</td>
                  <td className="px-4 py-2 border border-gray-300">{penghuni.nama_lengkap}</td>
                  <td className="px-4 py-2 border border-gray-300">{penghuni.status_penghuni}</td>
                  <td className="px-4 py-2 border border-gray-300">{penghuni.nomor_telepon}</td>
                  <td className="px-4 py-2 border border-gray-300">{penghuni.status_pernikahan ? 'Menikah' : 'Lajang'}</td>
                  <td className="px-4 py-2 border border-gray-300">
                  <button
                      onClick={() => handleEditPenghuni(penghuni.id)}
                      className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PenghuniList;
