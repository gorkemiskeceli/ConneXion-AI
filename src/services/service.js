const IS_VERCEL = typeof window !== 'undefined' && 
  (window.location.hostname.includes('vercel.app') || 
   (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'));

let dbPromise = null;

function getActiveUser() {
  if (typeof window === 'undefined') return null;
  try {
    const userStr = localStorage.getItem('saasprecise_user');
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
}

async function getDb() {
  if (typeof window === 'undefined') return {};
  
  const cached = localStorage.getItem('connexion_db');
  if (cached) {
    return JSON.parse(cached);
  }
  
  if (dbPromise) return dbPromise;
  
  dbPromise = (async () => {
    try {
      const response = await fetch('/db.json');
      if (!response.ok) throw new Error('Failed to load db.json');
      const data = await response.json();
      localStorage.setItem('connexion_db', JSON.stringify(data));
      dbPromise = null;
      return data;
    } catch (error) {
      console.error('Error initializing db from Vercel:', error);
      dbPromise = null;
      return {};
    }
  })();
  
  return dbPromise;
}

function saveDb(db) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('connexion_db', JSON.stringify(db));
  }
}

function parseUrl(urlStr) {
  // Remove leading and trailing slashes and normalize
  const cleanUrl = urlStr.replace(/^\/+|\/+$/g, '');
  const [pathPart, queryPart] = cleanUrl.split('?');
  const pathSegments = pathPart.split('/');
  const collection = pathSegments[0];
  const id = pathSegments[1] || null;
  
  const query = {};
  if (queryPart) {
    const params = new URLSearchParams(queryPart);
    for (const [key, value] of params.entries()) {
      query[key] = value;
    }
  }
  
  return { collection, id, query };
}

export const service = {
  get: async (url) => {
    let result;
    if (!IS_VERCEL) {
      const res = await fetch(`http://localhost:3000${url}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      result = await res.json();
    } else {
      const db = await getDb();
      const { collection, id, query } = parseUrl(url);
      
      const data = db[collection];
      if (!data) {
        result = Array.isArray(data) ? [] : {};
      } else if (id) {
        if (Array.isArray(data)) {
          const item = data.find(i => String(i.id) === String(id));
          if (!item) throw new Error(`Item ${id} not found in ${collection}`);
          result = item;
        } else {
          result = data;
        }
      } else if (Array.isArray(data)) {
        let filtered = [...data];
        Object.keys(query).forEach(key => {
          filtered = filtered.filter(item => String(item[key]) === String(query[key]));
        });
        result = filtered;
      } else {
        result = data;
      }
    }
    
    // Apply role-based data isolation
    const currentUser = getActiveUser();
    if (currentUser && currentUser.role !== 'admin') {
      const { collection, id } = parseUrl(url);
      if (collection === 'customers' || collection === 'contacts' || collection === 'conversations' || collection === 'messages') {
        if (id) {
          if (result && result.tenantId !== currentUser.tenantId) {
            return null; // Deny access to other tenant's item
          }
        } else if (Array.isArray(result)) {
          result = result.filter(item => item.tenantId === currentUser.tenantId);
        }
      }
    }
    
    return result;
  },

  post: async (url, body) => {
    const currentUser = getActiveUser();
    const { collection } = parseUrl(url);
    if (currentUser && currentUser.tenantId) {
      if (collection === 'customers' || collection === 'contacts' || collection === 'conversations' || collection === 'messages') {
        body.tenantId = currentUser.tenantId;
      }
    }

    if (!IS_VERCEL) {
      const res = await fetch(`http://localhost:3000${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    }
    
    const db = await getDb();
    
    if (!db[collection]) {
      db[collection] = [];
    }
    
    const collectionData = db[collection];
    if (Array.isArray(collectionData)) {
      const newItem = { ...body };
      if (!newItem.id) {
        newItem.id = `${collection.slice(0, 3)}_${Math.random().toString(36).substr(2, 9)}`;
      }
      collectionData.push(newItem);
      saveDb(db);
      return newItem;
    } else {
      db[collection] = body;
      saveDb(db);
      return body;
    }
  },

  put: async (url, body) => {
    const currentUser = getActiveUser();
    const { collection } = parseUrl(url);
    if (currentUser && currentUser.tenantId) {
      if (collection === 'customers' || collection === 'contacts' || collection === 'conversations' || collection === 'messages') {
        body.tenantId = currentUser.tenantId;
      }
    }

    if (!IS_VERCEL) {
      const res = await fetch(`http://localhost:3000${url}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    }
    
    const db = await getDb();
    const { id } = parseUrl(url);
    
    const collectionData = db[collection];
    if (!collectionData) {
      db[collection] = body;
      saveDb(db);
      return body;
    }
    
    const targetId = id || body.id;
    if (Array.isArray(collectionData)) {
      const idx = collectionData.findIndex(i => String(i.id) === String(targetId));
      if (idx !== -1) {
        collectionData[idx] = { ...collectionData[idx], ...body, id: targetId };
        saveDb(db);
        return collectionData[idx];
      } else {
        const newItem = { ...body, id: targetId };
        collectionData.push(newItem);
        saveDb(db);
        return newItem;
      }
    } else {
      db[collection] = { ...collectionData, ...body };
      saveDb(db);
      return db[collection];
    }
  },

  delete: async (url) => {
    if (!IS_VERCEL) {
      const res = await fetch(`http://localhost:3000${url}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    }
    
    const db = await getDb();
    const { collection, id } = parseUrl(url);
    
    const collectionData = db[collection];
    if (Array.isArray(collectionData) && id) {
      const idx = collectionData.findIndex(i => String(i.id) === String(id));
      if (idx !== -1) {
        const deletedItem = collectionData[idx];
        collectionData.splice(idx, 1);
        saveDb(db);
        return deletedItem;
      }
      throw new Error(`Item ${id} not found in ${collection}`);
    }
    
    return { success: true };
  }
};
