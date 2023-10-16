import { useState } from "react";
import { Modal } from "../Modal";

const TableProducts = ({products})=> {
    const [showSpinner, setShowSpinner] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    const handleEliminar = (productId) => {
        setShowModal(true);
        const product = products.find(p => p._id == productId);
        if(product){
            setProductoSeleccionado(product);
        }else {
            setError('no se encontro el producto seleccionado');
            console.error(error);
        }
        
      };

    const handleConfirmEliminar = () => {
        setShowModal(false);
    };

    const handleCancelarEliminar = () => {
    // Aquí, simplemente cierra el modal
    setShowModal(false);
    };

    return (
        <div>
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
                                    onClick={() => handleEliminar(producto._id)}
                                    required={showSpinner}>
                                        Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal
                isOpen={showModal}
                message={`¿Estás seguro de que deseas eliminar el producto ${productoSeleccionado ? productoSeleccionado.name : ''}?`}
                onCancel={handleCancelarEliminar}
                onConfirm={handleConfirmEliminar}
            />
        </div>
        
    );
}

export { TableProducts };
