import { useEffect, useState, useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Rectangle } from 'recharts';
import { useLocalStorage } from '../../Context/useLocalStorage';
import { ShoppingCartContext } from '../../Context/index';
import { Spinner } from '../Common/Spinner';
import {
    Collapse,
    Dropdown,
    initTE,
  } from "tw-elements";

const Statistics = () => {

    initTE({ Collapse, Dropdown }, true);

    const localStorage = useLocalStorage();
    const context = useContext(ShoppingCartContext);
    const [productosLikeados, setProductosLikeados] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [productLimit, setProductLimit] = useState(5);

    useEffect(() => {
        obtenerProductosLikeados(5);
    },[]);

    const obtenerProductosLikeados = (limite) => {
        setProductLimit(limite);
        setIsLoading(true);
        const userStorage = localStorage.getItem('user');
        fetch(`https://tame-ruby-rhinoceros-cap.cyclic.app/Statistics/getProductosLikeados/${limite}`, 
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userStorage.access_token}` },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Se produjo un error al inicializar la pantalla.')
                }
                return response.json();
            })
            .then((data) => { 
                if (data.data && data.data.length > 0) {
                    setProductosLikeados(darFormatoAlGrafico(data.data));
                }
            }).catch(error => {
                console.error(error)
            }).finally(() => {
                setIsLoading(false);
        });
    }

    const darFormatoAlGrafico = (data) => {
        let productosTodos = context.products;
        let respuesta = [];

        if (data.length >0) {
            respuesta = data.map((p) => {
                let pr = productosTodos.find(prod => prod._id == p._id);
                p._id = pr.name;
                return p;
            })
        }
        return respuesta;
    }

    const renderProductsLiked = () => {
        return (
            <BarChart
                width={400}
                height={300}
                data={productosLikeados}
                margin={{
                    top: 5,
                    right: 30,
                    left: 0,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey='_id' />
                <YAxis/>
                <Tooltip />
                <Legend />
                <Bar dataKey="total" name="Likes" fill="#191919" activeBar={<Rectangle fill="#999999" stroke="grey" />}/>
            </BarChart>
        );
    }

    const renderLimitDropdown = () => {
        return (
        <div
            className="relative font-semibold"
            data-te-dropdown-ref
            data-te-dropdown-alignment="end">
            <button
                className="flex items-center whitespace-nowrap rounded px-6 pb-2 pt-2.5 font-medium leading-normal text-black"
                type="button"
                id="dropdownMenuButton1"
                data-te-dropdown-toggle-ref
                aria-expanded="false"
                data-te-ripple-init
                data-te-ripple-color="light"> Obtener últimos
                <span 
                    className="ml-2 w-2">
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
            </button>
            <ul
                className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                aria-labelledby="dropdownMenuConfig"
                data-te-dropdown-menu-ref>
                <li>
                    <a
                        className="block w-full whitespace-nowrap bg-transparent cursor-pointer px-4 py-2 text-sm font-normal text-neutral-900"
                        data-te-dropdown-item-ref
                        onClick={() => obtenerProductosLikeados(5)}
                    >5</a>
                </li>
                <li>
                    <a
                        className="block w-full whitespace-nowrap bg-transparent cursor-pointer px-4 py-2 text-sm font-normal text-neutral-900"
                        data-te-dropdown-item-ref
                        onClick={() => obtenerProductosLikeados(10)}
                    >10</a>
                </li>
                <li>
                    <a
                        className="block w-full whitespace-nowrap bg-transparent cursor-pointer px-4 py-2 text-sm font-normal text-neutral-900"
                        data-te-dropdown-item-ref
                        onClick={() => obtenerProductosLikeados(15)}
                    >15</a>
                </li>
            </ul>
        </div> )
    }

    return(
        <div className="flex">
            {isLoading ? <Spinner /> : 
                <div className='items-center justify-between'>
                    <h3 className='m-2'>Top {productLimit} productos likeados</h3>
                    { renderLimitDropdown() }
                    {productosLikeados && productosLikeados.length > 0 ? renderProductsLiked() : 'No se encontraron datos. '}
                </div>
            }
        </div>
    )
}

export { Statistics }