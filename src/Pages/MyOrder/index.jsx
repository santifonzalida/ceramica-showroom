import { useContext } from "react"
import { Link, useParams } from "react-router-dom";
import { Layout } from "../../Components/Layout"
import { ShoppingCartContext } from "../../Context";
import { OrderCard } from "../../Components/OrderCard";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";



function MyOrder() {
  const context = useContext(ShoppingCartContext);

  const params = useParams();
  let indexofOrder = Number(params.id);
  if(isNaN(indexofOrder)) indexofOrder = context.order?.length -1;

  return (
    <Layout>
      <div className="flex items-center justify-center relative w-80 mb-6">
          <Link to='/my-orders' className="absolute left-0">
            <ChevronLeftIcon className="h-6 w-6 text-black cursor-pointer" />
          </Link>
          <h1>My order</h1>
        </div>
      <div className='flex flex-col w-80'>
        {context.order?.[indexofOrder]?.products.map(product => (
            <OrderCard props={product} key={product.id} delete={null}/>
        ))}
      </div>
    </Layout>
  )
}
  
export { MyOrder }
  