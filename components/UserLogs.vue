<script setup>
const client = useSupabaseClient()
    const user = useSupabaseUser()
  const logs = ref([])
  const {data} = await useAsyncData('logs', async () => {
    return await client.from('logs').select('id, log').eq('user', user.value.id).order('created_at')
  },{
    transform: result => result.body
  })
  console.log(data)
</script>
<template>

</template>