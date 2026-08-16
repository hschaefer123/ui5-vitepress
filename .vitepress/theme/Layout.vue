<script setup lang="ts">
/**
 * Default theme layout extended with the elemental hero:
 * an animated backdrop behind the page and the assembling UI5 signet
 * in place of the static hero image. Both are limited to the home page.
 */
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
import { computed } from "vue";

import ElementsBackdrop from "@theme/components/ElementsBackdrop.vue";
import UI5Logo from "@theme/components/UI5Logo.vue";

const { Layout } = DefaultTheme;
const { frontmatter } = useData();

const isHome = computed(() => frontmatter.value.layout === "home");
</script>

<template>
  <Layout>
    <template #layout-top>
      <ElementsBackdrop v-if="isHome" />
    </template>

    <template #home-hero-image>
      <UI5Logo />
    </template>
  </Layout>
</template>
