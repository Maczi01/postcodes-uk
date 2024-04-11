import './index.css'
import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getPostcodeDetails, getPostcodes} from "./api/postcodes.ts";
import {TextField} from './components/TextField'
import {Title} from './components/Title'
import {useDebounce} from './hooks/useDebounce'

function App() {

    const [input, setInput] = useState('');
    const debouncedInput = useDebounce(input, 800);
    const [activePostcode, setActivePostcode] = useState(null);
    const {isPending, error, data} = useQuery({
        queryKey: ['countries', debouncedInput],
        queryFn: () => getPostcodes(debouncedInput),
        enabled: true,
    });
    console.log({activePostcode})
    const {data: postcodeDetails} = useQuery({
        queryKey: [ activePostcode],
        queryFn: () => getPostcodeDetails(activePostcode),
        enabled: true,
    });

    console.log({postcodeDetails})
    const onChangeInputText = (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value);


    return (
        <div className="flex flex-col justify-start items-start">
            <Title />
            <>
                <div className='my-4'>
                    <TextField
                        type='text'
                        name='filter'
                        placeholder='Filter...'
                        className='px-4 py-2 border rounded shadow'
                        value={input}
                        onChange={onChangeInputText}
                    />
                </div>
                {/*{renderContent()}*/}
                <div className='flex flex-col flex-wrap justify-center'>
                    {data ?
                        data?.result?.map(f => <div >
                            <p>code:</p>
                            <button onClick={() => setActivePostcode(f)}> {f}</button>
                        </div>) : (
                            <p>loading...</p>
                        )
                    }
                </div>

                {
                    postcodeDetails && <div>
                    Details for:
                        {postcodeDetails.result.postcode}
                        {postcodeDetails.result.european_electoral_region}
                    </div>
                }
            </>
        </div>
    )
}

export default App
