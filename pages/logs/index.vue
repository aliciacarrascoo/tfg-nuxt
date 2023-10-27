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
  <Page title="Logs"> 
        <h4 class="mb-2">Introduce logs</h4>
        <textarea class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="logs" rows="9" />
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
</Page>
</template>
