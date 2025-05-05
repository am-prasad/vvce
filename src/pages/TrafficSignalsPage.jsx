
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Clock, Filter, MapPin, MoreHorizontal, Search, TrafficCone } from 'lucide-react';

const TrafficSignalsPage = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter signals based on status and search query
  const filteredSignals = signals.filter(signal => {
    const statusMatch = filterStatus === 'all' || signal.status === filterStatus;
    const searchMatch = signal.location.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       signal.id.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && searchMatch;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Traffic Signals</h1>
          <p className="text-muted-foreground">Manage and monitor all traffic signals in the network</p>
        </div>
        <Button variant="default">
          <TrafficCone className="mr-2 h-4 w-4" />
          Add New Signal
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search signals by ID or location..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilterStatus('all')}>
              All Signals
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus('green')}>
              Green Signals
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus('yellow')}>
              Yellow Signals
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus('red')}>
              Red Signals
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus('emergency')}>
              Emergency Mode
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <Tabs defaultValue="signals">
        <TabsList>
          <TabsTrigger value="signals">All Signals</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Mode</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="signals" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Traffic Signal Network</CardTitle>
              <CardDescription>
                Showing {filteredSignals.length} of {signals.length} signals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Signal ID</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Controlled By</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSignals.map((signal) => (
                    <TableRow key={signal.id}>
                      <TableCell className="font-medium">{signal.id}</TableCell>
                      <TableCell>{signal.location}</TableCell>
                      <TableCell>
                        {getStatusBadge(signal.status)}
                      </TableCell>
                      <TableCell>{signal.lastUpdated}</TableCell>
                      <TableCell>{signal.controlledBy || '—'}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Configuration</DropdownMenuItem>
                            <DropdownMenuItem>View History</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-emergency">Trigger Emergency Mode</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filteredSignals.length}</strong> out of <strong>{signals.length}</strong> signals
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="emergency">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Mode Signals</CardTitle>
              <CardDescription>Traffic signals currently in emergency override mode</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Signal ID</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Emergency Vehicle</TableHead>
                      <TableHead>Started At</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {signals
                      .filter((s) => s.status === 'emergency')
                      .map((signal) => (
                        <TableRow key={signal.id}>
                          <TableCell className="font-medium">{signal.id}</TableCell>
                          <TableCell>{signal.location}</TableCell>
                          <TableCell>{signal.controlledBy}</TableCell>
                          <TableCell>{signal.emergencyStarted || '—'}</TableCell>
                          <TableCell>{signal.emergencyDuration || '—'}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              End Override
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Schedule</CardTitle>
              <CardDescription>Upcoming and past maintenance activities</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-10">
              <TrafficCone className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No maintenance activities scheduled</p>
              <Button variant="outline" className="mt-4">
                Schedule Maintenance
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground text-sm">Signals Online</div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">{signals.length}</div>
                <Badge className="bg-green-500">100%</Badge>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground text-sm">In Emergency Mode</div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">
                  {signals.filter((s) => s.status === 'emergency').length}
                </div>
                <Badge className="bg-emergency">Active</Badge>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground text-sm">Next Maintenance</div>
              <div className="text-2xl font-bold">05/15/2025</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const getStatusBadge = (status) => {
  switch (status) {
    case 'green':
      return <Badge className="bg-signal-green">Green</Badge>;
    case 'yellow':
      return <Badge className="bg-signal-yellow text-black">Yellow</Badge>;
    case 'red':
      return <Badge className="bg-signal-red">Red</Badge>;
    case 'emergency':
      return <Badge className="bg-emergency animate-pulse">Emergency</Badge>;
    case 'maintenance':
      return <Badge variant="outline" className="border-amber-500 text-amber-500">Maintenance</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const signals = [
  {
    id: 'TS-001',
    location: 'Main St & 5th Ave',
    status: 'green',
    controlledBy: 'Ambulance #103',
    lastUpdated: '2 mins ago',
    emergencyStarted: '10:26 AM',
    emergencyDuration: '5m 23s',
  },
  {
    id: 'TS-002',
    location: 'Lincoln Ave & Elm St',
    status: 'red',
    controlledBy: null,
    lastUpdated: '1 min ago',
  },
  {
    id: 'TS-003',
    location: 'Oak Dr & Pine St',
    status: 'yellow',
    controlledBy: null,
    lastUpdated: '30 secs ago',
  },
  {
    id: 'TS-008',
    location: 'Market St & 3rd Ave',
    status: 'emergency',
    controlledBy: 'Ambulance #103',
    lastUpdated: '15 secs ago',
    emergencyStarted: '10:27 AM',
    emergencyDuration: '3m 48s',
  },
  {
    id: 'TS-015',
    location: 'Park Ave & 12th St',
    status: 'green',
    controlledBy: 'Ambulance #105',
    lastUpdated: '45 secs ago',
    emergencyStarted: '10:32 AM',
    emergencyDuration: '1m 12s',
  },
  {
    id: 'TS-022',
    location: 'Broadway & 9th St',
    status: 'red',
    controlledBy: null,
    lastUpdated: '2 mins ago',
  },
  {
    id: 'TS-031',
    location: 'West End & River Rd',
    status: 'emergency',
    controlledBy: 'Ambulance #108',
    lastUpdated: '1 min ago',
    emergencyStarted: '10:35 AM',
    emergencyDuration: '2m 05s',
  },
  {
    id: 'TS-043',
    location: 'Highland Ave & Central St',
    status: 'green',
    controlledBy: null,
    lastUpdated: '3 mins ago',
  },
  {
    id: 'TS-056',
    location: 'Jefferson Blvd & Adams St',
    status: 'maintenance',
    controlledBy: null,
    lastUpdated: '2 hours ago',
  },
  {
    id: 'TS-078',
    location: 'Washington St & Madison Ave',
    status: 'red',
    controlledBy: null,
    lastUpdated: '4 mins ago',
  },
];

export default TrafficSignalsPage;
