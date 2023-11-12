<template>
  <div class="p-7 bg-gray-50 dark:bg-gray-900 h-full">
    <nav class="flex mb-3" aria-label="Breadcrumb">
      <ol class="inline-flex items-center">
        <li class="inline-flex items-center">
          <Icon name="ion:ios-home" class="m-2 ml-0" />
        </li>
        <li v-for="({ name, path }, index) in breadcrumbs" :key="index">
          <div class="flex items-center">
            <Icon
              v-if="index != 0"
              name="ic:round-arrow-forward-ios"
              class="m-2"
            />
            <NuxtLink
              :to="path"
              class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >{{ $t(name) }}</NuxtLink
            >
          </div>
        </li>
      </ol>
    </nav>
    <h3 class="text-4xl font-bold dark:text-white mb-10">
      {{ title }}
    </h3>
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Default title",
  },
  urls: {
    type: Array,
    default: () => [],
  },
});

const { breadcrumbs } = useBreadcrumbs();
</script>
