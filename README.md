# PayExtend - NestJS Backend with Firebase, Stripe, Polar.sh, and LemonSqueezy Integrations for WebExtensions

[![NestJS](https://img.shields.io/badge/NestJS-v9.0.0-red.svg?style=flat-square&logo=nestjs)](https://nestjs.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

## Description

PayExtend is a NestJS project designed to provide a robust backend solution for browser extensions. It integrates various services such as Firebase, Stripe, Polar.sh, and LemonSqueezy to offer a comprehensive set of features for developers/agencies looking to build premium extensions 

### Key Features

- Built on [Nest](https://github.com/nestjs/nest) framework TypeScript
- Firebase Auth and Firestore integration
- Stripe Webhooks support
- Polar.sh integration
- LemonSqueezy integration
- Authentication and API for Chrome extensions

## Project Structure

This project is set up as a Yarn workspace monorepo, which allows for managing multiple packages within a single repository. The monorepo structure includes:

- **Root Package**: The main NestJS application
- **vue-dashboard**: A Vue 3 dashboard application
- **packages/**: Directory for future packages

### Yarn Workspaces

Yarn workspaces enable sharing dependencies across packages and simplify the development workflow. This setup allows you to:

- Install dependencies for all packages with a single command
- Run scripts across all packages or target specific packages
- Share code between packages
- Maintain consistent versioning

## Project setup

```bash
# Install dependencies for all workspaces
$ yarn install
```

### Working with Workspaces

```bash
# Run a command in a specific workspace
$ yarn workspace <workspace-name> <command>

# Examples:
$ yarn workspace vue-dashboard dev    # Start the Vue dashboard
$ yarn workspace vue-dashboard build  # Build the Vue dashboard

# Run a command in all workspaces
$ yarn workspaces run <command>
```

## Compile and run the project

### NestJS Backend

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### Vue Dashboard

```bash
# development mode with hot-reload
$ yarn run start:dashboard
# or
$ yarn workspace vue-dashboard dev

# build for production
$ yarn workspace vue-dashboard build

# preview production build
$ yarn workspace vue-dashboard preview
```

### Building All Packages

```bash
# build all workspaces
$ yarn run build:all
```

## Run tests

### NestJS Backend Tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

### Vue Dashboard Tests

```bash
# unit tests
$ yarn workspace vue-dashboard test
```

### Running Tests Across All Workspaces

```bash
# run tests in all workspaces
$ yarn run test:all
```

## Screenshots

![Login Screen](/screenshots/Login_Screenshot.png)
![Dashboard Integration Screen](/screenshots/Integration.png)
![Chrome Webstore Settings Screen](/screenshots/Chrome%20Webstore.png)
![Stripe Screen](/screenshots/Stripe_setup.png)

## Integrations

This project includes several integrations to help you build powerful web applications and browser extensions:

### Firebase Auth / Firestore

Our Firebase integration provides:
- User authentication with Firebase Auth
- Data storage with Firestore
- Real-time data synchronization
- Secure access control

```typescript
// Example of Firebase Auth integration
import { FirebaseAuthService } from './services/firebase-auth.service';

@Injectable()
export class AuthService {
  constructor(private firebaseAuthService: FirebaseAuthService) {}

  async validateUser(token: string): Promise<User> {
    return this.firebaseAuthService.verifyToken(token);
  }
}
```

### Stripe Webhooks

Our Stripe integration includes:
- Webhook handling for payment events
- Subscription management
- Invoice processing
- Payment method handling

### Polar.sh Integration

The Polar.sh integration allows:
- Open-source funding
- Sponsorship management
- Community engagement features

### LemonSqueezy Integration

Our LemonSqueezy integration provides:
- Digital product sales
- License key management
- Subscription handling
- Payment processing

### Chrome Extension API

The project includes specialized endpoints for Chrome extensions:
- Authentication for extensions
- Secure API communication
- Data synchronization between extensions and backend

### Todo Integrations

The following integrations are planned for future development:

- **Stripe** Enhanced features and deeper integration for Stripe Webhooks and payment processing
- **Polar.sh** Polar.sh integration for open-source funding and community engagement
- **LemonSqueezy**: LemonSqueezy advanced features and payment processing
- **Hubspot**: CRM integration for customer management
- **Authentication and API for Chrome extensions:** Secure endpoints for browser extensions
- **Query Selector Storage:** Efficient storage and retrieval of query selectors
- **Firebase Authentication:** Authentication for browser extensions
- **Logs**: Centralized logging for all services for WebExtensions
- **Chrome Webstore API:** Integration with Chrome Webstore for extension management, prevents fake extensions from being submitted to the platform.
## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Lead Engineer [Okeowo Aderemi](https://twitter.com/qtguru), 
- Frontend Developer [Adedadyo Adegbola](https://twitter.com/adedadyo), 
- Assistant Backend Engineer [Lawson Omoregbee](https://twitter.com/lawsonom)
- Website - [https://retaniconsults.com](https://nestjs.com/)
- Twitter - [@qtguru](https://twitter.com/nestframework)

## Module Document
Go to [Docs](/docs) for more information about each module's documentation



