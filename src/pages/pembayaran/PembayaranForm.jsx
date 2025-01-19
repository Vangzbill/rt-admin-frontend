import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { pembayaranAPI, rumahAPI, penghuniAPI } from '../../services/api';
import Modal from 'react-modal';

const PembayaranForm = () => {
  const navigate = useNavigate();
  const [penghunis, setPenghunis] = useState([]);
  const [rumahs, setRumahs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); 
  const [formData, setFormData] = useState({
    penghuni_id: '',
    rumah_id: '',
    jenis_iuran: 'satpam',
    periode_awal: '',
    periode_akhir: '',
    jumlah_iuran: '',
    keterangan: ''
  });

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

  const [isLoading, setIsLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('');

  const mutation = useMutation({
    mutationFn: pembayaranAPI.create,
    onSuccess: () => {
      setIsLoading(false);
      setPopupMessage('Pembayaran berhasil ditambahkan');
      setPopupType('success');
      setTimeout(() => {
        navigate('/pembayaran');
      }, 2000);
    },
    onError: (error) => {
      setIsLoading(false);
      setPopupMessage('Gagal menambahkan pembayaran');
      setPopupType('error');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="w-full mx-auto bg-transparent p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Tambah Pembayaran</h2>
      {loading && <p>Loading data rumah...</p>} 
      {error && <p className="text-red-500">{error}</p>} 
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white-700">
            Penghuni
          </label>
          <select
            name="penghuni_id"
            value={formData.penghuni_id}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-white-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Pilih Penghuni</option>
            {penghunis?.map(penghuni => (
              <option key={penghuni.id} value={penghuni.id}>
                {penghuni.nama_lengkap}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white-700">
            Rumah
          </label>
          <select
            name="rumah_id"
            value={formData.rumah_id}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-white-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Pilih Rumah</option>
            {rumahs?.map(rumah => (
              <option key={rumah.id} value={rumah.id}>
                Rumah No. {rumah.nomor_rumah}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white-700">
            Jenis Pembayaran
          </label>
          <select
            name="jenis_iuran"
            value={formData.jenis_iuran}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-white-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="satpam">Iuran Satpam (Rp 100.000)</option>
            <option value="kebersihan">Iuran Kebersihan (Rp 15.000)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white-700">
            Periode
          </label>
          <input
            type="date"
            name="periode"
            value={formData.periode}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-white-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white-700">
            Jumlah Bayar
          </label>
          <input
            type="number"
            name="jumlah_iuran"
            value={formData.jumlah_iuran}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-white-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white-700">
            Status Pembayaran
          </label>
          <select
            name="status_pembayaran"
            value={formData.status_pembayaran}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-white-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="Lunas">Lunas</option>
            <option value="Belum Lunas">Belum Lunas</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/pembayaran')}
            className="px-4 py-2 border border-white-300 rounded-md shadow-sm text-sm font-medium text-white-700 bg-slate-600 hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </form>

      <Modal 
        isOpen={isLoading} 
        contentLabel="Loading"
        className="flex justify-center items-center bg-opacity-50 bg-transparent p-4 rounded-lg"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
      >
        <div className="bg-gray-800 p-6 rounded-lg flex items-center">
          <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full border-t-transparent border-blue-600" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="ml-4 text-white">Sedang memproses...</p>
        </div>
      </Modal>

      <Modal 
        isOpen={popupMessage} 
        contentLabel="Result"
        className="flex justify-center items-center bg-opacity-50 bg-transparent p-4 rounded-lg"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
      >
        <div className={`bg-${popupType === 'success' ? 'green' : 'red'}-500 p-6 rounded-lg`}>
          <p className="text-white">{popupMessage}</p>
        </div>
      </Modal>
    </div>
  );
};

export default PembayaranForm;
