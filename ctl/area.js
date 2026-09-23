(() => {
  const areas = new Map([
    ['bandung', 'Bandung'], ['jakarta', 'Jakarta'], ['bsd', 'BSD'],
    ['tangerang', 'Tangerang'], ['tangsel', 'Tangerang Selatan'],
    ['tangerang-selatan', 'Tangerang Selatan'], ['bogor', 'Bogor'],
    ['bekasi', 'Bekasi'], ['depok', 'Depok'], ['serpong', 'Serpong'],
    ['alam-sutera', 'Alam Sutera'], ['gading-serpong', 'Gading Serpong']
  ]);
  const key = (new URLSearchParams(window.location.search).get('area') || '').trim().toLowerCase();
  const area = areas.get(key) || 'Bandung';
  document.querySelectorAll('[data-area]').forEach(el => { el.textContent = area; });
  document.title = `CTL, Kanker & Tumor • ${area} | Aloka Homecare`;
  document.querySelector('meta[name="description"]').content = `Kenali CTL dalam pembahasan kanker dan tumor. Informasi berbasis sumber ilmiah untuk masyarakat ${area} bersama Aloka Homecare.`;
  const message = `Halo Aloka, saya ingin informasi CTL untuk area ${area}.`;
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(el => {
    el.href = 'https://wa.me/628980111168?text=' + encodeURIComponent(message);
  });
})();
