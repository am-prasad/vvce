import React, { useState,useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TrafficCone ,Search,Filter} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';


import TrafficSignalRegistrationForm from '@/components/ui/TrafficSignalRegistrationForm';


const TrafficSignalsPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [signals, setSignals] = useState([]);

// Load signals with useEffect
useEffect(() => {
  fetch('/api/traffic-signals') // replace with your actual endpoint
    .then((res) => res.json())
    .then((data) => setSignals(data))
    .catch((err) => console.error('Failed to load signals', err));
}, []);


  // Filter signals based on status and search query
  const filteredSignals = signals.filter(signal => {
    const statusMatch = filterStatus === 'all' || signal.status === filterStatus;
    const searchMatch = signal.location.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       signal.id.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && searchMatch;
  });

  const handleAddSignalClick = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Traffic Signals</h1>
          <p className="text-muted-foreground">Manage and monitor all traffic signals in the network</p>
        </div>
        <Button variant="default" onClick={handleAddSignalClick}>
          <TrafficCone className="mr-2 h-4 w-4" />
          Add New Signal
        </Button>
      </div>

      {/* Show the form when 'isFormOpen' is true */}
      {isFormOpen && <TrafficSignalRegistrationForm onClose={handleCloseForm} />}

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
      
      {/* Rest of the Traffic Signals Table Content */}
      <Tabs defaultValue="signals">
        {/* Tab Content */}
      </Tabs>
    </div>
  );
};

export default TrafficSignalsPage;
