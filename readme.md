# fresh-plugin-svg-inject

This is a plugin for [fresh](https://github.com/denoland/fresh) that injects SVGs referenced in `img` tags into the rendered html text.

Basically it turns this:

```html
<img
	src="assets/logo.svg"
	class="h-full"
/>
```

```svg
<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 3000 3500"
	class="h-full"
>
	<defs>
		<rect
			id="box"
			width="100%"
			height="100%"
		/>
	</defs>

	<use href="#box" />
</svg>
```

into this:

```html
<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 3000 3500"
	class="h-full"
>
	<defs>
		<rect
			id="box-inject1"
			width="100%"
			height="100%"
		/>
	</defs>

	<use href="#box-inject1" />
</svg>
```

before your site gets served.

The ids are renamed to avoid collisions. This plugin is in essence a modern, less sophisticated port of [iconfu/svg-inject](https://github.com/iconfu/svg-inject) for fresh.

## Usage

```js
import tailwind from "$fresh/plugins/tailwind.ts";
import svgInjectPlugin from "https://deno.land/x/fresh-plugin-svg-inject/main.js";
import { defineConfig } from "$fresh/server.ts";


export default defineConfig({
	plugins: [
		tailwind(),
		svgInjectPlugin()
	]
});
```

You can also pass an options object to `svgInjectPlugin()` with a single `staticFolder` option, which should be the same as the `staticDir` option specified on the fresh config. Default is `"./static"` and I know this should be read automatically but I have no idea how; contributions are welcome.

## Contributing

We appreciate your help! To contribute, please read our [contributing instructions](./contributing.md).
