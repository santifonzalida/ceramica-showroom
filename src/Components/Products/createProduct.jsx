import { useState, useEffect } from "react";
import { CheckIcon, ArrowPathIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useLocalStorage } from '../../Context/useLocalStorage';
const CreateProduct = ({setMostrarCrear, products, setProducts}) => {

    const localStorage = useLocalStorage();
    const [producto, setProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        images: [],
        idCategoria: ''
      });
      const [imagenesError, setImagenesError] = useState([null, null, null])
      const [imagenes, setImagenes] = useState(['', '', '']);
      const [isImageLoading, setIsImageLoading] = useState([false, false, false]);
      const [isLoading, setIsLoading] = useState(false);
      const [categorias, setCategorias] = useState([]);
      const [error, setError] = useState({status: false, message: ''});

      useEffect(() => {
        fetch(
            'https://tame-ruby-rhinoceros-cap.cyclic.app/Categories', {method: 'GET',headers: { 'Content-Type': 'application/json ' }})
            .then(response => response.json()
            .then(data => {
                if(data.data.length > 0){
                    setCategorias(data.data);
                }
            })).catch(error => {
                setCategorias([]);
                throw new Error("No se pudo obtener las categorias.") 
            });
    },[])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({
            ...producto,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const userStorage = localStorage.getItem('user');

        let request = { 
            name: producto.nombre,
            description: producto.descripcion,
            price: producto.precio,
            stock: producto.stock,
            images: producto.images,
            category: producto.idCategoria
        }

        if(request.images.length == 0){
            setError({status: true, message: 'Debe agregar al menos una imagen.'});
            setIsLoading(false);
            window.scrollTo({ top: 0, left:0, behavior: 'smooth' });
            return;
        }

        fetch('https://tame-ruby-rhinoceros-cap.cyclic.app/Products', 
            {
                method: 'POST', 
                body: JSON.stringify(request),
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userStorage.access_token}` },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Se produjo un error al guardar el producto.')
                }
                return response.json();
            })
            .then(data => {
                let productos = [...products];
                let newProduct = data.data;
                productos.push(newProduct);
                setProducts(productos);
                setMostrarCrear(false);
                setIsLoading(false)
                resetProduct();
            }).catch(error => {
                console.log(error);
                setIsLoading(false);
            }
        );

    };

    const handleImagenChange = (e, index) => {
      const {size, type, name} = e.target.files[0];
      if ((size / (1024 * 1024)) <= 2){
        if (size && type && name) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const nuevasImagenes = [...imagenes];
                nuevasImagenes[index] = event.target.result;
                setImagenes(nuevasImagenes);
                const imageB64 = event.target.result.split(',')[1];
                guardarImagen( imageB64, name, type, size, index);
            };
            reader.readAsDataURL(e.target.files[0]);
          }
      }else {
        const newImagenesError = [...imagenesError];
        newImagenesError[index] = {message: 'La imagen seleccionada supera los 2MB.'};
        setImagenesError(newImagenesError);
      }
    };

    const resetStates = (index) => {
        const newImagenesError = [...imagenesError];
        newImagenesError[index] = null;
        setImagenesError(newImagenesError);

        const loadingArray = [...isImageLoading];
        loadingArray[index] = true;
        setIsImageLoading(loadingArray);
    }

    const resetProduct = () => {
        setProducto({
            nombre: '',
            descripcion: '',
            precio: '',
            stock: '',
            images: [],
            idCategoria: ''
          });
        setImagenes(['', '', '']);
        setImagenesError([null, null, null]);
    }

    const guardarImagen = (imageB64, nombre, extension, size, productIndex) => {
        resetStates(productIndex);
        let request = {data: imageB64, name: nombre, extention: extension, size: size};
        const userStorage = localStorage.getItem('user');
        
        fetch('https://tame-ruby-rhinoceros-cap.cyclic.app/Firebase/guardarImagenes', 
            {
                method: 'POST', 
                body: JSON.stringify(request),
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userStorage.access_token}` },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Se produjo un error al subir el archivo.')
                }
                return response.json()
            })
            .then(data => {
                const newProduct = {...producto};
                const newImage = { name: nombre, imageUrl: data.data[0], extention: extension, size: size };
                newProduct.images.push(newImage);
                setProducto(newProduct);
                
                const loadingArray = [...isImageLoading];
                loadingArray[productIndex] = false;
                setIsImageLoading(loadingArray);
            }).catch(error => {
                const newImagenesError = [...imagenesError];
                newImagenesError[productIndex] = error;
                setImagenesError(newImagenesError);

                const loadingArray = [...isImageLoading];
                loadingArray[productIndex] = false; 
                setIsImageLoading(loadingArray);
            }
        );
    }    

    const cancelarGuardar = () => {
        setError({status: false, message: ''});
        resetProduct();
        setMostrarCrear(false);
    }

    return (
        <div className="mx-auto p-2">

            { error.status ? 
                <div
                    className="flex mb-4 rounded-lg bg-danger-100 px-6 py-5 text-base text-danger-700"
                    role="alert">{error.message}
                    <button
                        type="button"
                        className="ml-auto box-content rounded-none border-none p-1 text-warning-900 opacity-50"
                        data-te-alert-dismiss
                        aria-label="Close"
                        onClick={() => setError({status: false, message: ''})}>
                        <span
                        className="w-[1em]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-6 w-6">
                            <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd" />
                        </svg>
                        </span>
                    </button>
                </div>
                : ''
            }
            
            <h1 className="text-lg md:text-xl font-semibold mb-4">Agregar Producto</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                        Nombre
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={producto.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
                        Descripción
                    </label>
                    <textarea
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        id="descripcion"
                        name="descripcion"
                        value={producto.descripcion}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="idCategoria">
                        Categoria
                    </label>
                    <select
                        id="idCategoria"
                        name="idCategoria"
                        className="w-full px-4 py-2 border rounded-md shadow-sm"
                        value={producto.idCategoria}
                        onChange={handleChange}
                        required
                    >
                    <option value="">Seleccione una categoria</option>
                        {
                            categorias.map((categoria, index) => (
                                <option key={index} value={categoria._id}>
                                    {categoria.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
                        Selección de imágenes
                    </label>
                    <div className="bg-gray-100 p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {imagenes.map((imagen, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg border border-gray-300 flex flex-col items-center justify-center">
                                {imagen ? (
                                    <figure className="relative mb-2 w-full h-4/5">
                                        <img src={imagen} alt={`Imagen ${index}`} className="w-full h-full object-cover rounded-lg"/>
                                        <div className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1" >
                                            <CheckIcon className={`${imagenesError[index] || isImageLoading[index] ? 'hidden' : ''} h-6 w-6 text-green-600`}></CheckIcon>
                                            <ArrowPathIcon className={`${isImageLoading[index] ? 'animate-spin' : 'hidden'} h-6 w-6 text-black"`}></ArrowPathIcon>
                                            <XCircleIcon className={`${imagenesError[index] ? '' : 'hidden'} h-6 w-6 fill-red-700 cursor-pointer`}></XCircleIcon>
                                        </div>
                                    </figure>
                                ) : (
                                <div className="text-4xl text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImagenChange(e, index)}
                                    className="hidden"
                                    id={`imagenInput-${index}`}
                                />
                                <label className={`${imagenesError[index] ? '' : 'hidden'} text-red-600 mt-2`}>
                                    <small>
                                        {imagenesError[index] ? imagenesError[index].message : ''}
                                    </small>
                                </label>
                                <label htmlFor={`imagenInput-${index}`} className="mt-2 cursor-pointer text-black">
                                    Cargar Imagen
                                </label>
                            </div>
                            ))}
                        </div>
                    </div>

                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
                        Precio
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        type="text"
                        id="precio"
                        name="precio"
                        value={producto.precio}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                        Stock
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        type="text"
                        id="stock"
                        name="stock"
                        value={producto.stock}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="grid grid-cols-2">
                {
                    isLoading 
                        ? <button className="flex cursor-not-allowed disabled bg-black text-white font-bold py-2 px-4 rounded">Agregar producto<ArrowPathIcon className='flex h-5 w-5 ml-2 mt-1 animate-spin'/></button>
                        : <button className={` ${isImageLoading.some(x => x) ? 'cursor-not-allowed disabled' : ''} bg-black text-white font-bold py-2 px-4 rounded`}
                            type="submit" >Agregar Producto </button>
                }
                    <button 
                        className={`${isImageLoading.some(x => x) ? 'cursor-not-allowed disabled' : ''} bg-black text-white font-bold py-2 px-4 rounded ml-5`}
                        onClick={cancelarGuardar}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export { CreateProduct };