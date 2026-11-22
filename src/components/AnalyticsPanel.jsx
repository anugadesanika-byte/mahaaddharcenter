// src/components/AnalyticsPanel.jsx
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Comprehensive, realistic datasets for all 4 timeframe selections
const TIMEFRAME_DATASETS = {
  '7d': {
    label: 'Last 7 Days',
    chartTitle: 'Daily Application Inflow & Delivery (Past 7 Days)',
    chartSubtitle: 'Daily citizen submissions compared with same-day certified completions',
    growthBadge: '+14.2% this week',
    overview: {
      totalRequests: 38,
      pendingRequests: 3,
      inProgressRequests: 6,
      fulfilledRequests: 28,
      rejectedRequests: 1,
      fulfillmentRate: 74,
      totalRevenue: 14250,
      pendingRevenue: 2800,
      avgTurnaroundDays: 1.4,
      sameDayDeliveryRate: 64,
      totalCustomers: 26
    },
    trends: [
      { month: '15 Nov', submitted: 5, fulfilled: 4, revenue: 1800 },
      { month: '16 Nov', submitted: 6, fulfilled: 5, revenue: 2100 },
      { month: '17 Nov', submitted: 4, fulfilled: 3, revenue: 1400 },
      { month: '18 Nov', submitted: 7, fulfilled: 6, revenue: 2600 },
      { month: '19 Nov', submitted: 5, fulfilled: 4, revenue: 1950 },
      { month: '20 Nov', submitted: 8, fulfilled: 5, revenue: 2800 },
      { month: '21 Nov', submitted: 3, fulfilled: 2, revenue: 1600 }
    ],
    weeklyVolume: [
      { day: 'Mon', submitted: 6, completed: 5 },
      { day: 'Tue', submitted: 7, completed: 6 },
      { day: 'Wed', submitted: 5, completed: 4 },
      { day: 'Thu', submitted: 6, completed: 5 },
      { day: 'Fri', submitted: 8, completed: 7 },
      { day: 'Sat', submitted: 9, completed: 7 },
      { day: 'Sun', submitted: 3, completed: 2 }
    ],
    statusDistribution: [
      { label: 'Fulfilled', key: 'fulfilled', count: 28, color: '#10b981', textColor: 'text-emerald-600', bgLight: 'bg-emerald-50', percentage: 74 },
      { label: 'In-Progress', key: 'in_progress', count: 6, color: '#3b82f6', textColor: 'text-blue-600', bgLight: 'bg-blue-50', percentage: 16 },
      { label: 'Pending Review', key: 'pending', count: 3, color: '#f59e0b', textColor: 'text-amber-600', bgLight: 'bg-amber-50', percentage: 8 },
      { label: 'Rejected', key: 'rejected', count: 1, color: '#ef4444', textColor: 'text-rose-600', bgLight: 'bg-rose-50', percentage: 2 }
    ],
    categoryAnalytics: [
      { category: 'Identity & Cards', count: 12, revenue: 4200, avgTat: '1.1 days', rate: 96, color: '#ff9933' },
      { category: 'Certificates & Revenue', count: 14, revenue: 5800, avgTat: '2.4 days', rate: 90, color: '#000080' },
      { category: 'Business & Registrations', count: 5, revenue: 2600, avgTat: '1.2 days', rate: 94, color: '#138808' },
      { category: 'Police & Legal Affidavits', count: 4, revenue: 1100, avgTat: '1.5 days', rate: 88, color: '#8b5cf6' },
      { category: 'Government Welfare Schemes', count: 3, revenue: 550, avgTat: '1.8 days', rate: 98, color: '#06b6d4' }
    ],
    pipelineFunnel: [
      { step: '1. Online Application Submitted', count: 38, percentage: 100, note: 'Citizens uploaded docs on portal (past 7 days)' },
      { step: '2. Operator Document Verification', count: 35, percentage: 92, note: 'Passed identity and mandatory checklist' },
      { step: '3. Tahsildar / Central Govt Desk', count: 31, percentage: 82, note: 'Aaple Sarkar / UIDAI registration filed' },
      { step: '4. Certificate Approved & Signed', count: 28, percentage: 74, note: 'Delivered digitally / collected at Akurdi' }
    ],
    topServices: [
      { name: 'Aadhaar Card Biometric Update', count: 11, revenue: 1100, tatDays: 1.0 },
      { name: 'Income Certificate (3 Years)', count: 9, revenue: 1800, tatDays: 2.2 },
      { name: 'Domicile & Age Nationality', count: 7, revenue: 1750, tatDays: 2.8 },
      { name: 'Shop Act (Gumasta) License', count: 5, revenue: 2500, tatDays: 0.9 },
      { name: 'Ladki Bahin Yojana e-KYC', count: 4, revenue: 200, tatDays: 0.4 },
      { name: 'Caste Certificate & Verification', count: 3, revenue: 900, tatDays: 4.0 },
      { name: 'Police Clearance Certificate (PCC)', count: 2, revenue: 600, tatDays: 1.8 }
    ],
    regionalDemand: [
      { area: 'Akurdi Railway Station & Village', count: 16, percentage: 42 },
      { area: 'Nigdi Pradhikaran & Yamunanagar', count: 9, percentage: 24 },
      { area: 'Chinchwad Station & Thergaon', count: 6, percentage: 16 },
      { area: 'Ravet & Kiwale Sub-urbs', count: 4, percentage: 11 },
      { area: 'Bhosari & Moshi Link Road', count: 3, percentage: 7 }
    ],
    channelSplit: {
      digitalPortal: 71,
      centerWalkIn: 29,
      onlinePaymentPct: 78,
      cashPaymentPct: 22
    }
  },

  '30d': {
    label: 'Last 30 Days',
    chartTitle: 'Weekly Trajectory & Volume (Past 30 Days / 4 Weeks)',
    chartSubtitle: 'Weekly pace of citizen submissions and verified certificates issued',
    growthBadge: '+21.5% this month',
    overview: {
      totalRequests: 148,
      pendingRequests: 9,
      inProgressRequests: 22,
      fulfilledRequests: 113,
      rejectedRequests: 4,
      fulfillmentRate: 76,
      totalRevenue: 58400,
      pendingRevenue: 11200,
      avgTurnaroundDays: 1.8,
      sameDayDeliveryRate: 56,
      totalCustomers: 48
    },
    trends: [
      { month: 'Week 1', submitted: 32, fulfilled: 26, revenue: 12600 },
      { month: 'Week 2', submitted: 38, fulfilled: 31, revenue: 15400 },
      { month: 'Week 3', submitted: 42, fulfilled: 34, revenue: 17200 },
      { month: 'Week 4', submitted: 36, fulfilled: 22, revenue: 13200 }
    ],
    weeklyVolume: [
      { day: 'Mon', submitted: 24, completed: 21 },
      { day: 'Tue', submitted: 28, completed: 25 },
      { day: 'Wed', submitted: 32, completed: 29 },
      { day: 'Thu', submitted: 26, completed: 24 },
      { day: 'Fri', submitted: 35, completed: 31 },
      { day: 'Sat', submitted: 38, completed: 33 },
      { day: 'Sun', submitted: 14, completed: 12 }
    ],
    statusDistribution: [
      { label: 'Fulfilled', key: 'fulfilled', count: 113, color: '#10b981', textColor: 'text-emerald-600', bgLight: 'bg-emerald-50', percentage: 76 },
      { label: 'In-Progress', key: 'in_progress', count: 22, color: '#3b82f6', textColor: 'text-blue-600', bgLight: 'bg-blue-50', percentage: 15 },
      { label: 'Pending Review', key: 'pending', count: 9, color: '#f59e0b', textColor: 'text-amber-600', bgLight: 'bg-amber-50', percentage: 6 },
      { label: 'Rejected', key: 'rejected', count: 4, color: '#ef4444', textColor: 'text-rose-600', bgLight: 'bg-rose-50', percentage: 3 }
    ],
    categoryAnalytics: [
      { category: 'Identity & Cards', count: 44, revenue: 16800, avgTat: '1.3 days', rate: 95, color: '#ff9933' },
      { category: 'Certificates & Revenue', count: 52, revenue: 24200, avgTat: '2.8 days', rate: 89, color: '#000080' },
      { category: 'Business & Registrations', count: 24, revenue: 15600, avgTat: '1.5 days', rate: 93, color: '#138808' },
      { category: 'Police & Legal Affidavits', count: 16, revenue: 7400, avgTat: '1.8 days', rate: 87, color: '#8b5cf6' },
      { category: 'Government Welfare Schemes', count: 12, revenue: 2400, avgTat: '2.0 days', rate: 97, color: '#06b6d4' }
    ],
    pipelineFunnel: [
      { step: '1. Online Application Submitted', count: 148, percentage: 100, note: 'Citizens uploaded docs on portal (past 30 days)' },
      { step: '2. Operator Document Verification', count: 138, percentage: 93, note: 'Passed identity and mandatory checklist' },
      { step: '3. Tahsildar / Central Govt Desk', count: 124, percentage: 84, note: 'Application filed on Aaple Sarkar / UIDAI' },
      { step: '4. Certificate Approved & Signed', count: 113, percentage: 76, note: 'Digital signature applied / ready for download' }
    ],
    topServices: [
      { name: 'Aadhaar Card Biometric Update', count: 34, revenue: 3400, tatDays: 1.1 },
      { name: 'Income Certificate (3 Years)', count: 28, revenue: 5600, tatDays: 2.6 },
      { name: 'Domicile & Age Nationality', count: 23, revenue: 5750, tatDays: 3.4 },
      { name: 'Shop Act (Gumasta) License', count: 18, revenue: 9000, tatDays: 1.0 },
      { name: 'Caste Certificate & Verification', count: 15, revenue: 4500, tatDays: 4.8 },
      { name: 'Ladki Bahin Yojana e-KYC', count: 14, revenue: 700, tatDays: 0.5 },
      { name: 'Police Clearance Certificate (PCC)', count: 11, revenue: 3300, tatDays: 2.1 }
    ],
    regionalDemand: [
      { area: 'Akurdi Railway Station & Village', count: 56, percentage: 38 },
      { area: 'Nigdi Pradhikaran & Yamunanagar', count: 35, percentage: 24 },
      { area: 'Chinchwad Station & Thergaon', count: 28, percentage: 19 },
      { area: 'Ravet & Kiwale Sub-urbs', count: 18, percentage: 12 },
      { area: 'Bhosari & Moshi Link Road', count: 11, percentage: 7 }
    ],
    channelSplit: {
      digitalPortal: 69,
      centerWalkIn: 31,
      onlinePaymentPct: 76,
      cashPaymentPct: 24
    }
  },

  '6m': {
    label: 'Last 6 Months',
    chartTitle: 'Monthly Application Volume & Delivery Trajectory',
    chartSubtitle: 'Six-month overview of citizen submissions compared with government certified completions',
    growthBadge: '+162% H2 Trajectory',
    overview: {
      totalRequests: 503,
      pendingRequests: 12,
      inProgressRequests: 28,
      fulfilledRequests: 449,
      rejectedRequests: 14,
      fulfillmentRate: 89,
      totalRevenue: 202100,
      pendingRevenue: 24800,
      avgTurnaroundDays: 2.2,
      sameDayDeliveryRate: 48,
      totalCustomers: 84
    },
    trends: [
      { month: 'Jun', submitted: 48, fulfilled: 44, revenue: 16800 },
      { month: 'Jul', submitted: 62, fulfilled: 58, revenue: 23400 },
      { month: 'Aug', submitted: 74, fulfilled: 68, revenue: 29500 },
      { month: 'Sep', submitted: 89, fulfilled: 81, revenue: 36200 },
      { month: 'Oct', submitted: 104, fulfilled: 95, revenue: 43800 },
      { month: 'Nov', submitted: 126, fulfilled: 108, revenue: 52400 }
    ],
    weeklyVolume: [
      { day: 'Mon', submitted: 82, completed: 74 },
      { day: 'Tue', submitted: 94, completed: 86 },
      { day: 'Wed', submitted: 108, completed: 98 },
      { day: 'Thu', submitted: 88, completed: 82 },
      { day: 'Fri', submitted: 116, completed: 104 },
      { day: 'Sat', submitted: 128, completed: 112 },
      { day: 'Sun', submitted: 46, completed: 41 }
    ],
    statusDistribution: [
      { label: 'Fulfilled', key: 'fulfilled', count: 449, color: '#10b981', textColor: 'text-emerald-600', bgLight: 'bg-emerald-50', percentage: 89 },
      { label: 'In-Progress', key: 'in_progress', count: 28, color: '#3b82f6', textColor: 'text-blue-600', bgLight: 'bg-blue-50', percentage: 6 },
      { label: 'Pending Review', key: 'pending', count: 12, color: '#f59e0b', textColor: 'text-amber-600', bgLight: 'bg-amber-50', percentage: 2 },
      { label: 'Rejected', key: 'rejected', count: 14, color: '#ef4444', textColor: 'text-rose-600', bgLight: 'bg-rose-50', percentage: 3 }
    ],
    categoryAnalytics: [
      { category: 'Identity & Cards', count: 142, revenue: 54600, avgTat: '1.4 days', rate: 94, color: '#ff9933' },
      { category: 'Certificates & Revenue', count: 178, revenue: 82400, avgTat: '3.2 days', rate: 88, color: '#000080' },
      { category: 'Business & Registrations', count: 86, revenue: 48500, avgTat: '1.8 days', rate: 92, color: '#138808' },
      { category: 'Police & Legal Affidavits', count: 54, revenue: 24200, avgTat: '2.0 days', rate: 86, color: '#8b5cf6' },
      { category: 'Government Welfare Schemes', count: 43, revenue: 12400, avgTat: '2.5 days', rate: 96, color: '#06b6d4' }
    ],
    pipelineFunnel: [
      { step: '1. Online Application Submitted', count: 503, percentage: 100, note: 'Citizens uploaded docs on portal (past 6 months)' },
      { step: '2. Operator Document Verification', count: 472, percentage: 94, note: 'Passed identity and mandatory checklist' },
      { step: '3. Tahsildar / Central Govt Desk', count: 458, percentage: 91, note: 'Application filed on Aaple Sarkar / UIDAI' },
      { step: '4. Certificate Approved & Signed', count: 449, percentage: 89, note: 'Digital signature applied / ready for download' }
    ],
    topServices: [
      { name: 'Aadhaar Card Biometric Update', count: 118, revenue: 11800, tatDays: 1.2 },
      { name: 'Income Certificate (3 Years)', count: 96, revenue: 19200, tatDays: 3.0 },
      { name: 'Domicile & Age Nationality', count: 82, revenue: 20500, tatDays: 4.2 },
      { name: 'Shop Act (Gumasta) License', count: 68, revenue: 34000, tatDays: 1.0 },
      { name: 'Caste Certificate & Verification', count: 54, revenue: 16200, tatDays: 5.5 },
      { name: 'Ladki Bahin Yojana e-KYC', count: 48, revenue: 2400, tatDays: 0.5 },
      { name: 'Police Clearance Certificate (PCC)', count: 37, revenue: 11100, tatDays: 2.5 }
    ],
    regionalDemand: [
      { area: 'Akurdi Railway Station & Village', count: 184, percentage: 37 },
      { area: 'Nigdi Pradhikaran & Yamunanagar', count: 126, percentage: 25 },
      { area: 'Chinchwad Station & Thergaon', count: 92, percentage: 18 },
      { area: 'Ravet & Kiwale Sub-urbs', count: 62, percentage: 12 },
      { area: 'Bhosari & Moshi Link Road', count: 39, percentage: 8 }
    ],
    channelSplit: {
      digitalPortal: 68,
      centerWalkIn: 32,
      onlinePaymentPct: 74,
      cashPaymentPct: 26
    }
  },

  '1y': {
    label: 'Fiscal Year 2024-25',
    chartTitle: 'Fiscal Year 2024–25 Quarterly Trajectory (Q1 – Q4)',
    chartSubtitle: 'Annual cumulative progress across all 4 fiscal quarters',
    growthBadge: '+284% Annual Surge',
    overview: {
      totalRequests: 1180,
      pendingRequests: 18,
      inProgressRequests: 42,
      fulfilledRequests: 1092,
      rejectedRequests: 28,
      fulfillmentRate: 92,
      totalRevenue: 482600,
      pendingRevenue: 38400,
      avgTurnaroundDays: 2.1,
      sameDayDeliveryRate: 52,
      totalCustomers: 194
    },
    trends: [
      { month: 'Q1 (Apr-Jun)', submitted: 210, fulfilled: 194, revenue: 84500 },
      { month: 'Q2 (Jul-Sep)', submitted: 340, fulfilled: 312, revenue: 138200 },
      { month: 'Q3 (Oct-Dec)', submitted: 410, fulfilled: 374, revenue: 168900 },
      { month: 'Q4 (Jan-Mar Est.)', submitted: 220, fulfilled: 212, revenue: 91000 }
    ],
    weeklyVolume: [
      { day: 'Mon', submitted: 184, completed: 172 },
      { day: 'Tue', submitted: 210, completed: 196 },
      { day: 'Wed', submitted: 236, completed: 218 },
      { day: 'Thu', submitted: 198, completed: 184 },
      { day: 'Fri', submitted: 248, completed: 231 },
      { day: 'Sat', submitted: 282, completed: 262 },
      { day: 'Sun', submitted: 106, completed: 97 }
    ],
    statusDistribution: [
      { label: 'Fulfilled', key: 'fulfilled', count: 1092, color: '#10b981', textColor: 'text-emerald-600', bgLight: 'bg-emerald-50', percentage: 92 },
      { label: 'In-Progress', key: 'in_progress', count: 42, color: '#3b82f6', textColor: 'text-blue-600', bgLight: 'bg-blue-50', percentage: 4 },
      { label: 'Pending Review', key: 'pending', count: 18, color: '#f59e0b', textColor: 'text-amber-600', bgLight: 'bg-amber-50', percentage: 2 },
      { label: 'Rejected', key: 'rejected', count: 28, color: '#ef4444', textColor: 'text-rose-600', bgLight: 'bg-rose-50', percentage: 2 }
    ],
    categoryAnalytics: [
      { category: 'Identity & Cards', count: 320, revenue: 128000, avgTat: '1.3 days', rate: 95, color: '#ff9933' },
      { category: 'Certificates & Revenue', count: 410, revenue: 196000, avgTat: '3.0 days', rate: 91, color: '#000080' },
      { category: 'Business & Registrations', count: 215, revenue: 112000, avgTat: '1.6 days', rate: 94, color: '#138808' },
      { category: 'Police & Legal Affidavits', count: 135, revenue: 58000, avgTat: '1.9 days', rate: 89, color: '#8b5cf6' },
      { category: 'Government Welfare Schemes', count: 100, revenue: 28600, avgTat: '2.2 days', rate: 97, color: '#06b6d4' }
    ],
    pipelineFunnel: [
      { step: '1. Online Application Submitted', count: 1180, percentage: 100, note: 'Citizens uploaded docs on portal (FY 2024-25)' },
      { step: '2. Operator Document Verification', count: 1128, percentage: 96, note: 'Passed identity and mandatory checklist' },
      { step: '3. Tahsildar / Central Govt Desk', count: 1104, percentage: 94, note: 'Application filed on Aaple Sarkar / UIDAI' },
      { step: '4. Certificate Approved & Signed', count: 1092, percentage: 92, note: 'Digital signature applied / ready for download' }
    ],
    topServices: [
      { name: 'Aadhaar Card Biometric Update', count: 284, revenue: 28400, tatDays: 1.1 },
      { name: 'Income Certificate (3 Years)', count: 236, revenue: 47200, tatDays: 2.8 },
      { name: 'Domicile & Age Nationality', count: 198, revenue: 49500, tatDays: 3.9 },
      { name: 'Shop Act (Gumasta) License', count: 162, revenue: 81000, tatDays: 1.0 },
      { name: 'Caste Certificate & Verification', count: 134, revenue: 40200, tatDays: 5.2 },
      { name: 'Ladki Bahin Yojana e-KYC', count: 112, revenue: 5600, tatDays: 0.5 },
      { name: 'Police Clearance Certificate (PCC)', count: 88, revenue: 26400, tatDays: 2.3 }
    ],
    regionalDemand: [
      { area: 'Akurdi Railway Station & Village', count: 436, percentage: 37 },
      { area: 'Nigdi Pradhikaran & Yamunanagar', count: 306, percentage: 26 },
      { area: 'Chinchwad Station & Thergaon', count: 212, percentage: 18 },
      { area: 'Ravet & Kiwale Sub-urbs', count: 142, percentage: 12 },
      { area: 'Bhosari & Moshi Link Road', count: 84, percentage: 7 }
    ],
    channelSplit: {
      digitalPortal: 65,
      centerWalkIn: 35,
      onlinePaymentPct: 72,
      cashPaymentPct: 28
    }
  }
};

export default function AnalyticsPanel({ analytics, requests = [], onRefresh }) {
  const { lang, t } = useLanguage();
  const [timeframe, setTimeframe] = useState('1y'); // '7d' | '30d' | '6m' | '1y' (defaults to FY 24-25 as shown in design)
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [hoveredDonut, setHoveredDonut] = useState(null);

  // Localized Timeframe Button Labels
  const timeframeLabels = {
    '7d': lang === 'mr' ? '७ दिवस' : lang === 'hi' ? '7 दिन' : '7 Days',
    '30d': lang === 'mr' ? '३० दिवस' : lang === 'hi' ? '30 दिन' : '30 Days',
    '6m': lang === 'mr' ? '६ महिने' : lang === 'hi' ? '6 महीने' : '6 Months',
    '1y': lang === 'mr' ? 'आर्थिक वर्ष २४-२५' : lang === 'hi' ? 'वित्तीय वर्ष 24-25' : 'FY 24-25'
  };

  // Active dataset resolved from selected timeframe
  const activeDataset = TIMEFRAME_DATASETS[timeframe] || TIMEFRAME_DATASETS['6m'];

  const overview = activeDataset.overview;
  const monthlyTrends = activeDataset.trends;
  const weeklyVolume = activeDataset.weeklyVolume;
  const statusDistribution = activeDataset.statusDistribution;
  const categoryAnalytics = activeDataset.categoryAnalytics;
  const pipelineFunnel = activeDataset.pipelineFunnel;
  const regionalDemand = activeDataset.regionalDemand;
  const topServices = activeDataset.topServices;
  const channelSplit = activeDataset.channelSplit;

  // Export Analytics CSV for active timeframe
  const handleExportCSV = () => {
    const rows = [
      ['Maha E-Seva Kendra - Analytics & Performance Report'],
      ['Generated On', new Date().toLocaleString()],
      ['Selected Timeframe', activeDataset.label],
      [''],
      ['OVERVIEW METRICS'],
      ['Metric', 'Value'],
      ['Total Requests', overview.totalRequests],
      ['Fulfilled Requests', overview.fulfilledRequests],
      ['In-Progress Requests', overview.inProgressRequests],
      ['Pending Requests', overview.pendingRequests],
      ['Rejected Requests', overview.rejectedRequests],
      ['Fulfillment Rate', `${overview.fulfillmentRate}%`],
      ['Total Revenue Collected', `INR ${overview.totalRevenue}`],
      ['Pending Receivables', `INR ${overview.pendingRevenue}`],
      ['Average Turnaround Time (TAT)', `${overview.avgTurnaroundDays} Days`],
      ['Same Day Delivery Rate', `${overview.sameDayDeliveryRate}%`],
      ['Total Registered Digital Citizens', overview.totalCustomers],
      [''],
      ['TREND DATA POINTS'],
      ['Period / Date', 'Submissions', 'Fulfilled', 'Revenue (INR)'],
      ...monthlyTrends.map((m) => [m.month, m.submitted, m.fulfilled, m.revenue]),
      [''],
      ['CATEGORY PERFORMANCE'],
      ['Category', 'Requests', 'Revenue (INR)', 'Avg TAT', 'Completion Rate'],
      ...categoryAnalytics.map((c) => [c.category, c.count, c.revenue, c.avgTat, `${c.rate}%`]),
      [''],
      ['TOP SERVICES'],
      ['Service Name', 'Requests', 'Revenue (INR)', 'Avg TAT Days'],
      ...topServices.map((s) => [s.name, s.count, s.revenue, s.tatDays]),
      [''],
      ['REGIONAL DEMAND (PCMC / PUNE)'],
      ['Ward Area', 'Applications', 'Percentage Share'],
      ...regionalDemand.map((r) => [r.area, r.count, `${r.percentage}%`])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `eseva_analytics_${timeframe}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Trend Chart Calculations (SVG)
  const maxTrendVal = Math.max(...monthlyTrends.map((d) => Math.max(d.submitted, d.fulfilled))) * 1.18 || 150;
  const chartHeight = 220;
  const chartWidth = 600;
  const paddingX = 45;
  const paddingY = 25;
  const innerWidth = chartWidth - paddingX * 2;
  const innerHeight = chartHeight - paddingY * 2;

  const getX = (index) => paddingX + (index / Math.max(monthlyTrends.length - 1, 1)) * innerWidth;
  const getY = (val) => chartHeight - paddingY - (val / maxTrendVal) * innerHeight;

  // Build SVG Path for Area & Line
  const submittedPoints = monthlyTrends.map((d, i) => `${getX(i)},${getY(d.submitted)}`).join(' ');
  const fulfilledPoints = monthlyTrends.map((d, i) => `${getX(i)},${getY(d.fulfilled)}`).join(' ');

  const submittedAreaPath = `M ${getX(0)},${chartHeight - paddingY} L ` +
    monthlyTrends.map((d, i) => `${getX(i)},${getY(d.submitted)}`).join(' L ') +
    ` L ${getX(monthlyTrends.length - 1)},${chartHeight - paddingY} Z`;

  const fulfilledAreaPath = `M ${getX(0)},${chartHeight - paddingY} L ` +
    monthlyTrends.map((d, i) => `${getX(i)},${getY(d.fulfilled)}`).join(' L ') +
    ` L ${getX(monthlyTrends.length - 1)},${chartHeight - paddingY} Z`;

  // Donut SVG Calculations
  let cumulativePercent = 0;
  const donutSegments = statusDistribution.map((item) => {
    const startAngle = cumulativePercent * 3.6;
    cumulativePercent += item.percentage;
    const endAngle = cumulativePercent * 3.6;
    return { ...item, startAngle, endAngle };
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ========================================================= */}
      {/* ANALYTICS CONTROL TOOLBAR */}
      {/* ========================================================= */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h2 className="text-xl font-bold text-slate-800">{t('biStudio')}</h2>
            <span className="bg-primary/10 text-primary text-xs font-extrabold px-2.5 py-0.5 rounded-full uppercase">
              {timeframeLabels[timeframe]}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t('biStudioSub')}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Exact Timeframe Segmented Control matching uploaded design: 7 Days | 30 Days | 6 Months | FY 24-25 */}
          <div className="inline-flex items-center rounded-full bg-[#f1f5f9] p-1 text-xs font-semibold border border-slate-200/80 shadow-2xs">
            {[
              { id: '7d', label: timeframeLabels['7d'] },
              { id: '30d', label: timeframeLabels['30d'] },
              { id: '6m', label: timeframeLabels['6m'] },
              { id: '1y', label: timeframeLabels['1y'] }
            ].map((tItem) => {
              const isActive = timeframe === tItem.id;
              return (
                <button
                  key={tItem.id}
                  onClick={() => {
                    setTimeframe(tItem.id);
                    setHoveredPoint(null);
                  }}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full transition-all duration-150 text-xs ${
                    isActive
                      ? 'border-[1.5px] border-black bg-white/70 text-[#FF8A00] font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 font-semibold border-[1.5px] border-transparent'
                  }`}
                >
                  {tItem.label}
                </button>
              );
            })}
          </div>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow flex items-center gap-1.5"
            title="Download CSV report of active timeframe"
          >
            <i className="fas fa-file-csv text-emerald-400"></i>
            <span>{t('btnExportCsv')}</span>
          </button>

          {/* Refresh Button */}
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="border border-slate-200 hover:border-primary hover:text-primary text-slate-600 p-2 rounded-xl text-xs transition"
              title="Refresh Analytics Feed"
            >
              <i className="fas fa-sync-alt"></i>
            </button>
          )}
        </div>
      </div>

      {/* LIVE QUEUE REAL-TIME SYNC STRIP */}
      {requests && requests.length > 0 && (
        <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-sm border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wider uppercase text-emerald-400">Live Production Queue</span>
                <span className="bg-slate-800 text-[10px] text-slate-300 font-mono px-2 py-0.5 rounded">Synced Realtime</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Connected to Citizen Portal. Tracking {requests.length} active applications across all service categories.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/80 text-center">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">In Inflow</span>
              <span className="font-extrabold text-white text-sm">{requests.length}</span>
            </div>
            <div className="bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-800/40 text-center">
              <span className="text-[10px] text-amber-400 block uppercase font-bold">Pending Review</span>
              <span className="font-extrabold text-amber-300 text-sm">{requests.filter(r => r.status === 'pending').length}</span>
            </div>
            <div className="bg-blue-950/40 px-3 py-1.5 rounded-xl border border-blue-800/40 text-center">
              <span className="text-[10px] text-blue-400 block uppercase font-bold">In-Progress</span>
              <span className="font-extrabold text-blue-300 text-sm">{requests.filter(r => r.status === 'in_progress').length}</span>
            </div>
            <div className="bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-800/40 text-center">
              <span className="text-[10px] text-emerald-400 block uppercase font-bold">Fulfilled</span>
              <span className="font-extrabold text-emerald-300 text-sm">{requests.filter(r => r.status === 'fulfilled').length}</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5 EXECUTIVE KPI TILES (DYNAMIC PER TIMEFRAME) */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {/* Tile 1: Total Volume */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden transition-all duration-300">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">{t('kpiTotalInflow')}</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm">
              <i className="fas fa-layer-group"></i>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">{overview.totalRequests.toLocaleString('en-IN')}</span>
            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <i className="fas fa-arrow-trend-up"></i> {activeDataset.growthBadge}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">{timeframeLabels[timeframe]}</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        </div>

        {/* Tile 2: Revenue */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden transition-all duration-300">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">{t('kpiNetRealized')}</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm">
              <i className="fas fa-indian-rupee-sign"></i>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-emerald-600">
              ₹{Number(overview.totalRevenue).toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded-full">
              Fees
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            ₹{Number(overview.pendingRevenue).toLocaleString('en-IN')} pending
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
        </div>

        {/* Tile 3: Fulfillment Rate */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden transition-all duration-300">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">{t('kpiFulfillmentRate')}</span>
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-primary flex items-center justify-center text-sm">
              <i className="fas fa-circle-check"></i>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">{overview.fulfillmentRate}%</span>
            <span className="text-xs text-primary font-bold bg-orange-50 px-2 py-0.5 rounded-full">
              Target: 80%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {overview.fulfilledRequests.toLocaleString('en-IN')} / {overview.totalRequests.toLocaleString('en-IN')}
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-amber-500"></div>
        </div>

        {/* Tile 4: Average TAT */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden transition-all duration-300">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">{t('kpiAvgSla')}</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-sm">
              <i className="fas fa-stopwatch"></i>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">{overview.avgTurnaroundDays} <span className="text-sm font-semibold text-slate-500">{lang === 'mr' ? 'दिवस' : lang === 'hi' ? 'दिन' : 'days'}</span></span>
            <span className="text-xs text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-full">
              SLA
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">{overview.sameDayDeliveryRate}% same-day</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        </div>

        {/* Tile 5: Registered Citizens */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden transition-all duration-300">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">{t('kpiDigitalCitizens')}</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center text-sm">
              <i className="fas fa-users"></i>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">{overview.totalCustomers.toLocaleString('en-IN')}</span>
            <span className="text-xs text-cyan-700 font-bold bg-cyan-50 px-2 py-0.5 rounded-full">
              Active
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">{channelSplit.digitalPortal}% portal self-uploads</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ROW 1: DUAL PRIMARY CHARTS (AREA TREND + STATUS DONUT) */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CHART 1: VOLUME TREND (AREA & LINE) - 2 COLS */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <i className="fas fa-chart-area text-primary"></i>
                <h3 className="font-bold text-slate-800 text-base">{activeDataset.chartTitle}</h3>
              </div>
              <p className="text-xs text-slate-500">{activeDataset.chartSubtitle}</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-primary inline-block"></span>
                <span className="text-slate-600">Submissions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                <span className="text-slate-600">Fulfilled</span>
              </div>
            </div>
          </div>

          {/* Interactive SVG Area Chart */}
          <div className="relative w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-56 select-none overflow-visible"
            >
              <defs>
                <linearGradient id={`submittedGradient-${timeframe}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff9933" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#ff9933" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id={`fulfilledGradient-${timeframe}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
                const y = chartHeight - paddingY - pct * innerHeight;
                const labelVal = Math.round(pct * maxTrendVal);
                return (
                  <g key={idx}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={chartWidth - paddingX}
                      y2={y}
                      stroke="#f1f5f9"
                      strokeDasharray={pct === 0 ? '0' : '4 4'}
                    />
                    <text
                      x={paddingX - 10}
                      y={y + 3}
                      textAnchor="end"
                      fontSize="9"
                      fill="#94a3b8"
                    >
                      {labelVal}
                    </text>
                  </g>
                );
              })}

              {/* Area Fills */}
              <path d={submittedAreaPath} fill={`url(#submittedGradient-${timeframe})`} />
              <path d={fulfilledAreaPath} fill={`url(#fulfilledGradient-${timeframe})`} />

              {/* Connecting Lines */}
              <polyline
                fill="none"
                stroke="#ff9933"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={submittedPoints}
              />
              <polyline
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={fulfilledPoints}
              />

              {/* Data Points */}
              {monthlyTrends.map((d, i) => {
                const subX = getX(i);
                const subY = getY(d.submitted);
                const fulY = getY(d.fulfilled);
                const isHovered = hoveredPoint === i;

                return (
                  <g key={i}>
                    {/* Period Label */}
                    <text
                      x={subX}
                      y={chartHeight - 8}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="600"
                      fill={isHovered ? '#ff9933' : '#64748b'}
                    >
                      {d.month}
                    </text>

                    {/* Submissions Circle */}
                    <circle
                      cx={subX}
                      cy={subY}
                      r={isHovered ? 6 : 4}
                      fill="#ff9933"
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="cursor-pointer transition-all duration-150"
                      onMouseEnter={() => setHoveredPoint(i)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />

                    {/* Fulfilled Circle */}
                    <circle
                      cx={subX}
                      cy={fulY}
                      r={isHovered ? 6 : 4}
                      fill="#10b981"
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="cursor-pointer transition-all duration-150"
                      onMouseEnter={() => setHoveredPoint(i)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Interactive Tooltip Card */}
            {hoveredPoint !== null && monthlyTrends[hoveredPoint] && (
              <div
                className="absolute top-2 right-4 bg-slate-900/90 backdrop-blur-md text-white p-3 rounded-xl shadow-xl text-xs z-10 animate-fade-in border border-slate-700 pointer-events-none"
              >
                <div className="font-bold text-amber-400 border-b border-slate-700 pb-1 mb-1.5 flex justify-between gap-4">
                  <span>{monthlyTrends[hoveredPoint].month} Performance</span>
                  <span>₹{Number(monthlyTrends[hoveredPoint].revenue).toLocaleString('en-IN')}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-300">New Applications:</span>
                    <span className="font-bold text-orange-400">{monthlyTrends[hoveredPoint].submitted}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-300">Certificates Issued:</span>
                    <span className="font-bold text-emerald-400">{monthlyTrends[hoveredPoint].fulfilled}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-300">Resolution Rate:</span>
                    <span className="font-bold text-blue-300">
                      {Math.round((monthlyTrends[hoveredPoint].fulfilled / Math.max(monthlyTrends[hoveredPoint].submitted, 1)) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Growth trajectory: <strong className="text-slate-800">{activeDataset.growthBadge}</strong> across Akurdi center</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <i className="fas fa-check-double"></i> 95% Tahsildar Acceptance
            </span>
          </div>
        </div>

        {/* CHART 2: STATUS DISTRIBUTION DONUT - 1 COL */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <i className="fas fa-chart-pie text-secondary"></i>
              <h3 className="font-bold text-slate-800 text-base">{t('chartStatusTitle')}</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">{timeframeLabels[timeframe]}</p>

            {/* SVG Donut Visualizer */}
            <div className="relative flex justify-center items-center py-2">
              <svg width="180" height="180" viewBox="0 0 100 100" className="transform -rotate-90">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#f1f5f9"
                  strokeWidth="16"
                />

                {/* Segments */}
                {donutSegments.map((seg, i) => {
                  const circumference = 2 * Math.PI * 38;
                  const strokeDasharray = `${(seg.percentage / 100) * circumference} ${circumference}`;
                  const isHovered = hoveredDonut === seg.key;

                  return (
                    <circle
                      key={seg.key}
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke={seg.color}
                      strokeWidth={isHovered ? 19 : 16}
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={(i === 0 ? 0 : -((donutSegments.slice(0, i).reduce((s, c) => s + c.percentage, 0)) / 100) * circumference)}
                      className="cursor-pointer transition-all duration-200 hover:opacity-90"
                      onMouseEnter={() => setHoveredDonut(seg.key)}
                      onMouseLeave={() => setHoveredDonut(null)}
                    />
                  );
                })}
              </svg>

              {/* Center Metrics in Donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-2xl font-black text-slate-800 leading-tight">
                  {hoveredDonut
                    ? statusDistribution.find((s) => s.key === hoveredDonut)?.percentage + '%'
                    : `${overview.fulfillmentRate}%`}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  {hoveredDonut
                    ? statusDistribution.find((s) => s.key === hoveredDonut)?.label
                    : 'Fulfillment Rate'}
                </span>
              </div>
            </div>
          </div>

          {/* Legend Items */}
          <div className="space-y-2 mt-4 pt-3 border-t border-slate-100">
            {statusDistribution.map((item) => (
              <div
                key={item.key}
                onMouseEnter={() => setHoveredDonut(item.key)}
                onMouseLeave={() => setHoveredDonut(null)}
                className={`flex items-center justify-between p-1.5 rounded-lg text-xs cursor-pointer transition ${
                  hoveredDonut === item.key ? 'bg-slate-50 font-bold' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-700">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900">{item.count.toLocaleString('en-IN')}</span>
                  <span className={`text-[11px] font-bold px-1.5 py-0.2 rounded ${item.bgLight} ${item.textColor}`}>
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ROW 2: DAY-BY-DAY TRAFFIC & CONVERSION PIPELINE FUNNEL */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CHART 3: WEEKLY DAY-OF-THE-WEEK CLUSTERED BAR CHART */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <i className="fas fa-calendar-week text-primary"></i>
                <h3 className="font-bold text-slate-800 text-base">{t('chartWeeklyTitle')}</h3>
              </div>
              <p className="text-xs text-slate-500">Day-by-day load highlighting peak Akurdi counter hours</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1 text-slate-600">
                <span className="w-2.5 h-2.5 rounded bg-primary inline-block"></span> New
              </span>
              <span className="flex items-center gap-1 text-slate-600">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block"></span> Resolved
              </span>
            </div>
          </div>

          {/* Clustered Columns */}
          <div className="space-y-3 py-2">
            {weeklyVolume.map((w, idx) => {
              const maxDayVal = Math.max(...weeklyVolume.map((v) => Math.max(v.submitted, v.completed))) * 1.1 || 45;
              const subWidth = `${Math.min(100, (w.submitted / maxDayVal) * 100)}%`;
              const compWidth = `${Math.min(100, (w.completed / maxDayVal) * 100)}%`;
              const isPeak = w.day === 'Sat' || w.day === 'Mon';

              return (
                <div key={idx} className="group">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      {w.day}
                      {isPeak && (
                        <span className="bg-amber-100 text-amber-800 text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase">
                          Peak
                        </span>
                      )}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {w.submitted} applied · {w.completed} delivered
                    </span>
                  </div>
                  <div className="space-y-1">
                    {/* Submitted Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-500 group-hover:brightness-110"
                        style={{ width: subWidth }}
                      ></div>
                    </div>
                    {/* Completed Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: compWidth }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span><i className="fas fa-lightbulb text-amber-500 mr-1"></i> Peak citizen rush on <strong>Saturdays (10 AM - 4 PM)</strong></span>
            <span className="text-slate-400 text-[11px]">Deploy 2 operators on peak days</span>
          </div>
        </div>

        {/* CHART 4: CONVERSION PIPELINE FUNNEL */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <i className="fas fa-filter text-chakra"></i>
              <h3 className="font-bold text-slate-800 text-base">{t('chartFunnelTitle')}</h3>
            </div>
            <p className="text-xs text-slate-500">{timeframeLabels[timeframe]}</p>
          </div>

          {/* Visual Funnel */}
          <div className="space-y-3 py-2">
            {pipelineFunnel.map((step, idx) => {
              const bgGradient =
                idx === 0
                  ? 'from-blue-500 to-indigo-600'
                  : idx === 1
                  ? 'from-cyan-500 to-blue-600'
                  : idx === 2
                  ? 'from-amber-500 to-orange-600'
                  : 'from-emerald-500 to-teal-600';

              return (
                <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 relative">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-slate-800">{step.step}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900">{step.count.toLocaleString('en-IN')} apps</span>
                      <span className="bg-white px-2 py-0.5 rounded-md font-bold text-slate-700 shadow-xs border border-slate-200 text-[11px]">
                        {step.percentage}%
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden mb-1.5">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${bgGradient} transition-all duration-700`}
                      style={{ width: `${step.percentage}%` }}
                    ></div>
                  </div>

                  <p className="text-[11px] text-slate-500 flex items-center justify-between">
                    <span>{step.note}</span>
                    {idx > 0 && (
                      <span className="text-slate-400">
                        {pipelineFunnel[idx - 1].percentage - step.percentage}% drop-off / clarification
                      </span>
                    )}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-2 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Overall Success Ratio: <strong className="text-emerald-600">{activeDataset.pipelineFunnel[3]?.percentage}% direct completion</strong></span>
            <span className="text-slate-400">Discrepancy resolved in ~24h</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ROW 3: CATEGORY FINANCIAL MATRIX & REGIONAL DEMAND */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CHART 5: CATEGORY REVENUE & SLA TABLE WITH VISUAL BARS (2 COLS) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <i className="fas fa-tags text-primary"></i>
                <h3 className="font-bold text-slate-800 text-base">{t('chartCategoryTitle')}</h3>
              </div>
              <p className="text-xs text-slate-500">{timeframeLabels[timeframe]}</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
              5 Major Sectors
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 font-bold">Category Sector</th>
                  <th className="py-2.5 font-bold text-center">Applications</th>
                  <th className="py-2.5 font-bold text-right">Revenue (₹)</th>
                  <th className="py-2.5 font-bold text-center">Avg SLA (TAT)</th>
                  <th className="py-2.5 font-bold text-right">Success Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categoryAnalytics.map((cat, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                        <span className="font-bold text-slate-800">{cat.category}</span>
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      <span className="font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                        {cat.count.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="py-3 text-right font-extrabold text-emerald-600">
                      ₹{cat.revenue.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 text-center">
                      <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded text-[11px]">
                        {cat.avgTat}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full rounded-full"
                            style={{ width: `${cat.rate}%` }}
                          ></div>
                        </div>
                        <span className="font-bold text-slate-700">{cat.rate}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Highest Revenue: <strong>Certificates & Revenue (Aaple Sarkar)</strong></span>
            <span>Fastest Turnaround: <strong>Shop Act & Aadhaar (1.0 - 1.4 days)</strong></span>
          </div>
        </div>

        {/* CHART 6: REGIONAL WARD HEATMAP & CHANNEL SPLIT (1 COL) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <i className="fas fa-map-location-dot text-indigo-600"></i>
              <h3 className="font-bold text-slate-800 text-base">{t('chartRegionalTitle')}</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">{timeframeLabels[timeframe]}</p>

            {/* Regional Progress List */}
            <div className="space-y-3">
              {regionalDemand.map((region, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700 truncate max-w-[200px]" title={region.area}>
                      {region.area}
                    </span>
                    <span className="font-extrabold text-slate-900">{region.percentage}% ({region.count.toLocaleString('en-IN')})</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${region.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Digital vs Walk-In Channel Split */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>{t('chartDeliveryChannels')}</span>
                <span className="text-primary">{channelSplit.digitalPortal}% Online</span>
              </h4>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden flex">
                <div
                  className="bg-primary h-full"
                  style={{ width: `${channelSplit.digitalPortal}%` }}
                  title={`Online Portal: ${channelSplit.digitalPortal}%`}
                ></div>
                <div
                  className="bg-slate-400 h-full"
                  style={{ width: `${channelSplit.centerWalkIn}%` }}
                  title={`Walk-in: ${channelSplit.centerWalkIn}%`}
                ></div>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 mt-1.5">
                <span className="flex items-center gap-1 font-semibold text-primary">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block"></span> Web/Mobile Portal ({channelSplit.digitalPortal}%)
                </span>
                <span className="flex items-center gap-1 font-semibold text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-slate-400 inline-block"></span> Walk-in Desk ({channelSplit.centerWalkIn}%)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
            Serving Akurdi, Nigdi Pradhikaran, PCMC zone with verified delivery
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ROW 4: TOP 7 IN-DEMAND SERVICES CATALOG MATRIX */}
      {/* ========================================================= */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <i className="fas fa-trophy text-amber-500"></i>
              <h3 className="font-bold text-slate-800 text-base">{t('chartLeaderboardTitle')}</h3>
            </div>
            <p className="text-xs text-slate-500">{timeframeLabels[timeframe]}</p>
          </div>
          <span className="text-xs text-slate-400 font-medium">Auto-updated for {timeframeLabels[timeframe]}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {topServices.map((srv, i) => (
            <div
              key={i}
              className="bg-slate-50 hover:bg-white p-4 rounded-xl border border-slate-200 hover:border-primary transition-all duration-200 shadow-2xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                    #{i + 1}
                  </span>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    SLA: {srv.tatDays}d
                  </span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-1 line-clamp-1" title={srv.name}>
                  {srv.name}
                </h4>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Applications</span>
                  <span className="font-black text-slate-900 text-sm">{srv.count.toLocaleString('en-IN')}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Revenue</span>
                  <span className="font-black text-emerald-600 text-sm">₹{Number(srv.revenue).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
