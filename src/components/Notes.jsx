import { useState, useEffect } from 'react'
import { BookOpen, Plus, Edit, Trash2, Tag, Search, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const Notes = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: '台積電技術分析', content: '台積電股價突破關鍵阻力位，MACD顯示買入信號。', tags: ['技術分析', '買入'] },
    { id: 2, title: 'AAPL財報前瞻', content: '蘋果公司即將發布財報，預期營收將有顯著成長，關注服務業務表現。', tags: ['財報', '觀察'] },
    { id: 3, title: '半導體產業趨勢', content: '全球半導體產業持續景氣，AI晶片需求旺盛，長期看好。', tags: ['基本面', '機會'] },
  ])
  const [newNoteTitle, setNewNoteTitle] = useState('')
  const [newNoteContent, setNewNoteContent] = useState('')
  const [newNoteTags, setNewNoteTags] = useState('')
  const [editingNote, setEditingNote] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState([])

  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)))

  const handleAddNote = () => {
    if (newNoteTitle.trim() && newNoteContent.trim()) {
      const newNote = {
        id: notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1,
        title: newNoteTitle,
        content: newNoteContent,
        tags: newNoteTags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
      }
      setNotes([...notes, newNote])
      setNewNoteTitle('')
      setNewNoteContent('')
      setNewNoteTags('')
    }
  }

  const handleEditNote = (note) => {
    setEditingNote(note)
    setNewNoteTitle(note.title)
    setNewNoteContent(note.content)
    setNewNoteTags(note.tags.join(', '))
  }

  const handleUpdateNote = () => {
    if (editingNote && newNoteTitle.trim() && newNoteContent.trim()) {
      setNotes(notes.map(note => 
        note.id === editingNote.id 
          ? { ...note, title: newNoteTitle, content: newNoteContent, tags: newNoteTags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') } 
          : note
      ))
      setEditingNote(null)
      setNewNoteTitle('')
      setNewNoteContent('')
      setNewNoteTags('')
    }
  }

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          note.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTags = selectedTags.length === 0 || 
                        selectedTags.every(tag => note.tags.includes(tag))
    return matchesSearch && matchesTags
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <BookOpen className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">關鍵筆記</h1>
      </div>
      
      {/* 筆記搜索和標籤過濾 */}
      <div className="tech-card p-6">
        <div className="flex space-x-3 mb-4">
          <Input
            type="text"
            placeholder="搜索筆記標題或內容..."
            className="flex-1 tech-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="tech-button">
            <Search className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <Button 
              key={tag} 
              variant="outline" 
              size="sm" 
              className={`tech-button-secondary ${selectedTags.includes(tag) ? 'bg-primary text-primary-foreground' : ''}`}
              onClick={() => handleTagClick(tag)}
            >
              <Tag className="w-4 h-4 mr-1" /> {tag}
              {selectedTags.includes(tag) && <XCircle className="w-3 h-3 ml-1" />}
            </Button>
          ))}
        </div>
      </div>

      {/* 新增/編輯筆記 */}
      <div className="tech-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          {editingNote ? '編輯筆記' : '新增筆記'}
        </h2>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="筆記標題"
            className="tech-input"
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
          />
          <Textarea
            placeholder="筆記內容"
            className="tech-input min-h-[120px]"
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
          />
          <Input
            type="text"
            placeholder="標籤 (多個標籤請用逗號分隔, 例如: 科技, 財報)"
            className="tech-input"
            value={newNoteTags}
            onChange={(e) => setNewNoteTags(e.target.value)}
          />
          {editingNote ? (
            <div className="flex space-x-2">
              <Button className="tech-button" onClick={handleUpdateNote}>
                <Edit className="w-5 h-5 mr-2" /> 更新筆記
              </Button>
              <Button variant="outline" className="tech-button-secondary" onClick={() => setEditingNote(null)}>
                取消
              </Button>
            </div>
          ) : (
            <Button className="tech-button" onClick={handleAddNote}>
              <Plus className="w-5 h-5 mr-2" /> 新增筆記
            </Button>
          )}
        </div>
      </div>

      {/* 筆記列表 */}
      <div className="tech-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">我的筆記 ({filteredNotes.length} 則)</h2>
        {filteredNotes.length === 0 && (
          <p className="text-muted-foreground text-center">沒有找到任何筆記。</p>
        )}
        <div className="space-y-4">
          {filteredNotes.map(note => (
            <div key={note.id} className="tech-card p-4 hover-glow">
              <h3 className="text-lg font-medium text-primary mb-2">{note.title}</h3>
              <p className="text-muted-foreground text-sm mb-3">{note.content}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {note.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md">
                    <Tag className="w-3 h-3 inline-block mr-1" />{tag}
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground hover:text-primary"
                  onClick={() => handleEditNote(note)}
                >
                  <Edit className="w-4 h-4 mr-1" /> 編輯
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => handleDeleteNote(note.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> 刪除
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Notes

