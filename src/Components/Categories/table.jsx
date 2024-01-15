import { useState } from "react";
import { useLocalStorage } from "../../Context/useLocalStorage";
import { PencilIcon, TrashIcon, XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
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
        setShowSpinner(true);
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
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b bg-white font-medium">
                                <tr>
                                    <th scope="col" className="px-6 py-4">#</th>
                                    <th scope="col" className="py-4">Nombre</th>
                                    <th scope="col" className="px-6 py-4 float-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.data.map((categoria, index) => (
                                    <tr key={categoria._id} className={`${index %2 == 0 ? 'bg-neutral-200' : 'bg-neutral-300'}`}>
                                        <td className="px-6 py-4">{index + 1}</td>

                                        <td className={`${mostrarEditar.show && mostrarEditar.id == categoria._id ? '' : 'hidden'} flex items-center justify-center p-5`}>
                                            <input type="text" value={categoria.name} onChange={(e) => updateCategory(e, categoria._id)} className="rounded"/>
                                            <PencilIcon className="ml-2 w-5 h-5"/>
                                        </td>
                                        <td className={`${mostrarEditar.id == categoria._id ? 'hidden' : ''}`}>{categoria.name}</td>

                                        <td className="flex float-right items-center justify-center gap-4 p-4">
                                            <PencilIcon className={`${mostrarEditar.show ? 'hidden' : ''} h-5 w-5 cursor-not-allowed`} onClick={() => setMostrarEditar({show: true, id: categoria._id})}/>
                                            <TrashIcon className={`${mostrarEditar.show ? 'hidden' : ''} ${showSpinner ? 'cursor-not-allowed' : ''} h-5 w-5 cursor-pointer`} onClick={() => handleEliminar(categoria._id)}/>
                                            
                                            <div className="flex gap-4">
                                                <CheckCircleIcon 
                                                    className={`${mostrarEditar.show && mostrarEditar.id == categoria._id ? '' : 'hidden'} ${showSpinner ? 'cursor-not-allowed' : ''} text-black h-7 w-7 cursor-pointer` }
                                                    onClick={() => modificar(categoria._id, categoria.name)}
                                                    disabled={showSpinner}/>
                                            
                                                <XCircleIcon 
                                                    className={`${mostrarEditar.show && mostrarEditar.id == categoria._id ? '' : 'hidden'} ${showSpinner ? 'cursor-not-allowed' : ''} text-black h-7 w-7 cursor-pointer`}
                                                    onClick={() => setMostrarEditar({show:false, id: 0})} 
                                                    required={showSpinner}/>
                                            </div>
                                            
                                        </td>
                                        <td className={`${!mostrarEditar.show ? 'hidden' : ''}`}></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
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