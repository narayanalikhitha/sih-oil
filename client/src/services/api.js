import axios from 'axios';
import {
  DEMO_USERS, DEMO_WELLS, DEMO_EVENTS, DEMO_RISK_ALERTS,
  DEMO_REPORTS, DEMO_READINGS, DEMO_OVERVIEW
} from './demoData';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ertmac_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock response router for static CDN deployments or offline mode
function getMockResponse(config) {
  const url = config.url || '';
  const method = (config.method || 'get').toLowerCase();

  // 1. Auth Login
  if (url.includes('/auth/login') && method === 'post') {
    let body = {};
    try {
      body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data || {};
    } catch {}
    const email = (body.email || '').trim().toLowerCase();
    const user = DEMO_USERS[email] || DEMO_USERS['engineer@ertmac.demo'];
    return {
      status: 200, statusText: 'OK',
      data: {
        success: true,
        message: 'Login successful (Demo Mode).',
        token: 'demo-jwt-token-ertmac-nwis',
        user: { ...user },
      },
    };
  }

  // 2. Auth Current User
  if (url.includes('/auth/me')) {
    const stored = localStorage.getItem('ertmac_user');
    const user = stored ? JSON.parse(stored) : DEMO_USERS['engineer@ertmac.demo'];
    return {
      status: 200, statusText: 'OK',
      data: { success: true, user },
    };
  }

  // 3. Analytics Overview
  if (url.includes('/analytics/overview')) {
    return {
      status: 200, statusText: 'OK',
      data: { success: true, data: DEMO_OVERVIEW },
    };
  }

  // 4. Analytics Event / Risk / Well
  if (url.includes('/analytics/events')) {
    return {
      status: 200, statusText: 'OK',
      data: {
        success: true,
        data: {
          byType: [
            { _id: 'MUD_LOSS', count: 3, avgDepth: 2850, totalNPT: 12.5 },
            { _id: 'HIGH_TORQUE', count: 2, avgDepth: 2880, totalNPT: 4.5 },
            { _id: 'KICK', count: 1, avgDepth: 2900, totalNPT: 18.0 },
          ],
          byFormation: [
            { _id: 'Formation-X', count: 5, eventTypes: ['MUD_LOSS', 'HIGH_TORQUE', 'KICK'] },
            { _id: 'Kopili Formation', count: 1, eventTypes: ['LOST_CIRCULATION'] },
          ],
          bySeverity: [
            { _id: 'CRITICAL', count: 1 },
            { _id: 'HIGH', count: 2 },
            { _id: 'MEDIUM', count: 3 },
          ],
        },
      },
    };
  }

  // 5. Wells - Nearby / Offset Match / Single / List
  if (url.includes('/offset-match/')) {
    return {
      status: 200, statusText: 'OK',
      data: {
        success: true,
        data: {
          overallScore: 89,
          formationScore: 95,
          depthScore: 88,
          distanceScore: 85,
          riskFactor: 'HIGH',
          sharedFormations: ['Formation-X', 'Kopili Formation', 'Barail Formation'],
          matchedEvents: DEMO_EVENTS.slice(0, 2),
        },
      },
    };
  }

  if (url.includes('/nearby')) {
    const nearby = DEMO_WELLS.filter(w => w._id !== '6571b0000000000000000101').map((w, i) => ({
      ...w,
      distance: parseFloat((1.5 + i * 0.8).toFixed(1)),
    }));
    return {
      status: 200, statusText: 'OK',
      data: { success: true, data: nearby },
    };
  }

  if (url.match(/\/wells\/[a-zA-Z0-9_-]+$/)) {
    const well = DEMO_WELLS[0];
    return {
      status: 200, statusText: 'OK',
      data: { success: true, data: { ...well, events: DEMO_EVENTS, openAlerts: 1 } },
    };
  }

  if (url.includes('/wells')) {
    let filtered = DEMO_WELLS;
    if (url.includes('status=')) {
      const match = url.match(/status=([A-Z]+)/);
      if (match && match[1]) {
        filtered = DEMO_WELLS.filter(w => w.status === match[1]);
      }
    }
    return {
      status: 200, statusText: 'OK',
      data: { success: true, data: filtered, total: filtered.length },
    };
  }

  // 6. Risk Alerts
  if (url.includes('/risks')) {
    return {
      status: 200, statusText: 'OK',
      data: { success: true, data: DEMO_RISK_ALERTS },
    };
  }

  // 7. Drilling Events
  if (url.includes('/events')) {
    return {
      status: 200, statusText: 'OK',
      data: { success: true, data: DEMO_EVENTS },
    };
  }

  // 8. Telemetry Readings
  if (url.includes('/readings')) {
    return {
      status: 200, statusText: 'OK',
      data: { success: true, data: DEMO_READINGS },
    };
  }

  // 9. Reports
  if (url.includes('/reports')) {
    return {
      status: 200, statusText: 'OK',
      data: { success: true, data: DEMO_REPORTS },
    };
  }

  // 10. Knowledge Graph
  if (url.includes('/knowledge-graph')) {
    const nodes = [
      { id: 'well-101', label: 'WELL-101', type: 'WELL', data: { field: 'Deohal Field', status: 'DRILLING' } },
      { id: 'well-103', label: 'WELL-103', type: 'WELL', data: { field: 'Deohal Field', status: 'COMPLETED' } },
      { id: 'well-104', label: 'WELL-104', type: 'WELL', data: { field: 'Deohal Field', status: 'SUSPENDED' } },
      { id: 'event-1', label: 'Mud Loss', type: 'EVENT', data: { depth: 2850, severity: 'HIGH' } },
      { id: 'event-2', label: 'High Torque', type: 'EVENT', data: { depth: 2880, severity: 'MEDIUM' } },
      { id: 'event-3', label: 'Well Kick', type: 'EVENT', data: { depth: 2900, severity: 'CRITICAL' } },
      { id: 'form-x', label: 'Formation-X', type: 'FORMATION' },
      { id: 'doc-1', label: 'WELL-103 DDR', type: 'DOCUMENT' },
    ];
    const edges = [
      { source: 'well-103', target: 'event-1', label: 'HAS_EVENT' },
      { source: 'well-103', target: 'event-2', label: 'HAS_EVENT' },
      { source: 'well-104', target: 'event-3', label: 'HAS_EVENT' },
      { source: 'event-1', target: 'form-x', label: 'IN_FORMATION' },
      { source: 'event-2', target: 'form-x', label: 'IN_FORMATION' },
      { source: 'event-3', target: 'form-x', label: 'IN_FORMATION' },
      { source: 'event-1', target: 'doc-1', label: 'SOURCED_FROM' },
    ];
    return {
      status: 200, statusText: 'OK',
      data: { success: true, data: { nodes, edges } },
    };
  }

  // 11. AI Operations Summary Briefing
  if (url.includes('/ai/operations-summary')) {
    return {
      status: 200, statusText: 'OK',
      data: {
        success: true,
        data: {
          summary: '3 active drilling operations across Deohal field. WELL-101 is currently approaching Formation-X fracture zone at 2820m. Proactive risk mitigation recommended based on WELL-103 offset mud loss history.',
          keyRisks: [
            'WELL-101: Approaching Formation-X loss zone (30m offset proximity)',
            'WELL-110: High-pressure gas kick risk at 3100m depth interval',
          ],
          recommendations: [
            'Pre-mix 50 bbl fibrous LCM blend before penetrating 2840m in WELL-101',
            'Reduce ROP to < 2.5 m/hr and monitor active pit levels continuously',
            'Maintain mud weight at 1.32 SG',
          ],
        },
      },
    };
  }

  // 12. AI Compare Wells
  if (url.includes('/ai/compare-wells')) {
    return {
      status: 200, statusText: 'OK',
      data: {
        success: true,
        data: {
          similarityScore: 88,
          formationMatch: 'Exact match on Formation-X limestone interval (2500m - 3000m)',
          lithologyComparison: 'Both wells penetrate fractured carbonate reservoir with high primary permeability',
          historicalIncidentSummary: 'WELL-103 experienced 25 bbl/hr mud loss at 2850m with 6.5h NPT',
          engineeringRecommendation: 'Apply LCM pill proactively and reduce pump rate by 20% when drilling through 2840m - 2860m',
        },
      },
    };
  }

  // 13. AI Chat
  if (url.includes('/ai/chat')) {
    return {
      status: 200, statusText: 'OK',
      data: {
        success: true,
        data: {
          answer: 'Based on verified offset data for WELL-103, a severe partial mud loss (25-30 bbl/hr) occurred at 2850m depth in Formation-X carbonate due to naturally occurring fractures. For WELL-101 (now at 2820m), recommended actions: 1) Maintain mud weight at 1.32 SG, 2) Have 50 bbl fibrous/granular LCM pill on standby, 3) Throttle pump flow rate before reaching 2840m.',
          sources: ['WELL-103 Daily Drilling Report — Page 14 (14 March 2023)', 'Formation-X Stratigraphic Geological Log'],
          isAIGenerated: true,
          disclaimer: 'This response is generated by eRTMAC-NWIS AI decision support. Requires engineering review before operational execution.',
        },
      },
    };
  }

  // Generic fallback
  return {
    status: 200, statusText: 'OK',
    data: { success: true, data: [] },
  };
}

// Fallback interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend is unreachable or 404 (static deployment), return seamless mock response
    if (error.response?.status === 401 && window.location.pathname === '/login') {
      const mock = getMockResponse(error.config);
      return Promise.resolve(mock);
    }
    if (!error.response || error.response.status === 404 || error.response.status >= 500 || error.code === 'ERR_NETWORK') {
      const mock = getMockResponse(error.config);
      return Promise.resolve(mock);
    }
    return Promise.reject(error);
  }
);

export default api;
