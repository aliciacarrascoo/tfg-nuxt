<script setup>
const { locale } = useI18n();

const setLocale = (language) => {
  locale.value = language;
};
</script>

<template>
  <button
    type="button"
    data-dropdown-toggle="language-dropdown-menu"
    class="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
  >
    {{ locale.value }}
  </button>
  <div
    class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
    id="language-dropdown-menu"
  >
    <ul class="py-2 font-medium" role="none">
      <li>
        <button
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          @click="setLocale('en')"
        >
          <div class="inline-flex items-center">English</div>
        </button>
      </li>
      <li>
        <button
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          @click="setLocale('es')"
        >
          <div class="inline-flex items-center">Español</div>
        </button>
      </li>
      <li>
        <button
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          @click="setLocale('ca')"
        >
          <div class="inline-flex items-center">Català</div>
        </button>
      </li>
    </ul>
  </div>
</template>
