// src/App.tsx
import { Router, Route, Navigate } from '@solidjs/router';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/DashboardPage';
import Login from './pages/Login/LoginPage';
import Orders from './pages/OrdersPage';
import { onMount } from 'solid-js';
import { checkAuthStatus } from './stores/auth';
function App() {
  onMount(() => {
    checkAuthStatus(); // Cek auth saat app dimuat
  });
  return (
    <Router>
      <Route 
        path="/dashboard" 
        component={() => (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        )} 
      />
      <Route 
        path="/orders" 
        component={() => (
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        )} 
      />
      <Route path="/login" component={Login} />
      <Route path="/" component={() => <Navigate href="/dashboard" />} />
      <Route path="/" component={() => <Navigate href="/orders" />} />
    </Router>
  );
}

export default App;
