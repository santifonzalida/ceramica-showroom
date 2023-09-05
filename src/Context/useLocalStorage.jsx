import { useState } from 'react'

const useLocalStorage = () => {

    const [error, setError] = useState(false);
    
    const getItem = (itemName) => {
        try{
            const token = JSON.parse(localStorage.getItem(itemName));
            if(!token) {
                return "token not found";
            }else {
                return token;
            }
        } catch (error) {
            setError(error);
        }
    }  

    const saveItem = (itemName, newItem) => {
        localStorage.setItem(itemName, JSON.stringify(newItem));
    }

    return {
        getItem,
        saveItem,
        error
    };
}

export {useLocalStorage};