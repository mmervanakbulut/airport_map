# Havalimani Haritasi

Bu proje, dunyadaki havalimanlarini interaktif bir harita uzerinde gosterir. Kullanici; havalimani turune ve ulkeye gore filtreleme yapabilir, marker detaylarindan temel bilgileri gorebilir.

## Kullanilan Teknolojiler

- Next.js 16.1.6 (App Router)
- React 19.2.3
- Leaflet 1.9.4 + React Leaflet 5 + React Leaflet Cluster 4
- Tailwind CSS 4 (+ @tailwindcss/postcss)
- ESLint 9 (+ eslint-config-next core-web-vitals)
- ourairports-data-js (havalimani verisi)

## Teknoloji Analizi (Kisa Aciklama)

- Next.js (App Router): Uygulama yonlendirme, sayfa yapisi ve build surecini yonetir.
- React: Arayuz bilesenleri ve filtreleme gibi istemci tarafi etkileşimler icin kullanilir.
- Leaflet ekosistemi: Haritayi basmak, marker gostermek ve cluster yapmak icin kullanilir.
- Tailwind CSS: Hizli stil gelistirme icin utility-class tabanli CSS yapisi saglar.
- ESLint: Kod kalitesi ve tutarlilik kontrolu yapar.
- ourairports-data-js: Havalimani veri setini uygulamaya saglar.

## Gelistirme Komutlari

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
```

## Veri ve Kaynaklar

- Havalimani verisi: ourairports-data-js
- Ulke geojson kaynagi: https://github.com/datasets/geo-countries
- Harita kutuphanesi: https://leafletjs.com/

