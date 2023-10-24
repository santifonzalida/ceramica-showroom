import { ArrowPathIcon } from '@heroicons/react/24/solid'

const Modal = ({isOpen, title, message, onCancel, onConfirm, showSpinner}) => {

    if(!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-500 bg-opacity-40">
            <div className="modal p-4 bg-white w-1/2 rounded-lg shadow-lg">
                <p className="text-lg mb-2 font-bold">{title}</p>
                <p className="text-lg mb-4">{message}</p>
                <div className="flex justify-end">
                    <button className={`${showSpinner ? 'disabled cursor-not-allowed' : ''} bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded mr-4`} onClick={onCancel}>Cancelar</button>
                    { showSpinner 
                        ? <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex disabled cursor-not-allowed">Confirmar <ArrowPathIcon className='flex h-5 w-5 ml-2 mt-1 animate-spin'/></button>
                        : <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={onConfirm}>Confirmar</button>
                    }
                </div>
            </div>
        </div>
    )
}

export { Modal }