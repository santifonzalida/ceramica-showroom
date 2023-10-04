import { useState } from "react";

const CreateProduct = ({setMostrarCrear}) => {

    const [producto, setProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        imagen: '',
      });

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

    const [imagen, setImagen] = useState(null);
    const [imagenBase64, setImagenBase64] = useState('');

    const handleImagenChange = (e) => {
      const archivo = e.target.files[0];
      if(archivo) {
        const reader = new FileReader();
        reader.onload = (event) => {
            setImagenBase64(event.target.result);
        };
        reader.readAsDataURL(archivo);
        console.log(reader);
      }
      
    };

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
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">
                        Imagen URL
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="imagen"
                        name="imagen"
                        value={producto.imagen}
                        onChange={handleChange}
                        required
                    />
                    
                </div>
                <div className="mb-6 text-center">
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
            <input type="file" accept="image/*" onChange={handleImagenChange} />
            {imagenBase64 && <img src={imagenBase64} alt="Imagen seleccionada" />}
        </div>
    );
}

export { CreateProduct };