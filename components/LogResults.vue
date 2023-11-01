<script setup>
const client = useSupabaseClient();
const user = useSupabaseUser();
const logs = ref([]);
const { data } = await useAsyncData("results", async () => {
  return await client
    .from("results")
    .select(
      "sha256, mitre_attack, severity, alert, alert_description, context, recomendation",
    );
});
console.log("backend:", data._rawValue.data);
const {
  sha256,
  mitre_attack,
  severity,
  alert,
  alert_description,
  context,
  recomendation,
} = data._rawValue.data[0];
const types = {
  1: {
    label: "Low severity",
    class:
      "bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300",
  },
  2: {
    label: "Medium severity",
    class:
      "bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300",
  },
  3: {
    label: "High severity",
    class:
      "bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300",
  },
};
</script>
<template>
  <!------SHA256------>
  <div class="grid grid-cols-12 p-20">
    <div class="col-span-2"><strong>SHA256</strong></div>
    <div class="col-span-8">{{ sha256 }}</div>
    <div class="col-span-2">
      <button class="btn btn-primary ml-auto">VirusTotal</button>
    </div>
    <!------MITRE ATT&CK------>
    <div class="col-span-2">
      <strong>Mitre att&ck</strong>
    </div>
    <div class="col-span-10">{{ mitre_attack }}</div>
    <!------ALERT------>
    <div class="col-span-2">
      <strong>Alert</strong>
    </div>
    <div class="col-span-8">{{ alert }}</div>
    <div class="col-span-2">
      <span :class="types[severity].class">{{ types[severity].label }}</span>
    </div>
    <!------Alert description------>
    <div class="col-span-2">
      <strong>Alert description</strong>
    </div>
    <div class="col-span-10">{{ alert_description }}</div>
    <!------CONTEXT------>
    <div class="col-span-2">
      <strong>Context</strong>
    </div>
    <div class="col-span-10">{{ context }}</div>
    <!------RECOMENDATION------>
    <div class="col-span-2">
      <strong>Recomendation</strong>
    </div>
    <div class="col-span-10">{{ recomendation }}</div>
    <!------BUTTONS------>
    <div class="col-span-2">
      <Button @click="navigateTo('/logs')">BACK</Button>
    </div>
    <div class="col-span-8"></div>
    <div class="col-span-2">
      <button
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <svg
          class="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>Export</span>
      </button>
    </div>
  </div>
</template>
