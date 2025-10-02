# Gemini

This is a TypeScript monorepo project named `@natoboram/gigachads.ts`. It serves as a project template. It is structured using pnpm workspaces and Turborepo.

- **Server:** The server is an Express application that provides a simple TODO API. It uses a token-based authentication middleware.
- **Client:** The client is a TypeScript library for interacting with the server's API.
- **Tooling:** The project is equipped with modern tooling, including:
  - **Build:** `tsgo` for building TypeScript.
  - **Testing:** `vitest` for unit testing and coverage.
  - **Linting:** `eslint` and `prettier` for code style and formatting.
  - **Monorepo Management:** `pnpm` workspaces and `turborepo` for managing the monorepo.
  - **Documentation:** `typedoc` for generating documentation.

## Building and Running

Commands can be run in the individual project or at the project root.

```sh
pnpm --prefix=apps/server
pnpm --prefix=packages/client
pnpm --prefix=packages/config
```

To make sure that everything works as expected, run these commands:

```sh
pnpm install && pnpm run build && pnpm run lint:fix
```

### Installation

```sh
pnpm install
```

### Development

To run the development server:

```sh
pnpm dev
```

This will start the server and watch for changes.

### Build

To build the entire project:

```sh
pnpm build
```

### Testing

To run the tests:

```sh
pnpm test
```

To run the tests with coverage:

```sh
pnpm test:coverage
```

### Linting

To lint the code:

```sh
pnpm lint
```

To fix linting errors:

```sh
pnpm lint:fix
```

### Cleanup

If you need to delete all temporary files, run:

```sh
pnpm run clean
```

You'll need to re-install dependencies and re-build the project to continue developing after that.

## Development Conventions

- **Code Style:** The project uses ESLint and Prettier for code style and formatting. The configuration can be found in `packages/config/eslint.config.js` and `.prettierrc.yaml`.
- **Testing:** The project uses Vitest for unit testing. Test files are located next to the source files with a `.test.ts` extension. The configuration can be found in `vitest.config.ts`.
- **Commits:** The project follows the Conventional Commits specification.
- **Versioning:** The project uses Syncpack to keep package versions in sync.

### Testing Conventions

- **Immutability:** Use `const` instead of `let` to avoid side-effects and mutable variables.
- **`setup` function:** When tests in a file share the same setup, a `setup` function can be used to reduce code duplication. It should initialize the variables needed for the tests.
- **Type-safe tests:**
	- Infer types from functions to make tests more robust.
	- Use generic parameters to ensure type safety.
- **Promise-wrapped async tests:** Async tests are written using a `Promise` that resolves with the result of the handler. This is a consistent pattern across all the handler tests. This is done to avoid side-effects and mutable variables, which makes the code easier to read and reason about.

	```ts
	const response = await new Promise<GetTodosResponse>(resolve => {
		const res = { json: resolve, status: (_: number) => res } as Response
		getTodos(req, res, vi.fn())
	})
	```

- **Fluent response mocking:** The mock response object in the handler tests uses a fluent interface for the `status` method, which allows chaining.

	```ts
	const res = { json: resolve, status: (_: number) => res } as Response
	```
