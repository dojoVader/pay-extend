<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

PayExtend is a NestJS project designed to provide a robust backend solution for web applications and browser extensions. It integrates various services such as Firebase, Stripe, Polar.sh, and LemonSqueezy to offer a comprehensive set of features for developers.

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

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

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

## Todo Integrations

The following integrations are planned for future development:

- **Stripe** Enhanced features and deeper integration
- **Polar.sh** Enhanced features and deeper integration
- **LemonSqueezy**: Enhanced features and deeper integration
- **Hubspot**: CRM integration for customer management
- **Liquid Templating**: Dynamic content generation with Liquid templates
- **Authentication and API for Chrome extensions:** Secure endpoints for browser extensions
- **Query Selector Storage:** Efficient storage and retrieval of query selectors
## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
