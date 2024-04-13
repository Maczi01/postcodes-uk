import { useEffect, useRef } from 'react';
import Map, { MapRef } from 'react-map-gl';
import { config } from '../utils/config.ts';
import 'mapbox-gl/dist/mapbox-gl.css';

type MapComponentProps = {
    latitude?: number;
    longitude?: number;
    coordinatesAvailable: boolean;
};

export const MapComponent = ({ latitude, longitude, coordinatesAvailable }: MapComponentProps) => {
    const mapRef = useRef<MapRef>(null);

    useEffect(() => {
        if (latitude != null && longitude != null) {
            mapRef?.current?.flyTo({
                center: [longitude, latitude],
                zoom: 12,
                speed: 0.8,
                curve: 1,
                essential: true,
            });
        }
    }, [latitude, longitude]);

    return (
        <div className="relative h-full">
            <Map
                initialViewState={config.map}
                ref={mapRef}
                style={{ width: '100%', height: '100vh' }}
                mapboxAccessToken="pk.eyJ1IjoiYWxlcGhyaSIsImEiOiJjamdwbHpycjIyZm45Mndud3AzamRibHpqIn0.ejAHwSGT6dcGxiDOrPCFLg"
                mapStyle="mapbox://styles/mapbox/streets-v12"
                dragRotate={false}
                touchZoomRotate={false}
                attributionControl={false}
            >
                {!coordinatesAvailable && (
                    <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-65 flex items-center justify-center text-xl">
                        <span>Coordinates not available</span>
                    </div>
                )}
            </Map>
        </div>
    );
};

