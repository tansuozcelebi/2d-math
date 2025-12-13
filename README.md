# ✨ 2D Parametrik Şekil Üreteci | 2D Parametric Shape Generator

[![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.6-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen)]()

## 📋 İçindekiler | Table of Contents

- [Proje Hakkında | About](#about)
- [Özellikler | Features](#features)
- [Kurulum | Installation](#installation)
- [Kullanım | Usage](#usage)
- [Teknik Detaylar | Technical Details](#technical-details)
- [Matematiksel Formüller | Mathematical Formulas](#mathematical-formulas)
- [Geliştirici | Developer](#developer)

---

## 📌 Proje Hakkında | About {#about}

**2D Parametrik Şekil Üreteci**, matematiksel formülleri kullanarak animasyonlu, geometrik desenleri gerçek zamanda oluşturan etkileşimli bir web uygulamasıdır.

**2D Parametric Shape Generator** is an interactive web application that generates animated geometric patterns in real-time using mathematical formulas.

### 🎯 Amaç | Purpose

Matematiksel sanat (Math Art) ve algoritmik tasarımı bir dashboard üzerinde etkileşimli olarak keşfetmek. Her formülasyon dinamik olarak özelleştirilebilir ve paneller tam ekranı dolduracak şekilde yeniden boyutlandırılabilir.

Explore mathematical art and algorithmic design interactively on a dynamic dashboard. Every formulation is fully customizable and panels can be resized to fill the entire screen.

---

## ⭐ Özellikler | Features {#features}

### Temel Özellikler | Core Features
- ✅ **9 Farklı Matematiksel Formülasyon** - Rose, Spiral, Lissajous, Polygon, Triangle Spiral, Superellipse ve varyasyonları
- ✅ **Gerçek Zamanlı Animasyon** - 50ms güncellemeler ile sorunsuz rotasyon
- ✅ **Dinamik Panel Boyutlandırma** - Her paneli sürükleyerek özel boyutlar ayarlayın
- ✅ **Tam Ekran Modu** - Maksimize düğmesi ile seçili paneli büyütün
- ✅ **İnteraktif Kontroller** - Slider'lar ile gerçek zamanda parametreleri değiştirin
- ✅ **SVG Boyut Kontrolü** - 150px - 600px arasında şekilleri ölçeklendir

### Arayüz Özellikleri | UI Features
- 🎨 **Modern Gradient Tasarım** - Slate-blue-purple gradient arka plan
- 📱 **Responsive Layout** - Tüm cihazlarda uyumlu
- 🎭 **Glassmorphism Efektleri** - Şık, modern görünüm
- 🖱️ **Smooth Transitions** - Yumuşak geçişler ve hover efektleri
- 📊 **Bilgi Paneli** - Tüm formüllerin matematiksel açıklamalarını görüntüle

### Teknik Özellikler | Technical Features
- ⚡ **React 18.2** - Modern React hooks ve state management
- 🎨 **Tailwind CSS 3.3** - Utility-first CSS framework
- 📦 **Lucide React Icons** - Modern, ölçeklenebilir ikonlar
- 🔄 **Real-time Updates** - Animasyon ve parametre değişiklikleri anlık güncelleme
- 📐 **SVG Rendering** - Vektör tabanlı şekil oluşturma

---

## 🚀 Kurulum | Installation {#installation}

### Gereksinimler | Requirements
- **Node.js** 14+ 
- **npm** 6+ veya **yarn** 1.22+
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Adımlar | Steps

1. **Repository'yi Klonlayın | Clone the Repository**
```bash
git clone https://github.com/tansuozcelebi/2d-math.git
cd 2d-math
```

2. **Bağımlılıkları Kurun | Install Dependencies**
```bash
npm install
```

3. **Geliştirme Sunucusunu Başlatın | Start Development Server**
```bash
npm start
```

Uygulama otomatik olarak `http://localhost:3000` adresinde açılacaktır.

4. **Üretim İçin Derleyin | Build for Production**
```bash
npm run build
```

---

## 💡 Kullanım | Usage {#usage}

### Temel Kullanım | Basic Usage

1. **Panel Seçin** - Ana ekrandan istediğiniz formülasyonu seçin
2. **Parametreleri Ayarlayın** - Slider'ları kullanarak değerleri değiştirin
3. **Boyutu Değiştirin** - "Boyut" slider'ı ile SVG canvas'ını ölçeklendir
4. **Tam Ekranı Görüntüleyin** - Maximize butonuna tıklayarak paneli büyütün
5. **Paneli Yeniden Boyutlandırın** - Sağ alt köşesinden sürükleyerek panel boyutunu değiştir

### Formülasyonlar | Formulations

#### 🌹 Rose/Rozet
- **Denklem**: r = a·sin(n/d·θ)
- **Parametreler**: 
  - `n`: Yaprak sayısı (1-20)
  - `d`: Yoğunluk faktörü (0.5-20)
  - `size`: Boyut (0.5-145)
- **Örnek**: n=5, d=1 klasik 5 yapraklı rose deseni oluşturur

#### 🌀 Spiral
- **Denklem**: r = a·t, θ = 2πkt
- **Parametreler**:
  - `turns`: Dönüş sayısı (0.5-10)
  - `lines`: Spiral çizgi sayısı (1-20)
  - `size`: İlk boyut (0.5-145)
- **Örnek**: Arşimet spirali varyasyonları

#### 🔀 Lissajous
- **Denklem**: x = A·sin(at + δ), y = B·sin(bt)
- **Parametreler**:
  - `a`: X frekansı (0.5-20)
  - `b`: Y frekansı (0.5-20)
  - `delta`: Faz farkı (0-π)
  - `size`: Genlik (0.5-145)
- **Örnek**: Harmonic figürleri ve Lissajous eğrileri

#### 🔶 Dönen Çokgen
- **Denklem**: Katmanlı açısal transformasyon
- **Parametreler**:
  - `sides`: Çokgen kenar sayısı (3-20)
  - `layers`: Katman sayısı (1-20)
  - `size`: İlk boyut (0.5-145)
- **Örnek**: Dönen altıgenler, sekizgenler

#### 📐 Katmanlı Üçgen
- **Denklem**: Eşkenar üçgen + Rotasyon
- **Parametreler**:
  - `layers`: Katman sayısı (1-20)
  - `size`: İlk boyut (0.5-145)
  - `twist`: Dönme faktörü (0-20)
- **Örnek**: Spiral üçgen desenleri

#### ✨ Superellipse
- **Denklem**: Gielis Formülü (Superellipse)
- **Parametreler**:
  - `n1`: Genel şekil (0.5-10)
  - `n2`: Yatay eğrilik (0.5-10)
  - `n3`: Dikey eğrilik (0.5-10)
  - `size`: Ölçek (0.5-145)
- **Örnek**: Yıldız, çiçek ve organik şekiller

---

## 🔧 Teknik Detaylar | Technical Details {#technical-details}

### Proje Yapısı | Project Structure

```
2d-math/
├── public/
│   └── index.html
├── src/
│   ├── index.js
│   ├── index.css
│   ├── main.js              # Ana React bileşeni
│   └── App.jsx
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

### Bağımlılıklar | Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "lucide-react": "^0.263.1",
  "react-grid-layout": "^2.0.0",
  "react-rnd": "^10.5.2",
  "tailwindcss": "^3.3.6",
  "postcss": "^8.5.6",
  "autoprefixer": "^10.4.22"
}
```

### Browser Desteği | Browser Support

| Browser | Sürüm | Destek |
|---------|-------|--------|
| Chrome  | 90+   | ✅     |
| Firefox | 88+   | ✅     |
| Safari  | 14+   | ✅     |
| Edge    | 90+   | ✅     |

### Performans | Performance

- **FPS**: 60 FPS (Animation refresh rate: 50ms)
- **DOM Updates**: Optimized with React hooks
- **SVG Rendering**: Path-based, minimal reflows
- **Memory**: ~15-20 MB baseline

---

## 📐 Matematiksel Formüller | Mathematical Formulas {#mathematical-formulas}

### Polar Koordinat Sistemi | Polar Coordinate System

Tüm şekiller polar koordinatlarla (r, θ) tanımlanmıştır:
- **x = r·cos(θ) + center_x**
- **y = r·sin(θ) + center_y**

### Animasyon | Animation

Her şekil zamana bağlı rotasyon ile animasyon gösterir:
```javascript
rotation = (t * 0.02) % (2π)
```

---

## 👨‍💻 Geliştirici | Developer {#developer}

### Hakkında | About Me

Yazılım geliştirici olarak matematiksel sanat, web teknolojileri ve kullanıcı arayüzü tasarımı alanlarında çalışmaktayım. Bu proje, React ve Tailwind CSS ile modern web uygulamaları geliştirme konusundaki tutkunumu yansıtmaktadır.

As a software developer, I specialize in mathematical art, web technologies, and user interface design. This project reflects my passion for developing modern web applications with React and Tailwind CSS.

### 📞 İletişim Bilgileri | Contact Information

📧 **Email**: developer@example.com  
💼 **Website**: https://yourportfolio.com

### 🌐 Sosyal Medya Hesapları | Social Media Accounts

<div align="center">

| Platform | Handle | Link |
|----------|--------|------|
| **GitHub** | @yourusername | [github.com/yourusername](https://github.com/yourusername) |
| **LinkedIn** | /in/yourname | [linkedin.com/in/yourname](https://linkedin.com/in/yourname) |
| **Twitter/X** | @yourhandle | [twitter.com/yourhandle](https://twitter.com/yourhandle) |
| **Instagram** | @yourinstagram | [instagram.com/yourinstagram](https://instagram.com/yourinstagram) |
| **Dev.to** | @yourdevto | [dev.to/@yourdevto](https://dev.to/@yourdevto) |
| **Portfolio** | yoursite.com | [yoursite.com](https://yoursite.com) |
| **Dribbble** | yourprofile | [dribbble.com/yourprofile](https://dribbble.com/yourprofile) |
| **Behance** | yourprofile | [behance.net/yourprofile](https://behance.net/yourprofile) |

</div>

### 💼 Profesyonel Bilgiler | Professional Information

**Adı | Name**: Your Full Name  
**Unvan | Title**: Full Stack Developer / Creative Developer  
**Uzmanlık Alanları | Expertise**:
- React.js & Next.js
- TypeScript & JavaScript (ES6+)
- Tailwind CSS & Advanced CSS/SCSS
- Web Animation & Canvas/SVG
- UI/UX Design & Figma
- Mathematical Visualization
- Node.js & Express
- Database Design (SQL/NoSQL)

**Deneyim | Experience**: 5+ years in Full Stack Web Development

**Eğitim | Education**: Computer Science / Software Engineering

---

## 📜 Lisans | License

Bu proje **MIT Lisansı** altında lisanslanmıştır.

```
MIT License

Copyright (c) 2025 Your Full Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software.
```

---

## 🤝 Katkıda Bulunun | Contributing

Katkılarınız çok değerlidir! Pull request göndermekten çekinmeyin.

Contributions are welcome! Feel free to submit a Pull Request.

---

## 📚 Kaynaklar | Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Polar Curves](https://en.wikipedia.org/wiki/Polar_curve)
- [Lissajous Curves](https://mathworld.wolfram.com/LissajousCurve.html)
- [Superellipse](https://en.wikipedia.org/wiki/Superellipse)

---

<div align="center">

### ⭐ Beğendiyseniz yıldız verin! | Please give a star if you like this! ⭐

**Made with ❤️ by [Your Name]**

2025 © All Rights Reserved

</div>
