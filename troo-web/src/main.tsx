import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store  from './redux/store.ts';
import App from './App.tsx';
import { queryClient } from './lib/queryClient.ts';
import './index.css';


const rootElement = document.getElementById('root')!;

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <App/>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);