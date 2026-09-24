import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Minus, 
  Maximize2, 
  MapPin, 
  Layers, 
  CheckCircle2, 
  ShieldAlert,
  ChevronDown,
  Navigation,
  Info
} from 'lucide-react';
import { MAHARASHTRA_BLOCKS } from '../data/monsoonData';

export default function RiskMapPanel({ 
  selectedBlock, 
  setSelectedBlock, 
  selectedDistrict, 
  setSelectedDistrict,
  stateName = "Maharashtra"
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeLayer, setActiveLayer] = useState('onset'); // 'onset', 'drySpell', 'heavyRain', 'soilMoisture'
  const [hoveredBlock, setHoveredBlock] = useState(null);
  const [selectedPanchayat, setSelectedPanchayat] = useState(null);

  // Filter blocks or panchayats for live search
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const results = [];

    MAHARASHTRA_BLOCKS.forEach(block => {
      if (block.name.toLowerCase().includes(q)) {
        results.push({ type: 'block', name: block.name, blockId: block.id, district: block.district });
      }
      block.panchayats.forEach(p => {
        if (p.name.toLowerCase().includes(q)) {
          results.push({ type: 'panchayat', name: p.name, blockId: block.id, blockName: block.name, data: p });
        }
      });
    });

    return results.slice(0, 6);
  }, [searchQuery]);

  // Color helper matching screenshot legend
  // > 80: Green
  // 60-80: Light green
  // 40-60: Yellow
  // 20-40: Orange
  // < 20: Red
  const getColorForValue = (val) => {
    if (val >= 80) return '#16a34a'; // Deep Green
    if (val >= 60) return '#84cc16'; // Light Green
    if (val >= 40) return '#eab308'; // Amber/Yellow
    if (val >= 20) return '#f97316'; // Orange
    return '#ef4444'; // Red
  };

  const getMetricValue = (block) => {
    if (activeLayer === 'onset') return block.probabilities.onset;
    if (activeLayer === 'drySpell') return block.probabilities.drySpell;
    if (activeLayer === 'heavyRain') return block.probabilities.heavyRain;
    return parseInt(block.probabilities.soilMoisture) || 50;
  };

  const getLayerLabel = () => {
    if (activeLayer === 'onset') return 'Onset Probability (%)';
    if (activeLayer === 'drySpell') return 'Dry Spell Risk (%)';
    if (activeLayer === 'heavyRain') return 'Heavy Rain Risk (%)';
    return 'Soil Moisture Index (%)';
  };

  // Pune block map coordinates scaled for crisp SVG rendering
  // Realistic relative layout of Pune district blocks (Ghats west to rainshadow east)
  const blockSvgPaths = [
    {
      id: 'maval',
      name: 'Maval',
      d: 'M 90,130 L 140,110 L 165,150 L 130,190 L 80,180 Z',
      labelX: 120,
      labelY: 155
    },
    {
      id: 'junnar',
      name: 'Junnar',
      d: 'M 140,30 L 220,20 L 250,70 L 180,95 L 120,65 Z',
      labelX: 180,
      labelY: 60
    },
    {
      id: 'khed',
      name: 'Khed',
      d: 'M 165,95 L 250,70 L 270,130 L 200,165 L 155,130 Z',
      labelX: 205,
      labelY: 120
    },
    {
      id: 'shirur',
      name: 'Shirur',
      d: 'M 250,70 L 340,90 L 360,165 L 270,185 L 270,130 Z',
      labelX: 305,
      labelY: 135
    },
    {
      id: 'haveli',
      name: 'Haveli',
      d: 'M 165,165 L 245,160 L 270,225 L 210,250 L 165,220 Z',
      labelX: 215,
      labelY: 205
    },
    {
      id: 'daund',
      name: 'Daund',
      d: 'M 270,185 L 360,165 L 390,230 L 310,265 L 270,225 Z',
      labelX: 325,
      labelY: 220
    },
    {
      id: 'baramati',
      name: 'Baramati',
      d: 'M 285,265 L 375,245 L 395,320 L 305,335 L 270,290 Z',
      labelX: 335,
      labelY: 295
    }
  ];

  return (
    <div className="risk-map-card">
      {/* Top Map Header with Search & Dropdowns matching Screenshot */}
      <div className="map-top-bar">
        {/* Search Input */}
        <div className="map-search-container">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search your village / panchayat..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="map-search-input"
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
          )}

          {/* Autocomplete dropdown */}
          {searchResults.length > 0 && (
            <div className="search-autocomplete-list">
              {searchResults.map((item, idx) => (
                <div 
                  key={idx} 
                  className="autocomplete-item"
                  onClick={() => {
                    setSelectedBlock(item.blockId);
                    if (item.type === 'panchayat') {
                      setSelectedPanchayat(item.data);
                    }
                    setSearchQuery(item.name);
                  }}
                >
                  <MapPin size={14} className="pin-icon" />
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-context">
                      {item.type === 'panchayat' ? `Panchayat in ${item.blockName}` : `Block in ${item.district}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* State / District / Block Filters on top-right */}
        <div className="map-filter-selectors">
          <div className="filter-badge">
            <span>{stateName}</span>
          </div>
          <div className="filter-badge">
            <span>{selectedDistrict}</span>
          </div>
          <div className="filter-badge active-block">
            <span>{MAHARASHTRA_BLOCKS.find(b => b.id === selectedBlock)?.name || selectedBlock}</span>
          </div>
        </div>
      </div>

      {/* Layer selector bar */}
      <div className="layer-switcher-bar">
        <button 
          className={`layer-btn ${activeLayer === 'onset' ? 'active' : ''}`}
          onClick={() => setActiveLayer('onset')}
        >
          Onset Probability
        </button>
        <button 
          className={`layer-btn ${activeLayer === 'drySpell' ? 'active' : ''}`}
          onClick={() => setActiveLayer('drySpell')}
        >
          Dry Spell (Break) Risk
        </button>
        <button 
          className={`layer-btn ${activeLayer === 'heavyRain' ? 'active' : ''}`}
          onClick={() => setActiveLayer('heavyRain')}
        >
          Heavy Rainfall Alert
        </button>
      </div>

      {/* Interactive Choropleth Map Visualizer */}
      <div className="map-canvas-container">
        {/* Real-time Satellite / Terrain Base Background styling */}
        <div className="map-terrain-underlay">
          <div className="terrain-contour c1"></div>
          <div className="terrain-contour c2"></div>
        </div>

        {/* Dynamic SVG Choropleth Map */}
        <div 
          className="svg-map-wrapper"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center', transition: 'transform 0.25s ease' }}
        >
          <svg viewBox="50 0 380 360" className="pune-choropleth-svg">
            <defs>
              <filter id="blockGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* Render Block Polygons with color-coded probabilities */}
            {blockSvgPaths.map((blockPath) => {
              const blockData = MAHARASHTRA_BLOCKS.find(b => b.id === blockPath.id);
              if (!blockData) return null;
              
              const val = getMetricValue(blockData);
              const fillColor = getColorForValue(val);
              const isSelected = selectedBlock === blockPath.id;
              const isHovered = hoveredBlock === blockPath.id;

              return (
                <g 
                  key={blockPath.id} 
                  className={`block-polygon-group ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedBlock(blockPath.id);
                    setSelectedPanchayat(null);
                  }}
                  onMouseEnter={() => setHoveredBlock(blockPath.id)}
                  onMouseLeave={() => setHoveredBlock(null)}
                >
                  <path
                    d={blockPath.d}
                    fill={fillColor}
                    fillOpacity={isSelected ? 0.95 : 0.78}
                    stroke={isSelected ? '#ffffff' : '#334155'}
                    strokeWidth={isSelected ? 3.5 : 1.8}
                    className="block-path"
                    style={{
                      transition: 'all 0.2s ease',
                      filter: isSelected ? 'url(#blockGlow)' : 'none',
                      cursor: 'pointer'
                    }}
                  />

                  {/* Block Name Label */}
                  <text
                    x={blockPath.labelX}
                    y={blockPath.labelY - 5}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="11"
                    fontWeight="700"
                    className="block-svg-label"
                    style={{ pointerEvents: 'none', textShadow: '0 1px 3px rgba(0,0,0,0.85)' }}
                  >
                    {blockPath.name}
                  </text>

                  {/* Probability Value Pill */}
                  <text
                    x={blockPath.labelX}
                    y={blockPath.labelY + 11}
                    textAnchor="middle"
                    fill="#f8fafc"
                    fontSize="10"
                    fontWeight="800"
                    className="block-svg-val"
                    style={{ pointerEvents: 'none', textShadow: '0 1px 3px rgba(0,0,0,0.85)' }}
                  >
                    {val}%
                  </text>
                </g>
              );
            })}

            {/* Selected Block Marker / Pin Indicator */}
            {(() => {
              const activePath = blockSvgPaths.find(p => p.id === selectedBlock);
              if (!activePath) return null;
              return (
                <g transform={`translate(${activePath.labelX - 10}, ${activePath.labelY - 32})`} className="selected-pin-marker">
                  <circle cx="10" cy="10" r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="10" cy="10" r="14" fill="#ef4444" fillOpacity="0.3" className="pin-pulse" />
                </g>
              );
            })()}
          </svg>
        </div>

        {/* Hover / Click Info Tooltip Badge */}
        {hoveredBlock && (
          <div className="map-hover-card">
            {(() => {
              const hb = MAHARASHTRA_BLOCKS.find(b => b.id === hoveredBlock);
              if (!hb) return null;
              return (
                <div>
                  <div className="hb-title">{hb.name} Block ({hb.district})</div>
                  <div className="hb-stats">
                    <span>Onset: <strong>{hb.probabilities.onset}%</strong></span> | 
                    <span> Break Risk: <strong>{hb.probabilities.drySpell}%</strong></span> |
                    <span> Rain: <strong>{hb.probabilities.heavyRain}%</strong></span>
                  </div>
                  <div className="hb-footer">Click to view full advisories & 4-week chart</div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Zoom Controls matching Screenshot (+ / -) */}
        <div className="map-zoom-controls">
          <button 
            className="zoom-btn" 
            onClick={() => setZoomLevel(prev => Math.min(1.6, prev + 0.15))}
            title="Zoom In"
          >
            <Plus size={16} />
          </button>
          <button 
            className="zoom-btn" 
            onClick={() => setZoomLevel(prev => Math.max(0.85, prev - 0.15))}
            title="Zoom Out"
          >
            <Minus size={16} />
          </button>
          <button 
            className="zoom-btn" 
            onClick={() => setZoomLevel(1)}
            title="Reset Zoom"
          >
            <Maximize2 size={14} />
          </button>
        </div>

        {/* Legend matching Screenshot exactly:
            > 80%
            60 - 80%
            40 - 60%
            20 - 40%
            < 20%
        */}
        <div className="map-legend-box">
          <div className="legend-box-title">{getLayerLabel()}</div>
          <div className="legend-scale-list">
            <div className="scale-item">
              <span className="scale-swatch" style={{ background: '#16a34a' }}></span>
              <span className="scale-label">&gt; 80% (Very High)</span>
            </div>
            <div className="scale-item">
              <span className="scale-swatch" style={{ background: '#84cc16' }}></span>
              <span className="scale-label">60 - 80%</span>
            </div>
            <div className="scale-item">
              <span className="scale-swatch" style={{ background: '#eab308' }}></span>
              <span className="scale-label">40 - 60%</span>
            </div>
            <div className="scale-item">
              <span className="scale-swatch" style={{ background: '#f97316' }}></span>
              <span className="scale-label">20 - 40%</span>
            </div>
            <div className="scale-item">
              <span className="scale-swatch" style={{ background: '#ef4444' }}></span>
              <span className="scale-label">&lt; 20% (Low / High Risk)</span>
            </div>
          </div>
        </div>

        {/* Panchayat Quick List Drawer */}
        <div className="panchayat-chips-row">
          <span className="chips-title">Panchayats in {MAHARASHTRA_BLOCKS.find(b => b.id === selectedBlock)?.name}:</span>
          <div className="chips-scroller">
            {MAHARASHTRA_BLOCKS.find(b => b.id === selectedBlock)?.panchayats.map((p, i) => (
              <button 
                key={i} 
                className={`panchayat-chip ${selectedPanchayat?.name === p.name ? 'active' : ''}`}
                onClick={() => setSelectedPanchayat(p)}
              >
                {p.name} ({p.onsetProb}%)
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
