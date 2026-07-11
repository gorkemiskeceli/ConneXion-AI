import { createSlice } from '@reduxjs/toolkit';

const getInitialTickets = () => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem('connexion_support_tickets');
    if (saved) return JSON.parse(saved);
  } catch {}
  
  // Default pre-seeded tickets with nested initial message arrays showing sender role separation
  return [
    {
      id: "TKT-2804",
      customer: "Defne Yılmaz (Acme Corp)",
      subject: "API Kimlik Doğrulama Hatası (401 Unauthorized)",
      status: "open",
      priority: "high",
      category: "Integration",
      date: "10.07.2026",
      lastMessage: "İstemci SDK başlatılırken geçersiz JWT imza hatası alıyoruz.",
      messages: [
        {
          id: "msg-2804-init",
          sender: "customer",
          text: "İstemci SDK başlatılırken geçersiz JWT imza hatası alıyoruz.",
          timestamp: "10.07.2026 10:00",
        },
        {
          id: "msg-2804-auto",
          sender: "agent",
          text: "Destek talebiniz başarıyla oluşturulmuştur. Destek ekibimiz en kısa sürede inceleyip dönüş sağlayacaktır.",
          timestamp: "10.07.2026 10:01",
        }
      ]
    },
    {
      id: "TKT-2799",
      customer: "Burak Kaya (TrendSoft)",
      subject: "E-posta Bildirim Gecikmeleri",
      status: "pending",
      priority: "medium",
      category: "Notifications",
      date: "09.07.2026",
      lastMessage: "Kullanıcı atama e-postaları 15 dakikaya varan gecikmelerle iletiliyor.",
      messages: [
        {
          id: "msg-2799-init",
          sender: "customer",
          text: "Kullanıcı atama e-postaları 15 dakikaya varan gecikmelerle iletiliyor.",
          timestamp: "09.07.2026 11:15",
        },
        {
          id: "msg-2799-auto",
          sender: "agent",
          text: "Destek talebiniz başarıyla oluşturulmuştur. Destek ekibimiz en kısa sürede inceleyip dönüş sağlayacaktır.",
          timestamp: "09.07.2026 11:16",
        }
      ]
    },
    {
      id: "TKT-2715",
      customer: "Selin Demir (Apex Retail)",
      subject: "Logo Yükleme Boyut Sınırı Artırımı",
      status: "resolved",
      priority: "low",
      category: "Branding",
      date: "05.07.2026",
      lastMessage: "Dosya limiti 5MB seviyesine yükseltildi, sorun çözüldü.",
      messages: [
        {
          id: "msg-2715-init",
          sender: "customer",
          text: "Dosya limiti 5MB seviyesine yükseltildi, sorun çözüldü.",
          timestamp: "05.07.2026 14:30",
        },
        {
          id: "msg-2715-auto",
          sender: "agent",
          text: "Destek talebiniz başarıyla oluşturulmuştur. Destek ekibimiz en kısa sürede inceleyip dönüş sağlayacaktır.",
          timestamp: "05.07.2026 14:31",
        }
      ]
    },
    {
      id: "TKT-2699",
      customer: "Kaan Arslan (MedTech)",
      subject: "HIPAA Uyumlu Veri Maskeleme Hatası",
      status: "open",
      priority: "high",
      category: "Security",
      date: "03.07.2026",
      lastMessage: "TCKN bilgileri bazı rapor özetlerinde maskelenmeden görünüyor.",
      messages: [
        {
          id: "msg-2699-init",
          sender: "customer",
          text: "TCKN bilgileri bazı rapor özetlerinde maskelenmeden görünüyor.",
          timestamp: "03.07.2026 09:40",
        },
        {
          id: "msg-2699-auto",
          sender: "agent",
          text: "Destek talebiniz başarıyla oluşturulmuştur. Destek ekibimiz en kısa sürede inceleyip dönüş sağlayacaktır.",
          timestamp: "03.07.2026 09:41",
        }
      ]
    },
  ];
};

const initialState = {
  tickets: getInitialTickets(),
};

export const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    addTicket: (state, action) => {
      const ticketId = action.payload.id;
      const dateStr = action.payload.date;
      const ticket = {
        ...action.payload,
        messages: [
          {
            id: `msg-${ticketId}-init`,
            sender: "customer",
            text: action.payload.lastMessage,
            timestamp: `${dateStr} 10:00`,
          },
          {
            id: `msg-${ticketId}-auto`,
            sender: "agent",
            text: "Destek talebiniz başarıyla oluşturulmuştur. Destek ekibimiz en kısa sürede inceleyip dönüş sağlayacaktır.",
            timestamp: `${dateStr} 10:01`,
          }
        ],
      };
      state.tickets.unshift(ticket);
      try {
        localStorage.setItem('connexion_support_tickets', JSON.stringify(state.tickets));
      } catch {}
    },
    updateTicketStatus: (state, action) => {
      const ticket = state.tickets.find((t) => t.id === action.payload.id);
      if (ticket) {
        ticket.status = action.payload.status;
        try {
          localStorage.setItem('connexion_support_tickets', JSON.stringify(state.tickets));
        } catch {}
      }
    },
    addMessageToTicket: (state, action) => {
      const { ticketId, text, sender } = action.payload;
      const ticket = state.tickets.find((t) => t.id === ticketId);
      if (ticket) {
        if (!ticket.messages) {
          ticket.messages = [
            {
              id: `msg-${ticket.id}-init`,
              sender: "customer",
              text: ticket.lastMessage,
              timestamp: `${ticket.date} 10:00`,
            }
          ];
        }
        ticket.messages.push({
          id: `msg-${ticketId}-${Date.now()}`,
          sender: sender || "agent",
          text: text,
          timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
        });
        ticket.lastMessage = text;
        try {
          localStorage.setItem('connexion_support_tickets', JSON.stringify(state.tickets));
        } catch {}
      }
    }
  }
});

export const { addTicket, updateTicketStatus, addMessageToTicket } = supportSlice.actions;
export default supportSlice.reducer;
