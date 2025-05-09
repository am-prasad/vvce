import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GoogleMap, LoadScript } from "@react-google-maps/api";

// Map container and default center
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 12.9796, // Example: SJCE
  lng: 77.5909,
};

const Mapview = () => {
  return (
    <Card className="col-span-1 lg:col-span-3 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Live Map View</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="map-container aspect-[16/9] relative">
          {/* Google Maps Integration */}
          <LoadScript googleMapsApiKey="AIzaSyARQhwLdUBlA9_n6QDPpq5gRHGNvgYgmIA">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={12}
            />
          </LoadScript>
        </div>
      </CardContent>
    </Card>
  );
};

export default Mapview;
