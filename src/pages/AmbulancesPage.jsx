
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Missing import

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Ambulance, Clock, FilterX, MapPin, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
//import AmbulancesPage from './pages/AmbulancesPage';  // Make sure this path is correct

const AmbulancesPage = () => {
  const navigate = useNavigate();
  const handleRegisterClick = () => {
    console.log("Navigating to vehicle registration page...");
    // Navigate to the 'vehicle-registration' page when button is clicked
    navigate('/vehicle-registration');
  };
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredAmbulances = ambulances.filter(ambulance => {
    const statusMatch = statusFilter === 'all' || ambulance.status === statusFilter;
    const searchMatch = ambulance.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        ambulance.location.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && searchMatch;
  });
  
  const handleDispatch = async (id) => {
    toast({
      title: `Ambulance ${id} dispatched`,
      description: "Emergency dispatch request has been sent."
    });
  
    // Example dispatch to Arduino — adjust lane/signal logic as needed
    try {
      await fetch('http://localhost:3001/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lane: 'L1',        // You could dynamically decide this based on ambulance info
          signal: 'GREEN'    // Signal status to be set
        }),
      });
      console.log(`Signal for ambulance ${id} dispatched to Arduino.`);
    } catch (error) {
      console.error(`Error dispatching ambulance ${id} to Arduino:`, error);
      toast({
        title: "Dispatch Failed",
        description: `Could not communicate with the signal system for ambulance ${id}.`,
        variant: "destructive",
      });
    }
  };
  
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Ambulance Fleet</h1>
          <p className="text-muted-foreground">Monitor and manage the emergency vehicle fleet</p>
        </div>
        <Button onClick={handleRegisterClick}>
          <Ambulance className="mr-2 h-4 w-4" />
          Register New Vehicle
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search ambulances..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex">
          <Button 
            variant={statusFilter === 'all' ? 'default' : 'outline'} 
            className="rounded-r-none"
            onClick={() => setStatusFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={statusFilter === 'emergency' ? 'default' : 'outline'} 
            className="rounded-none border-l-0 border-r-0"
            onClick={() => setStatusFilter('emergency')}
          >
            Emergency
          </Button>
          <Button 
            variant={statusFilter === 'active' ? 'default' : 'outline'}
            className="rounded-none border-r-0"
            onClick={() => setStatusFilter('active')}
          >
            Active
          </Button>
          <Button 
            variant={statusFilter === 'idle' ? 'default' : 'outline'} 
            className="rounded-l-none"
            onClick={() => setStatusFilter('idle')}
          >
            Idle
          </Button>
        </div>
      </div>
      
      {statusFilter !== 'all' || searchQuery ? (
        <div className="flex justify-between items-center">
          <div className="text-sm">
            Showing {filteredAmbulances.length} of {ambulances.length} ambulances
          </div>
          <Button variant="ghost" size="sm" onClick={() => {
            setStatusFilter('all');
            setSearchQuery('');
          }}>
            <FilterX className="h-4 w-4 mr-2" />
            Clear filters
          </Button>
        </div>
      ) : null}
      
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Ambulance Fleet Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>ETA</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAmbulances.map((ambulance) => (
                    <TableRow key={ambulance.id}>
                      <TableCell className="font-medium">
                        #{ambulance.id}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(ambulance.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          {ambulance.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        {ambulance.destination || '—'}
                      </TableCell>
                      <TableCell>{ambulance.driver}</TableCell>
                      <TableCell>
                        {ambulance.eta ? (
                          <div className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            {ambulance.eta}
                          </div>
                        ) : '—'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">Details</Button>
                          {ambulance.status !== 'emergency' && (
                            <Button size="sm" onClick={() => handleDispatch(ambulance.id)}>Dispatch</Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredAmbulances.length === 0 && (
                <div className="text-center p-6">
                  <p className="text-muted-foreground">No ambulances found matching your filters</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAmbulances.map((ambulance) => (
              <AmbulanceCard key={ambulance.id} ambulance={ambulance} onDispatch={handleDispatch} />
            ))}
            
            {filteredAmbulances.length === 0 && (
              <div className="col-span-full text-center p-6 border rounded-md">
                <p className="text-muted-foreground">No ambulances found matching your filters</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>Fleet Location Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="map-container aspect-[16/9] bg-gray-100 flex items-center justify-center">
                <div className="text-center p-8">
                  <p className="text-muted-foreground mb-4">Interactive map view is under development</p>
                  <div className="grid grid-cols-3 gap-2 max-w-md mx-auto text-xs">
                    <div className="flex items-center justify-center p-2 bg-emergency/20 rounded">
                      <span className="w-2 h-2 bg-emergency rounded-full mr-1"></span>
                      <span>Emergency</span>
                    </div>
                    <div className="flex items-center justify-center p-2 bg-signal-green/20 rounded">
                      <span className="w-2 h-2 bg-signal-green rounded-full mr-1"></span>
                      <span>Active</span>
                    </div>
                    <div className="flex items-center justify-center p-2 bg-muted/20 rounded">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full mr-1"></span>
                      <span>Idle</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Fleet"
          value={ambulances.length}
          description="Total registered ambulances"
        />
        <StatCard
          title="On Emergency"
          value={ambulances.filter(a => a.status === 'emergency').length}
          description="Currently on emergency calls"
        />
        <StatCard
          title="Active"
          value={ambulances.filter(a => a.status === 'active').length}
          description="En route or returning"
        />
        <StatCard
          title="Available"
          value={ambulances.filter(a => a.status === 'idle').length}
          description="Ready to be dispatched"
        />
      </div>
    </div>
  );
};

const AmbulanceCard = ({ ambulance, onDispatch }) => {
  return (
    <Card className={ambulance.status === 'emergency' ? 'border-emergency/30 bg-emergency/5' : ''}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Ambulance #{ambulance.id}</CardTitle>
          {getStatusBadge(ambulance.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <div className="text-muted-foreground">Driver</div>
            <div className="font-medium">{ambulance.driver}</div>
          </div>
          <div className="flex justify-between text-sm">
            <div className="text-muted-foreground">Type</div>
            <div>{ambulance.type}</div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium">Current Location:</p>
              <p className="text-sm">{ambulance.location}</p>
            </div>
          </div>
          {ambulance.destination && (
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-emergency mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Destination:</p>
                <p className="text-sm">{ambulance.destination}</p>
                {ambulance.eta && <p className="text-xs text-muted-foreground">ETA: {ambulance.eta}</p>}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">Details</Button>
          {ambulance.status !== 'emergency' && (
            <Button size="sm" className="flex-1" onClick={() => handleDispatch(ambulance.id)}>Dispatch</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const StatCard = ({ title, value, description }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

const getStatusBadge = (status) => {
  switch (status) {
    case 'emergency':
      return <Badge className="bg-emergency animate-pulse">Emergency</Badge>;
    case 'active':
      return <Badge className="bg-signal-green">Active</Badge>;
    case 'idle':
      return <Badge variant="outline">Idle</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const ambulances = [
  {
    id: '103',
    status: 'active',
    location: 'Main St & 5th Ave',
    destination: 'Memorial Hospital',
    driver: 'John Doe',
    eta: '6 mins',
    type: 'Type III',
  },
  // {
  //   id: '105',
  //   status: 'active',
  //   location: 'Park Ave & 12th St',
  //   destination: 'Central Medical Center',
  //   driver: 'Emma Williams',
  //   eta: '12 mins',
  //   type: 'Type II',
  // },
  // {
  //   id: '108',
  //   status: 'active',
  //   location: 'West End & River Rd',
  //   destination: 'County General Hospital',
  //   driver: 'Michael Johnson',
  //   eta: '9 mins',
  //   type: 'Type III',
  // },
  // {
  //   id: '112',
  //   status: 'idle',
  //   location: 'Emergency Base Station',
  //   destination: null,
  //   driver: 'Sarah Brown',
  //   eta: null,
  //   type: 'Type I',
  // },
  // {
  //   id: '115',
  //   status: 'idle',
  //   location: 'Central Fire Station',
  //   destination: null,
  //   driver: 'Robert Wilson',
  //   eta: null,
  //   type: 'Type II',
  // },
  // {
  //   id: '118',
  //   status: 'idle',
  //   location: 'North Base Station',
  //   destination: null,
  //   driver: 'Jennifer Davis',
  //   eta: null,
  //   type: 'Type III',
  // },
  // {
  //   id: '121',
  //   status: 'active',
  //   location: 'Highland Park',
  //   destination: 'St. Joseph Medical Center',
  //   driver: 'David Miller',
  //   eta: '15 mins',
  //   type: 'Type I',
  // },
  // {
  //   id: '124',
  //   status: 'emergency',
  //   location: 'Downtown District',
  //   destination: 'Memorial Hospital',
  //   driver: 'Lisa Anderson',
  //   eta: '3 mins',
  //   type: 'Type III',
  // },
];

export default AmbulancesPage;
