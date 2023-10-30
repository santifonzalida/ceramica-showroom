import { useContext } from "react"
import { Card } from "../../Components/Card"
import { Layout } from "../../Components/Layout"
import { ProductDetail } from "../../Components/ProductDetail";
import { ShoppingCartContext } from "../../Context";

function Home() {

  const context = useContext(ShoppingCartContext);

  const renderView = () => {
    if(context.searchByTitle?.length > 0) {
      if(context.filteredProducts?.length > 0){
        return(
          context.filteredProducts?.map((product) => (
            <Card key={product.id} data={product}/>
          ))
        )
      }else {
        return(
          <div>We dont have anything to show :(</div>
        )
      }
    }else {
      return (
        context.products?.map((product) => (
          <Card key={product._id} data={product}/>
        ))
      )
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
      <div className="grid grid-cols-2 md:gap-4 md:grid-cols-4 w-full max-w-screen-lg">
        {
          renderView()
        }
      </div>
      <ProductDetail />
    </Layout>
  )
}

export { Home }
