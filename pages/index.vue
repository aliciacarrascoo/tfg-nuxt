<script setup>
const sendMail = async () => {
  console.log("oo");
  await $fetch("api/send", { method: "POST" });
};
</script>
<template>
  <Page title="Home page">
    <Button @click="() => sendMail()">Enviar mail</Button>
  </Page>
</template>
