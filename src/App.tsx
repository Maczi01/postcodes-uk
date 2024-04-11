import './index.css'
import {useEffect, useState, useRef} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getPostcodeDetails, getPostcodes} from "./api/postcodes.ts";
import {TextField} from './components/TextField'
import {Title} from './components/Title'
import {useDebounce} from './hooks/useDebounce'
import {Table} from "./components/Table.tsx";
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { MapRef, Marker } from 'react-map-gl';

function App() {

    const [input, setInput] = useState('');
    const debouncedInput = useDebounce(input, 800);
    const [activePostcode, setActivePostcode] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const mapRef = useRef<MapRef>(null);

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
            <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
                <div className="h-full">
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
                    {postcodeDetails && (
                        <Table data={postcodeDetails.result} />
                    )}
                </div>

                <div className="h-full">
                    <Map
                        initialViewState={{
                            latitude: 53.27515756,
                            longitude: -7.877257,
                            zoom: 6.5,
                            bearing: 0,
                            pitch: 0,
                        }}
                        ref={mapRef}
                        style={{ width: '100%', height: '100vh' }}
                        mapboxAccessToken="pk.eyJ1IjoiYWxlcGhyaSIsImEiOiJjamdwbHpycjIyZm45Mndud3AzamRibHpqIn0.ejAHwSGT6dcGxiDOrPCFLg"
                        mapStyle="mapbox://styles/mapbox/streets-v12"
                        dragRotate={false}
                        touchZoomRotate={false}
                        attributionControl={false}
                    >
                    </Map>
                </div>
            </div>
    );
}

export default App
