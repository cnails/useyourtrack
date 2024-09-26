import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import WebApp from '@twa-dev/sdk'
import { QueryClient, QueryClientProvider } from 'react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

WebApp.ready();
WebApp.expand();
window.Telegram?.WebApp.disableVerticalSwipes?.()

const channel = new BroadcastChannel('telegram_webapp');

channel.onmessage = (event) => {
  if (event.data === 'close') {
    WebApp.close();
  }
};

// Отправляем сообщение о запуске инстанса
channel.postMessage('new_instance');

// Оповещаем другие вкладки закрыть приложение при открытии нового инстанса
window.addEventListener('beforeunload', () => {
  channel.postMessage('close');
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
