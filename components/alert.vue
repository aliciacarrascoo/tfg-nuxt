<template>
  <div class="p-4 m-6 text-sm rounded-lg" :class="`bg-${alertColors[props.type]}-50`" role="alert">
    <span class="font-bold" :class="`text-${alertColors[props.type]}-800`">{{ props.title }}</span>
     {{ " " }}
    <span :class="`text-${alertColors[props.type]}-800`">
      {{ props.text }} 
    </span>  
    <!-- componente para tailwind para que no limpie las clases generadas al no verlas ya que se interpolan con variables -->
    <div class="hidden text-blue-800 text-green-800 text-yellow-800 text-red-800 bg-yellow-50 bg-blue-50 bg-green-50 bg-red-50">for tailwind</div>
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
