import { useState } from "react";
import { CreateProduct } from './createProduct';

const ProductsCRUD = () => {

    const [mostrarCrear, setMostrarCrear] = useState(false);

    return (
        <div>
            <div className="bg-gray-100 font-sans">
                <div className="container mx-auto p-8">
                    
                    <div className="flex items-center mb-2" >
                        <h1 className="text-3xl font-semibold">Lista de Productos</h1>
                        <button className="bg-blue-500 text-white px-2 py-1 ml-5 rounded" onClick={() => setMostrarCrear(true)}>Nuevo</button>
                    </div>
                    
                    <div className={`${mostrarCrear ? '' : 'hidden'} row`}>
                        <CreateProduct setMostrarCrear={setMostrarCrear}/>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export { ProductsCRUD };