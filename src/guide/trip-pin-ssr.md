<script setup>
  import { data } from '@theme/loader/trippin.data.js'
</script>

# TripPin SSR
This example fetches and renders remote data during build time using SSR.

<table>
  <thead><tr><th>People</th><th style="text-align:end;">Id</th></tr></thead>
  <tbody>
    <tr v-for="people of data.value">
      <td>{{people.FirstName}} {{people.LastName}}</td>
      <td style="text-align:end;">{{people.UserName}}</td>
    </tr>
  </tbody>
</table>
