import { createSignal, createEffect, Show, For, onMount } from 'solid-js';
import { 
  Package, 
  Search, 
  Plus, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  XCircle,
  Eye,
  Zap,
  Network,
  MapPin,
  Calendar,
  Building,
  Activity,
  RefreshCw
} from 'lucide-solid';

// Define proper types for TypeScript-like structure
interface Order {
  id: string;
  customer: string;
  service: string;
  source: string;
  destination: string;
  status: 'pending_approval' | 'approved' | 'conflict' | 'processing' | 'completed' | 'rejected';
  bandwidth: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  created: string;
  updated: string;
  conflicts: string[];
  uim_status: string;
  nms_status: string;
  utilization: number;
  estimatedCompletion: string;
}

interface StatusConfig {
  label: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  icon: any;
}

interface PriorityConfig {
  color: string;
  bg: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = createSignal<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = createSignal<Order[]>([]);
  const [searchQuery, setSearchQuery] = createSignal('');
  const [selectedFilter, setSelectedFilter] = createSignal<string>('all');
  const [selectedOrder, setSelectedOrder] = createSignal<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = createSignal(false);
  const [showNewOrderModal, setShowNewOrderModal] = createSignal(false);
  const [isLoading, setIsLoading] = createSignal(false);
  const [currentTime, setCurrentTime] = createSignal('');

  // Mock data for demonstration
  const mockOrders: Order[] = [
    {
      id: 'ORD-001',
      customer: 'Telkomsel Jakarta',
      service: 'Metro-E 10 Gbps',
      source: 'TBS 1',
      destination: 'BTS Jagakarsa',
      status: 'pending_approval',
      bandwidth: '10 Gbps',
      priority: 'high',
      created: '2024-01-15T10:30:00',
      updated: '2024-01-15T14:22:00',
      conflicts: ['bandwidth_utilization'],
      uim_status: 'available',
      nms_status: 'conflict_detected',
      utilization: 75,
      estimatedCompletion: '2024-01-16T16:00:00'
    },
    {
      id: 'ORD-002', 
      customer: 'Bank Mandiri Pusat',
      service: 'Dedicated Internet 5 Gbps',
      source: 'TBS 2',
      destination: 'DC Kelapa Gading',
      status: 'approved',
      bandwidth: '5 Gbps',
      priority: 'medium',
      created: '2024-01-14T09:15:00',
      updated: '2024-01-15T11:45:00',
      conflicts: [],
      uim_status: 'available',
      nms_status: 'available',
      utilization: 45,
      estimatedCompletion: '2024-01-16T14:00:00'
    },
    {
      id: 'ORD-003',
      customer: 'Universitas Indonesia',
      service: 'Metro-E 25 Gbps',
      source: 'TBS 1',
      destination: 'Campus Depok',
      status: 'conflict',
      bandwidth: '25 Gbps',
      priority: 'high',
      created: '2024-01-15T08:45:00',
      updated: '2024-01-15T15:10:00',
      conflicts: ['capacity_exceeded', 'route_unavailable'],
      uim_status: 'limited',
      nms_status: 'unavailable',
      utilization: 95,
      estimatedCompletion: '2024-01-18T12:00:00'
    },
    {
      id: 'ORD-004',
      customer: 'PT Astra International',
      service: 'MPLS 15 Gbps',
      source: 'TBS 3',
      destination: 'HQ Sunter',
      status: 'processing',
      bandwidth: '15 Gbps',
      priority: 'high',
      created: '2024-01-13T14:20:00',
      updated: '2024-01-15T16:30:00',
      conflicts: [],
      uim_status: 'available',
      nms_status: 'provisioning',
      utilization: 60,
      estimatedCompletion: '2024-01-16T18:00:00'
    },
    {
      id: 'ORD-005',
      customer: 'Shopee Indonesia',
      service: 'Cloud Connect 50 Gbps',
      source: 'TBS 4',
      destination: 'AWS Direct Connect',
      status: 'completed',
      bandwidth: '50 Gbps',
      priority: 'critical',
      created: '2024-01-12T11:00:00',
      updated: '2024-01-15T13:15:00',
      conflicts: [],
      uim_status: 'active',
      nms_status: 'active',
      utilization: 80,
      estimatedCompletion: '2024-01-15T12:00:00'
    }
  ];

  onMount(() => {
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
    
    // Update time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    updateTime();
    setInterval(updateTime, 1000);
  });

  // Filter and search logic
  createEffect(() => {
    let filtered = orders();

    // Apply status filter
    if (selectedFilter() !== 'all') {
      filtered = filtered.filter(order => order.status === selectedFilter());
    }

    // Apply search
    if (searchQuery().trim()) {
      const query = searchQuery().toLowerCase();
      filtered = filtered.filter(order => 
        order.customer.toLowerCase().includes(query) ||
        order.id.toLowerCase().includes(query) ||
        order.service.toLowerCase().includes(query) ||
        order.source.toLowerCase().includes(query) ||
        order.destination.toLowerCase().includes(query)
      );
    }

    setFilteredOrders(filtered);
  });

  const getStatusConfig = (status: Order['status']): StatusConfig => {
    const configs: Record<Order['status'], StatusConfig> = {
      pending_approval: {
        label: 'Menunggu Persetujuan',
        bgColor: 'bg-yellow-500/20',
        textColor: 'text-yellow-300',
        borderColor: 'border-yellow-500/30',
        icon: Clock
      },
      approved: {
        label: 'Disetujui',
        bgColor: 'bg-green-500/20',
        textColor: 'text-green-300',
        borderColor: 'border-green-500/30',
        icon: CheckCircle
      },
      conflict: {
        label: 'Konflik Terdeteksi',
        bgColor: 'bg-red-500/20',
        textColor: 'text-red-300',
        borderColor: 'border-red-500/30',
        icon: AlertTriangle
      },
      processing: {
        label: 'Sedang Diproses',
        bgColor: 'bg-blue-500/20',
        textColor: 'text-blue-300',
        borderColor: 'border-blue-500/30',
        icon: RefreshCw
      },
      completed: {
        label: 'Selesai',
        bgColor: 'bg-purple-500/20',
        textColor: 'text-purple-300',
        borderColor: 'border-purple-500/30',
        icon: CheckCircle
      },
      rejected: {
        label: 'Ditolak',
        bgColor: 'bg-gray-500/20',
        textColor: 'text-gray-300',
        borderColor: 'border-gray-500/30',
        icon: XCircle
      }
    };
    return configs[status];
  };

  const getPriorityConfig = (priority: Order['priority']): PriorityConfig => {
    const configs: Record<Order['priority'], PriorityConfig> = {
      low: { color: 'text-gray-400', bg: 'bg-gray-500/20' },
      medium: { color: 'text-blue-300', bg: 'bg-blue-500/20' },
      high: { color: 'text-orange-300', bg: 'bg-orange-500/20' },
      critical: { color: 'text-red-300', bg: 'bg-red-500/20' }
    };
    return configs[priority];
  };

  const getUtilizationColor = (utilization: number): string => {
    if (utilization >= 90) return 'text-red-400';
    if (utilization >= 75) return 'text-orange-400';
    if (utilization >= 50) return 'text-yellow-400';
    return 'text-green-400';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleApproveOrder = (orderId: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status: 'approved' as const, updated: new Date().toISOString() }
          : order
      ));
      setIsLoading(false);
      alert('Order berhasil disetujui');
    }, 1000);
  };

  const handleRejectOrder = (orderId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status: 'rejected' as const, updated: new Date().toISOString() }
          : order
      ));
      setIsLoading(false);
      alert('Order ditolak');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur"></div>
          <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Manajemen Service Orders</h1>
                <p className="text-blue-200">Sinkronisasi bandwidth allocation & inventory management</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <Activity className="w-4 h-4 text-green-400" />
                  <span className="text-white text-sm">Live</span>
                  <span className="text-white/60 text-sm">{currentTime()}</span>
                </div>
                <button
                  onClick={() => setShowNewOrderModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all transform hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span>Order Baru</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl blur"></div>
          <div className="relative bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                  <input
                    type="text"
                    placeholder="Cari berdasarkan customer, order ID, service..."
                    value={searchQuery()}
                    onInput={(e) => setSearchQuery(e.currentTarget.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-white placeholder-white/50"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex space-x-2 overflow-x-auto">
                {[
                  { value: 'all', label: 'Semua', count: orders().length },
                  { value: 'pending_approval', label: 'Pending', count: orders().filter(o => o.status === 'pending_approval').length },
                  { value: 'approved', label: 'Approved', count: orders().filter(o => o.status === 'approved').length },
                  { value: 'conflict', label: 'Conflict', count: orders().filter(o => o.status === 'conflict').length },
                  { value: 'processing', label: 'Processing', count: orders().filter(o => o.status === 'processing').length },
                  { value: 'completed', label: 'Completed', count: orders().filter(o => o.status === 'completed').length }
                ].map(filter => (
                  <button
                    key={filter.value}
                    onClick={() => setSelectedFilter(filter.value)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                      selectedFilter() === filter.value
                        ? 'bg-blue-500/30 text-white border border-blue-400/50'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-transparent'
                    }`}
                  >
                    <span>{filter.label}</span>
                    <span className="px-2 py-1 bg-white/20 rounded-full text-xs">{filter.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl blur"></div>
          <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Order Info</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Route</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Utilization</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <For each={filteredOrders()}>
                    {(order) => {
                      const statusConfig = getStatusConfig(order.status);
                      const priorityConfig = getPriorityConfig(order.priority);
                      const StatusIcon = statusConfig.icon;
                      
                      return (
                        <tr className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-white">{order.id}</span>
                                <div className={`px-2 py-1 rounded-full text-xs ${priorityConfig.bg} ${priorityConfig.color}`}>
                                  {order.priority.toUpperCase()}
                                </div>
                              </div>
                              <div className="text-xs text-white/60">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>{formatDate(order.created)}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <Building className="w-4 h-4 text-blue-400" />
                              <span className="text-white font-medium">{order.customer}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <Network className="w-4 h-4 text-purple-400" />
                                <span className="text-white">{order.service}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Zap className="w-3 h-3 text-yellow-400" />
                                <span className="text-white/70 text-sm">{order.bandwidth}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-3 h-3 text-green-400" />
                                <span className="text-white/80">{order.source}</span>
                              </div>
                              <div className="text-white/60">↓</div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-3 h-3 text-red-400" />
                                <span className="text-white/80">{order.destination}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-lg border ${statusConfig.bgColor} ${statusConfig.textColor} ${statusConfig.borderColor}`}>
                                <StatusIcon className="w-3 h-3" />
                                <span className="text-xs font-medium">{statusConfig.label}</span>
                              </div>
                              <Show when={order.conflicts.length > 0}>
                                <div className="flex items-center space-x-1">
                                  <AlertTriangle className="w-3 h-3 text-red-400" />
                                  <span className="text-xs text-red-300">{order.conflicts.length} konflik</span>
                                </div>
                              </Show>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <div className="flex-1 bg-white/10 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      order.utilization >= 90 ? 'bg-red-500' :
                                      order.utilization >= 75 ? 'bg-orange-500' :
                                      order.utilization >= 50 ? 'bg-yellow-500' : 'bg-green-500'
                                    }`}
                                    style={{width: `${order.utilization}%`}}
                                  />
                                </div>
                                <span className={`text-sm font-medium ${getUtilizationColor(order.utilization)}`}>
                                  {order.utilization}%
                                </span>
                              </div>
                              <div className="flex space-x-2 text-xs">
                                <div className={`px-2 py-1 rounded ${order.uim_status === 'available' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                                  UIM: {order.uim_status}
                                </div>
                                <div className={`px-2 py-1 rounded ${order.nms_status === 'available' ? 'bg-green-500/20 text-green-300' : order.nms_status === 'conflict_detected' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                                  NMS: {order.nms_status}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setShowOrderModal(true);
                                }}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4 text-white/70 hover:text-white" />
                              </button>
                              <Show when={order.status === 'pending_approval'}>
                                <button
                                  onClick={() => handleApproveOrder(order.id)}
                                  disabled={isLoading()}
                                  className="p-2 hover:bg-green-500/20 rounded-lg transition-colors disabled:opacity-50"
                                  title="Approve Order"
                                >
                                  <CheckCircle className="w-4 h-4 text-green-400 hover:text-green-300" />
                                </button>
                              </Show>
                              <Show when={order.status === 'conflict'}>
                                <button
                                  onClick={() => handleRejectOrder(order.id)}
                                  disabled={isLoading()}
                                  className="p-2 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50"
                                  title="Resolve Conflict"
                                >
                                  <AlertTriangle className="w-4 h-4 text-red-400 hover:text-red-300" />
                                </button>
                              </Show>
                            </div>
                          </td>
                        </tr>
                      );
                    }}
                  </For>
                </tbody>
              </table>

              <Show when={filteredOrders().length === 0}>
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white/80 mb-2">Tidak ada order ditemukan</h3>
                  <p className="text-white/60">Coba ubah filter atau tambah order baru</p>
                </div>
              </Show>
            </div>
          </div>
        </div>

        {/* Order Detail Modal */}
        <Show when={showOrderModal()}>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Order Details - {selectedOrder()?.id}</h2>
                  <button
                    onClick={() => setShowOrderModal(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <XCircle className="w-6 h-6 text-white/70 hover:text-white" />
                  </button>
                </div>

                <Show when={selectedOrder()}>
                  {(order) => (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Order Information */}
                      <div className="space-y-4">
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                          <h3 className="text-lg font-semibold text-white mb-4">Informasi Order</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-white/70">Customer:</span>
                              <span className="text-white font-medium">{order().customer}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Service:</span>
                              <span className="text-white">{order().service}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Bandwidth:</span>
                              <span className="text-white">{order().bandwidth}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Priority:</span>
                              <span className={`px-2 py-1 rounded text-xs ${getPriorityConfig(order().priority).bg} ${getPriorityConfig(order().priority).color}`}>
                                {order().priority.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                          <h3 className="text-lg font-semibold text-white mb-4">Route Information</h3>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <MapPin className="w-4 h-4 text-green-400" />
                              <div>
                                <div className="text-white/70 text-sm">Source</div>
                                <div className="text-white font-medium">{order().source}</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-center">
                              <div className="h-8 w-px bg-white/30"></div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <MapPin className="w-4 h-4 text-red-400" />
                              <div>
                                <div className="text-white/70 text-sm">Destination</div>
                                <div className="text-white font-medium">{order().destination}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Status and Conflicts */}
                      <div className="space-y-4">
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                          <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-white/70">UIM Status:</span>
                              <div className={`px-3 py-1 rounded-lg ${
                                order().uim_status === 'available' 
                                  ? 'bg-green-500/20 text-green-300' 
                                  : 'bg-red-500/20 text-red-300'
                              }`}>
                                {order().uim_status}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-white/70">NMS Status:</span>
                              <div className={`px-3 py-1 rounded-lg ${
                                order().nms_status === 'available' 
                                  ? 'bg-green-500/20 text-green-300' 
                                  : order().nms_status === 'conflict_detected'
                                  ? 'bg-red-500/20 text-red-300'
                                  : 'bg-yellow-500/20 text-yellow-300'
                              }`}>
                                {order().nms_status}
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-white/70">Utilization:</span>
                                <span className={`font-medium ${getUtilizationColor(order().utilization)}`}>
                                  {order().utilization}%
                                </span>
                              </div>
                              <div className="bg-white/10 rounded-full h-3">
                                <div 
                                  className={`h-3 rounded-full ${
                                    order().utilization >= 90 ? 'bg-red-500' :
                                    order().utilization >= 75 ? 'bg-orange-500' :
                                    order().utilization >= 50 ? 'bg-yellow-500' : 'bg-green-500'
                                  }`}
                                  style={{width: `${order().utilization}%`}}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <Show when={order().conflicts?.length > 0}>
                          <div className="bg-red-500/10 backdrop-blur-sm rounded-xl p-4 border border-red-500/20">
                            <h3 className="text-lg font-semibold text-red-300 mb-4 flex items-center space-x-2">
                              <AlertTriangle className="w-5 h-5" />
                              <span>Konflik Terdeteksi</span>
                            </h3>
                            <div className="space-y-2">
                              <For each={order().conflicts}>
                                {(conflict) => (
                                  <div className="flex items-center space-x-2 p-2 bg-red-500/20 rounded-lg">
                                    <XCircle className="w-4 h-4 text-red-400" />
                                    <span className="text-red-200 text-sm capitalize">
                                      {conflict.replace('_', ' ')}
                                    </span>
                                  </div>
                                )}
                              </For>
                            </div>
                          </div>
                        </Show>

                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                          <h3 className="text-lg font-semibold text-white mb-4">Timeline</h3>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                              <div>
                                <div className="text-white/70 text-sm">Created</div>
                                <div className="text-white text-sm">{formatDate(order().created)}</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                              <div>
                                <div className="text-white/70 text-sm">Last Updated</div>
                                <div className="text-white text-sm">{formatDate(order().updated)}</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <div>
                                <div className="text-white/70 text-sm">Est. Completion</div>
                                <div className="text-white text-sm">{formatDate(order().estimatedCompletion)}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-4">
                      <Show when={order().status === 'pending_approval'}>
                        <button
                          onClick={() => {
                            handleRejectOrder(order().id);
                            setShowOrderModal(false);
                          }}
                          className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
                        >
                          Tolak Order
                        </button>
                        <button
                          onClick={() => {
                            handleApproveOrder(order().id);
                            setShowOrderModal(false);
                          }}
                          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all"
                        >
                          Setujui Order
                        </button>
                      </Show>
                    </div>
                  )}
                </Show>
              </div>
            </div>
          </div>
        </Show>

        {/* New Order Modal */}
        <Show when={showNewOrderModal()}>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Order Baru</h2>
                  <button
                    onClick={() => setShowNewOrderModal(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <XCircle className="w-6 h-6 text-white/70 hover:text-white" />
                  </button>
                </div>

                <form className="space-y-6" onSubmit={(e) => {
                  e.preventDefault();
                  alert('Order baru berhasil dibuat');
                  setShowNewOrderModal(false);
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Customer</label>
                      <input
                        type="text"
                        placeholder="Nama customer"
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-white placeholder-white/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Service Type</label>
                      <select className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-white">
                        <option value="">Pilih service</option>
                        <option value="metro-e">Metro Ethernet</option>
                        <option value="dedicated">Dedicated Internet</option>
                        <option value="mpls">MPLS</option>
                        <option value="cloud-connect">Cloud Connect</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Source</label>
                      <input
                        type="text"
                        placeholder="TBS source"
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-white placeholder-white/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Destination</label>
                      <input
                        type="text"
                        placeholder="Lokasi tujuan"
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-white placeholder-white/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Bandwidth</label>
                      <select className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-white">
                        <option value="">Pilih bandwidth</option>
                        <option value="1">1 Gbps</option>
                        <option value="5">5 Gbps</option>
                        <option value="10">10 Gbps</option>
                        <option value="25">25 Gbps</option>
                        <option value="50">50 Gbps</option>
                        <option value="100">100 Gbps</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Priority</label>
                      <select className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-white">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Notes</label>
                    <textarea
                      rows={3}
                      placeholder="Catatan tambahan..."
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-white placeholder-white/50 resize-none"
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowNewOrderModal(false)}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all"
                    >
                      Buat Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default OrdersPage;