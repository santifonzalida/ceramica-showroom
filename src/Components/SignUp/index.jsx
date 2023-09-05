import { useContext, useState } from "react";
import { LoginContext } from "../../Context/loginContext";
import { ArrowPathIcon } from '@heroicons/react/24/solid';

const SignUp = (props) => {

    const context = useContext(LoginContext);
    const [newUser, setNewUser] = useState({avatar: 'http://example.com', role:"customer", name: '', email: '', password: ''});
    const [success, setSuccess] = useState(false);

    const showSignUpPage =() => {
        props.updateState(false)
    }

    const create = () => {
        context.createUser(newUser).then((data) => {
            if(data.error){
                context.setError({...data, from:'createUser'});
                setSuccess(false);
                context.timeRenderErrorMessage();
            } else {
                setNewUser(data);
                setSuccess(true);
                setTimeout(() => {
                    props.updateState(false);
                    setNewUser({avatar: 'http://example.com', role:"customer", name: '', email: '', password: ''});
                    setSuccess(false);
                },1500);
            }
            context.setIsLoading(false);
        });
    }

    const renderCreateButton = () => {
        if(context.isLoading) {
          return (  
            <button className='flex items-center justify-center bg-black py-3 text-white w-full rounded-lg' disabled >Loading...
              <ArrowPathIcon className="animate-spin h-6 w-6"/>
            </button>
            );
        }else if(success){
            return (<button className='bg-lime-600 py-3 text-black w-full rounded-lg ' disabled>Success!</button>);
        } else {
          return (<button className='bg-black py-3 text-white w-full rounded-lg ' onClick={create}>Create</button>);
        } 
    }

    return (
        <div>
            <div className="flex items-center">
                <button className="text-md italic underline mr-5" onClick={showSignUpPage}> {'<'} back</button>
                <h2 className="flex text-xl font-medium text-left">Create new user</h2>
            </div>
            <div className="mt-5">
                <p>Complete name:</p>
                <input
                    type="text"
                    value={newUser.name}
                    placeholder='name'
                    className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
                    onChange={(event) => setNewUser({...newUser, name: event.target.value})} 
                />
                <p>Email:</p>
                <input
                    type="email"
                    value={newUser.email}
                    placeholder='user@example.com'
                    className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
                    onChange={(event) => setNewUser({...newUser, email: event.target.value})} 
                />
                <p>Password:</p>
                <input
                    type="password"
                    value={newUser.password}
                    className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
                    onChange={(event) => setNewUser({...newUser, password: event.target.value})} 
                />
            </div>
            {renderCreateButton()}
            <div className={`${!success && context.error?.from == 'createUser' ? 'flex' : 'hidden'}  items-center justify-center relative w-80 mb-4 bg-red-500 rounded-lg`}>
                <ol>
                    {context.error?.message ? 
                        context.error?.message?.map((message, index) => (
                                <li key={index}>{message}</li>
                        ))
                    : 'Oops.. an error occurred'}
                </ol>
            </div>
        </div>
    )
}

export { SignUp };