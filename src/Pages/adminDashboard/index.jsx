import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryCRUD } from "../../Components/Categories";
import { LoginContext } from "../../Context/loginContext";

function AdminDashboard() {
  
  const navigate = useNavigate();
  const context = useContext(LoginContext);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mt-20">
        <aside className="bg-blue-950 text-white w-64 h-screen fixed">
        <div className="p-4">
            <h1 className="text-2xl font-semibold">Configuracion</h1>
        </div>
        <ul className="mt-6">
            <li className="p-4 hover:bg-blue-700">Productos</li>
            <li className="p-4 hover:bg-blue-700">Categorias</li>
        </ul>
        </aside>

        <main className="ml-64 p-4">
            <CategoryCRUD />
        </main>
    </div>
  )
}

export { AdminDashboard }
