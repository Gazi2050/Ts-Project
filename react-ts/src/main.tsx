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
        path: "/logIn",
        element: <h1 className="text-center text-2xl font-semibold mt-10">LogIn</h1>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
