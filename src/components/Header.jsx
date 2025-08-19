import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  Shield,
  Calendar,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const Header = ({ user }) => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  // 獲取當前日期和時間
  const getCurrentDateTime = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const date = now.getDate()
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    const weekday = weekdays[now.getDay()]
    
    return `${year}年${month}月${date}日 ${weekday}`
  }

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      {/* 左側：歡迎信息 */}
      <div className="flex items-center space-x-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            歡迎 {user.username} 回來
          </h2>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{getCurrentDateTime()}</span>
          </div>
        </div>
        
        {/* 管理員按鈕 */}
        {user.isAdmin && (
          <Link to="/admin">
            <Button 
              variant="outline" 
              size="sm" 
              className="tech-button-secondary hover-glow"
            >
              <Shield className="w-4 h-4 mr-2" />
              管理員
            </Button>
          </Link>
        )}
      </div>

      {/* 右側：用戶操作 */}
      <div className="flex items-center space-x-4">
        {/* 通知 */}
        <Button 
          variant="ghost" 
          size="sm"
          className="relative hover-glow"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center">
            3
          </span>
        </Button>

        {/* 用戶菜單 */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 hover-glow"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-medium">{user.username}</span>
          </Button>

          {/* 下拉菜單 */}
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-50 tech-card">
              <div className="p-2">
                <Link 
                  to="/profile"
                  className="flex items-center space-x-2 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => setShowUserMenu(false)}
                >
                  <Settings className="w-4 h-4" />
                  <span>個人設定</span>
                </Link>
                
                <Link 
                  to="/account"
                  className="flex items-center space-x-2 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => setShowUserMenu(false)}
                >
                  <User className="w-4 h-4" />
                  <span>帳號管理</span>
                </Link>
                
                <hr className="my-2 border-border" />
                
                <button 
                  className="flex items-center space-x-2 px-3 py-2 text-sm rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors w-full text-left"
                  onClick={() => {
                    setShowUserMenu(false)
                    // 處理登出邏輯
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  <span>登出</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

