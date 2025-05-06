import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Navigation } from 'lucide-react';

const getStatusBadge = (status) => {
  switch (status) {
    case 'emergency':
      return <Badge className="bg-emergency">Emergency</Badge>;
    case 'active':
      return <Badge variant="outline" className="bg-signal-green text-white">Active</Badge>;
    case 'idle':
      return <Badge variant="outline">Idle</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export const ActiveAmbulances = () => {
  // This would come from an API in a real application
  const ambulances = [
    {
      id: '#103',
      status: 'emergency',
      location: 'Main St & 5th Ave',
      destination: 'Memorial Hospital',
      eta: '6 mins',
      optimizedSignals: 5,
    },
    {
      id: '#105',
      status: 'active',
      location: 'Park Ave & 12th St',
      destination: 'Central Medical Center',
      eta: '12 mins',
      optimizedSignals: 3,
    },
    {
      id: '#108',
      status: 'active',
      location: 'West End & River Rd',
      destination: 'County General Hospital',
      eta: '9 mins',
      optimizedSignals: 4,
    },
    {
      id: '#112',
      status: 'idle',
      location: 'Emergency Base Station',
      destination: null,
      eta: null,
      optimizedSignals: 0,
    },
  ];

  return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Active Ambulances</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ambulances.map((ambulance) => (
              <div 
                key={ambulance.id} 
                className={`flex items-center justify-between border-b pb-4 last:border-0 last:pb-0 ${
                  ambulance.status === 'emergency' ? 'bg-emergency/5 -mx-6 px-6' : ''
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-4">
                    <span className="font-medium">{`Ambulance ${ambulance.id}`}</span>
                    {getStatusBadge(ambulance.status)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{ambulance.location}</span>
                  </div>
                  {ambulance.destination && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Navigation className="h-3.5 w-3.5" />
                      <span>To: {ambulance.destination}</span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  {ambulance.eta && (
                    <div className="flex items-center justify-end gap-1 font-medium">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{ambulance.eta}</span>
                    </div>
                  )}
                  {ambulance.optimizedSignals > 0 && (
                    <div className="text-xs text-muted-foreground">
                      {ambulance.optimizedSignals} signals optimized
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
  );
};
