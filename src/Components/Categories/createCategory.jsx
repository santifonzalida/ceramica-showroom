import { useState } from "react";
import { useLocalStorage } from "../../Context/useLocalStorage";
import { XCircleIcon, CheckCircleIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

const CreateCategory = (props) => {

    const localStorage = useLocalStorage();
    const [nombreCategoria, setNombreCategoria] = useState("")
    const [showSpinner, setShowSpinner] = useState(false);
    const [error, setError] = useState(false);

    const create = () => {

        if(!nombreCategoria){
            setError("Campo requerido");
            return;
        } 

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
        <div className="mx-auto py-8">
            <div className="flex">
                <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold pt-2 pr-2">Nombre:</label>
                <input
                    id="nombre"
                    className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={nombreCategoria}
                    onChange={(e) => {
                        setNombreCategoria(e.target.value);
                        setError("")}
                        }
                    placeholder="Ingresa el nombre aquí" 
                    required/>
                
                <div className={`${showSpinner ? 'hidden' : ''} flex items-center gap-2`}>
                    <CheckCircleIcon className="h-8 w-8 ml-3" disabled={showSpinner} onClick={create} /> 
                    <XCircleIcon className="h-8 w-8" onClick={() => {
                        props.mostrarCrear(false);
                        setNombreCategoria("");
                        setError("");}
                        }
                        disabled={showSpinner}/>
                </div>
                <div className={`${showSpinner ? '' : 'hidden'} flex items-center px-8`}>
                    <ArrowPathIcon className="w-5 h-5 animate-spin" />
                </div>
            </div>
            <span className={`${error ? '' : 'hidden'} font-light text-xs text-red-600`}>Campo requerido</span>
        </div>
    )
}

export { CreateCategory }

