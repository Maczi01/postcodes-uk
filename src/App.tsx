import './index.css';
import { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPostcodeDetails, getPostcodes } from "./api/postcodes.ts";
import { TextField } from './components/TextField';
import { Title } from './components/Title';
import { Table } from "./components/Table.tsx";
import { useDebounce } from './hooks/useDebounce';
import Map, { MapRef, Marker } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";


function App() {
    const [input, setInput] = useState('');
    const debouncedInput = useDebounce(input, 800);
    const [activePostcode, setActivePostcode] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const mapRef = useRef<MapRef>(null);
    const [coordinatesAvailable, setCoordinatesAvailable] = useState(true);

    const {data, isFetching} = useQuery({
        queryKey: ['postcodes', debouncedInput],
        queryFn: () => getPostcodes(debouncedInput),
        enabled: true
    });

    const {data: postcodeDetails} = useQuery({
        queryKey: [activePostcode],
        queryFn: () => getPostcodeDetails(activePostcode),
        enabled: !!activePostcode,
    });

    useEffect(() => {
        if (input === '') {
            setActivePostcode(null);
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
                    essential: true
                });
                setCoordinatesAvailable(true);
            } else {
                setCoordinatesAvailable(false);
            }
        }
    }, [postcodeDetails]);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 h-full w-[100vw] mx-auto">
            <div className="h-full">
                <Title/>
                <div className="my-4 p-2 w-full">
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

            <div className="relative h-full">
                <Map
                    initialViewState={{
                        latitude: 54.65876204260053,
                        longitude: -4.622038136045603,
                        zoom: 5,
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
                    onMoveEnd={(e) => console.log(e.viewState)}
                >
                {!coordinatesAvailable && (
                    <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-65 flex items-center justify-center text-xl">
                        <span>Coordinates not available</span>
                    </div>
                )}
                </Map>
            </div>
        </div>
    );
}

export default App;
