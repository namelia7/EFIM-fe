// src/stores/notificationStores.ts
import { createSignal } from 'solid-js';

// Definisikan tipe untuk notifikasi
export type Notification = {
  id: number;
  message: string;
  time: string;
  read: boolean;
};

// Buat signal untuk menyimpan daftar notifikasi palsu
const [notifications, setNotifications] = createSignal<Notification[]>([
  {
    id: 1,
    message: 'Pesanan SO-002 telah disetujui.',
    time: '1 jam yang lalu',
    read: false,
  },
  {
    id: 2,
    message: 'Terdeteksi anomali pada Jaringan Jawa Tengah.',
    time: '3 jam yang lalu',
    read: false,
  },
  {
    id: 3,
    message: 'Rekonsiliasi harian telah selesai.',
    time: 'Kemarin',
    read: true,
  },
  {
    id: 4,
    message: 'Notifikasi sistem: Server akan dimatikan untuk pemeliharaan.',
    time: '1 hari yang lalu',
    read: true,
  },
]);

// Fungsi untuk menandai notifikasi sebagai sudah dibaca (opsional)
export const markAsRead = (id: number) => {
  setNotifications((prevNotifications) =>
    prevNotifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
  );
};

export { notifications };