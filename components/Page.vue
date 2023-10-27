<script setup>
    const props = defineProps({
        title: {
            type: String,
            default: "Default title",
        },
});


</script>

<template>
  <div class="p-7 bg-gray-50 dark:bg-gray-900 h-full">
    <h3 class="text-4xl dark:text-white mb-10">
      {{ title }}
    </h3>
    <slot />
  </div>
</template>
