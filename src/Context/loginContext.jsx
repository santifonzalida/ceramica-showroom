import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../Context/useLocalStorage";

export const LoginContext = createContext();

export const LoginContextProvider = ({children}) => {

    const localStorage = useLocalStorage();
    const navigate = useNavigate();
    const [isUserLogin, setIsUserLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async(credentials) => {
        setIsLoading(true);
        setError(null);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...credentials})
        };

        const response = await fetch('https://long-lime-indri-wig.cyclic.cloud/auth/login', requestOptions);
        return await response.json();
    }

    const getUserInfo = async() => {
        setIsLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.access_token}`},
        };

        const response = await fetch(`https://long-lime-indri-wig.cyclic.cloud/users/${user.userId}`, requestOptions);
        return await response.json();
    }

    const logOut = () => {
        localStorage.saveItem('tokens', {});
        setIsUserLogin(false);
        setUser(null);
        navigate('/login');
    }

    const createUser = async(newUSer) => {
        setIsLoading(true);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...newUSer})
        };

        const response = await fetch('https://long-lime-indri-wig.cyclic.cloud/users', requestOptions);
        return await response.json();
    }

    const updateUserInformation = async() => {
        const userStorage = JSON.parse(localStorage.getItem("user"));
        const bodyRequest = {"avatarUrl": user.avatarUrl};
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${userStorage.access_token}`
            },
            body: JSON.stringify(bodyRequest)
        };

        const response = await fetch(`https://long-lime-indri-wig.cyclic.cloud/users/${userStorage.userId}`, requestOptions);
        return await response.json();
    }

    const timeRenderErrorMessage = () => {
        setTimeout(() => {
            setError(false);
        },5000);
    }
        
    return (
        <LoginContext.Provider value={
            {
                user,
                setUser,
                login,
                logOut,
                isUserLogin,
                setIsUserLogin,
                getUserInfo,
                setError,
                error,
                isLoading,
                setIsLoading,
                createUser,
                timeRenderErrorMessage,
                updateUserInformation
            }}>
            {children}
        </LoginContext.Provider>
    )
 }

