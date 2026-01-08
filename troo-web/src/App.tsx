import './App.css';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { Toaster } from "react-hot-toast"; 
import { routeTree } from "./routeTree.gen";
import { useAuth } from "./hooks/auth/useAuth";
import { queryClient } from './lib/queryClient.ts';

const router = createRouter({
    routeTree,
    context: {
        queryClient,
        auth: undefined!,
    },
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

function App() {
    const auth = useAuth();

    return (
        <>
            <Toaster
                position="top-right"
                gutter={12}
                toastOptions={{
                    duration: 3000,
                    style: {
                        borderRadius: "14px",
                        fontWeight: 600,
                        background: "#ffffff",
                        color: "#0f172a",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                    },
                }}
            />
            <RouterProvider 
                router={router} 
                context={{ 
                    queryClient, 
                    auth 
                }} 
            />
        </>
    );
}

export default App;