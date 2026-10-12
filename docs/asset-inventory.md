# Görsel envanteri (`reference-images/`)

Her dosya açılıp içeriğine bakılarak tanımlandı; dosya adları esas alınmadı. Üretim varlıkları `npm run assets` (`scripts/crop-assets.mjs`) ile `src/assets/` ve `public/` altına üretilir. Yayına çıkan sürümler build sırasında `astro:assets` ile AVIF/WebP'ye çevrilir.

| Dosya | İçerik | Boyut | Kullanım |
|---|---|---|---|
| `Emberwick Games Piksel Sanat Varlık Panosu.png` | **Moodboard**: logo, pixel ikonlar, sosyal ikonlar, buton örnekleri, fontlar, hero/studio/footer/privacy/404 sahneleri, oyun görselleri, Google Play rozeti, dokular | 1536×1024, 2.1 MB | Sanat yönetiminin ana referansı (renk, buton, tipografi, ikon dili). Sahnelerin çoğu artık ayrı dosyalardan geliyor; moodboard'dan yalnızca 404 sahnesi için `scenes/lost-traveller.png` (110×82, yazısız sol kısım) kırpıldı. |
| `Main Page Backgorund.png` | Ana sayfa sahnesi: kamp ateşi başında karakter, ağaç ve fener, göl kıyısında kale, dolunay | 1672×941, 2.5 MB | Hero arka planı (`scenes/hero.png`) ve OG görseli |
| `Studio Section.jpg` | Çalışma odası: şömine, bayrak, kapüşonlu geliştirici laptopla, uyuyan kedi, ay ışıklı pencere | 2752×1536, 2.9 MB | Ana sayfa stüdyo tanıtımı ve `/studio` sayfası (`scenes/studio.jpg`) |
| `Footer backgorund.jpg` | Gün batımı: uçurumda yolcu, dağlar, kale, alt kısmı karanlık | 2752×1536, 2.2 MB | Tüm sayfaların footer arka planı (`scenes/footer.jpg`) |
| `Private Policy.jpg` | Kitaplık, tüy kalem, parşömen ve fener, ortası boş masa | 2752×1536, 2.4 MB | Gizlilik sayfası banner arka planı (`scenes/privacy.jpg`); başlık HTML ile üstüne bindirildi |
| `Logo v2.png` | Emberwick Games logosu: çerçeveli, kor sembolü ve "EMBERWICK GAMES" yazısı, düz koyu zemin (#212429), dış kenarı şeffaf | 1024×1024, 426 KB | `brand/logo-full.png` (şeffaf kenarı kırpılmış tam logo; OG görselinde kullanıldı). `brand/logo-mark.png` ve `brand/logo-wordmark.png`: header ve footer'daki yatay logo için sembol ve yazı ayrı kırpıldı, düz zemin renk arındırmasıyla şeffaflaştırıldı (koyu ve açık zeminde halo kontrolü yapıldı). Favicon'lar (`favicon-32`, `favicon-192`, `apple-touch-icon`, `icon-512`) kor sembolünden üretildi |
| `512x512.png` | Dice Merge uygulama simgesi (renkli pixel zarlar) | 512×512, 320 KB | Öne çıkan oyun bölümü, /games kartı, oyun detay başlığı |
| `1024x500.png` | Dice Merge tanıtım görseli (oyunun kendi logosu gömülü) | 1024×500, 632 KB | Öne çıkan oyun kompozisyonu, /games kartı, oyun detay arka planı. Gömülü yazı oyunun logosu olduğu için olduğu gibi kullanıldı |
| `GamePlay.jpeg` | Oynanış: 5x5 tahta, skor 1250, en yüksek skor yıldızı, joker yuvası | 945×2048, 150 KB | Öne çıkan oyun bölümü, galeri |
| `GamePlay2.jpeg` | Oynanış: skor 1900 | 945×2048, 149 KB | Galeri |
| `Bomb Joker.jpeg` | Joker seçimi: Bomb, "Blast the board" | 945×2048, 131 KB | Öne çıkan oyun bölümü, galeri |
| `ClearValue Joker.jpeg` | Joker seçimi: Clear Value, "Remove matching dice" | 945×2048, 137 KB | Galeri |
| `main menu.png` | Ana menü: Play / Settings / Leaderboards, sağ üstte sahibin avatarı | 945×1908, 1.2 MB | Galeri |
| `Profile panel.png` | Player Profile: "Emberwickgames", Global Rank 7, Best Score 44069, avatar | 945×1906, 1.2 MB | Galeri (yalnızca sahibin kendi hesabı görünüyor) |
| `LeaderBoard.png` | Liderlik tablosu: diğer oyuncuların takma adları ve avatarları | 945×1916, 1.2 MB | **Kullanılmadı: kişisel veri içeriyor** (başka oyuncuların takma adları ve avatarları) |

## Mascot animasyonları (`public/media/mascots/`)

Kaynak: AI-generated mascot, Google Flow. Orijinal GIF'ler `Gifs/` klasöründe (480×270, 16 fps, 10 sn, ~8 MB; sayfaya konmadı). Düz olmayan (vinyetli) krem zemin nedeniyle colorkey ile saydamlık denenmedi; klipler krem çerçeveli yuvarlak köşeli kart içinde gösterilir. Yeniden üretmek için: `bash scripts/encode-mascots.sh` (ffmpeg gerekir). Bileşen: `src/components/MascotLoop.astro`.

| Dosya | Boyut | Kullanım |
|---|---|---|
| `hero-greeting.mp4` / `.webm` | 349 KB / 425 KB | Dice Merge sayfası hero'su, sağ sütun (Pip + Pop el sallayıp zıplıyor) |
| `hero-greeting-poster.webp` | 19 KB | Hero klibinin ilk karesi; `prefers-reduced-motion` durumunda gösterilir |
| `sleeping-dice.mp4` / `.webm` | 252 KB / 314 KB | Dice Merge sayfası sonu, "goodnight" kartı |
| `sleeping-dice-poster.webp` | 18 KB | Uyuyan zarlar klibinin ilk karesi |

Bir tarayıcı yalnızca bir formatı indirir (WebM, yoksa MP4). Tüm yeni medya toplamı ≈ 1.38 MB. Sayfada her iki kartın altında "AI-generated mascot art" notu var.

## Kullanılmayan öğeler ve nedenleri

- `LeaderBoard.png`: kişisel veri içeriyor (yukarıda).
- Moodboard'daki logo düzeni (alevli kalkan ve "EMBERWICK — GAMES"): `Logo v2.png` ayrı ve daha yüksek çözünürlüklü resmi logo olduğu için onun parçaları kullanıldı.
- Moodboard'daki Google Play rozeti: resmi rozet dosyası değil, ayrıca `googlePlayUrl` boş. Rozet gösterilmiyor. Resmi dosya `src/assets/badges/google-play.(png|webp|svg)` olarak eklenirse kullanılır.
- Moodboard'daki pixel ikonlar, sosyal ikonlar, dokular ve ek varlıklar: yaklaşık 40 px boyutunda, ayrı dosya değiller. Tasarım felsefesi ikonları (zar, fener, taç, kor) aynı dile uygun şekilde SVG olarak çizildi (`src/components/icons/pixel-maps.ts`). Sosyal ikonlar SVG olarak çizildi ve config dolu olmadığı için hiçbir yerde görünmüyor.
- Moodboard'daki oyun ekran görüntüsü küçük kopyaları: aynı içeriğin daha keskin ayrı dosyaları kullanıldı.
- Dosya adında "test", "placeholder" ya da "draft" geçen görsel yok.
- 20 MB'ı aşan görsel yok (en büyüğü 2.9 MB).

## Daha yüksek çözünürlük gerekenler

Hero, stüdyo, footer ve gizlilik banner'ı ayrı dosyalardan geliyor ve yeterli çözünürlükte. Kalanlar için ayrı dosya eklenirse `scripts/crop-assets.mjs` içindeki ilgili satır değiştirilip `npm run assets` çalıştırılmalı.

| Varlık | Mevcut | Önerilen |
|---|---|---|
| 404 sahnesi (moodboard kırpımı) | 110×82 | ≥ 1200×800, yazısız |
| Google Play rozeti | yok | resmi dosya |
