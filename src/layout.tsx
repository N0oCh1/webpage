import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './index.css'
import App from './app/page.tsx'
import Dashboard from './app/dashboard/page.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <StrictMode><App /></StrictMode>,
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  }
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)
