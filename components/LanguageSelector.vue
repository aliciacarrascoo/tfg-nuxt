<script setup>
const { locale } = useI18n();
const languageDropdownIsOpen = ref(false);

const setLocale = (language) => {
  languageDropdownIsOpen.value = false;
  locale.value = language;
};
</script>

<template>
  <button
    type="button"
    data-dropdown-toggle="language-dropdown-menu"
    class="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white gap-1"
    @click="languageDropdownIsOpen = !languageDropdownIsOpen"
  >
    {{ getLanguages(locale).name }}
    <Icon name="ion:ios-arrow-down"></Icon>
  </button>
  <div
    class="z-50 absolute text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
    :class="{ hidden: !languageDropdownIsOpen }"
    id="language-dropdown-menu"
  >
    <ul class="py-2 font-medium" role="none">
      <li v-for="(item, index) in Object.values(getLanguages())">
        <button
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          @click="setLocale(item.id)"
        >
          <div class="inline-flex items-center">{{ item.name }}</div>
        </button>
      </li>
    </ul>
  </div>
</template>
