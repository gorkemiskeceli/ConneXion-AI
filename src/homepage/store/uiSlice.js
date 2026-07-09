import { createSlice } from '@reduxjs/toolkit';

const getInitialLogo = () => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem('connexion_custom_logo') || null;
  } catch {
    return null;
  }
};

const initialState = {
  activePage: 'home',
  pricingBillingPeriod: 'monthly',
  selectedServiceId: null,
  demoModalOpen: false,
  demoModalService: null,
  floatingChatOpen: false,
  customLogo: getInitialLogo(),
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    setPricingBillingPeriod: (state, action) => {
      state.pricingBillingPeriod = action.payload;
    },
    setSelectedServiceId: (state, action) => {
      state.selectedServiceId = action.payload;
    },
    setDemoModal: (state, action) => {
      state.demoModalOpen = action.payload.open;
      state.demoModalService = action.payload.service !== undefined ? action.payload.service : null;
    },
    toggleFloatingChat: (state) => {
      state.floatingChatOpen = !state.floatingChatOpen;
    },
    setFloatingChatOpen: (state, action) => {
      state.floatingChatOpen = action.payload;
    },
    setCustomLogo: (state, action) => {
      state.customLogo = action.payload;
      if (typeof window !== 'undefined') {
        try {
          if (action.payload) {
            localStorage.setItem('connexion_custom_logo', action.payload);
          } else {
            localStorage.removeItem('connexion_custom_logo');
          }
        } catch {}
      }
    },
  },
});

export const {
  setActivePage,
  setPricingBillingPeriod,
  setSelectedServiceId,
  setDemoModal,
  toggleFloatingChat,
  setFloatingChatOpen,
  setCustomLogo,
} = uiSlice.actions;

export default uiSlice.reducer;
