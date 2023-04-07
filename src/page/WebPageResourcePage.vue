<template>
  <base-layout class="common-font-family">
    <web-page-side-bar />
    <router-view></router-view>
  </base-layout>
</template>

<script setup lang="ts">
import BaseLayout from '@/components/common/BaseLayout.vue'
import WebPageSideBar from '@/components/common/WebPageSideBar.vue'
</script>

<style>
.common-font-family {
  font-family: PingFang SC, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
}
</style>
