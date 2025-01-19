import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { rumahAPI } from '../../services/api';
import Modal from 'react-modal';

const RumahForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nomor_rumah: '',
        status_huni: false,
    });

    const { data: rumah, isLoading: isLoadingRumah } = useQuery({
        queryKey: ['rumah', id],
        queryFn: () => rumahAPI.getById(id),
        enabled: !!id,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState('');

    useEffect(() => {
        if (rumah && id) {
            setFormData({
                nomor_rumah: rumah.data.data.nomor_rumah || '',
                status_huni: rumah.data.data.status_dihuni === 1,
            });
        }
    }, [rumah, id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const payload = {
            ...formData,
            status_dihuni: formData.status_huni ? 1 : 0,
        };

        mutation.mutate(payload);
    };

    const mutation = useMutation({
        mutationFn: (data) => (id ? rumahAPI.update(id, data) : rumahAPI.create(data)),
        onSuccess: () => {
            setIsLoading(false);
            setPopupMessage(id ? 'Rumah berhasil diperbarui' : 'Rumah berhasil ditambahkan');
            setPopupType('success');
            setTimeout(() => {
                navigate('/rumah');
            }, 2000);
        },
        onError: (error) => {
            setIsLoading(false);
            setPopupMessage('Gagal menyimpan rumah');
            setPopupType('error');
        },
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    if (isLoadingRumah) {
        return (
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-6">{id ? 'Edit Rumah' : 'Tambah Rumah Baru'}</h2>
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto bg-transparent p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">{id ? 'Edit Rumah' : 'Tambah Rumah Baru'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-white-700">Nomor Rumah</label>
                    <input
                        type="text"
                        name="nomor_rumah"
                        value={formData.nomor_rumah}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-white-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="status_huni"
                        checked={formData.status_huni}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-white-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-white-900">Status Dihuni</label>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        disabled={isLoading}
                    >
                        {id ? 'Update' : 'Tambah'}
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

export default RumahForm;
