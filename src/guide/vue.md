# Vue.js <Badgen package="vue" class="float-right"/>

![Vue](/icons/logo/Vuejs.svg){class="u-right-brand" style="width:auto;height:5rem;"}[Vue.js](https://vuejs.org/) - The Progressive JavaScript Framework
>An approachable, performant and versatile framework for building web user interfaces.

## Using Vue in Markdown
In VitePress, each Markdown file is compiled into HTML and then processed as a [Vue Single-File Component](https://vuejs.org/guide/scaling-up/sfc.html). This means you can use any Vue features inside the Markdown, including dynamic templating, using Vue components, or arbitrary in-page Vue component logic by adding a ``<script>`` tag.

Input

```md
{{ 1 + 1 }}
```

Output
```html
2
```

### Single-File Components
Vue [Single-File Components](https://vuejs.org/guide/scaling-up/sfc.html) (a.k.a. ``*.vue`` files, abbreviated as SFC) is a special file format that allows us to encapsulate the template, logic, and styling of a Vue component in a single file. Here's an example SFC.

#### API Styles
Vue components can be authored in two different API styles:

::: code-group

```vue [Options API]
<script>
export default {
  data() {
    return {
      greeting: 'Hello World!'
    }
  }
}
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
```

```vue [Composition API]
<script setup>
import { ref } from 'vue'
const greeting = ref('Hello World!')
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
```

:::

::: tip UI5 Vitepress is Pre-configured to use additional components located in 
``.vitepress/theme/components``.
:::

### Single use
SFCs used only on one site can directly be imported inside markdown:

```html
<script setup>
import { defineClientComponent } from 'vitepress'
const MySFC = defineClientComponent(() => {
  return import('@theme/components/MySFC.vue')
})
</script>
<ClientOnly>
    <MySFC/>
</ClientOnly>
```

### Multiple use
Register your SFC as a Global Component that can be used inside multiple markdown files directly:

``.vitepress/theme/ìndex.ts``

```ts
...
import MySFC from "@theme/components/MySFC.vue";

export default {
  ...
  enhanceApp(ctx: EnhanceAppContext) {
    ...
    ctx.app.component("MySFC", MySFC);
  },
  ...
};
```

The SFC can be directly used inside any markdown ``<Markdown>.md`` file:

```md
<MySFC optionalParam="Value"/>
```

::: tip Badgen SFC
Have a look at the Pre-configured ``<Badgen../>`` component which is used in multiple guides.
:::