import { useState, useContext } from "react";
import { CategoryCRUD } from "../../Components/Categories";
import { ProductsCRUD } from "../../Components/Products";
import { ShoppingCartContext } from "../../Context/index";

function AdminDashboard() {
  
  const context = useContext(ShoppingCartContext);

  const renderView = () => {
    if(context.productoDashboard){
      return <ProductsCRUD />;
    } else if(context.categoriaDashboard) {
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
            <li className="p-4 hover:bg-blue-700" >Productos</li>
            <li className="p-4 hover:bg-blue-700" >Categorias</li>
        </ul>
        </aside>

        <main className="ml-64 p-4">
            {renderView()}
        </main>
    </div>
  )
}

export { AdminDashboard }
