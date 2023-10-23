<script setup>
const logs = ref("");
const fileInput = ref(null);
const { data } = await useFetch("/api/logs");
console.log(data);
async function fileChange() {
  const file = fileInput.value?.files[0];
  if (file) {
    logs.value = await file.text();
  }
}
</script>

<template>
  <div class="vh-100">
    <h2 class="title mb-4">Logs</h2>
    <div class="form-group h-50">
      <h4 class="mb-2">Introduce logs</h4>
      <textarea v-model="logs" />
      <div class="w-100 my-4">
        <div class="mb-2">Or import from file</div>
        <input
          ref="fileInput"
          type="file"
          class="form-control-file"
          accept=".json"
          @change="fileChange"
        />
      </div>
      <Button @click="navigateTo('/logs/result')">{{
        $t("analizeLogs")
      }}</Button>
    </div>
  </div>
</template>
