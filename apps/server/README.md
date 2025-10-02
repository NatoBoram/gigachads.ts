# `@natoboram/gigachads.ts-server`

[![Coverage](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fnatoboram.github.io%2Fgigachads.ts%2Fcoverage-server%2Fcoverage-summary.json&query=total.branches.pct&suffix=%25&logo=Vitest&label=Coverage&color=acd268)](https://natoboram.github.io/gigachads.ts/coverage-server)

An example server for the most gigachad project template for TypeScript monorepos.

- Routing with [Express](https://github.com/expressjs/express)

The routing uses types from [@natoboram/gigachads.ts-client](https://github.com/NatoBoram/gigachads.ts/tree/main/packages/client). Types are not verified during runtime using a schema, but rather by the TypeScript compiler at build time. This solution is great if the only client expected to connect to the server is the one provided in this monorepo. Otherwise, an OpenAPI specs should be provided.
