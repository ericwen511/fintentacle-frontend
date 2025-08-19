import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, XCircle, Loader2, Wifi } from 'lucide-react'
import API_CONFIG, { createApiUrl } from '../config/api'

const ApiTest = () => {
  const [testResults, setTestResults] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const testEndpoints = [
    { name: '後端健康檢查', url: '/', description: '測試後端服務是否正常運行' },
    { name: '用戶API', url: '/api/users/profile', description: '測試用戶相關API' },
    { name: '筆記API', url: '/api/notes', description: '測試筆記相關API' },
    { name: '新聞API', url: '/api/news/search', description: '測試新聞相關API' }
  ]

  const testApiConnection = async (endpoint) => {
    try {
      const response = await fetch(createApiUrl(endpoint.url), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      return {
        success: response.ok,
        status: response.status,
        statusText: response.statusText,
        data: response.ok ? await response.text() : null
      }
    } catch (error) {
      return {
        success: false,
        status: 0,
        statusText: error.message,
        data: null
      }
    }
  }

  const runAllTests = async () => {
    setIsLoading(true)
    setTestResults({})
    
    for (const endpoint of testEndpoints) {
      const result = await testApiConnection(endpoint)
      setTestResults(prev => ({
        ...prev,
        [endpoint.name]: result
      }))
    }
    
    setIsLoading(false)
  }

  const getStatusIcon = (result) => {
    if (!result) return <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
    if (result.success) return <CheckCircle className="w-4 h-4 text-green-500" />
    return <XCircle className="w-4 h-4 text-red-500" />
  }

  const getStatusColor = (result) => {
    if (!result) return 'text-muted-foreground'
    if (result.success) return 'text-green-500'
    return 'text-red-500'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Wifi className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">API 連接測試</h1>
      </div>

      <Card className="tech-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wifi className="w-5 h-5 text-primary" />
            <span>後端API連接狀態</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-accent/50 rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">後端URL</p>
              <p className="font-mono text-sm text-primary">{API_CONFIG.BASE_URL}</p>
            </div>
          </div>

          <Button 
            onClick={runAllTests} 
            disabled={isLoading}
            className="tech-button w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                測試中...
              </>
            ) : (
              <>
                <Wifi className="w-4 h-4 mr-2" />
                開始測試API連接
              </>
            )}
          </Button>

          <div className="space-y-3">
            {testEndpoints.map((endpoint) => {
              const result = testResults[endpoint.name]
              return (
                <div key={endpoint.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(result)}
                      <span className="font-medium">{endpoint.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{endpoint.description}</p>
                    <p className="text-xs text-muted-foreground font-mono">{createApiUrl(endpoint.url)}</p>
                  </div>
                  <div className="text-right">
                    {result && (
                      <div className={`text-sm ${getStatusColor(result)}`}>
                        <div>狀態: {result.status}</div>
                        <div className="text-xs">{result.statusText}</div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ApiTest

