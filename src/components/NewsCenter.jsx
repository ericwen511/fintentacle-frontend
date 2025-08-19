import { useState, useEffect } from 'react'
import { Newspaper, Bookmark, Trash2, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

const NewsCenter = () => {
  const [bookmarkedNews, setBookmarkedNews] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBookmarkedNews()
  }, [])

  const fetchBookmarkedNews = async () => {
    setLoading(true)
    setError(null)
    try {
      // 這裡將調用後端API來獲取收藏的新聞
      // 暫時使用模擬數據
      const mockData = [
        {
          id: 101,
          title: '台積電Q4財報超預期，股價創新高',
          source: '經濟日報',
          url: 'https://example.com/news_tsmc',
          date: '2025-08-17'
        },
        {
          id: 102,
          title: 'NVIDIA發布新一代AI晶片，概念股齊漲',
          source: '工商時報',
          url: 'https://example.com/news_nvidia',
          date: '2025-08-16'
        },
        {
          id: 103,
          title: '美股三大指數收紅，科技股表現亮眼',
          source: 'MoneyDJ',
          url: 'https://example.com/news_us_stock',
          date: '2025-08-15'
        }
      ]
      setBookmarkedNews(mockData)
    } catch (err) {
      setError('獲取收藏新聞時發生錯誤。')
      console.error('Fetch bookmarked news error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteBookmark = (id) => {
    console.log('刪除收藏新聞:', id)
    // 這裡將調用後端API來刪除收藏新聞
    setBookmarkedNews(bookmarkedNews.filter(news => news.id !== id))
    alert('已刪除收藏新聞。')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Newspaper className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">新聞中心</h1>
      </div>
      
      <div className="tech-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">我的新聞書籤</h2>
        {loading && <p className="text-muted-foreground">加載中...</p>}
        {error && <p className="text-destructive">{error}</p>}
        {bookmarkedNews.length === 0 && !loading && !error && (
          <p className="text-muted-foreground text-center">您還沒有收藏任何新聞。</p>
        )}

        <div className="space-y-3">
          {bookmarkedNews.map((news) => (
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
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => handleDeleteBookmark(news.id)}
                >
                  <Trash2 className="w-4 h-4" />
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
    </div>
  )
}

export default NewsCenter

