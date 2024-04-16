import { useContext } from "react";
import { CategoryCRUD } from "../../Components/Categories";
import { ProductsCRUD } from "../../Components/Products";
import { Users } from '../../Components/Users';
import { ShoppingCartContext } from "../../Context/index";
import { Statistics } from "../../Components/Statistics";

function AdminDashboard() {
  
  const context = useContext(ShoppingCartContext);

  const renderView = () => {

    if(context.dashboardView == 'Products'){
      return <ProductsCRUD />;
    } else if(context.dashboardView == 'Categories') {
      return <CategoryCRUD />;
    } else if(context.dashboardView == 'Users'){
      return <Users />;
    } else if (context.dashboardView == 'Statistics') {
      return <Statistics />;
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
