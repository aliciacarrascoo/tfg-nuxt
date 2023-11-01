<script setup>
const route = useRoute();
console.log(route.params);
</script>

<template>
  <Page title="Scan Results">
    {{ route.params.id }}
    <LogResults />
  </Page>
</template>
