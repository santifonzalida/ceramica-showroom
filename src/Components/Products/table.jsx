import { useState } from "react";
import { Modal } from "../Common/Modal";
import { useLocalStorage } from "../../Context/useLocalStorage";

const TableProducts = ({products, setProducts})=> {
    const localStorage = useLocalStorage();
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
        setShowSpinner(true);
        let request = { productId: productoSeleccionado._id };
        const userStorage = localStorage.getItem('user');

        fetch('https://tame-ruby-rhinoceros-cap.cyclic.app/Products', 
            {
                method: 'DELETE', 
                body: JSON.stringify(request),
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userStorage.access_token}` },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Se produjo un error al eliminar el producto.')
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                let p = [...products];
                let index = p.findIndex(product => product._id == productoSeleccionado._id);
                if(index > -1) {
                    p.splice(index,1);
                    setProducts(p);
                }
                setShowSpinner(false);
                setShowModal(false);
            }).catch(error => {
                console.log(error);
                setShowSpinner(false);
                setShowModal(false);
            }
        );
    };

    const handleCancelarEliminar = () => {
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
                                    className="bg-blue-500 text-white px-2 py-1 rounded gap-3 cursor-not-allowed" disabled>
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
                title={`¿Estás seguro de que deseas eliminar el producto ${productoSeleccionado ? productoSeleccionado.name : ''}?`}
                message={'Al confirmar se eliminaran todas las imagenes asociadas.'}
                onCancel={handleCancelarEliminar}
                onConfirm={handleConfirmEliminar}
                showSpinner={showSpinner}
            />
        </div>
        
    );
}

export { TableProducts };
