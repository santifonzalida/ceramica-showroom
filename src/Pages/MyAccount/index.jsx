import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CameraIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Layout } from "../../Components/Layout";
import { LoginContext } from "../../Context/loginContext";

function MyAccount() {
  
  const navigate = useNavigate();
  const context = useContext(LoginContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    context.getUserInfo().then((data) => {
      if(data.statusCode == 401) {
          context.setIsUserLogin(false);
          context.setError(data.message);
          navigate('/login');
      }else {
          context.setUser(data.data);
          context.setIsUserLogin(true);
      }
      context.setIsLoading(false);
      });
  },[])

  const uploadImage = () => {
    context.updateUserInformation().then((data) => {
      context.setUser(data.data);
      setShowModal(false)
    });
  }

  return (
    <Layout>
      {!showModal ? 
        <div className="max-w-lg mx-auto my-10 bg-zinc-80 rounded-lg p-5">
        <div className="relative">
          <img className="w-40 h-40 rounded-full mx-auto" src={context.user?.avatarUrl} alt="User avatar" />
          <CameraIcon className="absolute top-1/2 left-1/2 mb-5 text-black py-2 px-4 w-16 h-16 opacity-90 mt-4 ml-5 bg-stone-400 rounded-full" onClick={() => setShowModal(true)}> </CameraIcon>
        </div>
        <h2 className="text-center text-2xl font-semibold mt-3">{context.user?.name}</h2>
        <p className="text-center text-gray-600 mt-1">{context.user?.email} - {context.user?.role}</p>
        <div className="flex justify-center mt-5">
          <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">Twitter</a>
          <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">LinkedIn</a>
          <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">GitHub</a>
        </div>
        <div className="mt-5">
          <h3 className="text-xl font-semibold">Bio</h3>
          <p className="text-gray-600 mt-2">{context.user?.name} is a software engineer with over 10 years of experience in developing web and mobile applications. He is skilled in JavaScript, React, and Node.js.</p>
        </div>
      </div>
      :
      <div>
        <div className="flex items-center justify-between mb-7">
          <h2 className='font-medium text-xl'>Upload information</h2>
          <div className='p-4'>
            <XMarkIcon className='h-6 w-6 text-black cursor-pointer mt-2' onClick={() => setShowModal(false)}></XMarkIcon>
          </div>
        </div>
        
        <div className="flex items-center gap-4">    
          <span className="font-light mb-4">Image url:</span>
          <input className="border border-black rounded-md mb-4 focus:outline-none" 
            type="text" 
            value={context.user?.avatarUrl} 
            onChange={(event) => context.setUser({...context.user, avatarUrl: event.target.value})}
          />
        </div>
        <div className="grid grid-cols-1 place-items-center pt-5">
          <button className=" h-10 w-40 rounded-lg bg-black text-white" onClick={() => uploadImage()}>Save changes</button>  
        </div>
      </div>
      }
    </Layout>
  )
}

export { MyAccount }
