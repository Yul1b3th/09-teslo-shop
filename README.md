# TesloShop

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.2.

## Project Structure

```
teslo-shop/
├── src/
│   ├── app/
│   │   ├── app.ts                    # Root component
│   │   ├── app.html                  # Root template
│   │   ├── app.css                   # Root styles
│   │   ├── app.config.ts             # App configuration (providers, interceptors)
│   │   ├── app.routes.ts             # Main routing configuration
│   │   │
│   │   ├── core/                     # Core services & utilities (singleton)
│   │   │   └── loading/
│   │   │       ├── loading.service.ts
│   │   │       ├── loading.component.ts
│   │   │       ├── loading.interceptor.ts
│   │   │       └── index.ts          # Barrel file exports
│   │   │
│   │   ├── auth/                     # Authentication feature module
│   │   │   ├── auth.routes.ts        # Auth routing
│   │   │   ├── services/
│   │   │   │   └── auth.service.ts
│   │   │   ├── guards/
│   │   │   │   ├── not-authenticated.guard.ts
│   │   │   │   └── is-admin.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptor.ts
│   │   │   │   └── login.interceptor.ts
│   │   │   ├── interfaces/
│   │   │   │   ├── auth-response.interface.ts
│   │   │   │   └── user.interface.ts
│   │   │   ├── layout/
│   │   │   │   └── auth-layout/
│   │   │   │       ├── auth-layout.ts
│   │   │   │       └── auth-layout.html
│   │   │   ├── pages/
│   │   │   │   ├── login-page/
│   │   │   │   │   ├── login-page.ts
│   │   │   │   │   └── login-page.html
│   │   │   │   └── register-page/
│   │   │   │       ├── register-page.ts
│   │   │   │       └── register-page.html
│   │   │   └── index.ts              # Barrel file exports
│   │   │
│   │   ├── products/                 # Products feature module
│   │   │   ├── services/
│   │   │   │   └── products.service.ts
│   │   │   ├── components/
│   │   │   │   ├── product-card/
│   │   │   │   │   ├── product-card.ts
│   │   │   │   │   └── product-card.html
│   │   │   │   ├── product-carousel/
│   │   │   │   │   ├── product-carousel.ts
│   │   │   │   │   └── product-carousel.html
│   │   │   │   └── product-table/
│   │   │   │       ├── product-table.ts
│   │   │   │       └── product-table.html
│   │   │   ├── interfaces/
│   │   │   │   └── product.interface.ts
│   │   │   ├── pipes/
│   │   │   │   └── product-image.pipe.ts
│   │   │   └── index.ts              # Barrel file exports
│   │   │
│   │   ├── shared/                   # Shared components & utilities
│   │   │   ├── components/
│   │   │   │   ├── form-error-label/
│   │   │   │   │   ├── form-error-label.ts
│   │   │   │   │   └── form-error-label.html
│   │   │   │   ├── pagination/
│   │   │   │   │   ├── pagination.ts
│   │   │   │   │   ├── pagination.html
│   │   │   │   │   └── pagination.service.ts
│   │   │   │   └── skeleton/
│   │   │   │       ├── product-skeleton.component.ts
│   │   │   │       └── product-skeleton.component.html
│   │   │   └── index.ts              # Barrel file exports
│   │   │
│   │   ├── store-front/              # Front-facing store feature
│   │   │   ├── store-front.routes.ts # Store-front routing
│   │   │   ├── front-navbar/
│   │   │   │   ├── front-navbar.ts
│   │   │   │   └── front-navbar.html
│   │   │   ├── layouts/
│   │   │   │   ├── store-front-layout.ts
│   │   │   │   └── store-front-layout.html
│   │   │   └── pages/
│   │   │       ├── home-page/
│   │   │       │   ├── home-page.ts
│   │   │       │   └── home-page.html
│   │   │       ├── gender-page/
│   │   │       │   ├── gender-page.ts
│   │   │       │   └── gender-page.html
│   │   │       ├── product-page/
│   │   │       │   ├── product-page.ts
│   │   │       │   └── product-page.html
│   │   │       └── not-found-page/
│   │   │           ├── not-found-page.ts
│   │   │           └── not-found-page.html
│   │   │
│   │   ├── admin-dashboard/          # Admin dashboard feature
│   │   │   ├── admin-dashboard.route.ts
│   │   │   ├── layouts/
│   │   │   │   └── admin-dashboard-layout/
│   │   │   │       ├── admin-dashboard-layout.ts
│   │   │   │       └── admin-dashboard-layout.html
│   │   │   └── pages/
│   │   │       ├── products-admin-page/
│   │   │       │   ├── products-admin-page.ts
│   │   │       │   └── products-admin-page.html
│   │   │       └── product-admin-page/
│   │   │           ├── product-admin-page.ts
│   │   │           ├── product-admin-page.html
│   │   │           └── product-details/
│   │   │               ├── product-details.ts
│   │   │               └── product-details.html
│   │   │
│   │   │
│   │   └── utils/                    # Utility functions & helpers
│   │       ├── form-utils.ts
│   │       └── index.ts              # Barrel file exports
│   │
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.development.ts
│   │
│   ├── main.ts                       # Application entry point
│   ├── styles.css                    # Global styles
│   └── index.html
│
├── public/
│   └── assets/
│       ├── images/
│       └── fonts/
│           └── montserrat/
│
├── angular.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
└── package.json
```

## Architecture Overview

### Features

- **core**: Singleton services and global utilities (loading, error handling)
- **auth**: Authentication, login, registration, and route guards
- **products**: Product management, components, and utilities
- **shared**: Reusable components, pipes, and directives
- **store-front**: Public-facing user interface
- **admin-dashboard**: Administrative interface for product management
- **utils**: Helper functions and form utilities

### Barrel Files

The project uses barrel files (`index.ts`) for cleaner imports:

```typescript
// ✅ Clean import from barrel file
import { AuthService, IsAdminGuard } from '@auth';

// ✅ Specific import (still works)
import { AuthService } from '@auth/services/auth.service';
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
