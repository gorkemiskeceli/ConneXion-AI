# ConneXion-AI: Kapsamlı Proje Dizini, Kod ve Mimari Rehberi

Bu döküman, projenin en ince detayına kadar (tüm slice'lar, RTK Query yapıları, feature'lar, bileşenler ve yapay zeka entegrasyonları) hangi kodun nerede ve nasıl çalıştığını anlatmak için tasarlanmıştır.

---

## 1. Global State ve Redux (Slice'lar) 🧠

Projedeki global state'ler (Uygulama genelinde paylaşılan veriler) Redux Toolkit ile `src/homepage/store/` dizininde tutulur.

* **Auth Slice (`src/homepage/store/authSlice.js`)**
  * **Satır 1-30:** LocalStorage'dan güvenli veri okuma/yazma fonksiyonları.
  * **Satır 46-52:** Varsayılan test profillerinin (`platform_admin`, `admin`, `user`) sisteme seed (gömülmesi) edilmesi.
  * **Satır 95-156 (`authSlice`):** Kullanıcının login/logout (oturum açma/kapatma) fonksiyonları ve güncel kullanıcı objesinin saklanması.
* **Support Slice (`src/homepage/store/supportSlice.js`)**
  * **Satır 16-56:** Kullanıcıların oluşturduğu ticket (destek talebi) formlarının ve onay durumlarının UI state'ini kontrol eder.
* **Store Konfigürasyonu (`src/homepage/store/index.js`)**
  * **Satır 5-11:** Uygulamanın tüm reducer'larının (auth, support ve api) tek bir merkezde (Store) birleştirilmesi.

---

## 2. API ve Veri Akışı (RTK Query) 🌐

Manuel axios çağrıları yerine veritabanı (db.json) ile olan tüm konuşmalar tek bir dosyada merkezileştirilmiştir.

* **API Servis Dosyası (`src/services/api.js`)**
  * **Satır 4-39 (`customBaseQuery`):** Tüm HTTP isteklerini yakalar. Gelen istekleri okur, yakalar ve `service.js`'e iletir.
  * **Satır 47-65 (`createApi`):** Cache (Önbellek) Tag'leri burada tanımlanır. Örneğin `["Conversation"]` tag'i, bir mesaj güncellendiğinde tüm inbox'ın kendini yenilemesini tetikler.
  * **Satır 67-410 (Endpoint'ler):** Tüm CRUD (Create, Read, Update, Delete) operasyonları burada tanımlanır.
    * `useGetConversationsQuery` (Satır 119): Tüm mesajları çeker.
    * `useCreateMessageMutation` (Satır 152): Inbox'a yeni mesaj ekler.
    * `useUpdateConversationMutation` (Satır 137): Ticket'ın statüsünü (Çözüldü/Beklemede) günceller.
* **Service Dosyası (`src/services/service.js`)**
  * **Satır 27-46 (`getActiveUser`):** İstek atılmadan önce localStorage'daki auth objesini (Token/Rol mantığı) API'ye dahil etmek için çeker.
  * **Satır 63-149:** Saf Fetch API/Axios metodlarını yöneterek json-server'a iletir.

---

## 3. Güvenlik, Rota ve Ana Yapı (Routing) 🛡️

Kullanıcıların yetkilerine göre sayfaları görmesi veya engellenmesi `App.jsx` dosyasında gerçekleşir.

* **Ana Rota Tanımlamaları (`src/App.jsx`)**
  * **Satır 21-42 (`RoleRoute` Bileşeni):** Bu bileşen sayfalara giren kişilerin rolünü kontrol eder. Eğer rol uygun değilse kullanıcıyı yetkisiz giriş sayfasına veya `/support` (Müşteri ekranına) atar.
  * **Satır 116-200 (`App` Fonksiyonu):** Redux `useSelector` ile login olan kullanıcıyı çeker ve tüm rotaları `Routes` ile tanımlar. Örneğin `/dashboard` sayfasına sadece yöneticilerin girebilmesini ayarlar.
* **Yetki Sabitleri (`src/constants/permissions.js` & `navigation.js`)**
  * Bu iki dosya uygulamanın anayasasıdır. Hangi rolün hangi butonu görebileceğini (Örn: Sadece yöneticiler bilet silebilir) burada tanımlı objelerden çekeriz.

---

## 4. Uygulama İçi Modüller (Features) 📦

Proje `src/features/` dizini altında modüler (Feature-Based) şekilde ayrılmıştır.

### 4.1. Yapay Zeka Stüdyosu (AI Agent Studio)
Burada şirketlerin kendi chatbotlarını eğittikleri kontrol paneli vardır.
* **Sayfa:** `src/features/ai-agent-studio/pages/AiAgentStudioPage.jsx` (Satır 22) -> Arayüz ve layout'un çizildiği yer.
* **Mantık:** `src/features/ai-agent-studio/hooks/useAiAgentStudio.js` (Satır 16) -> Botun ayarlarının (System Prompt, Karşılama Mesajı vb.) State'de tutulup kaydedilmesi.

### 4.2. Gelen Kutusu (Inbox) ve Ticket Arayüzü
Tüm sistemin kalbi burasıdır.
* **Veri Getirme:** `src/features/inbox/hooks/useInbox.js` (Satır 16) -> API'den polling (3 saniyede bir tetikleme) yaparak canlı mesajları alır. `roleFilteredDbConversations` (Satır 51) ile sadece temsilcinin yetkisi olan tenant (şirket) mesajlarını filtreler.
* **Ana Sayfa:** `src/features/inbox/pages/InboxPage.jsx` (Satır 18) -> 3 sütunlu yapının ana sarmalayıcısıdır.
* **Mesaj İpliği (Thread):** `src/features/inbox/components/ConversationThread.jsx` (Satır 21) -> Ortadaki mesajlaşma sütunudur. Gelen mesajları mapleyerek `MessageBubble.jsx` bileşenine aktarır.
* **Yazı Kutusu:** `src/features/inbox/components/MessageComposer.jsx` (Satır 13) -> Metin giriş alanı. Mesajlar buradan yazılıp `onSend` fonksiyonu ile hook'a gönderilir.
* **AI Önerileri:** `src/features/inbox/components/AiSuggestions.jsx` (Satır 8) -> Kompozerin hemen üstünde yer alan akıllı yanıt önerileridir.
* **Müşteri Yan Paneli:** `src/features/inbox/components/CustomerPanel.jsx` (Satır 43) -> Müşterinin profili, yapay zeka özeti ve sarı notların olduğu sağ sütundur.

### 4.3. Dashboard (Özet Grafik Paneli)
* **Veri İşleme:** `src/features/dashboard/hooks/useDashboardData.js` (Satır 8) -> Sisteme düşen tüm ticketları tarihlere veya departmanlara göre reduce/map fonksiyonları ile matematikten geçirip chart verisi hazırlar.
* **Arayüz:** `src/features/dashboard/pages/PlatformAdminDashboard.jsx` (Satır 24) -> Recharts kütüphanesini kullanarak verileri grafik (`CategoryBarChart.jsx`, `TrendChart.jsx` vb.) olarak render eder.

### 4.4. Müşteri (CRM) Listesi
* **Liste Sayfası:** `src/features/contacts/pages/ContactsPage.jsx` (Satır 22) -> Müşteri tablosunu render eder. Yeni Müşteri ekleme modalını (popup) yönetir.
* **Tablo (DataGrid):** `src/features/contacts/components/ContactsTable.jsx` (Satır 23) -> Müşterilerin gösterildiği tablo ve sayfalama (pagination) kodlarını barındırır.

### 4.5. Son Kullanıcı Portalı (Support / Ticket Açma)
Platformu satın alan firmanın "Müşterisi" bu paneli görür.
* **Arayüz:** `src/features/support/pages/SupportPage.jsx` (Satır 18) -> "Bize Ulaşın" formunun olduğu yer. Müşteri formu doldurur ve gönderir.
* **Gönderme Mantığı:** `src/features/support/hooks/useSupport.js` (Satır 9) -> Form submit olduğunda `createConversation` (API) çağrılarak JSON Server'da yeni bir ticket oluşturur. Anında Inbox'a yansır.

### 4.6. Takım Yönetimi (Team Queues)
* **Sayfa:** `src/features/team-queues/pages/TeamQueuesPage.jsx` (Satır 24) -> Uygulamayı kullanan çalışanların listesi. Roller, departman atamaları burada listelenir.

### 4.7. Raporlar (Reports) ve PDF İndirme
* **Arayüz:** `src/features/reports/pages/ReportsPage.jsx` (Satır 29) -> Detaylı tablo bazlı istatistikler.
* **PDF İhracı:** Sayfadaki tablolar `html2pdf.js` kütüphanesi sayesinde ekranın fotoğrafını çekip PDF belgesi üretebilecek fonksiyona sahiptir.

---

## 5. Paylaşımlı UI Bileşenleri (Shared Components) 🧩

Projede tekrar kullanılabilir arayüz elementleri `src/shared/components/ui/` dizininde bulunur. Hepsi TailwindCSS ile tamamen duyarlı ve erişilebilir şekilde kodlanmıştır.

* `Avatar.jsx` -> Müşterilerin profil fotoğrafları veya baş harflerini (Örn: "GK") yuvarlak gösterir.
* `Badge.jsx` -> Ticket statülerinde ("Açık", "Beklemede") kullanılan renkli etiketlerdir.
* `EmptyState.jsx` -> Veri bulunmadığında gösterilen boş kutu (İkon + "Veri yok" yazısı) tasarımlarıdır.
* `Toggle.jsx` -> Ayarlardaki aç-kapa düğmeleri.
* Diğerleri: `Input.jsx`, `Select.jsx`, `Textarea.jsx`, `PeriodFilter.jsx`...

---

## 6. Widget ve Dışa Aktarım Mekanizmaları 🌍

ConneXion-AI sadece kendi paneli olan kapalı bir sistem değil, dış platformlara takılabilen bir SaaS yapısıdır.

* **Widget Kodları:** `src/components/widget/EmbedChatWidget.jsx` (Satır 58) -> Başka bir websitesinin sağ alt köşesine eklenebilecek pembe/mavi yuvarlak chat ikonu ve içerisindeki sohbet ekranının kodlarıdır.
* **Widget Injection Hook:** `useConneXionAI.js` -> Başka bir react uygulamasında çalıştırıldığında `public/widget.js` dosyasını çekip uygulamanın body kısmına appendChild (ekleme) yapar. Bu sayede platform tamamen dışarıyla entegre hale gelir.

---

## Özet Olarak Akış (Bir Verinin Yaşam Döngüsü)

1. Bir Müşteri **Widget** veya **SupportPage** üzerinden mesaj yazar.
2. Yazdığı mesaj `api.js`'deki **Mutation** ile JSON Server'a (`db.json`) post edilir.
3. Bu esnada `useInbox.js` dosyasındaki **Polling** mekanizması saniyesinde yeni mesajı algılar ve State'i günceller.
4. Gelen Kutusu (`InboxPage`) anında render olur ve yeni mesaj **ConversationThread**'de belirir.
5. Yapay zeka (`useInbox.js` içi algoritma) mesajı inceler ve **AiSuggestions** bileşenine 3 adet otomatik yanıt tavsiyesi basar.
6. Temsilci bu tavsiyelerden birine tıklar, mesaj JSON Server'a post edilir ve müşteri anında cevabı görür.
7. Bu işlemler bittiğinde **Dashboard** hook'u tüm veriyi tekrar reduce edip metrik grafiğine 1 yeni çözülmüş ticket yansıtır.

*Her dosya sadece kendi alanından (Single Responsibility) sorumludur ve sistem mükemmel bir dişli gibi birbirine bağlıdır.*

