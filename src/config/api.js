// API配置文件內容
const API_CONFIG = {
  // 生產環境的後端URL
  BASE_URL: 'https://fintentacle-backend-production.up.railway.app',
  
  // API端點
  ENDPOINTS: {
    // 認證相關
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      LOGOUT: '/api/auth/logout'
    },
    
    // 筆記管理
    NOTES: {
      LIST: '/api/notes',
      CREATE: '/api/notes',
      UPDATE: '/api/notes',
      DELETE: '/api/notes',
      SEARCH: '/api/notes/search'
    },
    
    // 新聞書籤
    NEWS: {
      SEARCH: '/api/news/search',
      BOOKMARKS: '/api/news/bookmarks'
    },
    
    // 用戶管理
    USERS: {
      PROFILE: '/api/users/profile',
      UPDATE: '/api/users/profile'
    },
    
    // 管理員功能
    ADMIN: {
      USERS: '/api/admin/users',
      STATS: '/api/admin/stats'
    }
  }
};

// 創建完整的API URL
export const createApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// 導出配置
export default API_CONFIG;


