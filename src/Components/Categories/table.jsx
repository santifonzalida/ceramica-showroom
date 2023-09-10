const TableCategories = () => {
    return ( 
        <table className="min-w-full bg-white">
            <thead>
                <tr>
                    <th className="border p-4">ID</th>
                    <th className="border p-4">Nombre</th>
                    <th className="border p-4">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border p-4">1</td>
                    <td className="border p-4">Juan Pérez</td>
                    <td className="flex justify-center border p-4">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded">Editar</button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export { TableCategories }