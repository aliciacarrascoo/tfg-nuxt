<template>

    <slot v-if="isAllowed"/>
</template>

<script setup lang="ts">
    const props = defineProps({
        only: {
        type: Array,
        required: true}
    },
    )
    
    const isAllowed = ref(false)
    onMounted(async ()=> {
        const currentUserProfile = await useCurrentUserProfile();
        isAllowed.value = !!currentUserProfile?.value && props.only.includes(currentUserProfile.value.role)
    })
</script>