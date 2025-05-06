import React from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { 
  Sidebar as SidebarContainer, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel
} from '@/components/ui/sidebar';
import { 
  Ambulance, 
  BarChart3, 
  Home, 
  MapPin, 
  Settings, 
  TrafficCone, 
  AlertCircle,
  Hospital,
  HeartPulse,
  Armchair,
  Activity,
  Haze
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const menuItems = [
  { to: "/", icon: Home, label: "Dashboard" },
  { to: "/ambulances", icon: Ambulance, label: "Ambulances" },
  { to: "/traffic-signals", icon: TrafficCone, label: "Traffic Signals" },
  { to: "/route-optimization", icon: MapPin, label: "Routes" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export const Sidebar = () => {
   const navigate = useNavigate();
  
    const handleClick = () => {
      navigate("/trigger-emergency");
    };
  return (
    <SidebarContainer>
      <SidebarHeader className="p-4 flex items-center space-x-2">
        <Activity className="h-6 w-6 text-emergency" />
        <span className="text-lg font-bold">Smart Siren</span>
        <SidebarTrigger className="ml-auto md:hidden" />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                          isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                        )
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-8">
          <SidebarGroupLabel>Emergency Alerts</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-4 py-2">
              <Button variant="destructive" className="w-full gap-2" onClick={handleClick}>
                <AlertCircle className="h-4 w-4" />
                <span>Trigger Emergency</span>
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 text-xs text-muted-foreground">
        <div>Smart Siren © 2025</div>
      </SidebarFooter>
    </SidebarContainer>
  );
};
