import { useState } from "react";
import { ArrowPathIcon } from '@heroicons/react/24/solid'

const CreateCategory = (props) => {

    const [nombreCategoria, setNombreCategoria] = useState("")
    const [showSpinner, setShowSpinner] = useState(false);
    const [error, setError] = useState(false);

    const create = () => {
        setShowSpinner(true);

        let request = {name: nombreCategoria, image: 'http://fakeurl.com/img'};

        fetch('https://long-lime-indri-wig.cyclic.cloud/Categories', 
            {
                method: 'POST', 
                body: JSON.stringify(request),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => response.json()
            .then(data => {
                console.log(data)
                setShowSpinner(false);
            })).catch(error => {
                setError(error)
                setShowSpinner(false);
                throw new Error("No se pudo guardar la categoria.") 
            });
    }

    return (
        <div className="mx-auto p-8">
            <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
            <input
                id="nombre"
                className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                onChange={(e) => setNombreCategoria(e.target.value)}
                placeholder="Ingresa el nombre aquí" 
                required/>
                <button className={`${!showSpinner ? '' : 'hidden'} bg-blue-500 text-white px-2 py-1 ml-5 rounded`} onClick={create}>Guardar</button>
                <button className={`${showSpinner ? '' : 'hidden'} bg-blue-500 text-white rounded w-4 h-2`} disabled >
                    <div className="animate-spin h-5 w-5 mr-3">
                        <ArrowPathIcon />
                    </div> 
                </button>
                <button className="bg-red-500 text-white px-2 py-1 ml-5 rounded" onClick={() => props.mostrarCrear(false)}>Cancelar</button>
        </div>
    )
}

export { CreateCategory }