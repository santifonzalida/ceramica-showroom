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
                {
                    location.pathname === '/dashboard' ?
                    <div
                        className="relative font-semibold"
                        data-te-dropdown-ref
                        data-te-dropdown-alignment="end">
                        <a
                            className="flex items-center whitespace-nowrap cursor-pointer px-6 pb-2 pt-2.5 font-bold text-black  motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            id="dropdownMenuConfig"
                            data-te-dropdown-toggle-ref
                            aria-expanded="false"
                            data-te-ripple-init
                            data-te-ripple-color="light"> 
                            Configuración
                            <span className="ml-2 w-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5">
                                    <path
                                    fillRule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                    clipRule="evenodd" />
                                </svg>
                            </span>
                        </a>
                        <ul
                            className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                            aria-labelledby="dropdownMenuConfig"
                            data-te-dropdown-menu-ref>
                            <li>
                                <a
                                    className="block w-full whitespace-nowrap bg-transparent cursor-pointer px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                    data-te-dropdown-item-ref
                                    onClick={onProductoClick}
                                >Productos</a>
                            </li>
                            <li>
                                <a
                                    className="block w-full whitespace-nowrap bg-transparent cursor-pointer px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                    data-te-dropdown-item-ref
                                    onClick={onCateogiriaClick}
                                >Categoria</a>
                            </li>
                        </ul>
                    </div>
                    : ''
                }
                
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