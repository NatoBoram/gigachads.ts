# Gemini

This is a TypeScript monorepo with pnpm workspaces and Turborepo. It serves as a "gigachad" template, showcasing a strict type-first, functional programming style with modern TypeScript tooling.

**Packages:**

- [@natoboram/gigachads.ts](.)
- [@natoboram/gigachads.ts-server](apps/server): An Express.js REST API for TODO management with token-based authentication.
- [@natoboram/gigachads.ts-client](packages/client): A type-safe HTTP client library that mirrors server endpoints.
- [@natoboram/gigachads.ts-config](packages/config): Shared ESLint and TypeScript configurations.

## Essential Commands

### Development Workflow

```sh
# Initial setup and validation
pnpm install && pnpm build && pnpm lint:fix

# Start the development server (with watch mode)
pnpm dev

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Auto-fix code
pnpm lint:fix

# Lint code
pnpm lint
```

### Monorepo & Workspace Commands

- **Syncpack**: Keeps versions synchronized across workspaces (`pnpm syncpack fix-mismatches`).
- **Turborepo**: Manages build cache and task dependencies (see `turbo.json`).
- **Prefix commands** for workspace-specific operations:

  ```sh
  pnpm --prefix=apps/server dev
  pnpm --prefix=packages/client build
  pnpm --prefix=packages/config lint
  ```

### Docker Operations

```bash
pnpm docker:build:server # Build server image
pnpm docker:run:server   # Run container
pnpm docker:kill:server  # Kill running containers
```

## Critical Development Patterns

### Monorepo Management

- **Always use `pnpm`** for dependency management. Manual `package.json` edits are forbidden.
- **Build dependencies first**: Run `pnpm build` before linting, as workspaces depend on each other.

### Type Safety & Error Handling

- **Ban `as` type assertions entirely**. Use type guards, schema validation, or accessors with runtime checks instead.
- **Catch errors as `unknown`** and perform runtime type-checking before use.
- **Add a `cause` to all thrown `Error` objects** to provide better debugging context.
- **Use `.catch()` for error handling** instead of `try/catch` for control flow.
- **Log the full error value**, not just `error.message`.
- **Do not use `eslint-disable`, `@ts-ignore`, etc.** without a clear inline comment explaining why it's necessary.
- **Log as `warn` instead of `error`** when execution can continue.
- To handle Express query parameters that can be strings at runtime but are used as numbers, use the nullish coalescing operator (`??`) to avoid linting errors. This creates a `number | string` type, making the `Number()` conversion valid.

  ```ts
  const limit = Number(req.query.limit ?? "10")
  ```

### Code Style & Structure

- **Use `readonly`** for all DTO interface properties and where no mutation is expected.
- **Extract repeated or large inline types** into named interfaces.
- **Replace `let` with `const`** by using functional patterns (`map`, `filter`, `reduce` over `forEach`) and helper functions.
- **Use early returns (guards)** instead of nested `if/else` statements.
- **`index.ts` files should only re-export** and not contain any declarations.
- **Replace TypeScript `enum` with `as const` objects** and type aliases for better type safety and bundle size.
- **Use `Record<KeyType, ValueType>`** for explicitly typing object keys derived from an external type.
- **Extract logic from `try/catch` blocks** into separate functions to keep scope clean.
- **Split large functions** that mix validation, business logic, and error handling into smaller, focused functions.
- **Use `switch`** over multiple `if/else` for known string literals.
- **Simplify boolean expressions** (e.g., `a ? true : false` becomes `a`).
- **Convert comments on declarations to TSDoc comments**. Remove comments that only repeat what the code does.

### Express.js Handlers Pattern

Handlers follow a strict typing pattern to ensure type safety between the server and client.

```ts
// Example from apps/server/src/handlers/get_todo.ts
import type { Locals, RequestHandler } from "express"
import type { ParamsDictionary } from "express-serve-static-core"
import type { ParsedQs } from "qs"

type GetTodo = RequestHandler<
	ParamsDictionary,
	GetTodoResponse,
	GetTodoBody,
	ParsedQs,
	Locals
>

export const getTodo: GetTodo = ((req, res) => {
	// Implementation
}) satisfies GetTodo
```

### Testing Conventions

- **Promise-wrapped async tests**: To avoid side effects and mutable variables, wrap async handler calls in a `Promise`.

  ```ts
  const response = await new Promise<GetTodosResponse>(resolve => {
  	const res = { json: resolve, status: (_: number) => res } as Response
  	getTodos(req, res, vi.fn())
  })
  ```

- **Type-safe tests**: For Express handlers, infer request and response types directly from the handler function to avoid manual mocking and improve robustness.

  ```ts
  // In a test file
  import { getTodo } from "./get_todo.ts"

  type Request = Parameters<typeof getTodo>[0]
  type Response = Parameters<typeof getTodo>[1]
  ```

- **`setup` functions**: Use a `setup` function for shared test initialization to reduce duplication.
- **Structure**: Test files are co-located with source files (`*.test.ts`). `describe` blocks are named after the function/class, and `test` blocks describe the expected outcome.
- **Mocks**: Use mocks sparingly.

### Commit Convention

- **Use gitmoji for commit messages**. See <https://gitmoji.dev>.

### Dependency Management

- Use `pnpm` commands to manage dependencies.
- Prefer existing SDKs or packages over reimplementing DTOs for third-party APIs.

## Project-Specific Integrations

- **`tsgo`**: Uses `@typescript/native-preview` for faster TypeScript execution during the build process.
- **Strict ESLint Rules**: A custom, strict ESLint configuration is in `packages/config/eslint.config.js`.
- **Workspace Dependencies**: The `server` package imports types from the `client` package to ensure request/response consistency.

## Key Files to Understand

- `turbo.json`: Defines the monorepo task pipeline and caching strategy.
- `packages/config/eslint.config.js`: The source of truth for project-wide coding standards.
- `apps/server/src/handlers/*.ts`: Individual API endpoint handlers.
- `packages/client/src/gigachads_server_client.ts`: The type-safe client for the server API.
- `vitest.config.ts`: The root and workspace-specific test configurations.
