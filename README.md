<div align="center">
  <img src="packages/web/static/accelerate-starter.png" width="200" title="Accelerate Starter">
  <h3>
    An opinionated universal web app + API starter kit to facilitate rapid and scalable development using NextJS, FeathersJS, and MongoDB.
  </h3>
  <div>
    Accelerate is a starter project to enable a team to quickly jump past common hurdles such as user authentication, unit and integration tests, CI/CD, and tooling to begin solving their core business problems.
  </div>
  <h2></h2>
  <div>
    <strong>Web</strong>
    <br />
    <a href="https://nextjs.org/">NextJS</a>,
    <a href="https://reactjs.org/">React</a>,
    <a href="https://react-redux.js.org/">React Redux</a>,
    <a href="">Redux Saga</a>,
    <a href="">Semantic UI</a>, and
    <a href="">Babel</a>
    <br />
    <strong>API</strong>
    <br />
    <a href="">Socket.IO</a>,
    <a href="">FeathersJS</a>,
    <a href="">Nodemon</a>,
    <a href="">Express</a>,
    <a href="">Mongoose</a>, and
    <a href="">Winston</a>
    <br />
    <strong>Testing</strong>
    <br />
    <a href="">Cypress</a>,
    <a href="">Mocha</a>,
    <a href="">Enzyme</a>, and
    <a href="">Chai</a>
    <br />
    <strong>Tooling</strong>
    <br />
    <a href="">Typescript</a>,
    <a href="">TSLint (Airbnb Conventions)</a>,
    <a href="">Prettier</a>,
    <a href="">Lerna</a>,
    <a href="">Commitizen</a>, and
    <a href="">Commitlint</a>
    <br />
    <strong>Hosting</strong>
    <br />
    <a href="">Zeit Now</a>
  </div>

  <br />

  [![Build Status](https://travis-ci.com/chase-adams/accelerate-starter.svg?branch=master)](https://travis-ci.com/chase-adams/accelerate-starter)
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

## License

Licensed under the [MIT license](LICENSE).
