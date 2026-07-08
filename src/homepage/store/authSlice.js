import { createSlice } from '@reduxjs/toolkit';

// Helper to safely load from localStorage
const getSafeLocalItem = (key) => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const setSafeLocalItem = (key, value) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // ignore
  }
};

const getInitialUser = () => {
  const stored = getSafeLocalItem('saasprecise_user');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
};

const getInitialRegisteredUsers = () => {
  const stored = getSafeLocalItem('saasprecise_registered_users');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  // Seed a default user for testing convenience
  const defaultUsers = [
    { name: 'Ahmet Yılmaz', email: 'ahmet@sirketiniz.com', password: 'password123' }
  ];
  setSafeLocalItem('saasprecise_registered_users', JSON.stringify(defaultUsers));
  return defaultUsers;
};

const initialState = {
  user: getInitialUser(),
  registeredUsers: getInitialRegisteredUsers(),
  loginModalOpen: false,
  registerModalOpen: false,
  authError: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginModalOpen: (state, action) => {
      state.loginModalOpen = action.payload;
      if (action.payload) {
        state.registerModalOpen = false;
        state.authError = null;
      }
    },
    setRegisterModalOpen: (state, action) => {
      state.registerModalOpen = action.payload;
      if (action.payload) {
        state.loginModalOpen = false;
        state.authError = null;
      }
    },
    loginUser: (state, action) => {
      const { email, password } = action.payload;
      const found = state.registeredUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (found) {
        state.user = { name: found.name, email: found.email };
        state.loginModalOpen = false;
        state.authError = null;
        setSafeLocalItem('saasprecise_user', JSON.stringify(state.user));
      } else {
        state.authError = 'E-posta adresi veya şifre hatalı.';
      }
    },
    registerUser: (state, action) => {
      const { name, email, password } = action.payload;
      const exists = state.registeredUsers.some(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (exists) {
        state.authError = 'Bu e-posta adresi zaten kayıtlı.';
      } else {
        const newUser = { name, email, password };
        state.registeredUsers.push(newUser);
        state.user = { name, email };
        state.registerModalOpen = false;
        state.authError = null;
        setSafeLocalItem('saasprecise_registered_users', JSON.stringify(state.registeredUsers));
        setSafeLocalItem('saasprecise_user', JSON.stringify(state.user));
      }
    },
    logoutUser: (state) => {
      state.user = null;
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('saasprecise_user');
        } catch {}
      }
    },
    clearAuthError: (state) => {
      state.authError = null;
    }
  }
});

export const {
  setLoginModalOpen,
  setRegisterModalOpen,
  loginUser,
  registerUser,
  logoutUser,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;
