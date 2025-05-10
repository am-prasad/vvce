import React, { useCallback, useRef, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const center = {
  lat: 12.9716,
  lng: 77.5946,
};

const EmergencyRouteMap = () => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleMapLoad = useCallback((map) => {
    mapRef.current = map;
    setMapLoaded(true);

    // Now it's safe to access window.google.maps
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();

    directionsRenderer.setMap(map);

    directionsService.route(
      {
        origin: { lat: 12.9716, lng: 77.5946 },
        destination: { lat: 12.9352, lng: 77.6140 },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result);
        } else {
          console.error('Directions request failed due to ' + status);
        }
      }
    );
  }, []);

  return (
    <LoadScript googleMapsApiKey="Your_Maps_API_key">
      <GoogleMap
        mapContainerStyle={{ height: '400px', width: '100%' }}
        center={center}
        zoom={13}
        onLoad={handleMapLoad}
      >
        {/* other children like markers or overlays */}
      </GoogleMap>
    </LoadScript>
  );
};

export default EmergencyRouteMap;
