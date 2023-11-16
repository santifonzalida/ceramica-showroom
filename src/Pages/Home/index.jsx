import { useContext } from "react";
import { Spinner } from "../../Components/Common/Spinner";
import { Card } from "../../Components/Card";
import { Layout } from "../../Components/Layout";
import { ProductDetail } from "../../Components/ProductDetail";
import { ShoppingCartContext } from "../../Context";

function Home() {

  const context = useContext(ShoppingCartContext);

  const renderView = () => {
    if(context.searchByTitle?.length > 0) {
      if(context.filteredProducts?.length > 0){
        return(
          context.filteredProducts?.map((product) => (
            <div className="grid grid-cols-2 md:gap-4 md:grid-cols-4 w-full max-w-screen-lg">
              <Card key={product.id} data={product}/>
            </div>
          ))
        )
      }else {
        return(
          <div className="grid grid-cols-2 md:gap-4 md:grid-cols-4 w-full max-w-screen-lg">
            <div>We dont have anything to show :(</div>
          </div>
        )
      }
    }else {
      if(context.products && context.products.length > 0){
        return (
          <div className="grid grid-cols-2 md:gap-4 md:grid-cols-4 w-full max-w-screen-lg">
            {context.products?.map((product) => (
              <Card key={product._id} data={product}/> 
            ))}
          </div>
        )
        
      }else {
        return (
          <div className="grid grid-cols-1 md:gap-4 md:grid-cols-1 w-full max-w-screen-lg">
            <Spinner />
          </div>
        )
      }
      
    }
  }

  return (
    <Layout>
      <div className="flex items-center justify-center relativ w80 mb-4">
        <h1 className="font-medium text-xl">Exclusive Products</h1>
      </div>
      <input 
        type="text" 
        placeholder="Search a product" 
        className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
        onChange={(event) => context.setSearchByTitle(event.target.value)} />
        {
          renderView()
        }
      <ProductDetail />
    </Layout>
  )
}

export { Home }
