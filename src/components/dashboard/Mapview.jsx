import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const MapView = () => {
  return (
    <Card className="col-span-1 lg:col-span-3 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Live Map View</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="map-container aspect-[16/9] bg-gray-100 flex items-center justify-center">
          {/* In a real app, this would be replaced with an actual map integration */}
          <div className="text-center p-8">
            <p className="text-muted-foreground mb-2">City Emergency Response Map</p>
            <div className="grid grid-cols-3 gap-2 max-w-md mx-auto text-xs">
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
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};