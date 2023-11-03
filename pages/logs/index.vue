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

  const { data, error } = await client
    .from("scans")
    .insert([
      {
        sha256:
          "935c1861df1f4018d698e8b65abfa02d7e9037d8f68ca3c2065b6ca165d44ad2",
        mitre_attack: "alex",
        severity: 3,
        alert_description:
          "regedit.exe registered a script to be run on the next login or boot. This script was registered on 0 other endpoints. The script was registered at HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\WOW6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\RunOnce, in the UnKES registry value. The registered script is wscript.exe //b C:\\\\Users\\\\PRDAA2~1\\\\AppData\\\\Local\\\\Temp\\\\UnKES.vbs",
        context: "IP: 172.17.17.17 User: alex",
        recomendation: "Told to alex and look if is a legitim action",
        alert: "Script file added to startup-related Registry keys",
        user: user.value.id
      },
    ])
    .select();
  loadingStore.setLoading(false);
  //navigateTo(`/logs/scan/${data.value.id}`);
}
</script>

<template>
  <Page title="Scan new logs">
    <h4 class="mb-2">Introduce logs</h4>
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
  </Page>
</template>
