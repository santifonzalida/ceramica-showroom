import { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

const TableCategories = (props) => {

    const [showSpinner, setShowSpinner] = useState(false);
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
                        <td className="border p-4 text-center">{categoria.name}</td>
                        <td className="border p-4 text-center">
                            <button className="bg-blue-500 text-white px-2 py-1 rounded gap-3">Editar</button>
                            <button 
                                className={`${showSpinner ? 'cursor-not-allowed' : ''} bg-red-500 text-white px-2 py-1 rounded ml-2`} 
                                onClick={() => eliminar(categoria._id)}
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

export { TableCategories }