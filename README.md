# Karakter Çıkartma Konsol Uygulaması

Metin ve sıfır tabanlı bir indeks alarak seçilen karakteri çıkaran etkileşimli algoritma uygulaması. Tekli veya toplu girdileri işleyebilir; geçersiz ve metin sınırları dışındaki indeksleri açıklayıp sonucu görsel konsolda gösterir.

## Özellikler

- `metin,indeks` biçiminde tekli ve toplu girdi işleme
- Seçilen konumdaki karakteri çıkarıp sonucu üretme
- Geçersiz biçim ve sınır dışı indeksleri açıklama
- Karakter konumlarını ve işlem adımlarını görselleştirme
- Terminal simülatörü ve algoritma izleme
- Örnek kaynak kodlarını birden fazla programlama dilinde inceleme
- Toplu işleme ve algoritma açıklamaları

## Teknolojiler

- React
- TypeScript
- Vite
- Tailwind CSS

## Gereksinimler

- Node.js LTS
- npm

## Kurulum ve çalıştırma

```bash
npm install
npm run dev
```

Geliştirme sunucusu başladıktan sonra terminalde gösterilen yerel adresi tarayıcıda açın.

## Kontroller ve üretim derlemesi

```bash
npm run lint
npm run build
```

`npm run lint` TypeScript tip denetimini, `npm run build` ise üretim derlemesini çalıştırır. Derlemeyi yerel olarak görüntülemek için `npm run build` sonrasında `npm run preview` komutunu kullanın.

## Proje yapısı

- `src/utils/algorithm.ts` — girdi çiftlerini işleme ve karakter çıkarma algoritması
- `src/components/` — terminal, toplu işleme, görsel inceleme ve kod örnekleri
- `src/App.tsx` — uygulama akışı ve ekran bileşenlerinin koordinasyonu
- `src/main.tsx` — uygulama giriş noktası

## Kullanım

1. Bir veya daha fazla `metin,indeks` çifti girin.
2. İndeksin sıfır tabanlı olduğunu unutmayın; ilk karakterin indeksi `0`’dır.
3. İşlemi çalıştırıp çıkarılan karakteri ve sonucu inceleyin.
4. Toplu işlemde her çiftin sonucu ve açıklaması ayrı gösterilir.
