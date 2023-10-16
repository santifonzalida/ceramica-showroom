import { ArrowPathIcon } from "@heroicons/react/24/solid"

const Spinner = () => {
    return (
        <div className="rounded-md">
            <h2 className="flex items-center justify-center gap-2 text-lg">Buscando resultados 
                <div className="flex animate-spin h-5 w-5 mr-3 ">
                    <ArrowPathIcon />
                </div>  
            </h2>
            
        </div>
    )
}

export { Spinner }