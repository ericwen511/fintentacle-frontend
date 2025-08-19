import { useState, useEffect } from 'react'
import { Shield, User, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const AdminPanel = () => {
  const [users, setUsers] = useState([
    { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin' },
    { id: 2, username: 'user1', email: 'user1@example.com', role: 'user' },
    { id: 3, username: 'user2', email: 'user2@example.com', role: 'user' },
  ])
  const [editingUser, setEditingUser] = useState(null)
  const [newUsername, setNewUsername] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newRole, setNewRole] = useState('user')

  const handleEditUser = (user) => {
    setEditingUser(user)
    setNewUsername(user.username)
    setNewEmail(user.email)
    setNewRole(user.role)
  }

  const handleUpdateUser = () => {
    if (editingUser && newUsername.trim() && newEmail.trim()) {
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, username: newUsername, email: newEmail, role: newRole } 
          : user
      ))
      setEditingUser(null)
      setNewUsername('')
      setNewEmail('')
      setNewRole('user')
    }
  }

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Shield className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">管理員面板</h1>
      </div>
      
      <div className="tech-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">用戶管理</h2>
        <div className="space-y-4">
          {users.map(user => (
            <div key={user.id} className="tech-card p-4 flex items-center justify-between hover-glow">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-primary mb-1">{user.username}</h3>
                <p className="text-muted-foreground text-sm">{user.email} | 角色: {user.role}</p>
              </div>
              <div className="flex space-x-2 ml-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground hover:text-primary"
                  onClick={() => handleEditUser(user)}
                >
                  <Edit className="w-4 h-4 mr-1" /> 編輯
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> 刪除
                </Button>
              </div>
            </div>
          ))}
        </div>

        {editingUser && (
          <div className="tech-card p-6 mt-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">編輯用戶: {editingUser.username}</h2>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="用戶名"
                className="tech-input"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <Input
                type="email"
                placeholder="電子郵件"
                className="tech-input"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger className="tech-input w-full">
                  <SelectValue placeholder="選擇角色" />
                </SelectTrigger>
                <SelectContent className="tech-card">
                  <SelectItem value="admin">管理員</SelectItem>
                  <SelectItem value="user">普通用戶</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex space-x-2">
                <Button className="tech-button" onClick={handleUpdateUser}>
                  <CheckCircle className="w-5 h-5 mr-2" /> 更新用戶
                </Button>
                <Button variant="outline" className="tech-button-secondary" onClick={() => setEditingUser(null)}>
                  <XCircle className="w-5 h-5 mr-2" /> 取消
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel

