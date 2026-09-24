import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Smartphone, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Sprout, 
  Building2, 
  KeyRound,
  Sparkles,
  Phone
} from 'lucide-react';
import { MAHARASHTRA_BLOCKS } from '../data/monsoonData';

export default function LoginPortal({ onLoginSuccess, currentRole }) {
  const [selectedRole, setSelectedRole] = useState(currentRole || 'farmer'); // 'farmer' or 'officer'
  
  // Farmer Login States
  const [farmerPhone, setFarmerPhone] = useState('98220 45678');
  const [farmerName, setFarmerName] = useState('रामेश पाटील (Ramesh Patil)');
  const [farmerVillage, setFarmerVillage] = useState('Wagholi');
  const [farmerBlock, setFarmerBlock] = useState('haveli');

  // Officer Login States
  const [officerId, setOfficerId] = useState('MH-AGRI-PUN-402');
  const [officerName, setOfficerName] = useState('Dr. Aniket Deshmukh');
  const [officerDesignation, setOfficerDesignation] = useState('Sub-Divisional Agricultural Officer (Haveli & Pune)');
  const [officerPassword, setOfficerPassword] = useState('••••••••');

  const handleFarmerLogin = (e) => {
    e.preventDefault();
    onLoginSuccess({
      role: 'farmer',
      name: farmerName,
      phone: farmerPhone,
      village: farmerVillage,
      blockId: farmerBlock
    });
  };

  const handleOfficerLogin = (e) => {
    e.preventDefault();
    onLoginSuccess({
      role: 'officer',
      name: officerName,
      officerId: officerId,
      designation: officerDesignation,
      district: 'Pune'
    });
  };

  const handleQuickDemoFarmer = () => {
    onLoginSuccess({
      role: 'farmer',
      name: 'रामेश पाटील (Ramesh Patil)',
      phone: '+91 98220 45678',
      village: 'Wagholi',
      blockId: 'haveli'
    });
  };

  const handleQuickDemoOfficer = () => {
    onLoginSuccess({
      role: 'officer',
      name: 'Dr. Aniket Deshmukh (M.Sc. Agronomy)',
      officerId: 'MH-AGRI-PUN-402',
      designation: 'Block Agricultural Extension Officer, Haveli',
      district: 'Pune'
    });
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-card-container">
        {/* Header */}
        <div className="login-card-header">
          <div className="login-logo-pill">
            <Sprout size={20} color="#10b981" />
            <span>MonsoonSathi Authentication</span>
          </div>
          <h2 className="login-card-title">Choose Portal to Log In</h2>
          <p className="login-card-subtitle">
            Dedicated role-based access for local Farmers &amp; Government Agricultural Extension Officers.
          </p>
        </div>

        {/* Role Toggle Selector */}
        <div className="portal-role-toggle">
          <button
            type="button"
            className={`portal-role-btn ${selectedRole === 'farmer' ? 'active farmer-theme' : ''}`}
            onClick={() => setSelectedRole('farmer')}
          >
            <div className="portal-role-icon">👨‍🌾</div>
            <div className="portal-role-meta">
              <span className="role-main">Farmer Portal</span>
              <span className="role-sub">शेतकरी / किसान पोर्टल</span>
            </div>
            {selectedRole === 'farmer' && <CheckCircle2 size={18} className="role-check" />}
          </button>

          <button
            type="button"
            className={`portal-role-btn ${selectedRole === 'officer' ? 'active officer-theme' : ''}`}
            onClick={() => setSelectedRole('officer')}
          >
            <div className="portal-role-icon">👨‍💼</div>
            <div className="portal-role-meta">
              <span className="role-main">Agri Extension Officer</span>
              <span className="role-sub">कृषी अधिकारी / विस्तार पोर्टल</span>
            </div>
            {selectedRole === 'officer' && <CheckCircle2 size={18} className="role-check" />}
          </button>
        </div>

        {/* Farmer Login Form */}
        {selectedRole === 'farmer' ? (
          <form onSubmit={handleFarmerLogin} className="login-form">
            <div className="login-form-group">
              <label className="login-label">Farmer Name / नाव</label>
              <div className="login-input-wrap">
                <User size={16} className="login-input-icon" />
                <input 
                  type="text" 
                  value={farmerName} 
                  onChange={(e) => setFarmerName(e.target.value)}
                  className="login-input"
                  required
                />
              </div>
            </div>

            <div className="login-form-group">
              <label className="login-label">Mobile Number / मोबाईल नंबर (For SMS/WhatsApp Alerts)</label>
              <div className="login-input-wrap">
                <Phone size={16} className="login-input-icon" />
                <input 
                  type="text" 
                  value={farmerPhone} 
                  onChange={(e) => setFarmerPhone(e.target.value)}
                  className="login-input"
                  placeholder="10-digit mobile number"
                  required
                />
              </div>
            </div>

            <div className="login-row-2">
              <div className="login-form-group">
                <label className="login-label">Block / Taluka (तालुका)</label>
                <select 
                  value={farmerBlock} 
                  onChange={(e) => setFarmerBlock(e.target.value)}
                  className="login-select"
                >
                  {MAHARASHTRA_BLOCKS.map(b => (
                    <option key={b.id} value={b.id}>{b.name} ({b.district})</option>
                  ))}
                </select>
              </div>

              <div className="login-form-group">
                <label className="login-label">Gram Panchayat / गाव</label>
                <div className="login-input-wrap">
                  <MapPin size={16} className="login-input-icon" />
                  <input 
                    type="text" 
                    value={farmerVillage} 
                    onChange={(e) => setFarmerVillage(e.target.value)}
                    className="login-input"
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="login-submit-btn farmer-btn">
              <span>Enter Farmer Portal</span>
              <ArrowRight size={17} />
            </button>

            <button 
              type="button" 
              className="quick-demo-btn"
              onClick={handleQuickDemoFarmer}
            >
              <Sparkles size={15} color="#10b981" />
              <span>1-Click Test Login as Farmer (Ramesh Patil - Haveli)</span>
            </button>
          </form>
        ) : (
          /* Agri Officer Login Form */
          <form onSubmit={handleOfficerLogin} className="login-form">
            <div className="login-form-group">
              <label className="login-label">Government Extension Officer ID</label>
              <div className="login-input-wrap">
                <ShieldCheck size={16} className="login-input-icon" />
                <input 
                  type="text" 
                  value={officerId} 
                  onChange={(e) => setOfficerId(e.target.value)}
                  className="login-input"
                  placeholder="e.g. MH-AGRI-PUN-402"
                  required
                />
              </div>
            </div>

            <div className="login-form-group">
              <label className="login-label">Officer Full Name</label>
              <div className="login-input-wrap">
                <User size={16} className="login-input-icon" />
                <input 
                  type="text" 
                  value={officerName} 
                  onChange={(e) => setOfficerName(e.target.value)}
                  className="login-input"
                  required
                />
              </div>
            </div>

            <div className="login-row-2">
              <div className="login-form-group">
                <label className="login-label">Jurisdiction District</label>
                <select className="login-select" defaultValue="Pune">
                  <option value="Pune">Pune District (13 Blocks)</option>
                  <option value="Nashik">Nashik District</option>
                  <option value="Nagpur">Nagpur District</option>
                </select>
              </div>

              <div className="login-form-group">
                <label className="login-label">Security PIN / Password</label>
                <div className="login-input-wrap">
                  <KeyRound size={16} className="login-input-icon" />
                  <input 
                    type="password" 
                    value={officerPassword} 
                    onChange={(e) => setOfficerPassword(e.target.value)}
                    className="login-input"
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="login-submit-btn officer-btn">
              <span>Enter Agri Extension Officer Portal</span>
              <ArrowRight size={17} />
            </button>

            <button 
              type="button" 
              className="quick-demo-btn"
              onClick={handleQuickDemoOfficer}
            >
              <Sparkles size={15} color="#0284c7" />
              <span>1-Click Test Login as Agri Officer (Dr. Aniket Deshmukh)</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
