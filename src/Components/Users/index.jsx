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

        setShowSpinner(true);
        const userStorage = localStorage.getItem('user');

        fetch('https://tame-ruby-rhinoceros-cap.cyclic.app/users/' + selectedUser._id, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${userStorage.access_token}`
            }})
            .then(response => response.json()
            .then(data => {
                if(data && data.statusCode == 401) {
                    localStorage.saveItem('user', {});
                    localStorage.saveItem('userInfo', {});
                    navigate('/login');
                }else if(data.data){
                    let newUserList = [...users];
                    let idx = newUserList.findIndex(u => u._id == data.data._id);
                    if (idx > -1) {
                        newUserList.splice(idx, 1);
                        setUsers(newUserList);
                    }
                    setShowDeleteModal(false);
                }
                setShowSpinner(false);
            })).catch(error => {
                setUsers(null);
                setShowSpinner(false);
                throw new Error("No se pudo eliminar el usuario seleccionado.") 
            });
    }

    return(
        <div className="bg-gray-100">
        { showSpinner ? <Spinner/> : 
            <div className="mx-auto">
                <div className="grid grid-cols-2 items-center mb-2 p-4">
                    <h1 className="text-sm md:text-xl font-semibold">Listado de usuarios</h1>
                </div>
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b bg-white font-medium">
                                <tr>
                                    <th scope="col" className="px-3 py-4">#</th>
                                    <th scope="col" className="py-4">Nombre</th>
                                    <th scope="col" className="py-4">Creado</th>
                                    <th scope="col" className="text-center">Rol</th>
                                    <th scope="col" className="px-6 py-4 float-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((user, index) => (
                                    <tr key={user._id} className={`${index %2 == 0 ? 'bg-neutral-200' : 'bg-neutral-300'}`}>
                                        <td className="px-3 py-4">{index + 1}</td>
                                        <td>{ user.email }</td>
                                        <td>{ new Date(user.created).toLocaleDateString() }</td>
                                        <td className="pl-6">{user.role}</td>
                                        <td className="flex items-center justify-center gap-4 p-4">
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