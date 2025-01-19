import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { penghuniAPI } from '../../services/api';
import Modal from 'react-modal';

const PenghuniEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nama_lengkap: '',
        foto_ktp: null,
        status_penghuni: 'Tetap',
        nomor_telepon: '',
        status_pernikahan: false,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState('');

    useEffect(() => {
        const fetchPenghuni = async () => {
            try {
                setLoading(true);
                const response = await penghuniAPI.getById(id);
                const { data, status } = response.data;
                if (status) {
                    setFormData(data);
                } else {
                    throw new Error('Data penghuni gagal ditemukan');
                }
            } catch (err) {
                setError(err.message || 'Terjadi kesalahan saat mengambil data');
            } finally {
                setLoading(false);
            }
        };

        fetchPenghuni();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        penghuniAPI.update(id, formData)
            .then(() => {
                setPopupMessage('Penghuni berhasil diperbarui');
                setPopupType('success');
                setTimeout(() => {
                    navigate('/penghuni');
                }, 2000);
            })
            .catch(err => {
                setPopupMessage('Gagal memperbarui penghuni');
                setPopupType('error');
            });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            foto_ktp: e.target.files[0],
        });
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Edit Penghuni</h2>
            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                <div>
                    <label className="block text-sm font-medium text-white-700">Nama Lengkap</label>
                    <input
                        type="text"
                        name="nama_lengkap"
                        value={formData.nama_lengkap}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-white-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-white-700">Foto KTP</label>
                    <input
                        type="file"
                        name="foto_ktp"
                        onChange={handleFileChange}
                        className="mt-1 block w-full"
                        accept="image/*"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-white-700">Status Penghuni</label>
                    <select
                        name="status_penghuni"
                        value={formData.status_penghuni}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-white-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="Tetap">Tetap</option>
                        <option value="Kontrak">Kontrak</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-white-700">Nomor Telepon</label>
                    <input
                        type="tel"
                        name="nomor_telepon"
                        value={formData.nomor_telepon}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-white-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="status_pernikahan"
                        checked={formData.status_pernikahan}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-white-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-white-700">Sudah Menikah</label>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/penghuni')}
                        className="px-4 py-2 border border-white-300 rounded-md shadow-sm text-sm font-medium text-white-700 bg-slate-600 hover:bg-white-50"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? 'Menyimpan...' : 'Simpan'}
                    </button>
                </div>
            </form>

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

export default PenghuniEdit;
