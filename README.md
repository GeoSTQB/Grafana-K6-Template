# K6 Stress Test with Authentication

## Overview
This repository contains a K6-based stress test designed to test an API with authentication preconditions. It includes a Dockerized setup for easy deployment and execution.

## Prerequisites

### Install K6
- **macOS**: `brew install k6`
- **Windows**: `choco install k6`

### Install Docker
- Ensure Docker is installed to run the test in a containerized environment.

## Repository Structure
```
|-- testWithAuthPrecondition.js   # Main K6 script performing authentication and API tests
|-- payload.js                    # Contains authentication payload
|-- docker-compose.yml            # Defines Docker setup for running the test
|-- README.md                     # Documentation file
```

## Running the Test

### Running Locally
1. Update `payload.js` with the correct authentication credentials.
2. Run the test using:
   ```sh
   k6 run testWithAuthPrecondition.js
   ```

### Running with Docker
1. Build the Docker image:
   ```sh
   docker-compose build
   ```
2. Run the test in a container:
   ```sh
   docker-compose up
   ```

## Test Configuration
The test is configured with the following options in `testWithAuthPrecondition.js`:

- **Scenarios**: Uses `constant-vus` executor with 10 virtual users for 30 seconds.
- **Thresholds**:
  - `http_req_failed`: Less than 2% failure rate.
  - `http_req_duration`: 95% of requests should complete in under 300ms.
- **Authentication**:
  - Authenticates with `identitySignInUrl` using credentials from `payload.js`.
  - Extracts and stores the access token for subsequent API requests.

## Generating Reports
After execution, a summary report is generated as `summary.html` using `k6-reporter`.

## Troubleshooting
- **Authentication fails**: Verify credentials in `payload.js`.
- **K6 is not installed**: Ensure it is installed correctly.
- **Running in Docker issues**: Ensure Docker is running and accessible.
