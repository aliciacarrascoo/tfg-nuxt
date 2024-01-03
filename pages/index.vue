<script setup>
  const sendMail = async () => {
    console.log('oo')
    await $fetch('api/send', {method: 'POST'})
  }
</script>
<template>
  <Page title="home">
    <Button @click="()=>sendMail()">Enviar mail</Button>
  </Page>

</template>
