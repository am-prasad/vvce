import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Search } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';

export const Navbar = () => {
  const { setSidebarOpen } = useSidebar();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/notifications");
  };

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Button 
          variant="outline" 
          size="icon"
          className="mr-4 md:hidden"
          onClick={() => setSidebarOpen(open => !open)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
               viewBox="0 0 24 24" fill="none" stroke="currentColor" 
               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
               className="h-6 w-6">
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
          />
        </div>

        <div className="ml-auto flex items-center space-x-2">
          <Button variant="outline" size="icon" className="relative" onClick={handleClick}>
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-500 text-[10px] font-medium text-white flex items-center justify-center">
            1
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};
