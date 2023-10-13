<script setup>
  import { data } from '@theme/loaders/trippin.data.js'
</script>

# OData Server-Side-Rendering (SSR)

This example uses [Build-Time Data loading](https://vitepress.dev/guide/data-loading#build-time-data-loading) to access the [TripPin OData V4 Sample Service](https://www.odata.org/blog/trippin-new-odata-v4-sample-service/).


>VitePress provides a feature called data loaders that allows you to load arbitrary data and import it from pages or components. The data loading is executed ``only at build time:`` the resulting data will be serialized as JSON in the final JavaScript bundle.

``trippin.data.js``
```js
export default {
    async load() {
        const service = 'https://services.odata.org/Trippin_Staging/(S(iw1anra4xygjyssbeef0yeyy))'
        return (await fetch(`${service}/People?$select=FirstName,LastName,UserName&$orderBy=LastName,FirstName&$top=100`)).json()
    }
}
```

The data can directly be used inside markdown ``trip-pin-ssr.md``:

```html
<table>
  <thead>
    <tr>
      <th>User</th>
      <th class="!text-end">Id</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="people of data.value">
      <td>{{people.FirstName}} {{people.LastName}}</td>
      <td class="text-end">{{people.UserName}}</td>
    </tr>
  </tbody>
</table>
```

## All People

<table>
  <thead>
    <tr>
      <th>User</th>
      <th class="!text-end">Id</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="people of data.value">
      <td>{{people.FirstName}} {{people.LastName}}</td>
      <td class="text-end">{{people.UserName}}</td>
    </tr>
  </tbody>
</table>
