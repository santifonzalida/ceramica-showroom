import { CreatedUsersChart } from './createdUsersChart';
import { ProductLikedChart } from './productsLikedChart';

const Statistics = () => {
 
    return(
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-scroll">
                        <div className='row mb-6'>
                            <ProductLikedChart />
                        </div>
                        <div className='row'>
                            <CreatedUsersChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Statistics }