import { useContext, useEffect, useRef, useState } from 'react';
import { XMarkIcon, HeartIcon, StarIcon as StarIconOutline } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid, StarIcon} from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';
import { LoginContext } from '../../Context/loginContext';
import { ImagesCarousel } from './carousel';
import './styles.css';

const ProductDetail = () => {
    const context = useContext(ShoppingCartContext);
    const contextUser = useContext(LoginContext)
    const [selectedImagen, setSelectedImagen] = useState('');
    const contentRef = useRef(null);

    useEffect(() => {
        contentRef.current.scrollTo({ top: 0, behavior: 'smooth', });
    },[context.selectedProduct])

    const setShowImage = (index) => {
        setSelectedImagen(index);
        contentRef.current.scrollTo(
            {
                top: 0,
                behavior: 'smooth',
            }
        );
    }

    const guardarProducto = (idProduct) => {

        if(!contextUser.user || !idProduct) {
            return;
        }

        let productsLikes = contextUser.user.productsLikes ? [...contextUser.user.productsLikes] : [];
        if(productsLikes.some(x => x == idProduct)) return;

        let user = contextUser.user;
        productsLikes.push(idProduct);
        user.productsLikes = productsLikes;
        contextUser.setUser({...user});

        contextUser.updateUserInformation();
    }

    const mostrarEtiquetaNuevo = ( cantDias ) => {
        
        if(!cantDias || !context.selectedProduct || !context.selectedProduct.created) return;
        
        let fechaProducto = new Date(context.selectedProduct.created);
        let fechaActual = new Date();

        const diferenciaMilisegundos = fechaActual - fechaProducto;
        const diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);

        if (diferenciaDias < cantDias) {
            return true;
        } else { 
            return false;
        }
    }

    return (
        <aside className={`${context.isProductDetailOpen ? 'flex' : 'hidden'} product-detail flex-col fixed right-0 border border-black rounded-lg bg-white z-10`}>
            <div className='flex justify-between items-center'>
                <h2 className='font-medium text-xl p-4'>Detalle</h2>
                <div className='p-4'>
                    <XMarkIcon className='h-6 w-6 text-black cursor-pointer' onClick={context.closeProductDetail}></XMarkIcon>
                </div>
            </div>
            <div ref={contentRef} className="max-w-6xl px-4 mx-auto lg:py-8 md:px-6">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full px-4 md:w-1/2 ">
                        <div className="sticky top-0 z-50">
                            <div className="relative mb-1 lg:mb-10 lg:h-2/4 ">
                                <ImagesCarousel selectedImagenIndex={selectedImagen}/>
                            </div>
                            <div className="flex-wrap hidden md:flex ">
                                {context.selectedProduct.images?.map((img, index) => (
                                    <div className="w-1/2 p-2 sm:w-1/4" key={img.imageUrl}>
                                    <a href="#"
                                        className="block border rounded-lg">
                                        <img 
                                            src={img.imageUrl} 
                                            alt={img.name}
                                            className="object-cover w-full lg:h-20 rounded-lg"
                                            onClick={() => setShowImage(index)}
                                            />
                                    </a>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2 ">
                        <div className="lg:pl-20">
                            <div className="mb-8">
                                <div className='flex justify-between items-center mb-1'>
                                    <h2 className="max-w-xl text-2xl font-bold text-gray-800 md:text-4xl gap-2">
                                        {context.selectedProduct.name}
                                        {
                                            mostrarEtiquetaNuevo(10) ?  <span className="pt-1 text-xs font-medium text-rose-500">Nuevo</span> : ''
                                        }
                                    </h2>
                                    {
                                        contextUser.user?.productsLikes && contextUser.user.productsLikes.some(x => x == context.selectedProduct._id) ? 
                                        <HeartIconSolid className='h-7 w-7 mr-4'/> :
                                        <HeartIcon className='h-7 w-7 cursor-pointer mr-4' onClick={() => guardarProducto(context.selectedProduct._id)}/>
                                    }
                                </div>
                                <p className="text-gray-700 mr-4">
                                    {context.selectedProduct.description ? context.selectedProduct.description : 'Sin descripción'}
                                </p>
                                <p className="text-gray-700 text-sm">
                                    <span>${context.selectedProduct.price ? context.selectedProduct.price : 'N/A'}</span>
                                </p>
                                <div className='flex items-center'>
                                   <StarIcon className='h-4 w-4'/><StarIcon className='h-4 w-4'/><StarIcon className='h-4 w-4'/><StarIcon className='h-4 w-4'/><StarIconOutline className='h-4 w-4'/> / reviews
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export { ProductDetail };

