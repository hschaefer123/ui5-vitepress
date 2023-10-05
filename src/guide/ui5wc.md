# UI5 Web Components <Badgen package="@ui5/webcomponents" style="float:right"/>

>![Vue](/icons/logo/UI5.svg){class="u-right-brand" style="width:auto;height:3rem;"} [UI5 Web Components](https://sap.github.io/ui5-webcomponents/) are framework-independent UI elements incorporating the SAP Fiori design.

::: tip You can use [UI5 Web Components](https://sap.github.io/ui5-webcomponents/) directly inside VuePress using [custom components](/guide/vue.html#single-file-components). 
:::

## To-Do List

<script setup>
import { defineClientComponent } from 'vitepress'
const Todo = defineClientComponent(() => {
  return import('@theme/components/Todo.vue')
})    
</script>

<ClientOnly>  
  <Todo/>
</ClientOnly>

### Toogle Dark Mode Mixin
To support the VitePress ``Dark Mode Switch``, the ``Pre-configured`` solutions offers a Mixin, that handles theme switching automatially.

You can use the Mixin inside the ``script`` section the following way:

```vue
<script>
import UI5WebComponentsMixin from 
       "../mixins/UI5WebComponentsMixin.js";
...
export default defineComponent({
  name: "MySFC",
  mixins: [UI5WebComponentsMixin],
  ...
});
</script>
```