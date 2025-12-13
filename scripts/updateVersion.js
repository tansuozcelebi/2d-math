#!/usr/bin/env node

/**
 * Otomatik versiyon güncelleme scripti
 * Kullanım: node scripts/updateVersion.js [major|minor|patch]
 */

const fs = require('fs');
const path = require('path');

const versionFile = path.join(__dirname, '../src/config/version.js');
const packageFile = path.join(__dirname, '../package.json');

// Mevcut versiyonu oku
const packageJson = JSON.parse(fs.readFileSync(packageFile, 'utf8'));
const currentVersion = packageJson.version;

// Versiyon tipini al
const versionType = process.argv[2] || 'patch';
if (!['major', 'minor', 'patch'].includes(versionType)) {
  console.error('Hata: Versiyon tipi major, minor veya patch olmalıdır');
  process.exit(1);
}

// Versiyon numarasını artır
const [major, minor, patch] = currentVersion.split('.').map(Number);
let newVersion;

switch (versionType) {
  case 'major':
    newVersion = `${major + 1}.0.0`;
    break;
  case 'minor':
    newVersion = `${major}.${minor + 1}.0`;
    break;
  case 'patch':
    newVersion = `${major}.${minor}.${patch + 1}`;
    break;
}

// Package.json güncelle
packageJson.version = newVersion;
fs.writeFileSync(packageFile, JSON.stringify(packageJson, null, 2) + '\n');

// Version.js dosyasını güncelle
const today = new Date();
const dateStr = `${today.getDate()} ${getMonthName(today.getMonth())} ${today.getFullYear()}`;

const versionContent = `// Versiyon bilgisi - package.json ile senkronize
export const APP_VERSION = '${newVersion}';
export const APP_NAME = '2D Parametrik Şekil Üreteci';
export const AUTHOR = 'Algoritma Mühendisi';

export const VERSION_HISTORY = [
  {
    version: '${newVersion}',
    date: '${dateStr}',
    features: [
      // Yeni özellikler buraya eklenecek
    ]
  },
];

export const FEATURES = [
  {
    title: 'Parametrik Formüller',
    description: '7 farklı matematiksel formülasyonla dinamik şekil üretimi',
    icon: '📐'
  },
  {
    title: 'Etkileşimli Kontrol',
    description: 'Gerçek zamanlı parametre ayarlayıcıları ve görselleştirme',
    icon: '🎨'
  },
  {
    title: 'Smooth Animasyonlar',
    description: 'GSAP ile profesyonel pencere efektleri ve geçişler',
    icon: '✨'
  },
  {
    title: 'Responsive Tasarım',
    description: 'Mobil ve masaüstü cihazlarda tam uyumluluk',
    icon: '📱'
  }
];
`;

fs.writeFileSync(versionFile, versionContent);

console.log(`✅ Versiyon başarıyla güncellendi: ${currentVersion} → ${newVersion}`);
console.log(`📝 Dosyalar güncellendi:`);
console.log(`   - package.json`);
console.log(`   - src/config/version.js`);

function getMonthName(month) {
  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];
  return months[month];
}
