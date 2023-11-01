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
    <nav class="flex mb-3" aria-label="Breadcrumb">
      <ol class="inline-flex items-center">
        <li class="inline-flex items-center">
          <a
            href="#"
            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <Icon name="ion:ios-home" class="m-2 ml-0" />
            Home
          </a>
        </li>
        <li>
          <div class="flex items-center">
            <Icon name="ic:round-arrow-forward-ios" class="m-2" />
            <a
              href="#"
              class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >Projects</a
            >
          </div>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <Icon name="ic:round-arrow-forward-ios" class="m-2" />
            <span
              class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400"
              >Flowbite</span
            >
          </div>
        </li>
      </ol>
    </nav>
    <h3 class="text-4xl dark:text-white mb-10">
      {{ title }}
    </h3>
    <slot />
  </div>
</template>
