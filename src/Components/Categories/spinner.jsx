const Spinner = () => {
    return (
        <div className="shadow rounded-md w-full">
            <div className="animate-pulse flex space-x-4">
                <table className="w-full bg-white">
                    <thead>
                        <tr>
                            <th className="border p-4">ID</th>
                            <th className="border p-4">Nombre</th>
                            <th className="border p-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="3" className="text-center p-5">Cargando...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export { Spinner }