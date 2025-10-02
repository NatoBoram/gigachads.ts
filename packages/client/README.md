# `@natoboram/gigachads.ts-client`

[![Coverage](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fnatoboram.github.io%2Fgigachads.ts%2Fcoverage-client%2Fcoverage-summary.json&query=total.branches.pct&suffix=%25&logo=Vitest&label=Coverage&color=acd268)](https://natoboram.github.io/gigachads.ts/coverage-client)

An example client for the most gigachad project template for TypeScript monorepos.

This is a pure TypeScript client that exposes its types for usage inside the server project. There are no runtime validations; instead, types are verified by the TypeScript compiler at build time. This solution is great if the only client expected to connect to the server is the one provided in this monorepo. Otherwise, an OpenAPI specs should be provided.
