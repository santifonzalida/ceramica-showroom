import { InformationCircleIcon } from "@heroicons/react/24/solid"

const EmptyState = () => {
    return (
        <div className="bg-white p-6 rounded shadow-md">
            <div className="text-center">
                <p className="flex items-center justify-center"><InformationCircleIcon className="h-8 w-8"/></p>
                <p className="text-gray-600 text-lg">La lista está vacía.</p>
                <p className="text-gray-600">Aún no se han agregado elementos.</p>
            </div>
        </div>
    )
}

export { EmptyState }