// src/pages/Dashboard/DashboardPage.tsx
import { createSignal, onMount, For, Show } from 'solid-js';
import { LayoutGrid, Package, Activity, GitMerge, Zap, Globe, FileText, CheckCircle, ArrowRight, TrendingUp, AlertCircle, Clock, Users, Wifi, Server, Database } from 'lucide-solid';
import { useNavigate } from '@solidjs/router';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [data, setData] = createSignal<any | null>(null);
  const [activityFeed, setActivityFeed] = createSignal<any[]>([]);
  const [networkStatus, setNetworkStatus] = createSignal<any[]>([]);
  const [currentTime, setCurrentTime] = createSignal(new Date());
  const [isLoaded, setIsLoaded] = createSignal(false);

  onMount(() => {
    setIsLoaded(true);
    
    // Mock data - seharusnya dari API
    setData({
      totalActiveOrders: 1247,
      networkUtilization: 87,
      fiberAvailabilityStatus: "98.5%",
      pendingReconciliations: 23,
      totalRevenue: "Rp 847.2M",
      activeUsers: 15420,
      systemUptime: "99.97%",
      pendingTickets: 8
    });

    setActivityFeed([
      { user: "Ahmad Pratama", message: "completed fiber installation for customer ID 12847", time: "2 menit lalu", type: "success" },
      { user: "Sari Dewi", message: "initiated network reconciliation for area Jakarta Pusat", time: "5 menit lalu", type: "info" },
      { user: "System", message: "detected anomaly in network sector B-47", time: "12 menit lalu", type: "warning" },
      { user: "Budi Santoso", message: "resolved customer complaint #TLK-2024-1156", time: "18 menit lalu", type: "success" },
      { user: "System", message: "automated backup completed successfully", time: "1 jam lalu", type: "info" }
    ]);

    setNetworkStatus([
      { region: "Jakarta", status: "optimal", uptime: "99.8%", load: 78, devices: 245 },
      { region: "Surabaya", status: "good", uptime: "99.2%", load: 65, devices: 189 },
      { region: "Bandung", status: "warning", uptime: "97.1%", load: 92, devices: 156 },
      { region: "Medan", status: "optimal", uptime: "99.6%", load: 71, devices: 134 }
    ]);

    // Update time setiap detik
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval
    return () => clearInterval(timeInterval);
  });

  // Komponen Card yang dapat digunakan kembali untuk KPI
  const KPICard = (props: { title: string, value: string | number, icon: any, gradient: string, trend?: string, description?: string }) => {
    return (
      <div class={`relative p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br ${props.gradient} shadow-2xl text-white border border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl group overflow-hidden`}>
        {/* Animated Background Elements */}
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-700"></div>
          <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full transform -translate-x-12 translate-y-12 group-hover:scale-125 transition-transform duration-700 delay-100"></div>
        </div>
        
        {/* Floating dots */}
        <div class="absolute inset-0 opacity-20 pointer-events-none">
          <div class="absolute top-4 right-8 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div class="absolute top-12 right-12 w-1 h-1 bg-white rounded-full animate-pulse delay-300"></div>
          <div class="absolute bottom-8 right-6 w-1 h-1 bg-white rounded-full animate-pulse delay-700"></div>
        </div>
        
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-6">
            <div class="p-3 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg group-hover:bg-white/30 transition-all duration-300">
              <props.icon class="w-8 h-8" />
            </div>
            <Show when={props.trend}>
              <div class="flex items-center space-x-1 text-xs bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/30 font-medium">
                <TrendingUp class="w-3 h-3" />
                <span>{props.trend}</span>
              </div>
            </Show>
          </div>
          <div>
            <h3 class="text-3xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">{props.value}</h3>
            <p class="text-sm font-medium text-white/90 mb-1">{props.title}</p>
            <Show when={props.description}>
              <p class="text-xs text-white/70">{props.description}</p>
            </Show>
          </div>
        </div>
      </div>
    );
  };

  const ActivityIcon = (type: string) => {
    switch(type) {
      case 'success': return <CheckCircle class="w-4 h-4 text-emerald-400" />;
      case 'warning': return <AlertCircle class="w-4 h-4 text-amber-400" />;
      case 'info': return <Activity class="w-4 h-4 text-blue-400" />;
      default: return <Activity class="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'optimal': return 'text-emerald-400';
      case 'good': return 'text-blue-400';
      case 'warning': return 'text-amber-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status: string) => {
    switch(status) {
      case 'optimal': return 'from-emerald-500/20 to-green-600/20 border-emerald-500/30';
      case 'good': return 'from-blue-500/20 to-cyan-600/20 border-blue-500/30';
      case 'warning': return 'from-amber-500/20 to-orange-600/20 border-amber-500/30';
      case 'critical': return 'from-red-500/20 to-red-600/20 border-red-500/30';
      default: return 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
    }
  };

  return (
    <div class="space-y-8 min-h-screen">
      {/* Animated background elements to match layout */}
      <div class="fixed inset-0 pointer-events-none overflow-hidden">
        <div class="absolute top-40 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-40 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div class="absolute top-1/3 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl animate-bounce"></div>
      </div>

      {/* Header Dashboard */}
      <div class={`transition-all duration-700 ${isLoaded() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl"></div>
            <div class="relative backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20 shadow-2xl">
              <div class="flex items-center space-x-4">
                <div class="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                  <LayoutGrid class="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 class="text-3xl font-bold text-white mb-1">Infrastructure Dashboard</h1>
                  <p class="text-white/80">Real-time monitoring & management system</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex items-center space-x-6">
            <div class="backdrop-blur-xl bg-white/10 p-4 rounded-2xl border border-white/20 shadow-lg">
              <div class="flex items-center space-x-3">
                <div class="flex space-x-1">
                  <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-100"></div>
                  <div class="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
                </div>
                <div class="text-right">
                  <p class="text-xs text-white/70">Live Updates</p>
                  <p class="font-semibold text-white">{currentTime().toLocaleString('id-ID')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <Show when={data()}>
        <div class={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 delay-200 ${isLoaded() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <KPICard 
            title="Active Service Orders" 
            value={data().totalActiveOrders.toLocaleString('id-ID')} 
            icon={Package} 
            gradient="from-blue-500/30 to-blue-700/40"
            trend="+12%"
            description="Pesanan aktif bulan ini"
          />
          <KPICard 
            title="Network Utilization" 
            value={`${data().networkUtilization}%`} 
            icon={Zap} 
            gradient="from-emerald-500/30 to-green-700/40"
            trend="+5%"
            description="Rata-rata penggunaan jaringan"
          />
          <KPICard 
            title="Fiber Availability" 
            value={data().fiberAvailabilityStatus} 
            icon={Wifi} 
            gradient="from-purple-500/30 to-indigo-700/40"
            trend="+0.2%"
            description="Coverage fiber optic"
          />
          <KPICard 
            title="Pending Items" 
            value={data().pendingReconciliations} 
            icon={Clock} 
            gradient="from-amber-500/30 to-orange-600/40"
            trend="-8%"
            description="Items menunggu proses"
          />
        </div>
      </Show>

      {/* Secondary KPIs */}
      <Show when={data()}>
        <div class={`grid grid-cols-1 md:grid-cols-4 gap-4 transition-all duration-700 delay-300 ${isLoaded() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div class="backdrop-blur-xl bg-white/10 p-4 rounded-xl shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300 group">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-white/70 uppercase tracking-wide font-medium">Total Revenue</p>
                <p class="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">{data().totalRevenue}</p>
              </div>
              <div class="p-2 rounded-lg bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors">
                <TrendingUp class="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </div>
          
          <div class="backdrop-blur-xl bg-white/10 p-4 rounded-xl shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300 group">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-white/70 uppercase tracking-wide font-medium">Active Users</p>
                <p class="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">{data().activeUsers.toLocaleString('id-ID')}</p>
              </div>
              <div class="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                <Users class="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
          
          <div class="backdrop-blur-xl bg-white/10 p-4 rounded-xl shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300 group">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-white/70 uppercase tracking-wide font-medium">System Uptime</p>
                <p class="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">{data().systemUptime}</p>
              </div>
              <div class="p-2 rounded-lg bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors">
                <Server class="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </div>
          
          <div class="backdrop-blur-xl bg-white/10 p-4 rounded-xl shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300 group">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-white/70 uppercase tracking-wide font-medium">Open Tickets</p>
                <p class="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">{data().pendingTickets}</p>
              </div>
              <div class="p-2 rounded-lg bg-amber-500/20 group-hover:bg-amber-500/30 transition-colors">
                <AlertCircle class="w-6 h-6 text-amber-400" />
              </div>
            </div>
          </div>
        </div>
      </Show>

      <div class={`grid grid-cols-1 lg:grid-cols-3 gap-8 transition-all duration-700 delay-400 ${isLoaded() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Quick Actions Panel */}
        <div class="lg:col-span-1 relative">
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
          <div class="relative backdrop-blur-xl bg-white/10 p-6 rounded-2xl shadow-2xl border border-white/20">
            <h2 class="text-xl font-semibold text-white mb-6 flex items-center">
              <div class="p-2 rounded-lg bg-blue-500/20 mr-3">
                <LayoutGrid class="w-5 h-5 text-blue-400" />
              </div>
              Quick Actions
            </h2>
            <div class="space-y-4">
              <button 
                class="w-full group relative overflow-hidden px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600/80 to-blue-700/80 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-2xl border border-blue-500/30 backdrop-blur-sm"
                onClick={() => navigate('/orders')}
              >
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div class="relative flex items-center justify-between">
                  <span>Buat Service Order Baru</span>
                  <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              
              <button 
                class="w-full group relative overflow-hidden px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-600/80 to-green-700/80 hover:from-emerald-700 hover:to-green-800 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-2xl border border-emerald-500/30 backdrop-blur-sm"
                onClick={() => navigate('/reconciliation')}
              >
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div class="relative flex items-center justify-between">
                  <span>Jalankan Rekonsiliasi</span>
                  <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              
              <button 
                class="w-full group relative overflow-hidden px-6 py-4 rounded-xl bg-gradient-to-r from-purple-600/80 to-indigo-700/80 hover:from-purple-700 hover:to-indigo-800 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-2xl border border-purple-500/30 backdrop-blur-sm"
                onClick={() => navigate('/analytics')}
              >
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div class="relative flex items-center justify-between">
                  <span>Lihat Analytics AI</span>
                  <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div class="lg:col-span-2 relative">
          <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
          <div class="relative backdrop-blur-xl bg-white/10 p-6 rounded-2xl shadow-2xl border border-white/20">
            <h2 class="text-xl font-semibold text-white mb-6 flex items-center">
              <div class="p-2 rounded-lg bg-red-500/20 mr-3">
                <Activity class="w-5 h-5 text-red-400" />
              </div>
              Real-time Activity Feed
            </h2>
            <div class="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
              <For each={activityFeed()}>
                {(activity, index) => (
                  <div class={`flex items-start space-x-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-lg backdrop-blur-sm 
                    ${isLoaded() ? `animate-fade-in-up` : 'opacity-0'}`}
                    style={`animation-delay: ${index() * 100}ms`}
                  >
                    <div class="p-1.5 rounded-lg bg-white/10">
                      {ActivityIcon(activity.type)}
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm text-white">
                        <span class="font-semibold text-blue-300">{activity.user}</span> {activity.message}
                      </p>
                      <p class="text-xs text-white/60 mt-1 flex items-center">
                        <Clock class="w-3 h-3 mr-1" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>

      {/* Network Status Overview */}
      <div class={`relative transition-all duration-700 delay-500 ${isLoaded() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl"></div>
        <div class="relative backdrop-blur-xl bg-white/10 p-6 rounded-2xl shadow-2xl border border-white/20">
          <h2 class="text-xl font-semibold text-white mb-6 flex items-center justify-between">
            <div class="flex items-center">
              <div class="p-2 rounded-lg bg-indigo-500/20 mr-3">
                <Globe class="w-5 h-5 text-indigo-400" />
              </div>
              Network Regional Status
            </div>
            <div class="flex items-center space-x-2 text-xs text-white/60">
              <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>Real-time monitoring</span>
            </div>
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <For each={networkStatus()}>
              {(region, index) => (
                <div class={`relative group transition-all duration-500 hover:scale-105 ${isLoaded() ? `animate-fade-in-up` : 'opacity-0'}`}
                  style={`animation-delay: ${600 + index() * 150}ms`}
                >
                  <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl blur group-hover:blur-md transition-all"></div>
                  <div class={`relative p-5 rounded-xl bg-gradient-to-br ${getStatusBg(region.status)} border backdrop-blur-sm hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-2xl`}>
                    <div class="flex items-center justify-between mb-4">
                      <div class="flex items-center space-x-2">
                        <div class="p-1.5 rounded-lg bg-white/20">
                          <Database class="w-4 h-4 text-white" />
                        </div>
                        <h3 class="font-semibold text-white">{region.region}</h3>
                      </div>
                      <div class="flex items-center space-x-1">
                        <div class={`w-2 h-2 rounded-full animate-pulse ${
                          region.status === 'optimal' ? 'bg-emerald-400' :
                          region.status === 'good' ? 'bg-blue-400' :
                          region.status === 'warning' ? 'bg-amber-400' : 'bg-red-400'
                        }`}></div>
                        <span class={`text-xs font-medium capitalize ${getStatusColor(region.status)}`}>
                          {region.status}
                        </span>
                      </div>
                    </div>
                    
                    <div class="space-y-3">
                      <div class="flex justify-between text-sm">
                        <span class="text-white/70">Uptime:</span>
                        <span class="font-medium text-white">{region.uptime}</span>
                      </div>
                      <div class="flex justify-between text-sm">
                        <span class="text-white/70">Load:</span>
                        <span class="font-medium text-white">{region.load}%</span>
                      </div>
                      <div class="flex justify-between text-sm">
                        <span class="text-white/70">Devices:</span>
                        <span class="font-medium text-white">{region.devices}</span>
                      </div>
                      
                      {/* Load Progress Bar */}
                      <div class="w-full bg-white/20 rounded-full h-2 mt-3 overflow-hidden">
                        <div 
                          class={`h-2 rounded-full transition-all duration-1000 ${
                            region.load > 90 ? 'bg-gradient-to-r from-red-400 to-red-500' : 
                            region.load > 75 ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 
                            'bg-gradient-to-r from-emerald-400 to-green-500'
                          }`}
                          style={`width: ${region.load}%; animation-delay: ${800 + index() * 200}ms`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;