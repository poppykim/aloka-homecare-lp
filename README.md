# Aloka Homecare landing pages

Source of truth: `poppykim/aloka-homecare-lp`.

| LP | Source | Production domain | Cloudflare Pages build | Output |
|---|---|---|---|---|
| Secretome + Stem Cell | `index.html`, `assets/` | `sekretom.alokahomecare.com` | `python3 build.py secretome` | `dist/secretome` |
| CTL | `ctl/` | `ctl.alokahomecare.com` | `python3 build.py ctl` | `dist/ctl` |
| Rollator | `rollator/` | `rollator.alokahomecare.com` | `python3 build.py rollator` | `dist/rollator` |

Keep each Pages project's root directory at repository root, framework None, production branch main. Each build is a standalone static site with no server or paid runtime. Use three independent Pages projects connected to this repository. Confirm actual project names and their assigned pages.dev URLs before changing DNS.

Secretome remains at the existing root path to preserve its current deployment. `CNAME` and existing Wrangler project identity are retained. The build excludes these legacy deployment files from individual Pages outputs.

## Source provenance

Retrieved 23 September 2026:
- Secretome: existing main commit fdb9002a1295f93cc0069471ca8c5fdc32db685b.
- CTL: published HTML, stylesheet, area script, logo and illustration from https://aloka-ctl-bandung.poppykim.chatgpt.site/.
- Rollator: published HTML, stylesheet, script, logo and product photos from https://rollator.alokahomecare.com/.

The two published static sites were retrieved as actually served, not reconstructed. Hosting-injected Cloudflare challenge scripts were omitted. Images were retained, with PNG assets converted to WebP. Secretome's embedded WebP assets were extracted losslessly and deduplicated. No chatgpt.site or Scalev asset/runtime dependencies remain in deployment output.

## Content and privacy rules

- No prices, monetary amounts, crossed-out prices or price promotions, including metadata, attributes, prefilled messages and hidden copy.
- Consultation/contact links use WhatsApp +62 898-0111-168.
- Preserve medical disclaimers, evidence limitations and references.
- Secretome and Rollator retain Meta Pixel 2354604608703230 with opt-in consent and generic PageView/Contact events. No automatic event configuration, patient details, chat text or form fields are sent as event parameters.
- Query parameters and initial fragments are removed before optional measurement; only a known public area value is allowed. Measurement is suppressed when the incoming referrer contains a query or fragment. This is local page protection; audit ad-platform-side configuration independently.
- CTL originally had no marketing pixel; none was added. Its area selector accepts a fixed list of public city names.
- Original content remains in Git history for rollback; old revisions are not included in deployment packages.

## Cutover checklist for DNS administrator

Observed DNS on 23 September 2026:
- `sekretom` CNAME `poppykim.github.io.`
- `ctl` and `rollator` CNAME `custom-domains.chatgpt.site.`
- Apex nameservers: `darwin.ns.cloudflare.com.` and `kia.ns.cloudflare.com.`

Do not change nameservers, apex/WWW records, MX, or website-main settings.

1. Deploy and test the three Pages outputs, including images, WhatsApp links and absence of prices.
2. Add each exact subdomain in its corresponding Pages project's Custom domains screen.
3. Copy the actual assigned Pages target from that project. Hosea changes only the corresponding CNAME host (`sekretom`, `ctl`, or `rollator`) to that exact target. Use TTL Auto (or 300 seconds). Do not point to a guessed project name or a URL path.
4. Add a TXT verification record only if Cloudflare explicitly supplies one, using its exact name and token. No verification token can be derived from an old site URL.
5. Wait for domain activation and a valid HTTPS certificate; test each production URL. Keep the existing Secretome deployment and DNS until the new destination is verified. Roll back its CNAME to the recorded previous target if cutover fails.
6. Update references/ads that still use the old chatgpt.site CTL URL after production verification. Do not delete the old projects before successful cutover.

Cloudflare reference: https://developers.cloudflare.com/pages/configuration/custom-domains/

## Validation

`python3 build.py secretome`, `python3 build.py ctl`, `python3 build.py rollator`.
Static source checks cover asset existence, encoded WhatsApp links, metadata and monetary/promotion patterns. Browser checks cover images, layout and CTA URLs. Keep runtime/public outputs free of source-history files and deployment credentials.
