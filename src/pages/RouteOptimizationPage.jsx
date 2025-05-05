
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Route, MapPin, Navigation, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RouteOptimizationPage = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('active');
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Simulate route calculation
  const handleCalculateRoute = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      toast({
        title: "Route Optimized",
        description: "Emergency route has been calculated and traffic signals are being updated.",
      });
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Route Optimization</h1>
        <Button variant="destructive" className="gap-2">
          <AlertCircle className="h-4 w-4" />
          <span>Emergency Override</span>
        </Button>
      </div>
      
      <Tabs defaultValue="active" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Routes</TabsTrigger>
          <TabsTrigger value="create">Create New Route</TabsTrigger>
          <TabsTrigger value="history">Route History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <RouteCard 
              id="R-103"
              ambulanceId="#103"
              origin="Main St & 5th Ave"
              destination="Memorial Hospital"
              eta="6 mins"
              distance="2.3 miles"
              signalsOptimized={5}
              isEmergency={true}
            />
            <RouteCard 
              id="R-105"
              ambulanceId="#105"
              origin="Park Ave & 12th St"
              destination="Central Medical Center"
              eta="12 mins"
              distance="4.8 miles"
              signalsOptimized={3}
              isEmergency={false}
            />
            <RouteCard 
              id="R-108"
              ambulanceId="#108"
              origin="West End & River Rd"
              destination="County General Hospital"
              eta="9 mins"
              distance="3.5 miles"
              signalsOptimized={4}
              isEmergency={false}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calculate Optimal Route</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="vehicle">Ambulance ID</Label>
                  <Input id="vehicle" placeholder="Select ambulance..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                    <option>Emergency (Override All Signals)</option>
                    <option>High (Optimize Major Intersections)</option>
                    <option>Standard (Normal Routing)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="origin">Starting Point</Label>
                  <Input id="origin" placeholder="Current location or address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input id="destination" placeholder="Hospital or emergency site" />
                </div>
              </div>
              <Button onClick={handleCalculateRoute} className="w-full mt-4" disabled={isCalculating}>
                {isCalculating ? "Calculating optimal route..." : "Calculate Route"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Route History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between pb-4 border-b last:border-0">
                    <div className="space-y-1">
                      <p className="font-medium">Route #{1000 + i}</p>
                      <div className="text-sm text-muted-foreground">
                        <span>Ambulance #10{i} • {new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="text-sm flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{5 + i} minutes saved</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const RouteCard = ({ id, ambulanceId, origin, destination, eta, distance, signalsOptimized, isEmergency }) => {
  return (
    <Card className={isEmergency ? "border-emergency/30 bg-emergency/5" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Route {id}</CardTitle>
          {isEmergency && <Badge className="bg-emergency">EMERGENCY</Badge>}
        </div>
        <p className="text-sm text-muted-foreground">Ambulance {ambulanceId}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">From:</p>
              <p className="text-sm">{origin}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Navigation className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">To:</p>
              <p className="text-sm">{destination}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">ETA</p>
            <p className="font-medium">{eta}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Distance</p>
            <p className="font-medium">{distance}</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">
            <Route className="h-3.5 w-3.5 inline mr-1" />
            {signalsOptimized} traffic signals optimized
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">View</Button>
          <Button variant="outline" size="sm" className="flex-1">Reroute</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteOptimizationPage;
