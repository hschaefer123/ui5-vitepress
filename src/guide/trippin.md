# TripPin OData V4 <Badgen package="odata2ts" style="float:right"/>
This example uses [odata2ts](https://odata2ts.github.io/) to access the [TripPin OData V4 Sample Service](https://www.odata.org/blog/trippin-new-odata-v4-sample-service/).
>![](/TripPinClassDiagram.jpg){class="u-p-white" style="float:right;height:5rem;"}Centers around a flexible and powerful generator, so that you can work with OData model types, type-safe query builders, and full-fledged, domain-specific OData clients.

<script setup>
import { defineClientComponent } from 'vitepress'
const Trippin = defineClientComponent(() => {
  return import('@theme/components/Trippin.vue')
})    
</script>

<ClientOnly>  
  <Trippin/>
</ClientOnly>
