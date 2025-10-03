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
  - **Containerization:** `Docker` for containerizing the application.
  - **CI/CD:** GitHub Actions for continuous integration and delivery. `act` for running workflows locally.
  - **Dependency Management:** `dependabot` for automatic dependency updates. `syncpack` for keeping package versions in sync.
  - **Development Environment:** `vscode` with recommended extensions for a better development experience. `gh` for interacting with GitHub from the command line.

## Packages

- [@natoboram/gigachads.ts](.)
- [@natoboram/gigachads.ts-server](apps/server)
- [@natoboram/gigachads.ts-client](packages/client)
- [@natoboram/gigachads.ts-config](packages/config)

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

It might be necessary to build the project before linting it, particularly if a workspace dependency was modified.

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

You'll need to re-install dependencies and re-build the project to continue developing after that, so don't do it unless you really need to.

## Development Conventions

- **Code Style:** The project uses ESLint and Prettier for code style and formatting. The configuration can be found in `packages/config/eslint.config.js` and `.prettierrc.yaml`.
- **Testing:** The project uses Vitest for unit testing. Test files are located next to the source files with a `.test.ts` extension. The configuration can be found in `vitest.config.ts`.
- **Commits:** The project follows the [gitmoji](https://gitmoji.dev) convention.
- **Versioning:** The project uses Syncpack to keep package versions in sync.

### Coding Conventions

#### Error Handling

- Do not use `eslint-disable`, `eslint-disable-next-line`, `@ts-expect-error`, or `@ts-ignore` without a clear inline comment explaining why it's necessary.
- Use `.catch()` for error handling instead of `try/catch` for control flow.
- Type caught errors as `unknown`.
- Log the full error value instead of just the message.
- Add a `cause` to thrown errors.
- Log as `warn` instead of `error` when execution continues.

#### Code Structure

- Use early returns instead of nested `if/else` or loops with complex branching.
- Move logic inside `try/catch` or top-level `if/else` to its own function.
- Replace `let` used to accumulate a value with a function that returns the final value.
- Replace `let` with a single conditional reassignment with a `const` and a ternary or a helper function.
- Use a `getOrCreate*` helper for Map get-or-create patterns.
- Combine nested conditions into a single guard with an early return.
- Replace `forEach` with side effects with `map`, `filter`, or `reduce`.
- Introduce intermediate variables for non-trivial logic in string interpolation.
- If a class does not implement a reusable behavior or hide private state, replace it with simple functions.
- Move class methods that do not access private state to standalone functions.
- Destructure parameters inside the function body if it makes the signature easier to read.
- Combine nested `if` blocks with a single success path into one `if`.
- Extract blocks of code with long comments into named functions.
- Use `switch` instead of multiple `if/else` for known string literals.
- Split large functions that mix validation, action and error handling into separate functions.
- `index.ts` files should only re-export and not declare anything.

#### Types and Interfaces

- Ban all `as` type assertions. Use type guards, schema validation, adapters, or accessors with checks instead.
- Check `any` or `unknown` types at runtime before use.
- Mark interface and class properties as `readonly` when no mutation is expected.
- All properties of DTO interfaces should be `readonly`.
- Replace tuples with interfaces.
- Use `as const` objects with type aliases instead of TypeScript `enum`.
- Explicitly type object keys derived from an external type using `Record<KeyType, ValueType>`.
- Extract repeated inline shape definitions into named interfaces.
- Extract large inline object type literals into named interfaces with `readonly` properties.
- Create an interface for return type objects declared inline.
- Avoid types that lose information about a full `Error`. Return an `Error` directly instead.
- Avoid overly generic types.

#### Naming and Comments

- Do not repeat the name and type in comments or docstrings.
- Convert regular comments preceding a declaration to TSDoc comments.
- Remove comments that repeat what the code does.
- Remove vibe coding prompts from comments.
- Variable names should not start with an uppercase letter unless they are types or components.

#### Style

- Simplify verbose boolean expressions (e.g., `a ? true : false` to `a`).
- Move nested named function declarations to the top level.
- Use `for` loops instead of `while` loops.
- Move `let` declarations into `for` loop headers when possible.

### Dependency Management

- Manually editing dependencies in `package.json` is completely forbidden at all times. This can only be done by using the `pnpm` command.

### Testing Conventions

- **`setup` function:** When tests in a file share the same setup, a `setup` function can be used to reduce code duplication. It should initialize the variables needed for the tests.
- **Type-safe tests:**
  - Infer types from functions to make tests more robust.
  - Use generic parameters to ensure type safety.
- **Promise-wrapped async tests:** Async tests are written using a `Promise` that resolves with the result of the handler. This is done to avoid side-effects and mutable variables, which makes the code easier to read and reason about.

  ```ts
  const response = await new Promise<GetTodosResponse>(resolve => {
  	const res = { json: resolve, status: (_: number) => res } as Response
  	getTodos(req, res, vi.fn())
  })
  ```

- **Naming:**
  - `describe` blocks are named after the function or class being tested.
  - `test` blocks are named after the expected outcome (e.g., an HTTP status code) or the method being tested.
- **Mocks:** Use mocks sparingly and only when necessary.
- **Coverage:** Include tests for error cases and edge conditions.
