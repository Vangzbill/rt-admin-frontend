import React, { useState, useEffect } from 'react';
import { rumahAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const RumahList = () => {
  const [rumahs, setRumahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRumahs = async () => {
      try {
        setLoading(true);
        const response = await rumahAPI.getAll();
        const { data, status } = response.data;
        if (status) {
          setRumahs(data);
        } else {
          throw new Error('Data rumah gagal diambil');
        }
      } catch (err) {
        setError(err.message || 'Terjadi kesalahan saat mengambil data');
      } finally {
        setLoading(false);
      }
    };

    fetchRumahs();
  }, []);

  const handleTambahRumah = () => {
    navigate('/rumah/create');
  };

  const handleEditRumah = (id) => {
    navigate(`/rumah/edit/${id}`);
  };

  const handleDetailRumah = (id) => {
    navigate(`/rumah/${id}/history`);
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
        <h1 className="text-2xl font-bold text-left text-white-800">Daftar Rumah</h1>
        <button
          onClick={handleTambahRumah}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Tambah Rumah
        </button>
      </div>

      {rumahs.length === 0 ? (
        <p className="text-center text-gray-500">Tidak ada data rumah.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-300 text-left text-black">ID</th>
                <th className="px-4 py-2 border border-gray-300 text-left text-black">Nomor Rumah</th>
                <th className="px-4 py-2 border border-gray-300 text-left text-black">Status Dihuni</th>
                <th className="px-4 py-2 border border-gray-300 text-left text-black">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {rumahs.map((rumah) => (
                <tr key={rumah.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">{rumah.id}</td>
                  <td className="px-4 py-2 border border-gray-300">{rumah.nomor_rumah}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    {rumah.status_dihuni ? 'Dihuni' : 'Kosong'}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <button 
                      onClick={() => handleDetailRumah(rumah.id)}
                      className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                      Detail
                    </button>
                    <button
                      onClick={() => handleEditRumah(rumah.id)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
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

export default RumahList;
