import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Octagon } from 'lucide-react'

const Sidebar = ({ items }) => {
  const location = useLocation()
  const [hoveredItem, setHoveredItem] = useState(null)

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-50">
      {/* Logo區域 */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Octagon className="w-8 h-8 text-primary" />
            <div className="absolute inset-0 w-8 h-8 text-primary opacity-50 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">
              金融八爪魚
            </h1>
            <p className="text-sm text-muted-foreground">FinTentacle</p>
          </div>
        </div>
      </div>

      {/* 導航菜單 */}
      <nav className="p-4 space-y-2">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          const isHovered = hoveredItem === item.id

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`
                flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300
                ${isActive 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground border border-primary/20 neon-glow' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }
                ${isHovered ? 'transform translate-x-1' : ''}
              `}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Icon 
                className={`w-5 h-5 transition-colors duration-300 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`} 
              />
              <span className="font-medium">{item.label}</span>
              
              {/* 活動指示器 */}
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-primary rounded-full pulse-glow" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* 底部裝飾 */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            © 2025 FinTentacle
          </p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

