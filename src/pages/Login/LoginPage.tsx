import { createSignal, Show, onMount, createEffect } from 'solid-js';
import { login, authState, isLoading } from '../../stores/auth';
import { useNavigate } from '@solidjs/router';

const LoginPage = () => {
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [isVisible, setIsVisible] = createSignal(false);
  const [currentTime, setCurrentTime] = createSignal('');
  const navigate = useNavigate();

  // Animation entrance effect
  onMount(() => {
    setTimeout(() => setIsVisible(true), 100);
    
    // Update time every second
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

  const handleLogin = async (e: Event) => {
    e.preventDefault();
    await login(username(), password());
    
    setTimeout(() => {
      console.log('Checking auth state after login:', authState);
      if (authState.isLoggedIn) {
        console.log('Login successful, navigating to dashboard');
        navigate('/dashboard');
      } else {
        console.log('Login failed or still not logged in');
      }
    }, 100);
  };

  return (
    <div class="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div class="absolute inset-0">
        {/* Grid Pattern */}
        <div class="absolute inset-0 opacity-10">
          <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.4%22%3E%3Ccircle%20cx=%227%22%20cy=%227%22%20r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>
        
        {/* Floating Orbs */}
        <div class="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div class="absolute top-1/2 left-1/4 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl animate-bounce"></div>
      </div>

      {/* Network Lines Animation */}
      <svg class="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 800">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0" />
            <stop offset="50%" style="stop-color:#3b82f6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0" />
          </linearGradient>
        </defs>
        <path d="M0,200 Q250,100 500,200 T1000,200" 
              stroke="url(#lineGradient)" 
              stroke-width="2" 
              fill="none"
              class="animate-pulse">
        </path>
        <path d="M0,400 Q300,300 600,400 T1000,400" 
              stroke="url(#lineGradient)" 
              stroke-width="2" 
              fill="none"
              class="animate-pulse delay-500">
        </path>
      </svg>

      {/* Main Content Container */}
      <div class="relative z-10 flex min-h-screen">
        
        {/* Left Side - Brand & Info */}
        <div class={`w-1/2 flex flex-col justify-center px-20 transition-all duration-1000 ${
          isVisible() ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}>
          
          {/* Logo & Brand */}
          <div class="mb-12">
            <div class="flex items-center space-x-4 mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 3L4 14h6l-2 7 9-11h-6l2-7z"/>
                </svg>
              </div>
              <div>
                <h1 class="text-4xl font-bold text-white">Telkom</h1>
                <p class="text-blue-200 text-sm font-medium">Infrastructure Indonesia</p>
              </div>
            </div>
            
            <div class="space-y-3">
              <h2 class="text-5xl font-bold text-white leading-tight">
                Enhanced<br />
                <span class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Fulfillment
                </span>
              </h2>
              <p class="text-blue-200 text-lg leading-relaxed max-w-md">
                Inventory Management System dengan SurrealDB untuk optimasi jaringan fiber optik
              </p>
            </div>
          </div>

          {/* Feature Highlights */}
          <div class="space-y-4">
            <div class="flex items-center space-x-3 text-blue-100">
              <div class="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <span class="text-sm font-medium">Real-time Network Reconciliation</span>
            </div>
            <div class="flex items-center space-x-3 text-blue-100">
              <div class="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <span class="text-sm font-medium">AI-Powered Capacity Planning</span>
            </div>
            <div class="flex items-center space-x-3 text-blue-100">
              <div class="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
                </svg>
              </div>
              <span class="text-sm font-medium">Automated Bandwidth Allocation</span>
            </div>
          </div>

          {/* System Status */}
          <div class="mt-12 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span class="text-green-300 text-sm font-medium">System Online</span>
              </div>
              <span class="text-white/70 text-sm font-mono">{currentTime()}</span>
            </div>
            <div class="mt-2 text-xs text-white/50">
              SurrealDB Connected • Network Status: Optimal
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div class={`w-1/2 flex items-center justify-center p-20 transition-all duration-1000 delay-300 ${
          isVisible() ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}>
          
          <div class="w-full max-w-md">
            {/* Glass Card Container */}
            <div class="relative">
              {/* Card Glow Effect */}
              <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-3xl blur opacity-25 animate-pulse"></div>
              
              <div class="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
                
                {/* Form Header */}
                <div class="text-center mb-8">
                  <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-6">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </div>
                  <h3 class="text-2xl font-bold text-white mb-2">Secure Access</h3>
                  <p class="text-white/70 text-sm">Masuk ke sistem manajemen infrastruktur</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} class="space-y-6">
                  
                  {/* Username Field */}
                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-white/90 ml-1">
                      Username
                    </label>
                    <div class="relative group">
                      <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                      <input
                        type="text"
                        placeholder="Masukkan username"
                        value={username()}
                        onInput={(e) => setUsername(e.currentTarget.value)}
                        class="relative w-full px-4 py-3 rounded-xl bg-white/5 text-white placeholder-white/50 border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 backdrop-blur-sm"
                        required
                      />
                      <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <svg class="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Password Field */}
                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-white/90 ml-1">
                      Password
                    </label>
                    <div class="relative group">
                      <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                      <input
                        type="password"
                        placeholder="Masukkan password"
                        value={password()}
                        onInput={(e) => setPassword(e.currentTarget.value)}
                        class="relative w-full px-4 py-3 rounded-xl bg-white/5 text-white placeholder-white/50 border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 backdrop-blur-sm"
                        required
                      />
                      <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <svg class="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Error Display */}
                  <Show when={authState.error}>
                    <div class="p-3 bg-red-500/20 border border-red-400/30 rounded-xl backdrop-blur-sm">
                      <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span class="text-red-300 text-sm">{authState.error}</span>
                      </div>
                    </div>
                  </Show>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading()}
                    class="relative w-full group overflow-hidden"
                  >
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-xl"></div>
                    <div class="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg">
                      <Show 
                        when={!isLoading()} 
                        fallback={
                          <div class="flex items-center justify-center space-x-2">
                            <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Memproses...</span>
                          </div>
                        }
                      >
                        <div class="flex items-center justify-center space-x-2">
                          <span>Masuk ke Dashboard</span>
                          <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                               fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                          </svg>
                        </div>
                      </Show>
                    </div>
                  </button>

                </form>

                {/* Footer */}
                <div class="mt-6 pt-6 border-t border-white/10">
                  <p class="text-center text-xs text-white/50">
                    Powered by SurrealDB • Version 2.0.1
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div class="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm border-t border-white/10 px-6 py-3">
        <div class="flex items-center justify-between text-xs text-white/70">
          <div class="flex items-center space-x-4">
            <span>© 2025 Smartelco</span>
            <span>•</span>
            <span>Network Infrastructure Management</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Secure Connection</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;