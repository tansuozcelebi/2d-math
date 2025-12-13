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

If deploying to a subdomain or subfolder:

1. **Update `package.json`:**
   ```json
   "homepage": "https://yourdomain.com/subfolder"
   ```

2. **Rebuild:**
   ```bash
   npm run build
   ```

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
