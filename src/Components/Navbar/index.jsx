import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom"
import { ShoppingCartContext } from "../../Context";
import { LoginContext } from "../../Context/loginContext";
import { ShoppingBagIcon } from '@heroicons/react/24/solid'


const Navbar = () => {
    const location = useLocation();
    const context = useContext(ShoppingCartContext);
    const loginContext = useContext(LoginContext);
    const activeStyle = "underline underline-offset-4";
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        fetch('https://tame-ruby-rhinoceros-cap.cyclic.app/Categories')
            .then(response => response.json()
            .then(data => {
                setCategories(data.data)
            }));
    },[])

    const onCateogiriaClick = () => {
        context.setCategoriaDashboard(true);
    }

    const onProductoClick = () => {
        context.setProductoDashboard(true);
    }

    return (
        <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white opacity-90">
            <ul className="flex items-center gap-3">
                <li className="font-bold text-lg mr-2">
                    <NavLink 
                        to='/'
                    > Showroom </NavLink>
                </li>
                <li className={`${location.pathname !== '/' && !location.pathname.includes('category') ? 'hidden' : ''}`}>
                    <NavLink 
                        to='/'
                        className={({isActive}) => isActive ? activeStyle : undefined}
                    > Todo </NavLink>
                </li>
                <li className={`${location.pathname === '/dashboard' ? '' : 'hidden'} font-semibold`}>
                    <a className="cursor-pointer" onClick={onProductoClick}>Productos</a>
                </li>
                <li className={`${location.pathname === '/dashboard' ? '' : 'hidden'} font-semibold`}>
                    <a className="cursor-pointer" onClick={onCateogiriaClick}>Categorias</a>
                </li>
                {
                    location.pathname != '/dashboard' ?
                    categories?.map((cat) => (
                        <li key={cat._id} className={`${location.pathname === '/login' ? 'hidden' : ''} hidden md:flex`}>
                            <NavLink 
                                to={{ pathname:`/category/${cat.name}`}} state={{id: cat._id}}
                                className={({ isActive }) => isActive ? activeStyle : undefined}
                            >{cat.name}</NavLink>
                        </li>
                    ))
                    : ''
                }

            </ul>
            <ul className="flex items-center gap-2 md:gap-3">
                <li className={`${loginContext.isUserLogin ? '' : 'hidden'} text-black/60 hidden md:flex`}>{loginContext.user?.email}</li>
                <li className={`${loginContext.isUserLogin ? '' : 'hidden'}`}>
                    <NavLink 
                        to='/my-orders'
                        className={({isActive}) => isActive ? activeStyle : undefined}
                    >My orders</NavLink>
                </li>
                <li className={`${loginContext.isUserLogin ? '' : 'hidden'}`}>
                    <NavLink 
                        to='/my-account'
                        className={({isActive}) => isActive ? activeStyle : undefined}
                    >My account</NavLink>
                </li>
                <li className={`${loginContext.isUserLogin ? '' : 'hidden'}`}>
                    <Link to='' onClick={() => loginContext.logout()}>
                        Sign out 
                    </Link>
                </li>
                <li className={`${loginContext.isUserLogin ? 'hidden' : ''}`}>
                    <NavLink 
                        to='/login'
                        className={({isActive}) => isActive ? activeStyle : undefined}
                    >Sign in</NavLink>
                </li>
                <li className={`${loginContext.isUserLogin ? 'flex' : 'hidden'} items-center`}>
                    <ShoppingBagIcon className='h-6 w-6 text-black cursor-pointer' onClick={() => context.openCheckoutSideMenu()}></ShoppingBagIcon>
                    <div>
                        {context.cartCounter}
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export { Navbar };