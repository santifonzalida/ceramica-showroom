import { useState } from "react";
import { XMarkIcon } from '@heroicons/react/24/solid';

const EditarInformacionPersonal = () => {

    const [socialMedia, setSocialMedia] = useState({name: '', url: ''});
    const [socialMediaList, setSocialMediaList] = useState([]);

    const agregarSocialMedia = () => {
        let SMList = [...socialMediaList];
        SMList.push(socialMedia);
        setSocialMediaList(SMList);
        setSocialMedia({name: '', url: ''});
    }

    const guardarCambios = () => {
        console.log(socialMediaList);
    }

    return(
        <div>
            <div className="flex items-center justify-between mb-7">
                <h2 className='font-medium text-xl'>Editar información personal</h2>
                <div className='p-4'>
                <XMarkIcon className='h-6 w-6 text-black cursor-pointer mt-2'></XMarkIcon>
                </div>
            </div>
            <p className="font-medium">Redes sociales</p> 
          { 
            socialMediaList.map((socialMedia) => (
              <div key={socialMedia.url} className="mt-3">
                <div className="flex">
                    <label className="">Nombre:</label>
                    <p className="ml-2 italic">{socialMedia?.name}</p>
                </div>
                <div className="flex">  
                    <label>Url:</label>
                    <p className="ml-2 italic">{socialMedia?.url}</p>
                </div>
              </div>
            ))
          }
            <div className="flex items-center gap-4 mt-4">   
                <span className="font-light mb-4">Nombre</span>
                <input className="border border-black rounded-md mb-4 focus:outline-none" 
                    type="text" 
                    value={socialMedia?.name} 
                    onChange={(event) => setSocialMedia({...socialMedia, name: event.target.value})} />
            </div>
            <div className="flex items-center gap-4">   
                <span className="font-light mb-4">Perfil url</span>
                <input className="border border-black rounded-md mb-4 focus:outline-none" 
                    type="text" 
                    value={socialMedia?.url} 
                    onChange={(event) => setSocialMedia({...socialMedia, url: event.target.value})} />
            </div>
            <div className="grid grid-cols-2 place-items-center pt-5">
                <button className=" h-10 w-40 rounded-lg bg-black text-white" onClick={agregarSocialMedia}>Agregar otra</button>  
                <button className=" h-10 w-40 rounded-lg bg-black text-white" onClick={guardarCambios}>Guardar cambios</button>  
            </div>
        </div>
    )
}

export { EditarInformacionPersonal }