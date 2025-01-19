import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { laporanAPI } from "../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); 
  const { data: summaryTahunan } = useQuery({
    queryKey: ["summaryTahunan"],
    queryFn: laporanAPI.getSummaryTahunan,
    select: (data) => {
      return data.data.data.map((item) => ({
        name: item.bulan,
        pemasukan: parseFloat(item.pemasukan),
        pengeluaran: parseFloat(item.pengeluaran),
        saldo: parseFloat(item.saldo),
      }));
    },
  });

  const { data: detailBulanan } = useQuery({
    queryKey: ["detailBulanan", selectedMonth],
    queryFn: () => laporanAPI.getDetailBulanan(selectedMonth),
    select: (data) => {
      const pemasukan = data.data.data.total_pemasukan;
      const pengeluaran = data.data.data.total_pengeluaran;
      const saldo = data.data.data.total_saldo;
    
      return {
        total_pemasukan: pemasukan ? parseFloat(pemasukan) : 0,
        total_pengeluaran: pengeluaran ? parseFloat(pengeluaran) : 0,
        total_saldo: saldo ? parseFloat(saldo) : 0,
      };
    }
    
  });

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    console.log(summaryTahunan, detailBulanan),
    <div className="p-6 min-h-screen w-full">
      <h1 className="text-3xl font-bold text-white-800">Dashboard RT</h1>

      {/* Dropdown untuk memilih bulan */}
      <div className="mt-4">
        <label htmlFor="month" className="block text-gray-700 font-bold">
          Pilih Bulan:
        </label>
        <select
          id="month"
          className="mt-2 border border-gray-300 p-2 rounded"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium">Total Pemasukan Bulan Ini</h3>
          <p className="text-3xl font-bold">{detailBulanan?.total_pemasukan || 0}</p>
        </div>
        <div className="bg-gradient-to-r from-red-400 to-red-600 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium">Total Pengeluaran Bulan Ini</h3>
          <p className="text-3xl font-bold">{detailBulanan?.total_pengeluaran || 0}</p>
        </div>
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium">Saldo Saat Ini</h3>
          <p className="text-3xl font-bold">{detailBulanan?.total_saldo || 0}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-xl text-gray-800 font-bold mb-4">Grafik Keuangan Tahunan</h2>
        {summaryTahunan ? (
          <LineChart width={800} height={400} data={summaryTahunan}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pemasukan"
              stroke="#82ca9d"
              name="Pemasukan"
            />
            <Line
              type="monotone"
              dataKey="pengeluaran"
              stroke="#8884d8"
              name="Pengeluaran"
            />
            <Line
              type="monotone"
              dataKey="saldo"
              stroke="#ff7300"
              name="Saldo"
            />
          </LineChart>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
