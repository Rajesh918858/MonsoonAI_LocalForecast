import React, { useState } from 'react';
import { 
  Building2, 
  Send, 
  CheckCheck, 
  AlertTriangle, 
  FileText, 
  UploadCloud, 
  Users, 
  ShieldCheck, 
  Printer, 
  CheckCircle2, 
  Activity, 
  ChevronRight,
  TrendingDown,
  Layers,
  Database,
  Radio
} from 'lucide-react';
import { MAHARASHTRA_BLOCKS } from '../data/monsoonData';

export default function OfficerDashboard({ officerUser, onSelectBlock }) {
  const [selectedTargetBlock, setSelectedTargetBlock] = useState('all');
  const [broadcastChannel, setBroadcastChannel] = useState('both'); // 'whatsapp', 'sms', 'both'
  const [broadcastSubject, setBroadcastSubject] = useState('False Onset & Delayed Sowing Caution');
  const [broadcastText, setBroadcastText] = useState(
    'सर्व शेतकऱ्यांना आवाहन: हवेली व बारामती तालुक्यात पुढील आठवड्यात कोरडा खंड (Break) येण्याची शक्यता असल्याने सोयाबीन व कापूस पेरणी 5 दिवस पुढे ढकलावी. - कृषी विभाग, पुणे.'
  );
  const [broadcastSent, setBroadcastSent] = useState(false);

  // Field Truth Observation Input State
  const [fieldBlock, setFieldBlock] = useState('haveli');
  const [groundRainMm, setGroundRainMm] = useState('14.2');
  const [groundSoilMoisture, setGroundSoilMoisture] = useState('42');
  const [germinationRate, setGerminationRate] = useState('85');
  const [calibrationSuccess, setCalibrationSuccess] = useState(false);

  // Trigger Bulk Broadcast
  const handleSendBulkBroadcast = (e) => {
    e.preventDefault();
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 4000);
  };

  // Submit Ground Truth
  const handleSubmitGroundTruth = (e) => {
    e.preventDefault();
    setCalibrationSuccess(true);
    setTimeout(() => setCalibrationSuccess(false), 3500);
  };

  const handlePrintBulletin = () => {
    window.print();
  };

  return (
    <div className="officer-dashboard-page">
      {/* Officer Header Card */}
      <div className="officer-banner-card">
        <div className="officer-meta-group">
          <div className="officer-avatar-badge">
            <Building2 size={26} color="#0284c7" />
          </div>
          <div>
            <div className="gov-dept-tag">Government of Maharashtra • Department of Agriculture</div>
            <h1 className="officer-main-title">
              {officerUser?.name || 'Dr. Aniket Deshmukh (M.Sc. Agronomy)'}
            </h1>
            <div className="officer-badge-row">
              <span className="officer-sub-chip">ID: {officerUser?.officerId || 'MH-AGRI-PUN-402'}</span>
              <span className="officer-sub-chip">Jurisdiction: Pune District (13 Talukas)</span>
              <span className="officer-sub-chip status-live">● System Active • 12,450 Registered Farmers</span>
            </div>
          </div>
        </div>

        <button className="print-bulletin-btn" onClick={handlePrintBulletin}>
          <Printer size={16} />
          <span>Print Weekly Agro-Met Bulletin</span>
        </button>
      </div>

      {/* Grid: 4 Top KPI Cards for Extension Officers */}
      <div className="officer-kpi-grid">
        <div className="officer-kpi-card alert-border">
          <div className="kpi-icon-wrap bg-amber-soft">
            <AlertTriangle size={20} color="#ea580c" />
          </div>
          <div className="kpi-info">
            <div className="kpi-label">Blocks Under False Onset Danger</div>
            <div className="kpi-val text-amber">4 Talukas</div>
            <div className="kpi-sub">Haveli, Baramati, Shirur, Daund</div>
          </div>
        </div>

        <div className="officer-kpi-card">
          <div className="kpi-icon-wrap bg-blue-soft">
            <Radio size={20} color="#0284c7" />
          </div>
          <div className="kpi-info">
            <div className="kpi-label">Heavy Rainfall Ghat Alert</div>
            <div className="kpi-val text-blue">2 Talukas</div>
            <div className="kpi-sub">Maval (94%), Junnar (88%)</div>
          </div>
        </div>

        <div className="officer-kpi-card">
          <div className="kpi-icon-wrap bg-green-soft">
            <Users size={20} color="#16a34a" />
          </div>
          <div className="kpi-info">
            <div className="kpi-label">Farmers Covered by Advisories</div>
            <div className="kpi-val text-emerald">12,450</div>
            <div className="kpi-sub">98.4% WhatsApp/SMS delivery rate</div>
          </div>
        </div>

        <div className="officer-kpi-card">
          <div className="kpi-icon-wrap bg-purple-soft">
            <Database size={20} color="#9333ea" />
          </div>
          <div className="kpi-info">
            <div className="kpi-label">Contingency Seed Reserves</div>
            <div className="kpi-val text-purple">450 Quintals</div>
            <div className="kpi-sub">Short duration Bajra &amp; Pigeon pea</div>
          </div>
        </div>
      </div>

      {/* Section 1: District-wide Block Vulnerability Matrix Table */}
      <div className="officer-section-card">
        <div className="section-card-header">
          <div>
            <h2 className="section-card-title">Taluka-Level Monsoon Risk &amp; Sowing Decision Matrix</h2>
            <p className="section-card-sub">
              Aggregated 7-30 day downscaled predictions for all blocks in Pune District for agricultural extension planning.
            </p>
          </div>
          <span className="update-chip">Updated: 09:30 AM (IMD AWS Sync)</span>
        </div>

        <div className="officer-table-container">
          <table className="officer-risk-table">
            <thead>
              <tr>
                <th>Taluka / Block</th>
                <th>Onset Prob (%)</th>
                <th>Break Prob (&gt;7d)</th>
                <th>Heavy Rain (%)</th>
                <th>Soil Moisture</th>
                <th>Primary Kharif Crops</th>
                <th>Recommended Extension Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {MAHARASHTRA_BLOCKS.map((block) => {
                const isHighBreak = block.probabilities.drySpell > 50;
                const isHeavy = block.probabilities.heavyRain > 70;
                return (
                  <tr key={block.id} className={isHighBreak ? 'row-alert' : ''}>
                    <td className="font-bold text-dark">{block.name}</td>
                    <td>
                      <span className="badge-prob green">{block.probabilities.onset}%</span>
                    </td>
                    <td>
                      <span className={`badge-prob ${isHighBreak ? 'red' : 'amber'}`}>
                        {block.probabilities.drySpell}%
                      </span>
                    </td>
                    <td>
                      <span className={`badge-prob ${isHeavy ? 'blue' : 'gray'}`}>
                        {block.probabilities.heavyRain}%
                      </span>
                    </td>
                    <td>{block.probabilities.soilMoisture}</td>
                    <td className="crop-names">Soybean, Cotton, Bajra</td>
                    <td>
                      {isHighBreak ? (
                        <span className="action-tag tag-delay">🛑 Delay Sowing by 5-7d</span>
                      ) : isHeavy ? (
                        <span className="action-tag tag-drain">🌧️ Clear Drainage Furrows</span>
                      ) : (
                        <span className="action-tag tag-safe">✅ Timely Sowing Permitted</span>
                      )}
                    </td>
                    <td>
                      <button 
                        className="table-inspect-btn"
                        onClick={() => onSelectBlock && onSelectBlock(block.id)}
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Two Column Split (Mass Broadcast & Ground Truth Calibration) */}
      <div className="officer-grid-split">
        {/* Left: Mass Farmer Broadcast Station */}
        <div className="officer-section-card">
          <div className="section-card-header">
            <div>
              <h2 className="section-card-title">Bulk Farmer Advisory Broadcast Station</h2>
              <p className="section-card-sub">
                Push verified advisory bulletins directly to WhatsApp and Kisan SMS gateway.
              </p>
            </div>
          </div>

          <form onSubmit={handleSendBulkBroadcast} className="officer-broadcast-form">
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Target Taluka / Gram Panchayat Cluster</label>
                <select 
                  value={selectedTargetBlock}
                  onChange={(e) => setSelectedTargetBlock(e.target.value)}
                  className="officer-select"
                >
                  <option value="all">All 13 Talukas (12,450 Farmers)</option>
                  {MAHARASHTRA_BLOCKS.map(b => (
                    <option key={b.id} value={b.id}>{b.name} Taluka</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Broadcast Channel</label>
                <select 
                  value={broadcastChannel}
                  onChange={(e) => setBroadcastChannel(e.target.value)}
                  className="officer-select"
                >
                  <option value="both">WhatsApp Cloud API + Kisan SMS (Both)</option>
                  <option value="whatsapp">WhatsApp Only</option>
                  <option value="sms">Kisan SMS Only</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Advisory Subject / Heading</label>
              <input 
                type="text" 
                value={broadcastSubject}
                onChange={(e) => setBroadcastSubject(e.target.value)}
                className="officer-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Message Content (Regional Language / मराठी)</label>
              <textarea 
                rows="4"
                value={broadcastText}
                onChange={(e) => setBroadcastText(e.target.value)}
                className="officer-textarea"
              />
            </div>

            <button type="submit" className="officer-send-broadcast-btn">
              <Send size={16} />
              <span>Broadcast Bulletin to Selected Farmers</span>
            </button>

            {broadcastSent && (
              <div className="broadcast-success-notice">
                <CheckCircle2 size={18} color="#16a34a" />
                <span>
                  Broadcast queued! Dispatched to {selectedTargetBlock === 'all' ? '12,450 farmers' : 'selected block farmers'} via official gateway.
                </span>
              </div>
            )}
          </form>
        </div>

        {/* Right: Ground-Truth Calibration & Input Tool */}
        <div className="officer-section-card">
          <div className="section-card-header">
            <div>
              <h2 className="section-card-title">Field Truth Observation &amp; Sensor Calibration</h2>
              <p className="section-card-sub">
                Upload physical rain gauge &amp; tensiometer readings to recalibrate downscaled predictions.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmitGroundTruth} className="officer-calibration-form">
            <div className="form-group">
              <label className="form-label">Select Ground Observation Station / Block</label>
              <select 
                value={fieldBlock}
                onChange={(e) => setFieldBlock(e.target.value)}
                className="officer-select"
              >
                {MAHARASHTRA_BLOCKS.map(b => (
                  <option key={b.id} value={b.id}>{b.name} AWS Station</option>
                ))}
              </select>
            </div>

            <div className="form-row-3">
              <div className="form-group">
                <label className="form-label">24h Actual Rainfall (mm)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={groundRainMm} 
                  onChange={(e) => setGroundRainMm(e.target.value)}
                  className="officer-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Root Tensiometer (mm)</label>
                <input 
                  type="number" 
                  value={groundSoilMoisture} 
                  onChange={(e) => setGroundSoilMoisture(e.target.value)}
                  className="officer-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Germination Rate (%)</label>
                <input 
                  type="number" 
                  value={germinationRate} 
                  onChange={(e) => setGerminationRate(e.target.value)}
                  className="officer-input"
                  required
                />
              </div>
            </div>

            <div className="sensor-live-indicator-box">
              <Activity size={18} color="#10b981" />
              <div>
                <strong>Ground Sensor Network Synced:</strong>
                <p>48 Soil moisture sensors active in Haveli &amp; Baramati talukas.</p>
              </div>
            </div>

            <button type="submit" className="officer-calibrate-btn">
              <UploadCloud size={16} />
              <span>Submit Ground Observations to ML Engine</span>
            </button>

            {calibrationSuccess && (
              <div className="broadcast-success-notice">
                <CheckCircle2 size={18} color="#16a34a" />
                <span>
                  Ground truth recorded! Hybrid ML downscaler spatial weights updated for {fieldBlock.toUpperCase()}.
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
