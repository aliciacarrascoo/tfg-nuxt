<template>
  <div :class="'p-4 m-6 text-sm text-' + alertColors[props.type] + '-800 rounded-lg bg-' + alertColors[props.type] + '-50'" role="alert">
    <span class="font-bold">{{ props.title }}</span> {{ props.text }} 
  </div>
</template>
<script setup lang="ts">
  type AlertType = "danger" | "warning" | "info" | "success"
  const alertColors = {
    "danger": "red",
    "warning": "yellow",
    "info":"blue",
    "success":"green"
  };
  const props = defineProps({
    type: {
      type: String,
      defult: "danger"
    },
    title: {
      type: String, default: "Error"
    },
    text: {
      type: String,
      requred: true
    }
  });
</script>
