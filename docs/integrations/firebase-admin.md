# Firebase Admin SDK integration

This document explains how to provide Firebase service account credentials to the backend container used in this project and how to initialize the Firebase Admin SDK from a Node.js backend.

Summary
- Supported credential delivery methods: 1) Base64-encoded service account JSON provided via an environment variable (`SERVICE_ACCOUNT_KEY`), or 2) Mounting the service account JSON into the container and pointing to it with `SERVICE_ACCOUNT_PATH`.
- Recommended: use secrets managers or Docker secrets in production.

Assumptions
- Backend is a Node.js service that uses the `firebase-admin` package.
- You have (or can create) a Firebase service account JSON with the required permissions for your use case.

Prerequisites
- A Firebase service account JSON file (downloaded from the Firebase Console / IAM & Admin > Service Accounts).
- `firebase-admin` installed in your backend (npm i firebase-admin).

Obtaining a service account key
1. Go to the Firebase Console -> Project Settings -> Service accounts
2. Click "Generate new private key" to download the JSON file
3. Keep the JSON secure and do not commit it to version control

Environment variables used by our Docker image
- SERVICE_ACCOUNT_KEY (optional) — Base64-encoded contents of the service account JSON. When present, the app will decode this value and use the JSON object as the credential.
- SERVICE_ACCOUNT_PATH (optional) — Absolute path inside the container to the service account JSON file (e.g. `/run/secrets/firebase_sa.json` or `/app/secrets/firebase_sa.json`). When present, the app will read the file and use it as the credential.
- FIREBASE_PROJECT_ID (optional) — If you want to explicitly set/override the project ID used by the SDK.

We support either `SERVICE_ACCOUNT_KEY` OR `SERVICE_ACCOUNT_PATH`. If both are present, `SERVICE_ACCOUNT_PATH` will take precedence.

Why two options?
- Base64 env (`SERVICE_ACCOUNT_KEY`) is convenient for CI (you can store the base64 string as a secret and inject it into the container). However, environment variables are sometimes visible in process listings and are less secure.
- File path (`SERVICE_ACCOUNT_PATH`) is preferable for deployment hosts and Docker secrets because the file content does not live in the environment and can be mounted with restrictive permissions.

Docker Compose examples

1) Using base64 environment variable (CI-friendly)

In your `.env` file or secrets store set:

```env
# .env (example)
# encode the JSON file: cat firebase-sa.json | base64 | tr -d '\n' > firebase_sa.base64
SERVICE_ACCOUNT_KEY=${SERVICE_ACCOUNT_KEY}
FIREBASE_PROJECT_ID=${FIREBASE_PROJECT_ID}
```

docker-compose.yml snippet:

```yaml
services:
  backend:
    image: your-backend-image:latest
    environment:
      - SERVICE_ACCOUNT_KEY=${SERVICE_ACCOUNT_KEY}
      - FIREBASE_PROJECT_ID=${FIREBASE_PROJECT_ID}
    # ...other settings
```

2) Using a mounted file (recommended on hosts / Docker secrets)

If you can mount the JSON into the container, set `SERVICE_ACCOUNT_PATH` to the in-container path.

docker-compose.yml snippet with a host mount (for development):

```yaml
services:
  backend:
    image: your-backend-image:latest
    volumes:
      - ./secrets/firebase-sa.json:/run/secrets/firebase_sa.json:ro
    environment:
      - SERVICE_ACCOUNT_PATH=/run/secrets/firebase_sa.json
    # ...other settings
```

Docker secrets (Compose v3+)

Using Docker secrets (swarm) or other orchestrators that provide a secrets filesystem is preferred in production.

```yaml
version: '3.7'
services:
  backend:
    image: your-backend-image:latest
    secrets:
      - firebase_sa
    environment:
      - SERVICE_ACCOUNT_PATH=/run/secrets/firebase_sa

secrets:
  firebase_sa:
    file: ./secrets/firebase-sa.json
```

Node.js initialization examples

1) Read from `SERVICE_ACCOUNT_KEY` (base64)

```js
// src/firebase.ts
import fs from 'fs';
import admin from 'firebase-admin';

function getServiceAccountFromEnv() {
  const base64 = process.env.SERVICE_ACCOUNT_KEY;
  if (!base64) return null;
  const json = Buffer.from(base64, 'base64').toString('utf8');
  try {
    return JSON.parse(json);
  } catch (err) {
    console.error('Invalid base64 SERVICE_ACCOUNT_KEY');
    throw err;
  }
}

function getServiceAccountFromPath() {
  const p = process.env.SERVICE_ACCOUNT_PATH;
  if (!p) return null;
  try {
    const json = fs.readFileSync(p, 'utf8');
    return JSON.parse(json);
  } catch (err) {
    console.error(`Failed to read service account from path: ${p}`);
    throw err;
  }
}

export function initFirebase() {
  if (admin.apps.length) return admin.app();

  const fromPath = getServiceAccountFromPath();
  const fromEnv = getServiceAccountFromEnv();
  const serviceAccount = fromPath || fromEnv;

  if (!serviceAccount) {
    // If no explicit credential is provided, the SDK will fall back to application default credentials.
    // This may be fine for some environments (e.g. GCP), but for local/docker deployments you usually want one of the above.
    console.warn('No Firebase service account configured; relying on application default credentials');
    admin.initializeApp();
    return admin.app();
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID || serviceAccount.project_id,
  });
  return admin.app();
}
```

2) Minimal usage in your app

```ts
import { initFirebase } from './firebase';

const app = initFirebase();
// use admin.* APIs: admin.auth(), admin.firestore(), etc.
```

Security recommendations
- Never commit the raw service account JSON or the base64 version to source control.
- Use a secrets manager (AWS Secrets Manager, GCP Secret Manager, HashiCorp Vault) for production and inject secrets at deploy time.
- Prefer mounting a file with restrictive permissions or using orchestration secrets rather than populating a long base64 string into environment variables on long-lived hosts.
- Use least privilege: create a service account with only the permissions your service needs.
- Rotate keys regularly and remove unused keys.

CI example (GitHub Actions) — base64 approach

```yaml
# .github/workflows/deploy.yml (snippet)
jobs:
  deploy:
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Set up variables
        env:
          FIREBASE_SA_JSON: ${{ secrets.FIREBASE_SA_JSON }} # this is the raw JSON stored as a secret
        run: |
          echo "SERVICE_ACCOUNT_KEY=$(echo \"$FIREBASE_SA_JSON\" | base64 | tr -d '\n')" >> $GITHUB_ENV
      - name: Deploy
        run: |
          docker compose up -d --build
```

Troubleshooting
- If you see authentication errors, verify the service account JSON contains the right project and that the account has the required IAM roles.
- For decoding errors with base64, re-encode the JSON with `base64` and ensure any newlines are removed.

References
- Firebase Admin SDK for Node.js: https://firebase.google.com/docs/admin/setup
- Docker secrets and Compose: https://docs.docker.com/engine/swarm/secrets/
