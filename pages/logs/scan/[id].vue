<script setup>
const route = useRoute();
</script>

<template>
  <Page title="Scan Results">
    <LogScan :id="route.params.id" />
    <CommentSection table="scan" :id="route.params.id" />
  </Page>
</template>
