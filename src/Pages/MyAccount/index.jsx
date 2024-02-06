import { useContext, useState } from "react";
import { CameraIcon, PencilIcon, XMarkIcon, ArrowPathIcon} from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Layout } from "../../Components/Layout";
import { LoginContext } from "../../Context/loginContext";
import { EditarInformacionPersonal } from "./editarInformacionPersonal";

function MyAccount() {

  const context = useContext(LoginContext);
  const [showModal, setShowModal] = useState(false);
  const [showEditPersonalInfo, setShowPersonalInfo] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const uploadImage = () => {
    context.updateUserInformation().then((data) => {
      context.setUser(data.data);
      setShowModal(false)
    });
  }

  const OnSetShowPersonalInfoChange = (show) => {
    setShowPersonalInfo(show)
  }

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  }

  return (
    <Layout>
      {
        showEditPersonalInfo ? 
          <EditarInformacionPersonal 
            showEditPersonalInfo={showEditPersonalInfo}
            OnSetShowPersonalInfoChange={OnSetShowPersonalInfoChange}>
          </EditarInformacionPersonal> 
        :
        !showModal ?
        <div className="max-w-lg mx-auto my-10 bg-zinc-80 rounded-lg p-5">
          <div className="relative">
            { context.user?.avatarUrl ?
              isImageLoaded ?
                <img className="w-40 h-40 rounded-full mx-auto" src={context.user?.avatarUrl} alt="User avatar" /> 
              :
                <div className="flex justify-center items-center">
                  <ArrowPathIcon className="h-8 w-8 animate-spin"/>
                </div> 
              :
              <div className="flex items-center justify-center">
                <UserCircleIcon className="h-12 w-12"/>
              </div>
            }
            <CameraIcon className="absolute top-1/2 left-1/2 mb-5 text-black py-2 px-4 w-16 h-16 opacity-90 mt-4 ml-5 bg-stone-400 rounded-full cursor-pointer" onClick={() => setShowModal(true)}> </CameraIcon>
          </div>
          <h2 className="text-center text-2xl font-semibold mt-3">{context.user?.fullName}</h2>
          <a className="flex font-sans italic justify-center mt-2 cursor-pointer" onClick={() => setShowPersonalInfo(true)}>Editar información personal <PencilIcon className="ml-2 mt-1 h-4 w-4"></PencilIcon></a>
          <div className="flex justify-center mt-5">
            {
              context.user?.socialMedia?.map((sm, index) => (
                <a key={index} href={sm.url} className="text-blue-500 hover:text-blue-700 mx-3" target="_blank">{sm.name}</a>
              ))
            }
          </div>
          <div className="mt-5">
            <h3 className="text-xl font-semibold">Bio</h3>
            <p className="text-gray-600 mt-2">{context.user?.notes}</p>
          </div>
        </div>
        :
        <div>
          <div className="flex items-center justify-between mb-7">
            <h2 className='font-medium text-xl'>Cambiar imagen avatar</h2>
            <div className='p-4'>
              <XMarkIcon className='h-6 w-6 text-black cursor-pointer mt-2' onClick={() => setShowModal(false)}></XMarkIcon>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-light mb-4">Imagen url:</span>
            <input className="border border-black rounded-md mb-4 focus:outline-none"
              type="text"
              placeholder="https://ejemplo.com/imagen"
              value={context.user?.avatarUrl}
              onChange={(event) => context.setUser({ ...context.user, avatarUrl: event.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 place-items-center pt-5">
            <button className=" h-10 w-40 rounded-lg bg-black text-white" onClick={() => uploadImage()}>Guardar cambios</button>
          </div>
        </div>
      }
      <img
        src={context.user?.avatarUrl}
        alt="hidden image"
        style={{display: 'none'}}
        onLoad={handleImageLoad}/>

    </Layout>
  )
}

export { MyAccount }
