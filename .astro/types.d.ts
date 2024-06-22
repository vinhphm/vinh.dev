declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"2024-dev-setup.md": {
	id: "2024-dev-setup.md";
  slug: "2024-dev-setup";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2024-site-refresh-improve-accessibility.md": {
	id: "2024-site-refresh-improve-accessibility.md";
  slug: "2024-site-refresh-improve-accessibility";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"change-macos-dock-icon-size.md": {
	id: "change-macos-dock-icon-size.md";
  slug: "change-macos-dock-icon-size";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"cloudflare-pages-domain-redirects-vi.md": {
	id: "cloudflare-pages-domain-redirects-vi.md";
  slug: "cloudflare-pages-domain-redirects-vi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"cloudflare-pages-domain-redirects.md": {
	id: "cloudflare-pages-domain-redirects.md";
  slug: "cloudflare-pages-domain-redirects";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"cloudflare-pages-surprised-me.md": {
	id: "cloudflare-pages-surprised-me.md";
  slug: "cloudflare-pages-surprised-me";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"custom-domains-and-routes-in-cloudflare-workers.md": {
	id: "custom-domains-and-routes-in-cloudflare-workers.md";
  slug: "custom-domains-and-routes-in-cloudflare-workers";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"customize-git-bash.md": {
	id: "customize-git-bash.md";
  slug: "customize-git-bash";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"default-apps-2023.md": {
	id: "default-apps-2023.md";
  slug: "default-apps-2023";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"developer-should-write-blog.md": {
	id: "developer-should-write-blog.md";
  slug: "developer-should-write-blog";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"fresh-and-deno.md": {
	id: "fresh-and-deno.md";
  slug: "fresh-and-deno";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"from-nextjs-to-astro.md": {
	id: "from-nextjs-to-astro.md";
  slug: "from-nextjs-to-astro";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"glitching-logo.md": {
	id: "glitching-logo.md";
  slug: "glitching-logo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"hello-vite.md": {
	id: "hello-vite.md";
  slug: "hello-vite";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"i-bought-a-domain.md": {
	id: "i-bought-a-domain.md";
  slug: "i-bought-a-domain";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"improve-websites-ux.md": {
	id: "improve-websites-ux.md";
  slug: "improve-websites-ux";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"is-it-time-to-switch-to-bun.md": {
	id: "is-it-time-to-switch-to-bun.md";
  slug: "is-it-time-to-switch-to-bun";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"migrate-from-google-domains-vi.md": {
	id: "migrate-from-google-domains-vi.md";
  slug: "migrate-from-google-domains-vi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"react-refine.md": {
	id: "react-refine.md";
  slug: "react-refine";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"revamp-my-site-with-nextjs-tailwindcss.md": {
	id: "revamp-my-site-with-nextjs-tailwindcss.md";
  slug: "revamp-my-site-with-nextjs-tailwindcss";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"rose-pine.md": {
	id: "rose-pine.md";
  slug: "rose-pine";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"set-up-fish-shell-macos.md": {
	id: "set-up-fish-shell-macos.md";
  slug: "set-up-fish-shell-macos";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"set-up-redirect-netlify-vercel-vi.md": {
	id: "set-up-redirect-netlify-vercel-vi.md";
  slug: "set-up-redirect-netlify-vercel-vi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"set-up-redirect-netlify-vercel.md": {
	id: "set-up-redirect-netlify-vercel.md";
  slug: "set-up-redirect-netlify-vercel";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"set-up-zed-the-way-it-suits-you.md": {
	id: "set-up-zed-the-way-it-suits-you.md";
  slug: "set-up-zed-the-way-it-suits-you";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"spotify-api-vite-cloudflare-workers.md": {
	id: "spotify-api-vite-cloudflare-workers.md";
  slug: "spotify-api-vite-cloudflare-workers";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"spotify-refresh-token.md": {
	id: "spotify-refresh-token.md";
  slug: "spotify-refresh-token";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"switch-to-zed.md": {
	id: "switch-to-zed.md";
  slug: "switch-to-zed";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"try-arc-for-windows-without-invite.md": {
	id: "try-arc-for-windows-without-invite.md";
  slug: "try-arc-for-windows-without-invite";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"vitesse-vscode-theme.md": {
	id: "vitesse-vscode-theme.md";
  slug: "vitesse-vscode-theme";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"pages": {
"md-style.md": {
	id: "md-style.md";
  slug: "md-style";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".md"] };
"posts-props.md": {
	id: "posts-props.md";
  slug: "posts-props";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
