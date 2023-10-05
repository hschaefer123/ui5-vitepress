# What is UI5 VitePress?

![VitePress](/icons/logo/VitePress.svg){class="u-right-brand" style="width:auto;height:8rem;"}[Vue.js](https://vuejs.org/) [VitePress](https://vitepress.dev/) is a Static Site Generator (SSG) designed for building fast, content-centric websites. In a nutshell, VitePress takes your source content written in Markdown, applies a theme to it, and generates static HTML pages that can be easily deployed anywhere.

UI5 VitePress is a Pre-configured ``«Ready to Run»`` solution to get started immediately with VitePress and UI5.

## Dependencies

::: tip The static site is build with [VitePress](https://vitepress.dev/), a [markdown](https://en.wikipedia.org/wiki/Markdown)-centered [Static Site Generator (SSG)](https://en.wikipedia.org/wiki/Static_site_generator) using the [Vite](https://vitejs.dev/) development environment and [Rollup](https://rollupjs.org/guide/en/) module bundler.

In addition, it enables the integration of dynamic and interactive tools:

- [Vue](https://vuejs.org/) based [Single-File Components (SFC)](https://vuejs.org/guide/scaling-up/sfc.html#single-file-components)
- [UI5 Web Components](https://sap.github.io/ui5-webcomponents/) implementing the Fiori design system.
- [PostCSS](https://postcss.org/) preprocessor transforming CSS with [plugins](https://github.com/postcss/postcss/blob/main/docs/plugins.md):
    - [Tailwind CSS](https://tailwindcss.com/) enabling a utility-first driven design system.
    - [Autoprefixer](https://github.com/postcss/autoprefixer) adding vendor prefixes to CSS rules.
    - [cssnano](https://cssnano.co/) optimizing for production with modern CSS compression. 
- [PlantUML](https://plantuml.com/en/) creating diagrams from plain text.

<div class="flex flex-wrap justify-center space-x-4">
    <img class="h-8 mt-2" :src="`/icons/logo/${name}.svg`"
        v-for="name in ['Vitejs', 'Rollup', 'Vuejs', 'UI5', 'PostCSS', 'TailwindCSS', 'Autoprefixer', 'cssnano', 'PlantUML', 'markdown']"/> 
</div>
:::

## Who is using VitePress?
The following resources are a good startting point to find additional inspirations and components:

Usage | Description
:---: | -----------
[VitePress](https://vitepress.dev/) | Vite & Vue Powered Static Site Generator ([Sources](https://github.com/vuejs/vitepress/tree/main/docs)).
[UDINA](https://btp.udina.de/) | Preconfigured "ready-to-run" solutions to quickly get started with the Intelligent Enterprise.
[CAPire](https://cap.cloud.sap/docs/) | CAP - The Cloud Application Programming Model ([Sources](https://github.com/cap-js/docs)).
[Vue.js](https://vuejs.org/) | The Progressive JavaScript Framework ([Sources](https://github.com/vuejs/docs)).
[More Use Cases](https://vitepress.dev/guide/what-is-vitepress#use-cases) | VitePress Use Cases.