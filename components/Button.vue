<script setup>
const props = defineProps({
  buttonType: {
    type: String,
    default: "default",
  },
  styles: {
    type: String,
    default: "",
  },
});
const buttonClasses = {
  default:
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
  text: "font-medium text-blue-600 dark:text-blue-500 hover:underline",
};
</script>

<template>
  <button :class="buttonClasses[buttonType] + ' ' + styles">
    <slot />
  </button>
</template>
