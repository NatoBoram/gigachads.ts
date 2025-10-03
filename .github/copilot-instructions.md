# Copilot Instructions

This is a TypeScript monorepo with pnpm workspaces and Turborepo that follows a strict type-first, functional programming style. The project serves as a "gigachad" template showcasing modern TypeScript tooling and patterns.

**Packages:**

- [@natoboram/gigachads.ts](..)
- [@natoboram/gigachads.ts-server](../apps/server) Express.js REST API for TODO management with token-based auth
- [@natoboram/gigachads.ts-client](../packages/client) Type-safe HTTP client library that mirrors server endpoints
- [@natoboram/gigachads.ts-config](../packages/config) Shared ESLint/TypeScript configurations

## Critical Development Patterns

### Monorepo Management

- **Always use `pnpm`** - manual `package.json` edits are forbidden
- **Build dependencies first**: Run `pnpm build` before linting (workspaces depend on each other)
- **Prefix commands** for workspace-specific operations:

  ```sh
  pnpm --prefix=apps/server dev
  pnpm --prefix=packages/client build
  pnpm --prefix=packages/config lint
  ```

### Type Safety & Error Handling

- **Ban `as` type assertions entirely** - use type guards, schema validation, or accessors instead
- **Catch errors as `unknown`** and type-check at runtime before use
- **Add `cause` to thrown errors** for debugging context
- **Use `.catch()` over `try/catch`** for control flow
- **Log full error objects** instead of `error.message` or `String(error)`
- **No `eslint-disable` or `@ts-ignore`** without clear inline comments explaining necessity
- **Log as `warn` instead of `error`** when execution continues
- **Add `.catch()` to database calls** and async operations

### Express.js Handlers Pattern

```ts
import type { Locals, RequestHandler } from "express"
import type { ParamsDictionary } from "express-serve-static-core"
import type { ParsedQs } from "qs"

/** Every handler follows this strict typing pattern. */
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

- **Promise-wrapped async tests** to avoid mutations:

  ```ts
  const response = await new Promise<GetTodosResponse>(resolve => {
  	const res = { json: resolve, status: (_: number) => res } as Response
  	getTodos(req, res, vi.fn())
  })
  ```

- **Setup functions** for shared test initialization
- **Test file structure**: `describe(functionName)` → `test(expectedOutcome)`
- **Use vitest framework** exclusively - place tests adjacent as `*.test.ts`
- **Include error cases and edge conditions** in test coverage
- **Use mocks sparingly** and only when necessary

### Code Style Requirements

- **Use `readonly` for all DTO interface properties**
- **Extract repeated inline types** into named interfaces
- **Replace `let` with `const`** and functional patterns (map/filter/reduce over forEach)
- **Early returns** over nested if/else
- **`index.ts` files only re-export** - no declarations
- **Replace `enum` with `as const` objects** and type aliases
- **Use `Record<KeyType, ValueType>`** for explicitly typed object keys from external types
- **Move function-wide `try/catch` logic** into separate functions to avoid scope pollution
- **Use `getOrCreate*` helpers** for Map patterns instead of `let` reassignments
- **Replace classes with functions** when no private state or reusable behavior is needed
- **Combine nested conditions** into single guards with early returns
- **Use `switch` over multiple `if/else`** for known string literals
- **Extract blocks with long comments** into named functions
- **Split large functions** that mix validation, action, and error handling into separate functions
- **Use `for` loops instead of `while` loops**
- **Move `let` declarations** into `for` loop headers when possible
- **Simplify boolean expressions** (`a ? true : false` → `a`)
- **Convert regular comments** to TSDoc comments for declarations
- **Remove comments that repeat code** or contain vibe coding prompts

### Commit Convention

- **Use gitmoji for commit messages** - prefix commits with relevant emoji and descriptive message (see <https://gitmoji.dev>)

### Dependency Management

- **Manually editing `package.json` dependencies is forbidden** - use `pnpm` commands only
- **Use existing SDK or packages** instead of reimplementing DTOs for third-party APIs
- **Use dedicated API clients** instead of raw `fetch` or `axios` calls

## Essential Commands

### Development Workflow

```bash
pnpm install && pnpm build && pnpm lint:fix # Initial setup
pnpm dev                                    # Start dev server
pnpm test:coverage                          # Run tests with coverage
```

### Monorepo Tools

- **Syncpack**: Keeps versions synchronized across workspaces (`pnpm syncpack fix-mismatches`)
- **Turborepo**: Manages build cache and task dependencies (see `turbo.json`)

### Docker Operations

```bash
pnpm docker:build:server    # Build server image
pnpm docker:run:server      # Run container
pnpm docker:kill:server     # Kill running containers
```

## Project-Specific Integrations

### TypeScript Native Preview

- Uses `@typescript/native-preview` for faster TypeScript execution
- Configured with `tsgo` for building instead of traditional `tsc`

### Strict ESLint Rules

- Custom config in `packages/config/eslint.config.js`
- Bans type assertions, enforces explicit member accessibility
- Uses `func-style: declaration` for consistent function declarations

### Workspace Dependencies

- Client package provides types for server handlers via `@natoboram/gigachads.ts-client`
- Server imports client types for request/response typing
- Config package provides shared linting rules

## Key Files to Understand

- `turbo.json`: Task orchestration and caching strategy
- `packages/config/eslint.config.js`: Project coding standards
- `apps/server/src/handlers/*.ts`: API endpoints
- `packages/client/src/gigachads_server_client.ts`: Client
- `vitest.config.ts`: Test configuration (root + workspace-specific)
