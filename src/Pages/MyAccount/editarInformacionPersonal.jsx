import { useState, useContext } from "react";
import { XMarkIcon, PencilIcon, TrashIcon} from '@heroicons/react/24/solid';
import { LoginContext } from "../../Context/loginContext";

const EditarInformacionPersonal = ({ showEditPersonalInfo, OnSetShowPersonalInfoChange }) => {

    const context = useContext(LoginContext);
    const [socialMedia, setSocialMedia] = useState({ name: '', url: '' });
    const [showCamposSocialMedia, setShowCamposSocialMedia] = useState(false);

    const agregarSocialMedia = () => {        
        let SMList = [...context.user.socialMedia];
        SMList.push(socialMedia);
        context.setUser({...context.user, socialMedia: SMList});
        setSocialMedia({ name: '', url: '' });
        setShowCamposSocialMedia(false);
    }

    const guardarCambios = () => {
        context.updateUserInformation().then((data) => {
            context.setUser(data.data);
            OnSetShowPersonalInfoChange(false);
        });    
    }

    const editarSocialMedia = (index) => {
        let SMList = [...context.user.socialMedia];
        let sm = SMList[index];
        if(sm){
            setSocialMedia({name: sm.name, url: sm.url});
            setShowCamposSocialMedia(true);
        }
    }
    const eliminarSocialMedia = (index) => {
        let SMList = [...context.user.socialMedia];
        SMList.splice(index, 1);
        let editedUser = context.user;
        editedUser.socialMedia = SMList;
        context.setUser({...editedUser});
    }

    return (
        <div className={`${showEditPersonalInfo ? '' : 'hidden'} w-96`}>
            <div className="flex items-center justify-between mb-3">
                <h2 className='font-medium text-xl'>Configuración personal</h2>
                <div className='pt-1'>
                    <XMarkIcon className='h-6 w-6 text-black cursor-pointer mt-2' onClick={() => OnSetShowPersonalInfoChange(false)}></XMarkIcon>
                </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
                    <span className="font-light mb-4">Nombre completo</span>
                    <input className="border border-black rounded-md mb-4 focus:outline-none"
                        type="text"
                        value={context.user.fullName}
                        onChange={(event) => context.setUser({ ...context.user, fullName: event.target.value })} />
                </div>
            <p className="font-medium">Redes sociales</p>
            {
                context.user?.socialMedia?.map((sm, index) => (
                    <div key={index} className="grid grid-cols-2">
                        <div className="mt-3">
                            <div className="flex">
                                <p className="ml-2 italic">{sm?.name}</p>
                            </div>
                            <div className="flex">
                                <p className="ml-2 italic">{sm?.url}</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-center justify-end">
                            <PencilIcon className="h-4 w-4 cursor-pointer" onClick={() => editarSocialMedia(index)}/>
                            <TrashIcon className="h-4 w-4 cursor-pointer" onClick={() => eliminarSocialMedia(index)}/>
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
                <span className="font-medium items-center justify-center">Bio</span>
                <textarea 
                    className="border rounded-md border-black w-full h-28 p-1" 
                    value={`${context.user ? context.user.notes : ''}`} 
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