import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import App from "./App.tsx";
import ProductList from "./pages/ProductList.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import ErrorPage from "./route/ErrorPage.tsx";
import CreateProduct from "./pages/CreateProduct.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
    },
    {
        path: '/product',
        element: <ProductList/>,
    },
    {
        path: '/product/:productId',
        element: <ProductDetail/>,
    },
    {
        path: '/product/new',
        element: <CreateProduct/>,
    },
    {
        path: '*',
        element: <ErrorPage/>,
    },

])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    </StrictMode>,
)
