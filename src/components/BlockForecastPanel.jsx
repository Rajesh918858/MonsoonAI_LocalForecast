import React, { useState } from 'react';
import { 
  CloudSun, 
  Droplets, 
  AlertTriangle, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  Layers, 
  Info,
  ChevronDown
} from 'lucide-react';
import { MAHARASHTRA_BLOCKS } from '../data/monsoonData';

export default function BlockForecastPanel({ 
  selectedBlock, 
  setSelectedBlock, 
  selectedDistrict, 
  setSelectedDistrict 
}) {
  const [outlookView, setOutlookView] = useState('weekly'); // 'weekly' or '30day'
  const [activeWeekIndex, setActiveWeekIndex] = useState(null);

  const currentBlockData = MAHARASHTRA_BLOCKS.find(b => b.id === selectedBlock) || MAHARASHTRA_BLOCKS[0];

  const districts = ["Pune", "Nashik", "Nagpur", "Chhatrapati Sambhajinagar"];

  return (
    <div className="block-forecast-card">
      {/* Title & Selectors Header */}
      <div className="forecast-panel-header">
        <div className="panel-title-group">
          <h2 className="panel-title">Block Level Forecast</h2>
          <div className="badge-temporal">7 - 30 Day Outlook</div>
        </div>

        {/* Selectors matching screenshot: Pune -> Haveli */}
        <div className="location-selectors-row">
          <div className="select-container">
            <label className="select-mini-label">District</label>
            <div className="custom-select-box">
              <select 
                value={selectedDistrict} 
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="location-select"
              >
                {districts.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <ChevronDown size={14} className="select-arrow" />
            </div>
          </div>

          <div className="select-container">
            <label className="select-mini-label">Block / Taluka</label>
            <div className="custom-select-box">
              <select 
                value={selectedBlock} 
                onChange={(e) => setSelectedBlock(e.target.value)}
                className="location-select"
              >
                {MAHARASHTRA_BLOCKS.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
              <ChevronDown size={14} className="select-arrow" />
            </div>
          </div>
        </div>
      </div>

      {/* 3 Metric Cards matching Screenshot */}
      <div className="prob-metrics-grid">
        {/* Metric 1: Monsoon Onset Probability */}
        <div className="prob-card onset-card">
          <div className="prob-card-header">
            <span className="prob-card-title">Monsoon Onset Probability</span>
            <CloudSun className="prob-card-icon text-emerald" size={20} />
          </div>
          <div className="prob-card-value text-emerald">
            {currentBlockData.probabilities.onset}%
          </div>
          <div className="prob-card-progress">
            <div 
              className="progress-fill fill-emerald" 
              style={{ width: `${currentBlockData.probabilities.onset}%` }}
            />
          </div>
          <div className="prob-card-footer">
            <span className="footer-tag-text">Window: {currentBlockData.probabilities.onsetWindowDays}</span>
          </div>
        </div>

        {/* Metric 2: Dry Spell (>7 days) Probability */}
        <div className="prob-card dryspell-card">
          <div className="prob-card-header">
            <span className="prob-card-title">Dry Spell (&gt;7 days) Probability</span>
            <AlertTriangle className="prob-card-icon text-amber" size={20} />
          </div>
          <div className="prob-card-value text-amber">
            {currentBlockData.probabilities.drySpell}%
          </div>
          <div className="prob-card-progress">
            <div 
              className="progress-fill fill-amber" 
              style={{ width: `${currentBlockData.probabilities.drySpell}%` }}
            />
          </div>
          <div className="prob-card-footer">
            <span className="footer-tag-text">Risk: {currentBlockData.probabilities.drySpell > 50 ? 'High Break Danger' : 'Moderate Intra-seasonal'}</span>
          </div>
        </div>

        {/* Metric 3: Heavy Rainfall Probability */}
        <div className="prob-card heavyrain-card">
          <div className="prob-card-header">
            <span className="prob-card-title">Heavy Rainfall Probability</span>
            <Droplets className="prob-card-icon text-blue" size={20} />
          </div>
          <div className="prob-card-value text-blue">
            {currentBlockData.probabilities.heavyRain}%
          </div>
          <div className="prob-card-progress">
            <div 
              className="progress-fill fill-blue" 
              style={{ width: `${currentBlockData.probabilities.heavyRain}%` }}
            />
          </div>
          <div className="prob-card-footer">
            <span className="footer-tag-text">Intensity: &gt;64.5 mm/day risk</span>
          </div>
        </div>
      </div>

      {/* Next 4 Weeks Outlook Bar Chart Section */}
      <div className="outlook-section">
        <div className="outlook-header">
          <div className="outlook-title-wrap">
            <h3 className="outlook-title">Next 4 Weeks Outlook</h3>
            <span className="outlook-sub">Continuous Probabilistic Active-Break Cycle</span>
          </div>

          <div className="outlook-view-toggle">
            <button 
              className={`view-toggle-btn ${outlookView === 'weekly' ? 'active' : ''}`}
              onClick={() => setOutlookView('weekly')}
            >
              Weekly Bars
            </button>
            <button 
              className={`view-toggle-btn ${outlookView === '30day' ? 'active' : ''}`}
              onClick={() => setOutlookView('30day')}
            >
              30-Day Trajectory
            </button>
          </div>
        </div>

        {outlookView === 'weekly' ? (
          <div className="outlook-chart-container">
            <div className="bars-chart-grid">
              {currentBlockData.weeklyOutlook.map((item, index) => {
                const isSelected = activeWeekIndex === index;
                return (
                  <div 
                    key={item.week} 
                    className={`week-column-group ${isSelected ? 'highlighted' : ''}`}
                    onClick={() => setActiveWeekIndex(isSelected ? null : index)}
                    title={`Click to inspect ${item.week} forecast`}
                  >
                    {/* Grouped Bars: Normal Rain, Low Rain (Break), Heavy Rain */}
                    <div className="bars-cluster">
                      {/* Normal Rain (Cyan/Teal) */}
                      <div className="bar-wrapper" title={`Normal Rain: ${item.normalRain}% (${item.rainfallMm}mm)`}>
                        <div 
                          className="bar-fill bar-normal" 
                          style={{ height: `${Math.min(100, Math.max(15, item.normalRain * 1.1))}%` }}
                        >
                          <span className="bar-tip">{item.normalRain}%</span>
                        </div>
                      </div>

                      {/* Low Rain / Break (Orange/Amber) */}
                      <div className="bar-wrapper" title={`Low Rain / Break: ${item.breakProb}%`}>
                        <div 
                          className="bar-fill bar-break" 
                          style={{ height: `${Math.min(100, Math.max(12, item.breakProb * 1.1))}%` }}
                        >
                          <span className="bar-tip">{item.breakProb}%</span>
                        </div>
                      </div>

                      {/* Heavy Rain (Deep Blue) */}
                      <div className="bar-wrapper" title={`Heavy Rain: ${item.heavyRain}%`}>
                        <div 
                          className="bar-fill bar-heavy" 
                          style={{ height: `${Math.min(100, Math.max(10, item.heavyRain * 1.1))}%` }}
                        >
                          <span className="bar-tip">{item.heavyRain}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="week-label">{item.week}</div>
                    <div className="week-est-mm">~{item.rainfallMm} mm</div>
                  </div>
                );
              })}
            </div>

            {/* Color Legend matching Screenshot exactly */}
            <div className="chart-legend-row">
              <div className="legend-item">
                <span className="legend-indicator dot-normal"></span>
                <span className="legend-text">Normal Rain</span>
              </div>
              <div className="legend-item">
                <span className="legend-indicator dot-break"></span>
                <span className="legend-text">Low Rain (Break)</span>
              </div>
              <div className="legend-item">
                <span className="legend-indicator dot-heavy"></span>
                <span className="legend-text">Heavy Rain</span>
              </div>
            </div>
          </div>
        ) : (
          /* 30-Day Trajectory view */
          <div className="trajectory-chart-wrap">
            <svg viewBox="0 0 500 130" className="trajectory-svg">
              <defs>
                <linearGradient id="rainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="breakZone" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {/* Shaded Dry Spell Break Window (Days 14 to 22) */}
              <rect x="230" y="10" width="130" height="95" fill="url(#breakZone)" rx="4" />
              <text x="295" y="24" textAnchor="middle" fill="#ea580c" fontSize="10" fontWeight="600">
                Predicted Break Phase (&gt;7 days)
              </text>

              {/* Grid lines */}
              <line x1="30" y1="25" x2="480" y2="25" stroke="#e2e8f0" strokeDasharray="3,3" />
              <line x1="30" y1="65" x2="480" y2="65" stroke="#e2e8f0" strokeDasharray="3,3" />
              <line x1="30" y1="105" x2="480" y2="105" stroke="#cbd5e1" />

              {/* Confidence Band Area */}
              <path 
                d="M 30,85 Q 90,30 160,28 T 260,95 T 360,98 T 430,42 T 480,35 L 480,105 L 30,105 Z" 
                fill="url(#rainGradient)" 
              />

              {/* Trajectory Median Curve */}
              <path 
                d="M 30,85 Q 90,30 160,28 T 260,95 T 360,98 T 430,42 T 480,35" 
                fill="none" 
                stroke="#0284c7" 
                strokeWidth="3.2" 
                strokeLinecap="round" 
              />

              {/* Crucial inflection nodes */}
              <circle cx="160" cy="28" r="5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
              <circle cx="310" cy="98" r="5" fill="#f97316" stroke="#ffffff" strokeWidth="2" />
              <circle cx="430" cy="42" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />

              <text x="160" y="20" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="700">Onset Surge (64mm)</text>
              <text x="310" y="116" textAnchor="middle" fill="#c2410c" fontSize="9" fontWeight="700">Break Trough (4mm)</text>
              <text x="430" y="32" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="700">Revival Surge (55mm)</text>

              {/* X Axis Labels */}
              <text x="30" y="122" fill="#64748b" fontSize="9">Day 1</text>
              <text x="140" y="122" fill="#64748b" fontSize="9">Day 7</text>
              <text x="250" y="122" fill="#64748b" fontSize="9">Day 14</text>
              <text x="360" y="122" fill="#64748b" fontSize="9">Day 21</text>
              <text x="470" y="122" fill="#64748b" fontSize="9">Day 30</text>
            </svg>
          </div>
        )}

        {/* Selected Week Drilldown or Alert Note */}
        <div className="active-break-notice">
          <Info size={15} className="notice-icon" />
          <span>
            <strong>AI Downscaling Signal:</strong> Week 3 indicates a high-probability ({currentBlockData.weeklyOutlook[2].breakProb}%) break-monsoon spell due to eastward MJO propagation out of the Indian Ocean.
          </span>
        </div>
      </div>
    </div>
  );
}
