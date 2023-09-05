import { useRoutes, BrowserRouter } from 'react-router-dom';
import { ShoppingCartProvider } from '../../Context'; 
import { Home } from '../Home';
import { MyAccount } from '../MyAccount';
import { Login } from '../Login';
import { NotFound } from '../NotFound';
import { Navbar } from '../../Components/Navbar';
import { Category } from '../Category';
import '../../App.css'
import { LoginContextProvider } from '../../Context/loginContext';

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home/> },
    { path: '/my-account', element: <MyAccount/> },
    { path: '/category/:id', element: <Category /> },
    { path: '/login', element: <Login/> },
    { path: '*' , element: <NotFound />},
  ]);
  return routes;
}

function App() {
  return (
      <ShoppingCartProvider>
        <BrowserRouter>
        <LoginContextProvider>
          <AppRoutes />
          <Navbar />
          </LoginContextProvider>
        </BrowserRouter>
      </ShoppingCartProvider>
  )
}

export default App
