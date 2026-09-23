document.querySelectorAll('.wa').forEach(link => {
  link.href = 'https://wa.me/628980111168?text=' + encodeURIComponent(link.dataset.message);
  link.target = '_blank'; link.rel = 'noopener noreferrer';
});
// Only a known area value may survive in the URL before optional analytics loads.
(() => {
  const url = new URL(location.href);
  const area = url.searchParams.get('area');
  const safeAreas = ['bandung','jakarta','bsd','tangerang','tangsel','tangerang-selatan','bogor','bekasi','depok','serpong','alam-sutera','gading-serpong'];
  url.search = ''; url.hash = '';
  if (safeAreas.includes(area)) url.searchParams.set('area', area);
  history.replaceState(null, '', url.pathname + url.search);
})();
document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
  link.addEventListener('click', () => {
    if (window.alokaMarketingConsent && typeof window.fbq === 'function') {
      window.fbq('trackSingle', '2354604608703230', 'Contact');
    }
  });
});
// Optional advertising measurement. Never send WhatsApp text or patient details.
(()=>{
  const key='aloka-marketing-consent-v1';
  let choice=null;
  try { choice=localStorage.getItem(key); } catch {}
  function enable(){
    window.alokaMarketingConsent=true;
    if (document.referrer) { try { const r = new URL(document.referrer); if (r.search || r.hash) return; } catch { return; } }
    if(!window.fbq){
      const q=window.fbq=function(){q.callMethod?q.callMethod.apply(q,arguments):q.queue.push(arguments);};
      window._fbq=q;q.push=q;q.loaded=true;q.version='2.0';q.queue=[];
      const script=document.createElement('script');script.async=true;
      script.src='https://connect.facebook.net/en_US/fbevents.js';document.head.appendChild(script);
      q('set','autoConfig',false,'2354604608703230');
      q('init','2354604608703230');
      q('trackSingle','2354604608703230','PageView');
    } else window.fbq('consent','grant');
  }
  const panel=document.createElement('section');
  panel.setAttribute('aria-label','Pilihan pengukuran iklan');
  panel.style.cssText='position:fixed;bottom:16px;left:16px;right:16px;max-width:540px;z-index:10000;padding:20px;background:white;color:#163e48;border:1px solid #008fa3;border-radius:16px;box-shadow:0 8px 32px #0002;font:16px/1.5 sans-serif';
  panel.innerHTML='<strong>Izinkan pengukuran iklan?</strong><p style="margin:8px 0 14px">Dengan izin Anda, Meta Pixel mengukur kunjungan dan klik tombol WhatsApp menggunakan cookie serta informasi perangkat. Data dibagikan kepada Meta untuk pengukuran iklan. Kami tidak memasukkan isi chat atau kondisi pasien ke event. Menolak tidak mengurangi layanan.</p><div style="display:flex;gap:12px;flex-wrap:wrap"><button type="button" data-consent="no">Tolak</button><button type="button" data-consent="yes">Izinkan</button></div>';
  panel.querySelectorAll('button').forEach(button=>{
    button.style.cssText='padding:10px 18px;background:#fff;border:1px solid #008fa3;border-radius:8px;color:#005b69;font:600 16px sans-serif;cursor:pointer';
    button.addEventListener('click',()=>{
      choice=button.dataset.consent;
      try { localStorage.setItem(key,choice); } catch {}
      if(choice==='yes') enable();
      else { window.alokaMarketingConsent=false; if(window.fbq) window.fbq('consent','revoke'); }
      panel.hidden=true;
    });
  });
  document.body.appendChild(panel);panel.hidden=choice!==null;
  const settings=document.createElement('button');settings.type='button';settings.textContent='Pengaturan privasi iklan';
  settings.style.cssText='background:none;border:0;color:inherit;text-decoration:underline;cursor:pointer;font:inherit';
  settings.addEventListener('click',()=>{panel.hidden=false;panel.querySelector('button').focus();});
  document.querySelector('footer').appendChild(settings);
  if(choice==='yes') enable();
})();
