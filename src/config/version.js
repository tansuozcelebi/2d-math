// Versiyon bilgisi - package.json ile senkronize
export const APP_VERSION = '1.0.9';
export const APP_NAME = '2D Parametrik Matematiksel Şekil Üreteci';
export const AUTHOR = 'Tansu Özçelebi';
// Yayın alan adı (domain) - tüm uygulama genelinde tek kaynak
export const SITE_DOMAIN = '2d.krea.tr';
export const SITE_URL = `https://${SITE_DOMAIN}`;
export const REPO_URL = 'https://github.com/tansuozcelebi/2d-math';
export const CONTACT_EMAIL = 'info@krea.tr';
export const WEBSITE_URL = 'https://www.krea.tr';
export const BRAND_NAME = 'Krea.tr';
export const LINKEDIN_URL = 'https://www.linkedin.com/showcase/fabus-app';

export const VERSION_HISTORY = [
  {
    version: '1.0.10',
    date: '3 Eylül 2026',
    features: [
      'Alan adı 2d.fabus.app adresinden 2d.krea.tr adresine taşındı',
      'Canonical, Open Graph, Twitter Card, sitemap.xml ve robots.txt adresleri güncellendi',
      'Dışa aktarma (JPG/PDF) filigranı yeni alan adını gösteriyor',
      'Alan adı, iletişim e-postası ve kurumsal web adresi version.js içinde merkezileştirildi',
      'Arayüz ve çeviri metinlerindeki marka adı KREA olarak güncellendi'
    ]
  },
  {
    version: '1.0.7',
    date: '14 Aralık 2024',
    features: [
      'Dinamik şekil listesi - Navbar ve Home paylaşılan konfigürasyondan güncellenir',
      'SVG otomatik ölçeklendirme - Kartlar resize edildiğinde şekil otomatik ölçeklenir',
      'Hash-tabanlı kart odaklanması - Menüden şekil seçildiğinde ekrana otomatik scroll',
      'Trefoil Knot şekli eklendi',
      'Manifest ikon boyutları düzeltildi (128x127, 302x300)',
      'GitHub, LinkedIn ve email konfigürasyonları merkezi hale getirildi',
      'React Fast Refresh sorunları çözüldü'
    ]
  },
  {
    version: '1.0.0',
    date: '13 Aralık 2024',
    features: [
      'Rose/Rozet, Spiral, Lissajous formülleri',
      'Dönen Çokgen ve Üçgen Spiral şekilleri',
      'Superellipse ve Gielis formülü',
      'GSAP ile smooth animasyonlar',
      'Draggable ve resizable paneller',
      'React Router entegrasyonu',
      'About sayfası ve Navbar',
      'Tailwind CSS styling'
    ]
  }
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
