# `@natoboram/gigachads.ts-server`

An example server for the most gigachad project template for TypeScript monorepos.

- Routing with [Express](https://github.com/expressjs/express)

The routing uses types from [@natoboram/gigachads.ts-client](https://github.com/NatoBoram/gigachads.ts/tree/main/packages/client). Types are not verified during runtime using a schema, but rather by the TypeScript compiler at build time. This solution is great if the only client expected to connect to the server is the one provided in this monorepo. Otherwise, an OpenAPI specs should be provided.
