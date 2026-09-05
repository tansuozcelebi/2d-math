# SiteGround Deployment Guide - 2D Math Shapes

## Deployment Options

### Option 1: FTP/SFTP Upload (Recommended)

1. **Build your application:**
   ```bash
   npm run build
   ```

2. **Connect to SiteGround via FTP/SFTP:**
   - Host: Your domain or SiteGround server IP
   - Username: Your cPanel/FTP username
   - Password: Your FTP password
   - Port: 21 (FTP) or 22 (SFTP - recommended)

3. **Upload files:**
   - Navigate to `public_html` (or your domain's root folder)
   - Upload ALL contents from the `build` folder:
     - `index.html`
     - `asset-manifest.json`
     - `manifest.json`
     - `robots.txt`
     - `sitemap.xml`
     - `_redirects` (used by Netlify; harmless on Apache)
     - `logo/` folder
     - `static/` folder

### Option 2: SiteGround File Manager

1. **Build your application:**
   ```bash
   npm run build
   ```

2. **Login to SiteGround cPanel:**
   - Go to https://siteground.com
   - Login to your account
   - Click "Site Tools"

3. **Upload via File Manager:**
   - Navigate to Site → File Manager
   - Go to `public_html` folder (or your domain folder)
   - Click "Upload" button
   - Select ALL files from your local `build` folder
   - Upload and extract if needed

### Option 3: Git Deployment

1. **Install Git on SiteGround:**
   - Access SSH (if enabled on your plan)
   - Navigate to your domain folder

2. **Push your build to a repository:**
   ```bash
   # Create a deployment branch
   git checkout -b deploy
   
   # Add build folder to git
   git add build -f
   git commit -m "Deploy build"
   git push origin deploy
   ```

3. **Pull on server:**
   ```bash
   cd public_html
   git clone your-repo-url .
   git checkout deploy
   cp -r build/* .
   ```

## Important Notes

### React Router Configuration

Since this app uses React Router, you need to configure SiteGround to handle client-side routing:

1. **Create/Edit `.htaccess` file** in `public_html`:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteCond %{REQUEST_FILENAME} !-l
     RewriteRule . /index.html [L]
   </IfModule>
   ```

2. This ensures all routes (/, /about, etc.) work correctly.

### Domain Configuration

The production domain is **`2d.krea.tr`**. It is referenced in these files:

| File | What it holds |
| --- | --- |
| `public/index.html` | `canonical`, `og:url`, `og:image`, `twitter:image` |
| `public/sitemap.xml` | Page URLs (`<loc>`) |
| `public/robots.txt` | `Sitemap:` line |
| `src/config/version.js` | `SITE_DOMAIN` / `SITE_URL` (used by the export watermark) |

If the domain ever changes again, update those four files — everything inside
the React app reads the domain from `SITE_DOMAIN` in `src/config/version.js`.

If deploying to a subfolder instead of the domain root:

1. **Update `package.json`:**
   ```json
   "homepage": "https://2d.krea.tr/subfolder"
   ```

2. **Rebuild:**
   ```bash
   npm run build
   ```

### Domain Migration: `2d.fabus.app` → `2d.krea.tr`

The app moved from `2d.fabus.app` to `2d.krea.tr`. To keep existing links and
search rankings, serve a permanent (301) redirect from the old host.

The first two subsections are alternatives — pick the one matching where
production is served. This repository is also connected to a **Netlify** site
(`2d-math`) that builds every pull request, so if production has moved off
SiteGround, follow *On Netlify*. The *Either host* steps apply in both cases.

#### On Apache / SiteGround

1. **Point DNS** for `2d.krea.tr` at the SiteGround server (A record, or CNAME
   to the hosting hostname) and issue a Let's Encrypt certificate for it in
   Site Tools → Security → SSL Manager.

2. **Redirect the old host** — keep `2d.fabus.app` alive and add this to its
   `.htaccess` (path and query string are preserved):
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteCond %{HTTP_HOST} ^2d\.fabus\.app$ [NC]
     RewriteRule ^(.*)$ https://2d.krea.tr/$1 [L,R=301]
   </IfModule>
   ```

3. **Canonicalize the new host** (force HTTPS + strip `www.`) in the
   `2d.krea.tr` `.htaccess`:
   ```apache
   RewriteCond %{HTTPS} off [OR]
   RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
   RewriteRule ^(.*)$ https://2d.krea.tr/$1 [L,R=301]
   ```

#### On Netlify

There is no `netlify.toml` in the repository — the site is wired up through the
Netlify UI, so the domain move is done there:

1. **Add the new domain:** Site configuration → Domain management → *Add a
   domain* → `2d.krea.tr`, then set it as the **primary domain**. Point the DNS
   record at Netlify (`CNAME` to the site's `*.netlify.app` hostname, or
   Netlify DNS) and let it provision the certificate.

2. **Keep `2d.fabus.app` attached** as a secondary domain. Netlify issues a 301
   from every non-primary domain to the primary one automatically, so the old
   host keeps redirecting with the path intact — do not detach it.

3. **Deep links:** because this is a client-side–routed SPA, `/about` only
   resolves if the host rewrites unknown paths to `index.html`. On Netlify that
   is `public/_redirects` (`/*  /index.html  200`), which the repository ships
   and the build copies into `build/`; on Apache the `.htaccess` rule above
   does the same job. `_redirects` is inert on Apache, so shipping it costs
   nothing there.

#### Either host

1. **Search Console:** add `2d.krea.tr` as a property, use the *Change of
   address* tool from the old property, and submit
   `https://2d.krea.tr/sitemap.xml`.

2. **Verify** the redirect returns 301 and lands on the new host:
   ```bash
   curl -sSI https://2d.fabus.app/about | head -n 5
   ```

Keep the old host and its redirect in place for at least 6 months so crawlers
and bookmarked links follow the move.

### SSL Certificate

1. **Enable HTTPS:**
   - Go to SiteGround Site Tools
   - Navigate to Security → SSL Manager
   - Install/Activate Let's Encrypt certificate (free)

2. **Force HTTPS** (add to `.htaccess`):
   ```apache
   # Force HTTPS
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

## Performance Optimization

### Enable Gzip Compression

Add to `.htaccess`:
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
```

### Browser Caching

Add to `.htaccess`:
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
</IfModule>
```

## Automated Deployment Script

Create `deploy.sh` for quick deployments:

```bash
#!/bin/bash

echo "🚀 Starting deployment..."

# Build the app
echo "📦 Building application..."
npm run build

# Upload via SFTP (requires lftp)
echo "📤 Uploading to SiteGround..."
lftp -e "
  open sftp://username@yourhost
  mirror -R build/ public_html/
  bye
"

echo "✅ Deployment complete!"
```

Make executable:
```bash
chmod +x deploy.sh
```

## Verification Checklist

After deployment, verify:

- [ ] Homepage loads at your domain
- [ ] About page works
- [ ] All shape cards render correctly
- [ ] Formula dropdown menu works
- [ ] Language switcher functions
- [ ] Mobile responsive design works
- [ ] HTTPS is enabled
- [ ] No console errors in browser DevTools

## Troubleshooting

### 404 Errors on Routes
- Ensure `.htaccess` is configured correctly
- Check file permissions (644 for files, 755 for folders)

### Assets Not Loading
- Verify `homepage` in `package.json` matches your domain
- Check browser console for CORS or path errors

### Slow Loading
- Enable SiteGround CDN in Site Tools
- Activate SuperCacher
- Compress images in `logo/` folder

## Quick Deploy Command

For subsequent deployments after initial setup:

```bash
npm run build && echo "Build complete - Upload build/* to public_html/"
```

---

**Need Help?**
- SiteGround Support: https://www.siteground.com/support
- React Deployment Docs: https://create-react-app.dev/docs/deployment
