<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";
  const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  setIsOpen: {
    type: Function,
    default: () => {},
  },
});
const logs = ref();
const fileInput = ref(null);
const client = useSupabaseClient();
const loadingStore = useLoadingStore();
const currentUserProfile = await useCurrentUserProfile();

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
  const originalAlertLogs = logsObject["original_alert_json"] || logsObject;
  const body = {
    sha256:
      originalAlertLogs["raw_abioc"]?.["event"]?.[
        "causality_actor_process_image_sha256"
      ] || originalAlertLogs["SHA256"],
    hostname: originalAlertLogs["raw_abioc"]?.["event"]?.["agent_hostname"],
    user_detected:
      originalAlertLogs["raw_abioc"]?.["event"]?.["actor_primary_username"],
    alert_category: originalAlertLogs["alert_category"],
    mitre_tactic:
      originalAlertLogs["mitre_tactic_ids"] ||
      originalAlertLogs["mittre tactic"] ||
      originalAlertLogs["Mittre tactic"] ||
      originalAlertLogs["Mittre Tactic"] ||
      originalAlertLogs["mitretactic"],
    mitre_tactic_id_and_name: originalAlertLogs["mitre_tactic_id_and_name"],
    mitre_technique:
      originalAlertLogs["mitre_technique_ids"] ||
      originalAlertLogs["mittre technique"] ||
      originalAlertLogs["Mittre technique"] ||
      originalAlertLogs["Mittre Technique"] ||
      originalAlertLogs["mitretechnique"],
    mitre_technique_id_and_name:
      originalAlertLogs["mitre_technique_id_and_name"],
    severity:
      logsObject["original_severity"] || logsObject["ORIGINAL_SEVERITY"],
    alert:
      originalAlertLogs["alert_name"] ||
      originalAlertLogs["alert"] ||
      originalAlertLogs["alert"] ||
      originalAlertLogs["ALERT"],
    alert_description:
      originalAlertLogs["alert_description"] ||
      originalAlertLogs["Alert description"] ||
      originalAlertLogs["Alert Description"] ||
      originalAlertLogs["alertDescription"],
    context:
      originalAlertLogs["context"] ||
      originalAlertLogs["Context"] ||
      originalAlertLogs["CONTEXT"],
    recomendation:
      originalAlertLogs["recomendation"] ||
      originalAlertLogs["Recomendation"] ||
      originalAlertLogs["RECOMENDATION"],
    user: user.value.id,
    profile_id: currentUserProfile.value.id,
    log: originalAlertLogs,
  };
  const { data, error } = await client.from("scans").insert(body).select();

  loadingStore.setLoading(false);
  navigateTo(`/logs/scan/${data[0].result_id}`);
}

function closeModal() {
  props.setIsOpen(false);
}
</script>
<template>
    <Dialog @close="closeModal" class="relative z-10" :open="props?.isOpen">
      <div class="fixed inset-0 bg-black/25" />
      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <DialogPanel
            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
          >
                <h4 class="mb-2">{{ $t("newLog.introduceYourCortexLogs") }}</h4>
            <textarea
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        v-model="logs"
        rows="15"
        placeholder="Logs as JSON"
      />
      <div class="w-100 my-4">
        <div class="mb-2">{{ $t("newLog.orImportFromFile") }}</div>
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
            {{ $t("newLog.analizeLogs") }}
          </span>
          <Icon name="ic:round-arrow-forward-ios" class="ml-2" />
        </div>
      </Button>
            <div id="json-result"></div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
</template>
