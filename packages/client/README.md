# `@natoboram/gigachads.ts-client`

An example client for the most gigachad project template for TypeScript monorepos.

This is a pure TypeScript client that exposes its types for usage inside the server project. There are no runtime validations; instead, types are verified by the TypeScript compiler at build time. This solution is great if the only client expected to connect to the server is the one provided in this monorepo. Otherwise, an OpenAPI specs should be provided.
