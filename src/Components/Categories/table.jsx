import { useState } from "react";
import { PencilIcon } from '@heroicons/react/24/solid'


const TableCategories = (props) => {

    const [showSpinner, setShowSpinner] = useState(false);
    const [mostrarEditar, setMostrarEditar] = useState({show:false, id: 0});
    const [error, setError] = useState(null);

    const eliminar = (id) => {
        setShowSpinner(true);
        fetch(`https://long-lime-indri-wig.cyclic.cloud/Categories/${id}`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => response.json()
                .then(data => {
                    if (data && data.data) {
                        let cat = props.data;
                        let idx = props.data.findIndex(c => c._id == data.data._id);
                        if (idx > -1) {
                            cat.splice(idx, 1);
                            props.setCategory(cat);
                        }
                    }
                    setShowSpinner(false);
                })).catch(error => {
                    setError(error)
                    setShowSpinner(false);
                }
            );
    }

    const modificar = (id, nombre) => {
        let request = { name: nombre, image: 'http://imagen.ejemplo.com'};

        fetch(`https://long-lime-indri-wig.cyclic.cloud/Categories/${id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request),
            })
            .then(response => response.json()
                .then(data => {
                    if (data && data.data) {
                        let cat = [...props.data];
                        cat.forEach(categoria => {
                            if(categoria._id == data.data._id){
                                categoria.name = data.data.name;
                            }
                        });
                        props.setCategory(cat);
                    }
                    setMostrarEditar({show: false, id:0});
                    setShowSpinner(false);
                })).catch(error => {
                    setError(error)
                    setShowSpinner(false);
                    setMostrarEditar({show: false, id:0});
                }
            );
    }

    const updateCategory = (e, id) => {
        let categorias = [...props.data];
        categorias.forEach(cat => {
            if(cat._id == id) {
                cat.name = e.target.value;
            }
        })
        props.setCategory(categorias);
    }

    return (
        <table className="w-full bg-white">
            <thead>
                <tr>
                    <th className="border p-4">Nro.</th>
                    <th className="border p-4">Nombre</th>
                    <th className="border p-4">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((categoria, index) => (
                    <tr key={categoria._id}>
                        <td className="border p-4 text-center">{index + 1}</td>
                        <td className={`${mostrarEditar.show && mostrarEditar.id == categoria._id ? '' : 'hidden'} flex items-center justify-center border p-5 text-center`}>
                            <input type="text" value={categoria.name} onChange={(e) => updateCategory(e, categoria._id)} className="border rounded"/>
                            <PencilIcon className="ml-2 w-5 h-5"/>
                        </td>
                        <td className={`${mostrarEditar.id == categoria._id ? 'hidden' : ''} border text-center`}>{categoria.name}</td>
                        <td className="border p-4 text-center">
                            <button 
                                className={`${mostrarEditar.show ? 'hidden' : ''} bg-blue-500 text-white px-2 py-1 rounded gap-3`}
                                onClick={() => setMostrarEditar({show: true, id: categoria._id})}>
                                Editar
                            </button>
                            <button 
                                className={`${mostrarEditar.show && mostrarEditar.id == categoria._id ? '' : 'hidden'} ${showSpinner ? 'cursor-not-allowed' : ''} bg-blue-500 text-white px-2 py-1 rounded gap-3`}
                                onClick={() => modificar(categoria._id, categoria.name)}
                                disabled={showSpinner}>
                                Guardar
                            </button>
                            
                            <button 
                                className={`${mostrarEditar.show ? 'hidden' : ''} ${showSpinner ? 'cursor-not-allowed' : ''} bg-red-500 text-white px-2 py-1 rounded ml-2`} 
                                onClick={() => eliminar(categoria._id)}
                                required={showSpinner}>
                                    Eliminar
                            </button>
                            <button 
                                className={`${mostrarEditar.show && mostrarEditar.id == categoria._id ? '' : 'hidden'} ${showSpinner ? 'cursor-not-allowed' : ''} bg-red-500 text-white px-2 py-1 rounded ml-2`} 
                                onClick={() => setMostrarEditar({show:false, id: 0})}
                                required={showSpinner}>
                                    Cancelar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export { TableCategories }