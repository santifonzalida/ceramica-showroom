import { useState, useContext } from "react";
import { XMarkIcon } from '@heroicons/react/24/solid';
import { LoginContext } from "../../Context/loginContext";

const EditarInformacionPersonal = ({ showEditPersonalInfo, OnSetShowPersonalInfoChange }) => {

    const context = useContext(LoginContext);
    const [socialMedia, setSocialMedia] = useState({ name: '', url: '' });
    const [socialMediaList, setSocialMediaList] = useState([]);
    const [showCamposSocialMedia, setShowCamposSocialMedia] = useState(false);

    const agregarSocialMedia = () => {
        console.log(context.user)
        let SMList = [...context.user.socialMedia];
        SMList.push(socialMedia);
        setSocialMediaList(SMList);
        context.setUser({...context.user, socialMedia: SMList});
        setSocialMedia({ name: '', url: '' });
        setShowCamposSocialMedia(false);
    }

    const guardarCambios = () => {
        console.log(socialMediaList);
    }

    return (
        <div className={`${showEditPersonalInfo ? '' : 'hidden'} w-96`}>
            <div className="flex items-center justify-between mb-3">
                <h2 className='font-medium text-xl'>Configuración personal</h2>
                <div className='pt-1'>
                    <XMarkIcon className='h-6 w-6 text-black cursor-pointer mt-2' onClick={() => OnSetShowPersonalInfoChange(false)}></XMarkIcon>
                </div>
            </div>
            <p className="font-medium">Redes sociales</p>
            {
                context.user?.socialMedia.map((sm, index) => (
                    <div key={index} className="mt-3">
                        <div className="flex">
                            <label className="">Nombre:</label>
                            <p className="ml-2 italic">{sm?.name}</p>
                        </div>
                        <div className="flex">
                            <label>Url:</label>
                            <p className="ml-2 italic">{sm?.url}</p>
                        </div>
                    </div>
                ))
            }
            <div className={`${showCamposSocialMedia ? '' : 'hidden'}`}>
                <div className="flex items-center gap-4 mt-4">
                    <span className="font-light mb-4">Nombre</span>
                    <input className="border border-black rounded-md mb-4 focus:outline-none"
                        type="text"
                        value={socialMedia?.name}
                        onChange={(event) => setSocialMedia({ ...socialMedia, name: event.target.value })} />
                </div>
                <div className="flex items-center gap-4">
                    <span className="font-light mb-4">Perfil url</span>
                    <input className="border border-black rounded-md mb-4 focus:outline-none"
                        type="text"
                        value={socialMedia?.url}
                        onChange={(event) => setSocialMedia({ ...socialMedia, url: event.target.value })} />
                </div>
            </div>

            <div className={`${showCamposSocialMedia ? 'hidden' : ''} grid grid-cols-1 place-items-center pt-5`}>
                <button className="h-10 w-full rounded-lg bg-black text-white mb-4" onClick={() => setShowCamposSocialMedia(true)}>Agregar otra red</button>
            </div>

            <div className={`${showCamposSocialMedia ? '' : 'hidden'} grid grid-cols-1 place-items-center pt-5`}>
                <button className={`h-10 w-full rounded-lg bg-black text-white mb-4`} onClick={() => agregarSocialMedia()}>Agregar</button>
                <button className={`h-10 w-full rounded-lg bg-black text-white mb-4`} onClick={() => setShowCamposSocialMedia(false) }>Cancelar</button>
            </div>
            <div>
                <span className="font-light items-center justify-center">Bio</span>
                <textarea 
                    className="border rounded-md border-black w-full h-28 p-1" 
                    value={`${context.user ? context.user.fullName : ''} ${context.user ? context.user.notes : ''}`} 
                    onChange={(e) => context.setUser({...context.user, notes: e.target.value})}>    
                </textarea>
            </div>

            <div className="grid grid-cols-1 place-items-center pt-5">
                <button className=" h-10 w-full rounded-lg bg-black text-white" onClick={guardarCambios}>Guardar cambios</button>
            </div>
        </div>
    )
}

export { EditarInformacionPersonal }