import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Building2, 
  Newspaper, 
  FileText, 
  Star,
  TrendingUp,
  Plus,
  Search,
  BookOpen,
  Eye,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalCompanies: 156,
    totalNews: 1247,
    totalNotes: 89,
    totalWatchlist: 23
  })

  const [recentNews, setRecentNews] = useState([
    {
      id: 1,
      title: '台積電Q4財報超預期，股價創新高',
      source: '經濟日報',
      time: '2小時前',
      url: '#'
    },
    {
      id: 2,
      title: 'NVIDIA發布新一代AI晶片，概念股齊漲',
      source: '工商時報',
      time: '4小時前',
      url: '#'
    },
    {
      id: 3,
      title: '美股三大指數收紅，科技股表現亮眼',
      source: 'MoneyDJ',
      time: '6小時前',
      url: '#'
    },
    {
      id: 4,
      title: '電動車產業鏈受惠，相關個股強勢',
      source: '鉅亨網',
      time: '8小時前',
      url: '#'
    },
    {
      id: 5,
      title: '央行利率決議即將公布，市場關注',
      source: '自由時報',
      time: '10小時前',
      url: '#'
    }
  ])

  const [recentNotes, setRecentNotes] = useState([
    {
      id: 1,
      title: '台積電技術分析 - 突破關鍵阻力',
      tags: ['技術分析', '買入'],
      time: '1小時前'
    },
    {
      id: 2,
      title: 'AAPL財報前瞻 - 預期營收成長',
      tags: ['財報', '觀察'],
      time: '3小時前'
    },
    {
      id: 3,
      title: '半導體產業趨勢觀察',
      tags: ['基本面', '機會'],
      time: '5小時前'
    },
    {
      id: 4,
      title: 'Tesla交車數據分析',
      tags: ['數據分析', '觀察'],
      time: '1天前'
    },
    {
      id: 5,
      title: '美債殖利率對科技股影響',
      tags: ['總經', '風險'],
      time: '2天前'
    }
  ])

  const StatCard = ({ icon: Icon, title, value, color = 'primary' }) => (
    <div className="tech-card p-6 hover-glow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className={`text-2xl font-bold mono-font text-${color}`}>
            {value.toLocaleString()}
          </p>
        </div>
        <div className={`p-3 rounded-lg bg-${color}/10`}>
          <Icon className={`w-6 h-6 text-${color}`} />
        </div>
      </div>
    </div>
  )

  const NewsItem = ({ news }) => (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors group">
      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2" />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {news.title}
        </h4>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-xs text-muted-foreground">{news.source}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{news.time}</span>
        </div>
      </div>
      <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  )

  const NoteItem = ({ note }) => (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors group">
      <div className="flex-shrink-0 w-2 h-2 bg-chart-2 rounded-full mt-2" />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {note.title}
        </h4>
        <div className="flex items-center space-x-2 mt-2">
          <div className="flex space-x-1">
            {note.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-auto">{note.time}</span>
        </div>
      </div>
      <Eye className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  )

  return (
    <div className="space-y-6">
      {/* 統計卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Building2} 
          title="記錄公司" 
          value={stats.totalCompanies}
          color="primary"
        />
        <StatCard 
          icon={Newspaper} 
          title="新聞總數" 
          value={stats.totalNews}
          color="chart-2"
        />
        <StatCard 
          icon={FileText} 
          title="我的筆記" 
          value={stats.totalNotes}
          color="chart-3"
        />
        <StatCard 
          icon={Star} 
          title="關注股票" 
          value={stats.totalWatchlist}
          color="chart-4"
        />
      </div>

      {/* 最新內容 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 最新新聞 */}
        <div className="tech-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <Newspaper className="w-5 h-5 mr-2 text-primary" />
              最新 5 條新聞
            </h3>
            <Link to="/news">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                查看全部
              </Button>
            </Link>
          </div>
          <div className="space-y-2">
            {recentNews.map((news) => (
              <NewsItem key={news.id} news={news} />
            ))}
          </div>
        </div>

        {/* 最新筆記 */}
        <div className="tech-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-chart-2" />
              最新 5 條筆記
            </h3>
            <Link to="/notes">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                查看全部
              </Button>
            </Link>
          </div>
          <div className="space-y-2">
            {recentNotes.map((note) => (
              <NoteItem key={note.id} note={note} />
            ))}
          </div>
        </div>
      </div>

      {/* 快捷操作 */}
      <div className="tech-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-primary" />
          快捷操作
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/notes">
            <Button className="tech-button w-full h-16 flex flex-col items-center justify-center space-y-2">
              <Plus className="w-5 h-5" />
              <span className="text-sm">新增筆記</span>
            </Button>
          </Link>
          
          <Link to="/search">
            <Button className="tech-button-secondary w-full h-16 flex flex-col items-center justify-center space-y-2">
              <Search className="w-5 h-5" />
              <span className="text-sm">搜索股票</span>
            </Button>
          </Link>
          
          <Link to="/news">
            <Button className="tech-button-secondary w-full h-16 flex flex-col items-center justify-center space-y-2">
              <Newspaper className="w-5 h-5" />
              <span className="text-sm">查看新聞</span>
            </Button>
          </Link>
          
          <Link to="/search">
            <Button className="tech-button-secondary w-full h-16 flex flex-col items-center justify-center space-y-2">
              <Star className="w-5 h-5" />
              <span className="text-sm">管理關注列表</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

