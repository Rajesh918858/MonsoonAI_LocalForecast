import React, { useState } from 'react';
import { 
  Sprout, 
  Droplet, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  HelpCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { CROP_DATABASE, MAHARASHTRA_BLOCKS } from '../data/monsoonData';

export default function CropAdvisoryMatrix({ selectedBlock, selectedLanguage }) {
  const [selectedCropIndex, setSelectedCropIndex] = useState(0);
  const [growthStage, setGrowthStage] = useState('sowing'); // 'sowing', 'vegetative', 'flowering'

  const currentCrop = CROP_DATABASE[selectedCropIndex];
  const blockData = MAHARASHTRA_BLOCKS.find(b => b.id === selectedBlock) || MAHARASHTRA_BLOCKS[0];

  return (
    <div className="crop-matrix-container">
      <div className="crop-matrix-header">
        <div>
          <div className="matrix-badge">Agronomic Expert Decision Engine</div>
          <h1 className="matrix-title">Crop-Specific Climate Risk Advisories</h1>
          <p className="matrix-subtitle">
            Tailored Kharif sowing, moisture stress mitigation, and alternate crop strategies mapped to {blockData.name} block's 7-30 day monsoon forecast.
          </p>
        </div>

        <div className="block-context-badge">
          <span>Active Location:</span>
          <strong>{blockData.district}, {blockData.name}</strong>
        </div>
      </div>

      {/* Crop Selector Tabs */}
      <div className="crop-tabs-row">
        {CROP_DATABASE.map((crop, idx) => (
          <button
            key={idx}
            className={`crop-tab-btn ${selectedCropIndex === idx ? 'active' : ''}`}
            onClick={() => setSelectedCropIndex(idx)}
          >
            <Sprout size={18} />
            <span>{crop.name}</span>
          </button>
        ))}
      </div>

      {/* Main Crop Risk Card */}
      <div className="crop-profile-grid">
        {/* Left Column: Crop Specs */}
        <div className="crop-specs-card">
          <div className="crop-title-group">
            <h2 className="crop-main-name">{currentCrop.name}</h2>
            <span className="crop-type-badge">{currentCrop.type}</span>
          </div>

          <div className="spec-item">
            <span className="spec-label">Seasonal Water Requirement:</span>
            <span className="spec-value">{currentCrop.waterRequirement}</span>
          </div>

          <div className="spec-item">
            <span className="spec-label">Recommended Climate-Resilient Varieties:</span>
            <div className="variety-chips">
              {currentCrop.varieties.map((v, i) => (
                <span key={i} className="variety-chip">{v}</span>
              ))}
            </div>
          </div>

          <div className="spec-item">
            <span className="spec-label">Critical Growth Stages:</span>
            <ul className="stages-list">
              {currentCrop.criticalGrowthStages.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="break-vulnerability-alert">
            <AlertTriangle size={18} className="vuln-icon" />
            <div>
              <strong>Monsoon Break Vulnerability:</strong>
              <p>{currentCrop.breakVulnerability}</p>
            </div>
          </div>
        </div>

        {/* Right Column: AI Actionable Advisory */}
        <div className="crop-action-card">
          <h3 className="action-card-title">
            Hypothesized Recommendation for {blockData.name} (Onset: {blockData.probabilities.onset}%, Break: {blockData.probabilities.drySpell}%)
          </h3>

          <div className="recommendation-state-box">
            {blockData.probabilities.drySpell > 50 ? (
              <div className="rec-box high-risk">
                <div className="rec-status-tag">🛑 FALSE ONSET WARNING / HIGH BREAK RISK</div>
                <h4>{currentCrop.advisoryRules.highBreakWarning}</h4>
                <p>
                  Because a prolonged dry break (&gt;7 days) is predicted in Week 3, early germinated seedlings will experience severe moisture stress. 
                  Hold seed drilling until cumulative root-zone moisture reaches at least 75-100mm.
                </p>
              </div>
            ) : blockData.probabilities.drySpell > 30 ? (
              <div className="rec-box moderate-risk">
                <div className="rec-status-tag">⚠️ CAUTIOUS SOWING / MOISTURE RETENTION</div>
                <h4>{currentCrop.advisoryRules.moderateBreakRisk}</h4>
                <p>
                  Moderate intra-seasonal break detected. Practice Broad-Bed Furrow (BBF) sowing or paired row planting. Apply crop residue mulching to lock in soil water.
                </p>
              </div>
            ) : (
              <div className="rec-box optimal-risk">
                <div className="rec-status-tag">✅ OPTIMAL SOWING CONDITIONS</div>
                <h4>{currentCrop.advisoryRules.highOnsetLowBreak}</h4>
                <p>
                  Monsoon onset is strong with steady moisture continuity. Proceed with timely sowing using bio-fertilizer seed treatment.
                </p>
              </div>
            )}
          </div>

          {/* Practical Steps for Farmers */}
          <div className="practical-steps-list">
            <h4 className="steps-header">Step-by-Step Action Plan:</h4>
            
            <div className="step-row">
              <div className="step-circle">1</div>
              <div className="step-content">
                <strong>Seed Priming &amp; Treatment:</strong>
                <span>Treat seeds with Rhizobium/Trichoderma culture before sowing to enhance root vitality.</span>
              </div>
            </div>

            <div className="step-row">
              <div className="step-circle">2</div>
              <div className="step-content">
                <strong>Land Shaping &amp; Bunding:</strong>
                <span>Prepare opening trenches every 4 to 6 rows to drain heavy onset bursts or harvest water for break periods.</span>
              </div>
            </div>

            <div className="step-row">
              <div className="step-circle">3</div>
              <div className="step-content">
                <strong>Contingency Crop Hedging:</strong>
                <span>If onset is delayed past June 25, switch to short-duration Bajra (ICTP 8203) or Pigeon pea.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
