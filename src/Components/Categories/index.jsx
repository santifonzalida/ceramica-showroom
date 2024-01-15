import { useEffect, useState } from "react";
import { EmptyState } from '../Common/EmptyState';
import { TableCategories } from './table';
import { Spinner } from "../Common/Spinner";
import { CreateCategory } from "./createCategory";

const CategoryCRUD = () => {

    useEffect(() => {
        setShowSpinner(true);
        fetch('https://tame-ruby-rhinoceros-cap.cyclic.app/Categories', {method: 'GET',headers: { 'Content-Type': 'application/json ' }})
            .then(response => response.json()
            .then(data => {
                if(data.data.length > 0){
                    setCategorias(data.data);
                }
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
            return <TableCategories data={categorias} setCategory={setCategorias}/>;
        } else if(!mostrarCrear){
            return <EmptyState />
        }
    }

    return (
        <div>
            <div className="bg-gray-100 font-sans">
                <div className="mx-auto p-4">
                    <div className="grid grid-cols-2 items-center mb-2">
                        <div className={`${mostrarCrear ? 'hidden' : ''}`}>
                            <h1 className="text-sm md:text-xl font-semibold flex">Lista de Categorias</h1>
                        </div>
                        <div className="flex justify-end">
                            <button className={`${mostrarCrear ? 'hidden' : ''} bg-black text-white py-1 rounded px-2`} onClick={() => setMostrarCrear(true)}>Nuevo +</button>
                        </div>
                    </div>
                    <div className={`${mostrarCrear ? '' : 'hidden'} row`}>
                        <CreateCategory mostrarCrear={setMostrarCrear} setCategory={setCategorias} categorias={categorias}/>
                    </div>
                    {renderResults()}
                </div>
            </div>
        </div>
    );

} 

export { CategoryCRUD };
