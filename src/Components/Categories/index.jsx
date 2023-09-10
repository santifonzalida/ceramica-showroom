import { useEffect, useState } from "react";
import { EmptyState } from './emptyState';
import { TableCategories } from './table';
import { Spinner } from "./spinner";
import { CreateCategory } from "./createCategory";

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
                        <CreateCategory mostrarCrear={setMostrarCrear}/>
                    </div>
                    {renderResults()}
                </div>
            </div>
        </div>
    );

} 

export { CategoryCRUD };
