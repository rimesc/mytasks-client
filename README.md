# MyTasks Client

Client side of a toy web application I'm writing as a learning exercise. It's a variation on the traditional 'todo' application, but with some of the features of an issue tracker.

This part uses [Angular 4](https://angular.io).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build. You can also use the `--base-href` option to override the `<base>` element if you intend to serve from somewhere other than the domain root.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e --port 4200` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).  The `--port`
option is important because otherwise the client is served on a random port, which won't match the allowed callback URL.
Before running the tests make sure you are running the [server side](https://github.com/rimesc/mytasks-server) in dev mode.
See the notes about authentication below.

## Authentication

This project integrates with [Auth0](https://auth0.com) to do user authentication.

To use the application as is, you'll need sign up for a (free) Auth0 account and set up a client. For development, the allowed callback URLs should include `http://localhost:4200/login`.

Replace `src/environments/secret.ts` with a file containing your client details in the following form:

    export const secret = {
      apiBase: 'YOUR_API_BASE',
      authClient: 'YOUR_CLIENT_ID',
      authDomain: 'YOUR_AUTH_DOMAIN',
      authCallback: 'YOUR_AUTH_CALLBACK'
    };

The `apiBase` and `authCallback` fields are only needed by production builds. In development, defaults of `http://localhost:8080/api/` and `http://localhost:4200/login` respectively are used.

To run the end-to-end tests, you will also need to replace `e2e/credentials.ts` with a file containing some valid user credentials as follows:

    export const EMAIL = 'me@example.com';
    export const PASSWORD = 'p&ssw0rd';

This repository is set up to use [git-crypt](https://github.com/AGWA/git-crypt), if installed, to commit both `secret.ts` and `credentials.ts` in an encrypted form. If you don't have git-crypt installed, be careful not to commit changes to those files.
