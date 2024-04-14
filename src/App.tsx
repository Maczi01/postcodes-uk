import { useQuery } from '@tanstack/react-query';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { MapRef } from 'react-map-gl';

import { getPostcodeDetails, getSuggestedPostcodes } from './api/postcodes.ts';
import { MapComponent } from './components/Map';
import { PostcodeDetails } from './components/PostcodeDetails';
import { SearchField } from './components/SearchField.tsx';
import { Title } from './components/Title';
import { useDebounce } from './hooks/useDebounce';
import { queryKeys } from './utils/queryKeys.ts';

function App() {
    const [input, setInput] = useState('');
    const debouncedInput = useDebounce(input);
    const [activePostcode, setActivePostcode] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const mapRef = useRef<MapRef>(null);

    const { data: postcodesSuggestions } = useQuery({
        queryKey: [queryKeys.postcodes.autocomplete, debouncedInput],
        queryFn: () => getSuggestedPostcodes(debouncedInput),
        enabled: true,
    });

    const {
        data: postcodeData,
        isLoading: isPostcodeLoading,
        error: postcodeError,
    } = useQuery({
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
        if (postcodeData && mapRef.current) {
            const { latitude, longitude } = postcodeData.result;
            if (latitude != null && longitude != null) {
                mapRef.current.flyTo({
                    center: [longitude, latitude],
                    zoom: 12,
                    speed: 0.8,
                    curve: 1,
                    essential: true,
                });
            }
        }
    }, [postcodeData]);

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
                    suggestions={dropdownVisible ? postcodesSuggestions?.result : []}
                    onSuggestionClick={handleSuggestionClick}
                    clear={() => setInput('')}
                />
                <PostcodeDetails
                    data={postcodeData}
                    isLoading={isPostcodeLoading}
                    error={postcodeError}
                />{' '}
            </div>
            <MapComponent
                latitude={postcodeData?.result?.latitude}
                longitude={postcodeData?.result?.longitude}
                postcode={postcodeData?.result.postcode}
            />
        </div>
    );
}

export default App;
