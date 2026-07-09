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
  let users = [];
  if (stored) {
    try {
      users = JSON.parse(stored);
    } catch {
      users = [];
    }
  }
  
  // Seed default users for testing convenience
  const demoUsers = [
    { name: 'Ahmet Yılmaz', email: 'ahmet@sirketiniz.com', password: 'password123', role: 'platform_admin' },
    { name: 'Platform Admini', email: 'admin@saasprecise.com', password: 'admin123', role: 'platform_admin' },
    { name: 'İşletme Admini', email: 'isletme@saasprecise.com', password: 'isletme123', role: 'workspace_admin' },
    { name: 'Müşteri Temsilcisi Yöneticisi', email: 'yonetici@saasprecise.com', password: 'yonetici123', role: 'manager' },
    { name: 'Müşteri Temsilcisi', email: 'temsilci@saasprecise.com', password: 'temsilci123', role: 'support_agent' }
  ];

  let modified = false;
  demoUsers.forEach(demoUser => {
    const exists = users.some(u => u.email.toLowerCase() === demoUser.email.toLowerCase());
    if (!exists) {
      users.push(demoUser);
      modified = true;
    } else {
      // Ensure existing demo users have the correct role mapped
      const index = users.findIndex(u => u.email.toLowerCase() === demoUser.email.toLowerCase());
      if (index !== -1 && !users[index].role) {
        users[index].role = demoUser.role;
        modified = true;
      }
    }
  });

  if (modified || !stored) {
    setSafeLocalItem('saasprecise_registered_users', JSON.stringify(users));
  }
  return users;
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
        state.user = { name: found.name, email: found.email, role: found.role || 'support_agent' };
        state.loginModalOpen = false;
        state.authError = null;
        setSafeLocalItem('saasprecise_user', JSON.stringify(state.user));
        if (found.role) {
          setSafeLocalItem('saasprecise_active_role', found.role);
        }
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
        const newUser = { name, email, password, role: 'support_agent' };
        state.registeredUsers.push(newUser);
        state.user = { name, email, role: 'support_agent' };
        state.registerModalOpen = false;
        state.authError = null;
        setSafeLocalItem('saasprecise_registered_users', JSON.stringify(state.registeredUsers));
        setSafeLocalItem('saasprecise_user', JSON.stringify(state.user));
        setSafeLocalItem('saasprecise_active_role', 'support_agent');
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
