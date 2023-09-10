const TableCategories = (props) => {

    return ( 
        <table className="w-full bg-white">
            <thead>
                <tr>
                    <th className="border p-4">ID</th>
                    <th className="border p-4">Nombre</th>
                    <th className="border p-4">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((categoria) => (
                <tr key={categoria._id}>
                    <td className="border p-4 text-center">{categoria._id}</td>
                    <td className="border p-4 text-center">{categoria.name}</td>
                    <td className="border p-4 text-center">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded gap-3">Editar</button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded ml-2 ">Eliminar</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    );
}

export { TableCategories }