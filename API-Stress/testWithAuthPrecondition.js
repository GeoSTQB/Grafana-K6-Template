import { sleep, check, group } from 'k6'
import http from 'k6/http'
import { getUrls } from './env.js';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
import { companyAuthPayload } from './payload.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


//install K6 - brew install k6
//wind - choco install k6

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}

export const options = {
  scenarios: {
    testExecName: {
          executor: 'constant-vus',
          exec: 'testExecName',
          vus: 10,
          duration: '30s',
      },
  },
    discardResponseBodies: false,
    thresholds: {
      http_req_failed: ['rate<0.02'], // http errors should be less than 2%
      http_req_duration: ['p(95)<300'], // 95% requests should be below 2s
    }
};

// Initialize global variables
const urls = getUrls();
const identitySignInUrl = urls.identitySignInUrl;
const getInventoryHistoryUrl = urls.getInventoryHistoryUrl;
let accessToken; // To store the token for reuse

// One-time setup: perform authentication
export function setup() {
  const requestIdAuth = uuidv4();
  const jsonHeader = {
    headers: {
      accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
      'x-request-id': requestIdAuth,
    },
  };

  const authResponse = http.post(identitySignInUrl, companyAuthPayload, jsonHeader);
  check(authResponse, {
    'Authentication successful': (r) => r.status === 200,
  });

  const parsedResponse = JSON.parse(authResponse.body);
  accessToken = parsedResponse.accessToken;
  if (!accessToken) {
    throw new Error('Authentication failed: AccessToken not received.');
  }

  return { accessToken }; // Pass to subsequent iterations
}

export function testExecName({ accessToken }) {
    const requestIdForToken = uuidv4();
    const headerWithToken = {
      headers: {
        accept: 'application/json, text/plain, */*',
        'content-type': 'application/json',
        'x-request-id': requestIdForToken,
        Authorization: `Bearer ${accessToken}`,
      },
    };
  
    group('Scenario: Check Inventory Report Pages', function () {
      const inventoryResponse = http.get(getInventoryHistoryUrl, headerWithToken);
      check(inventoryResponse, {
        'Inventory history GET is 200': (r) => r.status === 200,
      });
    });
}