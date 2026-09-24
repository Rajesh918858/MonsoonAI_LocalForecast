import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BlockForecastPanel from './components/BlockForecastPanel';
import RiskMapPanel from './components/RiskMapPanel';
import MobileAdvisoryMockup from './components/MobileAdvisoryMockup';
import TeleconnectionsView from './components/TeleconnectionsView';
import SmsWhatsAppGateway from './components/SmsWhatsAppGateway';
import CropAdvisoryMatrix from './components/CropAdvisoryMatrix';
import OfficerDashboard from './components/OfficerDashboard';
import LoginPortal from './components/LoginPortal';
import './App.css';

export default function App() {
  // Authentication & Portal State
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userRole, setUserRole] = useState('farmer'); // 'farmer' or 'officer'
  const [currentUser, setCurrentUser] = useState({
    role: 'farmer',
    name: 'रामेश पाटील (Ramesh Patil)',
    phone: '+91 98220 45678',
    village: 'Wagholi',
    blockId: 'haveli'
  });

  // Global Shared State across all panels
  const [selectedBlock, setSelectedBlock] = useState('haveli'); // Featured in screenshot: Pune -> Haveli
  const [selectedDistrict, setSelectedDistrict] = useState('Pune');
  const [selectedLanguage, setSelectedLanguage] = useState('mr'); // Marathi default matching screenshot
  
  // Navigation State
  const [activeTab, setActiveTab] = useState('prototype'); // 'prototype', 'map', 'teleconnections', 'crops', 'gateway', 'officer'
  const [activeNav, setActiveNav] = useState('dashboard');

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setUserRole(userData.role);
    setIsLoginModalOpen(false);
    if (userData.blockId) {
      setSelectedBlock(userData.blockId);
    }
    setActiveTab('prototype');
    setActiveNav('dashboard');
  };

  const handleSidebarNavChange = (navId) => {
    setActiveNav(navId);
    if (navId === 'dashboard' || navId === 'forecast' || navId === 'advisory') {
      setActiveTab('prototype');
    } else if (navId === 'riskmap') {
      setActiveTab('map');
    } else if (navId === 'teleconnections') {
      setActiveTab('teleconnections');
    } else if (navId === 'messaging') {
      setActiveTab('gateway');
    } else if (navId === 'crops') {
      setActiveTab('crops');
    } else {
      setActiveTab('prototype');
    }
  };

  const handleOpenGateway = (channel) => {
    setActiveTab('gateway');
    setActiveNav('messaging');
  };

  return (
    <div className="app-container">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        userRole={userRole}
        setUserRole={setUserRole}
        currentUser={currentUser}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />

      <div className="app-main-layout">
        {/* Left Sidebar Menu */}
        <Sidebar 
          activeNav={activeNav} 
          setActiveNav={handleSidebarNavChange} 
        />

        {/* Main Content Workspace */}
        <main className="app-content-area">
          {/* View 1: Main Dashboard based on User Role */}
          {activeTab === 'prototype' && (
            userRole === 'officer' ? (
              /* Dedicated Agri Extension Officer Dashboard Webpage */
              <OfficerDashboard 
                officerUser={currentUser}
                onSelectBlock={(id) => {
                  setSelectedBlock(id);
                  setActiveTab('map');
                }}
              />
            ) : (
              /* Dedicated Farmer Dashboard Webpage (3-Panel Unified Layout) */
              <div>
                <div className="farmer-welcome-bar">
                  <div className="farmer-welcome-info">
                    <span className="farmer-badge-tag">👨‍🌾 शेतकरी पोर्टल (Farmer Portal)</span>
                    <span className="farmer-greeting">
                      Welcome, <strong>{currentUser?.name || 'रामेश पाटील'}</strong> | Village: <strong>{currentUser?.village || 'Wagholi'}</strong> ({selectedDistrict})
                    </span>
                  </div>
                  <div className="farmer-quick-actions">
                    <button 
                      className="farmer-switch-btn"
                      onClick={() => setIsLoginModalOpen(true)}
                    >
                      Change Village / Farmer Login
                    </button>
                  </div>
                </div>

                <div className="prototype-three-panel-grid">
                  {/* Panel 1: Block Level Forecast */}
                  <BlockForecastPanel
                    selectedBlock={selectedBlock}
                    setSelectedBlock={setSelectedBlock}
                    selectedDistrict={selectedDistrict}
                    setSelectedDistrict={setSelectedDistrict}
                  />

                  {/* Panel 2: Interactive Risk Map */}
                  <RiskMapPanel
                    selectedBlock={selectedBlock}
                    setSelectedBlock={setSelectedBlock}
                    selectedDistrict={selectedDistrict}
                    setSelectedDistrict={setSelectedDistrict}
                    stateName="Maharashtra"
                  />

                  {/* Panel 3: Smartphone Advisory View */}
                  <MobileAdvisoryMockup
                    selectedBlock={selectedBlock}
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                    onOpenGateway={handleOpenGateway}
                  />
                </div>
              </div>
            )
          )}

          {/* View 2: Full Screen High-Res Risk Map */}
          {activeTab === 'map' && (
            <div className="map-view-fullscreen">
              <RiskMapPanel
                selectedBlock={selectedBlock}
                setSelectedBlock={setSelectedBlock}
                selectedDistrict={selectedDistrict}
                setSelectedDistrict={setSelectedDistrict}
                stateName="Maharashtra"
              />
            </div>
          )}

          {/* View 3: Climate Teleconnections (ENSO, IOD, MJO) Lab */}
          {activeTab === 'teleconnections' && (
            <TeleconnectionsView onSelectBlock={setSelectedBlock} />
          )}

          {/* View 4: Crop Agronomic Matrix */}
          {activeTab === 'crops' && (
            <CropAdvisoryMatrix 
              selectedBlock={selectedBlock} 
              selectedLanguage={selectedLanguage} 
            />
          )}

          {/* View 5: SMS / WhatsApp Dispatch Gateway */}
          {activeTab === 'gateway' && (
            <SmsWhatsAppGateway 
              selectedBlock={selectedBlock} 
              selectedLanguage={selectedLanguage} 
            />
          )}
        </main>
      </div>

      {/* Login / Switch Portal Modal */}
      {isLoginModalOpen && (
        <LoginPortal 
          onLoginSuccess={handleLoginSuccess}
          currentRole={userRole}
        />
      )}
    </div>
  );
}
