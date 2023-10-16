import { useState } from "react";
import { PencilIcon } from '@heroicons/react/24/solid'

const TableProducts = ({products})=> {

    const [showSpinner, setShowSpinner] = useState(false);
    const [mostrarEditar, setMostrarEditar] = useState({show:false, id: 0});
    const [error, setError] = useState(null);

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
                {products.map((producto, index) => (
                    <tr key={producto._id}>
                        <td className="border p-4 text-center">{index + 1}</td>
                        <td className="border text-center">{producto.name}</td>
                        <td className="border p-4 text-center">
                            <button 
                                className="bg-blue-500 text-white px-2 py-1 rounded gap-3">
                                Editar
                            </button>
                            
                            <button 
                                className="bg-red-500 text-white px-2 py-1 rounded ml-2" 
                                
                                required={showSpinner}>
                                    Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export { TableProducts };
