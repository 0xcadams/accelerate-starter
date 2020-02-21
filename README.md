<div align="center">
  <img src="packages/web/public/accelerate-starter.png" width="200" title="Accelerate Starter">
  <h3>
    An opinionated universal web app + API starter kit to facilitate rapid and scalable development using NextJS, FeathersJS, and MongoDB.
  </h3>
  <div>
    Accelerate is a starter project to enable a team to quickly jump past common hurdles such as user authentication, password resets, unit and integration tests, CI/CD, and tooling to begin solving their core business problems.
  </div>
  <h2></h2>
  <div>
    <strong>Web</strong>
    <br />
    <a href="https://nextjs.org/">NextJS</a>,
    <a href="https://reactjs.org/">React</a>,
    <a href="https://react-redux.js.org/">React Redux</a>,
    <a href="https://redux-saga.js.org/">Redux Saga</a>,
    <a href="https://material-ui.com/">Material UI</a>, and
    <a href="https://babeljs.io/">Babel</a>
    <br />
    <strong>API</strong>
    <br />
    <a href="https://feathersjs.com/">FeathersJS</a>,
    <a href="https://mongoosejs.com/">Mongoose</a>,
    <a href="https://nodemon.io/">Nodemon</a>,
    <a href="https://expressjs.com/">Express</a>, and
    <a href="https://github.com/winstonjs/winston">Winston</a>
    <br />
    <strong>Testing</strong>
    <br />
    <a href="https://www.cypress.io/">Cypress</a>,
    <a href="https://mochajs.org/">Mocha</a>,
    <a href="https://airbnb.io/enzyme/">Enzyme</a>,
    <a href="https://www.chaijs.com/">Chai</a>.
    <br />
    <strong>Tooling</strong>
    <br />
    <a href="https://www.typescriptlang.org/">Typescript</a>,
    <a href="https://palantir.github.io/tslint/">TSLint (Based on Airbnb)</a>,
    <a href="https://prettier.io/">Prettier</a>,
    <a href="https://lernajs.io/">Lerna</a>,
    <a href="https://github.com/commitizen/cz-cli">Commitizen</a>, and
    <a href="https://github.com/conventional-changelog/commitlint">Commitlint</a>
    <br />
    <strong>Hosting</strong>
    <br />
    <a href="https://zeit.co/docs">Zeit Now</a>
  </div>

  <br />

[![Uptime Robot](https://img.shields.io/uptimerobot/ratio/m782175114-036d055bce99279de3d423f5.svg)](https://stats.uptimerobot.com/49G0WUOLW)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://lbesson.mit-license.org/)

</div>

## Getting Started

First, start the MongoDB database using [Docker](https://www.docker.com/).

```
docker run --name accelerate-mongo -d -p 27017:27017 mongo
```

Then, bring up both the web app and API by running:

```bash
yarn install
yarn start
```

This will use [lerna](https://github.com/lerna/lerna) to start each service in the `packages/` folder.

### Web

Also, one can start the web app individually by running:

```bash
cd web/
yarn install
yarn start
```

The web interface is built on NextJS. To learn more about it, visit [nextjs.org](https://nextjs.org/).

### API

Similarly, start the API individually by running:

```bash
cd api/
yarn install
yarn start
```

To learn more about Feathers, visit [feathersjs.com](http://feathersjs.com) or jump right into [the Feathers docs](http://docs.feathersjs.com).

## Project Structure

_Further design decisions/walkthrough of project structure is under coming soon..._

## Design Decisions

A few points about the cool consequences of decisions made in the design of this project:

**Shared Types**: Since Typescript is used on the frontend and backend, types are shared across applications via the `@lieuu/core` module. This means that the contract remains strongly typed and consistent between the API and consumers.

**REST Endpoints**: The API uses FeathersJS as its backbone - this enables a user to write minimal code to wire Express to make RESTful endpoints - simply add a model, define a new FeathersJS service, and it handles the creation of CRUD operations on that resource. This greatly reduces boilerplate code that needs to be maintained.

**NextJS**: The frontend is based upon NextJS, which includes a lot of opinion by default. This again reduces the amount of boilerplate code which needs to be maintained - Webpack configuration is minimal, development/building/deployment is easy, and documentation is great.

**Automated Tests**: The end-to-end tests using Cypress are easy to modify and automatically run against each deployment to ZEIT Now. A comment is left on a PR with a link to the deployment, and the build will fail if the deployment does not pass end-to-end tests. This means significantly less maintenance of a single "staging" environment, but `n` number of "staging" environments with automated tests to reduce QA overhead.

## License

Licensed under the [MIT license](LICENSE).
