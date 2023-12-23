<script setup>
const logs = ref("");
const fileInput = ref(null);

const loadingStore = useLoadingStore();

async function fileChange() {
  const file = fileInput.value?.files[0];
  if (file) {
    logs.value = await file.text();
  }
}

async function analizeLogs() {
  loadingStore.setLoading(true);
  const client = useSupabaseClient();
  const user = useSupabaseUser();
  let logsObject = JSON.parse(logs.value);
  logsObject = logsObject["original_alert_json"] || logsObject;
  const body = {
    sha256:
      logsObject["raw_abioc"]?.["event"]?.[
        "causality_actor_process_image_sha256"
      ] || logsObject["SHA256"],
    mitre_tactic:
      logsObject["mitre_tactic_ids"] ||
      logsObject["mittre tactic"] ||
      logsObject["Mittre tactic"] ||
      logsObject["Mittre Tactic"] ||
      logsObject["mitretactic"],
    mitre_technique:
      logsObject["mitre_technique_ids"] ||
      logsObject["mittre technique"] ||
      logsObject["Mittre technique"] ||
      logsObject["Mittre Technique"] ||
      logsObject["mitretechnique"],
    severity:
      logsObject["severity"] ||
      logsObject["Severity"] ||
      logsObject["SEVERITY"],
    alert:
      logsObject["alert_name"] ||
      logsObject["alert"] ||
      logsObject["alert"] ||
      logsObject["ALERT"],
    alert_description:
      logsObject["alert_description"] ||
      logsObject["Alert description"] ||
      logsObject["Alert Description"] ||
      logsObject["alertDescription"],
    context:
      logsObject["context"] || logsObject["Context"] || logsObject["CONTEXT"],
    recomendation:
      logsObject["recomendation"] ||
      logsObject["Recomendation"] ||
      logsObject["RECOMENDATION"],
    user: user.value.id,
    log: logsObject,
  };
  const { data, error } = await client.from("scans").insert(body).select();

  console.log(data, "data");
  loadingStore.setLoading(false);
  navigateTo(`/logs/scan/${data[0].result_id}`);
}
</script>

<template>
  <Page title="Scan new logs">
    <h4 class="mb-2">Introduce cortex logs</h4>
    <textarea
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      v-model="logs"
      rows="15"
      placeholder="Logs as JSON"
    />
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
    <Button @click="analizeLogs" buttonType="text">
      <div class="flex items-center">
        <span>
          {{ $t("analizeLogs") }}
        </span>
        <Icon name="ic:round-arrow-forward-ios" class="ml-2" />
      </div>
    </Button>
    <div id="json-result"></div>
  </Page>
</template>
