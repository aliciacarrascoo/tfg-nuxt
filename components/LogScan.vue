<script setup>
import JsonViewer from "vue-json-viewer/ssr";
import "vue-json-viewer/style.css";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
const client = useSupabaseClient();
const { data } = await useAsyncData("scans", async () => {
  return await client.from("scans").select("*").eq("result_id", props.id);
});
console.log(data, "scan");
const {
  sha256,
  created,
  hostname,
  user_detected,
  alert_category,
  mitre_tactic,
  mitre_tactic_id_and_name,
  mitre_technique,
  mitre_technique_id_and_name,
  severity,
  alert,
  alert_description,
  log,
} = data._rawValue.data[0];

const notFound = "Not found";

const types = {
  SEV_010_INFORMATIONAL: {
    label: "Informational",
    class:
      "h-5 bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300",
  },
  SEV_020_LOW: {
    label: "Low severity",
    class:
      "h-5 bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300",
  },
  SEV_030_MEDIUM: {
    label: "Medium severity",
    class:
      "h-5 bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300",
  },
  SEV_040_HIGH: {
    label: "High severity",
    class:
      "h-5 bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300",
  },
  SEV_050_CRITICAL: {
    label: "Critical severity",
    class:
      "h-5 bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300",
  },
};
</script>

<template>
  <div class="text-gray-500 mb-1">Scanned on: {{ created }}</div>
  <div
    class="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="flex justify-between align-center">
      <h4 class="flex items-center text-4xl font-semibold dark:text-white mb-5">
        Summary
        <span
          class="bg-blue-100 text-blue-800 font-semibold text-lg px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2"
          >ID: {{ id }}
        </span>
          <span :class="types[severity]?.class || types['Informational']">{{ types[severity]?.label || notFound}}</span>
      </h4>
      <!------RECOMENDATION------>
        <div>
        <Button>See recomendation</Button> 
        </div>
      </div>
    <!------SHA256------>
    <div>
      <strong>SHA256</strong>
    </div>
    <div class="flex align-center">
      <div>{{ sha256 || notFound }} &nbsp;</div>
      <div>
        <Button v-if="sha256" button-type="text">
          <a
            :href="'https://www.virustotal.com/gui/file/' + sha256"
            target="_blank"
          >
            >> Check VirusTotal</a
          >
        </Button>
      </div>
    </div>
    <!------Hostname------>
    <div>
      <strong>Hostname</strong>
    </div>
    <div class="overflow-hidden">{{ hostname || notFound }}</div>
    <!------User------>
    <div>
      <strong>User</strong>
    </div>
    <div class="overflow-hidden">{{ user_detected || notFound }}</div>
    <!------Alert category------>
    <div>
      <strong>Alert category</strong>
    </div>
    <div class="overflow-hidden">{{ alert_category || notFound }}</div>
    <!------MITRE TACTIC------>
    <div>
      <strong>Mitre tactic</strong>
    </div>
    <div class="flex align-center">
      <div>{{ mitre_tactic_id_and_name || mitre_tactic || notFound }} &nbsp;</div>
    <Button v-if="mitre_tactic_id_and_name || mitre_tactic" button-type="text">
    <a
      :href="'https://attack.mitre.org/tactics/' + mitre_tactic"
      target="_blank"
      >>> Check Tactic</a
    >
  </Button>
    </div>
    <!------MITRE TECHNIQUE------>
    <div>
      <strong>Mitre technique</strong>
    </div>
    <div class="flex align-center">
      <div>{{ mitre_technique_id_and_name || mitre_technique || notFound }} &nbsp;</div>
      <Button v-if="mitre_technique_id_and_name || mitre_technique" button-type="text">
        <a
          :href="'https://attack.mitre.org/techniques/' + mitre_technique"
          target="_blank"
          >>> Check Technique</a
        >
      </Button>
    </div>
    <!------ALERT------>
    <div>
      <strong>Alert</strong>
    </div>
    <div>{{ alert || notFound }}</div>
    <!------Alert description------>
    <div>
      <strong>Alert description</strong>
    </div>
    <div class="overflow-hidden">{{ alert_description || notFound }}</div>
    <!------LOG------>
    <div>
      <strong>Log JSON</strong>
      <JsonViewer class="mt-1" :value="log" :boxed="true"></JsonViewer>
    </div>
  </div>
</template>
