import { useContext } from "react";
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
        <main>
            {renderView()}
        </main>
    </div>
  )
}

export { AdminDashboard }
