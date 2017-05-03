# MyTasks Client

Client side of a toy web application I'm writing as a learning exercise. It's a variation on the traditional 'todo' application, but with some of the features of an issue tracker.

This part uses [Angular 2](https://angular.io).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build. You can also use the `--base-href` option to override the `<base>` element if you intend to serve from somewhere other than the domain root.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`. You also need to be running the [server side](https://github.com/rimesc/mytasks-server) in dev mode. See the notes about authentication below.

## Authentication

This project integrates with [Auth0](https://auth0.com) to do user authentication. To use it as is, you'll need sign up for a (free) account and set up a client. For development, the allowed callback URLs should include `http://localhost:4200/login`.

Replace `src/environments/secret.ts` with a file containing your client details in the following form:

    export const secret = {
      apiBase: 'YOUR_API_BASE',
      authClient: 'YOUR_CLIENT_ID',
      authDomain: 'YOUR_AUTH_DOMAIN',
      authCallback: 'YOUR_AUTH_CALLBACK'
    };

The `apiBase` and `authCallback` fields are only needed by production builds. In development they're defaulted to `http://localhost:8080/api/` and `http://localhost:4200/login` respectively.

To run the end-to-end tests, you will also need to replace `e2e/credentials.ts` with a file containing some valid user credentials as follows:

    export const EMAIL = 'me@example.com';
    export const PASSWORD = 'p&ssw0rd';

This repository is set up to use [git-crypt](https://github.com/AGWA/git-crypt), if installed, to commit both `secret.ts` and `credentials.ts` in an encrypted form. If you don't have git-crypt installed, be careful not to commit changes to those files.
