"""Build one standalone Cloudflare Pages static site; no runtime dependencies."""
from pathlib import Path
import shutil,sys
root=Path(__file__).resolve().parent
site=sys.argv[1] if len(sys.argv)>1 else 'secretome'
if site not in ('secretome','ctl','rollator'):raise SystemExit('Choose secretome, ctl, or rollator')
out=root/'dist'/site
if out.exists():shutil.rmtree(out)
out.mkdir(parents=True)
if site=='secretome':
 shutil.copy2(root/'index.html',out/'index.html')
 shutil.copytree(root/'assets',out/'assets')
else:
 shutil.copytree(root/site,out,dirs_exist_ok=True)
(out/'_headers').write_text('/*\n  Referrer-Policy: no-referrer\n  X-Content-Type-Options: nosniff\n')
print(out)
