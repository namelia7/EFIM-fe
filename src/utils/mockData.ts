// src/utils/mockData.ts

// --- Dashboard Data ---
export const getDashboardData = () => {
  return {
    totalActiveOrders: 1245,
    networkUtilization: 78,
    fiberAvailabilityStatus: 'Online',
    pendingReconciliations: 32,
    aiPredictionsAlert: 'Potensi bottleneck di Jakarta Selatan pada 15:00 WIB',
  };
};

// --- Service Orders & Reconciliation ---
export const getServiceOrders = () => {
  return [
    { id: 'SO-001', customer: 'Telkomsel', status: 'Pending Approval', bandwidth: '1 Gbps' },
    { id: 'SO-002', customer: 'PT. Telekomunikasi Indonesia', status: 'In Progress', bandwidth: '500 Mbps' },
    { id: 'SO-003', customer: 'PLN Persero', status: 'Completed', bandwidth: '200 Mbps' },
  ];
};

export const getReconciliationData = () => {
  return [
    { id: 'DIS-001', location: 'Bandung', discrepancy: 'UIM: 100 fibers, NMS: 98 fibers', status: 'Unresolved' },
    { id: 'DIS-002', location: 'Surabaya', discrepancy: 'Data IP Address tidak sinkron', status: 'Resolved' },
  ];
};

// --- Fungsi Mock Baru untuk DashboardPage ---

/**
 * Mengembalikan daftar aktivitas terbaru yang disimulasikan.
 * Ini mensimulasikan log aktivitas dari berbagai pengguna dan sistem.
 */
export const getRecentActivity = () => {
  return [
    { id: 1, user: 'Budi', message: 'menyetujui Service Order SO-002', time: '1 jam yang lalu' },
    { id: 2, user: 'Santi', message: 'menjalankan rekonsiliasi jaringan manual untuk area Medan', time: '2 jam yang lalu' },
    { id: 3, user: 'AI System', message: 'mendeteksi peningkatan lalu lintas 15% pada Jaringan Surabaya', time: '4 jam yang lalu' },
    { id: 4, user: 'Administrator', message: 'menambahkan user baru: Tono', time: '5 jam yang lalu' },
  ];
};

/**
 * Mengembalikan data status jaringan yang disimulasikan.
 * Ini mensimulasikan status node-node jaringan di berbagai lokasi.
 */
export const getNetworkStatus = () => {
  return [
    { id: 'node-A', location: 'Jakarta', status: 'Online', latency: '10ms' },
    { id: 'node-B', location: 'Surabaya', status: 'Online', latency: '12ms' },
    { id: 'node-C', location: 'Medan', status: 'Offline', latency: 'N/A' },
    { id: 'node-D', location: 'Makassar', status: 'Online', latency: '15ms' },
  ];
};