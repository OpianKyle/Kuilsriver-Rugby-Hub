---
name: Render build considerations
description: Deployment details for this app's monorepo on Render.
---

Keep assets required by the deployed app inside tracked artifact directories, such as the web artifact's `public/images` or source assets. In this workspace, a global Git ignore excludes files under `attached_assets`, so Render's repository clone does not contain them.

**Why:** Render's Vite build failed when the club logo was imported from `attached_assets`, even though the file existed in the development workspace.

**How to apply:** Before deployment, check that every image, font, or other runtime asset referenced by the web artifact is committed within the artifact.

Use the `pnpm` command already available in Render's Node environment; do not run `corepack enable` there because it may try to rewrite the read-only `/usr/bin/pnpm` shim.

**Why:** The Render build failed with `EROFS` while Corepack attempted to unlink that system path.

**How to apply:** Use `pnpm install --frozen-lockfile` directly in Render build commands.
