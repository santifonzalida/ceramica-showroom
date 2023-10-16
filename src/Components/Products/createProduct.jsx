import { useState, useEffect } from "react";
import { CheckIcon, ArrowPathIcon, XCircleIcon } from '@heroicons/react/24/solid';

const CreateProduct = ({setMostrarCrear}) => {

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
      const [categorias, setCategorias] = useState([]);

      useEffect(() => {
        fetch(
            'https://long-lime-indri-wig.cyclic.cloud/Categories', {method: 'GET',headers: { 'Content-Type': 'application/json ' }})
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

        let request = { 
            name: producto.nombre,
            description: producto.descripcion,
            price: producto.precio,
            stock: producto.stock,
            images: producto.images,
            category: producto.idCategoria
        }

        fetch('https://long-lime-indri-wig.cyclic.cloud/Products', 
            {
                method: 'POST', 
                body: JSON.stringify(request),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Se produjo un error al guardar el producto.')
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            }).catch(error => {
                console.log(error);
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


    const guardarImagen = (imageB64, nombre, extension, size, productIndex) => {
        
        resetStates(productIndex);

        let request = {data: imageB64, name: nombre, extention: extension, size: size};

        fetch('https://long-lime-indri-wig.cyclic.cloud/Firebase/guardarImagenes', 
            {
                method: 'POST', 
                body: JSON.stringify(request),
                headers: { 'Content-Type': 'application/json' },
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

    return (
        <div className="mx-auto mt-10 p-4 border rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold mb-4">Agregar Producto</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                        Nombre
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
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
                        Seleccionar imágenes
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
                                <label htmlFor={`imagenInput-${index}`} className="mt-2 cursor-pointer text-blue-500">
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
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="stock"
                        name="stock"
                        value={producto.stock}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-6 text-right">
                    <button
                        className={` ${isImageLoading.some(x => x) ? 'cursor-not-allowed disabled' : ''} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                        type="submit"
                    >
                        Agregar Producto
                    </button>
                    <button 
                        className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 ml-5"
                        onClick={() => setMostrarCrear(false)}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export { CreateProduct };