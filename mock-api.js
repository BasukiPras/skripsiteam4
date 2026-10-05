/**
 * MOCK API — Gehenk Bike (untuk pengujian UT / tampilan, tanpa backend)
 * ======================================================================
 * File ini menimpa window.fetch supaya setiap panggilan ke /api/... dibalas
 * oleh data dummy di memori browser (array JS biasa), bukan oleh Laravel.
 * Semua file HTML/CSS/JS asli dipakai PERSIS SAMA tanpa diubah - cukup satu
 * baris <script src="mock-api.js"></script> ditambahkan di setiap halaman,
 * dimuat sebelum script asli halaman itu jalan.
 *
 * Reload halaman (F5) akan mengembalikan semua data dummy ke kondisi awal,
 * karena semuanya cuma hidup di memori, tidak pernah ditulis ke disk.
 */
(function () {
  const now = () => new Date();
  const iso = (d) => new Date(d).toISOString();
  const daysAgo = (n, h = 10, m = 0) => { const d = new Date(); d.setDate(d.getDate() - n); d.setHours(h, m, 0, 0); return d; };
  const today = () => new Date().toISOString().slice(0, 10);

  /* ==================== DATA DUMMY ==================== */

  const DB = {
    me: { id: 1, name: 'Cecep Supriadi', email: 'owner@gehenkbike.id', job: 'owner', status_aktif: true },

    users: [
      { id: 1, name: 'Cecep Supriadi', email: 'owner@gehenkbike.id', job: 'owner', status_aktif: true, status_kerja: 'luang' },
      { id: 2, name: 'Dedi Saputra', email: 'dedi@gehenkbike.id', job: 'mekanik', status_aktif: true, status_kerja: 'sibuk' },
      { id: 3, name: 'Rian Gunawan', email: 'rian@gehenkbike.id', job: 'mekanik', status_aktif: true, status_kerja: 'luang' },
      { id: 4, name: 'Yusuf Hidayat', email: 'yusuf@gehenkbike.id', job: 'mekanik', status_aktif: false, status_kerja: 'luang' },
    ],

    kategoriSparepart: [
      { id: 1, nama: 'Rem' }, { id: 2, nama: 'Ban' }, { id: 3, nama: 'Rantai & Gear' },
      { id: 4, nama: 'Aksesori' }, { id: 5, nama: 'Pelumas' },
    ],

    sparepart: [
      { id: 1, nama: 'Kampas Rem Cakram', kode: 'SP-001', kategori_sparepart_id: 1, kategori: { id: 1, nama: 'Rem' }, kategori_utama: 'sparepart', satuan: 'pcs', harga: 45000, stok: 23, stok_minimum: 5 },
      { id: 2, nama: 'Ban Luar 26 inch', kode: 'SP-002', kategori_sparepart_id: 2, kategori: { id: 2, nama: 'Ban' }, kategori_utama: 'sparepart', satuan: 'pcs', harga: 120000, stok: 4, stok_minimum: 5 },
      { id: 3, nama: 'Rantai KMC Z8', kode: 'SP-003', kategori_sparepart_id: 3, kategori: { id: 3, nama: 'Rantai & Gear' }, kategori_utama: 'sparepart', satuan: 'pcs', harga: 85000, stok: 15, stok_minimum: 5 },
      { id: 4, nama: 'Helm Sepeda MTB', kode: 'AS-001', kategori_sparepart_id: 4, kategori: { id: 4, nama: 'Aksesori' }, kategori_utama: 'aksesoris', satuan: 'pcs', harga: 150000, stok: 8, stok_minimum: 3 },
      { id: 5, nama: 'Lampu Depan LED', kode: 'AS-002', kategori_sparepart_id: 4, kategori: { id: 4, nama: 'Aksesori' }, kategori_utama: 'aksesoris', satuan: 'pcs', harga: 65000, stok: 12, stok_minimum: 4 },
      { id: 6, nama: 'Oli Rantai', kode: 'SP-004', kategori_sparepart_id: 5, kategori: { id: 5, nama: 'Pelumas' }, kategori_utama: 'sparepart', satuan: 'botol', harga: 25000, stok: 2, stok_minimum: 5 },
    ],

    sepeda: [
      { id: 1, merek: 'Polygon', nama: 'Xtrada 7', kategori: 'MTB', kondisi: 'baru', harga: 6500000, stok: 3, foto_url: null },
      { id: 2, merek: 'United', nama: 'Detroit', kategori: 'City Bike', kondisi: 'baru', harga: 2800000, stok: 5, foto_url: null },
      { id: 3, merek: 'Wimcycle', nama: 'BMX Trial X', kategori: 'BMX', kondisi: 'bekas', harga: 950000, stok: 2, foto_url: null },
      { id: 4, merek: 'Pacific', nama: 'Invert 2.0', kategori: 'MTB', kondisi: 'bekas', harga: 1800000, stok: 1, foto_url: null },
    ],

    pelanggan: [
      { id: 1, nama: 'Bagus Prasetyo', no_hp: '081234567890', created_at: iso(daysAgo(2)) },
      { id: 2, nama: 'Siti Rahma', no_hp: '081298765432', created_at: iso(daysAgo(15)) },
      { id: 3, nama: 'Agus Wijaya', no_hp: '082112345678', created_at: iso(daysAgo(40)) },
      { id: 4, nama: 'Rina Marlina', no_hp: '085611122233', created_at: iso(daysAgo(1)) },
      { id: 5, nama: 'Hendra Kusuma', no_hp: '087855566677', created_at: iso(daysAgo(60)) },
    ],

    tiketServis: [
      {
        id: 1, nomor_tiket: 'RJ-0101', pelanggan_id: 1, pelanggan: { id: 1, nama: 'Bagus Prasetyo', no_hp: '081234567890' },
        jenis_sepeda: 'MTB', keluhan: 'Rem depan bunyi, gear belakang seret', mekanik_id: 2, mekanik: { id: 2, name: 'Dedi Saputra' },
        status: 'menunggu', kompleksitas: 'sedang', total_biaya: 95000, tanggal_masuk: iso(daysAgo(0, 9)), tanggal_selesai: null,
        detail_layanan: [{ id: 1, nama_layanan: 'Servis Ringan', biaya: 50000 }],
        detail_sparepart: [{ id: 1, sparepart_id: 1, qty: 1, harga_satuan: 45000, sparepart: { nama: 'Kampas Rem Cakram' } }],
        estimasi: { estimasi_text: '± 1 jam lagi' },
      },
      {
        id: 2, nomor_tiket: 'RJ-0102', pelanggan_id: 2, pelanggan: { id: 2, nama: 'Siti Rahma', no_hp: '081298765432' },
        jenis_sepeda: 'City Bike', keluhan: 'Ban belakang bocor', mekanik_id: 3, mekanik: { id: 3, name: 'Rian Gunawan' },
        status: 'dikerjakan', kompleksitas: 'rendah', total_biaya: 160000, tanggal_masuk: iso(daysAgo(0, 8, 30)), tanggal_selesai: null,
        detail_layanan: [{ id: 2, nama_layanan: 'Ganti Ban Dalam', biaya: 40000 }],
        detail_sparepart: [{ id: 2, sparepart_id: 2, qty: 1, harga_satuan: 120000, sparepart: { nama: 'Ban Luar 26 inch' } }],
        estimasi: { estimasi_text: '± 30 menit lagi' },
      },
      {
        id: 3, nomor_tiket: 'RJ-0098', pelanggan_id: 3, pelanggan: { id: 3, nama: 'Agus Wijaya', no_hp: '082112345678' },
        jenis_sepeda: 'BMX', keluhan: 'Servis lengkap rutin', mekanik_id: 2, mekanik: { id: 2, name: 'Dedi Saputra' },
        status: 'selesai', kompleksitas: 'tinggi', total_biaya: 235000, tanggal_masuk: iso(daysAgo(1, 10)), tanggal_selesai: iso(daysAgo(1, 13)),
        detail_layanan: [{ id: 3, nama_layanan: 'Servis Lengkap', biaya: 150000 }],
        detail_sparepart: [{ id: 3, sparepart_id: 3, qty: 1, harga_satuan: 85000, sparepart: { nama: 'Rantai KMC Z8' } }],
        estimasi: null,
      },
      {
        id: 4, nomor_tiket: 'RJ-0097', pelanggan_id: 4, pelanggan: { id: 4, nama: 'Rina Marlina', no_hp: '085611122233' },
        jenis_sepeda: 'Sepeda Lipat', keluhan: 'Cek kelistrikan lampu', mekanik_id: 3, mekanik: { id: 3, name: 'Rian Gunawan' },
        status: 'sudah_diambil', kompleksitas: 'sedang', total_biaya: 65000, tanggal_masuk: iso(daysAgo(2, 11)), tanggal_selesai: iso(daysAgo(2, 12)),
        detail_layanan: [{ id: 4, nama_layanan: 'Cek Kelistrikan', biaya: 0 }],
        detail_sparepart: [{ id: 4, sparepart_id: 5, qty: 1, harga_satuan: 65000, sparepart: { nama: 'Lampu Depan LED' } }],
        estimasi: null,
      },
      {
        id: 5, nomor_tiket: 'RJ-0096', pelanggan_id: 5, pelanggan: { id: 5, nama: 'Hendra Kusuma', no_hp: '087855566677' },
        jenis_sepeda: 'MTB', keluhan: 'Overhaul suspensi depan', mekanik_id: 2, mekanik: { id: 2, name: 'Dedi Saputra' },
        status: 'sudah_diambil', kompleksitas: 'tinggi', total_biaya: 310000, tanggal_masuk: iso(daysAgo(5, 9)), tanggal_selesai: iso(daysAgo(5, 14)),
        detail_layanan: [{ id: 5, nama_layanan: 'Overhaul Suspensi', biaya: 180000 }],
        detail_sparepart: [],
        estimasi: null,
      },
    ],

    transaksi: [
      { id: 1, pelanggan_id: 1, pelanggan: { nama: 'Bagus Prasetyo' }, metode_pembayaran: 'tunai', total: 150000, tanggal: iso(daysAgo(0, 14)), detail: [{ nama: 'Helm Sepeda MTB', qty: 1, price: 150000 }] },
      { id: 2, pelanggan_id: null, pelanggan: null, metode_pembayaran: 'tunai', total: 65000, tanggal: iso(daysAgo(1, 16)), detail: [{ nama: 'Lampu Depan LED', qty: 1, price: 65000 }] },
      { id: 3, pelanggan_id: 3, pelanggan: { nama: 'Agus Wijaya' }, metode_pembayaran: 'tunai', total: 50000, tanggal: iso(daysAgo(3, 10)), detail: [{ nama: 'Oli Rantai', qty: 2, price: 25000 }] },
    ],

    feedback: [
      { id: 1, nama: 'Bagus Prasetyo', no_hp: '081234567890', pesan: 'Servisnya cepat dan rapi, mekaniknya ramah!', rating: 5, created_at: iso(daysAgo(2)) },
      { id: 2, nama: 'Siti Rahma', no_hp: null, pesan: 'Harga sparepart agak mahal tapi kualitas bagus.', rating: 4, created_at: iso(daysAgo(6)) },
      { id: 3, nama: 'Anonim', no_hp: null, pesan: 'Tolong perpanjang jam buka hari Minggu.', rating: null, created_at: iso(daysAgo(10)) },
    ],

    logAktivitas: [
      { id: 1, user: { name: 'Cecep Supriadi' }, aktivitas: 'Menambahkan sparepart baru "Kampas Rem Cakram"', modul: 'Sparepart', waktu: iso(daysAgo(0, 9)) },
      { id: 2, user: { name: 'Dedi Saputra' }, aktivitas: 'Menyelesaikan tiket servis #RJ-0098', modul: 'Servis', waktu: iso(daysAgo(1, 13)) },
      { id: 3, user: { name: 'Cecep Supriadi' }, aktivitas: 'Menghapus pelanggan "Contoh Dummy"', modul: 'Pelanggan', waktu: iso(daysAgo(3)) },
      { id: 4, user: { name: 'Rian Gunawan' }, aktivitas: 'Mengubah status tiket #RJ-0102 jadi dikerjakan', modul: 'Servis', waktu: iso(daysAgo(0, 8, 31)) },
    ],

    sampah: [
      { id: 101, modul: 'Pelanggan', nama: 'Contoh Dummy', detail: '089900001111', dihapus_pada: iso(daysAgo(3)) },
      { id: 102, modul: 'Sparepart', nama: 'Pedal Lama (Stok Habis)', detail: 'SP-099', dihapus_pada: iso(daysAgo(8)) },
    ],

    nextId: 1000, // generator ID untuk record baru
  };

  function genId() { return ++DB.nextId; }

  /* ==================== HELPER RESPONSE ==================== */
  function ok(body, status = 200) {
    return Promise.resolve(new Response(JSON.stringify(body), {
      status, headers: { 'Content-Type': 'application/json' },
    }));
  }
  function fail(message, status = 422, errors = null) {
    return ok({ message, errors: errors || { _: [message] } }, status);
  }
  function paginate(arr, page) {
    const perPage = 20;
    const start = (page - 1) * perPage;
    return {
      data: arr.slice(start, start + perPage),
      current_page: page,
      last_page: Math.max(1, Math.ceil(arr.length / perPage)),
      total: arr.length,
    };
  }
  function qp(url) { return new URL(url, location.origin).searchParams; }
  function pathId(path, prefix) {
    const m = path.match(new RegExp(`^${prefix}/(\\d+)`));
    return m ? Number(m[1]) : null;
  }

  function prediksiFor(sp) {
    const rataRataPerHari = 0.6; // dummy sederhana, konsisten utk semua barang
    const sisaHari = sp.stok > 0 ? Math.round(sp.stok / rataRataPerHari) : 0;
    const stokRendah = sp.stok <= sp.stok_minimum;
    const urgensi = stokRendah ? 'segera' : (sisaHari <= 7 ? 'perhatian' : 'aman');
    return {
      sparepart: sp.nama, kode: sp.kode, stok_saat_ini: sp.stok, stok_minimum: sp.stok_minimum,
      prediksi_qty_7hari: Math.round(rataRataPerHari * 7 * 10) / 10,
      sisa_hari_stok: sisaHari, rekomendasi_reorder: stokRendah ? (sp.stok_minimum * 2 - sp.stok) : 0,
      urgensi, model_version: 'dummy-ut',
    };
  }

  /* ==================== ROUTER ==================== */
  async function handle(path, method, bodyRaw) {
    const url = new URL(path, location.origin);
    const p = url.pathname;
    const body = bodyRaw ? JSON.parse(bodyRaw) : {};

    // ---------- Auth ----------
    if (p === '/api/me' && method === 'GET') return ok({ data: DB.me });
    if (p === '/api/me/password' && method === 'PUT') return ok({ message: 'Kata sandi berhasil diubah (dummy).' });
    if (p === '/api/login' && method === 'POST') return ok({ data: DB.me });
    if (p === '/api/logout' && method === 'POST') return ok({ message: 'Logout' });

    // ---------- Users / Mekanik ----------
    if (p === '/api/users' && method === 'GET') {
      const job = qp(path).get('job');
      let list = DB.users;
      if (job) list = list.filter(u => u.job === job);
      return ok({ data: list });
    }
    if (p === '/api/users' && method === 'POST') {
      const u = { id: genId(), status_aktif: true, status_kerja: 'luang', ...body };
      DB.users.push(u);
      return ok({ data: u }, 201);
    }
    if (/^\/api\/users\/\d+\/status$/.test(p) && method === 'PATCH') {
      const id = pathId(p, '/api/users'); const u = DB.users.find(x => x.id === id);
      if (u) u.status_aktif = body.status_aktif;
      return ok({ data: u });
    }
    if (/^\/api\/users\/\d+\/status-kerja$/.test(p) && method === 'PATCH') {
      const id = pathId(p, '/api/users'); const u = DB.users.find(x => x.id === id);
      if (u) u.status_kerja = body.status_kerja;
      return ok({ data: u });
    }
    if (/^\/api\/users\/\d+$/.test(p) && method === 'DELETE') {
      const id = pathId(p, '/api/users');
      const u = DB.users.find(x => x.id === id);
      DB.users = DB.users.filter(x => x.id !== id);
      if (u) DB.sampah.push({ id: genId(), modul: 'Sistem', nama: u.name, detail: u.email, dihapus_pada: iso(now()) });
      return ok({ message: 'Dihapus' });
    }

    // ---------- Pelanggan ----------
    if (p === '/api/pelanggan' && method === 'GET') {
      const search = (qp(path).get('search') || '').toLowerCase();
      let list = DB.pelanggan;
      if (search) list = list.filter(x => x.nama.toLowerCase().includes(search) || x.no_hp.includes(search));
      const page = Number(qp(path).get('page') || 1);
      return ok(paginate(list, page));
    }
    if (p === '/api/pelanggan' && method === 'POST') {
      const item = { id: genId(), created_at: iso(now()), ...body };
      DB.pelanggan.unshift(item);
      return ok({ data: item }, 201);
    }
    if (/^\/api\/pelanggan\/\d+$/.test(p) && method === 'PUT') {
      const id = pathId(p, '/api/pelanggan'); const item = DB.pelanggan.find(x => x.id === id);
      if (item) Object.assign(item, body);
      return ok({ data: item });
    }
    if (/^\/api\/pelanggan\/\d+$/.test(p) && method === 'DELETE') {
      const id = pathId(p, '/api/pelanggan'); const item = DB.pelanggan.find(x => x.id === id);
      DB.pelanggan = DB.pelanggan.filter(x => x.id !== id);
      if (item) DB.sampah.push({ id: genId(), modul: 'Pelanggan', nama: item.nama, detail: item.no_hp, dihapus_pada: iso(now()) });
      return ok({ message: 'Dipindahkan ke sampah' });
    }

    // ---------- Sparepart ----------
    if (p === '/api/sparepart' && method === 'GET') {
      const kategori = qp(path).get('kategori');
      let list = DB.sparepart;
      if (kategori) list = list.filter(x => x.kategori_utama === kategori);
      return ok({ data: list });
    }
    if (p === '/api/sparepart' && method === 'POST') {
      const kat = DB.kategoriSparepart.find(k => k.nama === body.sub_kategori) || DB.kategoriSparepart.find(k => k.nama.toLowerCase() === (body.kategori || '').toLowerCase());
      const item = {
        id: genId(), kode: body.kode || `SP-${genId()}`, stok_minimum: 5,
        kategori: kat || { id: 0, nama: body.sub_kategori || 'Umum' }, kategori_utama: body.kategori || 'sparepart',
        ...body,
      };
      DB.sparepart.push(item);
      return ok({ data: item }, 201);
    }
    if (/^\/api\/sparepart\/\d+$/.test(p) && method === 'PUT') {
      const id = pathId(p, '/api/sparepart'); const item = DB.sparepart.find(x => x.id === id);
      if (item) Object.assign(item, body);
      return ok({ data: item });
    }
    if (/^\/api\/sparepart\/\d+\/stok$/.test(p) && method === 'PATCH') {
      const id = pathId(p, '/api/sparepart'); const item = DB.sparepart.find(x => x.id === id);
      if (item) item.stok = Math.max(0, item.stok + (body.perubahan || 0));
      return ok({ data: { stok: item ? item.stok : 0 } });
    }
    if (/^\/api\/sparepart\/\d+$/.test(p) && method === 'DELETE') {
      const id = pathId(p, '/api/sparepart'); const item = DB.sparepart.find(x => x.id === id);
      DB.sparepart = DB.sparepart.filter(x => x.id !== id);
      if (item) DB.sampah.push({ id: genId(), modul: 'Sparepart', nama: item.nama, detail: item.kode, dihapus_pada: iso(now()) });
      return ok({ message: 'Dipindahkan ke sampah' });
    }

    // ---------- Sepeda ----------
    if (p === '/api/sepeda' && method === 'GET') return ok({ data: DB.sepeda });
    if (p === '/api/sepeda' && method === 'POST') {
      const item = { id: genId(), foto_url: null, ...body };
      DB.sepeda.push(item);
      return ok({ data: item }, 201);
    }
    if (/^\/api\/sepeda\/\d+$/.test(p) && method === 'PUT') {
      const id = pathId(p, '/api/sepeda'); const item = DB.sepeda.find(x => x.id === id);
      if (item) Object.assign(item, body);
      return ok({ data: item });
    }
    if (/^\/api\/sepeda\/\d+\/stok$/.test(p) && method === 'PATCH') {
      const id = pathId(p, '/api/sepeda'); const item = DB.sepeda.find(x => x.id === id);
      if (item) item.stok = Math.max(0, item.stok + (body.perubahan || 0));
      return ok({ data: { stok: item ? item.stok : 0 } });
    }
    if (/^\/api\/sepeda\/\d+$/.test(p) && method === 'DELETE') {
      const id = pathId(p, '/api/sepeda'); const item = DB.sepeda.find(x => x.id === id);
      DB.sepeda = DB.sepeda.filter(x => x.id !== id);
      if (item) DB.sampah.push({ id: genId(), modul: 'Sepeda', nama: `${item.merek} ${item.nama}`, detail: item.kategori, dihapus_pada: iso(now()) });
      return ok({ message: 'Dipindahkan ke sampah' });
    }

    // ---------- Tiket Servis ----------
    if (p === '/api/tiket-servis' && method === 'GET') return ok({ data: DB.tiketServis });
    if (p === '/api/tiket-servis' && method === 'POST') {
      let pelanggan;
      if (body.pelanggan_id) pelanggan = DB.pelanggan.find(x => x.id === Number(body.pelanggan_id));
      else { pelanggan = { id: genId(), nama: body.nama_pelanggan_baru, no_hp: body.no_hp_pelanggan_baru, created_at: iso(now()) }; DB.pelanggan.unshift(pelanggan); }
      const mekanik = DB.users.find(x => x.id === Number(body.mekanik_id));
      const nomor = 'RJ-' + String(1000 + DB.tiketServis.length).slice(-4);
      const item = {
        id: genId(), nomor_tiket: nomor, pelanggan_id: pelanggan.id, pelanggan,
        jenis_sepeda: body.jenis_sepeda, keluhan: body.keluhan || null, mekanik_id: mekanik ? mekanik.id : null,
        mekanik: mekanik ? { id: mekanik.id, name: mekanik.name } : null, status: 'menunggu', kompleksitas: body.kompleksitas || 'rendah',
        total_biaya: 0, tanggal_masuk: iso(now()), tanggal_selesai: null, detail_layanan: [], detail_sparepart: [], estimasi: null,
      };
      DB.tiketServis.unshift(item);
      return ok({ data: item }, 201);
    }
    if (/^\/api\/tiket-servis\/\d+\/layanan$/.test(p) && method === 'POST') {
      const id = pathId(p, '/api/tiket-servis'); const t = DB.tiketServis.find(x => x.id === id);
      if (t) { t.detail_layanan.push({ id: genId(), ...body }); t.total_biaya += Number(body.biaya || 0); }
      return ok({ data: t }, 201);
    }
    if (/^\/api\/tiket-servis\/\d+\/sparepart$/.test(p) && method === 'POST') {
      const id = pathId(p, '/api/tiket-servis'); const t = DB.tiketServis.find(x => x.id === id);
      const sp = DB.sparepart.find(x => x.id === Number(body.sparepart_id));
      if (!sp) return fail('Sparepart tidak ditemukan');
      if (sp.stok < body.qty) return fail(`Stok ${sp.nama} tidak cukup.`);
      sp.stok -= body.qty;
      if (t) { t.detail_sparepart.push({ id: genId(), sparepart_id: sp.id, qty: body.qty, harga_satuan: sp.harga, sparepart: { nama: sp.nama } }); t.total_biaya += sp.harga * body.qty; }
      return ok({ data: t }, 201);
    }
    if (/^\/api\/tiket-servis\/\d+\/status$/.test(p) && method === 'PATCH') {
      const id = pathId(p, '/api/tiket-servis'); const t = DB.tiketServis.find(x => x.id === id);
      if (t) { t.status = body.status; if (['selesai', 'sudah_diambil'].includes(body.status)) t.tanggal_selesai = iso(now()); }
      return ok({ data: t });
    }
    if (p === '/api/tiket-servis/backdate' && method === 'POST') {
      let pelanggan;
      if (body.pelanggan_id) pelanggan = DB.pelanggan.find(x => x.id === Number(body.pelanggan_id));
      else { pelanggan = { id: genId(), nama: body.nama_pelanggan_baru, no_hp: body.no_hp_pelanggan_baru, created_at: iso(now()) }; DB.pelanggan.unshift(pelanggan); }
      const item = {
        id: genId(), nomor_tiket: 'RJ-BD' + genId(), pelanggan_id: pelanggan.id, pelanggan,
        jenis_sepeda: body.jenis_sepeda, keluhan: body.keluhan, mekanik_id: body.mekanik_id,
        mekanik: (({ id, name } = {}) => ({ id, name }))(DB.users.find(x => x.id === Number(body.mekanik_id))),
        status: body.status, kompleksitas: body.kompleksitas, total_biaya: Number(body.biaya || 0),
        tanggal_masuk: body.tanggal_masuk, tanggal_selesai: body.tanggal_masuk,
        detail_layanan: [{ id: genId(), nama_layanan: body.nama_layanan, biaya: body.biaya }], detail_sparepart: [], estimasi: null,
      };
      DB.tiketServis.unshift(item);
      return ok({ data: item }, 201);
    }

    // ---------- Transaksi ----------
    if (p === '/api/transaksi' && method === 'GET') {
      const page = Number(qp(path).get('page') || 1);
      return ok(paginate(DB.transaksi, page));
    }
    if (p === '/api/transaksi' && method === 'POST') {
      let total = 0; const detail = [];
      (body.items || []).forEach(it => {
        const src = it.jenis_item === 'sepeda' ? DB.sepeda : DB.sparepart;
        const ref = src.find(x => x.id === Number(it.item_id));
        if (ref) { ref.stok = Math.max(0, ref.stok - it.qty); total += ref.harga * it.qty; detail.push({ nama: ref.nama, qty: it.qty, price: ref.harga }); }
      });
      const pelanggan = body.pelanggan_id ? DB.pelanggan.find(x => x.id === Number(body.pelanggan_id)) : null;
      const item = { id: genId(), pelanggan_id: body.pelanggan_id || null, pelanggan: pelanggan ? { nama: pelanggan.nama } : null, metode_pembayaran: body.metode_pembayaran, total, tanggal: body.tanggal ? new Date(body.tanggal).toISOString() : iso(now()), detail };
      DB.transaksi.unshift(item);
      return ok({ data: item }, 201);
    }

    // ---------- Invoice ----------
    if (p === '/api/invoice/dari-tiket' && method === 'POST') {
      const t = DB.tiketServis.find(x => x.id === Number(body.tiket_servis_id));
      return ok({ data: { nomor_invoice: 'INV-' + (t ? t.nomor_tiket : genId()), tanggal_invoice: iso(now()), total: t ? t.total_biaya : 0, metode_pembayaran: 'tunai', status_pembayaran: 'lunas', invoiceable: t } });
    }
    if (p === '/api/invoice/dari-transaksi' && method === 'POST') {
      const tr = DB.transaksi.find(x => x.id === Number(body.transaksi_penjualan_id));
      return ok({ data: { nomor_invoice: 'INV-TR' + (tr ? tr.id : genId()), tanggal_invoice: tr ? tr.tanggal : iso(now()), total: tr ? tr.total : 0, metode_pembayaran: tr ? tr.metode_pembayaran : 'tunai', status_pembayaran: 'lunas' } });
    }
    if (/^\/api\/invoice\/[\w-]+$/.test(p) && method === 'GET') {
      return ok({ data: { nomor_invoice: p.split('/').pop(), tanggal_invoice: iso(now()), total: 0, metode_pembayaran: 'tunai', invoiceable: { detail_layanan: [], detail_sparepart: [] } } });
    }

    // ---------- AI ----------
    if (p === '/api/ai/prediksi-stok' && method === 'GET') return ok({ data: DB.sparepart.map(prediksiFor) });
    if (p === '/api/ai/estimasi-servis' && method === 'POST') {
      const t = DB.tiketServis.find(x => x.id === Number(body.tiket_id));
      return ok({ data: { estimasi_menit: 60, estimasi_selesai: 'Hari ini, ± 1 jam lagi', model_version: 'dummy-ut' } });
    }
    if (p === '/api/ai/akurasi' && method === 'GET') return ok({ mae_menit: 11.2, jumlah_sampel: 42 });

    // ---------- Sampah & Log & Feedback ----------
    if (p === '/api/sampah' && method === 'GET') return ok({ data: DB.sampah });
    if (/^\/api\/(pelanggan|sparepart|sepeda|tiket-servis|users)\/\d+\/restore$/.test(p) && method === 'POST') {
      const id = pathId(p, p.split('/').slice(0, 3).join('/'));
      DB.sampah = DB.sampah.filter(x => x.id !== id);
      return ok({ message: 'Dipulihkan' });
    }
    if (/\/permanen$/.test(p) && method === 'DELETE') {
      const id = Number(p.split('/')[3]);
      DB.sampah = DB.sampah.filter(x => x.id !== id);
      return ok({ message: 'Dihapus permanen' });
    }
    if (p === '/api/log-aktivitas' && method === 'GET') {
      const modul = qp(path).get('modul'); const search = (qp(path).get('search') || '').toLowerCase();
      let list = DB.logAktivitas;
      if (modul) list = list.filter(x => x.modul === modul);
      if (search) list = list.filter(x => x.aktivitas.toLowerCase().includes(search));
      return ok({ data: list });
    }
    if (p === '/api/feedback' && method === 'GET') return ok({ data: DB.feedback });
    if (/^\/api\/feedback\/\d+$/.test(p) && method === 'DELETE') {
      const id = pathId(p, '/api/feedback'); DB.feedback = DB.feedback.filter(x => x.id !== id);
      return ok({ message: 'Dihapus' });
    }

    // ---------- Publik ----------
    if (p === '/api/publik/sepeda' && method === 'GET') {
      const kondisi = qp(path).get('kondisi'); let list = DB.sepeda.filter(x => x.stok > 0 || true);
      if (kondisi) list = list.filter(x => x.kondisi === kondisi);
      return ok({ data: list });
    }
    if (p === '/api/publik/sparepart' && method === 'GET') {
      const kategori = qp(path).get('kategori');
      let list = DB.sparepart.map(sp => ({ id: sp.id, nama: sp.nama, kategori: sp.kategori_utama, sub_kategori: sp.kategori?.nama, harga: sp.harga, stok: sp.stok }));
      if (kategori) list = list.filter(x => x.kategori === kategori);
      return ok({ data: list });
    }
    if (p === '/api/publik/cek-tiket' && method === 'GET') {
      const noHp = qp(path).get('no_hp') || '';
      const pelanggan = DB.pelanggan.find(x => x.no_hp.replace(/\D/g, '') === noHp);
      const list = pelanggan ? DB.tiketServis.filter(t => t.pelanggan_id === pelanggan.id) : [];
      return ok({ data: list });
    }
    if (p === '/api/publik/feedback' && method === 'POST') {
      DB.feedback.unshift({ id: genId(), created_at: iso(now()), ...body });
      return ok({ message: 'Terima kasih' }, 201);
    }

    // ---------- fallback: jangan bikin halaman crash kalau ada endpoint belum ter-mock ----------
    console.warn('[mock-api] belum ada mock utk:', method, p);
    return ok({ data: [] });
  }

  const realFetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    const url = typeof input === 'string' ? input : input.url;
    if (!url.includes('/api/')) return realFetch(input, init); // request non-API (CDN dsb) tetap jalan normal
    const method = (init && init.method) || 'GET';
    const bodyRaw = init && init.body;
    return handle(url, method.toUpperCase(), bodyRaw);
  };

  console.info('%c[mock-api] aktif — semua /api/... dibalas data dummy, tidak ada koneksi ke server.', 'color:#2F7A67;font-weight:600;');
})();
