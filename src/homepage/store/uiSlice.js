import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activePage: 'home',
  pricingBillingPeriod: 'monthly',
  selectedServiceId: null,
  demoModalOpen: false,
  demoModalService: null,
  floatingChatOpen: false,
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
  },
});

export const {
  setActivePage,
  setPricingBillingPeriod,
  setSelectedServiceId,
  setDemoModal,
  toggleFloatingChat,
  setFloatingChatOpen,
} = uiSlice.actions;

export default uiSlice.reducer;
