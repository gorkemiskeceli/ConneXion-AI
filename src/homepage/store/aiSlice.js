import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { callHuggingFaceAI } from '../../services/aiService';

export const sendMessageToAI = createAsyncThunk(
  'ai/sendMessage',
  async ({ systemPrompt, userMessage, isBlocked }, { rejectWithValue }) => {
    if (isBlocked) {
      return "Üzgünüm, bu konuda yardımcı olamıyorum. Belirttiğiniz ifadeler asistan politikalarımıza uygun değildir.";
    }
    const result = await callHuggingFaceAI(systemPrompt, userMessage);
    if (result.error) {
      return rejectWithValue(result.error);
    }
    return result.content;
  }
);

const initialState = {
  messages: [
    {
      id: 'ai-init',
      sender: 'assistant',
      text: 'Merhaba! ConneXion-AI Destek asistanına hoş geldiniz. Size bugün nasıl yardımcı olabilirim?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ],
  loading: false,
  error: null
};

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    clearChat: (state) => {
      // Keep only initial greeting message when clearing
      state.messages = [initialState.messages[0]];
      state.error = null;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageToAI.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        // Append user message immediately
        state.messages.push({
          id: `${Date.now()}-user`,
          sender: 'user',
          text: action.meta.arg.userMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      })
      .addCase(sendMessageToAI.fulfilled, (state, action) => {
        state.loading = false;
        // Append assistant response
        state.messages.push({
          id: `${Date.now()}-ai`,
          sender: 'assistant',
          text: action.payload,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      })
      .addCase(sendMessageToAI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Bilinmeyen bir bağlantı hatası oluştu.';
      });
  }
});

export const { clearChat, clearError } = aiSlice.actions;
export default aiSlice.reducer;
