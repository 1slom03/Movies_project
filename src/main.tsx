import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GlobalContext } from './context/Context.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <GlobalContext>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <App />
      </BrowserRouter>
    </GlobalContext>
  </QueryClientProvider>
)
