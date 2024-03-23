import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/LoginRHF'
import Products from './pages/Products'
import Todos from './pages/Todos'


// se crean las rutas con el createBrowserRouter, 
//que recibe como parametro un array de objetos de las diferentes rutas
const routes = createBrowserRouter([
  {
    path:'/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/products',
    element: <Products/>,
    // children: [
    //   {
    //     path: '/id',
    //     element: <h1>Product</h1>
    //   }
    // ]
  },
  {
    path: '/todos',
    element: <Todos/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router= {routes} />
)
