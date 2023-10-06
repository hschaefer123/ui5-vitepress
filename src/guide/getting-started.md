# Getting Started

## Installation 

### Prerequisites
- [Node.js](https://nodejs.org/de) version 18 or higher.
- Terminal for accessing VitePress via its command line interface (CLI).
- Text Editor with [Markdown](https://en.wikipedia.org/wiki/Markdown) syntax support.
    - [VSCode](https://code.visualstudio.com/) is recommended, along with the [official Vue extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

After you have cloned [UI5 VitePress](https://github.com/hschaefer123/ui5-vitepress.git) to your local folder, you need to install dependencies using:

```bash [npm]
$ npm install
```

### Up and Running
You can use the following npm scripts inside your ``package.json``:

```json
{
  ...
  "scripts": {
    "dev": "vitepress --open",
    "build": "vitepress build",
    "preview": "vitepress preview --port 8080",
    "deploy": "cf push"
  },
  ...
}
```

Script | Description
:----: | -----------
dev | Start a local dev server running at ``http://localhost:5173`` with instant hot updates.
build | Build the VitePress site for production (SSR to ``./site``).
preview | Locally preview the ``./site`` production build.
deploy | Deploy it to SAP BTP Cloud Foundry or [Other Platforms](https://vitepress.dev/guide/deploy#platform-guides) depending on settings inside the ``manifest.yaml``.

### SAP BTP Deployment

::: warning Prerequisite
Make sure to [Log in with the CLI](https://docs.cloudfoundry.org/cf-cli/getting-started.html) to your Cloud Foundry instance:

``cf login -a API-URL -u USERNAME -p PASSWORD -o ORG -s SPACE``
:::

Deploy your builded site directory tp SAP BTP CloudFoundry using the following ``manifest.yaml``file using the [Staticfile buildpack](https://docs.cloudfoundry.org/buildpacks/staticfile/):

```yaml
---
applications:
- name: ui5-vitepress
  path: .
  memory: 64M
  disk_quota: 128M
  buildpacks:
    - staticfile_buildpack
```

::: tip Memory usage
NGINX requires 20 MB of RAM to serve static assets. When using the Staticfile buildpack, Cloud Foundry push the apps with the ``-m 64M`` option to reduce RAM allocation from the default 1 GB that are allocated to containers by default.
:::

The file ``./cfignore`` controls, which files should be excluded from CF upload:

```yaml
# folder
.vitepress/
.vscode/
node_modules/
src/

# files
.gitignore
LICENSE
odata2ts.config.ts
package-lock.json
package.json
postcss.config.ts
README.md
tailwind.config.js
tsconfig.json

# OSX
.DS_Store
.AppleDouble
.LSOverride
```

The [Staticfile configuration](https://docs.cloudfoundry.org/buildpacks/staticfile/#staticfile) inside the file ``Staticfile`` offers options for the NGINX server setup:

```yaml
root: site
#enable_http2: enabled // (only if using a custom domain!)
location_include: includes/*.conf
force_https: true
http_strict_transport_security: true
http_strict_transport_security_include_subdomains: true
server_tokens: off
ssl_protocols: TLSv1.2 TLSv1.3
```

### VS Code Extensions
This project comes with extension recommendations, that are very helpful:

Extension | Description
:-------: | -----------
Vue.volar | Language support for Vue 3.
bradlc.vscode-tailwindcss | Intelligent Tailwind CSS tooling for VS Code.
humao.rest-client | REST Client for Visual Studio Code.
jebbs.plantuml | Rich PlantUML support for Visual Studio Code.
terrastruct.d2 | Support for .d2 files.
joaompinto.vscode-graphviz | GraphViz (dot) language support for Visual Studio Code.

### File Structure
The following file structure is used, where docs are lcoated inside (``./src``).

The ``srv`` directory is considered the **project root** of the VitePress site. The ``.vitepress`` directory is a reserved location for VitePress' config file, dev server cache, build output, and optional theme customization code.

```
.
├─ .vitepress
│  ├─ cache
│  ├─ syntaxes
│  │  └─ <TextMateGrammar>.tmLanguage.json
│  ├─ theme
│  │  ├─ components
│  │  │  ├─ Badgen.vue
│  │  │  ├─ ToDo.vue
│  │  │  ├─ ToDoItem.vue
│  │  │  └─ ToDoList.vue
│  │  ├─ mixins
│  │  │  ├─ u-zoom-vanilla.js
│  │  │  └─ UI5WebComponentsMixin.js
│  │  ├─ custom.css
│  │  └─ index.ts
│  └─ config.js
├─ src
│  ├─ guide
│  │  └─ <Guide>.md
│  ├─ public
│  ├─ about.md
│  └─ index.md
├─ .cfignore
├─ manifest.yaml
├─ package.json
├─ postcss.config.js
├─ Staticfile
├─ tailwind.config.js
└─ package.json
```

