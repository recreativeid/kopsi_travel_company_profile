/**
 * KOPSI TRAVEL - Client Side Logic
 * Routing highlights, tab filtering, and automated WhatsApp booking
 */

document.addEventListener('DOMContentLoaded', () => {

  // 2. Rute & Harga Filter Tabs (rute-harga.html)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const routeCards = document.querySelectorAll('.pricing-card[data-route]');

  if (filterBtns.length > 0 && routeCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetFilter = btn.getAttribute('data-filter');

        routeCards.forEach(card => {
          const cardRoute = card.getAttribute('data-route');
          if (targetFilter === 'all' || cardRoute === targetFilter) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.3s ease';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 3. Automated Booking Form -> WhatsApp (kontak.html)
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nama = document.getElementById('nama')?.value.trim();
      const whatsapp = document.getElementById('whatsapp')?.value.trim();
      const rute = document.getElementById('rute')?.value;
      const layanan = document.getElementById('layanan')?.value;
      const tanggal = document.getElementById('tanggal')?.value;
      const perwakilan = document.getElementById('perwakilan')?.value;
      const catatan = document.getElementById('catatan')?.value.trim();

      if (!nama || !whatsapp) {
        alert('Mohon lengkapi Nama Lengkap dan Nomor WhatsApp Anda.');
        return;
      }

      // Tentukan nomor WhatsApp target berdasarkan kantor perwakilan
      let targetPhone = '6282174495681'; // Default: Bukittinggi
      let namaPerwakilan = 'Kantor Perwakilan Bukittinggi (Pool Utama)';

      if (perwakilan === 'pekanbaru') {
        targetPhone = '6281274495681'; // Pekanbaru
        namaPerwakilan = 'Kantor Perwakilan Pekanbaru (Pusat Operasional)';
      }

      // Susun pesan WhatsApp terstruktur dan rapi
      const message = `*HALO ADMIN KOPSI TRAVEL*\n` +
        `_Pemesanan via Website Resmi KOPSI Travel_\n\n` +
        `📋 *DATA PENUMPANG / PENGIRIM:*\n` +
        `• *Nama Lengkap*: ${nama}\n` +
        `• *No. WhatsApp*: ${whatsapp}\n` +
        `• *Jenis Layanan*: ${layanan}\n` +
        `• *Rute Perjalanan*: ${rute}\n` +
        `• *Tanggal*: ${tanggal || 'Hari Ini / Secepatnya'}\n` +
        `• *Tujuan Kantor*: ${namaPerwakilan}\n\n` +
        `📍 *ALAMAT JEMPUT / DETAIL PAKET:*\n` +
        `${catatan ? catatan : 'Sesuai konfirmasi driver/admin'}\n\n` +
        `Mohon konfirmasi ketersediaan armada dan waktu penjemputan. Terima kasih!`;

      const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;

      // Buka tautan WhatsApp di tab baru
      window.open(waUrl, '_blank');
    });
  }
});
