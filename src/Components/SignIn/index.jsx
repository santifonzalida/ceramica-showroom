import { useContext, useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../Context/useLocalStorage";
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import { LoginContext } from '../../Context/loginContext';

const SignIn = (props) => {

    useEffect(() => {
        usernameRef.current.focus();
    },[props.isSignUpOpen])

    const usernameRef = useRef();
    const navigate = useNavigate();
    const localStorage = useLocalStorage();
    const context = useContext(LoginContext);
    const [credential, setCredential] = useState({email:'', password:''});
    const [success, setSuccess] = useState(false);

    const login = () => {
        context.login(credential).then((data) => {
            if(data.statusCode == 401) {
                context.setIsUserLogin(false);
                context.setError({...data, message:[], from: 'login'});
            } else if(data.data.access_token) {
                setSuccess(true);
                localStorage.saveItem("user", data.data);
                context.setIsUserLogin(true);
                context.setError(null);
                navigate(data.data.navigateTo);
            }
            context.setIsLoading(false);
        });
        context.timeRenderErrorMessage();
    }

    const renderLoginButton = () => {
        if(context.isLoading) {
          return (  
            <button className='flex items-center justify-center bg-black py-3 text-white w-full rounded-lg' disabled >Cargando...
              <ArrowPathIcon className="animate-spin h-6 w-6"/>
            </button>
            );
        } else {
          return (<button className='bg-black py-3 text-white w-full rounded-lg' onClick={() => login()} >Iniciar sesión</button>);
        }
    }

    const showSignUpPage =() => {
        props.updateState(true)
    }

    return (
        <div>
            <div className='flex items-center relative w-80 mb-4'>
                <h1 className='font-medium text-xl'>Bienvenido</h1>
            </div>
            <div className="mt-5">
                <p>Nombre de usuario:</p>
                <input
                    type="text"
                    placeholder='username'
                    value={credential.username}
                    className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
                    onChange={(event) => setCredential({...credential, email: event.target.value})}
                    ref={usernameRef}
                />
                <p>Contraseña:</p>
                <input
                    type="password"
                    placeholder='password'
                    value={credential.password}
                    className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
                    onChange={(event) => setCredential({...credential, password: event.target.value})}
                    onKeyPress={(e) => e.key == 'Enter' ? login() : ''}
                />
            </div>
            <div className='flex items-center justify-center relative w-80 mb-4'>
                {renderLoginButton()}
            </div>
            <a className="cursor-pointer" onClick={showSignUpPage}>
                <p className="text-md italic underline">
                    Crear una nueva cuenta
                </p>
            </a>
            <div className={`${!success && context.error?.from == 'login' ? 'flex' : 'hidden'}  items-center justify-center relative w-80 mb-4 bg-red-500 rounded-lg`}>
                <p>
                    Nombre de usuario o contraseña invalidos...
                </p>
            </div>
        </div>
    );
}

export { SignIn }