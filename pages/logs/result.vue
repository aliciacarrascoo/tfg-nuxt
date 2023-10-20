<script setup>
    const logs = ref("");
    const fileInput = ref(null)
    async function fileChange(){
        
        console.log(fileInput.value?.files)
        const file = fileInput.value?.files[0]
        if (file) {
            logs.value = await file.text()
        }
    }
</script>

<template>

</template>