import { useState } from 'react'
import { Search, ExternalLink, Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const StockSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async () => {
    if (!searchTerm.trim()) return

    setLoading(true)
    setError(null)
    setSearchResults([])

    try {
      // 這裡將調用後端API來搜索新聞
      // 暫時使用模擬數據
      const mockData = [
        {
          id: 1,
          title: `關於 ${searchTerm} 的新聞標題 1`,
          source: '模擬新聞社',
          url: 'https://example.com/news1',
          date: '2025-08-17'
        },
        {
          id: 2,
          title: `關於 ${searchTerm} 的新聞標題 2`,
          source: '模擬財經網',
          url: 'https://example.com/news2',
          date: '2025-08-16'
        },
        {
          id: 3,
          title: `關於 ${searchTerm} 的新聞標題 3`,
          source: '模擬投資報',
          url: 'https://example.com/news3',
          date: '2025-08-15'
        },
        {
          id: 4,
          title: `關於 ${searchTerm} 的新聞標題 4`,
          source: '模擬財經網',
          url: 'https://example.com/news4',
          date: '2025-08-14'
        },
        {
          id: 5,
          title: `關於 ${searchTerm} 的新聞標題 5`,
          source: '模擬新聞社',
          url: 'https://example.com/news5',
          date: '2025-08-13'
        }
      ]
      setSearchResults(mockData)
    } catch (err) {
      setError('搜索新聞時發生錯誤。請稍後再試。')
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleBookmark = (newsItem) => {
    console.log('收藏新聞:', newsItem)
    // 這裡將調用後端API來收藏新聞
    alert(`已收藏新聞：${newsItem.title}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Search className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">股票搜索</h1>
      </div>
      
      <div className="tech-card p-6">
        <div className="flex space-x-3">
          <Input
            type="text"
            placeholder="輸入股票代號或公司名稱 (中英文皆可)"
            className="flex-1 tech-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch()
              }
            }}
          />
          <Button 
            className="tech-button"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? '搜索中...' : '搜索新聞'}
          </Button>
        </div>
        {error && <p className="text-destructive mt-2">{error}</p>}

        {searchResults.length > 0 && (
          <div className="mt-6 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">搜索結果 ({searchResults.length} 條新聞)</h2>
            <div className="space-y-3">
              {searchResults.map((news) => (
                <div key={news.id} className="tech-card p-4 flex items-center justify-between hover-glow">
                  <div className="flex-1">
                    <a 
                      href={news.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      {news.title}
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      來源: {news.source} | 日期: {news.date}
                    </p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground hover:text-primary"
                      onClick={() => handleBookmark(news)}
                    >
                      <Bookmark className="w-4 h-4" />
                    </Button>
                    <a 
                      href={news.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {searchResults.length === 0 && !loading && !error && searchTerm.trim() && (
          <div className="mt-6 text-center text-muted-foreground">
            <p>沒有找到相關新聞。</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default StockSearch

