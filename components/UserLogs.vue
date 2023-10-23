<script setup>
const client = useSupabaseClient();
const user = useSupabaseUser();
const logs = ref([]);
const { data } = await useAsyncData("logs", async () => {
  return await client.from("logs").select("id, content");
});
console.log("backend:", data);
</script>
<template>
  {{ data }}
</template>
