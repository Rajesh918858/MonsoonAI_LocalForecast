import React from 'react';
import { 
  LayoutDashboard, 
  Clock, 
  MapPin, 
  Lightbulb, 
  Sprout, 
  Settings, 
  Activity, 
  MessageSquareShare,
  CloudRain
} from 'lucide-react';

export default function Sidebar({ activeNav, setActiveNav }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'forecast', label: 'Forecast', icon: Clock },
    { id: 'riskmap', label: 'Risk Map', icon: MapPin },
    { id: 'advisory', label: 'Advisory', icon: Lightbulb },
    { id: 'crops', label: 'Crops', icon: Sprout },
    { id: 'teleconnections', label: 'Climate Indices', icon: Activity },
    { id: 'messaging', label: 'SMS / WhatsApp', icon: MessageSquareShare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="monsoon-sidebar">
      <div className="sidebar-brand-mini">
        <div className="sidebar-brand-icon">
          <CloudRain size={22} color="#0284c7" />
        </div>
        <span className="sidebar-brand-title">MonsoonSathi</span>
      </div>

      <nav className="sidebar-nav-list">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveNav(item.id)}
            >
              <Icon size={19} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
              {isActive && <div className="active-glow-bar" />}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
