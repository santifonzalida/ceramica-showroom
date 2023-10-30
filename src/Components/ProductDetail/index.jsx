import { useContext } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context';
import './styles.css';

const ProductDetail = () => {
    const context = useContext(ShoppingCartContext);

    return (
        <aside className={`${context.isProductDetailOpen ? 'flex' : 'hidden'} product-detail  flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            <div className='flex justify-between items-center'>
                <h2 className='font-medium text-xl p-6'>Detail</h2>
                <div className='p-4'>
                    <XMarkIcon className='h-6 w-6 text-black cursor-pointer' onClick={context.closeProductDetail}></XMarkIcon>
                </div>
            </div>
            <figure className='px-6'>
                <img className='w-full h-full rounded-lg' 
                    src={context.selectedProduct.images ? context.selectedProduct.images[0].imageUrl : ''} 
                    alt={context.selectedProduct ? context.selectedProduct.name : ''} />
            </figure>
            <p className='flex flex-col p-6'>
                <span className='font-medium text-2xl mb-2'>${context.selectedProduct.price}</span>
                <span className='font-medium text-md'>{context.selectedProduct.name}</span>
                <span className='font-light text-sm'>{context.selectedProduct.description}</span>
            </p>
        </aside>
    );
}

export { ProductDetail };

