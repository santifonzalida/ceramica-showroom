import { useEffect, useState, useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Rectangle } from 'recharts';
import { useLocalStorage } from '../../Context/useLocalStorage';
import { ShoppingCartContext } from '../../Context/index';
import { Spinner } from '../Common/Spinner';

const Statistics = () => {

    const localStorage = useLocalStorage();
    const context = useContext(ShoppingCartContext);
    const [productosLikeados, setProductosLikeados] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        obtenerProductosLikeados(5);
    },[]);

    const obtenerProductosLikeados = (limite) => {
        setIsLoading(true);
        const userStorage = localStorage.getItem('user');
        fetch('https://tame-ruby-rhinoceros-cap.cyclic.app/Statistics/getProductosLikeados', 
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

    return(
        <div className="flex">
            {isLoading ? <Spinner /> : 
            <div className='items-center justify-between'>
                <h3 className='m-2'>Top 5 productos likeados</h3>
                {productosLikeados && productosLikeados.length > 0 ? renderProductsLiked() : 'No se encontraron datos. '}
            </div>
            }
        </div>
    )
}

export { Statistics }