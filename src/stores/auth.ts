import { createStore } from 'solid-js/store';
import { createSignal } from 'solid-js';

// Definisikan tipe untuk state otentikasi
type AuthState = {
  isLoggedIn: boolean;
  user: { username: string; token: string } | null;
  error: string | null;
};

// Buat store SolidJS untuk mengelola state otentikasi
const [authState, setAuthState] = createStore<AuthState>({
  isLoggedIn: false,
  user: null,
  error: null,
});

// Signal untuk status loading
const [isLoading, setIsLoading] = createSignal(false);

// Kredensial palsu untuk simulasi otentikasi
const MOCK_CREDENTIALS = {
  username: 'telkom_admin',
  password: '123'
};

/**
 * Fungsi login palsu yang mensimulasikan permintaan backend.
 * @param username - Username yang dimasukkan pengguna.
 * @param password - Password yang dimasukkan pengguna.
 */
export const login = async (username: string, password: string): Promise<boolean> => {
  setIsLoading(true);
  setAuthState('error', null); // Clear error sebelum login

  // Simulasi penundaan jaringan 1 detik
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (username === MOCK_CREDENTIALS.username && password === MOCK_CREDENTIALS.password) {
    const mockToken = `fake-token-${Date.now()}`;
    localStorage.setItem('auth_token', mockToken);
   
    // Update store dengan benar - menggunakan batch update
    setAuthState({
      isLoggedIn: true,
      user: { username, token: mockToken },
      error: null,
    });
   
    console.log('Login berhasil, authState:', authState);
    setIsLoading(false);
    return true; // Return true untuk success
  } else {
    // Update store untuk login gagal
    setAuthState({
      isLoggedIn: false,
      user: null,
      error: 'Kredensial salah. Coba username: telkom_admin dan password: 123'
    });
   
    console.log('Login gagal, authState:', authState);
    setIsLoading(false);
    return false; // Return false untuk failure
  }
};

/**
 * Fungsi untuk mengakhiri sesi pengguna.
 */
export const logout = () => {
  localStorage.removeItem('auth_token');
  setAuthState({
    isLoggedIn: false,
    user: null,
    error: null
  });
};

/**
 * Fungsi untuk memeriksa status otentikasi dari penyimpanan lokal saat aplikasi dimuat.
 */
export const checkAuthStatus = () => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    localStorage.setItem('isAuthenticated', 'true'); // Pastikan flag ini ada
    setAuthState({
      isLoggedIn: true,
      user: { username: 'Telkom User', token },
      error: null
    });
  }
};

export { authState, isLoading };