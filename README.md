# 🌦️ MonsoonSathi (मानसून साथी)
### **Hyperlocal Monsoon Onset & Break Prediction System (Block & Village Scale)**
*Predict Today, Prosper Tomorrow*

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF.svg)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## 📌 Problem Statement
The Indian Summer Monsoon dictates the economic livelihood of millions of farmers, particularly during the Kharif sowing season. While macro-scale monsoon forecasts across large meteorological subdivisions have improved, Indian agriculture remains highly vulnerable to intra-seasonal variations. Specifically, the exact dates of monsoon onset, prolonged dry spells (break-monsoon phases), and subsequent revival cycles vary drastically from one district to another.

**MonsoonSathi** bridges the gap between global climate teleconnections and hyper-local weather outcomes by ingesting large-scale climate indices—**ENSO (El Niño-Southern Oscillation)**, **IOD (Indian Ocean Dipole)**, and **MJO (Madden-Julian Oscillation)**—and downscaling their signatures using a hybrid predictive framework to deliver a 7-to-30-day probabilistic outlook at the Block and Panchayat (Village cluster) scale.

---

## 🚀 Key Features

### 1. 👨‍🌾 Farmer Portal (शेतकरी / किसान पोर्टल)
- **Hyperlocal 3-Panel Dashboard**:
  - **Block Level Forecast**: Onset Probability (%), Dry Spell (>7 days) Probability (%), and Heavy Rainfall Probability (%).
  - **Next 4 Weeks Outlook**: Grouped bar charts showing weekly rainfall distributions and active-break cycle inflections.
  - **Interactive Risk Map**: Choropleth maps color-coded by onset and dry break risk (`>80%`, `60-80%`, `40-60%`, `20-40%`, `<20%`).
  - **Smartphone Advisory Screen**: Clear, actionable agronomic advice in regional Indian languages (Marathi, Hindi, English, Kannada, Telugu, Gujarati).
  - **Voice Readout (मराठीत ऐका)**: Built-in Text-to-Speech narration in regional languages.
  - **One-Click WhatsApp Share**: Share hyperlocal alerts directly with fellow farmers.

### 2. 👨‍💼 Agricultural Extension Officer Portal (कृषी विस्तार अधिकारी पोर्टल)
- **District-wide Vulnerability Matrix**: Real-time status across all 13 blocks in Pune District with false onset flags and extension recommendations (*Delay Sowing / Clear Drainage / Timely Sowing*).
- **Mass Advisory Broadcast Station**: Push bulk SMS & WhatsApp advisories to 12,450+ registered farmers across target blocks.
- **Ground-Truth Calibration Tool**: Extension officers can submit actual automatic weather station (AWS) rainfall readings (mm), tensiometer soil moisture, and germination rates to recalibrate model downscaling weights.
- **Official Agro-Met Bulletin Generator**: Instant print-ready district bulletin formatted for official distribution.

### 3. 🌐 Global Climate Teleconnections & Downscaling Engine
- **ENSO**: Niño 3.4 SST Anomaly tracking and simulation slider.
- **IOD**: Dipole Mode Index (DMI) western vs. eastern equatorial Indian Ocean dipole tracking.
- **MJO**: Wheeler-Hendon 8-Phase real-time convective center tracking.
- **Hybrid ML Pipeline**: ConvLSTM spatial downscaler + XGBoost calibrated ensemble down to 1.2km² grid resolution.

### 4. 🌾 Kharif Crop Agronomic Decision Matrix
- Tailored rules for **Soybean**, **Cotton (Kapas)**, **Paddy (Rice)**, **Pearl Millet (Bajra)**, and **Sugarcane**.
- Moisture stress thresholds and contingency crop switching guidance during prolonged break phases.

---

## 🛠️ Tech Stack
- **Frontend**: React 19, Vite, Vanilla CSS Design System, Lucide Icons, Leaflet
- **Modeling Framework**: Hybrid ConvLSTM + Spatial XGBoost Downscaler (Simulated Telemetry)
- **APIs & Messaging**: WhatsApp Cloud API simulator, Kisan SMS Gateway, Web Speech Synthesis API

---

## ⚡ Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)

### Installation
```bash
# Clone the repository
git clone https://github.com/Rajesh918858/MonsoonAI_LocalForecast.git

# Navigate to the project directory
cd MonsoonAI_LocalForecast

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
