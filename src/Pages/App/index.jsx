import { useRoutes, BrowserRouter } from 'react-router-dom';
import '../../App.css'
import { ShoppingCartProvider } from '../../Context'; 
import { Home } from '../Home';
import { MyAccount } from '../MyAccount';
import { Login } from '../Login';
import { NotFound } from '../NotFound';
import { Navbar } from '../../Components/Navbar';
import { Category } from '../Category';
import { LoginContextProvider } from '../../Context/loginContext';
import { AdminDashboard } from '../adminDashboard';

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home/> },
    { path: '/my-account', element: <MyAccount/> },
    { path: '/category/:id', element: <Category /> },
    { path: '/login', element: <Login/> },
    { path: '/dashboard', element: <AdminDashboard/>},
    { path: '*' , element: <NotFound />},
  ]);
  return routes;
}

console.log(import.meta.env.VITE_WEB_URL);

function App() {

  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <LoginContextProvider>
          <Navbar />
          <AppRoutes />
        </LoginContextProvider>
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}

export default App
