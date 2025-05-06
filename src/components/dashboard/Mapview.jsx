import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GoogleMap, LoadScript } from "@react-google-maps/api";

// Map container and default center
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 12.304820, // Example: SJCE
  lng: 76.616364,
};

export const MapView = () => {
  return (
    <Card className="col-span-1 lg:col-span-3 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Live Map View</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="map-container aspect-[16/9] relative">
          {/* Google Maps Integration */}
          <LoadScript googleMapsApiKey="AIzaSyC2ktZSIoPAkSffDmGK7Csqmw78BmHeYAg">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={12}
            />
          </LoadScript>

          {/* Overlay legend
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-4 bg-white/90 rounded shadow p-4 text-xs grid grid-cols-3 gap-2 max-w-md w-full">
            <div className="flex items-center justify-center p-2 bg-signal-green/20 rounded">
              <span className="w-2 h-2 bg-signal-green rounded-full mr-1"></span>
              <span>Clear Routes</span>
            </div>
            <div className="flex items-center justify-center p-2 bg-signal-yellow/20 rounded">
              <span className="w-2 h-2 bg-signal-yellow rounded-full mr-1"></span>
              <span>Congestion</span>
            </div>
            <div className="flex items-center justify-center p-2 bg-signal-red/20 rounded">
              <span className="w-2 h-2 bg-signal-red rounded-full mr-1"></span>
              <span>Blocked</span>
            </div>
            <div className="col-span-3 flex items-center justify-center p-2 bg-emergency/20 rounded mt-2">
              <span className="w-2 h-2 bg-emergency rounded-full mr-1"></span>
              <span>Active Emergency Routes</span>
            </div>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
};
