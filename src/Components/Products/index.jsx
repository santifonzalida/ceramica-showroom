import { useState, useEffect } from "react";
import { CreateProduct } from './createProduct';
import { TableProducts } from "./table";
import { Spinner } from '../Common/Spinner';

const ProductsCRUD = () => {

    const [mostrarCrear, setMostrarCrear] = useState(false);
    const [productos, setProductos] = useState([]);
    const [showSpinner, setShowSpinner] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setShowSpinner(true);
        fetch('https://long-lime-indri-wig.cyclic.cloud/Products', {method: 'GET',headers: { 'Content-Type': 'application/json ' }})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Se produjo un error al obtener los productos.')
                }
                return response.json();
            })
            .then(data => {
                if(data.data.length > 0){
                    setProductos(data.data);
                }
                setShowSpinner(false);
            }).catch(error => {
                setProductos([]);
                setShowSpinner(false);
                setError(error);
                throw new Error("No se pudo obtener los productos." + error) 
            });
    },[]);

    return (
        <div>
            <div className="bg-gray-100 font-sans">
                <div className="container mx-auto p-8">
                    <div className="flex items-center mb-2" >
                        <h1 className="text-3xl font-semibold">Lista de Productos</h1>
                        <button className={`${mostrarCrear ? 'hidden' : ''} bg-blue-500 text-white px-2 py-1 ml-5 rounded`} onClick={() => setMostrarCrear(true)}>Nuevo</button>
                    </div>
                    { showSpinner ? <Spinner /> : 
                        <div>
                            <div className={`${mostrarCrear ? '' : 'hidden'} row`}>
                                <CreateProduct setMostrarCrear={setMostrarCrear}/>
                            </div>
                            <div className={`${mostrarCrear ? 'hidden' : 'row'}`}>
                                <TableProducts products={productos} />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
    
}

export { ProductsCRUD };