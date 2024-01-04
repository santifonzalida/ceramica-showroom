import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom"
import { ShoppingCartContext } from "../../Context";
import { LoginContext } from "../../Context/loginContext";
import { BellIcon, HomeIcon } from '@heroicons/react/24/solid'
import {
    Collapse,
    Dropdown,
    initTE,
  } from "tw-elements";
  
  
const Navbar = () => {

    initTE({ Collapse, Dropdown });

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
        context.setProductoDashboard(false);
        context.setCategoriaDashboard(true);
    }

    const onProductoClick = () => {
        context.setCategoriaDashboard(false);
        context.setProductoDashboard(true);
    }

    return (
        <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-4 md:px-8 text-sm font-light bg-white opacity-90">
            <ul className="flex items-center gap-3">
                <li className="font-bold text-lg">
                    <NavLink 
                        to='/'
                    > { location.pathname === '/dashboard' ? <HomeIcon className='h-6 w-6' /> : 'Showroom' } </NavLink>
                </li>
                <li className={`${location.pathname !== '/' && !location.pathname.includes('category') ? 'hidden' : ''}`}>
                    <NavLink 
                        to='/'
                        className={({isActive}) => isActive ? activeStyle : undefined}
                    > Todo </NavLink>
                </li>
                <li className={`${location.pathname === '/dashboard' ? '' : 'hidden'} font-semibold`}>
                    <a>Configuración &gt; </a>
                </li>
                <li className={`${location.pathname === '/dashboard' ? '' : 'hidden'}`}>
                    <a className="cursor-pointer" onClick={onProductoClick}>Productos</a>
                </li>
                <li className={`${location.pathname === '/dashboard' ? '' : 'hidden'}`}>
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
            {
                loginContext.isUserLogin ?   

                <ul className="flex items-center gap-3">
                    <li className="text-black/60 hidden md:flex">{loginContext.user?.email}</li>
                    <li className={`${loginContext.isUserLogin && location.pathname != '/dashboard' ? 'flex' : 'hidden'} items-center`}>
                        <BellIcon className='h-6 w-6 text-black'></BellIcon>
                        <div>
                            {context.cartCounter}
                        </div>
                    </li>
                    <div
                        className="relative"
                        data-te-dropdown-ref
                        data-te-dropdown-alignment="end">
                        <a
                            className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                            href="#"
                            id="dropdownMenuUser"
                            role="button"
                            data-te-dropdown-toggle-ref
                            aria-expanded="false">
                            <img
                                src={loginContext.user?.avatarUrl}
                                className="rounded-full"
                                style={{height: '25px', width: '25px'}}
                                alt=""
                                loading="lazy" />
                        </a>
                        <ul
                            className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                            aria-labelledby="dropdownMenuUser"
                            data-te-dropdown-menu-ref>
                            <li>
                                <a
                                    className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                    data-te-dropdown-item-ref>
                                    <NavLink 
                                        to='/my-account'
                                        className={({isActive}) => isActive ? activeStyle : undefined}
                                        >Mi cuenta
                                    </NavLink>
                                </a>
                            </li>
                            <li>
                                <a
                                    className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                    data-te-dropdown-item-ref
                                    onClick={() => loginContext.logOut()}
                                >Cerrar sesión</a>
                            </li>
                        </ul>
                    </div>
                </ul>
            : 
                <ul>
                    <li className={`${loginContext.isUserLogin ? 'hidden' : ''}`}>
                        <NavLink 
                            to='/login'
                            className={({isActive}) => isActive ? activeStyle : undefined}
                        >Iniciar sesión</NavLink>
                    </li>
                </ul>
            }
        </nav>
    )
}

export { Navbar };