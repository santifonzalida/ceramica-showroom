import { useState } from "react";
import { CheckIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

const CreateProduct = ({setMostrarCrear}) => {

    const [producto, setProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        images: [],
      });
      const [error, setError] = useState(null);
      const [imagenes, setImagenes] = useState(['', '', '']);
      const [isImageLoading, setIsImageLoading] = useState([false, true, false]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({
            ...producto,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar el envío del formulario o guardar los datos
        // producto en tu estado global o base de datos.
        console.log(producto);
    };

    const handleImagenChange = (e, index) => {
      const {size, type, name} = e.target.files[0];

      if(size && type && name) {
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
    };

    const guardarImagen = (imageB64, nombre, extension, size, loadingIndex) => {
        const loadingArray = [...isImageLoading];
        loadingArray[loadingIndex] = true;
        setIsImageLoading(loadingArray);

        let request = {data: imageB64, name: nombre, extention: extension, size: size};

        fetch('https://long-lime-indri-wig.cyclic.cloud/Firebase/guardarImagenes', 
            {
                method: 'POST', 
                body: JSON.stringify(request),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => response.json()
            .then(data => {
                const newProduct = {...producto};
                const newImage = { name: nombre, imageUrl: data.data, extention: extension, size: size };
                newProduct.images.push(newImage);
                setProducto(newProduct);
                console.log(producto);

                loadingArray[loadingIndex] = false;
                setIsImageLoading(loadingArray);
            })).catch(error => {
                setError(error)
                console.log(error);
                loadingArray[loadingIndex] = false;
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
                                            <CheckIcon className={`${isImageLoading[index] ? 'hidden' : ''} text- h-6 w-6 text-green-600`}></CheckIcon>
                                            <ArrowPathIcon className={`${isImageLoading[index] ? 'animate-spin' : 'hidden'} h-6 w-6 text-black"`}></ArrowPathIcon>
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
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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