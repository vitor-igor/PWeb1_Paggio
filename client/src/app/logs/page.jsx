"use client";

import { useState, useEffect } from "react";
import { Geist, Geist_Mono, DM_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/admin/logs", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Falha ao buscar os logs.");
        }

        const data = await res.json();
        setLogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading) {
    return (
      <div
        className={`${geistSans.variable} ${geistMono.variable} ${dmMono.variable} flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#1f182a]`}
      >
        <p className="font-[Inter] text-white">Carregando logs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`${geistSans.variable} ${geistMono.variable} ${dmMono.variable} flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#1f182a]`}
      >
        <p className="font-[Inter] text-white">Erro: {error}</p>
      </div>
    );
  }

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${dmMono.variable} min-h-[calc(100vh-64px)] bg-[#1f182a] p-8 font-[Inter] text-[#fdf3f2]`}
    >
      <h1 className="mb-6 text-2xl font-bold">Logs de Ações</h1>
      <div className="overflow-x-auto rounded-lg bg-[#2a223a] p-4">
        <table className="min-w-full table-auto">
          <thead className="text-left">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Data</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.ID + log.Date} className="border-t border-gray-700">
                <td className="px-4 py-2">{log.ID}</td>
                <td className="px-4 py-2">{log.Date}</td>
                <td className="px-4 py-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      log.Status === "Login"
                        ? "bg-green-600/50 text-green-300"
                        : "bg-red-600/50 text-red-300"
                    }`}
                  >
                    {log.Status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
