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
    { id: 'usr_001', name: 'Ahmet Yılmaz', email: 'ahmet@sirketiniz.com', password: 'password123', role: 'admin', tenantId: 'tnt_admin' },
    { id: 'usr_002', name: 'Platform Admini', email: 'admin@saasprecise.com', password: 'admin123', role: 'admin', tenantId: 'tnt_admin' },
    { id: 'usr_003', name: 'İşletme Admini', email: 'isletme@saasprecise.com', password: 'isletme123', role: 'admin', tenantId: 'tnt_admin' },
    { id: 'usr_004', name: 'Müşteri Temsilcisi Yöneticisi', email: 'yonetici@saasprecise.com', password: 'yonetici123', role: 'user', tenantId: 'tnt_standard' },
    { id: 'usr_005', name: 'Müşteri Temsilcisi', email: 'temsilci@saasprecise.com', password: 'temsilci123', role: 'user', tenantId: 'tnt_standard' }
  ];

  let modified = false;
  demoUsers.forEach(demoUser => {
    const index = users.findIndex(u => u.email.toLowerCase() === demoUser.email.toLowerCase());
    if (index === -1) {
      users.push(demoUser);
      modified = true;
    } else {
      // Ensure existing demo users have the correct role and tenant mapping
      if (users[index].role !== demoUser.role || !users[index].tenantId || !users[index].id) {
        users[index].id = demoUser.id;
        users[index].role = demoUser.role;
        users[index].tenantId = demoUser.tenantId;
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
        state.user = { 
          id: found.id || `usr_${Math.random().toString(36).substr(2, 9)}`,
          name: found.name, 
          email: found.email, 
          role: found.role || 'user',
          tenantId: found.tenantId || 'tnt_standard'
        };
        state.loginModalOpen = false;
        state.authError = null;
        setSafeLocalItem('saasprecise_user', JSON.stringify(state.user));
        setSafeLocalItem('saasprecise_active_role', state.user.role);
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
        const id = `usr_${Math.random().toString(36).substr(2, 9)}`;
        const tenantId = `tnt_${Math.random().toString(36).substr(2, 9)}`;
        const newUser = { id, name, email, password, role: 'user', tenantId };
        state.registeredUsers.push(newUser);
        state.user = { id, name, email, role: 'user', tenantId };
        state.registerModalOpen = false;
        state.authError = null;
        setSafeLocalItem('saasprecise_registered_users', JSON.stringify(state.registeredUsers));
        setSafeLocalItem('saasprecise_user', JSON.stringify(state.user));
        setSafeLocalItem('saasprecise_active_role', 'user');
      }
    },
    updateUserProfile: (state, action) => {
      const { name, email, password } = action.payload;
      if (state.user) {
        if (name) state.user.name = name;
        if (email) state.user.email = email;
        setSafeLocalItem('saasprecise_user', JSON.stringify(state.user));
        
        const idx = state.registeredUsers.findIndex(
          (u) => u.id === state.user.id || u.email.toLowerCase() === state.user.email.toLowerCase()
        );
        if (idx !== -1) {
          if (name) state.registeredUsers[idx].name = name;
          if (email) state.registeredUsers[idx].email = email;
          if (password) state.registeredUsers[idx].password = password;
          setSafeLocalItem('saasprecise_registered_users', JSON.stringify(state.registeredUsers));
        }
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
  updateUserProfile,
} = authSlice.actions;

export default authSlice.reducer;
