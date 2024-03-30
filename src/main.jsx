import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/LoginRHF'
import Products from './pages/Products'
import Todos from './pages/Todos'
import ProductOnShow from './components/ProductOnShow'

// se crean las rutas con el createBrowserRouter,
//que recibe como parametro un array de objetos de las diferentes rutas
const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children:[
      {
        path:'/uno',
        element: <h1>Uno</h1>
      },
      {
        path:'/dos',
        element: <h1>Dos</h1>
      },
      {
        path:'/tres',
        element: <h1>Tres</h1>
      },
      {
        path: '/products',
        element: <Products />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/products/:id',
        element: <ProductOnShow />
      },
    ]
  },
  
  {
    path: '/todos',
    element: <Todos />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes} />
)
