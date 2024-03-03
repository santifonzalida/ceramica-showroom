import { useEffect, useState } from "react";
import { Modal } from "../Common/Modal";
import { TrashIcon } from '@heroicons/react/24/solid';
import { useLocalStorage } from "../../Context/useLocalStorage";
import { Spinner} from "../Common/Spinner";

const Users = () => {
    const [users, setUsers] = useState(null);
    const [showSpinner, setShowSpinner] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const localStorage = useLocalStorage();

    useEffect(() => {
        setShowSpinner(true);
        const userStorage = localStorage.getItem('user');

        fetch('https://tame-ruby-rhinoceros-cap.cyclic.app/users', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${userStorage.access_token}`
            }})
            .then(response => response.json()
            .then(data => {
                if(data.data.length > 0){
                    setUsers(data.data);
                }
                setShowSpinner(false);
            })).catch(error => {
                setUsers(null);
                setShowSpinner(false);
                throw new Error("No se pudo obtener los usuarios.") 
            });
    },[]);

    const handleEliminar = (mongoId) => {
        const userSelected = users.find((u) => u._id == mongoId);
        setSelectedUser(userSelected);
        setShowDeleteModal(true);
    }

    const handleCancelarEliminar = () => {
        setShowDeleteModal(false);
    }

    const handleConfirmEliminar = () => {
        console.log('se elimina usuario' + selectedUser.fullName);
    }

    return(
        <div className="flex flex-col bg-gray-100">
        { showSpinner ? <Spinner/> : 
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <h1 className="text-sm md:text-xl font-semibold m-4 pl-4">Listado de usuarios</h1>
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b bg-white font-medium">
                                <tr>
                                    <th scope="col" className="px-6 py-4">#</th>
                                    <th scope="col" className="py-4">Nombre</th>
                                    <th scope="col" className="py-4">Creado</th>
                                    <th scope="col" className="py-4">Rol</th>
                                    <th scope="col" className="px-6 py-4 float-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((user, index) => (
                                    <tr key={user._id} className={`${index %2 == 0 ? 'bg-neutral-200' : 'bg-neutral-300'}`}>
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td>{ user.email }</td>
                                        <td>{ new Date(user.created).toLocaleDateString() }</td>
                                        <td>{user.role}</td>
                                        <td className="flex float-right items-center justify-center gap-4 p-4">
                                            <TrashIcon className={`${showSpinner ? 'cursor-not-allowed' : ''} h-5 w-5 cursor-pointer`} onClick={() => handleEliminar(user._id)}/>                                            
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        }
        <Modal
            isOpen={showDeleteModal}
            title={`¿Estás seguro de que deseas eliminar la cuenta ${selectedUser ? selectedUser.fullName : ''}?`}
            message={'Al confirmar se eliminara definitivamente el usuario.'}
            onCancel={handleCancelarEliminar}
            onConfirm={handleConfirmEliminar}
            showSpinner={showSpinner}
        />
    </div>
    );
}

export { Users }