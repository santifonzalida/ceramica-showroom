import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Modal } from "../Common/Modal";
import { useLocalStorage } from "../../Context/useLocalStorage";

const TableProducts = ({products, setProducts, setSelectedProduct, setMostrarCrear})=> {

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
    <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b bg-white font-medium">
                            <tr>
                                <th scope="col" className="px-6 py-4">#</th>
                                <th scope="col" className="px-6 py-4">Nombre</th>
                                <th scope="col" className="px-6 py-4 float-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((producto, index) => (
                                <tr key={producto._id} className={`${index %2 == 0 ? 'bg-neutral-200' : 'bg-neutral-300'} `}>
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4">{producto.name}</td>
                                    <td className="px-6 py-4 gap-4 flex float-right">
                                        <PencilIcon className="h-5 w-5 cursor-pointer" onClick={() => {
                                            setSelectedProduct(producto);
                                            setMostrarCrear(true);
                                        }}/>
                                        <TrashIcon className="h-5 w-5 cursor-pointer" onClick={() => handleEliminar(producto._id)}/>
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
            </div>
        </div>
    </div>
    );

    
}

export { TableProducts };
