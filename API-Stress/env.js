
// If you want to run tests with environment you should run this command: ENVIRONMENT=staging k6 run javascript.js
export function getUrls() {
    switch (__ENV.ENVIRONMENT) {
        case 'staging':
            return {
                identitySignInUrl: 'https://identity.staging.test.ge',
                getInventoryHistoryUrl: 'https://reporting.staging.test.ge/',
            };
        case 'prod':
            return {
                identitySignInUrl: 'https://identity.test.ge',
                getInventoryHistoryUrl: 'https://reporting.test.ge/',
            };
        case 'Dev':
            return {
                identitySignInUrl: 'https://identity.dev.test.ge',
                getInventoryHistoryUrl: 'https://reporting.dev.test.ge/',
            };
        default:
            return {
                identitySignInUrl: 'https://identity.staging.test.ge',
                getInventoryHistoryUrl: 'https://reporting.staging.test.ge/',
            };
    }
  }