# ConneXion-AI - Akıllı Müşteri Hizmetleri ve Yönetim Platformu

ConneXion-AI, işletmelerin müşteri iletişimini merkezileştirmesi, yapay zeka destekli yanıtlar sunması ve destek taleplerini (ticket) profesyonel bir şekilde uçtan uca yönetmesi için tasarlanmış modern, ölçeklenebilir ve yapay zeka entegreli bir müşteri hizmetleri yönetim paneli ve B2B SaaS platformudur. 

Bu dökümantasyon projenin mimarisi, teknik altyapısı, özellikleri ve çalışma prensipleri hakkında kapsamlı bir rehber niteliği taşımaktadır.

---

## 🎯 Vizyon ve Temel Odak

Müşteri destek süreçleri genellikle birden fazla kanala dağılmış, takip edilmesi zor ve tekrarlayan işlerle doludur. ConneXion-AI'nin temel amacı:
- **Merkezileştirme:** Çoklu kanal (Omnichannel) desteği ile tüm mesajları tek bir "Inbox" ekranına toplamak.
- **Otomasyon & Yapay Zeka:** Sık sorulan sorulara AI tabanlı "Akıllı Öneriler" ile anında yanıt oluşturmak.
- **İzlenebilirlik:** Ticket (Destek Talebi) yaşam döngüsünü başından sonuna kadar şeffaf bir şekilde yönetmek.
- **İzolasyon (Çoklu Kiracı):** Kurumsal verilerin Tenant bazlı güvenli bir şekilde ayrıştırılmasını sağlamak.

---

## 🚀 Kilit Noktalar ve Detaylı Özellikler

### 1. Akıllı Gelen Kutusu (Inbox) ve Ticket Yönetimi
- **Gerçek Zamanlı İletişim Arayüzü:** Modern sohbet (chat) arayüzü sayesinde müşterilerle hızlıca etkileşim.
- **AI Yanıt Önerileri:** Gelen mesajın bağlamını analiz ederek müşteri temsilcisine tek tıkla gönderilebilecek yanıt taslakları sunar.
- **Dahili Notlar (Internal Notes):** Temsilcilerin kendi aralarında sadece takımın görebileceği notlar bırakmasını sağlar (Sarı uyarı balonları).
- **Atama ve Devretme:** Destek taleplerini ilgili departmanlara veya temsilcilere (Re-assign) atama yeteneği.
- **Ticket Statüleri:** Açık, Beklemede, Çözüldü gibi durum (status) yönetimi ve durumların renk kodlarıyla (Badge) görselleştirilmesi.

### 2. Dashboard ve Raporlama (Analytics)
- **Canlı Metrikler:** Toplam konuşma, ortalama yanıt süresi, çözülen ticket sayısı gibi verileri Recharts kütüphanesi ile anlık grafiklere döker.
- **Performans Takibi:** Temsilcilerin performansını ve müşteri memnuniyet (CSAT) skorlarını analiz eder.
- **Dışa Aktarım (Export):** Raporların ve listelerin `html2pdf.js` kullanılarak anında PDF formatında indirilmesi.

### 3. Dinamik Rol Yönetimi (RBAC - Role Based Access Control)
- **Platform Admin:** Uygulamanın tüm özelliklerine tam erişim sağlar. Tenant sınırlarını kaldırabilir.
- **Workspace Admin & Manager:** Yalnızca kendi şirket (Tenant) verilerine erişebilir, çalışan davet edebilir.
- **Support Agent (Destek Temsilcisi):** Yalnızca kendine atanan veya havuzdaki boş ticket'ları görür.
- **User (Müşteri):** Sadece kendi açtığı talepleri (ticket) görüntüleyip yanıtlayabilir; dashboard veya inbox panellerine erişimi yoktur.

### 4. Müşteri (CRM) ve Ekip Yönetimi
- **Müşteri Profilleri:** Müşteri işlem geçmişi, açık talepleri, iletişim ve etiket (tag) bilgileri.
- **Ekip Davet Sistemi:** Yeni çalışma arkadaşlarını sisteme yetkilerini belirleyerek davet etme akışları.

---

## 🛠 Teknik Altyapı ve Kullanılan Teknolojiler

ConneXion-AI, en güncel frontend araçları ile inşa edilmiş, Single Page Application (SPA) mimarisini benimseyen bir React uygulamasıdır.

### Core (Çekirdek Çatı)
- **[React 18](https://reactjs.org/):** Bileşen tabanlı ve performanslı arayüzler inşa etmek için temel kütüphane.
- **[Vite](https://vitejs.dev/):** Webpack'e kıyasla inanılmaz derecede hızlı Hot Module Replacement (HMR) ve derleme sunan yapılandırma aracı.
- **[React Router v6](https://reactrouter.com/):** İçe içe rotalar (nested routes) ve Layout tabanlı sayfa geçişlerini yönetmek için.

### State Management (Durum Yönetimi)
- **[Redux Toolkit (RTK)](https://redux-toolkit.js.org/):** Global durum yönetimini (Örn: Aktif oturum, filtreler) en az boilerplate kod ile yönetmek için.
- **[RTK Query](https://redux-toolkit.js.org/rtk-query/overview):** API çağrılarını yönetmek için kullanıldı. Mükemmel bir caching (önbellekleme) sistemi sunarak gereksiz ağ isteklerini engeller. (Örn: Inbox verilerinin anında yenilenmesi).

### Styling, UI & Animasyon (Tasarım Sistemi)
- **[Tailwind CSS](https://tailwindcss.com/):** Tamamen Utility-First yaklaşımı ile custom CSS yazmadan %100 responsive, modern tasarımlar yapıldı.
- **[Framer Motion (Motion)](https://motion.dev/):** Menü açılışları, sayfa geçişleri ve akıcı modal (popup) animasyonları için kullanıldı.
- **[Lucide React](https://lucide.dev/):** Tutarlı, vektörel ve SVG tabanlı modern ikon kütüphanesi.
- **[Recharts](https://recharts.org/):** Kontrol paneli üzerindeki SVG tabanlı istatistik grafikleri için.

### Mock Backend
- **[JSON Server](https://github.com/typicode/json-server):** Backend geliştirilmeden uygulamanın uçtan uca çalışabilmesi için `db.json` üzerinden tam teşekküllü bir REST API simülasyonu sağlar. Gelen tüm POST, GET, PUT, PATCH, DELETE isteklerini diske yazar.

---

## 🏛 Mimarisi ve Dosya Yapısı

Proje yapısı ölçeklenebilirliği sağlamak için "Feature-based" (Özellik Odaklı) mimari deseniyle organize edilmiştir. 

```text
ConneXion-AI/
├── public/                 # Favicon, statik resimler, widget kodları
│   └── widget.js           # Dış platformlar için chatbot entegrasyon betiği
├── src/
│   ├── constants/          # Uygulama genelinde değişmeyen sabitler (RBAC kuralları, Statü Enum'ları)
│   ├── features/           # PROJENİN KALBİ - Modüler Özellikler
│   │   ├── auth/           # Login/Register ekranları, yetkilendirme
│   │   ├── contacts/       # CRM Müşteriler listesi ve detayları
│   │   ├── dashboard/      # Ana özet grafikleri (Chart componenti)
│   │   ├── inbox/          # Gelen kutusu, chat arayüzü, conversation thread
│   │   ├── reports/        # PDF çıktı alınabilen rapor tabloları
│   │   ├── support/        # Müşterilerin kendi arayüzünde gördüğü destek sistemi
│   │   └── team/           # Ekip listesi, rol değişiklikleri
│   ├── homepage/           # Landing page ve auth store entegrasyonu
│   ├── layouts/            # Dashboard, Auth vb. için kalıp sarmalayıcılar (Outlet)
│   ├── services/           # RTK Query API tanımlamaları (api.js, service.js)
│   ├── shared/             # Yeniden kullanılabilir butonlar, modallar, boş durum (Empty State) bileşenleri
│   ├── App.jsx             # Yönlendirme (Routing) ve Provider sarmalayıcıları
│   ├── index.css           # Global Tailwind direktifleri (@tailwind base; vs.)
│   └── main.jsx            # React'in DOM'a render edildiği nokta
├── db.json                 # JSON Server veritabanı (Müşteriler, Konuşmalar, Mesajlar)
├── tailwind.config.js      # Marka renkleri, fontlar ve özel temalar
├── vite.config.js          # Vite geliştirme ve derleme ayarları
└── package.json            # Proje kimliği ve npm bağımlılıkları
```

---

## 🔄 Veri Akışı ve RTK Query Entegrasyonu

Uygulamada manuel `fetch` veya `axios` istekleri kullanılmamaktadır. Tüm CRUD işlemleri `src/services/api.js` dosyasında **RTK Query** uç noktaları (endpoints) olarak tanımlanmıştır. 

Örnek bir akış:
1. Bir müşteri Inbox'ta bir mesaja "Gönder" der.
2. `useCreateMessageMutation` tetiklenir.
3. Mesaj `db.json`'a JSON Server aracılığıyla POST edilir.
4. İşlem başarılı olduğunda RTK Query Cache'i "invalidate" eder.
5. İlgili `getConversationById` hook'u otomatik olarak yeniden çalışır ve arayüz anında güncellenir.
Bu sayede State'in manuel güncellenmesine gerek kalmaz, Single Source of Truth prensibi korunur.

---

## 📦 Kurulum ve Geliştirme Ortamı (Getting Started)

Proje kaynak kodlarını yerel makinenizde tam teşekküllü olarak çalıştırmak için Node.js'in bilgisayarınızda yüklü olması gerekmektedir.

### 1. Bağımlılıkların Yüklenmesi
Projeyi klonladıktan sonra kök dizinde terminali açıp gerekli kütüphaneleri indirin:
```bash
npm install
```

### 2. Geliştirme Sunucusunu (Mock API) Başlatmak
Backend görevi gören JSON sunucusunu ayağa kaldırmak zorunludur. Aksi takdirde frontend veri alamaz. Yeni bir terminalde çalıştırın:
```bash
npm run server
```
*(Sunucu http://localhost:3000 adresinde ayağa kalkar ve `db.json` dosyasını dinler.)*

### 3. Frontend Geliştirme Ortamını Başlatmak
Mevcut terminali kapatmadan **yeni bir terminal sekmesi açarak** React uygulamasını çalıştırın:
```bash
npm run dev
```
*(Uygulama http://localhost:5173 adresinden erişilebilir olacaktır.)*

---

## 📜 NPM Komutları ve Scriptler

`package.json` içerisinde tanımlı olan faydalı komutların listesi:

- **`npm run dev`**: Vite dev server'ı başlatır. HMR (Hot Module Replacement) devrededir.
- **`npm run server`**: `json-server` kullanarak sahte bir RESTful API oluşturur. 
- **`npm run build`**: Projeyi optimize eder, minify edilmiş `.js` ve `.css` çıktılarını `dist/` klasörüne yazar (Production Build).
- **`npm run preview`**: Build işleminden sonra projenin production ortamında nasıl çalışacağını yerel olarak test etmenizi sağlar.
- **`npm run lint`**: Kodlama standartlarını ESLint aracılığıyla denetler, koddaki tutarsızlıkları ve hatalı kullanımları gösterir.

---

## 👥 Örnek Profiller ve Test Verileri

Sistemi farklı kullanıcı rolleriyle deneyimlemek için giriş yapabileceğiniz hazır (mock) kullanıcı hesapları `db.json` ve uygulamanın auth mekanizmasına gömülmüştür.

| İsim | Rol | E-Posta | Açıklama |
| --- | --- | --- | --- |
| Platform Yöneticisi | `platform_admin` | `admin@connexion.ai` | Tüm verilere, tenant'lara ve sistem ayarlarına küresel erişimi olan en yetkili hesaptır. |
| SaaS Precise Yöneticisi | `admin` | `yonetici@saasprecise.com` | Yalnızca `saasprecise` tenant'ına aittir, o firmanın tüm biletlerini görür. |
| SaaS Precise Temsilci | `support_agent` | `temsilci@saasprecise.com` | Gelen kutusunda müşterilerle sohbet eden operasyon personelidir. |
| TrendSoft Kullanıcı | `user` | `gorkemiskeceli@gmail.com` | Sadece kendi açtığı şikayet/destek taleplerini müşteri ekranından görebilen son kullanıcıdır. |

*(Test ortamında şifre alanına herhangi bir giriş yapabilirsiniz, sistem e-posta bazlı kontrol sağlamaktadır.)*

---

## 🌍 Dış Widget Entegrasyonu (ConneXion-AI Widget)

Uygulama, müşterilerin kendi web sitelerine (Örn: bir React test uygulamasına) ekleyebilecekleri bir **Chat Widget** mekanizması da sunar. 
Widget kodu `public/widget.js` içindedir. Müşteriler, sitelerinin ana bileşeninde (Örn: `App.jsx`) `useConneXionAI()` özel hook'u üzerinden script'i içeri aktararak bu widget'ı kendi platformlarında çalıştırabilir ve mesajlarını doğrudan bu panele düşürebilirler.

---

## 🚀 Proje Durumu ve Gelecek Geliştirmeler

Bu aşamada (Faz 1) proje, detaylı bir prototip ve tam donanımlı UI gösterimi (Mock API tabanlı MVP) olarak tamamlanmıştır.

**Gelecek Faz (Faz 2) Kapsamı:**
- Node.js / Express ile gerçek bir Backend API mimarisinin kurulması.
- PostgreSQL veya MongoDB ile kalıcı veritabanına geçiş.
- JWT tabanlı gerçek bir Auth mekanizmasının kurulması.
- Socket.io üzerinden WebSocket ile asenkron / gerçek zamanlı (Real-time) mesajlaşma sisteminin entegre edilmesi.
- OpenAI API doğrudan bağlanarak AI Asistan'ın statik textler yerine gerçek NLP (Doğal Dil İşleme) yanıtları üretmesi.

---

*Bu dökümantasyon, ConneXion-AI projesinin tüm standartlarını ve kurallarını kapsamak üzere titizlikle oluşturulmuştur.*
