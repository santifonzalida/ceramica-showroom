import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryCRUD } from "../../Components/Categories";
import { ProductsCRUD } from "../../Components/Products";
import { LoginContext } from "../../Context/loginContext";

function AdminDashboard() {
  
  const [showProducts, setShowProducts] = useState(true);

  const renderView = () => {
    if(showProducts){
      return <ProductsCRUD />;
    } else {
      return <CategoryCRUD />
    }
  }

  return (
    <div className="mt-20">
        <aside className="bg-blue-950 text-white w-64 h-screen fixed">
        <div className="p-4">
            <h1 className="text-2xl font-semibold">Configuracion</h1>
        </div>
        <ul className="mt-6">
            <li className="p-4 hover:bg-blue-700" onClick={() => setShowProducts(true)}>Productos</li>
            <li className="p-4 hover:bg-blue-700" onClick={() => setShowProducts(false)}>Categorias</li>
        </ul>
        </aside>

        <main className="ml-64 p-4">
            {renderView()}
        </main>
    </div>
  )
}

export { AdminDashboard }
