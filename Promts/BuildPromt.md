# Görev: Emberwick Games sitesini bu repoda kur (Astro + TypeScript), görsel ve işlevsel olarak eksiksiz, Cloudflare Pages'e hazır

Sen deneyimli bir Creative Director, Web Designer ve Senior Frontend Engineer olarak çalışıyorsun. Hedef: ziyaretçiyi ilk saniyeden bir oyun dünyasına sokan, profesyonel, atmosferik, bağımsız bir oyun stüdyosu sitesi. Sadece taslak değil: çalışan, hatasız build alan, yayına hazır site üret. Hepsini sen yap, bana iş bırakma. Plan modundaysan önce planı sun (sayfalar, dosya yapısı, bileşenler, varlık eşleştirmesi, doğrulama adımları); onaydan sonra uygula.

## 0. Bağlam ve kaynaklar

- Repo: github.com/ZetySama/emberwick-site. Cloudflare Pages bu repoya bağlı: her push'ta `npm run build` çalışır, `dist/` yayınlanır, NODE_VERSION=22. Şu an repoda proje yok, build "package.json bulunamadı" hatası veriyor.
- Domain YOK. Site `*.pages.dev` altında yayınlanacak. Canonical/sitemap/OG URL'leri tek bir `SITE_URL` sabitinden gelsin (geçici değer `https://emberwick.pages.dev`, yorumla "Cloudflare'deki gerçek adres netleşince değiştir"). Başka sahte domain kullanma.
- `reference-images/` klasöründe benim hazırladığım TÜM görseller var (sayısı ve adları belli değil: logo, moodboard, uygulama simgesi, oyun ekran görüntüleri, sahne/arka plan görselleri, ikonlar, rozetler, dokular vb.). Dosya adlarına güvenme.
  1. Önce klasörü recursive listele, her görseli AÇIP içeriğine göre tanı ve bir envanter çıkar (dosya, içerik, boyut, kullanım yeri). Envanteri `docs/asset-inventory.md` olarak kaydet.
  2. MOODBOARD görseli (logo, ikonlar, butonlar, fontlar, sahne örnekleri bir arada) sanat yönetiminin ana referansıdır; üretim varlığı olarak değil, yön olarak kullan.
  3. Her sayfa/bölüm için klasördeki EN UYGUN, en yüksek çözünürlüklü ayrı dosyayı seç (hero, studio, footer, privacy banner, 404, ikonlar, dokular, Google Play rozeti, favicon, logo, oyun görselleri). Aynı içeriğin birden çok sürümü varsa en keskin olanı kullan. Klasörde yoksa ancak o zaman moodboard'dan kırpma yer tutucusu kullan ve raporda belirt.
  4. Kullanmadığın görselleri de envanterde "kullanılmadı: neden" diye listele.
  5. Gizlilik/telif filtresi: Başka kişilerin adı, kullanıcı adı, avatarı, e-postası veya kişisel bilgisi görünen hiçbir görseli (ör. leaderboard'da başka oyuncuların takma adları) siteye KOYMA. Bulursan kullanma, envanterde "kişisel veri içeriyor" diye işaretle. Sadece benim kendi hesabımı (Emberwickgames) gösteren görseller serbest.
  6. Dosya adında/içinde "test", "placeholder", "draft" geçen ya da düşük kaliteli görünenleri kullanma.
- `privacy-source.html` (repo kökünde): Dice Merge gizlilik politikasının onaylı metni.
- Önce oku: repo, görseller, privacy-source.html. Zaten bir Astro projesi varsa sıfırlama, üstüne kur.



## 1. Teknik yığın

- Astro + TypeScript + özel CSS. Ağır UI kütüphanesi yok. Sadece statik çıktı (adapter yok). Node 22 ile uyumlu sürümler seç.
- Görseller `astro:assets` (sharp) ile optimize edilsin (WebP/AVIF, uygun boyutlar, lazy-load; hero LCP görseli hariç). Fontları self-host et (`@fontsource/press-start-2p`, `@fontsource-variable/inter` veya `@fontsource/inter`): Google Fonts'a istek ATMA (gizlilik politikası olan bir siteden üçüncü tarafa gereksiz istek gitmesin).
- `image-rendering: pixelated` sadece küçük sprite/ikonları tam sayı katlarıyla büyütürken kullan. Büyük sahne görsellerinde (hero, studio, footer) `auto` kullan, yoksa küçültünce tırtıklı görünür.
- `src/config/site.ts` tek yapılandırma dosyası: `SITE_URL`, e-posta (`emberwickgames842@gmail.com`), `googlePlayUrl` (şimdilik boş), `socials` (discord, x, youtube, instagram; şimdilik hepsi boş). BOŞ olan hiçbir link/ikon/buton hiçbir yerde gösterilmesin; "yakında" gibi sahte metin de yazma.
- Bileşenleri mantıklı ve yeniden kullanılabilir ayır, TypeScript tip güvenliğini koru, gereksiz bağımlılık ekleme.



## 2. Sanat yönetimi (moodboard'a sadık kal)

Koyu, gece mavisi atmosfer + modern, rafine web tasarımı. Pixel-art sadece karakteri belirlesin, site eski bir oyun arayüzüne dönüşmesin.

- Renkler: bg `#10121A`, surface `#191C26`, ember orange `#FF8145`, warm gold `#EFC779`, parchment cream `#F1E8D5`, muted text `#A5A7B3`, forest teal `#315D58`. Koyu yüzeyler baskın; turuncu/altın ateş, ışık, aktif buton ve önemli etkileşimlerde kontrollü kullanılsın. CSS değişkeni olarak tanımla.
- Tipografi: başlıklar ve küçük etiketler Press Start 2P (uzun paragrafta KULLANMA; geniş bir font olduğu için başlık boyutlarını küçük tut, mobilde taşırma/kesme olmasın). Metin ve navigasyon Inter.
- Butonlar moodboard'daki gibi: dolu turuncu ("Explore Games →"), beyaz çerçeveli ("View Game →"), altı çizili turuncu metin link ("Learn More →"). Hover'da hafif ışık/renk değişimi.
- Sahne görselleri: hero, studio, footer, privacy banner ve 404 için `reference-images/` içindeki ayrı dosyaları kullan (envanter kuralına göre). İçinde yazı gömülü olan görsellerde o yazıyı HTML/CSS ile yeniden kur; yazılı hali sadece yazı zaten tasarımın parçasıysa (ör. oyunun kendi logosu) olduğu gibi kullan. Görsel yeterince büyük değilse (ör. tam ekran hero için 1920px genişliğin çok altındaysa) kullan ama raporda "daha yüksek çözünürlük gerekli" diye listele.
- Logo: Emberwick Games logosunu klasörden kullan. Zemini opaksa ve temiz biçimde şeffaf PNG/WebP'ye çevirebiliyorsan çevir (kenarda halo kalmasın, görsel olarak doğrula); temiz olmuyorsa koyu bir yüzeyde olduğu gibi kullan. Logoyu yeniden çizme, zar ya da Dice Merge ikonu ekleme. Favicon'u logodaki kor sembolünden üret.
- Oyun görselleri çerçeve ve renklerini bozma, oranlarını koru, kırpma.



## 3. Sayfalar

Ortak: şeffaf/koyu sticky header (logo solda; Home, Games, Studio, Contact; belirgin "Explore Games" butonu; mobilde temiz açılır menü), karakterli footer (logo, Games, Studio, Contact, Privacy Policy, sosyal ikonlar SADECE config'te dolu olanlar, `© {güncel yıl} Emberwick Games`; yılı build'de otomatik al).

`/` Ana sayfa:

- Hero: tam ekran pixel-art gece sahnesi, katmanlı derinlik, hafif parallax, az sayıda düşük maliyetli kıvılcım/parçacık. Başlık "Small worlds. Lasting adventures." Alt metin: "We craft thoughtful games with distinctive worlds, satisfying mechanics, and a spark of wonder." Butonlar: "Explore Our Games" (/games), "Discover the Studio" (/studio).
- Studio introduction: "Built with care. Made for play." Samimi ve dürüst, yetenekleri abartmadan. Studio sahnesi görseliyle.
- Featured game: Dice Merge mini dijital vitrini: uygulama simgesi, oynanış ekran görüntüleri çerçeveli bir kompozisyonda (ekran görüntüleri sahte telefon maketi içine konmasın), başlık, kısa açıklama, "View Game" butonu. Google Play linki config'te doluysa "Get it on Google Play" rozeti göster; boşsa gösterme. Resmi rozet dosyasını yeniden çizme; klasörde varsa onu kullan.
- Design philosophy: Thoughtful Mechanics / Distinctive Worlds / Crafted Experiences, her birine özgün küçük pixel-art ikon (klasörde uygun ikonlar varsa onları kullan, yoksa CSS/SVG ile moodboard'daki ikon dilinde kendin çiz: kor, zar, taç, fener, kılıç vb.). Kartlar birbirinin aynısı olmasın, dil tutarlı kalsın.
- Final CTA: ateş ışığından ilham alan kapanış, "Every great adventure starts somewhere."

`/games`: Dice Merge kartı (görsel, kısa açıklama, detay linki). Başka oyun varmış gibi davranma; ileride oyun eklenebilsin diye veriyi bir dizi/dosyadan okuyan modüler bileşen yap.

`/games/dice-merge`: simge + başlık, kısa açıklama, oynanış galerisi (mobilde kaydırılabilir), özellikler listesi, Google Play (config boşsa gösterme), destek e-postası (mailto), Privacy Policy linki.

- Açıklama ve özellikleri YALNIZCA ekran görüntülerinden doğrulayabildiklerinle yaz: pixel-art zar birleştirme bulmacası, 5x5 tahta, joker sistemi (Bomb, Clear Value görülüyor), skor ve en yüksek skor, leaderboard, oyuncu profili ve avatar seçimi, İngilizce/Türkçe dil seçeneği. Emin olmadığın mekanik/özellik yazma; kısa tut ve final raporunda "sahip onayı gereken metinler" olarak işaretle.

`/privacy/dice-merge`: oyunun içinden açılacak hedef sayfa.

- Politika metni `privacy-source.html`'den BİREBİR alınacak. Tek kelime değiştirme, ekleme, çıkarma yok; hukuki iddia ekleme. Sadece site temasına uygun düzenle: başlık "Privacy Policy — Dice Merge", yürürlük tarihi (metindeki: 2026-09-16), içindekiler (bölüm bağlantıları), Home ve Dice Merge sayfasına geri dönüş linkleri, mailto linkleri, okunaklı genişlik, yüksek kontrast. Parşömen/fener temalı banner'ı HTML/CSS ile üstte atmosfer olarak kur. Metnin altındaki "App Privacy Policy Generator" atfını koru.
- Koyu tema + okunaklı krem metin alanı yeterli, light/dark geçişi gerekmez.

`/studio`: "A little spark can build a world." Geliştirme yaklaşımı ve tasarım felsefesi. Ekip, ödül, kurucu hikâyesi, başarı UYDURMA.

`/contact`: sade sayfa, `emberwickgames842@gmail.com` mailto. İşlevsiz form EKLEME.

404: "This path leads nowhere." kayıp karakter/sönen kor temalı, Home ve Games'e gerçek linkler. `src/pages/404.astro`.

## 4. Animasyon, erişilebilirlik, responsive

Canlı ama sakin: hover ışık değişimi, kontrollü buton mikro animasyonu, kısa giriş animasyonları (IntersectionObserver), az parçacık. Titreme, abartılı blur/parıltı yok. `prefers-reduced-motion` desteği zorunlu. Semantik HTML, görünür focus, klavye ile gezilebilir menü, anlamlı alt metinler, yeterli kontrast. Mobil görünümü ayrı tasarla (masaüstünün küçültülmüşü olmasın): başlık ölçüleri, boşluklar, görsel kırpma, menü, butonlar. Yatay taşma, kesik başlık, tıklanamayan buton, küçük metin bırakma. Küçük/büyük telefon, tablet, laptop ve geniş masaüstünü ayrı kontrol et.

## 5. SEO ve Cloudflare

Her sayfada title/description, Open Graph (görsel: hero veya logo tabanlı), canonical (`SITE_URL`), favicon, `robots.txt`, sitemap (`@astrojs/sitemap`). Domain/hesap/DNS işlemi yapma, yapılmış gibi gösterme.1

## 6. Doğrulama (hepsini çalıştır, hata kalmadan bitirme)

1. `npm install` ve `npm run build`: hatasız/uyarısız. `dist/` içinde şunlar olmalı: `index.html`, `games/index.html`, `games/dice-merge/index.html`, `privacy/dice-merge/index.html`, `studio/index.html`, `contact/index.html`, `404.html`.
2. `npm run preview` ile tüm sayfalar ve dahili linkler (kırık link yok). Boş config alanlarının hiçbir yerde görünmediğini kontrol et. Console'da hata/uyarı yok.
3. 360px, 768px, 1280px, 1920px genişliklerde yatay taşma ve okunabilirlik. Playwright kurulabiliyorsa her sayfa için screenshot al, BAK ve görsel sorunları (kesilen başlık, taşan metin, bozuk görsel, düşük kontrast, boş alan, üst üste binen öğe) düzelt, tekrar kontrol et (en fazla 4 tur). Kurulamıyorsa kodla/CSS ile kontrol edip raporda belirt.
4. Gizlilik sayfasındaki metnin `privacy-source.html` ile birebir aynı olduğunu bir script ile karşılaştır (metin diff'i).
5. Lighthouse gibi bir ölçüm yapılabiliyorsa performans/erişilebilirlik skorunu raporla; 90 altı çıkarsa nedenini düzelt.



## 7. Git ve kısıtlar

- `.gitignore` (node_modules, dist, .astro). `reference-images/` ve `privacy-source.html` repoda kalsın. Tek bir görsel 20 MB'ı aşıyorsa uyar (GitHub sınırı 100 MB).
- Yeni bir commit at ("Add Emberwick Games Astro site"). PUSH YAPMA, ben GitHub Desktop'tan yapacağım.
- Uydurma içerik yok: ekip, ödül, yorum, puan, indirme sayısı, mağaza linki.
- Doğrulayamadığın her şeyi UNKNOWN olarak raporla.



## 8. Final raporu (Türkçe, kısa)

Oluşturulan sayfalar ve dosya yapısı; kullanılan renk/font/bileşenler; build ve doğrulama sonuçları; `docs/asset-inventory.md` özeti (hangi görsel nerede kullanıldı, hangileri neden kullanılmadı); düşük çözünürlük/eksik görsel listesi; benden gereken eksikler (Google Play URL'i ve rozeti, sosyal hesap linkleri, onay gereken metinler); Cloudflare'de değiştirmem gereken bir şey varsa.