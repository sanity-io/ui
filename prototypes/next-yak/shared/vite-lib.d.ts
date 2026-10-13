import type { UserConfig } from 'vite';
export interface LibBuildOptions {
    /** package.json `name` */
    name: string;
    /** package.json `version` */
    version: string;
}
/**
 * Library build shared by `@yak-eval/ui-v1` and `@yak-eval/ui-v2`.
 *
 * - `vite build` in library mode on Vite 8 (rolldown), React externalized, `next-yak/internal`
 *   externalized: the runtime is a regular `dependencies` entry of the published package, like
 *   `styled-components` is for `@sanity/ui` today.
 * - Default build (`dist/`): `prefix` derived from `name@version` (see `yak-prefix.ts`).
 * - `YAK_UNSAFE=1` (`dist-unsafe/`): next-yak's out-of-the-box naming, used only to reproduce the
 *   vanilla-extract 4.4.3→4.4.4 class collision on the `unsafe.html` page of the app.
 */
export declare function createLibConfig({ name, version }: LibBuildOptions): UserConfig;
