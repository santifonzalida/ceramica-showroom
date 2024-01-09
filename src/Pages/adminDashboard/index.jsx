import { useContext, useEffect } from "react";
import { CategoryCRUD } from "../../Components/Categories";
import { ProductsCRUD } from "../../Components/Products";
import { ShoppingCartContext } from "../../Context/index";
import { LoginContext } from "../../Context/loginContext";


function AdminDashboard() {
  
  const context = useContext(ShoppingCartContext);
  const loginContext = useContext(LoginContext)

  useEffect(() => {
    loginContext.getUserInfo().then((data) => {
      if (data.statusCode == 401) {
        loginContext.setIsUserLogin(false);
        loginContext.setError(data.message);
      } else {
        loginContext.setUser(data.data);
        loginContext.setIsUserLogin(true);
      }
      loginContext.setIsLoading(false);
    });
  },[])

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
