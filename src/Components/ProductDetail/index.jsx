import { useContext, useEffect, useRef, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context';
import { ImagesCarousel } from './carousel';
import './styles.css';

const ProductDetail = () => {
    const context = useContext(ShoppingCartContext);
    const [selectedImagen, setSelectedImagen] = useState('');
    const contentRef = useRef(null);

    useEffect(() => {
        if(context.selectedProduct){
            setSelectedImagen(context.selectedProduct.images ? context.selectedProduct.images[0] : '');
        }
    },[context.selectedProduct])

    const setShowImage = (img) => {
        setSelectedImagen(img);
        contentRef.current.scrollTo(
            {
                top: 0,
                behavior: 'smooth',
            }
        );
    }

    return (
        <aside className={`${context.isProductDetailOpen ? 'flex' : 'hidden'} product-detail flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            <div className='flex justify-between items-center'>
                <h2 className='font-medium text-xl p-6'>Detail</h2>
                <div className='p-4'>
                    <XMarkIcon className='h-6 w-6 text-black cursor-pointer' onClick={context.closeProductDetail}></XMarkIcon>
                </div>
            </div>
            <div ref={contentRef} className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6 overflow-scroll">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full px-4 md:w-1/2 ">
                        <div className="sticky top-0 z-50 overflow-hidden ">
                            <div className="relative mb-6 lg:mb-10 lg:h-2/4 ">
                                <ImagesCarousel />
                            </div>
                            <div className="flex-wrap hidden md:flex ">
                                {context.selectedProduct.images?.map(img => (
                                    <div className="w-1/2 p-2 sm:w-1/4" key={img.imageUrl}>
                                    <a href="#"
                                        className="block border border-sky-300 dark:border-transparent dark:hover:border-sky-300 hover:border-sky-300 rounded-lg">
                                        <img 
                                            src={img.imageUrl} 
                                            alt={img.name}
                                            className="object-cover w-full lg:h-20 rounded-lg"
                                            onClick={() => setShowImage(img)}
                                            />
                                    </a>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2 ">
                        <div className="lg:pl-20">
                            <div className="mb-8 ">
                                <span className="text-lg font-medium text-rose-500">New</span>
                                <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold md:text-4xl">
                                    {context.selectedProduct.name}
                                </h2>
                                <div className="flex items-center mb-6">
                                    <ul className="flex mr-2">
                                        <li>
                                            <a href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor"
                                                    className="w-4 mr-1 text-gray-400 bi bi-star "
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                </svg>
                                            </a>
                                        </li>
                                    </ul>
                                    <p className="text-xs">(2 customer reviews)</p>
                                </div>
                                <p className="max-w-md mb-8 text-gray-700 ">
                                    {context.selectedProduct.description ? context.selectedProduct.description : 'Sin descripción'}
                                </p>
                                <p className="inline-block mb-8 text-4xl font-bold text-gray-700 ">
                                    <span>${context.selectedProduct.price}</span>
                                </p>
                                <p className="text-green-600 ">{context.selectedProduct.stock} en stock</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export { ProductDetail };

