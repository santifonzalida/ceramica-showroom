import { useState, useEffect } from "react";
import { CreateProduct } from './createProduct';
import { TableProducts } from "./table";
import { Spinner } from '../Common/Spinner';

const ProductsCRUD = () => {
    
    const [mostrarCrear, setMostrarCrear] = useState(false);
    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [showSpinner, setShowSpinner] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setShowSpinner(true);
        fetch('https://tame-ruby-rhinoceros-cap.cyclic.app/Products', {method: 'GET',headers: { 'Content-Type': 'application/json ' }})
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
        <div className="bg-gray-100 font-sans">
            <div className="mx-auto">
                <div className="grid grid-cols-2 items-center mb-2 p-4">
                    <div className={`${mostrarCrear ? 'hidden' : ''}`}>
                        <h1 className="text-sm md:text-xl font-semibold flex">Listado de Productos</h1>
                    </div>
                    <div className="flex justify-end">
                        <button className={`${mostrarCrear ? 'hidden' : ''} bg-black text-white py-1 rounded px-2`} onClick={() => setMostrarCrear(true)}>Nuevo +</button>
                    </div>
                </div>
                { showSpinner ? <Spinner /> : 
                    <div>
                        {mostrarCrear ? 
                            <CreateProduct 
                                setMostrarCrear={setMostrarCrear} 
                                products={productos} 
                                setProducts={setProductos} 
                                selectedProduct={productoSeleccionado}
                                setSelectedProduct={setProductoSeleccionado} 
                            />
                        :
                            <TableProducts 
                                products={productos}
                                setProducts={setProductos}
                                setSelectedProduct={setProductoSeleccionado}
                                setMostrarCrear={setMostrarCrear}
                            />
                        }
                    </div>
                }
            </div>
        </div>
    );
    
}

export { ProductsCRUD };