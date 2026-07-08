import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  floatingMessages: [
    {
      id: 'f1',
      sender: 'assistant',
      text: 'Merhaba! SaaSPrecise Canlı Destek ekibine hoş geldiniz. Size nasıl yardımcı olabilirim?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ],
  floatingLoading: false,
  playgroundMessages: [
    {
      id: 'p1',
      sender: 'assistant',
      text: 'Merhaba! Ben Precise AI Assistant. Sektörel bilgi tabanım ve anlık veri entegrasyonumla donatıldım. Finansal veri analizi, hukuki belge inceleme veya sağlık raporu kategorizasyonu konularında beni test edebilirsiniz.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ],
  playgroundLoading: false,
  playgroundLatency: 42,
  engineStatus: 'optimal',
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addFloatingMessage: (state, action) => {
      state.floatingMessages.push(action.payload);
    },
    setFloatingLoading: (state, action) => {
      state.floatingLoading = action.payload;
    },
    addPlaygroundMessage: (state, action) => {
      state.playgroundMessages.push(action.payload);
    },
    setPlaygroundLoading: (state, action) => {
      state.playgroundLoading = action.payload;
    },
    setPlaygroundLatency: (state, action) => {
      state.playgroundLatency = action.payload;
    },
    setEngineStatus: (state, action) => {
      state.engineStatus = action.payload;
    },
    clearPlaygroundChat: (state) => {
      state.playgroundMessages = [initialState.playgroundMessages[0]];
    },
  },
});

export const {
  addFloatingMessage,
  setFloatingLoading,
  addPlaygroundMessage,
  setPlaygroundLoading,
  setPlaygroundLatency,
  setEngineStatus,
  clearPlaygroundChat,
} = chatSlice.actions;

export default chatSlice.reducer;
