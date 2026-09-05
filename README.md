# ✨ 2D Parametrik Şekil Üreteci | 2D Parametric Shape Generator | 2D Parametrischer Formengenerator

[![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.6-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88ce02?logo=greensock)](https://gsap.com/)
[![React Router](https://img.shields.io/badge/React%20Router-6.20-ca4245?logo=reactrouter)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen)]()

🌐 **Canlı site / Live site / Live-Website:** https://2d.krea.tr

Languages: [Türkçe](#türkçe) | [English](#english) | [Deutsch](#deutsch)

---

## Türkçe

### Proje
- Matematiksel formüllerle gerçek zamanlı parametrik şekiller (SVG) üreten etkileşimli dashboard.
- GSAP ile yumuşak animasyonlar, panel sürükleme/yeniden boyutlandırma ve tam ekran mod.
- Çok dilli arayüz: TR / EN / DE (Language Context + localStorage).
- 9 formül kartı: Rose, Spiral, Lissajous, Dönen Çokgen (2 varyasyon), Katmanlı Üçgen, Superellipse vb.

### Özellikler
- Gerçek zamanlı animasyon (50ms güncelleme)
- Kaygan panel yeniden boyutlandırma + tam ekran butonu
- Parametre slider'ları ve SVG boyut kontrolü
- Modern gradient UI, responsive tasarım
- Versiyon gösterimi ve semantik sürüm artırma scriptleri

### Kurulum
1) Node.js 18+ kurun.
2) Depoyu klonlayın: `git clone https://github.com/tansuozcelebi/2d-math.git && cd 2d-math`
3) Bağımlılıklar: `npm install`
4) Geliştirme: `npm start` (http://localhost:3000)
5) Derleme: `npm run build`

### Kullanım
- Kart seç, slider ile parametreleri ayarla, SVG boyutunu değiştir.
- Tam ekran için kartın sağ üst butonunu kullan.
- Dil değişimi Navbar sağ üst dropdown (TR/EN/DE).

### Formüller (kısa)
- Rose: r = a*sin((n/d)*theta)
- Spiral: r = a*t, theta = 2*pi*k*t
- Lissajous: x = A*sin(a*t + delta), y = B*sin(b*t)
- Superellipse (Gielis): m, n1, n2, n3 parametreleri ile organik şekiller
- Dönen çokgen ve katmanlı üçgen varyasyonları

### Teknoloji
- React 18, React Router, Context API
- Tailwind CSS, GSAP, Lucide ikonlar
- SVG tabanlı çizim, custom hook'lar, localStorage

### Sürümleme
- Mevcut: v1.0.0 (bkz. src/config/version.js)
- Artır: `npm run version:patch|minor|major` (scripts/updateVersion.js)

### İletişim
- E-posta: info@krea.tr
- GitHub: https://github.com/tansuozcelebi
- Web: https://2d.krea.tr

### Lisans
- MIT Lisansı

---

## English

### Project
- Interactive dashboard that renders real-time parametric SVG shapes from mathematical formulas.
- Smooth GSAP animations, draggable/resizable panels, fullscreen toggle.
- Multilingual UI: TR / EN / DE (Language Context + localStorage persistence).
- 9 formula cards: Rose, Spiral, Lissajous, Rotating Polygons (2 variants), Layered Triangle, Superellipse, etc.

### Features
- Real-time animation (50ms refresh)
- Smooth panel resize + fullscreen button
- Parameter sliders and SVG size control
- Modern gradient UI, fully responsive
- Version display and semantic version bump scripts

### Setup
1) Install Node.js 18+.
2) Clone: `git clone https://github.com/tansuozcelebi/2d-math.git && cd 2d-math`
3) Install deps: `npm install`
4) Dev server: `npm start` (http://localhost:3000)
5) Build: `npm run build`

### Usage
- Pick a card, tune parameters with sliders, adjust SVG size.
- Use the top-right button on a card for fullscreen.
- Switch language from the navbar dropdown (TR/EN/DE).

### Formulas (brief)
- Rose: r = a*sin((n/d)*theta)
- Spiral: r = a*t, theta = 2*pi*k*t
- Lissajous: x = A*sin(a*t + delta), y = B*sin(b*t)
- Superellipse (Gielis): parameters m, n1, n2, n3 for organic shapes
- Rotating polygon and layered triangle variants

### Tech
- React 18, React Router, Context API
- Tailwind CSS, GSAP, Lucide icons
- SVG rendering, custom hooks, localStorage persistence

### Versioning
- Current: v1.0.0 (see src/config/version.js)
- Bump: `npm run version:patch|minor|major` (scripts/updateVersion.js)

### Contact
- Email: info@krea.tr
- GitHub: https://github.com/tansuozcelebi
- Web: https://2d.krea.tr

### License
- MIT License

---

## Deutsch

### Projekt
- Interaktives Dashboard für parametrische SVG-Formen in Echtzeit auf Basis mathematischer Formeln.
- Weiche GSAP-Animationen, verschiebbare/skalierbare Panels, Vollbild-Umschaltung.
- Mehrsprachige UI: TR / EN / DE (Language Context + localStorage).
- 9 Formelkarten: Rose, Spirale, Lissajous, Rotierende Polygone (2 Varianten), Geschichtetes Dreieck, Superellipse usw.

### Funktionen
- Echtzeit-Animation (50ms Refresh)
- Sanftes Panel-Resizing + Vollbild-Button
- Parameter-Slider und SVG-Größe-Regler
- Modernes Gradient-UI, voll responsiv
- Versionsanzeige und Skripte für semantisches Versionieren

### Einrichtung
1) Node.js 18+ installieren.
2) Klonen: `git clone https://github.com/tansuozcelebi/2d-math.git && cd 2d-math`
3) Abhängigkeiten: `npm install`
4) Dev-Server: `npm start` (http://localhost:3000)
5) Build: `npm run build`

### Nutzung
- Karte wählen, Parameter per Slider anpassen, SVG-Größe regulieren.
- Vollbild über die Schaltfläche oben rechts auf der Karte.
- Sprache im Navbar-Dropdown wechseln (TR/EN/DE).

### Formeln (kurz)
- Rose: r = a*sin((n/d)*theta)
- Spirale: r = a*t, theta = 2*pi*k*t
- Lissajous: x = A*sin(a*t + delta), y = B*sin(b*t)
- Superellipse (Gielis): Parameter m, n1, n2, n3 für organische Formen
- Rotierendes Polygon und geschichtetes Dreieck als Varianten

### Technik
- React 18, React Router, Context API
- Tailwind CSS, GSAP, Lucide-Icons
- SVG-Rendering, Custom Hooks, localStorage

### Versionierung
- Aktuell: v1.0.0 (siehe src/config/version.js)
- Erhöhen: `npm run version:patch|minor|major` (scripts/updateVersion.js)

### Kontakt
- E-Mail: info@krea.tr
- GitHub: https://github.com/tansuozcelebi
- Web: https://2d.krea.tr

### Lizenz
- MIT-Lizenz
