---
applyTo:
  - "**/*.ts"
  - "**/*.tsx"
---
## CommandKit & Discord.js Architecture Rules
- **Named Exports Only:** All slash commands must strictly export the following named structures:
  - `command`: Typed as `CommandData` containing basic registration information (`name`, `description`).
  - `metadata`: Optional but strictly typed as `CommandMetadata` (e.g., handles configurations like `ratelimit` or `aliases`).
  - `chatInput`: Typed as `ChatInputCommand`, providing the async execution context destructured as `{ interaction }`.
- **UI Components (JSX):** Use CommandKit's built-in JSX elements (`<Container>`, `<TextDisplay>`, `<Separator>`) rather than building raw layout objects or strings manually.
- **Message Flags:** Interaction responses returning V2 Components must pass the combined array flags `[MessageFlags.IsComponentsV2, MessageFlags.Ephemeral]` when sending hidden layout replies.
- **Options:** When using fields such as `options` in `CommandData`, explicitly set the `command` to `as ChatInputApplicationCommandData as CommandData`. This fixes the TypeScript compiler, for some odd reason

## TypeScript & TSX Rules
- **Type Imports:** Always explicitly import types using `import type { ... } from "..."` or `import { type ... } from "..."`. All structural code, components, and variables must use regular imports.
- **Strict Typing:** Avoid loosely typed definitions like `any` or `unknown`. Enforce precise type constraints across the entire workspace.

## Scripts & Runtime Command Guidelines
- **Development Mode:** Run the workspace environment using `pnpm dev`. Avoid production lifecycle scripts (`pnpm build`, `pnpm start`) unless compiling for a staging or production destination.
- **Linting & Quality:** Enforce zero-error builds via `pnpm lint`. Always resolve warning underlines before submitting code.
