/* data.js
   Contains translations, categories, servicesData, blogData and galleryData.
   Verified against official Maharashtra Aaple Sarkar & UIDAI documentation standards.
*/

/* TRANSLATIONS */
export const translations = {
  "en": {
    "siteTitle": "Arya Enterprises",
    "siteSubtitle": "E-Seva Kendra & Multi-Services",
    "navHome": "Home",
    "navServices": "Services",
    "navAbout": "About",
    "navBlog": "Blog",
    "navContact": "Contact",
    "navGallery": "Gallery",
    "navAnalytics": "Analytics Panel",
    "navRequestMenu": "Request Menu",
    "navCitizenPortal": "Citizen Portal",
    "navSignIn": "Sign In / Track",
    "navApplyOnline": "Apply Online",
    "trendingTitle": "New & Trending Services",
    "allServicesTitle": "Our Major Services",
    "allServicesSubtitle": "Comprehensive solutions for all your documentation needs",
    "blogTitle": "Latest Updates",
    "footerLinks": "Quick Links",
    "footerContact": "Contact Us",
    "lblDocuments": "Required Documents",
    "lblEligibility": "Eligibility",
    "formTitle": "Enquiry Now",
    "formName": "Full Name",
    "formMobile": "Mobile Number",
    "formMessage": "Message",
    "btnSubmit": "Send Enquiry",
    "adminTitle": "Maha E-Seva Admin Control Panel",
    "adminSubtitle": "Akurdi Pune Center",
    "tabAnalytics": "Executive Analytics & Multiple Charts",
    "tabRequests": "Citizen Request Management Menu",
    "biStudio": "Operational Intelligence & Analytics Studio",
    "biStudioSub": "Real-time citizen application velocity, revenue tracking, Tahsildar desk conversion, and SLA health",
    "btnExportCsv": "Export CSV",
    "btnViewPublic": "View Public Site",
    "btnLogout": "Logout",
    "kpiTotalInflow": "Total Inflow",
    "kpiNetRealized": "Net Realized",
    "kpiFulfillmentRate": "Fulfillment Rate",
    "kpiAvgSla": "Average SLA (TAT)",
    "kpiDigitalCitizens": "Digital Citizens",
    "chartVolumeTitle": "Monthly Application Volume & Delivery Trajectory",
    "chartStatusTitle": "Application Status Split",
    "chartWeeklyTitle": "Weekly Traffic & Center Rush Pattern",
    "chartFunnelTitle": "Citizen Document Verification Funnel",
    "chartCategoryTitle": "Government Service Category Performance",
    "chartRegionalTitle": "PCMC & Pune Geographic Demand",
    "chartLeaderboardTitle": "Top In-Demand Government Services Leaderboard",
    "chartDeliveryChannels": "Application Delivery Channels",
    "portalTitle": "Digital Citizen Services Portal",
    "portalSubtitle": "Apply online, upload verification documents, and track certificate status",
    "tabMyRequests": "My Service Applications",
    "tabApplyOnline": "Apply Online with Documents",
    "btnNewApplication": "Apply for New Service",
    "applicantDetails": "Applicant Information",
    "applicantName": "Full Name (as per Aadhaar)",
    "applicantPhone": "Mobile Number",
    "applicantEmail": "Email Address",
    "aadhaarNumber": "Aadhaar Card Number",
    "applicantAddress": "Residential Address",
    "uploadDocsTitle": "Upload Required Verification Documents",
    "dragDropDocs": "Drag & drop verification files here or click to browse",
    "supportedFormats": "Supported: PDF, JPG, PNG (Max 10MB per file)",
    "btnSubmitApplication": "Submit Application & Documents",
    "btnTrackStatus": "Track Live Status",
    "emptyRequestsTitle": "No applications filed yet",
    "emptyRequestsSub": "Apply online for your government certificates, licenses, or updates in just 2 minutes.",
    "statusAll": "All Requests",
    "statusPending": "Pending Review",
    "statusInProgress": "In-Progress (Govt Desk)",
    "statusFulfilled": "Fulfilled / Ready",
    "statusRejected": "Rejected / Discrepancy",
    "stepSubmitted": "Submitted",
    "stepUnderReview": "Under Review",
    "stepProcessing": "Processing (Govt)",
    "stepCompleted": "Completed / Ready",
    "fastTrackTitle": "Online Application Portal",
    "fastTrackBadge": "Recommended",
    "fastTrackDesc": "Upload required verification documents directly, avoid center queues, and track live status anytime.",
    "btnApplyOnlineWithDocs": "Apply Online With Documents",
    "instantWaHelp": "Prefer chatting with center operator directly? Send a WhatsApp message.",
    "authCitizenLogin": "Citizen Sign In",
    "authCitizenRegister": "Citizen Registration",
    "authAdminLogin": "Admin Portal",
    "btnSignIn": "Sign In to Portal",
    "btnRegister": "Create Citizen Account",
    "demoAdminFill": "1-Click Demo Admin",
    "demoCitizenFill": "1-Click Demo Citizen",
    "sessionConflictTitle": "You want to terminate Another Session ",
    "sessionConflictSubtitle": "An active session for this account is currently running on another device or browser.",
    "sessionConflictExisting": "Existing Active Device",
    "sessionConflictLoginAt": "Session Started",
    "sessionConflictQuestion": "Terminating will immediately sign out the previous device in real time and establish this session.",
    "btnTerminateYes": "Yes, Terminate Session",
    "btnTerminateCancel": "Cancel",
    "sessionTerminatedTitle": "Session Terminated",
    "sessionTerminatedNotice": "Your session has been terminated because another session was started on a different device.",
    "btnSignInAgain": "Sign In Again",
    "docCountBadge": "Documents Required",
    "maxFileSizeNotice": "Max 1 MB per document (PDF, JPG, PNG)",
    "fileSizeExceeded": "File exceeds 1 MB limit. Please compress before uploading.",
    "realtimeApprovalToast": "Your service application has been updated in real-time!",
    "realtimeNewRequest": "New citizen application received!",
    "realtimeRegistered": "New citizen registered!",
    "time7Days": "7 Days",
    "time30Days": "30 Days",
    "time6Months": "6 Months",
    "timeFY2425": "FY 24-25"
  },
  "mr": {
    "siteTitle": "आर्या एंटरप्राइजेस",
    "siteSubtitle": "ई-सेवा केंद्र आणि मल्टी-सर्व्हिसेस",
    "navHome": "मुख्य पृष्ठ",
    "navServices": "सेवा",
    "navAbout": "आमच्याबद्दल",
    "navBlog": "ब्लॉग",
    "navContact": "संपर्क",
    "navGallery": "गॅलरी",
    "navAnalytics": "विश्लेषण कक्ष",
    "navRequestMenu": "अर्ज मेनू",
    "navCitizenPortal": "नागरिक पोर्टल",
    "navSignIn": "लॉगिन / ट्रॅक",
    "navApplyOnline": "ऑनलाइन अर्ज",
    "trendingTitle": "नवीन आणि लोकप्रिय सेवा",
    "allServicesTitle": "आमच्या प्रमुख सेवा",
    "allServicesSubtitle": "आपल्या सर्व शासकीय कागदपत्रांच्या गरजांसाठी परिपूर्ण उपाय",
    "blogTitle": "नवीनतम अद्यतने",
    "footerLinks": "जलद दुवे",
    "footerContact": "संपर्क साधा",
    "lblDocuments": "आवश्यक कागदपत्रे",
    "lblEligibility": "पात्रता निकष",
    "formTitle": "चौकशी करा",
    "formName": "पूर्ण नाव",
    "formMobile": "मोबाईल नंबर",
    "formMessage": "संदेश",
    "btnSubmit": "संदेश पाठवा",
    "adminTitle": "महा ई-सेवा प्रशासन नियंत्रण कक्ष",
    "adminSubtitle": "आकुर्डी पुणे केंद्र",
    "tabAnalytics": "कार्यकारी विश्लेषण आणि आलेख",
    "tabRequests": "नागरिक अर्ज व्यवस्थापन मेनू",
    "biStudio": "कार्यकारी बुद्धिमत्ता आणि विश्लेषण कक्ष",
    "biStudioSub": "रिअल-टाइम नागरिक अर्ज वेग, महसूल ट्रॅकिंग, तहसीलदार डेस्क रूपांतरण आणि SLA स्थिती",
    "btnExportCsv": "CSV निर्यात करा",
    "btnViewPublic": "सार्वजनिक साइट पहा",
    "btnLogout": "लॉगआउट",
    "kpiTotalInflow": "एकूण अर्ज",
    "kpiNetRealized": "जमा महसूल",
    "kpiFulfillmentRate": "पूर्तता दर",
    "kpiAvgSla": "सरासरी वेळ (TAT)",
    "kpiDigitalCitizens": "नोंदणीकृत नागरिक",
    "chartVolumeTitle": "मासिक अर्ज प्रमाण आणि वितरण आलेख",
    "chartStatusTitle": "अर्ज स्थिती विभागणी",
    "chartWeeklyTitle": "साप्ताहिक गर्दी आणि कामाचा ताण",
    "chartFunnelTitle": "कागदपत्र पडताळणी टप्पे",
    "chartCategoryTitle": "शासकीय सेवा प्रवर्ग कामगिरी",
    "chartRegionalTitle": "PCMC व पुणे विभागीय मागणी",
    "chartLeaderboardTitle": "सर्वाधिक मागणी असलेल्या सेवा",
    "chartDeliveryChannels": "अर्ज वितरण माध्यमे",
    "portalTitle": "डिजिटल नागरिक सेवा पोर्टल",
    "portalSubtitle": "ऑनलाइन अर्ज करा, पडताळणी कागदपत्रे अपलोड करा आणि प्रमाणपत्राची स्थिती तपासा",
    "tabMyRequests": "माझे सेवा अर्ज",
    "tabApplyOnline": "कागदपत्रांसह ऑनलाइन अर्ज करा",
    "btnNewApplication": "नवीन सेवेसाठी अर्ज करा",
    "applicantDetails": "अर्जदाराची माहिती",
    "applicantName": "पूर्ण नाव (आधार कार्डाप्रमाणे)",
    "applicantPhone": "मोबाईल क्रमांक",
    "applicantEmail": "ईमेल पत्ता",
    "aadhaarNumber": "आधार कार्ड क्रमांक",
    "applicantAddress": "निवासी पत्ता",
    "uploadDocsTitle": "आवश्यक पडताळणी कागदपत्रे अपलोड करा",
    "dragDropDocs": "कागदपत्रे येथे ड्रॅग करा किंवा फाईल निवडण्यासाठी क्लिक करा",
    "supportedFormats": "स्वीकार्य: PDF, JPG, PNG (कमाल १० MB प्रति फाईल)",
    "btnSubmitApplication": "अर्ज आणि कागदपत्रे जमा करा",
    "btnTrackStatus": "थेट स्थिती तपासा",
    "emptyRequestsTitle": "अद्याप कोणताही अर्ज केलेला नाही",
    "emptyRequestsSub": "आपले शासकीय प्रमाणपत्र, परवाना किंवा अपडेटसाठी फक्त २ मिनिटांत ऑनलाइन अर्ज करा.",
    "statusAll": "सर्व अर्ज",
    "statusPending": "पडताळणी प्रलंबित",
    "statusInProgress": "प्रगतीपथावर (शासकीय डेस्क)",
    "statusFulfilled": "पूर्ण / तयार",
    "statusRejected": "नाकारले / त्रुटी",
    "stepSubmitted": "जमा केले",
    "stepUnderReview": "पडताळणी सुरू",
    "stepProcessing": "शासकीय प्रक्रिया सुरू",
    "stepCompleted": "पूर्ण / तयार",
    "fastTrackTitle": "ऑनलाइन अर्ज पोर्टल",
    "fastTrackBadge": "शिफारस केलेले",
    "fastTrackDesc": "आवश्यक पडताळणी कागदपत्रे थेट ऑनलाइन अपलोड करा, केंद्रावरील रांग टाळा आणि थेट स्थिती तपासा.",
    "btnApplyOnlineWithDocs": "कागदपत्रांसह ऑनलाइन अर्ज करा",
    "instantWaHelp": "ऑपरेटरशी थेट व्हॉट्सअॅपवर बोलायचे आहे का? संदेश पाठवा.",
    "authCitizenLogin": "नागरिक लॉगिन",
    "authCitizenRegister": "नागरिक नोंदणी",
    "authAdminLogin": "प्रशासक पोर्टल",
    "btnSignIn": "पोर्टलवर लॉगिन करा",
    "btnRegister": "नागरिक खाते तयार करा",
    "demoAdminFill": "१-क्लिक चाचणी प्रशासक",
    "demoCitizenFill": "१-क्लिक चाचणी नागरिक",
    "sessionConflictTitle": "You want to terminate Another Session ",
    "sessionConflictSubtitle": "या खात्याचे सक्रिय सत्र (Session) दुसऱ्या डिव्हाइस किंवा ब्राउझरवर चालू आहे.",
    "sessionConflictExisting": "चालू सक्रिय डिव्हाइस",
    "sessionConflictLoginAt": "सत्र सुरू वेळ",
    "sessionConflictQuestion": "सत्र समाप्त केल्यास जुने डिव्हाइस तत्काळ लॉगआउट होईल आणि येथे नवीन सत्र सुरू होईल.",
    "btnTerminateYes": "होय, सत्र समाप्त करा (Yes)",
    "btnTerminateCancel": "रद्द करा (Cancel)",
    "sessionTerminatedTitle": "सत्र समाप्त झाले",
    "sessionTerminatedNotice": "दुसऱ्या डिव्हाइसवर नवीन सत्र सुरू झाल्यामुळे तुमचे चालू सत्र समाप्त करण्यात आले आहे.",
    "btnSignInAgain": "पुन्हा लॉगिन करा",
    "docCountBadge": "कागदपत्रे आवश्यक",
    "maxFileSizeNotice": "प्रत्येक दस्तऐवजासाठी कमाल १ MB (PDF, JPG, PNG)",
    "fileSizeExceeded": "दस्तऐवज फाइल १ MB च्या मर्यादेपेक्षा मोठी आहे. कृपया आकार कमी करून पुन्हा अपलोड करा.",
    "realtimeApprovalToast": "तुमचा सेवा अर्ज रिअल-टाइममध्ये अद्यतनित झाला आहे!",
    "realtimeNewRequest": "नवीन नागरिक अर्ज प्राप्त झाला!",
    "realtimeRegistered": "नवीन नागरिक नोंदणी झाली!",
    "time7Days": "७ दिवस",
    "time30Days": "३० दिवस",
    "time6Months": "६ महिने",
    "timeFY2425": "आर्थिक वर्ष २४-२५"
  },
  "hi": {
    "siteTitle": "आर्या एंटरप्राइजेज",
    "siteSubtitle": "ई-सेवा केंद्र और मल्टी-सर्विसेज",
    "navHome": "मुख्य पृष्ठ",
    "navServices": "सेवाएं",
    "navAbout": "हमारे बारे में",
    "navBlog": "ब्लॉग",
    "navContact": "संपर्क",
    "navGallery": "गैलरी",
    "navAnalytics": "विश्लेषण पैनल",
    "navRequestMenu": "अनुरोध मेनू",
    "navCitizenPortal": "नागरिक पोर्टल",
    "navSignIn": "साइन इन / ट्रैक",
    "navApplyOnline": "ऑनलाइन आवेदन",
    "trendingTitle": "नई और लोकप्रिय सेवाएं",
    "allServicesTitle": "हमारी प्रमुख सेवाएं",
    "allServicesSubtitle": "आपकी सभी दस्तावेज़ीकरण आवश्यकताओं के लिए समग्र समाधान",
    "blogTitle": "नवीनतम अपडेट",
    "footerLinks": "त्वरित लिंक",
    "footerContact": "संपर्क करें",
    "lblDocuments": "आवश्यक दस्तावेज़",
    "lblEligibility": "पात्रता",
    "formTitle": "पूछताछ करें",
    "formName": "पूरा नाम",
    "formMobile": "मोबाइल नंबर",
    "formMessage": "संदेश",
    "btnSubmit": "संदेश भेजें",
    "adminTitle": "महा ई-सेवा व्यवस्थापक नियंत्रण कक्ष",
    "adminSubtitle": "आकुर्डी पुणे केंद्र",
    "tabAnalytics": "कार्यकारी विश्लेषण और चार्ट",
    "tabRequests": "नागरिक अनुरोध प्रबंधन मेनू",
    "biStudio": "परिचालन खुफिया और विश्लेषण स्टूडियो",
    "biStudioSub": "वास्तविक समय नागरिक आवेदन गति, राजस्व ट्रैकिंग, तहसीलदार डेस्क रूपांतरण और SLA स्वास्थ्य",
    "btnExportCsv": "CSV निर्यात करें",
    "btnViewPublic": "सार्वजनिक साइट देखें",
    "btnLogout": "लॉगआउट",
    "kpiTotalInflow": "कुल आवेदन",
    "kpiNetRealized": "वसूल राजस्व",
    "kpiFulfillmentRate": "पूर्ति दर",
    "kpiAvgSla": "औसत समय (TAT)",
    "kpiDigitalCitizens": "पंजीकृत नागरिक",
    "chartVolumeTitle": "मासिक आवेदन मात्रा और वितरण प्रक्षेपवक्र",
    "chartStatusTitle": "आवेदन स्थिति विभाजन",
    "chartWeeklyTitle": "साप्ताहिक ट्रैफिक और कार्यभार पैटर्न",
    "chartFunnelTitle": "नागरिक दस्तावेज़ सत्यापन फ़नल",
    "chartCategoryTitle": "सरकारी सेवा श्रेणी प्रदर्शन",
    "chartRegionalTitle": "पीसीएमसी और पुणे क्षेत्रीय मांग",
    "chartLeaderboardTitle": "शीर्ष मांग वाली सरकारी सेवाएं",
    "chartDeliveryChannels": "आवेदन वितरण चैनल",
    "portalTitle": "डिजिटल नागरिक सेवा पोर्टल",
    "portalSubtitle": "ऑनलाइन आवेदन करें, सत्यापन दस्तावेज़ अपलोड करें और प्रमाणपत्र स्थिति ट्रैक करें",
    "tabMyRequests": "मेरे सेवा आवेदन",
    "tabApplyOnline": "दस्तावेज़ों के साथ ऑनलाइन आवेदन करें",
    "btnNewApplication": "नई सेवा के लिए आवेदन करें",
    "applicantDetails": "आवेदक की जानकारी",
    "applicantName": "पूरा नाम (आधार के अनुसार)",
    "applicantPhone": "मोबाइल नंबर",
    "applicantEmail": "ईमेल पता",
    "aadhaarNumber": "आधार कार्ड संख्या",
    "applicantAddress": "निवासी पता",
    "uploadDocsTitle": "आवश्यक सत्यापन दस्तावेज़ अपलोड करें",
    "dragDropDocs": "दस्तावेज़ यहां खींचें या फ़ाइल चुनने के लिए क्लिक करें",
    "supportedFormats": "स्वीकार्य: PDF, JPG, PNG (प्रति फ़ाइल अधिकतम 10MB)",
    "btnSubmitApplication": "आवेदन और दस्तावेज़ जमा करें",
    "btnTrackStatus": "लाइव स्थिति ट्रैक करें",
    "emptyRequestsTitle": "अभी तक कोई आवेदन नहीं किया गया",
    "emptyRequestsSub": "अपने सरकारी प्रमाण पत्र, लाइसेंस या अपडेट के लिए केवल 2 मिनट में ऑनलाइन आवेदन करें।",
    "statusAll": "सभी अनुरोध",
    "statusPending": "समीक्षा लंबित",
    "statusInProgress": "प्रगति पर (सरकारी डेस्क)",
    "statusFulfilled": "पूर्ण / तैयार",
    "statusRejected": "अस्वीकृत / त्रुटि",
    "stepSubmitted": "जमा किया गया",
    "stepUnderReview": "समीक्षाधीन",
    "stepProcessing": "सरकारी प्रक्रिया जारी",
    "stepCompleted": "पूर्ण / तैयार",
    "fastTrackTitle": "ऑनलाइन आवेदन पोर्टल",
    "fastTrackBadge": "अनुशंसित",
    "fastTrackDesc": "आवश्यक सत्यापन दस्तावेज़ सीधे ऑनलाइन अपलोड करें, केंद्र की कतार से बचें और कभी भी लाइव स्थिति ट्रैक करें।",
    "btnApplyOnlineWithDocs": "दस्तावेज़ों के साथ ऑनलाइन आवेदन करें",
    "instantWaHelp": "ऑपरेटर से सीधे व्हाट्सएप पर बात करना चाहते हैं? संदेश भेजें।",
    "authCitizenLogin": "नागरिक लॉगिन",
    "authCitizenRegister": "नागरिक पंजीकरण",
    "authAdminLogin": "व्यवस्थापक पोर्टल",
    "btnSignIn": "पोर्टल पर लॉगिन करें",
    "btnRegister": "नागरिक खाता बनाएं",
    "demoAdminFill": "1-क्लिक परीक्षण व्यवस्थापक",
    "demoCitizenFill": "1-क्लिक परीक्षण नागरिक",
    "sessionConflictTitle": "You want to terminate Another Session ",
    "sessionConflictSubtitle": "इस खाते का एक सक्रिय सत्र (Session) पहले से ही किसी अन्य डिवाइस या ब्राउज़र पर खुला हुआ है।",
    "sessionConflictExisting": "वर्तमान सक्रिय डिवाइस",
    "sessionConflictLoginAt": "सत्र प्रारंभ समय",
    "sessionConflictQuestion": "सत्र समाप्त करने पर पिछला डिवाइस तुरंत वास्तविक समय में लॉगआउट हो जाएगा और यहां नया सत्र शुरू होगा।",
    "btnTerminateYes": "हां, सत्र समाप्त करें (Yes)",
    "btnTerminateCancel": "रद्द करें (Cancel)",
    "sessionTerminatedTitle": "सत्र समाप्त कर दिया गया",
    "sessionTerminatedNotice": "किसी अन्य डिवाइस पर नया सत्र शुरू होने के कारण आपका वर्तमान सत्र समाप्त कर दिया गया है।",
    "btnSignInAgain": "पुनः लॉगिन करें",
    "docCountBadge": "दस्तावेज़ आवश्यक",
    "maxFileSizeNotice": "प्रति दस्तावेज़ अधिकतम 1 MB (PDF, JPG, PNG)",
    "fileSizeExceeded": "फ़ाइल 1 MB की अधिकतम सीमा से अधिक है। कृपया आकार घटाकर अपलोड करें।",
    "realtimeApprovalToast": "आपका सेवा आवेदन वास्तविक समय में अपडेट हो गया है!",
    "realtimeNewRequest": "नया नागरिक आवेदन प्राप्त हुआ!",
    "realtimeRegistered": "नया नागरिक पंजीकृत हुआ!",
    "time7Days": "7 दिन",
    "time30Days": "30 दिन",
    "time6Months": "6 महीने",
    "timeFY2425": "वित्तीय वर्ष 24-25"
  }
};

export const categories = [
  "Identity",
  "Certificates",
  "Business",
  "Police/Legal",
  "Financial",
  "Online Forms"
];

/* SERVICES DATA with exact document counts & checklists */
export const servicesData = [
  {
    "id": 101,
    "category": "Identity",
    "isNew": false,
    "isTrending": true,
    "image": "images/adhar.jpg",
    "icon": "fa-id-card",
    "title": {
      "en": "Aadhaar Card Update",
      "mr": "आधार कार्ड अपडेट",
      "hi": "आधार कार्ड अपडेट"
    },
    "desc": {
      "en": "Biometric update, Address change, and Mobile linking.",
      "mr": "बायोमेट्रिक अपडेट, पत्ता बदल आणि मोबाईल लिंकिंग.",
      "hi": "बायोमेट्रिक अपडेट, पता परिवर्तन और मोबाइल लिंकिंग।"
    },
    "docs": {
      "en": [
        "Original Aadhaar Card / Enrollment Slip",
        "Proof of Identity (PAN / Voter ID / Passport)",
        "Proof of Address (Electricity Bill / Ration Card)",
        "Active Mobile for OTP & Biometric Verification"
      ],
      "mr": [
        "मूळ आधार कार्ड / नोंदणी पावती",
        "ओळख पुरावा (पॅन / मतदार ओळखपत्र / पासपोर्ट)",
        "पत्त्याचा पुरावा (वीज बिल / रेशन कार्ड)",
        "ओटीपी आणि बायोमेट्रिकसाठी चालू मोबाईल"
      ],
      "hi": [
        "मूल आधार कार्ड / नामांकन पर्ची",
        "पहचान का प्रमाण (पैन / मतदाता पहचान पत्र / पासपोर्ट)",
        "पते का प्रमाण (बिजली बिल / राशन कार्ड)",
        "ओटीपी और बायोमेट्रिक के लिए सक्रिय मोबाइल"
      ]
    },
    "eligibility": {
      "en": "Indian Resident",
      "mr": "भारतीय नागरिक",
      "hi": "भारतीय नागरिक"
    },
    "documentCount": 4
  },
  {
    "id": 102,
    "category": "Identity",
    "isNew": true,
    "isTrending": true,
    "image": "images/pancard.jpg",
    "icon": "fa-address-card",
    "title": {
      "en": "PAN Card",
      "mr": "पॅन कार्ड",
      "hi": "पैन कार्ड"
    },
    "desc": {
      "en": "Permanent Account Number for financial and tax-related transactions.",
      "mr": "आर्थिक आणि कर-संबंधित व्यवहारांसाठी पॅन कार्ड.",
      "hi": "वित्तीय और कर-संबंधी लेनदेन के लिए पैन कार्ड।"
    },
    "docs": {
      "en": [
        "Aadhaar Card (Linked with Mobile)",
        "Proof of Date of Birth (Birth Cert / School TC)",
        "2 Recent Passport-size Color Photographs",
        "Existing PAN copy (for corrections/reprint)"
      ],
      "mr": [
        "आधार कार्ड (मोबाईल लिंक असलेले)",
        "जन्मतारीख पुरावा (जन्म दाखला / शाळा सोडल्याचा दाखला)",
        "२ नवीन पासपोर्ट आकाराचे रंगीत फोटो",
        "जुने पॅन कार्ड प्रत (दुरुस्ती / पुनर्छपाईसाठी)"
      ],
      "hi": [
        "आधार कार्ड (मोबाइल से लिंक)",
        "जन्म तिथि का प्रमाण (जन्म प्रमाण पत्र / स्कूल टीसी)",
        "2 हालिया पासपोर्ट साइज रंगीन फोटो",
        "मौजूदा पैन कॉपी (सुधार / पुनर्मुद्रण के लिए)"
      ]
    },
    "eligibility": {
      "en": "Individuals, Minors, Companies",
      "mr": "व्यक्ती, अल्पवयीन, कंपन्या",
      "hi": "व्यक्ति, नाबालिग, कंपनियां"
    },
    "documentCount": 4
  },
  {
    "id": 103,
    "category": "Identity",
    "isNew": false,
    "isTrending": true,
    "image": "images/passport.jpg",
    "icon": "fa-passport",
    "title": {
      "en": "Passport Services",
      "mr": "पासपोर्ट सेवा",
      "hi": "पासपोर्ट सेवाएं"
    },
    "desc": {
      "en": "Official travel document issued by Gov of India. New & Re-issue.",
      "mr": "भारत सरकारद्वारे जारी केलेले अधिकृत प्रवास दस्तऐवज.",
      "hi": "भारत सरकार द्वारा जारी आधिकारिक यात्रा दस्तावेज।"
    },
    "docs": {
      "en": [
        "Aadhaar Card (Original + Copy)",
        "Proof of Date of Birth (Birth Certificate / School LC)",
        "Current Address Proof (Passbook / Utility Bill)",
        "PAN Card / Voter ID"
      ],
      "mr": [
        "आधार कार्ड (मूळ + झेरॉक्स)",
        "जन्मतारीख पुरावा (जन्म प्रमाणपत्र / शाळा सोडल्याचा दाखला)",
        "सध्याच्या पत्त्याचा पुरावा (पासबुक / वीज बिल)",
        "पॅन कार्ड / मतदार ओळखपत्र"
      ],
      "hi": [
        "आधार कार्ड (मूल + प्रति)",
        "जन्म तिथि का प्रमाण (जन्म प्रमाण पत्र / स्कूल टीसी)",
        "वर्तमान पते का प्रमाण (पासबुक / बिजली बिल)",
        "पैन कार्ड / मतदाता पहचान पत्र"
      ]
    },
    "eligibility": {
      "en": "Indian Citizens",
      "mr": "भारतीय नागरिक",
      "hi": "भारतीय नागरिक"
    },
    "documentCount": 4
  },
  {
    "id": 104,
    "category": "Identity",
    "isNew": true,
    "isTrending": false,
    "image": "images/driving.jpg",
    "icon": "fa-car",
    "title": {
      "en": "Driving License",
      "mr": "ड्रायव्हिंग लायसन्स",
      "hi": "ड्राइविंग लाइसेंस"
    },
    "desc": {
      "en": "Authorization to drive motor vehicles. Learning & Permanent.",
      "mr": "वाहन चालवण्याचा परवाना. लर्निंग आणि पक्का.",
      "hi": "वाहन चलाने का प्राधिकरण। लर्निंग और पक्का।"
    },
    "docs": {
      "en": [
        "Age Proof (10th Marksheet / School LC / Birth Cert)",
        "Address Proof (Aadhaar / Voter ID / Ration Card)",
        "3 Passport Size Photographs",
        "Medical Fitness Certificate (Form 1-A)"
      ],
      "mr": [
        "वयाचा पुरावा (१० वी गुणपत्रिका / शाळा दाखला / जन्म प्रमाणपत्र)",
        "पत्त्याचा पुरावा (आधार / मतदार ओळखपत्र / रेशन कार्ड)",
        "३ पासपोर्ट आकाराचे फोटो",
        "वैद्यकीय योग्यता प्रमाणपत्र (फॉर्म १-ए)"
      ],
      "hi": [
        "आयु का प्रमाण (10वीं की मार्कशीट / स्कूल एलसी / जन्म प्रमाण पत्र)",
        "पते का प्रमाण (आधार / वोटर आईडी / राशन कार्ड)",
        "3 पासपोर्ट साइज फोटो",
        "मेडिकल फिटनेस सर्टिफिकेट (फॉर्म 1-ए)"
      ]
    },
    "eligibility": {
      "en": "18+ for Gear, 16+ for Non-Gear",
      "mr": "१८+ गियरसाठी",
      "hi": "18+ गियर के लिए"
    },
    "documentCount": 4
  },
  {
    "id": 105,
    "category": "Identity",
    "isNew": true,
    "isTrending": false,
    "image": "images/smartadhar.jpg",
    "icon": "fa-id-badge",
    "title": {
      "en": "Smart Aadhaar (PVC)",
      "mr": "स्मार्ट आधार (PVC)",
      "hi": "स्मार्ट आधार (PVC)"
    },
    "desc": {
      "en": "Durable credit-card style Aadhaar with security features.",
      "mr": "सुरक्षा वैशिष्ट्यांसह टिकाऊ क्रेडिट-कार्ड शैलीतील आधार.",
      "hi": "सुरक्षा सुविधाओं के साथ टिकाऊ क्रेडिट-कार्ड शैली आधार।"
    },
    "docs": {
      "en": [
        "12-Digit Aadhaar Number or 28-Digit EID",
        "Aadhaar-Linked Registered Mobile for OTP"
      ],
      "mr": [
        "१२-अंकी आधार क्रमांक किंवा २८-अंकी ईआयडी पावती",
        "ओटीपी पडताळणीसाठी आधार लिंक असलेला मोबाईल"
      ],
      "hi": [
        "12-अंकों का आधार नंबर या 28-अंकों की ईआईडी",
        "ओटीपी सत्यापन के लिए आधार से जुड़ा पंजीकृत मोबाइल"
      ]
    },
    "eligibility": {
      "en": "Aadhaar Holders",
      "mr": "आधार धारक",
      "hi": "आधार धारक"
    },
    "documentCount": 2
  },
  {
    "id": 106,
    "category": "Identity",
    "isNew": false,
    "isTrending": false,
    "image": "images/voterid.jpg",
    "icon": "fa-vote-yea",
    "title": {
      "en": "Voter ID Card",
      "mr": "मतदार ओळखपत्र",
      "hi": "मतदाता पहचान पत्र"
    },
    "desc": {
      "en": "New Voter Registration and corrections.",
      "mr": "नवीन मतदार नोंदणी आणि दुरुस्ती.",
      "hi": "नया मतदाता पंजीकरण और सुधार।"
    },
    "docs": {
      "en": [
        "Passport-size Color Photograph",
        "Proof of Age (Birth Certificate / School LC / Aadhaar)",
        "Proof of Address (Light Bill / Water Bill / Gas Bill)",
        "Family Member Voter EPIC Number (if available)"
      ],
      "mr": [
        "पासपोर्ट आकाराचा रंगीत फोटो",
        "वयाचा पुरावा (जन्म प्रमाणपत्र / शाळा सोडल्याचा दाखला / आधार)",
        "पत्त्याचा पुरावा (वीज बिल / पाणी बिल / गॅस बिल)",
        "कुटुंबातील सदस्याचा मतदार ओळखपत्र क्रमांक"
      ],
      "hi": [
        "पासपोर्ट आकार का रंगीन फोटो",
        "आयु का प्रमाण (जन्म प्रमाण पत्र / स्कूल एलसी / आधार)",
        "पते का प्रमाण (बिजली बिल / पानी बिल / गैस बिल)",
        "परिवार के सदस्य का वोटर कार्ड नंबर (यदि उपलब्ध हो)"
      ]
    },
    "eligibility": {
      "en": "Age 18+",
      "mr": "वय १८+",
      "hi": "आयु 18+"
    },
    "documentCount": 4
  },
  {
    "id": 201,
    "category": "Certificates",
    "isNew": false,
    "isTrending": true,
    "image": "images/income.png",
    "icon": "fa-file-invoice-dollar",
    "title": {
      "en": "Income Certificate",
      "mr": "उत्पन्न दाखला",
      "hi": "आय प्रमाण पत्र"
    },
    "desc": {
      "en": "Govt statement of annual income for scholarships/schemes.",
      "mr": "शिष्यवृत्तीसाठी उत्पन्नाचे शासकीय विवरण.",
      "hi": "छात्रवृत्ति के लिए वार्षिक आय का सरकारी विवरण।"
    },
    "docs": {
      "en": [
        "Talathi / Patwari Income Verification Report",
        "Salary Slips (3 Months) / Form 16 / ITR / Employer Letter",
        "Ration Card & Aadhaar Card of Applicant & Family Head",
        "Self-Declaration Affidavit of Annual Family Income"
      ],
      "mr": [
        "तलाठी उत्पन्न अहवाल / पंचनामा",
        "मागील ३ महिन्यांची पगार पावती / फॉर्म १६ / आयटीआर",
        "अर्जदार व कुटुंब प्रमुखाचे रेशन कार्ड आणि आधार कार्ड",
        "वार्षिक कौटुंबिक उत्पन्नाचे स्व-घोषणापत्र / प्रतिज्ञापत्र"
      ],
      "hi": [
        "तलाठी / पटवारी आय सत्यापन रिपोर्ट",
        "वेतन पर्ची (3 महीने) / फॉर्म 16 / आईटीआर / नियोक्ता पत्र",
        "आवेदक और परिवार मुखिया का राशन कार्ड और आधार कार्ड",
        "वार्षिक पारिवारिक आय का स्व-घोषणा पत्र / शपथ पत्र"
      ]
    },
    "eligibility": {
      "en": "Any Resident",
      "mr": "कोणताही रहिवासी",
      "hi": "कोई भी निवासी"
    },
    "documentCount": 4
  },
  {
    "id": 202,
    "category": "Certificates",
    "isNew": true,
    "isTrending": false,
    "image": "images/Marriage.jpg",
    "icon": "fa-rings-wedding",
    "title": {
      "en": "Marriage Certificate",
      "mr": "विवाह नोंदणी",
      "hi": "विवाह प्रमाण पत्र"
    },
    "desc": {
      "en": "Official marriage registration under Maharashtra Act.",
      "mr": "महाराष्ट्र कायद्यानुसार अधिकृत विवाह नोंदणी.",
      "hi": "महाराष्ट्र अधिनियम के तहत आधिकारिक विवाह पंजीकरण।"
    },
    "docs": {
      "en": [
        "Joint Passport Size Photographs of Bride & Groom",
        "Marriage Invitation Card / Hall Marriage Certificate",
        "Age Proof of Bride & Groom (Birth Cert / School LC)",
        "Address Proof of Bride & Groom (Aadhaar / Ration Card)",
        "Aadhaar Card & Photos of 3 Adult Witnesses"
      ],
      "mr": [
        "वर-वधूचे संयुक्त पासपोर्ट आकाराचे फोटो",
        "लग्नाची पत्रिका / विवाह नोंद मंगल कार्यालय पावती",
        "वर व वधूच्या वयाचा पुरावा (जन्म दाखला / शाळा दाखला)",
        "दोघांच्या रहिवासी पत्त्याचा पुरावा (आधार / रेशन कार्ड)",
        "३ सज्ञान साक्षीदारांचे आधार कार्ड व फोटो"
      ],
      "hi": [
        "दूल्हा-दुल्हन का संयुक्त पासपोर्ट साइज फोटो",
        "शादी का कार्ड / मैरिज हॉल की रसीद",
        "दूल्हा-दुल्हन की आयु का प्रमाण (जन्म प्रमाण पत्र / स्कूल एलसी)",
        "दोनों के पते का प्रमाण (आधार / राशन कार्ड)",
        "3 वयस्क गवाहों का आधार कार्ड और फोटो"
      ]
    },
    "eligibility": {
      "en": "Married Couples",
      "mr": "विवाहित जोडपे",
      "hi": "विवाहित जोड़े"
    },
    "documentCount": 5
  },
  {
    "id": 203,
    "category": "Certificates",
    "isNew": false,
    "isTrending": false,
    "image": "images/domicile.jpg",
    "icon": "fa-map-marked-alt",
    "title": {
      "en": "Domicile Certificate",
      "mr": "अधिवास प्रमाणपत्र",
      "hi": "अधिवास प्रमाण पत्र"
    },
    "desc": {
      "en": "Proof of residence in Maharashtra for education/jobs.",
      "mr": "शिक्षण/नोकरीसाठी महाराष्ट्रातील वास्तव्याचा पुरावा.",
      "hi": "शिक्षा/नौकरी के लिए महाराष्ट्र में निवास का प्रमाण।"
    },
    "docs": {
      "en": [
        "Continuous 15-Year Resident Proof of Maharashtra",
        "School Leaving Certificate (TC) showing Birthplace in MH",
        "Aadhaar Card & Ration Card of Applicant & Father",
        "Tehsildar Self-Declaration Affidavit Form 1"
      ],
      "mr": [
        "महाराष्ट्रात सलग १५ वर्षे वास्तव्याचा पुरावा (लाइट बिल / रेशन कार्ड)",
        "शाळा सोडल्याचा दाखला (जन्मस्थळ महाराष्ट्रातील नमूद)",
        "अर्जदार आणि वडिलांचे आधार कार्ड व रेशन कार्ड",
        "तहसीलदार स्व-घोषणापत्र / प्रतिज्ञापत्र नमुना १"
      ],
      "hi": [
        "महाराष्ट्र में लगातार 15 वर्षों के निवास का प्रमाण",
        "स्कूल लीविंग सर्टिफिकेट (टीसी) जिसमें महाराष्ट्र में जन्म स्थान हो",
        "आवेदक और पिता का आधार कार्ड व राशन कार्ड",
        "तहसीलदार स्व-घोषणा शपथ पत्र प्रारूप 1"
      ]
    },
    "eligibility": {
      "en": "Residents (Usually 15+ Years)",
      "mr": "रहिवासी",
      "hi": "निवासी"
    },
    "documentCount": 4
  },
  {
    "id": 204,
    "category": "Certificates",
    "isNew": true,
    "isTrending": false,
    "image": "images/senior-citizen-card.jpg",
    "icon": "fa-blind",
    "title": {
      "en": "Senior Citizen Cert",
      "mr": "जेष्ठ नागरिक प्रमाणपत्र",
      "hi": "वरिष्ठ नागरिक प्रमाण पत्र"
    },
    "desc": {
      "en": "Entitles holders to travel concessions and scheme benefits.",
      "mr": "प्रवास सवलती आणि योजनांच्या लाभांसाठी.",
      "hi": "यात्रा रियायतों और योजना लाभों के लिए।"
    },
    "docs": {
      "en": [
        "Age Proof indicating 60+ Years (Birth Cert / TC / PAN)",
        "PCMC / Pune Resident Proof (Aadhaar / Light Bill)",
        "2 Passport Size Photographs with Blood Group Certificate"
      ],
      "mr": [
        "६० वर्षे पूर्ण झाल्याचा वयाचा पुरावा (जन्म दाखला / एलसी / पॅन)",
        "पिंपरी-चिंचवड / पुणे रहिवासी पुरावा (आधार / वीज बिल)",
        "२ पासपोर्ट आकाराचे फोटो व रक्तगट अहवाल"
      ],
      "hi": [
        "60+ वर्ष दर्शाने वाला आयु प्रमाण (जन्म प्रमाण पत्र / टीसी / पैन)",
        "पीसीएमसी / पुणे निवास प्रमाण (आधार / बिजली बिल)",
        "रक्त समूह प्रमाण पत्र के साथ 2 पासपोर्ट साइज फोटो"
      ]
    },
    "eligibility": {
      "en": "Age 60+",
      "mr": "वय ६०+",
      "hi": "आयु 60+"
    },
    "documentCount": 3
  },
  {
    "id": 205,
    "category": "Certificates",
    "isNew": false,
    "isTrending": false,
    "image": "images/birth.jpg",
    "icon": "fa-baby-carriage",
    "title": {
      "en": "Birth Certificate",
      "mr": "जन्म दाखला",
      "hi": "जन्म प्रमाण पत्र"
    },
    "desc": {
      "en": "Application for birth registration certificate.",
      "mr": "जन्म नोंदणी प्रमाणपत्रासाठी अर्ज.",
      "hi": "जन्म पंजीकरण प्रमाण पत्र के लिए आवेदन।"
    },
    "docs": {
      "en": [
        "Hospital Discharge Card / Institutional Birth Slip",
        "Parents Aadhaar Card & Marriage Proof",
        "Address Proof of Parents (Ration Card / Light Bill)"
      ],
      "mr": [
        "रुग्णालय डिस्चार्ज कार्ड / अधिकृत जन्म नोंद पावती",
        "आई-वडिलांचे आधार कार्ड व विवाह पुरावा",
        "पालकांचा रहिवासी पुरावा (रेशन कार्ड / वीज बिल)"
      ],
      "hi": [
        "अस्पताल डिस्चार्ज कार्ड / संस्थागत जन्म पर्ची",
        "माता-पिता का आधार कार्ड और विवाह प्रमाण",
        "माता-पिता का निवास प्रमाण (राशन कार्ड / बिजली बिल)"
      ]
    },
    "eligibility": {
      "en": "Born in Jurisdiction",
      "mr": "स्थानिक जन्म",
      "hi": "स्थानीय जन्म"
    },
    "documentCount": 3
  },
  {
    "id": 206,
    "category": "Certificates",
    "isNew": false,
    "isTrending": false,
    "image": "images/residence.jpeg",
    "icon": "fa-home",
    "title": {
      "en": "Residence Certificate",
      "mr": "रहिवासी दाखला",
      "hi": "निवास प्रमाण पत्र"
    },
    "desc": {
      "en": "Proof of current local address (Rahivashi Dakhla).",
      "mr": "सध्याच्या स्थानिक पत्त्याचा पुरावा.",
      "hi": "वर्तमान स्थानीय पते का प्रमाण।"
    },
    "docs": {
      "en": [
        "Aadhaar Card of Applicant",
        "Electricity Bill / PCMC Municipal Tax Receipt",
        "Ration Card / Registered Rent Agreement copy"
      ],
      "mr": [
        "अर्जदाराचे आधार कार्ड",
        "वीज बिल / पिंपरी चिंचवड मनपा घरपट्टी पावती",
        "रेशन कार्ड / नोंदणीकृत भाडेकरार प्रत"
      ],
      "hi": [
        "आवेदक का आधार कार्ड",
        "बिजली बिल / नगर निगम संपत्ति कर रसीद",
        "राशन कार्ड / पंजीकृत किराया समझौता प्रति"
      ]
    },
    "eligibility": {
      "en": "Local Residents",
      "mr": "स्थानिक रहिवासी",
      "hi": "स्थानीय निवासी"
    },
    "documentCount": 3
  },
  {
    "id": 301,
    "category": "Business",
    "isNew": false,
    "isTrending": true,
    "image": "images/gumsta.jpg",
    "icon": "fa-store-alt",
    "title": {
      "en": "Shop Act License",
      "mr": "शॉप ॲक्ट परवाना",
      "hi": "शॉप एक्ट लाइसेंस"
    },
    "desc": {
      "en": "Gumasta license. Mandatory for shops/offices in Maharashtra.",
      "mr": "गुमास्ता परवाना. महाराष्ट्रातील दुकाने/कार्यालयांसाठी अनिवार्य.",
      "hi": "गुमास्ता लाइसेंस। महाराष्ट्र में दुकानों/कार्यालयों के लिए अनिवार्य।"
    },
    "docs": {
      "en": [
        "Photo of Shop / Establishment Front showing Marathi Board",
        "Electricity Bill of Commercial Premises",
        "PCMC Property Tax Receipt / Rent Agreement with NOC",
        "Aadhaar Card & PAN Card of Business Owner / Partners",
        "Partnership Deed / MOA & AOA (if applicable)"
      ],
      "mr": [
        "मराठी नामफलक स्पष्ट दिसणारा दुकानाचा दर्शनी फोटो",
        "व्यावसायिक जागेचे चालू वीज बिल",
        "पिंपरी चिंचवड मनपा घरपट्टी पावती / मालकाचे संमतीपत्र असलेले भाडेकरार",
        "मालकाचे / भागीदारांचे आधार कार्ड व पॅन कार्ड",
        "भागीदारी करारनामा / कंपनी कागदपत्रे (लागू असल्यास)"
      ],
      "hi": [
        "दुकान के सामने का फोटो जिसमें मराठी नामपट्ट स्पष्ट दिखे",
        "व्यावसायिक परिसर का बिजली बिल",
        "नगर निगम संपत्ति कर रसीद / एनओसी सहित किराया अनुबंध",
        "व्यवसाय स्वामी / भागीदारों का आधार कार्ड व पैन कार्ड",
        "साझेदारी विलेख / निगमन दस्तावेज (यदि लागू हो)"
      ]
    },
    "eligibility": {
      "en": "Business Owners",
      "mr": "व्यावसायिक",
      "hi": "व्यवसाय मालिक"
    },
    "documentCount": 5
  },
  {
    "id": 302,
    "category": "Business",
    "isNew": true,
    "isTrending": true,
    "image": "images/fassai.jpg",
    "icon": "fa-utensils",
    "title": {
      "en": "Food License (FSSAI)",
      "mr": "अन्न परवाना (FSSAI)",
      "hi": "खाद्य लाइसेंस (FSSAI)"
    },
    "desc": {
      "en": "Mandatory for food businesses (restaurants, stalls, home chefs).",
      "mr": "अन्न व्यवसायांसाठी अनिवार्य (रेस्टॉरंट्स, स्टॉल).",
      "hi": "खाद्य व्यवसायों के लिए अनिवार्य (रेस्तरां, स्टॉल)।"
    },
    "docs": {
      "en": [
        "Passport-size Photograph of Food Business Operator (FBO)",
        "Aadhaar Card & PAN Card of Operator",
        "Proof of Business Possession (Rent Agreement / Utility Bill)",
        "List of Food Categories / Products manufactured or sold"
      ],
      "mr": [
        "अन्न व्यवसाय चालकाचा (FBO) पासपोर्ट फोटो",
        "चालकाचे आधार कार्ड आणि पॅन कार्ड",
        "जागेच्या ताब्याचा पुरावा (भाडेकरार / वीज बिल)",
        "विक्री / उत्पादन केल्या जाणाऱ्या अन्न पदार्थांची यादी"
      ],
      "hi": [
        "खाद्य व्यवसाय संचालक (FBO) का पासपोर्ट साइज फोटो",
        "संचालक का आधार कार्ड और पैन कार्ड",
        "परिसर के कब्जे का प्रमाण (किराया अनुबंध / बिजली बिल)",
        "निर्मित या बेची जाने वाली खाद्य श्रेणियों की सूची"
      ]
    },
    "eligibility": {
      "en": "Food Business Operators",
      "mr": "अन्न व्यावसायिक",
      "hi": "खाद्य व्यवसाय संचालक"
    },
    "documentCount": 4
  },
  {
    "id": 303,
    "category": "Business",
    "isNew": true,
    "isTrending": false,
    "image": "images/udyam.jpg",
    "icon": "fa-industry",
    "title": {
      "en": "Udyog Aadhaar",
      "mr": "उद्योग आधार",
      "hi": "उद्योग आधार"
    },
    "desc": {
      "en": "MSME Registration for government scheme benefits.",
      "mr": "सरकारी योजनांच्या लाभांसाठी MSME नोंदणी.",
      "hi": "सरकारी योजना लाभों के लिए MSME पंजीकरण।"
    },
    "docs": {
      "en": [
        "Proprietor / Enterprise Aadhaar Number",
        "PAN Card of Business / Proprietor",
        "Active Bank Account Number & IFSC Code"
      ],
      "mr": [
        "मालकाचा / भागीदाराचा आधार क्रमांक",
        "व्यवसायाचे / मालकाचे पॅन कार्ड",
        "सक्रिय बँक खाते क्रमांक आणि आयएफएससी कोड"
      ],
      "hi": [
        "उद्यमी का आधार नंबर",
        "व्यवसाय / मालिक का पैन कार्ड",
        "सक्रिय बैंक खाता संख्या और आईएफएससी कोड"
      ]
    },
    "eligibility": {
      "en": "MSME Enterprises",
      "mr": "MSME उपक्रम",
      "hi": "MSME उद्यम"
    },
    "documentCount": 3
  },
  {
    "id": 304,
    "category": "Business",
    "isNew": true,
    "isTrending": false,
    "image": "images/rentaggrement.jpeg",
    "icon": "fa-file-signature",
    "title": {
      "en": "Rent Agreement",
      "mr": "भाडे करार नोंदणी",
      "hi": "किराया समझौता"
    },
    "desc": {
      "en": "Registered online leave-and-license agreement.",
      "mr": "ऑनलाइन लिव्ह-अँड-लायसन्स करार.",
      "hi": "ऑनलाइन लिव-एंड-लाइसेंस समझौता।"
    },
    "docs": {
      "en": [
        "Landlord Aadhaar Card & PAN Card",
        "Tenant Aadhaar Card & PAN Card",
        "Property Proof (PCMC Tax Receipt / Electricity Bill / Index II)",
        "Aadhaar Cards of 2 Adult Witnesses with Biometric Consent"
      ],
      "mr": [
        "घरमालकाचे आधार कार्ड आणि पॅन कार्ड",
        "भाडेकरूचे आधार कार्ड आणि पॅन कार्ड",
        "मालमत्ता पुरावा (मनपा कर पावती / वीज बिल / इंडेक्स २)",
        "२ सज्ञान साक्षीदारांचे आधार कार्ड व बायोमेट्रिक संमती"
      ],
      "hi": [
        "मकान मालिक का आधार कार्ड और पैन कार्ड",
        "किरायेदार का आधार कार्ड और पैन कार्ड",
        "संपत्ति का प्रमाण (कर रसीद / बिजली बिल / इंडेक्स 2)",
        "बायोमेट्रिक सहमति के साथ 2 वयस्क गवाहों के आधार कार्ड"
      ]
    },
    "eligibility": {
      "en": "Landlord & Tenant",
      "mr": "मालक आणि भाडेकरू",
      "hi": "मकान मालिक और किरायेदार"
    },
    "documentCount": 4
  },
  {
    "id": 305,
    "category": "Business",
    "isNew": false,
    "isTrending": false,
    "image": "images/gst.jpg",
    "icon": "fa-calculator",
    "title": {
      "en": "GST Registration",
      "mr": "GST नोंदणी",
      "hi": "जीएसटी पंजीकरण"
    },
    "desc": {
      "en": "Goods and Services Tax registration for businesses.",
      "mr": "व्यवसायांसाठी वस्तू आणि सेवा कर नोंदणी.",
      "hi": "व्यवसायों के लिए माल और सेवा कर पंजीकरण।"
    },
    "docs": {
      "en": [
        "PAN Card of Business / Proprietor",
        "Aadhaar Card & Photo of Promoters / Partners",
        "Principal Place Electricity Bill / Municipal Tax Receipt",
        "Rent Agreement & NOC from Property Owner",
        "Bank Proof (Cancelled Cheque / Bank Statement)"
      ],
      "mr": [
        "व्यवसायाचे / मालकाचे पॅन कार्ड",
        "चालकाचे आधार कार्ड व पासपोर्ट फोटो",
        "व्यवसाय जागेचे वीज बिल / मनपा कर पावती",
        "नोंदणीकृत भाडेकरार व मालकाचे संमतीपत्र (NOC)",
        "बँकेचा रद्द धनादेश (Cancelled Cheque) / स्टेटमेंट"
      ],
      "hi": [
        "व्यवसाय / मालिक का पैन कार्ड",
        "मालिक / प्रमोटर्स का आधार कार्ड और फोटो",
        "व्यावसायिक परिसर का बिजली बिल / संपत्ति कर रसीद",
        "किराया अनुबंध और संपत्ति मालिक से एनओसी",
        "रद्द किया गया चेक / बैंक खाता विवरण"
      ]
    },
    "eligibility": {
      "en": "Turnover > 20/40 Lakhs",
      "mr": "उलाढाल > २०/४० लाख",
      "hi": "टर्नओवर > 20/40 लाख"
    },
    "documentCount": 5
  },
  {
    "id": 401,
    "category": "Police/Legal",
    "isNew": true,
    "isTrending": false,
    "image": "images/police.png",
    "icon": "fa-user-shield",
    "title": {
      "en": "Police Verification",
      "mr": "पोलीस पडताळणी",
      "hi": "पुलिस सत्यापन"
    },
    "desc": {
      "en": "Character verification for jobs, passport, or tenants.",
      "mr": "नोकरी, पासपोर्ट किंवा भाडेकरूंसाठी चारित्र्य पडताळणी.",
      "hi": "नौकरी, पासपोर्ट या किरायेदारों के लिए चरित्र सत्यापन।"
    },
    "docs": {
      "en": [
        "Valid Indian Passport (Original + Copies)",
        "Aadhaar Card & Current Address Proof",
        "3 Passport Size Color Photographs (White Background)",
        "Proof of Purpose (Company Letter / Visa / Embassy Proof)"
      ],
      "mr": [
        "वैध भारतीय पासपोर्ट (मूळ + झेरॉक्स)",
        "आधार कार्ड आणि सध्याच्या पत्त्याचा पुरावा",
        "३ पासपोर्ट आकाराचे फोटो (पांढरी पार्श्वभूमी)",
        "उद्देश पुरावा (कंपनी पत्र / व्हिसा / दूतावास पत्र)"
      ],
      "hi": [
        "वैध भारतीय पासपोर्ट (मूल + प्रतियां)",
        "आधार कार्ड और वर्तमान पते का प्रमाण",
        "3 पासपोर्ट साइज रंगीन फोटो (सफेद पृष्ठभूमि)",
        "उद्देश्य का प्रमाण (कंपनी पत्र / वीजा / दूतावास दस्तावेज)"
      ]
    },
    "eligibility": {
      "en": "Any Citizen",
      "mr": "कोणीही नागरिक",
      "hi": "कोई भी नागरिक"
    },
    "documentCount": 4
  },
  {
    "id": 402,
    "category": "Police/Legal",
    "isNew": false,
    "isTrending": false,
    "image": "images/affidavite.jpg",
    "icon": "fa-gavel",
    "title": {
      "en": "Affidavits (Gap/Name)",
      "mr": "प्रतिज्ञापत्र (गॅप/नाव)",
      "hi": "शपथ पत्र"
    },
    "desc": {
      "en": "Legal affidavits for education gap, name change, etc.",
      "mr": "शिक्षण गॅप, नाव बदल इत्यादीसाठी कायदेशीर प्रतिज्ञापत्र.",
      "hi": "शिक्षा अंतराल, नाम परिवर्तन आदि के लिए कानूनी शपथ पत्र।"
    },
    "docs": {
      "en": [
        "Applicant Aadhaar Card & PAN Card",
        "Address Proof (Ration Card / Light Bill)",
        "Supporting Proof for Gap / Educational Record / Purpose Details"
      ],
      "mr": [
        "अर्जदाराचे आधार कार्ड व पॅन कार्ड",
        "पत्त्याचा पुरावा (रेशन कार्ड / वीज बिल)",
        "शैक्षणिक खंड (Gap) किंवा नावातील फरकाचे मूळ कागदपत्र"
      ],
      "hi": [
        "आवेदक का आधार कार्ड और पैन कार्ड",
        "पते का प्रमाण (राशन कार्ड / बिजली बिल)",
        "गैप / शैक्षणिक रिकॉर्ड / कारण का सहायक दस्तावेज"
      ]
    },
    "eligibility": {
      "en": "As per requirement",
      "mr": "आवश्यकतेनुसार",
      "hi": "आवश्यकतानुसार"
    },
    "documentCount": 3
  },
  {
    "id": 403,
    "category": "Police/Legal",
    "isNew": false,
    "isTrending": false,
    "image": "images/Gazette.png",
    "icon": "fa-file-alt",
    "title": {
      "en": "Gazette (Name Change)",
      "mr": "गॅझेट (नाव बदल)",
      "hi": "राजपत्र (नाम परिवर्तन)"
    },
    "desc": {
      "en": "Official government notification for name/religion change.",
      "mr": "नाव/धर्म बदलासाठी अधिकृत सरकारी अधिसूचना.",
      "hi": "नाम/धर्म परिवर्तन के लिए आधिकारिक सरकारी अधिसूचना।"
    },
    "docs": {
      "en": [
        "Old Name Identity Proof (Aadhaar / PAN / School LC)",
        "Affidavit for Name Change attested by Judicial Magistrate / Notary",
        "2 Passport Size Photographs",
        "Maharashtra State Gazette Application Form with Newspaper Notification"
      ],
      "mr": [
        "जुने नाव ओळख पुरावा (आधार / पॅन / शाळा दाखला)",
        "नावात बदल केल्याचे नोटरी प्रतिज्ञापत्र",
        "२ पासपोर्ट आकाराचे रंगीत फोटो",
        "महाराष्ट्र राज्य राजपत्र अर्ज व वर्तमानपत्रातील जाहीर प्रकटन"
      ],
      "hi": [
        "पुराने नाम का पहचान प्रमाण (आधार / पैन / स्कूल एलसी)",
        "नोटरी द्वारा सत्यापित नाम परिवर्तन का शपथ पत्र",
        "2 पासपोर्ट साइज फोटो",
        "समाचार पत्र विज्ञापन सहित महाराष्ट्र राज्य राजपत्र फॉर्म"
      ]
    },
    "eligibility": {
      "en": "Citizens wanting name change",
      "mr": "नागरिक",
      "hi": "नागरिक"
    },
    "documentCount": 4
  },
  {
    "id": 404,
    "category": "Police/Legal",
    "isNew": true,
    "isTrending": false,
    "image": "images/vehicleaffidavit.jpg",
    "icon": "fa-motorcycle",
    "title": {
      "en": "Vehicle Affidavit",
      "mr": "गाडी पासिंग प्रतिज्ञापत्र",
      "hi": "वाहन शपथ पत्र"
    },
    "desc": {
      "en": "Affidavit for vehicle transfer/sale (Gaadi Passing).",
      "mr": "वाहन हस्तांतरण/विक्रीसाठी प्रतिज्ञापत्र.",
      "hi": "वाहन हस्तांतरण/बिक्री के लिए शपथ पत्र।"
    },
    "docs": {
      "en": [
        "Vehicle Registration Certificate (RC Original / Copy)",
        "Form 29 & Form 30 duly signed by Seller & Buyer",
        "Valid Vehicle Insurance Policy & PUC Certificate",
        "Aadhaar Card & Residential Address Proof of Buyer"
      ],
      "mr": [
        "वाहनाचे मूळ आरसी बुक (RC Book)",
        "फॉर्म २९ आणि फॉर्म ३० (विक्रेता व खरेदीदाराची स्वाक्षरी असलेले)",
        "चालू वाहन विमा (Insurance) आणि पीयूसी (PUC)",
        "खरेदीदाराचे आधार कार्ड आणि रहिवासी पत्त्याचा पुरावा"
      ],
      "hi": [
        "वाहन पंजीकरण प्रमाण पत्र (आरसी मूल / प्रति)",
        "विक्रेता और खरीदार द्वारा हस्ताक्षरित फॉर्म 29 और फॉर्म 30",
        "वैध वाहन बीमा और पीयूसी प्रमाण पत्र",
        "खरीदार का आधार कार्ड और निवास प्रमाण पत्र"
      ]
    },
    "eligibility": {
      "en": "Vehicle Owners",
      "mr": "वाहन मालक",
      "hi": "वाहन मालिक"
    },
    "documentCount": 4
  },
  {
    "id": 405,
    "category": "Police/Legal",
    "isNew": false,
    "isTrending": false,
    "image": "images/noncreamy.jpg",
    "icon": "fa-ban",
    "title": {
      "en": "Non-Creamy layer Cert",
      "mr": "नॉन-क्रिमिनल दाखला",
      "hi": "गैर-आपराधिक प्रमाण पत्र"
    },
    "desc": {
      "en": "Police clearance certifying no pending criminal cases.",
      "mr": "कोणताही प्रलंबित फौजदारी खटला नसल्याचे प्रमाणपत्र.",
      "hi": "कोई लंबित आपराधिक मामला न होने का प्रमाण पत्र।"
    },
    "docs": {
      "en": [
        "Current Valid Caste Certificate issued by Sub-Divisional Officer",
        "Last 3 Consecutive Years Income Certificate from Tehsildar",
        "Applicant & Father School Leaving Certificates",
        "Ration Card & Aadhaar Card",
        "Self-Declaration Affidavit Form 1"
      ],
      "mr": [
        "उपविभागीय अधिकारी यांनी दिलेले चालू वैध जात प्रमाणपत्र",
        "तहसीलदारांकडून मिळालेला मागील ३ वर्षांचा अधिकृत उत्पन्न दाखला",
        "अर्जदार आणि वडिलांचा शाळा सोडल्याचा दाखला",
        "रेशन कार्ड आणि आधार कार्ड",
        "स्व-घोषणापत्र / प्रतिज्ञापत्र नमुना १"
      ],
      "hi": [
        "उप-विभागीय अधिकारी द्वारा जारी वर्तमान वैध जाति प्रमाण पत्र",
        "तहसीलदार द्वारा पिछले 3 लगातार वर्षों का आय प्रमाण पत्र",
        "आवेदक और पिता का स्कूल लीविंग सर्टिफिकेट",
        "राशन कार्ड और आधार कार्ड",
        "स्व-घोषणा शपथ पत्र प्रारूप 1"
      ]
    },
    "eligibility": {
      "en": "Indian Citizens",
      "mr": "भारतीय नागरिक",
      "hi": "भारतीय नागरिक"
    },
    "documentCount": 5
  },
  {
    "id": 501,
    "category": "Financial",
    "isNew": true,
    "isTrending": true,
    "image": "images/kyc.jpg",
    "icon": "fa-wallet",
    "title": {
      "en": "Paytm e-KYC",
      "mr": "Paytm ई-केवायसी",
      "hi": "Paytm ई-केवाईसी"
    },
    "desc": {
      "en": "Digital Aadhaar-based KYC for full wallet functionality.",
      "mr": "पूर्ण वॉलेट कार्यक्षमतेसाठी डिजिटल आधार-आधारित केवायसी.",
      "hi": "पूर्ण वॉलेट कार्यक्षमता के लिए डिजिटल आधार-आधारित केवाईसी।"
    },
    "docs": {
      "en": [
        "Original Physical Aadhaar Card for Biometric Scan",
        "PAN Card Number / Physical PAN",
        "Registered Mobile Number with active SIM for OTP"
      ],
      "mr": [
        "बायोमेट्रिक स्कॅनसाठी मूळ आधार कार्ड",
        "पॅन कार्ड क्रमांक / मूळ पॅन कार्ड",
        "ओटीपीसाठी सक्रिय सिम असलेला नोंदणीकृत मोबाईल"
      ],
      "hi": [
        "बायोमेट्रिक स्कैन के लिए मूल आधार कार्ड",
        "पैन कार्ड नंबर / मूल पैन कार्ड",
        "ओटीपी के लिए सक्रिय सिम वाला पंजीकृत मोबाइल"
      ]
    },
    "eligibility": {
      "en": "Paytm Users",
      "mr": "Paytm वापरकर्ते",
      "hi": "Paytm उपयोगकर्ता"
    },
    "documentCount": 3
  },
  {
    "id": 502,
    "category": "Financial",
    "isNew": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=600",
    "icon": "fa-file-invoice",
    "title": {
      "en": "ITR Filing",
      "mr": "ITR भरणे",
      "hi": "ITR फाइलिंग"
    },
    "desc": {
      "en": "Income Tax Return filing for individuals/businesses.",
      "mr": "व्यक्ती/व्यवसायांसाठी आयकर रिटर्न भरणे.",
      "hi": "व्यक्तियों/व्यवसायों के लिए आयकर रिटर्न भरना।"
    },
    "docs": {
      "en": [
        "PAN Card of Taxpayer",
        "Aadhaar Card (Linked with PAN)",
        "Form 16 / Salary Certificates / TDS Certificates (Form 26AS & AIS)",
        "Bank Statements of all active savings/current accounts for FY"
      ],
      "mr": [
        "करदात्याचे पॅन कार्ड",
        "आधार कार्ड (पॅनशी लिंक असलेले)",
        "फॉर्म १६ / पगार प्रमाणपत्र / टीडीएस प्रमाणपत्र (26AS व AIS)",
        "आर्थिक वर्षातील सर्व बँक खात्यांचे स्टेटमेंट"
      ],
      "hi": [
        "करदाता का पैन कार्ड",
        "आधार कार्ड (पैन से लिंक)",
        "फॉर्म 16 / वेतन प्रमाण पत्र / टीडीएस प्रमाण पत्र (26AS और AIS)",
        "वित्तीय वर्ष के लिए सभी सक्रिय बैंक खातों का विवरण"
      ]
    },
    "eligibility": {
      "en": "Taxpayers",
      "mr": "करदाते",
      "hi": "करदाता"
    },
    "documentCount": 4
  },
  {
    "id": 503,
    "category": "Financial",
    "isNew": false,
    "isTrending": false,
    "image": "images/DSC.png",
    "icon": "fa-key",
    "title": {
      "en": "Digital Signature (DSC)",
      "mr": "डिजिटल स्वाक्षरी",
      "hi": "डिजिटल हस्ताक्षर"
    },
    "desc": {
      "en": "Class 3 DSC for tenders, GST, and ITR.",
      "mr": "निविदा, GST आणि ITR साठी क्लास ३ DSC.",
      "hi": "निविदा, जीएसटी और आईटीआर के लिए क्लास 3 डीएससी।"
    },
    "docs": {
      "en": [
        "Applicant PAN Card (Clear Color Scan)",
        "Aadhaar Card (Mobile OTP-verified)",
        "Passport Size Color Photograph",
        "Video Verification with Original PAN & Aadhaar"
      ],
      "mr": [
        "अर्जदाराचे पॅन कार्ड (रंगीत स्कॅन प्रत)",
        "आधार कार्ड (मोबाईल ओटीपी पडताळणी)",
        "पासपोर्ट आकाराचा रंगीत फोटो",
        "मूळ पॅन व आधारसह व्हिडिओ पडताळणी"
      ],
      "hi": [
        "आवेदक का पैन कार्ड (स्पष्ट रंगीन स्कैन)",
        "आधार कार्ड (मोबाइल ओटीपी-सत्यापित)",
        "पासपोर्ट साइज रंगीन फोटो",
        "मूल पैन और आधार के साथ वीडियो सत्यापन"
      ]
    },
    "eligibility": {
      "en": "Individuals/Organizations",
      "mr": "व्यक्ती/संस्था",
      "hi": "व्यक्ति/संगठन"
    },
    "documentCount": 4
  },
  {
    "id": 504,
    "category": "Financial",
    "isNew": false,
    "isTrending": false,
    "image": "images/jeevan.jpg",
    "icon": "fa-heartbeat",
    "title": {
      "en": "Jeevan Praman",
      "mr": "जीवन प्रमाण",
      "hi": "जीवन प्रमाण"
    },
    "desc": {
      "en": "Digital Life Certificate for Pensioners.",
      "mr": "पेन्शनधारकांसाठी डिजिटल जीवन प्रमाणपत्र.",
      "hi": "पेंशनभोगियों के लिए डिजिटल जीवन प्रमाण पत्र।"
    },
    "docs": {
      "en": [
        "Pensioner Aadhaar Card",
        "PPO Number (Pension Payment Order)",
        "Pension Disbursing Bank Account Passbook & Branch Details",
        "Biometric Fingerprint / Iris / Face Authentication"
      ],
      "mr": [
        "पेन्शनधारकाचे आधार कार्ड",
        "पीपीओ (PPO) क्रमांक - पेन्शन आदेश",
        "पेन्शन जमा होणाऱ्या बँकेचे पासबुक व शाखा तपशील",
        "बायोमेट्रिक बोटांचे ठसे / फेस ऑथेंटिकेशन"
      ],
      "hi": [
        "पेंशनभोगी का आधार कार्ड",
        "पीपीओ नंबर (पेंशन भुगतान आदेश)",
        "पेंशन संवितरण बैंक पासबुक और शाखा विवरण",
        "बायोमेट्रिक फिंगरप्रिंट / फेस प्रमाणीकरण"
      ]
    },
    "eligibility": {
      "en": "Pensioners",
      "mr": "पेन्शनधारक",
      "hi": "पेंशनभोगी"
    },
    "documentCount": 4
  },
  {
    "id": 601,
    "category": "Online Forms",
    "isNew": true,
    "isTrending": true,
    "image": "images/mahadbt.jpg",
    "icon": "fa-university",
    "title": {
      "en": "Scholarship Forms",
      "mr": "शिष्यवृत्ती अर्ज",
      "hi": "छात्रवृत्ति फॉर्म"
    },
    "desc": {
      "en": "MahaDBT and National Scholarship Portal applications.",
      "mr": "महाडीबीटी आणि नॅशनल स्कॉलरशिप पोर्टल अर्ज.",
      "hi": "महाडीबीटी और राष्ट्रीय छात्रवृत्ति पोर्टल आवेदन।"
    },
    "docs": {
      "en": [
        "Aadhaar Card linked with Bank Account & NPCI DBT",
        "Maharashtra Domicile Certificate",
        "Caste Certificate & Caste Validity Certificate",
        "Current Year Tehsildar Income Certificate",
        "College Allotment Letter, Fee Receipt & Previous Marksheets"
      ],
      "mr": [
        "बँक आणि NPCI DBT लिंक असलेले आधार कार्ड",
        "महाराष्ट्र रहिवासी दाखला (Domicile Certificate)",
        "जात प्रमाणपत्र आणि जात वैधता प्रमाणपत्र (Caste Validity)",
        "चालू शैक्षणिक वर्षाचा तहसीलदार उत्पन्न दाखला",
        "कॉलेज प्रवेश पावती, फी पावती आणि मागील वर्षांच्या गुणपत्रिका"
      ],
      "hi": [
        "बैंक और एनपीसीआई डीबीटी से लिंक आधार कार्ड",
        "महाराष्ट्र निवास प्रमाण पत्र (डोमिसाइल)",
        "जाति प्रमाण पत्र और जाति वैधता प्रमाण पत्र",
        "वर्तमान वर्ष का तहसीलदार आय प्रमाण पत्र",
        "कॉलेज आवंटन पत्र, शुल्क रसीद और पिछली मार्कशीट"
      ]
    },
    "eligibility": {
      "en": "Students",
      "mr": "विद्यार्थी",
      "hi": "छात्र"
    },
    "documentCount": 5
  },
  {
    "id": 602,
    "category": "Online Forms",
    "isNew": false,
    "isTrending": false,
    "image": "images/exams.jpeg",
    "icon": "fa-book-reader",
    "title": {
      "en": "Exam Forms",
      "mr": "परीक्षा अर्ज",
      "hi": "परीक्षा फॉर्म"
    },
    "desc": {
      "en": "MPSC, UPSC, SSC, Banking exam online forms.",
      "mr": "MPSC, UPSC, SSC, बँकिंग परीक्षांचे ऑनलाइन अर्ज.",
      "hi": "MPSC, UPSC, SSC, बैंकिंग परीक्षा ऑनलाइन फॉर्म।"
    },
    "docs": {
      "en": [
        "Applicant Aadhaar Card",
        "Educational Marksheets (10th, 12th, Graduation as applicable)",
        "Category / Caste / EWS / Non-Creamy Layer Certificate",
        "Recent Passport Photograph and Scanned Signature (under 1 MB)"
      ],
      "mr": [
        "अर्जदाराचे आधार कार्ड",
        "शैक्षणिक गुणपत्रिका (१० वी, १२ वी, पदवी लागू असल्यास)",
        "प्रवर्ग / जात / ईडब्ल्यूएस / नॉन-क्रिमीलेअर दाखला",
        "नवीन पासपोर्ट आकाराचा फोटो आणि स्वाक्षरी स्कॅन प्रत (१ एमबी आत)"
      ],
      "hi": [
        "आवेदक का आधार कार्ड",
        "शैक्षणिक मार्कशीट (10वीं, 12वीं, स्नातक लागू होने पर)",
        "श्रेणी / जाति / ईडब्ल्यूएस / नॉन-क्रीमी लेयर प्रमाण पत्र",
        "हालिया पासपोर्ट फोटो और स्कैन किए गए हस्ताक्षर (1 एमबी के अंदर)"
      ]
    },
    "eligibility": {
      "en": "Candidates",
      "mr": "उमेदवार",
      "hi": "उम्मीदवार"
    },
    "documentCount": 4
  },
  {
    "id": 603,
    "category": "Online Forms",
    "isNew": false,
    "isTrending": false,
    "image": "images/admission.jpg",
    "icon": "fa-graduation-cap",
    "title": {
      "en": "Admission Forms",
      "mr": "प्रवेश अर्ज",
      "hi": "प्रवेश फॉर्म"
    },
    "desc": {
      "en": "FYJC (11th), RTE, and College admission forms.",
      "mr": "अकरावी, आरटीई आणि कॉलेज प्रवेश अर्ज.",
      "hi": "11वीं, आरटीई और कॉलेज प्रवेश फॉर्म।"
    },
    "docs": {
      "en": [
        "10th / 12th Passing Certificates and Marksheets",
        "School Leaving Certificate (TC) from Previous Institution",
        "Aadhaar Card & Domicile Certificate of Maharashtra",
        "Recent Passport Size Color Photographs & Caste Certificate (if applicable)"
      ],
      "mr": [
        "१० वी / १२ वी उत्तीर्ण गुणपत्रिका व बोर्ड प्रमाणपत्र",
        "मागील शाळेचा / महाविद्यालयाचा मूळ शाळा सोडल्याचा दाखला (TC)",
        "आधार कार्ड आणि महाराष्ट्राचा रहिवासी दाखला (Domicile)",
        "नवीन पासपोर्ट आकाराचे रंगीत फोटो व जात दाखला (लागू असल्यास)"
      ],
      "hi": [
        "10वीं / 12वीं उत्तीर्ण प्रमाण पत्र और मार्कशीट",
        "पिछले संस्थान से स्कूल लीविंग सर्टिफिकेट (टीसी)",
        "आधार कार्ड और महाराष्ट्र का डोमिसाइल प्रमाण पत्र",
        "हालिया पासपोर्ट साइज फोटो और जाति प्रमाण पत्र (यदि लागू हो)"
      ]
    },
    "eligibility": {
      "en": "Students",
      "mr": "विद्यार्थी",
      "hi": "छात्र"
    },
    "documentCount": 4
  },
  {
    "id": 505,
    "category": "Financial",
    "isNew": true,
    "isTrending": true,
    "image": "images/income.png",
    "icon": "fa-hand-holding-heart",
    "title": {
      "en": "Mukhyamantri Majhi Ladki Bahin Yojana",
      "mr": "मुख्यमंत्री माझी लाडकी बहीण योजना",
      "hi": "मुख्यमंत्री माझी लाडकी बहिन योजना"
    },
    "desc": {
      "en": "Monthly financial assistance of ₹1,500 for eligible women residents of Maharashtra.",
      "mr": "पात्र महिलांसाठी दरमहा ₹१,५०० थेट बँक खात्यात आर्थिक सहाय्य योजना.",
      "hi": "महाराष्ट्र की पात्र महिलाओं के लिए ₹1,500 प्रतिमाह प्रत्यक्ष लाभ अंतरण योजना।"
    },
    "documentCount": 4,
    "docs": {
      "en": [
        "Aadhaar Card of Woman Beneficiary",
        "Bank Account Passbook (Aadhaar & NPCI DBT linked)",
        "Maharashtra Domicile Certificate / Orange/Yellow Ration Card",
        "Signed Hamipatra (Self-Declaration Form)"
      ],
      "mr": [
        "महिला लाभार्थीचे आधार कार्ड",
        "बँक पासबुक (आधार आणि NPCI DBT लिंक असलेले)",
        "महाराष्ट्र अधिवास दाखला (Domicile) / पिवळे किंवा केशरी रेशन कार्ड",
        "स्वाक्षरी केलेले हमीपत्र (स्वयंघोषणा पत्र)"
      ],
      "hi": [
        "महिला लाभार्थी का आधार कार्ड",
        "बैंक खाता पासबुक (आधार और एनपीसीआई डीबीटी लिंक)",
        "महाराष्ट्र डोमिसाइल प्रमाण पत्र / नारंगी/पीला राशन कार्ड",
        "हस्ताक्षरित हमीपत्र (स्व-घोषणा प्रपत्र)"
      ]
    },
    "eligibility": {
      "en": "Women aged 21-65 years residing in Maharashtra with annual family income up to ₹2.5 Lakhs",
      "mr": "महाराष्ट्रात राहणाऱ्या २१ ते ६५ वयोगटातील महिला ज्यांचे कौटुंबिक उत्पन्न ₹२.५ लाखांपर्यंत आहे",
      "hi": "महाराष्ट्र की 21-65 वर्ष की महिलाएं जिनकी पारिवारिक आय ₹2.5 लाख तक है"
    }
  },
  {
    "id": 207,
    "category": "Certificates",
    "isNew": false,
    "isTrending": true,
    "image": "images/income.png",
    "icon": "fa-certificate",
    "title": {
      "en": "Caste Certificate & Validity",
      "mr": "जात प्रमाणपत्र आणि जात पडताळणी",
      "hi": "जाति प्रमाण पत्र और जाति वैधता"
    },
    "desc": {
      "en": "Official caste certificate and scrutiny committee caste validity for education, job and reservations.",
      "mr": "शिक्षण, नोकरी आणि आरक्षणासाठी अधिकृत जात प्रमाणपत्र व जात पडताळणी वैधता.",
      "hi": "शिक्षा, सरकारी नौकरी और आरक्षण के लिए जाति प्रमाण पत्र और वैधता स्क्रूटनी।"
    },
    "documentCount": 5,
    "docs": {
      "en": [
        "Applicant & Father School Leaving Certificate (TC)",
        "Pre-1967 Family Roots / Revenue Proof of Maharashtra",
        "Ration Card & Aadhaar Card of Applicant",
        "Affidavit in Form 3 / Form 1",
        "Blood Relative Caste Certificate / Validity (if available)"
      ],
      "mr": [
        "अर्जदार आणि वडिलांचा शाळा सोडल्याचा दाखला (TC)",
        "१९६७ पूर्वीचा महाराष्ट्रातील वास्तव्याचा महसूल पुरावा",
        "अर्जदाराचे रेशन कार्ड आणि आधार कार्ड",
        "फॉर्म ३ / १ मधील अधिकृत शपथपत्र",
        "रक्तनात्यातील चुलते / वडिलांचे जात प्रमाणपत्र किंवा वैधता (असल्यास)"
      ],
      "hi": [
        "आवेदक और पिता का स्कूल लीविंग सर्टिफिकेट (टीसी)",
        "1967 से पूर्व का महाराष्ट्र में निवास / राजस्व प्रमाण",
        "आवेदक का राशन कार्ड और आधार कार्ड",
        "प्रारूप 3 / 1 में अधिकृत शपथ पत्र",
        "रक्त संबंधी का जाति प्रमाण पत्र / वैधता (यदि उपलब्ध हो)"
      ]
    },
    "eligibility": {
      "en": "Residents belonging to SC, ST, VJNT, OBC, SBC categories with documentary proof",
      "mr": "एससी, एसटी, विमुक्त जाती/भटक्या जमाती, ओबीसी, एसबीसी संवर्गातील अधिकृत पुरावे असलेले नागरिक",
      "hi": "अनुसूचित जाति, जनजाति, ओबीसी और एसबीसी वर्ग के पात्र नागरिक"
    }
  }
];

/* BLOG DATA */
  export const blogData = [
            {
                id: 1,
                category: "Identity",
                date: "Dec 10, 2025",
                title: "New Aadhaar Update Guidelines",
                desc: "Government has released new norms for biometric updates. Mandatory updates are required at age 5 and 15 to ensure data accuracy.",
                image: "images/adhar.jpg",
                icon: "fa-fingerprint",
                color: "blue"
            },
            {
                id: 2,
                category: "Finance",
                date: "Dec 05, 2025",
                title: "Income Certificate Validity",
                desc: "Understanding the validity period of income certificates is crucial for scholarship applications. Certificates are typically valid for one financial year.",
                image: "images/income.png",
                icon: "fa-file-invoice-dollar",
                color: "green"
            },
            {
                id: 3,
                category: "Business",
                date: "Nov 28, 2025",
                title: "Shop Act Renewal Process",
                desc: "Shop Act licenses now have an easier online renewal process. Keep your business compliant by renewing before the expiry date to avoid fines.",
                image: "images/gumsta.jpg",
                icon: "fa-store",
                color: "purple"
            },
            {
                id: 4,
                category: "Travel",
                date: "Nov 15, 2025",
                title: "Simplified Passport Verification",
                desc: "The police verification process for new passports has been streamlined with the new DigiLocker integration, reducing wait times significantly.",
                image: "images/police.png",
                icon: "fa-passport",
                color: "orange"
            },
            {
                id: 5,
                category: "MSME",
                date: "Nov 10, 2025",
                title: "Udyam Registration Benefits",
                desc: "Registered MSMEs can avail collateral-free loans and subsidies. Learn how to register your small business on the Udyam portal for free.",
                image: "images/udyam.jpg",
                icon: "fa-industry",
                color: "teal"
            }
];

/* GALLERY DATA */
export const galleryData = [
            {
                type: "image",
                src: "images/aryaimage2.jpg",
                title: "Efficient Document Processing",
                desc: "Our operators handling complex form fillings with precision."
            },
            {
                type: "video",
                src: "images/adhar.jpg", 
                title: "How to Apply for Aadhaar",
                desc: "A quick walkthrough of the biometric update process at our center.",
                videoUrl: "#" // In real app, this would be a youtube link
            },
            {
                type: "image",
                src: "images/aryavid1.png",
                title: "Customer Waiting Area",
                desc: "Comfortable seating and token system for hassle-free service."
            },
            {
                type: "image",
                src: "images/aryaimage1.jpg",
                title: "Digital Services Desk",
                desc: "Dedicated counters for PAN, Passport, and Banking services."
            },
            {
                type: "video",
                src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600",
                title: "Shop Act License Guide",
                desc: "Explaining the documents required for a new Gumasta license.",
                videoUrl: "#https://youtu.be/QzavggpxWOs?si=qOMwjz_FmlYFC3fm"
            },
            {
                type: "image",
                src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600",
                title: "Biometric Devices",
                desc: "State-of-the-art scanners for Aadhaar and Jeevan Praman services."
            }
]
