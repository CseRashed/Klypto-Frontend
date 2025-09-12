import React, { useState } from "react";
import { CheckCircle, XCircle, Download } from "lucide-react";

// Sample static reports
const initialReports = [
  {
    id: 1,
    productName: "Wireless Headphones",
    sellerName: "TechStore",
    reporterName: "John Doe",
    reason: "Fake product description",
    status: "Pending",
    date: "2025-09-01",
  },
  {
    id: 2,
    productName: "Smart Watch",
    sellerName: "GadgetHub",
    reporterName: "Jane Smith",
    reason: "Late delivery issue",
    status: "Pending",
    date: "2025-09-05",
  },
  {
    id: 3,
    productName: "Laptop Bag",
    sellerName: "BagWorld",
    reporterName: "Alice",
    reason: "Received a damaged product",
    status: "Resolved",
    date: "2025-09-07",
  },
  {
    id: 4,
    productName: "Bluetooth Speaker",
    sellerName: "SoundPro",
    reporterName: "Mark",
    reason: "Counterfeit brand issue",
    status: "Rejected",
    date: "2025-09-08",
  },
];

// Export to CSV function
const exportToCSV = (reports) => {
  const headers = ["ID", "Product", "Seller", "Reporter", "Reason", "Status", "Date"];
  const rows = reports.map((r) => [
    r.id,
    r.productName,
    r.sellerName,
    r.reporterName,
    r.reason,
    r.status,
    r.date,
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.download = "reports.csv";
  link.click();
};

export default function Reports() {
  const [reports, setReports] = useState(initialReports);
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [page, setPage] = useState(1);
  const pageSize = 3;

  // Filter reports
  let filteredReports = reports.filter((r) => {
    const matchesStatus = filterStatus === "All" || r.status === filterStatus;
    const matchesSearch =
      r.productName.toLowerCase().includes(search.toLowerCase()) ||
      r.sellerName.toLowerCase().includes(search.toLowerCase()) ||
      r.reporterName.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Sort reports
  filteredReports = filteredReports.sort((a, b) =>
    sortOrder === "Newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );

  // Pagination
  const totalPages = Math.ceil(filteredReports.length / pageSize);
  const paginatedReports = filteredReports.slice((page - 1) * pageSize, page * pageSize);

  const handleStatusChange = (id, newStatus) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Customer Reports
        </h1>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow-sm w-48 md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={() => exportToCSV(filteredReports)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Filter + Sort */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
        <div className="flex gap-2 overflow-x-auto">
          {["All", "Pending", "Resolved", "Rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                filterStatus === status
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 shadow hover:bg-gray-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option>Newest</option>
          <option>Oldest</option>
        </select>
      </div>

      {/* Reports List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedReports.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">
            No reports found.
          </p>
        )}

        {paginatedReports.map((report) => (
          <div
            key={report.id}
            className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all relative"
          >
            <div className="flex justify-between items-start">
              <h2 className="font-bold text-lg text-gray-800">
                {report.productName}
              </h2>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  report.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : report.status === "Resolved"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {report.status}
              </span>
            </div>
            <p className="text-gray-600 mt-2">
              <span className="font-semibold">Seller:</span> {report.sellerName}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Reporter:</span> {report.reporterName}
            </p>
            <p
              className="text-gray-500 mt-2 truncate"
              title={report.reason} // Tooltip
            >
              {report.reason}
            </p>
            <p className="text-xs text-gray-400 mt-1">📅 {report.date}</p>

            {/* Action Buttons */}
            {report.status === "Pending" && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleStatusChange(report.id, "Resolved")}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
                >
                  <CheckCircle size={16} /> Resolve
                </button>
                <button
                  onClick={() => handleStatusChange(report.id, "Rejected")}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition"
                >
                  <XCircle size={16} /> Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className={`px-4 py-2 rounded-lg ${
              page === 1 ? "bg-gray-200 text-gray-400" : "bg-white shadow hover:bg-gray-100"
            }`}
          >
            Prev
          </button>
          <span className="font-semibold">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className={`px-4 py-2 rounded-lg ${
              page === totalPages
                ? "bg-gray-200 text-gray-400"
                : "bg-white shadow hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
