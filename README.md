# UI5 VitePress
Pre-configured “Ready to Run” solution to get started immediately with VitePress and UI5.

[Live Demo](https://hschaefer123.github.io/ui5-vitepress/) (see ``.github/workflows/deploy.yml``)

**Fire and Water Design System**

![Project Screenshot](./src/public/UI5-VitePress-fire-and-water.jpg)

## Features

- Vue based Single-File Components (SFC)
- UI5 Web Components implementing the Fiori design system.
- PostCSS preprocessor transforming CSS with plugins:
   - Tailwind CSS enabling a utility-first driven design system.
   - Autoprefixer adding vendor prefixes to CSS rules.
   - cssnano optimizing for production with modern CSS compression.
- PlantUML creating diagrams from plain text.
- Deployment
   - GitHub Pages using actions
   - BTP using manifest

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/hschaefer123/ui5-vitepress.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start dev server using
   ```js
   npm run dev
   ```

The dev server automatically opens a browser window at [http://localhost:5173](http://localhost:5173).

Everything else can be found in the application.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Holger Schäfer - [@hschaefer123](https://twitter.com/hschaefer123)

UDINA Business Technology Platform: [https://btp.udina.de](https://btp.udina.de/)
