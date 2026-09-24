import React, { useState } from 'react';
import { 
  Globe2, 
  Wind, 
  ThermometerSun, 
  Cpu, 
  Activity, 
  TrendingUp, 
  Compass, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { TELECONNECTIONS_DATA } from '../data/monsoonData';

export default function TeleconnectionsView({ onSelectBlock }) {
  const [selectedMjoPhase, setSelectedMjoPhase] = useState(3);
  const [ensoTempOffset, setEnsoTempOffset] = useState(0.38);
  const [iodTempOffset, setIodTempOffset] = useState(0.42);

  const mjoPhases = [
    { phase: 1, region: "Western Hemisphere & Africa", effect: "Suppressed Indian monsoon convection" },
    { phase: 2, region: "Indian Ocean (Western)", effect: "Onset initiation; deepening Arabian Sea low" },
    { phase: 3, region: "Indian Ocean (Eastern / Bay of Bengal)", effect: "Peak monsoon surge! Heavy rainfall over Western Ghats & Central India" },
    { phase: 4, region: "Maritime Continent (Western)", effect: "Active monsoon rainfall across Maharashtra, MP & Gujarat" },
    { phase: 5, region: "Maritime Continent (Eastern)", effect: "Convection shifts east; monsoon enters moderate active-break transition" },
    { phase: 6, region: "Western Pacific", effect: "Monsoon Break phase starts! Rain suppressed over peninsular India" },
    { phase: 7, region: "Western Pacific (Dateline)", effect: "Severe Monsoon Break (>7 days); foot-of-Himalayas rainfall" },
    { phase: 8, region: "Western Hemisphere", effect: "Break revival preparation" }
  ];

  return (
    <div className="teleconnections-container">
      {/* Header */}
      <div className="tele-header">
        <div className="tele-title-wrap">
          <div className="tele-badge">Global Planetary Boundary Ingestion Engine</div>
          <h1 className="tele-main-title">
            Climate Teleconnections &amp; Spatial Downscaling
          </h1>
          <p className="tele-subtitle">
            Bridging planetary scale climate teleconnections (ENSO, IOD, MJO) with 1km² block &amp; panchayat agricultural decisions.
          </p>
        </div>

        <div className="tele-ml-meta">
          <div className="meta-chip">
            <Cpu size={15} />
            <span>ConvLSTM + XGBoost</span>
          </div>
          <div className="meta-chip">
            <Activity size={15} />
            <span>Resolution: 1.2km² Block Scale</span>
          </div>
        </div>
      </div>

      {/* 3 Core Climate Teleconnection Cards */}
      <div className="tele-cards-grid">
        {/* Card 1: ENSO */}
        <div className="tele-card enso-card">
          <div className="card-badge">Equatorial Pacific</div>
          <div className="card-top">
            <div className="card-icon-wrap enso-icon">
              <ThermometerSun size={24} />
            </div>
            <div>
              <h3 className="tele-card-title">ENSO</h3>
              <span className="tele-card-sub">El Niño-Southern Oscillation</span>
            </div>
          </div>

          <div className="tele-metric-box">
            <div className="metric-label">Niño 3.4 SST Anomaly</div>
            <div className="metric-val">{ensoTempOffset > 0 ? `+${ensoTempOffset}°C` : `${ensoTempOffset}°C`}</div>
            <div className="metric-status text-emerald">
              {ensoTempOffset > 0.5 ? 'El Niño Warning' : ensoTempOffset < -0.5 ? 'La Niña (High Rain)' : 'ENSO Neutral'}
            </div>
          </div>

          <div className="interactive-slider-box">
            <label className="slider-label">
              <span>Simulate SST Anomaly:</span>
              <span>{ensoTempOffset}°C</span>
            </label>
            <input 
              type="range" 
              min="-2.0" 
              max="2.5" 
              step="0.1" 
              value={ensoTempOffset}
              onChange={(e) => setEnsoTempOffset(parseFloat(e.target.value))}
              className="tele-slider"
            />
          </div>

          <div className="tele-impact-box">
            <strong>Downscaled Regional Impact:</strong>
            <p>
              {ensoTempOffset > 0.8 
                ? 'High probability of prolonged July/August break periods and moisture stress in Maharashtra.' 
                : 'Favorable cross-equatorial pressure gradient supporting timely onset in western Maharashtra.'}
            </p>
          </div>
        </div>

        {/* Card 2: IOD */}
        <div className="tele-card iod-card">
          <div className="card-badge">Equatorial Indian Ocean</div>
          <div className="card-top">
            <div className="card-icon-wrap iod-icon">
              <Globe2 size={24} />
            </div>
            <div>
              <h3 className="tele-card-title">IOD</h3>
              <span className="tele-card-sub">Indian Ocean Dipole</span>
            </div>
          </div>

          <div className="tele-metric-box">
            <div className="metric-label">Dipole Mode Index (DMI)</div>
            <div className="metric-val">{iodTempOffset > 0 ? `+${iodTempOffset}°C` : `${iodTempOffset}°C`}</div>
            <div className="metric-status text-blue">
              {iodTempOffset > 0.3 ? 'Positive IOD (Active Surge)' : iodTempOffset < -0.3 ? 'Negative IOD (Suppressed)' : 'Neutral IOD'}
            </div>
          </div>

          <div className="interactive-slider-box">
            <label className="slider-label">
              <span>Simulate Dipole Index:</span>
              <span>{iodTempOffset}°C</span>
            </label>
            <input 
              type="range" 
              min="-1.5" 
              max="1.5" 
              step="0.05" 
              value={iodTempOffset}
              onChange={(e) => setIodTempOffset(parseFloat(e.target.value))}
              className="tele-slider"
            />
          </div>

          <div className="tele-impact-box">
            <strong>Downscaled Regional Impact:</strong>
            <p>
              {iodTempOffset > 0.3 
                ? 'Favorable! Amplifies Arabian Sea moisture budget, accelerating Haveli and Maval onset.' 
                : 'Reduced moisture convergence; prolonged breaks expected in eastern rainshadow blocks.'}
            </p>
          </div>
        </div>

        {/* Card 3: MJO */}
        <div className="tele-card mjo-card">
          <div className="card-badge">Intra-Seasonal Pulse (30-60d)</div>
          <div className="card-top">
            <div className="card-icon-wrap mjo-icon">
              <Wind size={24} />
            </div>
            <div>
              <h3 className="tele-card-title">MJO</h3>
              <span className="tele-card-sub">Madden-Julian Oscillation</span>
            </div>
          </div>

          <div className="tele-metric-box">
            <div className="metric-label">Real-time Phase Location</div>
            <div className="metric-val">Phase {selectedMjoPhase}</div>
            <div className="metric-status text-purple">
              {selectedMjoPhase === 2 || selectedMjoPhase === 3 ? 'Active Indian Monsoon Pulse' : selectedMjoPhase >= 6 ? 'Break Monsoon Trigger' : 'Transition Phase'}
            </div>
          </div>

          <div className="interactive-phase-buttons">
            <label className="slider-label">Select MJO Phase (Wheeler-Hendon):</label>
            <div className="phase-grid-btns">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(p => (
                <button
                  key={p}
                  className={`mjo-phase-btn ${selectedMjoPhase === p ? 'active' : ''}`}
                  onClick={() => setSelectedMjoPhase(p)}
                >
                  P{p}
                </button>
              ))}
            </div>
          </div>

          <div className="tele-impact-box">
            <strong>Phase {selectedMjoPhase} Local Signature:</strong>
            <p>{mjoPhases.find(m => m.phase === selectedMjoPhase)?.effect}</p>
          </div>
        </div>
      </div>

      {/* Downscaling Pipeline Visualization */}
      <div className="downscaling-pipeline-card">
        <h2 className="pipeline-title">Hybrid ML Downscaling Architecture</h2>
        <p className="pipeline-subtitle">
          How global signals are transformed into Panchayat-scale actionable farm advisories:
        </p>

        <div className="pipeline-steps-flow">
          <div className="pipeline-step">
            <div className="step-num">1</div>
            <div className="step-title">Global Indices</div>
            <div className="step-desc">ENSO (Niño 3.4), IOD (DMI), MJO RMM1/RMM2 teleconnections</div>
          </div>
          <div className="step-arrow">➔</div>

          <div className="pipeline-step">
            <div className="step-num">2</div>
            <div className="step-title">Atmospheric Fields</div>
            <div className="step-desc">IMD AWS, 850hPa winds, Specific Humidity, ECMWF reanalysis</div>
          </div>
          <div className="step-arrow">➔</div>

          <div className="pipeline-step active-step">
            <div className="step-num">3</div>
            <div className="step-title">Hybrid ML/DL</div>
            <div className="step-desc">ConvLSTM spatial feature extraction + XGBoost calibrated ensemble</div>
          </div>
          <div className="step-arrow">➔</div>

          <div className="pipeline-step">
            <div className="step-num">4</div>
            <div className="step-title">Block Risk Maps</div>
            <div className="step-desc">7-30 Day probabilistic onset, &gt;7 day dry break % &amp; heavy rain</div>
          </div>
          <div className="step-arrow">➔</div>

          <div className="pipeline-step">
            <div className="step-num">5</div>
            <div className="step-title">Agronomic Advisory</div>
            <div className="step-desc">Crop &amp; growth stage rules delivered via regional SMS/WhatsApp</div>
          </div>
        </div>
      </div>
    </div>
  );
}
