import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Simple mock API middleware for /api/chat
const mockChatApiPlugin = () => ({
  name: 'mock-chat-api',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // Handle /api/chat POST requests
      if (req.url === '/api/chat' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });
        req.on('end', () => {
          try {
            const replies = [
              "SaaSPrecise platformu hakkında sorduğunuz için teşekkürler! Sorunuzu analiz ediyorum ve size en doğru yanıtı hazırlıyorum.",
              "SaaSPrecise, sağlık, hukuk ve finans sektörlerindeki karmaşık iş akışlarını %99.4 doğruluk oranıyla otomatikleştiren yapay zeka modelleri sunar.",
              "Sistemlerimiz şu anda optimal düzeyde çalışıyor. Saniyede 200+ entegrasyonu destekleyen altyapımızla iş süreçlerinizi hızlandırabilirsiniz.",
              "Harika bir soru! Platformumuz AES-256 seviyesinde askeri şifreleme ve SOC 2 Tip II uyumluluğuyla verilerinizi korur.",
              "Destek ekibimizle iletişime geçmek isterseniz 'İletişim' sayfamızdaki formu doldurabilir veya canlı sohbet üzerinden bize yazabilirsiniz."
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              success: true,
              text: randomReply + " [Simüle Edilmiş Yanıt]",
              latency: 150
            }));
          } catch (e) {
            res.statusCode = 400;
            res.end(JSON.stringify({ success: false, error: 'Invalid JSON' }));
          }
        });
      } else {
        next();
      }
    });
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mockChatApiPlugin()],
})
