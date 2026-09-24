import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  CheckCheck, 
  Smartphone, 
  Phone, 
  Globe, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  Terminal,
  Radio
} from 'lucide-react';
import { MAHARASHTRA_BLOCKS } from '../data/monsoonData';

export default function SmsWhatsAppGateway({ selectedBlock, selectedLanguage }) {
  const [phoneNumber, setPhoneNumber] = useState('+91 98220 45678');
  const [channel, setChannel] = useState('whatsapp'); // 'whatsapp' or 'sms'
  const [targetBlock, setTargetBlock] = useState(selectedBlock || 'haveli');
  const [lang, setLang] = useState(selectedLanguage || 'mr');
  const [deliveryStatus, setDeliveryStatus] = useState(null); // 'sending', 'delivered'
  const [logs, setLogs] = useState([
    { timestamp: '09:30:15', event: 'API Gateway initialized on port 8000 (FastAPI)' },
    { timestamp: '09:32:40', event: 'WebHook listener registered for Twilio & WhatsApp Cloud API' },
    { timestamp: '09:40:02', event: 'Scheduled batch broadcast: 12,450 farmers in Pune district queued' }
  ]);

  const blockObj = MAHARASHTRA_BLOCKS.find(b => b.id === targetBlock) || MAHARASHTRA_BLOCKS[0];
  const advisory = blockObj.advisories[lang] || blockObj.advisories['mr'];

  const handleSendNotification = (e) => {
    e.preventDefault();
    setDeliveryStatus('sending');

    const newLog = {
      timestamp: new Date().toLocaleTimeString(),
      event: `Dispatching ${channel.toUpperCase()} to ${phoneNumber} [Block: ${blockObj.name}, Lang: ${lang.toUpperCase()}]`
    };
    setLogs(prev => [newLog, ...prev]);

    setTimeout(() => {
      setDeliveryStatus('delivered');
      const confirmLog = {
        timestamp: new Date().toLocaleTimeString(),
        event: `STATUS 200 OK: Delivery confirmed via ${channel === 'whatsapp' ? 'Meta Cloud API' : 'Govt SMS Gateway (CDAC)'}`
      };
      setLogs(prev => [confirmLog, ...prev]);
    }, 1200);
  };

  return (
    <div className="gateway-container">
      <div className="gateway-header">
        <div className="gateway-badge">
          <Radio size={14} className="pulse-icon" />
          <span>Automated Farmer Outreach Engine</span>
        </div>
        <h1 className="gateway-title">SMS &amp; WhatsApp Advisory Gateway</h1>
        <p className="gateway-subtitle">
          Direct-to-farmer automated push gateway broadcasting hyperlocal onset dates, break alerts, and agronomic guidance in regional languages.
        </p>
      </div>

      <div className="gateway-grid">
        {/* Left Form: Trigger Console */}
        <div className="gateway-form-card">
          <h2 className="form-card-title">Broadcast Dispatch Console</h2>

          <form onSubmit={handleSendNotification} className="console-form">
            {/* Channel Toggle */}
            <div className="form-group">
              <label className="form-label">Delivery Channel</label>
              <div className="channel-toggle-row">
                <button
                  type="button"
                  className={`channel-btn ${channel === 'whatsapp' ? 'active whatsapp' : ''}`}
                  onClick={() => setChannel('whatsapp')}
                >
                  <MessageSquare size={17} />
                  <span>WhatsApp Business API</span>
                </button>
                <button
                  type="button"
                  className={`channel-btn ${channel === 'sms' ? 'active sms' : ''}`}
                  onClick={() => setChannel('sms')}
                >
                  <Smartphone size={17} />
                  <span>Kisan SMS Gateway</span>
                </button>
              </div>
            </div>

            {/* Recipient Number */}
            <div className="form-group">
              <label className="form-label">Farmer / Extension Officer Mobile Number</label>
              <div className="input-with-icon">
                <Phone size={16} className="input-icon" />
                <input 
                  type="text" 
                  value={phoneNumber} 
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="console-input"
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>
            </div>

            {/* Target Block & Language */}
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Target Block</label>
                <select 
                  value={targetBlock}
                  onChange={(e) => setTargetBlock(e.target.value)}
                  className="console-select"
                >
                  {MAHARASHTRA_BLOCKS.map(b => (
                    <option key={b.id} value={b.id}>{b.name} ({b.district})</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Regional Language</label>
                <select 
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="console-select"
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

            {/* Message Preview Box */}
            <div className="form-group">
              <label className="form-label">Generated Hyperlocal Advisory Payload</label>
              <div className="payload-preview-box">
                <div className="payload-tag">📍 {blockObj.district}, {blockObj.name} | Weather Advisory Alert</div>
                <div className="payload-text">{advisory.headline}</div>
                <div className="payload-footer">
                  💡 {advisory.sowingAdvice}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className={`submit-dispatch-btn ${deliveryStatus === 'sending' ? 'loading' : ''}`}
              disabled={deliveryStatus === 'sending'}
            >
              {deliveryStatus === 'sending' ? (
                <span>Dispatching via {channel.toUpperCase()}...</span>
              ) : (
                <>
                  <Send size={16} />
                  <span>Send Hyperlocal Advisory Now</span>
                </>
              )}
            </button>
          </form>

          {/* Delivery Toast */}
          {deliveryStatus === 'delivered' && (
            <div className="delivery-success-alert">
              <CheckCircle2 size={18} color="#16a34a" />
              <span>Advisory dispatched successfully! Delivered with two blue checkmarks.</span>
            </div>
          )}
        </div>

        {/* Right Phone Mockup Preview */}
        <div className="gateway-preview-card">
          <div className="preview-label">Live Recipient Screen Simulation</div>

          {channel === 'whatsapp' ? (
            /* WhatsApp Screen */
            <div className="whatsapp-phone-mockup">
              <div className="wa-top-header">
                <div className="wa-avatar">🌦️</div>
                <div className="wa-contact-info">
                  <div className="wa-name">MonsoonSathi Agri Alert</div>
                  <div className="wa-sub">Official Government Extension Gateway ✓</div>
                </div>
              </div>

              <div className="wa-chat-canvas">
                <div className="wa-date-pill">Today</div>

                {/* WhatsApp Chat Bubble */}
                <div className="wa-message-bubble">
                  <div className="wa-bubble-badge">🌾 MONSOON ADVISORY: {blockObj.name.toUpperCase()}</div>
                  <p className="wa-bubble-body">{advisory.headline}</p>
                  
                  <div className="wa-bullet-box">
                    <div>🌱 <strong>बुवाई/पेरणी:</strong> {advisory.sowingAdvice}</div>
                    <div>💧 <strong>सिंचन व्यवस्थापन:</strong> {advisory.irrigationAdvice}</div>
                  </div>

                  <div className="wa-bubble-meta">
                    <span className="wa-prob-pill">Onset: {blockObj.probabilities.onset}%</span>
                    <span className="wa-prob-pill break-pill">Break Risk: {blockObj.probabilities.drySpell}%</span>
                  </div>

                  <div className="wa-bubble-time">
                    <span>09:42 AM</span>
                    <CheckCheck size={15} color="#38bdf8" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* SMS Screen */
            <div className="sms-phone-mockup">
              <div className="sms-top-header">
                <div className="sms-sender">VK-AGRI-GOV</div>
                <div className="sms-sub">SIM 1 • Standard SMS</div>
              </div>

              <div className="sms-canvas">
                <div className="sms-bubble">
                  <p>[MonsoonSathi Advisory]</p>
                  <p>{advisory.headline}</p>
                  <p>पेरणी/बुवाई सल्ला: {advisory.sowingAdvice}</p>
                  <span className="sms-time">Sent • Just now</span>
                </div>
              </div>
            </div>
          )}

          {/* Audit Terminal Log */}
          <div className="gateway-logs-terminal">
            <div className="terminal-header">
              <Terminal size={14} />
              <span>Gateway Dispatch Logs (Webhook Telemetry)</span>
            </div>
            <div className="terminal-body">
              {logs.map((l, idx) => (
                <div key={idx} className="terminal-log-line">
                  <span className="log-time">[{l.timestamp}]</span>
                  <span className="log-event">{l.event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
