import { useState } from "react";

const CategoryCRUD = () => {

    const [mostrarCrear, setMostrarCrear] = useState(false);

    return (
        <div>
            <div className="bg-gray-100 font-sans">
                <div className="container mx-auto p-8">
                    
                    <div className="flex items-center mb-2" >
                        <h1 className="text-3xl font-semibold">Lista de Categorias</h1>
                        <button className="bg-blue-500 text-white px-2 py-1 ml-5 rounded" onClick={() => setMostrarCrear(true)} >Nueva</button>
                    </div>
                    
                    <div className={`${mostrarCrear ? '' : 'hidden'} row`}>
                        <div class="mx-auto p-8">
                            <label for="nombre" class="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
                            <input
                                id="nombre"
                                class="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Ingresa el nombre aquí" />
                                <button className="bg-blue-500 text-white px-2 py-1 ml-5 rounded">Guardar</button>
                                <button className="bg-red-500 text-white px-2 py-1 ml-5 rounded" onClick={() => setMostrarCrear(false)}>Cancelar</button>
                        </div>
                    </div>
                     
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="border p-4">ID</th>
                                <th className="border p-4">Nombre</th>
                                <th className="border p-4">Correo Electrónico</th>
                                <th className="border p-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border p-4">1</td>
                                <td className="border p-4">Juan Pérez</td>
                                <td className="border p-4">juan@example.com</td>
                                <td className="flex justify-center border p-4">
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded">Editar</button>
                                    <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

} 

export { CategoryCRUD };
