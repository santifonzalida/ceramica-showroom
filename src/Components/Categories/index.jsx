import { useEffect, useState } from "react";
import { EmptyState } from './emptyState';
import { TableCategories } from './table';
import { Spinner } from "./spinner";

const CategoryCRUD = () => {

    useEffect(() => {
        setShowSpinner(true);
        fetch('https://long-lime-indri-wig.cyclic.cloud/Categories')
            .then(response => response.json()
            .then(data => {
                setCategorias(data.data)
                setShowSpinner(false);
            })).catch(error => {
                setCategorias([]);
                setShowSpinner(false);
                throw new Error("No se pudo obtener las categorias.") 
            });
    },[])

    const [mostrarCrear, setMostrarCrear] = useState(false);
    const [categorias, setCategorias]= useState([]);
    const [showSpinner, setShowSpinner] = useState(true);

    const renderResults = () => {
        if(showSpinner) {
            return <Spinner />
        }
        if(categorias.length > 0){
            return (<TableCategories data={categorias}/>);
        } else if(!mostrarCrear){
            return <EmptyState />
        }
    }

    return (
        <div>
            <div className="bg-gray-100 font-sans">
                <div className="container mx-auto p-8">
                    
                    <div className="flex items-center mb-2" >
                        <h1 className="text-3xl font-semibold">Lista de Categorias</h1>
                        <button className="bg-blue-500 text-white px-2 py-1 ml-5 rounded" onClick={() => setMostrarCrear(true)}>Nueva</button>
                    </div>
                    
                    <div className={`${mostrarCrear ? '' : 'hidden'} row`}>
                        <div className="mx-auto p-8">
                            <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
                            <input
                                id="nombre"
                                className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Ingresa el nombre aquí" />
                                <button className="bg-blue-500 text-white px-2 py-1 ml-5 rounded">Guardar</button>
                                <button className="bg-red-500 text-white px-2 py-1 ml-5 rounded" onClick={() => setMostrarCrear(false)}>Cancelar</button>
                        </div>
                    </div>
                    {renderResults()}
                </div>
            </div>
        </div>
    );

} 

export { CategoryCRUD };
