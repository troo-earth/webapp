import './App.css';
import { RouterProvider, createRouter } from '@tanstack/react-router';
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
        <RouterProvider 
            router={router} 
            context={{ 
                queryClient, 
                auth 
            }} 
        />
    );
}

export default App;