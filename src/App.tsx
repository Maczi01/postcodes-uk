import './index.css'
import {useEffect, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getPostcodeDetails, getPostcodes} from "./api/postcodes.ts";
import {TextField} from './components/TextField'
import {Title} from './components/Title'
import {useDebounce} from './hooks/useDebounce'
import {Table} from "./components/Table.tsx";

function App() {

    const [input, setInput] = useState('');
    const debouncedInput = useDebounce(input, 800);
    const [activePostcode, setActivePostcode] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const {data, isFetching} = useQuery({
        queryKey: ['postcodes', debouncedInput],
        queryFn: () => getPostcodes(debouncedInput),
        enabled: true
        // enabled: debouncedInput.length > 2
    });

    const {data: postcodeDetails} = useQuery({
        queryKey: [activePostcode],
        queryFn: () => getPostcodeDetails(activePostcode),
        enabled: activePostcode != null,
    });

    useEffect(() => {
        if (input === '') {
            setActivePostcode(null);
        }
    }, [input]);

    const onChangeInputText = (e) => {
        setInput(e.target.value);
        setDropdownVisible(true);
    };

    const handleSuggestionClick = (value) => {
        setInput(value);
        setActivePostcode(value);
        setDropdownVisible(false);
    };

    return (
        <div className="flex flex-col justify-start items-start">
            <Title/>
            <div className="my-4 w-full">
                <TextField
                    placeholder="Enter postcode..."
                    value={input}
                    onChange={onChangeInputText}
                    suggestions={dropdownVisible ? data?.result : []}
                    onSuggestionClick={handleSuggestionClick}
                />
            </div>
            {/*{isFetching && <p>Loading...</p>}*/}
            {postcodeDetails && (
                <Table data={postcodeDetails.result} />
                // <div>
                //     <p>Details for: {postcodeDetails.result.postcode}</p>
                //     <p>Region: {postcodeDetails.result.european_electoral_region}</p>
                // </div>
            )}
        </div>
    );
}

export default App
