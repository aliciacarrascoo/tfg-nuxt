<script setup>
const logs = ref("");
const fileInput = ref(null);
async function fileChange() {
  console.log(fileInput.value?.files);
  const file = fileInput.value?.files[0];
  if (file) {
    logs.value = await file.text();
  }
}
</script>

<template>
  <div><strong>Results case: x</strong></div>
  <!------SHA256------>
  <div class="grid grid-cols-12 p-20">
    <div class="col-span-2"><strong>SHA256</strong></div>
    <div class="col-span-8">
      <input
        type="text"
        readonly
        class="form-control-plaintext"
        id="staticEmail"
        value="24HFIR83472DKF"
      />
    </div>
    <div class="col-span-2">
      <button class="btn btn-primary ml-auto">VirusTotal</button>
    </div>
    <!------MITRE ATT&CK------>
    <div class="col-span-2">
      <strong>Mitre att&ck</strong>
    </div>
    <div class="col-span-10">
      <input
        type="text"
        readonly
        class="form-control-plaintext"
        id="staticEmail"
        value="MA1, MA2, MA3..."
      />
    </div>
    <!------ALERT------>
    <div class="col-span-2">
      <strong>Alert</strong>
    </div>
    <div class="col-span-8">
      <input
        type="text"
        readonly
        class="form-control-plaintext"
        id="staticEmail"
        value="Ransomware"
      />
    </div>
    <div class="col-span-1">
      <strong>Severity</strong>
    </div>
    <div class="col-span-1">
      <span class="badge bg-warning text-dark fw-normal">Medium</span>
      <!----
      <span class="badge bg-info">Low</span>
      <span class="badge bg-danger">High</span>
      ----->
    </div>
    <!------Alert description------>
    <div class="col-span-2">
      <strong>Alert description</strong>
    </div>
    <div class="col-span-10">
      <input
        type="text"
        readonly
        class="form-control-plaintext"
        id="staticEmail"
        value="Blablablablablablablalbblalbalbalb"
      />
    </div>
    <!------CONTEXT------>
    <div class="col-span-2">
      <strong>Context</strong>
    </div>
    <div class="col-span-10">
      <input
        type="text"
        readonly
        class="form-control-plaintext"
        id="staticEmail"
        value="IP: xxxxxx, route: xxxxx"
      />
    </div>
    <!------RECOMENDATION------>
    <div class="col-span-2">
      <strong>Recomendation</strong>
    </div>
    <div class="col-span-10">
      <input
        type="text"
        readonly
        class="form-control-plaintext"
        id="staticEmail"
        value="Blablabla"
      />
    </div>
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
