# Görsel envanteri (`reference-images/`)

Her dosya açılıp içeriğine bakılarak tanımlandı; dosya adları esas alınmadı. Üretim varlıkları `npm run assets` (`scripts/crop-assets.mjs`) ile `src/assets/` ve `public/` altına üretilir. Yayına çıkan sürümler build sırasında `astro:assets` ile AVIF/WebP'ye çevrilir.

| Dosya | İçerik | Boyut | Kullanım |
|---|---|---|---|
| `Emberwick Games Piksel Sanat Varlık Panosu.png` | **Moodboard**: logo, pixel ikonlar, sosyal ikonlar, buton örnekleri, fontlar, hero/studio/footer/privacy/404 sahneleri, oyun görselleri, Google Play rozeti, dokular | 1536×1024, 2.1 MB | Sanat yönetiminin ana referansı (renk, buton, tipografi, ikon dili). Klasörde sahnelerin ayrı dosyaları olmadığı için şu **yer tutucu kırpımlar** buradan alındı (gömülü yazı ve arayüz öğeleri kırpımın dışında bırakıldı): `scenes/hero.png` (826×312), `scenes/studio.png` (492×212), `scenes/footer.png` (685×95, alttaki sahte menü/logo hariç), `scenes/privacy-scroll.png` (136×148) ve `scenes/privacy-lantern.png` (85×148) (ortadaki "Privacy Policy" yazısı hariç), `scenes/lost-traveller.png` (110×82, 404 sahnesinin yazısız sol kısmı) |
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

## Kullanılmayan öğeler ve nedenleri

- `LeaderBoard.png`: kişisel veri içeriyor (yukarıda).
- Moodboard'daki logo düzeni (alevli kalkan ve "EMBERWICK — GAMES"): `Logo v2.png` ayrı ve daha yüksek çözünürlüklü resmi logo olduğu için onun parçaları kullanıldı.
- Moodboard'daki Google Play rozeti: resmi rozet dosyası değil, ayrıca `googlePlayUrl` boş. Rozet gösterilmiyor. Resmi dosya `src/assets/badges/google-play.(png|webp|svg)` olarak eklenirse kullanılır.
- Moodboard'daki pixel ikonlar, sosyal ikonlar, dokular ve ek varlıklar: yaklaşık 40 px boyutunda, ayrı dosya değiller. Tasarım felsefesi ikonları (zar, fener, taç, kor) aynı dile uygun şekilde SVG olarak çizildi (`src/components/icons/pixel-maps.ts`). Sosyal ikonlar SVG olarak çizildi ve config dolu olmadığı için hiçbir yerde görünmüyor.
- Moodboard'daki oyun ekran görüntüsü küçük kopyaları: aynı içeriğin daha keskin ayrı dosyaları kullanıldı.
- Dosya adında "test", "placeholder" ya da "draft" geçen görsel yok.
- 20 MB'ı aşan görsel yok (en büyüğü 2.1 MB).

## Daha yüksek çözünürlük gerekenler

Aşağıdakilerin hepsi moodboard'dan kırpılmış yer tutucular. Ayrı, yüksek çözünürlüklü dosyalar eklenirse `scripts/crop-assets.mjs` içindeki ilgili satır değiştirilip `npm run assets` çalıştırılmalı.

| Varlık | Mevcut | Önerilen |
|---|---|---|
| Hero arka planı | 826×312 (1920 ekranda yaklaşık 3.5 kat büyütülüyor, yumuşak görünüyor) | ≥ 2560×1440 |
| Studio sahnesi | 492×212 | ≥ 1600×900 |
| Footer sahnesi | 685×95 | ≥ 2560×400 |
| Privacy banner (parşömen ve fener) | 136×148 ve 85×148 | ≥ 1920×480, yazısız tek parça |
| 404 sahnesi | 110×82 | ≥ 1200×800, yazısız |
| Google Play rozeti | yok | resmi dosya |
