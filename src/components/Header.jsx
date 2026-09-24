import React from 'react';
import { CloudRain, Globe, Shield, Sparkles, User, Bell, Languages } from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  selectedLanguage, 
  setSelectedLanguage,
  userRole,
  setUserRole,
  currentUser,
  onOpenLogin
}) {
  const languages = [
    { code: 'mr', name: 'मराठी (Marathi)' },
    { code: 'hi', name: 'हिन्दी (Hindi)' },
    { code: 'en', name: 'English' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)' }
  ];

  return (
    <header className="monsoon-header">
      <div className="header-left">
        <div className="brand-logo-container" onClick={() => setActiveTab('prototype')}>
          <div className="brand-logo-icon">
            <CloudRain className="cloud-icon" size={28} />
            <div className="water-drop-pulse"></div>
          </div>
          <div className="brand-text">
            <div className="brand-title">
              Monsoon<span>Sathi</span>
            </div>
            <div className="brand-tagline">Predict Today, Prosper Tomorrow</div>
          </div>
        </div>
      </div>

      <div className="header-center">
        <nav className="view-mode-tabs">
          <button 
            className={`mode-tab-btn ${activeTab === 'prototype' ? 'active' : ''}`}
            onClick={() => setActiveTab('prototype')}
            title="Main Dashboard"
          >
            <Sparkles size={16} />
            <span>Dashboard</span>
          </button>
          <button 
            className={`mode-tab-btn ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            <Globe size={16} />
            <span>Risk Map</span>
          </button>
          <button 
            className={`mode-tab-btn ${activeTab === 'teleconnections' ? 'active' : ''}`}
            onClick={() => setActiveTab('teleconnections')}
          >
            <span>ENSO/IOD/MJO Lab</span>
          </button>
          <button 
            className={`mode-tab-btn ${activeTab === 'crops' ? 'active' : ''}`}
            onClick={() => setActiveTab('crops')}
          >
            <span>Crop Advisory</span>
          </button>
          <button 
            className={`mode-tab-btn ${activeTab === 'gateway' ? 'active' : ''}`}
            onClick={() => setActiveTab('gateway')}
          >
            <span>SMS/WhatsApp API</span>
          </button>
        </nav>
      </div>

      <div className="header-right">
        {/* Language Selector */}
        <div className="lang-selector-wrapper">
          <Languages size={17} className="lang-icon" />
          <select 
            value={selectedLanguage} 
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="lang-select-dropdown"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>{l.name}</option>
            ))}
          </select>
        </div>

        {/* Current Active User Profile Badge */}
        <div className={`user-profile-chip ${userRole === 'officer' ? 'officer-chip' : 'farmer-chip'}`}>
          <div className="user-chip-avatar">
            {userRole === 'officer' ? '👨‍💼' : '👨‍🌾'}
          </div>
          <div className="user-chip-info">
            <span className="user-chip-name">
              {currentUser?.name || (userRole === 'officer' ? 'Dr. Aniket Deshmukh' : 'रामेश पाटील (Farmer)')}
            </span>
            <span className="user-chip-role">
              {userRole === 'officer' ? 'Agri Extension Officer' : 'Farmer (Haveli)'}
            </span>
          </div>
        </div>

        {/* Switch Portal / Login Button */}
        <button 
          className="switch-portal-btn"
          onClick={() => onOpenLogin && onOpenLogin()}
          title="Switch between Farmer & Agricultural Extension Officer Portal"
        >
          <User size={15} />
          <span>Switch Portal</span>
        </button>

        <div className="live-status-indicator" title="Connected to IMD AWS Network + Reanalysis Downscaler">
          <span className="live-dot"></span>
          <span className="live-text">Live 1km² Grid</span>
        </div>
      </div>
    </header>
  );
}
