# Getting Started

## Installation 

### Prerequisites
- [Node.js](https://nodejs.org/de) version 18 or higher.
- Terminal for accessing VitePress via its command line interface (CLI).
- [VSCode](https://code.visualstudio.com/) is recommended, along with the [official Vue extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

After you have cloned [UI5 VitePress](https://github.com/hschaefer123/ui5-vitepress.git), you need to install the dependencies using:

```bash [npm]
npm install
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
deploy | Deploy it to SAP BTP Cloud Foundry (or [Other Platforms](https://vitepress.dev/guide/deploy#platform-guides)) depending on the settings inside the ``manifest.yaml``.

### VS Code Extensions
This project comes with extension recommendations, that are very helpful:

Extension | Description
:-------: | -----------
[Vue.volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) | Language support for Vue 3.
[bradlc.vscode-tailwindcss](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) | Intelligent Tailwind CSS tooling for VS Code.
[humao.rest-client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) | REST Client for Visual Studio Code.
[jebbs.plantuml](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml) | Rich PlantUML support for Visual Studio Code.
[terrastruct.d2](https://marketplace.visualstudio.com/items?itemName=terrastruct.d2) | Support for .d2 files.
[joaompinto.vscode-graphviz](https://marketplace.visualstudio.com/items?itemName=joaompinto.vscode-graphviz) | GraphViz (dot) language support for Visual Studio Code.

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
│  │  │  └─ Trippin.vue
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

## Deployment
Besides all the default VitePress site [deployment options](https://vitepress.dev/guide/deploy#platform-guides), the following options shows how to deploy to SAP.

::: warning Prerequisite
Make sure to [Log in with the CLI](https://docs.cloudfoundry.org/cf-cli/getting-started.html) to your Cloud Foundry instance:

``cf login -a API-URL -u USERNAME -p PASSWORD -o ORG -s SPACE``
:::

### SAP BTP
Deploy your builded site directory to SAP BTP CloudFoundry using the following ``manifest.yaml`` file leveraging the [Staticfile buildpack](https://docs.cloudfoundry.org/buildpacks/staticfile/):

```yaml
---
applications:
- name: ui5-vitepress
  path: .
  memory: 32M
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

### SAP WorkZone
If you need to control the access for your documentation, you need a ``Managed`` or ``Unmanaged`` SAP Application Router.

The following example shows how to use the mta tools to build and deploy to the ``HTML5 Content Repository`` while accessing using the Managed Application Router of the SAP WorkZone.

::: danger Memory Usage
By default, the used HTML5 repo size should be less than 5 MByte (see also pricing).
If you want to expand the size limit, you need to configure this in the mta.yaml.
:::

Create ``./xs-security.json`` security descriptor:

```json
{
  "xsappname": "ui5-vitepress",
  "tenant-mode": "dedicated",
  "description": "Security profile of called application",
  "scopes": [],
  "role-templates": []
}
```

Create the ``./mta.yaml`` development descriptor.

You can also add additional destinations, that should be proxied by the SAP Managed Application Router:

```yaml
_schema-version: "3.2"
ID: ui5-vitepress
description: Generated by Fiori Tools
version: 0.0.1
modules:
  - name: ui5-vitepress-destination-content
    type: com.sap.application.content
    requires:
      - name: ui5-vitepress-destination-service
        parameters:
          content-target: true
      - name: ui5-vitepress-repo-host
        parameters:
          service-key:
            name: ui5-vitepress-repo-host-key
      - name: ui5-vitepress-uaa
        parameters:
          service-key:
            name: ui5-vitepress-uaa-key
    parameters:
      content:
        instance:
          destinations:
            - Name: ui5-vitepress_html_repo_host
              ServiceInstanceName: ui5-vitepress-html5-srv
              ServiceKeyName: ui5-vitepress-repo-host-key
              sap.cloud.service: ui5-vitepress
            - Authentication: OAuth2UserTokenExchange
              Name: ui5-vitepress_uaa
              ServiceInstanceName: ui5-vitepress-xsuaa-srv
              ServiceKeyName: ui5-vitepress-uaa-key
              sap.cloud.service: ui5-vitepress
          existing_destinations_policy: ignore
    build-parameters:
      no-source: true
  - name: ui5-vitepress-app-content
    type: com.sap.application.content
    path: .
    requires:
      - name: ui5-vitepress-repo-host
        parameters:
          content-target: true
    build-parameters:
      build-result: resources
      requires:
        - artifacts:
            - HTML5Module-content.zip
          name: HTML5Module
          target-path: resources/
  - name: HTML5Module
    type: html5
    path: .
    build-parameters:
      build-result: site
      builder: custom
      commands:
        - npm install
        - npm run build:cf
      supported-platforms: []
resources:
  - name: ui5-vitepress-destination-service
    type: org.cloudfoundry.managed-service
    parameters:
      config:
        HTML5Runtime_enabled: true
        version: 1.0.0
      service: destination
      service-name: ui5-vitepress-destination-service
      service-plan: lite
  - name: ui5-vitepress-uaa
    type: org.cloudfoundry.managed-service
    parameters:
      path: ./xs-security.json
      service: xsuaa
      service-name: ui5-vitepress-xsuaa-srv
      service-plan: application
  - name: ui5-vitepress-repo-host
    type: org.cloudfoundry.managed-service
    parameters:
      service: html5-apps-repo
      service-name: ui5-vitepress-html5-srv
      service-plan: app-host
parameters:
  deploy_mode: html5-repo
  enable-parallel-deployments: true
```

Create ``./cf`` folder.
::: tip Copy Folder
This folder contains all the files that needs to be copied to ``site``folder after build to be part of the zipped content that will be deployed with ``archieve.mtar``.
:::

Create ``./cf/manifest.json`` app descriptor.

The app descriptor contains information for the semantoc object shown as tile in the WorkZone:

```json
{
  "_version": "1.59.0",
  "sap.app": {
    "id": "ui5-vitepress",
    "applicationVersion": {
      "version": "1.0.0"
    },
    "crossNavigation": {
      "inbounds": {
        "UI5VitePress-display": {
          "semanticObject": "UI5VitePress",
          "action": "display",
          "title": "UI5 VitePress",
          "subTitle": "Pre-configured “Ready to Run” solution",
          "icon": "sap-icon://shield",
          "signature": {
            "parameters": {},
            "additionalParameters": "allowed"
          }
        }
      }
    }
  },
  "sap.cloud": {
    "public": true,
    "service": "vitepress"
  }
}
```

Create ``./cf/xs-app.json`` app router config:

```json
{
  "welcomeFile": "/index.html",
  "authenticationMethod": "route",
  "routes": [
    {
      "source": "^(.*)$",
      "target": "$1",
      "service": "html5-apps-repo-rt",
      "authenticationType": "xsuaa"
    }
  ]
}
```

Add ``./package.json`` development dependencies

```bash
npm i -D bestzip
npm i -D copyfiles
npm i -D mbt
npm i -D rimraf
```

Add ``./package.json`` build and deployment scripts

```json
{
    ...
    "scripts": {
        "dev": "vitepress --open",
        "preview": "vitepress preview --port 8080",
        "gen-odata": "odata2ts",
        "build": "rimraf resources mta_archives && mbt build --mtar archive",
        "deploy": "cf deploy mta_archives/archive.mtar --retries 0",
        "build:cf": "npm run build:vp && npm run copy && npm run zip",
        "build:vp": "vitepress build",
        "copy": "copyfiles -f cf/*.* site/",
        "zip": "cd site/ && bestzip HTML5Module-content.zip *",
        "undeploy": "cf undeploy dsgvo --delete-services --delete-service-keys --delete-service-brokers"
    }
    ...
}
```

Using the ``build``script, you can create an ``archieve.mtar`` file inside the ``mta_archives`` folder.
The ``deploy`` script will deploy the site to your currently logged-in cloud foundry space.

#### HTML5 Applications
After first deployment, you can start your application from the BTP Cockpit ``HTML5 Applications`` menu.

Application Name | Active Version | Business Solution
---------------- | -------------- | -----------------
ui5vitepress | 1.0.0 | vitepress

The uri will be something like this:
``https://<YOUR.DOMAIN>/<GUID>.vitepress.ui5vitepress-1.0.0/index.html``
and the version part ``-1.0.0``can be removed from the uri to always use the latest deployed version.

#### VitePress Config Adaption
VitePress needs the base path of your uri to run correctly, therefore you have to change it.

Inside ``./.vitepress/config.ts`` update ``base`` path with your deployed app:

```ts
  // just use first path without version info
  base: '/<GUID>.vitepress.ui5vitepress/', 
```

Finally rebuild and redeploy the app using the updated VitePress config and the deployed app should work the same weay as locally.