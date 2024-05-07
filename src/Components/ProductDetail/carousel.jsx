import { Carousel, initTE } from "tw-elements";
import { useContext, useEffect } from "react";
import { ShoppingCartContext } from '../../Context';

const ImagesCarousel = () => {

    initTE({Carousel});

    const context = useContext(ShoppingCartContext);
    
    useEffect(() => {
        if (context.isProductDetailOpen) {
            setIndexImage(0);  
        }
    },[context.selectedProduct]);

    const setIndexImage = (index) => {
        const myCarouselEl = document.getElementById("carouselImageControls");
        const myCarousel = new Carousel(myCarouselEl);
        myCarousel.to(index);   
    }

    return (
        <div
            id="carouselImageControls"
            className="relative"
            data-te-carousel-init
            data-te-carousel-slide
            data-te-interval="false">
            {/* Carousel items */ }
            <div
                className="relative w-full md:h-96 max-h-96 overflow-hidden after:clear-both after:block after:content-[''] rounded-lg">
                {/* First item */ }
                <div
                    className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none aspect-w-16 aspect-h-9"
                    data-te-carousel-item
                    data-te-carousel-active>
                    <figure className="relative mb-2 w-full">
                        <img 
                            className='object-contain w-full rounded-lg' 
                            src={context.selectedProduct.images && context.selectedProduct.images.length > 0 ? context.selectedProduct.images[0].imageUrl : ''} 
                            alt="ProductImg_0"/> 
                    </figure>
                </div>
                {/* Second item */ }
                <div
                    className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none aspect-w-16 aspect-h-9"
                    data-te-carousel-item>
                    <figure className="relative mb-2 w-full h-4/5">
                        <img 
                            className='object-contain w-full h-full rounded-lg' 
                            src={context.selectedProduct.images && context.selectedProduct.images.length > 1 ? context.selectedProduct.images[1].imageUrl : ''} 
                            alt="ProductImg_1" /> 
                    </figure>
                </div>
                {/* Third item */ }
                {context.selectedProduct.images && context.selectedProduct.images.length == 3 ? 
                    <div
                        className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none aspect-w-16 aspect-h-9"
                        data-te-carousel-item>
                            <figure className="relative mb-2 w-full h-4/5">
                                <img 
                                    className='object-contain w-full h-full rounded-lg' 
                                    src={context.selectedProduct.images && context.selectedProduct.images.length > 2 ? context.selectedProduct.images[2].imageUrl : ''} 
                                    alt="ProductImg_2" /> 
                            </figure>
                    </div>
                    : ''
                }
                
            </div>
            { context.selectedProduct.images && context.selectedProduct.images.length > 1 ?  
                (<>
                    <button
                        className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                        type="button"
                        data-te-target="#carouselImageControls"
                        data-te-slide="prev">
                        <span className="inline-block h-8 w-8">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </span>
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Anterior</span>
                    </button>
                    <button
                        className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                        type="button"
                        data-te-target="#carouselImageControls"
                        data-te-slide="next">
                        <span className="inline-block h-8 w-8">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </span>
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Siguiente</span>
                    </button>
                </>) : ''
            }
        </div>
    )
}

export { ImagesCarousel }