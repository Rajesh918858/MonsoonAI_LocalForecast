// Hyperlocal Monsoon Data & Knowledge Base for MonsoonSathi
// Smart India Hackathon 2026 - PS ID: 26086 (Team Nitro)

export const TELECONNECTIONS_DATA = {
  enso: {
    name: "ENSO (El Niño - Southern Oscillation)",
    index: "Niño 3.4 SST Anomaly",
    value: "+0.38°C",
    status: "ENSO-Neutral (leaning El Niño modoki)",
    anomaly: "Slightly warm equatorial Pacific anomalies",
    impactOnMonsoon: "Neutral to slight suppression of central Indian rainfall; convective velocity anomalies monitored.",
    confidence: "91.4%",
    teleconnectionWeight: 0.38
  },
  iod: {
    name: "IOD (Indian Ocean Dipole)",
    index: "Dipole Mode Index (DMI)",
    value: "+0.42°C",
    status: "Positive Phase (Active)",
    anomaly: "Warmer western Indian Ocean vs colder eastern waters",
    impactOnMonsoon: "Favorable! Enhances cross-equatorial moisture flux and monsoon surges over peninsular & western India.",
    confidence: "88.7%",
    teleconnectionWeight: 0.35
  },
  mjo: {
    name: "MJO (Madden-Julian Oscillation)",
    index: "Real-time Multivariate MJO (RMM1, RMM2)",
    value: "Phase 3 (Indian Ocean)",
    amplitude: "1.42 (Active)",
    status: "Convectively Active Phase over Equatorial Indian Ocean",
    impactOnMonsoon: "Promotes high convective cloudiness and rapid onset pulse over Konkan and Western Maharashtra.",
    confidence: "94.2%",
    teleconnectionWeight: 0.27
  },
  mlEngine: {
    architecture: "Hybrid ConvLSTM + Spatial XGBoost Downscaler",
    spatialGranularity: "1.2 km x 1.2 km (Block / Village cluster scale)",
    temporalRange: "7 - 30 Days Probabilistic Outlook",
    validationMetric: "Brier Skill Score: +0.28 vs IMD GFS baseline",
    rocAuc: "0.892 (Onset detection within ±2 days)"
  }
};

export const MAHARASHTRA_BLOCKS = [
  {
    id: "haveli",
    name: "Haveli",
    district: "Pune",
    state: "Maharashtra",
    coordinates: [18.4975, 73.8867],
    polygon: [
      [18.62, 73.78],
      [18.65, 73.94],
      [18.58, 74.05],
      [18.45, 74.08],
      [18.38, 73.97],
      [18.41, 73.82],
      [18.52, 73.75]
    ],
    probabilities: {
      onset: 78,
      drySpell: 32,
      heavyRain: 64,
      normalRain: 58,
      onsetWindowDays: "4 - 6 Days (Expected June 14-16)",
      soilMoisture: "44 mm / 100 mm (Threshold: 75 mm)",
      riskCategory: "Moderate Break Risk after Initial Burst"
    },
    weeklyOutlook: [
      { week: "Week 1", normalRain: 48, breakProb: 18, heavyRain: 52, rainfallMm: 62 },
      { week: "Week 2", normalRain: 70, breakProb: 24, heavyRain: 64, rainfallMm: 85 },
      { week: "Week 3", normalRain: 22, breakProb: 68, heavyRain: 14, rainfallMm: 12 },
      { week: "Week 4", normalRain: 56, breakProb: 26, heavyRain: 44, rainfallMm: 55 }
    ],
    panchayats: [
      { name: "Wagholi", onsetProb: 76, breakProb: 34, soilMoisture: 42 },
      { name: "Hadapsar Rural", onsetProb: 80, breakProb: 30, soilMoisture: 46 },
      { name: "Loni Kalbhor", onsetProb: 75, breakProb: 36, soilMoisture: 41 },
      { name: "Uruli Kanchan", onsetProb: 73, breakProb: 38, soilMoisture: 39 },
      { name: "Khadakwasla", onsetProb: 85, breakProb: 24, soilMoisture: 52 },
      { name: "Dhayari", onsetProb: 82, breakProb: 28, soilMoisture: 48 }
    ],
    advisories: {
      mr: {
        headline: "पेरणी सध्या करू नका. पुढील 7 दिवस कोरड्या हवामानाची (ब्रेक) येण्याची शक्यता आहे. मातीतील ओलावा टिकवण्यासाठी पालोपाचोळा उपयोग करा.",
        sowingAdvice: "खरीप सोयाबीन/कापूस पेरणी 5-7 दिवस पुढे ढकला. जमिनीत 75-100 मिमी ओलावा असल्याशिवाय पेरणी करू नका.",
        irrigationAdvice: "शेततळ्यातील पाण्याचा साठा जपून ठेवा. ठिबक सिंचन तयार ठेवा.",
        cropRisk: "खोट्या मान्सून (False Onset) नंतर 7-10 दिवसांच्या कोरड्या खंडामुळे (Break) बियाणे जळून जाण्याचा धोका."
      },
      hi: {
        headline: "अभी बुवाई न करें। अगले 7 दिनों में शुष्क दौर (मानसून ब्रेक) की संभावना है। मिट्टी की नमी बनाए रखने के लिए मल्चिंग का उपयोग करें।",
        sowingAdvice: "सोयाबीन और कपास की बुवाई 5 से 7 दिन के लिए टालें। जब तक मिट्टी में 75-100 मिमी गहराई तक नमी न पहुंचे, बीज न डालें।",
        irrigationAdvice: "फार्म पॉन्ड के पानी को सुरक्षित रखें। जीवन रक्षक सिंचाई के लिए ड्रिप प्रणाली की जांच करें।",
        cropRisk: "झूठे मानसून (False Onset) के तुरंत बाद आने वाले लंबे सूखे दौर से अंकुरण नष्ट होने का गंभीर जोखिम।"
      },
      en: {
        headline: "Do not sow currently. High likelihood of a 7-day dry spell (break) after initial pulse. Use mulching to conserve residual soil moisture.",
        sowingAdvice: "Postpone Kharif Soybean & Cotton sowing by 5-7 days. Await sustained root-zone moisture depth (>75mm).",
        irrigationAdvice: "Conserve water harvested in farm ponds. Keep drip and micro-irrigation lines ready for life-saving cycles.",
        cropRisk: "Severe danger of false onset moisture stress: Seeds may germinate and perish during subsequent Week 3 break phase."
      },
      kn: {
        headline: "ಈಗ ಬಿತ್ತನೆ ಮಾಡಬೇಡಿ. ಮುಂದಿನ 7 ದಿನಗಳಲ್ಲಿ ದೀರ್ಘಕಾಲದ ಒಣ ಹವೆ (ಮಾನ್ಸೂನ್ ವಿರಾಮ) ಸಾಧ್ಯತೆಯಿದೆ. ಮಣ್ಣಿನ ತೇವಾಂಶ ಉಳಿಸಲು ಹಸಿರೆಲೆ ಹೊದಿಕೆ ಬಳಸಿ.",
        sowingAdvice: "ಸೋಯಾಬೀನ್ ಮತ್ತು ಹತ್ತಿ ಬಿತ್ತನೆಯನ್ನು 5-7 ದಿನ ಮುಂದೂಡಿ. 75 ಮಿಮೀ ಗಿಂತ ಹೆಚ್ಚು ಮಣ್ಣಿನ ತೇವಾಂಶ ಲಭ್ಯವಿರುವವರೆಗೆ ಕಾಯಿರಿ.",
        irrigationAdvice: "ಕೃಷಿ ಹೊಂಡದ ನೀರನ್ನು ಜತನವಾಗಿರಿಸಿ. ಹನಿ ನೀರಾವರಿ ಸಿದ್ಧವಾಗಿರಲಿ.",
        cropRisk: "ಸುಳ್ಳು ಮಾನ್ಸೂನ್ ನಂತರದ ಒಣ ಹವೆಯು ಮೊಳಕೆ ಒಣಗಲು ಕಾರಣವಾಗಬಹುದು."
      },
      te: {
        headline: "ప్రస్తుతం విత్తనాలు నాటవద్దు. రాబోయే 7 రోజుల్లో పొడి వాతావరణం (వర్షాభావ విరామం) ఉండే అవకాశం ఉంది. తేమను కాపాడేందుకు మల్చింగ్ ఉపయోగించండి.",
        sowingAdvice: "సోయాబీన్, పత్తి విత్తనాలను 5-7 రోజులు వాయిదా వేయండి. నేలలో 75-100 మిమీ తేమ వచ్చే వరకు వేచి ఉండండి.",
        irrigationAdvice: "ఫారమ్ పాండ్ నీటిని సంరక్షించండి. డ్రిప్ స్ప్రింక్లర్లను సిద్ధం చేసుకోండి.",
        cropRisk: "తప్పుడు రుతుపవనాల కారణంగా విత్తనాలు మొలకెత్తిన తర్వాత ఎండిపోయే ప్రమాదం ఉంది."
      },
      gu: {
        headline: "હાલમાં વાવણી કરશો નહીં. આગામી 7 દિવસોમાં લાંબા સૂકા ગાળા (ચોમાસુ બ્રેક) ની શક્યતા છે. ભેજ જાળવવા મલ્ચિંગનો ઉપયોગ કરો.",
        sowingAdvice: "સોયાબીન અને કપાસની વાવણી 5-7 દિવસ મુલતવી રાખો. જમીનમાં 75-100 મીમી ભેજ ના આવે ત્યાં સુધી બીજ ના વાવશો.",
        irrigationAdvice: "ખેત તલાવડીનું પાણી સાચવો. ટપક પદ્ધતિ તૈયાર રાખો.",
        cropRisk: "ખોટા ચોમાસા પછી લાંબા સૂકા ગાળાને કારણે પાક નિષ્ફળ જવાનું જોખમ."
      }
    }
  },
  {
    id: "baramati",
    name: "Baramati",
    district: "Pune",
    state: "Maharashtra",
    coordinates: [18.1517, 74.5774],
    polygon: [
      [18.25, 74.45],
      [18.30, 74.68],
      [18.18, 74.75],
      [18.05, 74.65],
      [18.08, 74.48]
    ],
    probabilities: {
      onset: 62,
      drySpell: 58,
      heavyRain: 28,
      normalRain: 40,
      onsetWindowDays: "7 - 10 Days (Expected June 18-21)",
      soilMoisture: "31 mm / 100 mm",
      riskCategory: "High Dry Spell Vulnerability (Drought-Prone Rainshadow)"
    },
    weeklyOutlook: [
      { week: "Week 1", normalRain: 25, breakProb: 45, heavyRain: 15, rainfallMm: 20 },
      { week: "Week 2", normalRain: 48, breakProb: 38, heavyRain: 28, rainfallMm: 42 },
      { week: "Week 3", normalRain: 15, breakProb: 74, heavyRain: 8, rainfallMm: 5 },
      { week: "Week 4", normalRain: 35, breakProb: 52, heavyRain: 22, rainfallMm: 30 }
    ],
    panchayats: [
      { name: "Malegaon Bk", onsetProb: 64, breakProb: 55, soilMoisture: 33 },
      { name: "Shirsuphal", onsetProb: 58, breakProb: 62, soilMoisture: 28 },
      { name: "Supe", onsetProb: 60, breakProb: 60, soilMoisture: 30 },
      { name: "Morgaon", onsetProb: 65, breakProb: 54, soilMoisture: 35 }
    ],
    advisories: {
      mr: {
        headline: "बारामती तालुक्यात मान्सून आगमन लांबण्याची शक्यता. दुष्काळी पट्ट्यात बाजरी व तूर यांसारख्या कमी पाण्याचे वाण निवडा.",
        sowingAdvice: "उसाच्या लागवडीसाठी ठिबकचे सूक्ष्म नियोजन करा. बाजरीची धूळवाफ पेरणी करू नका.",
        irrigationAdvice: "भूजल पातळी कमी असल्याने उपसा मर्यादित ठेवा. मल्चिंग अनिवार्य करा.",
        cropRisk: "कमी पाऊस व मोठा कोरडा खंड यामुळे पिके सुकण्याचा धोका."
      },
      hi: {
        headline: "बारामती क्षेत्र में मानसून में देरी की आशंका। कम पानी वाली दलहनी फसलों और बाजरे का चयन करें।",
        sowingAdvice: "गन्ना और कपास में ड्रिप का प्रयोग करें। धूल भरी सूखी बुवाई से बचें।",
        irrigationAdvice: "जल स्रोतों का तर्कसंगत उपयोग करें।",
        cropRisk: "कम वर्षा और 10+ दिन के शुष्क दौर से फसल तनाव का खतरा।"
      },
      en: {
        headline: "Delayed onset expected in Baramati rain-shadow zone. Shift towards drought-tolerant crops like Pearl Millet and Pigeon Pea.",
        sowingAdvice: "Avoid pre-monsoon dry sowing. Rely on micro-irrigation for sugarcane & horticulture.",
        irrigationAdvice: "Strict water rationing in farm ponds; mulching strongly advised.",
        cropRisk: "Prolonged dry break in Week 3 could wipe out fragile early seedlings."
      },
      kn: {
        headline: "ಬಾರಾಮತಿಯಲ್ಲಿ ಮಾನ್ಸೂನ್ ವಿಳಂಬ ಸಾಧ್ಯತೆ. ಕಡಿಮೆ ನೀರಿನ ಅಗತ್ಯವಿರುವ ಸಜ್ಜೆ, ತೊಗರಿ ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಿ.",
        sowingAdvice: "ಒಣ ಬಿತ್ತನೆ ಮಾಡಬೇಡಿ. ಹನಿ ನೀರಾವರಿ ಸೌಲಭ್ಯ ಬಳಸಿ.",
        irrigationAdvice: "ನೀರಿನ ಮಿತವ್ಯಯ ಅನಿವಾರ್ಯ.",
        cropRisk: "ವಿರಾಮದ ಅವಧಿ ಹೆಚ್ಚಾಗುವ ಭೀತಿ."
      },
      te: {
        headline: "బారామతిలో రుతుపవనాలు ఆలస్యమయ్యే అవకాశం ఉంది. కరువును తట్టుకునే సజ్జలు, కందులు ఎంచుకోండి.",
        sowingAdvice: "పొడి విత్తనాలు చల్లవద్దు. డ్రిప్ ఉపయోగించండి.",
        irrigationAdvice: "నీటిని సంరక్షించండి.",
        cropRisk: "సుదీర్ಘ బెట్ట వాతావరణం ముప్పు."
      },
      gu: {
        headline: "બારામતીમાં ચોમાસુ મોડું થવાની શક્યતા. ઓછા પાણી વાળા બાજરી અને કઠોળ પાકો પસંદ કરો.",
        sowingAdvice: "ધૂળવાવણી ટાળો. ટપક પદ્ધતિનો ઉપયોગ કરો.",
        irrigationAdvice: "પાણીનો બગાડ અટકાવો.",
        cropRisk: "લાંબો સૂકો ગાળો પાકને નુકસાન પહોંચાડી શકે છે."
      }
    }
  },
  {
    id: "khed",
    name: "Khed (Rajgurunagar)",
    district: "Pune",
    state: "Maharashtra",
    coordinates: [18.8474, 73.9112],
    polygon: [
      [18.95, 73.75],
      [19.02, 73.95],
      [18.88, 74.08],
      [18.75, 73.95],
      [18.78, 73.78]
    ],
    probabilities: {
      onset: 84,
      drySpell: 22,
      heavyRain: 76,
      normalRain: 72,
      onsetWindowDays: "2 - 4 Days (Expected June 12-14)",
      soilMoisture: "62 mm / 100 mm",
      riskCategory: "Heavy Rainfall Alert & Rapid Moisture Saturation"
    },
    weeklyOutlook: [
      { week: "Week 1", normalRain: 65, breakProb: 12, heavyRain: 74, rainfallMm: 98 },
      { week: "Week 2", normalRain: 82, breakProb: 15, heavyRain: 78, rainfallMm: 124 },
      { week: "Week 3", normalRain: 38, breakProb: 42, heavyRain: 28, rainfallMm: 35 },
      { week: "Week 4", normalRain: 70, breakProb: 18, heavyRain: 62, rainfallMm: 88 }
    ],
    panchayats: [
      { name: "Chakan Rural", onsetProb: 82, breakProb: 24, soilMoisture: 58 },
      { name: "Alandi Rural", onsetProb: 86, breakProb: 20, soilMoisture: 65 },
      { name: "Khadakwadi", onsetProb: 85, breakProb: 22, soilMoisture: 62 },
      { name: "Waki", onsetProb: 83, breakProb: 23, soilMoisture: 60 }
    ],
    advisories: {
      mr: {
        headline: "खेड तालुक्यात मुसळधार पावसाचा इशारा. सखल शेतात पाणी साचणार नाही यासाठी निचरा चर तयार ठेवा.",
        sowingAdvice: "सोयाबीन पेरणी टोकण पद्धतीने करा. बियाण्यास थायरम/रायझोबियम बुरशीनाशक चोळा.",
        irrigationAdvice: "सिंचन बंद ठेवा. अतिरिक्त पाण्याचा निचरा तात्काळ करा.",
        cropRisk: "अतिवृष्टीमुळे बियाणे कुजण्याची शक्यता."
      },
      hi: {
        headline: "खेड ब्लॉक में भारी बारिश का अलर्ट। खेतों में जलभराव रोकने के लिए उचित जल निकासी नालियां बनाएं।",
        sowingAdvice: "सोयाबीन की बुवाई फंगस रोधी दवाओं से उपचारित करके ही करें।",
        irrigationAdvice: "सिंचाई बंद रखें, अतिरिक्त पानी निकालने की व्यवस्था करें।",
        cropRisk: "अत्यधिक वर्षा से बीज सड़ने की आशंका।"
      },
      en: {
        headline: "Heavy Rainfall Alert in Khed block! Ensure adequate field drainage channels to prevent waterlogging.",
        sowingAdvice: "Treat Soybean seeds with fungicide and Rhizobium before direct sowing on broad beds.",
        irrigationAdvice: "Halt all irrigation. Focus on removing standing excess surface water.",
        cropRisk: "Risk of seed rot and fungal collar rot due to heavy downpours in Weeks 1 & 2."
      },
      kn: {
        headline: "ಖೇಡ್‌ನಲ್ಲಿ ಭಾರಿ ಮಳೆಯ ಎಚ್ಚರಿಕೆ. ಜಮೀನಿನಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ಚರಂಡಿ ವ್ಯವಸ್ಥೆ ಮಾಡಿ.",
        sowingAdvice: "ಸೋಯಾಬೀನ್ ಬೀಜೋಪಚಾರ ಮಾಡಿ ಬಿತ್ತನೆ ಮಾಡಿ.",
        irrigationAdvice: "ನೀರಾವರಿ ನಿಲ್ಲಿಸಿ, ಹೆಚ್ಚುವರಿ ನೀರು ಹೊರಹಾಕಿ.",
        cropRisk: "ಅಧಿಕ ಮಳೆಯಿಂದ ಬೀಜ ಕೊಳೆಯುವ ಸಾಧ್ಯತೆ."
      },
      te: {
        headline: "ఖేడ్‌లో భారీ వర్ష సూచన. పొలాల్లో నీరు నిలవకుండా కాలువలు తీయండి.",
        sowingAdvice: "విత్తన శుద్ధి చేసిన తర్వాతే సోయాబీన్ వేయండి.",
        irrigationAdvice: "నీటిపారుదల ఆపండి.",
        cropRisk: "అధిక వర్షాలతో విత్తనాలు కుళ్ళిపోయే ప్రమాదం."
      },
      gu: {
        headline: "ખેડ વિસ્તારમાં ભારે વરસાદનું એલર્ટ. ખેતરમાંથી પાણીના નિકાલની વ્યવસ્થા કરો.",
        sowingAdvice: "બિયારણ પટ આપીને જ સોયાબીનની વાવણી કરો.",
        irrigationAdvice: "પિયત બંધ કરો.",
        cropRisk: "વધુ વરસાદથી બીજ સડી જવાનું જોખમ."
      }
    }
  },
  {
    id: "shirur",
    name: "Shirur",
    district: "Pune",
    state: "Maharashtra",
    coordinates: [18.8267, 74.3789],
    polygon: [
      [18.92, 74.20],
      [18.98, 74.45],
      [18.78, 74.52],
      [18.68, 74.35],
      [18.75, 74.15]
    ],
    probabilities: {
      onset: 71,
      drySpell: 44,
      heavyRain: 48,
      normalRain: 52,
      onsetWindowDays: "5 - 7 Days (Expected June 15-17)",
      soilMoisture: "38 mm / 100 mm",
      riskCategory: "Moderate Active-Break Transitions"
    },
    weeklyOutlook: [
      { week: "Week 1", normalRain: 40, breakProb: 28, heavyRain: 35, rainfallMm: 45 },
      { week: "Week 2", normalRain: 58, breakProb: 32, heavyRain: 48, rainfallMm: 68 },
      { week: "Week 3", normalRain: 18, breakProb: 65, heavyRain: 12, rainfallMm: 14 },
      { week: "Week 4", normalRain: 50, breakProb: 35, heavyRain: 32, rainfallMm: 48 }
    ],
    panchayats: [
      { name: "Sanaswadi", onsetProb: 72, breakProb: 42, soilMoisture: 40 },
      { name: "Shikrapur", onsetProb: 74, breakProb: 40, soilMoisture: 42 },
      { name: "Talegaon Dhamdhere", onsetProb: 70, breakProb: 45, soilMoisture: 37 },
      { name: "Ranjangaon Ganpati", onsetProb: 69, breakProb: 48, soilMoisture: 36 }
    ],
    advisories: {
      mr: {
        headline: "शिरूर तालुक्यात मध्यम पाऊस व त्यानंतर कोरडा खंड अपेक्षित. आंतरपीक पद्धतीचा वापर करा.",
        sowingAdvice: "सोयाबीन + तूर (4:2) किंवा बाजरी + तूर (2:1) आंतरपीक फायदेशीर ठरेल.",
        irrigationAdvice: "पावसाचा प्रत्येक थेंब जिरवण्यासाठी उताराला आडवी नांगरट करा.",
        cropRisk: "तिसऱ्या आठवड्यातील ब्रेक पिकांवर ताण आणू शकतो."
      },
      hi: {
        headline: "शिरूर में मध्यम बारिश के बाद शुष्क खंड की संभावना। अंतर-फसल (Intercropping) अपनाएं।",
        sowingAdvice: "सोयाबीन + अरहर (4:2) अनुपात में बोएं।",
        irrigationAdvice: "खेत की मेड़बंदी मजबूत करें।",
        cropRisk: "सप्ताह 3 में बारिश की कमी से नमी तनाव।"
      },
      en: {
        headline: "Moderate rainfall followed by dry spell in Shirur. Adopt intercropping to hedge climate risk.",
        sowingAdvice: "Sow Soybean + Red Gram (4:2) or Pearl Millet + Pigeon Pea (2:1).",
        irrigationAdvice: "Contour bunding and moisture conservation tilling recommended.",
        cropRisk: "Mid-season dry break in Week 3 poses risk to mono-cropped fields."
      },
      kn: {
        headline: "ಶಿರೂರಿನಲ್ಲಿ ಮಧ್ಯಮ ಮಳೆ ನಂತರ ಒಣ ಹವೆ. ಮಿಶ್ರ ಬೆಳೆ ಪದ್ಧತಿ ಅಳವಡಿಸಿ.",
        sowingAdvice: "ಸೋಯಾಬೀನ್ + ತೊಗರಿ ಮಿಶ್ರ ಬಿತ್ತನೆ ಮಾಡಿ.",
        irrigationAdvice: "ತೇವಾಂಶ ಸಂರಕ್ಷಣೆಗೆ ಆದ್ಯತೆ ನೀಡಿ.",
        cropRisk: "3ನೇ ವಾರದ ಒಣ ಹವೆ ಎಚ್ಚರಿಕೆ."
      },
      te: {
        headline: "శిరూర్‌లో మోస్తరు వర్షాల తర్వాత పొడి కాలం. అంతర పంటలు సాగు చేయండి.",
        sowingAdvice: "సోయాబీన్ + కంది అంతర పంటగా వేయండి.",
        irrigationAdvice: "తేమను నిలుపుకోండి.",
        cropRisk: "3వ వారంలో బెట్ట ప్రభావం."
      },
      gu: {
        headline: "શિરૂરમાં મધ્યમ વરસાદ પછી સૂકો ગાળો. મિશ્ર પાક પદ્ધતિ અપનાવો.",
        sowingAdvice: "સોયાબીન + તુવેર આંતરપાક તરીકે વાવો.",
        irrigationAdvice: "ભેજ સંરક્ષણ ખેતી કરો.",
        cropRisk: "ત્રીજા અઠવાડિયામાં વરસાદની અછત."
      }
    }
  },
  {
    id: "junnar",
    name: "Junnar",
    district: "Pune",
    state: "Maharashtra",
    coordinates: [19.2064, 73.8762],
    polygon: [
      [19.32, 73.72],
      [19.35, 73.98],
      [19.18, 74.05],
      [19.08, 73.85],
      [19.12, 73.68]
    ],
    probabilities: {
      onset: 88,
      drySpell: 19,
      heavyRain: 82,
      normalRain: 76,
      onsetWindowDays: "2 - 3 Days (Expected June 11-13)",
      soilMoisture: "68 mm / 100 mm",
      riskCategory: "Very High Onset Likelihood & Ghat Inflow"
    },
    weeklyOutlook: [
      { week: "Week 1", normalRain: 72, breakProb: 10, heavyRain: 80, rainfallMm: 110 },
      { week: "Week 2", normalRain: 85, breakProb: 12, heavyRain: 84, rainfallMm: 145 },
      { week: "Week 3", normalRain: 45, breakProb: 35, heavyRain: 38, rainfallMm: 45 },
      { week: "Week 4", normalRain: 75, breakProb: 15, heavyRain: 68, rainfallMm: 95 }
    ],
    panchayats: [
      { name: "Otur", onsetProb: 87, breakProb: 20, soilMoisture: 66 },
      { name: "Narayangaon", onsetProb: 86, breakProb: 21, soilMoisture: 65 },
      { name: "Alephata", onsetProb: 85, breakProb: 22, soilMoisture: 64 },
      { name: "Kukadi Valley", onsetProb: 92, breakProb: 14, soilMoisture: 75 }
    ],
    advisories: {
      mr: {
        headline: "जुन्नर खोऱ्यात जोरदार पावसाची शक्यता. भाजीपाला व टोमॅटो पिकांमध्ये रोगांचा प्रादुर्भाव रोखण्यासाठी फवारणीचे नियोजन करा.",
        sowingAdvice: "भात रोपे पुनर्लागवडीसाठी तयार ठेवा. बांध बंदिस्ती मजबूत करा.",
        irrigationAdvice: "नदी व ओढ्यांच्या काठची पंप सामग्री सुरक्षित स्थळी हलवा.",
        cropRisk: "करपा व बुरशीजन्य रोगांचा प्रादुर्भाव होण्याची दाट शक्यता."
      },
      hi: {
        headline: "जुन्नर में भारी वर्षा का अनुमान। धान की रोपाई की तैयारी करें और टमाटर में फफूंदनाशक का छिड़काव करें।",
        sowingAdvice: "धान नर्सरी तैयार रखें। मेड़ों को मजबूत करें।",
        irrigationAdvice: "नदी तटों से पंप मोटर सुरक्षित करें।",
        cropRisk: "अधिक नमी से सब्जियों में फफूंद रोग का जोखिम।"
      },
      en: {
        headline: "Vigorous monsoon onset in Junnar. Tomato & vegetable growers must prepare fungicide spray schedules against blight.",
        sowingAdvice: "Prepare paddy nurseries for transplanting. Reinforce terrace bunds.",
        irrigationAdvice: "Protect pumps along Kukadi river basin from sudden flash runoff.",
        cropRisk: "Fungal blight and downy mildew risk due to sustained humidity above 90%."
      },
      kn: {
        headline: "ಜುನ್ನಾರ್‌ನಲ್ಲಿ ಭಾರೀ ಮಳೆ. ಭತ್ತದ ನಾಟಿಗೆ ಸಿದ್ಧತೆ ಮಾಡಿಕೊಳ್ಳಿ.",
        sowingAdvice: "ತರಕಾರಿ ಬೆಳೆಗಳಲ್ಲಿ ರೋಗ ನಿಯಂತ್ರಣಕ್ಕೆ ಮುನ್ನೆಚ್ಚರಿಕೆ ವಹಿಸಿ.",
        irrigationAdvice: "ಹೆಚ್ಚುವರಿ ನೀರು ಹರಿದುಹೋಗಲು ಬಿಡಿ.",
        cropRisk: "ಶಿಲೀಂಧ್ರ ರೋಗಗಳ ಸಾಧ್ಯತೆ ಹೆಚ್ಚು."
      },
      te: {
        headline: "జున్నార్‌లో భారీ వర్షం. వరి నాట్లకు సిద్ధం కండి.",
        sowingAdvice: "కూరగాయల పంటల్లో తెగుళ్ల నివారణ చర్యలు చేపట్టండి.",
        irrigationAdvice: "వరద ముప్పు నుండి పంపులను కాపాడండి.",
        cropRisk: "శిలీంధ్ర తెగుళ్ల ముప్పు."
      },
      gu: {
        headline: "જુન્નરમાં ભારે વરસાદ. ડાંગર રોપણીની તૈયારી કરો અને શાકભાજીનું રક્ષણ કરો.",
        sowingAdvice: "ટમેટામાં ફૂગનાશક દવાનો છંટકાવ કરો.",
        irrigationAdvice: "પાણીના ભરાવા સામે રક્ષણ કરો.",
        cropRisk: "અતિશય ભેજથી પાક રોગનો ભોગ બની શકે છે."
      }
    }
  },
  {
    id: "daund",
    name: "Daund",
    district: "Pune",
    state: "Maharashtra",
    coordinates: [18.4638, 74.5804],
    polygon: [
      [18.58, 74.45],
      [18.62, 74.72],
      [18.42, 74.78],
      [18.35, 74.55]
    ],
    probabilities: {
      onset: 55,
      drySpell: 64,
      heavyRain: 22,
      normalRain: 36,
      onsetWindowDays: "8 - 12 Days (Expected June 20-24)",
      soilMoisture: "28 mm / 100 mm",
      riskCategory: "Severe Dry Spell Vulnerability"
    },
    weeklyOutlook: [
      { week: "Week 1", normalRain: 20, breakProb: 55, heavyRain: 12, rainfallMm: 15 },
      { week: "Week 2", normalRain: 42, breakProb: 42, heavyRain: 22, rainfallMm: 38 },
      { week: "Week 3", normalRain: 12, breakProb: 78, heavyRain: 6, rainfallMm: 6 },
      { week: "Week 4", normalRain: 30, breakProb: 58, heavyRain: 18, rainfallMm: 24 }
    ],
    panchayats: [
      { name: "Patas", onsetProb: 56, breakProb: 62, soilMoisture: 30 },
      { name: "Yawat", onsetProb: 58, breakProb: 60, soilMoisture: 32 },
      { name: "Kashti", onsetProb: 53, breakProb: 66, soilMoisture: 26 },
      { name: "Varvand", onsetProb: 54, breakProb: 65, soilMoisture: 27 }
    ],
    advisories: {
      mr: {
        headline: "दौंड तालुक्यात कोरड्या हवामानाचे सावट. सुरुवातीच्या अल्प पावसानंतर लगेच पेरणीची घाई करू नका.",
        sowingAdvice: "किमान 75 ते 100 मिमी पाऊस झाल्याशिवाय खरीप पिकांची पेरणी टाळा.",
        irrigationAdvice: "उसासाठी ठिबक द्वारेच पाणी द्या. शेततळे प्लास्टिक अस्तरीकरण तपासा.",
        cropRisk: "खोट्या मान्सूनमुळे बियाणे वाया जाण्याची 70% शक्यता."
      },
      hi: {
        headline: "दौंड में शुष्क मौसम का साया। शुरुआती हल्की बारिश में बुवाई की जल्दबाजी न करें।",
        sowingAdvice: "कम से कम 75-100 मिमी वर्षा के बाद ही बुवाई करें।",
        irrigationAdvice: "ड्रिप सिंचाई प्रणाली का ही उपयोग करें।",
        cropRisk: "फॉल्स ऑनसेट (False Onset) से बीज नष्ट होने का अत्यधिक जोखिम।"
      },
      en: {
        headline: "Critical Dry Spell warning for Daund. Do not rush to sow on isolated pre-monsoon showers.",
        sowingAdvice: "Wait for cumulative rainfall to cross 75-100mm threshold before sowing Kharif pulses & oilseeds.",
        irrigationAdvice: "Enforce strict drip scheduling; check farm pond plastic lining for leakages.",
        cropRisk: "High probability (70%) of false onset leading to seed desiccation."
      },
      kn: {
        headline: "ದೌಂಡ್‌ನಲ್ಲಿ ತೀವ್ರ ಒಣ ಹವೆಯ ಮುನ್ಸೂಚನೆ. ಸಣ್ಣ ಮಳೆಗೆ ಆತುರಪಟ್ಟು ಬಿತ್ತನೆ ಮಾಡಬೇಡಿ.",
        sowingAdvice: "75 ಮಿಮೀ ಮಳೆಯಾಗುವವರೆಗೆ ಬಿತ್ತನೆ ಮುಂದೂಡಿ.",
        irrigationAdvice: "ಹನಿ ನೀರಾವರಿ ಮಾತ್ರ ಬಳಸಿ.",
        cropRisk: "ಸುಳ್ಳು ಮಾನ್ಸೂನ್‌ನಿಂದ ಬೀಜ ನಷ್ಟವಾಗುವ ಭೀತಿ."
      },
      te: {
        headline: "దౌండ్‌లో తీవ్ర వర్షాభావ హెచ్చరిక. చిన్నపాటి చినుకులకే తొందరపడి విత్తవద్దు.",
        sowingAdvice: "75 మిమీ వర్షపాతం నమోదయ్యే వరకు వేచి ఉండండి.",
        irrigationAdvice: "డ్రిప్ విధానం అనుసరించండి.",
        cropRisk: "నకిలీ రుతుపవనాల వల్ల భారీ నష్టం వాటిల్లే అవకాశం."
      },
      gu: {
        headline: "દૌંડમાં તીવ્ર સૂકા ગાળાની ચેતવણી. હળવા વરસાદમાં ઉતાવળે વાવણી ન કરો.",
        sowingAdvice: "ઓછામાં ઓછો 75-100 મીમી વરસાદ થાય પછી જ વાવણી કરો.",
        irrigationAdvice: "માત્ર ટપક પદ્ધતિનો ઉપયોગ કરો.",
        cropRisk: "ખોટા ચોમાસાથી બિયારણ બળી જવાનું ભારે જોખમ."
      }
    }
  },
  {
    id: "maval",
    name: "Maval",
    district: "Pune",
    state: "Maharashtra",
    coordinates: [18.7523, 73.5358],
    polygon: [
      [18.88, 73.40],
      [18.92, 73.65],
      [18.72, 73.70],
      [18.62, 73.48]
    ],
    probabilities: {
      onset: 94,
      drySpell: 12,
      heavyRain: 91,
      normalRain: 88,
      onsetWindowDays: "1 - 2 Days (Expected June 10-11)",
      soilMoisture: "82 mm / 100 mm",
      riskCategory: "Very High Monsoon Surge (Western Ghats Rice Belt)"
    },
    weeklyOutlook: [
      { week: "Week 1", normalRain: 85, breakProb: 8, heavyRain: 92, rainfallMm: 165 },
      { week: "Week 2", normalRain: 92, breakProb: 10, heavyRain: 94, rainfallMm: 210 },
      { week: "Week 3", normalRain: 60, breakProb: 22, heavyRain: 55, rainfallMm: 80 },
      { week: "Week 4", normalRain: 88, breakProb: 12, heavyRain: 85, rainfallMm: 175 }
    ],
    panchayats: [
      { name: "Vadgaon Maval", onsetProb: 93, breakProb: 13, soilMoisture: 80 },
      { name: "Talegaon Dabhade Rural", onsetProb: 91, breakProb: 14, soilMoisture: 78 },
      { name: "Kamshet", onsetProb: 95, breakProb: 11, soilMoisture: 85 },
      { name: "Lonavala Rural", onsetProb: 98, breakProb: 8, soilMoisture: 92 }
    ],
    advisories: {
      mr: {
        headline: "मावळ तालुक्यात मान्सूनचे दमदार आगमन व अतिवृष्टीचा इशारा. भात खाचरातील पाण्याचे योग्य नियंत्रण ठेवा.",
        sowingAdvice: "इंद्रायणी भाताची पुनर्लागवड त्वरित सुरू करा. रोपांचे वय 21-25 दिवस असावे.",
        irrigationAdvice: "अतिरिक्त पाणी वाहून जाण्यासाठी सांडवे मोकळे करा.",
        cropRisk: "अतिपावसामुळे बांध फुटण्याचा धोका."
      },
      hi: {
        headline: "मावल में भारी मानसून और मूसलाधार बारिश का अलर्ट। धान की रोपाई तुरंत शुरू करें।",
        sowingAdvice: "इंद्रायणी धान के पौधे 21-25 दिन की उम्र में रोपित करें।",
        irrigationAdvice: "खेतों से अतिरिक्त पानी निकालने के रास्ते साफ रखें।",
        cropRisk: "तेज बहाव से खेत की मेड़ें टूटने का खतरा।"
      },
      en: {
        headline: "Vigorous Monsoon surge in Maval ghats. Heavy rain warning across all village panchayats.",
        sowingAdvice: "Commence Indrayani paddy transplanting immediately at 21-25 seedling days.",
        irrigationAdvice: "Open drainage spillways to protect paddy field contour bunds.",
        cropRisk: "Flash inundation and soil erosion on steep slopes."
      },
      kn: {
        headline: "ಮಾವಳದಲ್ಲಿ ಬಿರುಸಿನ ಮಳೆ. ಭತ್ತ ನಾಟಿ ತಕ್ಷಣ ಆರಂಭಿಸಿ.",
        sowingAdvice: "21-25 ದಿನಗಳ ಭತ್ತದ ಸಸಿ ನಾಟಿ ಮಾಡಿ.",
        irrigationAdvice: "ನೀರು ಹರಿದುಹೋಗಲು ದಾರಿ ಮಾಡಿ.",
        cropRisk: "ಭಾರಿ ಮಳೆಯಿಂದ ಮಣ್ಣು ಕೊಚ್ಚಿಹೋಗುವ ಭೀತಿ."
      },
      te: {
        headline: "మావల్‌లో భారీ వర్షాల హెచ్చరిక. వరి నాట్లు వెంటనే ప్రారంభించండి.",
        sowingAdvice: "21-25 రోజుల వరి నారును నాటండి.",
        irrigationAdvice: "అదనపు నీటిని బయటకు పంపండి.",
        cropRisk: "వరద ముప్పు."
      },
      gu: {
        headline: "માવળમાં ભારે વરસાદની ચેતવણી. ડાંગરની રોપણી તરત શરૂ કરો.",
        sowingAdvice: "21-25 દિવસના ડાંગરના ધરૂની રોપણી કરો.",
        irrigationAdvice: "વધારાના પાણીના નિકાલની વ્યવસ્થા કરો.",
        cropRisk: "ધોવાણનું જોખમ."
      }
    }
  }
];

export const CROP_DATABASE = [
  {
    name: "Soybean (सोयाबीन)",
    type: "Oilseed",
    varieties: ["JS 335", "JS 9305", "Phule Kalyani", "KDS 726 (Phule Sangam)"],
    waterRequirement: "450 - 700 mm",
    criticalGrowthStages: ["Germination (0-7 days)", "Flowering (35-45 days)", "Pod filling (60-75 days)"],
    breakVulnerability: "Very High during Germination & Pod Filling. A break >7 days causes 35-50% yield reduction.",
    advisoryRules: {
      highOnsetLowBreak: "Ideal sowing window! Sow immediately with Rhizobium culture once soil moisture exceeds 75mm.",
      moderateBreakRisk: "Delay sowing by 5-7 days. Avoid single-variety sowing; use broad-bed furrow (BBF) to conserve moisture.",
      highBreakWarning: "STOP sowing. High risk of false onset. Prepare mulching and life-saving sprinkler irrigation."
    }
  },
  {
    name: "Cotton / Kapas (कापूस)",
    type: "Cash Crop",
    varieties: ["Bt Cotton (Bollgard II)", "Phule Anupam", "Suraj", "Ajit 155"],
    waterRequirement: "700 - 1200 mm",
    criticalGrowthStages: ["Squaring (40-50 days)", "Flowering (60-70 days)", "Boll development (80-120 days)"],
    breakVulnerability: "High during square and boll formation; sensitive to waterlogging during heavy rain bursts.",
    advisoryRules: {
      highOnsetLowBreak: "Favorable conditions. Dibble seeds at recommended 90x60cm or 120x45cm spacing with basal fertilizer.",
      moderateBreakRisk: "Use protective mulching with crop residues or polythene mulch. Spray 2% DAP/potassium nitrate if dry spell occurs.",
      highBreakWarning: "Do not perform dry dibbling. Wait for assured monsoon revival and root-zone wetting."
    }
  },
  {
    name: "Paddy / Rice (भात / धान)",
    type: "Cereal",
    varieties: ["Indrayani", "Bhogavati", "Phule Samruddhi", "Karjat 3", "Wada Kolam"],
    waterRequirement: "1200 - 1800 mm",
    criticalGrowthStages: ["Nursery (0-25 days)", "Tillering (30-50 days)", "Panicle initiation (60-80 days)"],
    breakVulnerability: "Extreme sensitivity during flowering and grain formation. Requires continuous 2-5cm standing water.",
    advisoryRules: {
      highOnsetLowBreak: "Vigorous monsoon ideal! Transplant 21-25 day old seedlings at 20x15cm spacing.",
      moderateBreakRisk: "Ensure bunds are leak-proof. Conserve water in farm ponds for life-saving tillering irrigation.",
      highBreakWarning: "Adopt Alternate Wetting and Drying (AWD) or direct seeded rice (DSR) with seed priming."
    }
  },
  {
    name: "Pearl Millet / Bajra (बाजरी)",
    type: "Millet / Drought Hardy",
    varieties: ["Phule Mahashakti", "ICTP 8203", "Shraddha", "Saburi"],
    waterRequirement: "300 - 450 mm",
    criticalGrowthStages: ["Tillering (20-30 days)", "Flowering (45-55 days)"],
    breakVulnerability: "Low to Moderate. Outstanding drought resilience, ideal alternative during delayed monsoon or frequent breaks.",
    advisoryRules: {
      highOnsetLowBreak: "Sow on ridges and furrows. Suitable for light to medium well-drained soils.",
      moderateBreakRisk: "Recommended substitute if soybean/cotton sowing is delayed beyond July 10.",
      highBreakWarning: "Best choice for rain-shadow blocks experiencing recurrent break phases."
    }
  },
  {
    name: "Sugarcane (ऊस)",
    type: "Perennial / Cash",
    varieties: ["Co 86032 (Nira)", "CoM 0265 (Phule 265)", "VSI 08005"],
    waterRequirement: "1800 - 2500 mm",
    criticalGrowthStages: ["Formative stage (60-120 days)", "Grand growth period (120-270 days)"],
    breakVulnerability: "Needs sustained irrigation during breaks to prevent internode shortening and sugar loss.",
    advisoryRules: {
      highOnsetLowBreak: "Plan trash mulching and earthing up to capture maximum rainwater in furrows.",
      moderateBreakRisk: "Operate drip irrigation during break periods; apply anti-transpirant spray (Kaolin 5%).",
      highBreakWarning: "Ration canal/well water; life-saving irrigation at 15-day intervals."
    }
  }
];

export const HISTORICAL_RAIN_DATA = [
  { year: "2020", onsetDate: "11 June", breakDays: 8, totalRainfallMm: 1142, status: "Normal (Positive IOD)" },
  { year: "2021", onsetDate: "09 June", breakDays: 14, totalRainfallMm: 1220, status: "Excess (La Niña)" },
  { year: "2022", onsetDate: "13 June", breakDays: 11, totalRainfallMm: 1180, status: "Normal (La Niña)" },
  { year: "2023", onsetDate: "23 June", breakDays: 22, totalRainfallMm: 890, status: "Deficient (El Niño & Prolonged August Break)" },
  { year: "2024", onsetDate: "07 June", breakDays: 9, totalRainfallMm: 1290, status: "Excess (Neutral to La Niña transition)" },
  { year: "2025", onsetDate: "12 June", breakDays: 13, totalRainfallMm: 1080, status: "Normal" },
  { year: "2026 (Pred.)", onsetDate: "14 June (±2d)", breakDays: "12 - 16d", totalRainfallMm: 1125, status: "Probabilistic Outlook (Active-Break Cycles)" }
];
