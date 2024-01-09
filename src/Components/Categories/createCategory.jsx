import { useState } from "react";
import { useLocalStorage } from "../../Context/useLocalStorage";
import { ArrowPathIcon } from '@heroicons/react/24/solid'

const CreateCategory = (props) => {

    const localStorage = useLocalStorage();
    const [nombreCategoria, setNombreCategoria] = useState("")
    const [showSpinner, setShowSpinner] = useState(false);
    const [error, setError] = useState(false);

    const create = () => {
        setShowSpinner(true);
        const userStorage = localStorage.getItem('user');
        let request = {name: nombreCategoria, image: 'http://fakeurl.com/img'};

        fetch('https://tame-ruby-rhinoceros-cap.cyclic.app/Categories', 
            {
                method: 'POST', 
                body: JSON.stringify(request),
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userStorage.access_token}` },
            })
            .then(response => response.json()
            .then(data => {
                props.setCategory([...props.categorias, data.data]);
                setShowSpinner(false);
                setNombreCategoria("");
            })).catch(error => {
                setError(error)
                setShowSpinner(false);
            }
        );
    }

    return (
        <div className="mx-auto p-8 flex">
            <div className="flex">
                <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold pt-2 pr-2">Nombre:</label>
                <input
                    id="nombre"
                    className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={nombreCategoria}
                    onChange={(e) => setNombreCategoria(e.target.value)}
                    placeholder="Ingresa el nombre aquí" 
                    required/>

                <button 
                    type="button" 
                    className={`${showSpinner ? 'cursor-not-allowed' : ''} bg-blue-500 text-white px-2 py-2 ml-4 rounded`} 
                    disabled={showSpinner}
                    onClick={create}>Guardar 
                    <div className={`${showSpinner ? 'cursor-not-allowed' : 'hidden'} animate-spin ml-1`}>
                        <ArrowPathIcon className="w-5 h-5"/>
                    </div> 
                </button>
                <button 
                    type="button" 
                    className={`${!showSpinner ? '' : 'cursor-not-allowed'} bg-red-500 text-white px-2 py-1 ml-5 rounded`} 
                    onClick={() => props.mostrarCrear(false)}
                    disabled={showSpinner}>Cancelar
                </button>
            </div>
            
        </div>
    )
}

export { CreateCategory }

