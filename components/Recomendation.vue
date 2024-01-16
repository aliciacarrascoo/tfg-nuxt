<template>
      <h3
              class="text-lg font-medium leading-6 text-gray-900"
            >
              {{ props?.title }}
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                {{ props?.abstract }}
              </p>
            </div>
</template>
<script setup>
   const props = defineProps({
  title: {
    type: String,
  },
  abstract: {
    type: String,
  },
  text: {
    type: String,
  },
});
</script>
