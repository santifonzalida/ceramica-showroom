import { useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom"
import { ShoppingCartContext } from "../../Context";
import { LoginContext } from "../../Context/loginContext";
import { ShoppingBagIcon } from '@heroicons/react/24/solid'


const Navbar = () => {
    const location = useLocation();
    const context = useContext(ShoppingCartContext);
    const loginContext = useContext(LoginContext);
    const activeStyle = "underline underline-offset-4";

    return (
        <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white opacity-90">
            <ul className="flex items-center gap-3">
                <li className="font-semibold text-lg">
                    <NavLink 
                        to='/'
                    > Shopi </NavLink>
                </li>
                <li className={`${location.pathname === '/login' ? 'hidden' : ''}`}>
                    <NavLink 
                        to='/'
                        className={({isActive}) => isActive ? activeStyle : undefined}
                    > All </NavLink>
                </li>
                <li className={`${location.pathname === '/login' ? 'hidden' : ''} hidden md:flex`}>
                    <NavLink 
                        to={{ pathname:'/category/clothes'}} state={{id: 4}}
                        className={({ isActive }) => isActive ? activeStyle : undefined}
                    >Clothes</NavLink>
                </li>
                <li className={`${location.pathname === '/login' ? 'hidden' : ''} hidden md:flex`}>
                    <NavLink 
                        to={{ pathname:'/category/electronics'}} state={{id: 2}}
                        className={({isActive}) => isActive ? activeStyle : undefined}
                    >Electronics</NavLink>
                </li>
                <li className={`${location.pathname === '/login' ? 'hidden' : ''} hidden md:flex`}>
                    <NavLink 
                        to={{ pathname:'/category/fornitures'}} state={{id: 3}}
                        className={({isActive}) => isActive ? activeStyle : undefined}
                    >Fornitures</NavLink>
                </li>
                <li className={`${location.pathname === '/login' ? 'hidden' : ''} hidden md:flex`}>
                    <NavLink 
                        to={{ pathname:'/category/others'}} state={{id: 5}}
                        className={({isActive}) => isActive ? activeStyle : undefined}
                    >Others</NavLink>
                </li>

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