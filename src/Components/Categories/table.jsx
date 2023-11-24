import { useState } from "react";
import { useLocalStorage } from "../../Context/useLocalStorage";
import { PencilIcon } from '@heroicons/react/24/solid'
import { Modal } from "../Common/Modal";

const TableCategories = (props) => {

    const localStorage = useLocalStorage();
    const [showSpinner, setShowSpinner] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [mostrarEditar, setMostrarEditar] = useState({show:false, id: 0});
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [error, setError] = useState(null);

    const handleConfirmEliminar = () => {
        setShowSpinner(true);
        const userStorage = localStorage.getItem('user');
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${userStorage.access_token}`
            },
        };

        fetch(`https://tame-ruby-rhinoceros-cap.cyclic.app/Categories/${categoriaSeleccionada._id}`, requestOptions)
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
                    setShowModal(false);
                })).catch(error => {
                    setError(error)
                    setShowSpinner(false);
                }
            );
    }

    const modificar = (id, nombre) => {
        const userStorage = localStorage.getItem('user');
        let request = { name: nombre, image: 'http://imagen.ejemplo.com'};

        fetch(`https://tame-ruby-rhinoceros-cap.cyclic.app/Categories/${id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userStorage.access_token}`},
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

    const handleEliminar = (categoriaId) => {
        setShowModal(true);
        const cat = props.data.find(categoria => categoria._id == categoriaId);
        if(cat){
            setCategoriaSeleccionada(cat);
        }else {
            setError('no se encontro la categoria seleccionada.');
            console.error(error);
        }
    };
    
    const handleCancelarEliminar = () => {
        setShowModal(false);
    }

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
                                onClick={() => handleEliminar(categoria._id)}
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
        <Modal
            isOpen={showModal}
            title={`¿Estás seguro de que deseas eliminar la categoria ${categoriaSeleccionada ? categoriaSeleccionada.name : ''}?`}
            message={'Al confirmar se eliminara definitivamente la categoria.'}
            onCancel={handleCancelarEliminar}
            onConfirm={handleConfirmEliminar}
            showSpinner={showSpinner}
        />
    </div>
    );
}

export { TableCategories }