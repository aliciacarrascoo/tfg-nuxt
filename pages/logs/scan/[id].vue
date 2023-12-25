<script setup>
const route = useRoute();
console.log(route.params);
</script>

<template>
  <Page title="Scan Results">
    <LogScan :id="route.params.id" />
    <CommentSection table="scans"/>
  </Page>
</template>
