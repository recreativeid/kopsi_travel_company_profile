const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware parsing json & form urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from root and public
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'public')));

// HTML routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/rute-harga', (req, res) => {
  res.sendFile(path.join(__dirname, 'rute-harga.html'));
});

app.get('/kontak', (req, res) => {
  res.sendFile(path.join(__dirname, 'kontak.html'));
});

// API helper for quick booking verification
app.post('/api/booking', (req, res) => {
  const { nama, whatsapp, rute, layanan, tanggal, perwakilan, catatan } = req.body;

  if (!nama || !whatsapp) {
    return res.status(400).json({
      success: false,
      message: 'Nama dan Nomor WhatsApp wajib diisi.'
    });
  }

  // Pilih nomor WhatsApp tujuan berdasarkan kantor perwakilan
  const phoneTarget = perwakilan === 'pekanbaru' ? '6281274495681' : '6282174495681';
  
  const textMessage = `*Halo Admin KOPSI Travel, Saya ingin memesan:*\n\n` +
    `• *Nama*: ${nama}\n` +
    `• *No. WhatsApp*: ${whatsapp}\n` +
    `• *Layanan*: ${layanan || 'Travel Penumpang'}\n` +
    `• *Rute*: ${rute || 'Bukittinggi - Pekanbaru'}\n` +
    `• *Tanggal*: ${tanggal || '-'}\n` +
    `• *Perwakilan*: ${perwakilan === 'pekanbaru' ? 'Kantor Pekanbaru' : 'Kantor Bukittinggi'}\n` +
    `• *Catatan / Alamat*: ${catatan || '-'}\n\n` +
    `Mohon info ketersediaan armada dan konfirmasi jadwal. Terima kasih!`;

  const waUrl = `https://wa.me/${phoneTarget}?text=${encodeURIComponent(textMessage)}`;

  return res.json({
    success: true,
    message: 'Data booking berhasil disusun',
    data: {
      nama,
      whatsapp,
      rute,
      layanan,
      tanggal,
      phoneTarget,
      waUrl
    }
  });
});

// Fallback 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 KOPSI Travel Company Profile Server Running`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📅 Beranda: http://localhost:${PORT}/`);
  console.log(`🛣️  Rute & Harga: http://localhost:${PORT}/rute-harga`);
  console.log(`📞 Kontak: http://localhost:${PORT}/kontak`);
  console.log(`====================================================`);
});
