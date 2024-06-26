// using the defineConfig helper will provide TypeScript-powered
// intellisense for config options
import { defineConfig } from "vitepress";
import { join } from "node:path";

// markdown
import MarkdownItImplicitFigures from "markdown-it-implicit-figures";
import MarkdownItPlantuml from "markdown-it-plantuml";

// shikiji loading
import { promises as fs } from 'node:fs'
import type { LanguageInput, RawGrammar } from 'shiki'
const loadSyntax = async (file: string, name: string, alias: string = name): Promise<LanguageInput> => {
  const src = await fs.readFile(join(__dirname, file))
  const grammar: RawGrammar = JSON.parse(src.toString())
  return { name, aliases: [name, alias], ...grammar }
}

export default defineConfig({
  base: '/ui5-vitepress/', // use this for github pages deployment or remove for CF
  srcDir: "src",
  outDir: "site",
  lang: "en-US",
  title: "UI5 VitePress",
  description: "Pre-configured “Ready to Run” solution to get started immediately with VitePress and UI5.",
  lastUpdated: false, // disable git author info
  cleanUrls: false,
  ignoreDeadLinks: [
    // ignore all localhost links
    /^https?:\/\/localhost/,
    // ignore all links include "/ui5.sap.com/""
    /\/ui5.sap.com\//,
  ],

  vue: {
    template: {
      compilerOptions: {
        // treat all tags with a "ui5-" prefix as custom elements
        isCustomElement: (tag: string) => tag.includes("ui5-"),
      },
    },
  },

  head: [
    [
      "link",
      { rel: "icon", type: "image/svg+xml", href: "/icons/ui5/O.svg" }
    ]
  ],

  themeConfig: {
    logo:  {
      light: "/icons/ui5/B.svg",
      dark: "/icons/ui5/O.svg"
    },
    externalLinkIcon: false,
    outline: [1,3],

    nav: nav(),

    sidebar: {      
      "/guide/": guide(),
    },

    socialLinks: [
      { 
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>'
        },
        link: "https://twitter.com/hschaefer123"
      },
      { icon: "github", link: "https://github.com/hschaefer123/ui5-vitepress" },
    ],

    footer: {
      message: `<a class="u-pi" href="/guide/trip-pin.html">π</a>`,
      copyright: `Copyright © 2020-${new Date().getFullYear()} by YOU`,
    },

    search: {
      provider: "local",
      //hotKeys: [], // disable hotkeys to avoid search while using UI5 web components input
    },
  },

  markdown: {
    //theme: "material-theme-palenight", // pre rc5 default
    // Add support for your own languages.
    // https://github.com/shikijs/shiki/blob/main/docs/languages.md#supporting-your-own-languages-with-shiki
    languages: [
      // https://github.com/SAP-samples/vscode-abap-cds/blob/main/syntaxes/cds.tmLanguage.json
      await loadSyntax('syntaxes/abapcds.tmLanguage.json', 'abapcds'),
      // https://github.com/SAP/cds-textmate-grammar/blob/main/syntaxes/cds.tmLanguage.json
      await loadSyntax('syntaxes/cds.tmLanguage.json', 'cds'),
      // https://github.com/mechatroner/vscode_rainbow_csv/blob/master/syntaxes/csv.tmLanguage.json
      await loadSyntax('syntaxes/csv.tmLanguage.json', 'csv'),
      // https://github.com/mechatroner/vscode_rainbow_csv/blob/master/syntaxes/csv.tmLanguage.json
      await loadSyntax('syntaxes/scsv.tmLanguage.json', 'csvs'),
      // https://github.com/Huachao/vscode-restclient/blob/master/syntaxes/http.tmLanguage.json
      await loadSyntax('syntaxes/http.tmLanguage.json', 'rest'),
    ],

    // Configure the Markdown-it instance
    config: (md) => {
      // https://www.npmjs.com/package/markdown-it-implicit-figures
      md.use(MarkdownItImplicitFigures, {
        figcaption: true,
      });
      md.use(MarkdownItPlantuml, {
        //imageFormat: 'png'
      });
      // https://github.com/gmunguia/markdown-it-plantuml/issues/35
      md.use(MarkdownItPlantuml, {
        openMarker: "```plantuml",
        closeMarker: "```",
        diagramName: "uml",
        imageFormat: "svg",
      });
      // Textik https://textik.com/
      md.use(MarkdownItPlantuml, {
        openMarker: "```ditaa",
        closeMarker: "```",
        diagramName: "ditaa",
        imageFormat: "png",
      });
    },
  },

  vite: {
    build: {      
      chunkSizeWarningLimit: 4000, // chunk for local search index dominates      
    }
  }
});

function nav() {
  return [
    {
      text: "Guide",
      link: "/guide/",
      activeMatch: "/guide/",
    },
    { text: "About", link: "/about" },
  ];
}

function guide() {
  return [
    { 
      text: "Introduction",
      collapsed: false,
      items: [
        {
          text: "What is UI5 VitePress?",
          link: "/guide/",
        },        
        {
          text: "Getting Started",
          link: "/guide/getting-started",
        },
        {
          text: "Vue.js",
          link: "/guide/vue",
        },
      ],
    },    
    { 
      text: "Enhancements",
      collapsed: false,
      items: [
        {
          text: "UI5 Web Components",
          link: "/guide/ui5wc",
        },        
        {
          text: "Tailwind CSS",
          link: "/guide/tailwindcss",
        },
      ],
    },    
    { 
      text: "Markdown",
      collapsed: false,
      items: [
        {
          text: "Languages",
          link: "/guide/md-languages",
        },                
        {
          text: "Implicit Figures",
          link: "/guide/md-implicit-figures",
        },
        {
          text: "PlantUML",
          link: "/guide/md-plantuml",
        },
      ],
    },    
    { 
      text: "Plugins",
      collapsed: false,
      items: [
        {
          text: "Zoom Vanilla",
          link: "/guide/zoomvanilla",
        },                
        {
          text: "Badgen",
          link: "/guide/badgen",
        },
      ],
    },
    { 
      text: "OData Integration",
      collapsed: false,
      items: [
        {
          text: "Client-Side-Rendering",
          link: "/guide/trip-pin",
        },  
        {
          text: "Server-Side-Rendering",
          link: "/guide/trip-pin-ssr",
        },                
      ],
    },
  ];
}

