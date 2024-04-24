import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Rectangle } from 'recharts';
import { useLocalStorage } from '../../Context/useLocalStorage';
import { Spinner } from "../Common/Spinner";

const CreatedUsersChart = () => {

    const localStorage = useLocalStorage();
    const [createdUsersList, setCreatedUsersList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [yearPeriod, setYearPeriod] = useState(2024);

    useEffect(() => {
        setIsLoading(true);
        const userStorage = localStorage.getItem('user');

        fetch(`https://tame-ruby-rhinoceros-cap.cyclic.app/Statistics/getCuentasCreadas/${yearPeriod}`, 
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userStorage.access_token}` },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Se produjo un error al inicializar la pantalla.')
                }
                return response.json();
            })
            .then((data) => { 
                if (data.data && data.data.length > 0) {
                    setCreatedUsersList(data.data);
                }
            }).catch(error => {
                console.error(error)
            }).finally(() => {
                setIsLoading(false);
        });
    }, []);


    const renderChart = () => {
        return(
            <BarChart
                width={400}
                height={300}
                data={createdUsersList}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey='_id' label="Mes"/>
                <YAxis/>
                <Tooltip />
                <Legend />
                <Bar dataKey="total" name="Usuarios" fill="#191919" activeBar={<Rectangle fill="#999999" stroke="grey" />}/>
            </BarChart>
        );
    }

    return(
        <div>
            { isLoading ? <Spinner /> :
                <div>
                    <h3 className='m-2'>Usuarios creados en: {yearPeriod}</h3>
                    { createdUsersList.length > 0 ? renderChart() : 'No se encontraron datos.' } 
                </div>
            }
        </div>
    )
}

export { CreatedUsersChart }