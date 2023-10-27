<script setup>
const logs = ref("");
const fileInput = ref(null);
const { data } = await useFetch("/api/logs/result");
console.log(data);
async function fileChange() {
  const file = fileInput.value?.files[0];
  if (file) {
    logs.value = await file.text();
  }
}
</script>

<template>
  <LogResults/>
</template>
