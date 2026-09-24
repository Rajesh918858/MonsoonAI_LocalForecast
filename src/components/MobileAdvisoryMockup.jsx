import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sprout, 
  Volume2, 
  VolumeX, 
  Share2, 
  Send, 
  CheckCheck, 
  Smartphone, 
  AlertCircle,
  Users,
  ChevronDown
} from 'lucide-react';
import { MAHARASHTRA_BLOCKS, CROP_DATABASE } from '../data/monsoonData';

export default function MobileAdvisoryMockup({ 
  selectedBlock, 
  selectedLanguage, 
  setSelectedLanguage,
  onOpenGateway 
}) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('Soybean (सोयाबीन)');
  const [shareSuccess, setShareSuccess] = useState(false);

  const currentBlockData = MAHARASHTRA_BLOCKS.find(b => b.id === selectedBlock) || MAHARASHTRA_BLOCKS[0];
  const advisoryData = currentBlockData.advisories[selectedLanguage] || currentBlockData.advisories['mr'];

  // Text to Speech for regional audio advisory
  const handleToggleAudio = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(advisoryData.headline + " " + advisoryData.sowingAdvice);
      
      if (selectedLanguage === 'mr') utterance.lang = 'mr-IN';
      else if (selectedLanguage === 'hi') utterance.lang = 'hi-IN';
      else utterance.lang = 'en-IN';

      utterance.rate = 0.9;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    } else {
      alert("Text-to-Speech is not supported in this browser.");
    }
  };

  const handleSimulateShare = () => {
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 3000);
  };

  return (
    <div className="mobile-mockup-wrapper">
      {/* Smartphone Device Frame */}
      <div className="smartphone-frame">
        {/* Dynamic Island / Speaker Notch */}
        <div className="phone-notch">
          <div className="camera-lens"></div>
          <div className="speaker-grill"></div>
        </div>

        {/* Screen Content */}
        <div className="phone-screen">
          {/* Status Bar */}
          <div className="phone-status-bar">
            <span className="status-time">9:41</span>
            <div className="status-icons">
              <span className="network-sig">5G</span>
              <span className="battery-icon">100%</span>
            </div>
          </div>

          {/* App Header matching Screenshot: "< Advisory for You" + Language dropdown */}
          <div className="app-nav-bar">
            <div className="nav-left">
              <ArrowLeft size={18} className="back-arrow" />
              <span className="nav-title">Advisory for You</span>
            </div>

            <div className="nav-lang-picker">
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="phone-lang-select"
              >
                <option value="mr">मराठी (Marathi)</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="en">English</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="gu">ગુજરાતી (Gujarati)</option>
              </select>
            </div>
          </div>

          {/* Subheader: Location + Time Horizon matching screenshot */}
          <div className="location-horizon-bar">
            <div className="loc-name">
              <strong>{currentBlockData.district}, {currentBlockData.name}</strong>
            </div>
            <div className="horizon-pill">Next 7 Days</div>
          </div>

          {/* Scrollable Advisory Feed */}
          <div className="phone-content-scroll">
            {/* Primary Action Card matching Screenshot */}
            <div className="mobile-advisory-card">
              <div className="advisory-card-top">
                <div className="card-plant-icon">
                  <Sprout size={32} color="#15803d" />
                </div>
                <div className="urgent-badge">
                  <span>Action Needed</span>
                </div>
              </div>

              {/* Exact Marathi Text / Regional Translation from Screenshot */}
              <div className="advisory-primary-text">
                {advisoryData.headline}
              </div>

              {/* Deep-dive bullet points */}
              <div className="advisory-sub-details">
                <div className="detail-item">
                  <span className="detail-bullet">🌱</span>
                  <div>
                    <strong>Sowing Guidance:</strong>
                    <p>{advisoryData.sowingAdvice}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="detail-bullet">💧</span>
                  <div>
                    <strong>Irrigation Strategy:</strong>
                    <p>{advisoryData.irrigationAdvice}</p>
                  </div>
                </div>

                <div className="detail-item risk-warning">
                  <span className="detail-bullet">⚠️</span>
                  <div>
                    <strong>False Onset Risk:</strong>
                    <p>{advisoryData.cropRisk}</p>
                  </div>
                </div>
              </div>

              {/* Crop Selector Pill */}
              <div className="phone-crop-selector">
                <span className="crop-label">Crop:</span>
                <select 
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="crop-inline-select"
                >
                  {CROP_DATABASE.map((c, i) => (
                    <option key={i} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Audio Readout & Action Buttons */}
              <div className="card-action-bar">
                <button 
                  className={`audio-speech-btn ${isPlayingAudio ? 'playing' : ''}`}
                  onClick={handleToggleAudio}
                  title="Listen in Regional Language (Text-to-Speech)"
                >
                  {isPlayingAudio ? (
                    <>
                      <VolumeX size={16} />
                      <span>Stop Voice</span>
                    </>
                  ) : (
                    <>
                      <Volume2 size={16} />
                      <span>मराठीत ऐका (Voice)</span>
                    </>
                  )}
                </button>

                <button 
                  className="whatsapp-share-btn"
                  onClick={() => onOpenGateway && onOpenGateway('whatsapp')}
                  title="Share Advisory via WhatsApp"
                >
                  <Share2 size={15} />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Hyperlocal Soil & Microclimate Status */}
            <div className="phone-micro-card">
              <div className="micro-row">
                <span className="m-title">Root-Zone Moisture:</span>
                <span className="m-val">{currentBlockData.probabilities.soilMoisture}</span>
              </div>
              <div className="micro-row">
                <span className="m-title">Break Probability:</span>
                <span className="m-val text-amber">{currentBlockData.probabilities.drySpell}%</span>
              </div>
              <div className="micro-row">
                <span className="m-title">Heavy Rain Alert:</span>
                <span className="m-val text-blue">{currentBlockData.probabilities.heavyRain}%</span>
              </div>
            </div>

            {/* Quick SMS / Alert Push Simulator */}
            <div className="phone-quick-actions">
              <button 
                className="quick-dispatch-btn"
                onClick={() => onOpenGateway && onOpenGateway('sms')}
              >
                <Send size={14} />
                <span>Dispatch Farmer SMS Alert</span>
              </button>
            </div>
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="phone-home-indicator"></div>
        </div>
      </div>

      {/* Target Audience Tag below mockup matching slide */}
      <div className="mockup-target-footer">
        <div className="target-icons">
          <div className="target-avatar farmer-avatar">👨‍🌾</div>
          <div className="target-avatar officer-avatar">👨‍💼</div>
        </div>
        <div className="target-title">
          Farmers, Agricultural Officers &amp; Stakeholders
        </div>
        <div className="target-subtitle">
          Instant multi-channel delivery via regional Web, SMS &amp; WhatsApp
        </div>
      </div>
    </div>
  );
}
