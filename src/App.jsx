import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { 
  Home, 
  Newspaper, 
  BookOpen, 
  Search, 
  Settings, 
  User,
  Shield,
  Calendar,
  TrendingUp,
  FileText,
  Star,
  Wifi
} from 'lucide-react'
import './App.css'

// 組件
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import NewsCenter from './components/NewsCenter'
import Notes from './components/Notes'
import StockSearch from './components/StockSearch'
import Profile from './components/Profile'
import AdminPanel from './components/AdminPanel'
import ApiTest from './components/ApiTest'

function App() {
  const [currentUser, setCurrentUser] = useState({
    username: '測試用戶',
    isAdmin: true,
    isLoggedIn: true
  })

  const sidebarItems = [
    { id: 'dashboard', label: '首頁概覽', icon: Home, path: '/' },
    { id: 'news', label: '新聞中心', icon: Newspaper, path: '/news' },
    { id: 'notes', label: '關鍵筆記', icon: BookOpen, path: '/notes' },
    { id: 'search', label: '股票搜索', icon: Search, path: '/search' },
    { id: 'apitest', label: 'API測試', icon: Wifi, path: '/api-test' },
    { id: 'profile', label: '個人設定', icon: Settings, path: '/profile' },
    { id: 'account', label: '個人帳號', icon: User, path: '/account' }
  ]

  return (
    <Router>
      <div className="min-h-screen bg-background gradient-bg">
        <div className="flex">
          {/* 側邊欄 */}
          <Sidebar items={sidebarItems} />
          
          {/* 主內容區域 */}
          <div className="flex-1 ml-64">
            {/* 頂部導航 */}
            <Header user={currentUser} />
            
            {/* 頁面內容 */}
            <main className="p-6">
              <Routes>
                <Route path="/" element={<Dashboard user={currentUser} />} />
                <Route path="/news" element={<NewsCenter />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/search" element={<StockSearch />} />
                <Route path="/api-test" element={<ApiTest />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/account" element={<Profile />} />
                {currentUser.isAdmin && (
                  <Route path="/admin" element={<AdminPanel />} />
                )}
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App

