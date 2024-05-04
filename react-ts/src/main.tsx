import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Components/Home.tsx';
import CreateBlog from './Components/CreateBlog.tsx';
import MyBlog from './Components/MyBlog.tsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import BlogDetails from './Components/BlogDetails.tsx';
import MyBlogDetails from './Components/MyBlogDetails.tsx';

// Create a client
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/createBlog",
        element: <CreateBlog />
      },
      {
        path: "/myBlog",
        element: <MyBlog />
      },
      {
        path: '/blogDetails/:id',
        element: <BlogDetails />,
        loader: ({ params }) => fetch(`https://server-two-kohl.vercel.app/blogs/${params.id}`)
      },
      {
        path: '/myBlogDetails/:id',
        element: <MyBlogDetails />,
        loader: ({ params }) => fetch(`https://server-two-kohl.vercel.app/blogs/${params.id}`)
      },
      {
        path: "/logIn",
        element: <h1 className="text-center text-2xl font-semibold mt-10">LogIn</h1>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
