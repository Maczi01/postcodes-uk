import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPostcodeDetails, getSuggestedPostcodes } from './api/postcodes.ts';
import { SearchField } from './components/SearchField.tsx';
import { Title } from './components/Title';
import { PostcodeDetails } from './components/PostcodeDetails.tsx';
import { useDebounce } from './hooks/useDebounce';
import { MapRef } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapComponent } from './components/Map.tsx';
import { queryKeys } from './utils/queryKeys.ts';

// done x in input
// TODO no suggestions if empty
// TODO tests
// TODO error handling
// TODO loading state
// TODO no results found
// TODO eslint
// TODO zod
// done types
// TODO separate svg X

function App() {
    const [input, setInput] = useState('');
    const debouncedInput = useDebounce(input);
    const [activePostcode, setActivePostcode] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const mapRef = useRef<MapRef>(null);
    const [coordinatesAvailable, setCoordinatesAvailable] = useState(true);

    const { data } = useQuery({
        queryKey: [queryKeys.postcodes.autocomplete, debouncedInput],
        queryFn: () => getSuggestedPostcodes(debouncedInput),
        enabled: true,
    });

    const { data: postcodeDetails } = useQuery({
        queryKey: [activePostcode],
        queryFn: () => getPostcodeDetails(activePostcode),
        enabled: !!activePostcode,
    });

    useEffect(() => {
        if (input === '') {
            setActivePostcode('');
        }
    }, [input]);

    useEffect(() => {
        if (postcodeDetails && mapRef.current) {
            const { latitude, longitude } = postcodeDetails.result;
            if (latitude != null && longitude != null) {
                mapRef.current.flyTo({
                    center: [longitude, latitude],
                    zoom: 12,
                    speed: 0.8,
                    curve: 1,
                    essential: true,
                });
                setCoordinatesAvailable(true);
            } else {
                setCoordinatesAvailable(false);
            }
        }
    }, [postcodeDetails]);

    const onChangeInputText = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        setDropdownVisible(true);
    };

    const handleSuggestionClick = (value: string) => {
        setInput(value);
        setActivePostcode(value);
        setDropdownVisible(false);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 h-full w-[100vw] mx-auto">
            <div className="h-full">
                <Title />
                <SearchField
                    placeholder="Enter postcode..."
                    value={input}
                    onChange={onChangeInputText}
                    suggestions={dropdownVisible ? data?.result : []}
                    onSuggestionClick={handleSuggestionClick}
                    clear={() => setInput('')}
                />
                <PostcodeDetails data={postcodeDetails?.result} />
            </div>
            <MapComponent
                latitude={postcodeDetails?.result?.latitude}
                longitude={postcodeDetails?.result?.longitude}
                coordinatesAvailable={coordinatesAvailable}
            />
        </div>
    );
}

export default App;
