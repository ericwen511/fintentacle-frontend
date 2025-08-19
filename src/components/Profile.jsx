import { Settings } from 'lucide-react'

const Profile = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Settings className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">個人設定</h1>
      </div>
      
      <div className="tech-card p-8 text-center">
        <Settings className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">個人設定開發中</h3>
        <p className="text-muted-foreground">
          這裡將提供個人資料管理和系統設定功能
        </p>
      </div>
    </div>
  )
}

export default Profile

